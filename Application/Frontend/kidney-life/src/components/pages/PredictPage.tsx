import { useState, useEffect } from "react";
import InputField from "../forms/InputField";
import { SelectFieldCox } from "../forms/SelectField";
import ModalContainer from "../wrappers/ModalContainer";
import Button from "../buttons/Button";

import coxnet_deceased_features from "../../models/coxnet_deceased_desc.json";
import coxnet_living_features from "../../models/coxnet_living_desc.json";

import Plot from "react-plotly.js";
import { Tooltip } from "react-tooltip";
import AdditionalInfoIcon from "../miscellaneous/AdditionalInfoIcon";

const be_host = process.env.REACT_APP_BE_HOST;
const url = "http://" + be_host + "/api/";

enum MODELS {
  COXNET_DECEASED = "COXNET_DECEASED",
  COXNET_LIVING = "COXNET_LIVING",
}
type ModelDescriptions = {
  [key in keyof typeof MODELS]: ModelInfo;
};

const MODEL_DESCRIPTIONS: ModelDescriptions = {
  COXNET_DECEASED: coxnet_deceased_features,
  COXNET_LIVING: coxnet_living_features,
};

interface PossibleValues {
  [key: string]: string | undefined;
}

interface Feature {
  name: string;
  type: string;
  short_description: string;
  description: string;
  possible_values?: PossibleValues;
}

interface ModelInfo {
  model_pickle_path: string;
  model_file_name: string;
  features: Feature[];
}

interface FeatureStates {
  [key: string]: string | number;
}

function DeceasedCoxnetPage() {
  // TODO: validator if data is in range
  // TODO: add a question button to the graph to explain what survival curve is
  const getUpdatedFeatures = (model: MODELS) => {
    const features = MODEL_DESCRIPTIONS[model];

    if (Array.isArray(features.features)) {
      return features.features.reduce<{ [key: string]: string | number }>(
        (acc, feature) => {
          acc[feature.name] =
            feature.type === "categorical"
              ? Object.keys(feature.possible_values || {})[0] || ""
              : "";
          return acc;
        },
        {}
      );
    }
    return {};
  };

  const [selectedModel, setSelectedModel] = useState<MODELS>(
    MODELS.COXNET_DECEASED
  );
  const [featureStates, setFeatureStates] = useState<FeatureStates>(
    getUpdatedFeatures(MODELS.COXNET_DECEASED)
  );
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);

  useEffect(() => {
    if (selectedModel === MODELS.COXNET_DECEASED) {
      setFeatureStates(getUpdatedFeatures(MODELS.COXNET_DECEASED));
    } else {
      setFeatureStates(getUpdatedFeatures(MODELS.COXNET_LIVING));
    }
  }, [selectedModel]);

  const sendPredictRequest = async () => {
    try {
      const response = await fetch(url + "prediction/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model_name: selectedModel,
          features: featureStates,
        }),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      setXValues(data.x_values);
      setYValues(data.y_values);
    } catch (error) {
      console.error(error);
    }
  };

  const getSyntheticData = async () => {
    try {
      const response = await fetch(url + "prediction/synthetic/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model_name: selectedModel,
        }),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      setFeatureStates(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-evenly flex-grow h-full">
      <ModalContainer className="w-1/3 h-[97vh] pr-5 pl-5 pt-6 pb-3 mb-4 mt-3 overflow-y-scroll">
        <div className="flex items-center justify-center mb-3">
          <select
            className="bg-secondary text-3xl"
            value={selectedModel}
            onChange={(event) => setSelectedModel(event.target.value as MODELS)}
          >
            <option value={MODELS.COXNET_DECEASED}>Coxnet Deceased</option>
            <option value={MODELS.COXNET_LIVING}>Coxnet Living</option>
            {/* <option value="2">GB Deceased</option> */}
            {/* <option value="4">GB Living</option> */}
          </select>
        </div>
        {MODEL_DESCRIPTIONS[selectedModel].features.map((feature) =>
          feature.type === "categorical" ? (
            <SelectFieldCox
              name={feature.name}
              // label={feature.description}
              // key={feature.name}
              text={feature.short_description}
              value={featureStates[feature.name]}
              description={feature.description}
              onChange={(e) =>
                setFeatureStates({
                  ...featureStates,
                  [feature.name]: e.target.value,
                })
              }
              options={Object.entries(feature.possible_values || {})
                .filter(([key, value]) => value !== undefined)
                .map(([key, value]) => ({
                  value: key,
                  label: value || "",
                }))}
            />
          ) : (
            <div>
              <InputField
                name={feature.name}
                //   label={feature.description}
                type="number"
                key={feature.name}
                value={featureStates[feature.name] as string}
                text={feature.short_description}
                description={feature.description}
                onChange={(e) =>
                  setFeatureStates({
                    ...featureStates,
                    [feature.name]: e.target.value,
                  })
                }
              />
              <p className="text-red-700 text-sm ml-2">
                {feature.short_description} should be a number
              </p>
              <p className="text-yellow-600 text-sm ml-2 mt-1 leading-4">
                {feature.description} should be in range from ... to ... If are
                sure it is correct, please ignore this warning.
              </p>
            </div>
          )
        )}
        <Button
          additionalStyles="mt-2 mb-2"
          name="Submit"
          onClick={sendPredictRequest}
        />
        <div className="float-left w-full flex mt-1">
          <p
            className="cursor-pointer text-sm hover:underline inline-block mr-3"
            onClick={getSyntheticData}
          >
            Generate synthetic data
          </p>
          <AdditionalInfoIcon
            text="Generates data based on the individual feature distribution; 
                  not reflective of actual data; intended solely 
                  for testing purposes."
          />
        </div>
      </ModalContainer>
      <div className="survivalCurve w-7/12 h-5/6 mt-24 rounded-md bg-secondaryLight">
        <Plot
          style={{ width: "100%", height: 600 }}
          data={[
            {
              x: xValues,
              y: yValues,
              type: "scatter",
              mode: "lines",
              line: { color: "031d44" },
            },
          ]}
          layout={{
            autosize: true,
            hoverlabel: {
              bgcolor: "rgba(3, 29, 68, .9)",
            },
            title: "Survival Function",
            plot_bgcolor: "rgba(255, 255, 255, 0.00)",
            paper_bgcolor: "rgba(255, 255, 255, 0.0)",
            xaxis: { title: "Time (Days)" },
            yaxis: { title: "Survival Probability" },
          }}
          config={{ responsive: true }}
        />
      </div>
      <Tooltip
        id="tooltip"
        place="right"
        style={{
          backgroundColor: "rgba(3, 29, 68, .9)",
          color: "white",
          maxWidth: "400px",
        }}
      />
    </div>
  );
}

export default DeceasedCoxnetPage;
