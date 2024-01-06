import { useState, useEffect } from "react";
import InputField from "../forms/InputField";
import { SelectFieldCox } from "../forms/SelectField";
import features from "../../models/coxnet_deceased_desc.json";
import ModalContainer from "../wrappers/ModalContainer";
import Button from "../buttons/Button";
import SurvivalCurvesImage from "../../assets/survival_curves.png";

import Plot from "react-plotly.js";

type Feature = {
  name: string;
  type: string;
  short_description: string;
  description: string;
  possible_values?: {
    [key: string]: string;
  };
};

type FeaturesData = {
  features: Feature[];
};

function DeceasedCoxnetPage() {
  const [featureStates, setFeatureStates] = useState(
    features.features.reduce(
      (acc: { [key: string]: string | number }, feature) => {
        acc[feature.name] =
          feature.type === "categorical"
            ? Object.keys(feature.possible_values || {})[0]
            : 0; // initial state
        return acc;
      },
      {}
    )
  );
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);

  const sendRequest = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/prediction/predict/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(featureStates),
        }
      );

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

  return (
    <div className="flex justify-evenly flex-grow h-full">
      {/* <div className="flex items-center justify-center min-h-screen"> */}
      <ModalContainer className="w-1/3 h-full pr-5 pl-5 pt-6 pb-8 ml-7 mt-3">
        <h1 className="text-3xl text-center pb-5">Coxnet Deceased</h1>
        {features.features.map((feature) =>
          feature.type === "categorical" ? (
            <SelectFieldCox
              name={feature.name}
              //   label={feature.description}
              key={feature.name}
              text={feature.short_description}
              value={featureStates[feature.name]}
              description={feature.description}
              onChange={(e) =>
                setFeatureStates({
                  ...featureStates,
                  [feature.name]: e.target.value,
                })
              }
              options={Object.entries(feature.possible_values || {}).map(
                ([key, value]) => ({
                  value: key,
                  label: value,
                })
              )}
            />
          ) : (
            <InputField
              name={feature.name}
              //   label={feature.description}
              type={feature.type}
              key={feature.name}
              text={feature.short_description}
              description={feature.description}
              onChange={(e) =>
                setFeatureStates({
                  ...featureStates,
                  [feature.name]: e.target.value,
                })
              }
            />
          )
        )}
        <Button
          additionalStyles="mt-3"
          name="Submit"
          onClick={sendRequest}
          // onClick={() => console.log(featureStates)}
        />
      </ModalContainer>
      <div className="survivalCurve w-7/12 h-5/6 mt-24 rounded-md">
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
            // width: 820,
            // height: 540,
            autosize: true,
            title: "Survival Function",
            plot_bgcolor: "rgba(187, 227, 241, 0.01)",
            paper_bgcolor: "rgba(187, 227, 241, 0.1)",
            xaxis: { title: "Time (Days)" },
            yaxis: { title: "Survival Probability" },
          }}
          config={{ responsive: true }}
        />
      </div>
    </div>
  );
}

export default DeceasedCoxnetPage;
