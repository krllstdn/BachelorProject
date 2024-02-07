import { useState, useEffect } from "react";
import InputField from "../forms/InputField";
import { SelectFieldCox } from "../forms/SelectField";
import ModalContainer from "../wrappers/ModalContainer";
import Button from "../buttons/Button";
import PlotComponent from "../layout/Plot";
import {
  url,
  MODELS,
  MODEL_DESCRIPTIONS,
  Feature,
  FeatureStates,
  ErrorTypes,
  formValidityTypes,
  FeatureValidity,
} from "../types";
import { sendPredictRequest, getSyntheticData } from "../utils/apiService";
import { validateFeature, validatePreSubmit } from "../utils/formValidation";
import {
  getUpdatedFeatures,
  getFeaturesStateValidity,
} from "../utils/featuresUtils";

import { Tooltip } from "react-tooltip";
import AdditionalInfoIcon from "../miscellaneous/AdditionalInfoIcon";

function DeceasedCoxnetPage() {
  // TODO: add a question button to the graph to explain what survival curve is

  const [selectedModel, setSelectedModel] = useState<MODELS>(
    MODELS.COXNET_DECEASED
  );
  const [featureStates, setFeatureStates] = useState<FeatureStates>(
    getUpdatedFeatures(MODELS.COXNET_DECEASED)
  );
  const [featureValidity, setFeatureValidity] = useState<FeatureValidity>(
    getFeaturesStateValidity(MODELS.COXNET_DECEASED)
  );
  const [formValidity, setFormValidity] = useState<formValidityTypes>(
    formValidityTypes.NONE
  );
  const [xValues, setXValues] = useState<number[]>([]);
  const [yValues, setYValues] = useState<number[]>([]);

  useEffect(() => {
    if (selectedModel === MODELS.COXNET_DECEASED) {
      setFeatureStates(getUpdatedFeatures(MODELS.COXNET_DECEASED));
      setFeatureValidity(getFeaturesStateValidity(MODELS.COXNET_DECEASED));
    } else {
      setFeatureStates(getUpdatedFeatures(MODELS.COXNET_LIVING));
      setFeatureValidity(getFeaturesStateValidity(MODELS.COXNET_LIVING));
    }
  }, [selectedModel]);

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
            <div>
              <SelectFieldCox
                name={feature.name}
                // label={feature.description}
                // key={feature.name}
                text={feature.short_description}
                value={featureStates[feature.name]}
                description={feature.description}
                onChange={(e) => {
                  setFeatureStates({
                    ...featureStates,
                    [feature.name]: e.target.value, // TODO: add validation
                  });
                  setFeatureValidity({
                    ...featureValidity,
                    [feature.name]: validateFeature(feature, e.target.value),
                  });
                }}
                options={Object.entries(feature.possible_values || {})
                  .filter(([key, value]) => value !== undefined)
                  .map(([key, value]) => ({
                    value: key,
                    label: value || "",
                  }))}
              />
              {featureValidity[feature.name] === ErrorTypes.NOT_SELECTED && (
                <p className="text-red-700 text-sm ml-2">
                  {feature.short_description} should be selected
                </p>
              )}
              {featureValidity[feature.name] === ErrorTypes.WRONG_SELECT && (
                <p className="text-red-700 text-sm ml-2">
                  {feature.short_description} should be selected from the list
                </p>
              )}
            </div>
          ) : (
            <div>
              <InputField
                name={feature.name}
                //   label={feature.description}
                type="text"
                key={feature.name}
                value={featureStates[feature.name] as string}
                text={feature.short_description}
                description={feature.description}
                onChange={
                  (e) => {
                    setFeatureStates({
                      ...featureStates,
                      [feature.name]: e.target.value,
                    });
                    // console.log("first");
                    setFeatureValidity({
                      ...featureValidity,
                      [feature.name]: validateFeature(feature, e.target.value),
                    });
                  } // onBlur
                }
              />
              {featureValidity[feature.name] === ErrorTypes.NOT_NUMBER && (
                <p className="text-red-700 text-sm ml-2">
                  {feature.short_description} should be a number
                </p>
              )}
              {featureValidity[feature.name] === ErrorTypes.NOT_IN_RANGE && (
                <p className="text-yellow-600 text-sm ml-2 mt-1 leading-4">
                  {feature.description} should be in range from ... to ... If
                  are sure it is correct, please ignore this warning.
                </p>
              )}
              {featureValidity[feature.name] === ErrorTypes.NEGATIVE && (
                <p className="text-red-700 text-sm ml-2">
                  {feature.short_description} should be non-negative
                </p>
              )}
              {featureValidity[feature.name] === ErrorTypes.EMPTY && (
                <p className="text-red-700 text-sm ml-2">
                  {feature.short_description} should not be empty
                </p>
              )}
              {featureValidity[feature.name] === ErrorTypes.NOT_INT && (
                <p className="text-red-700 text-sm ml-2">
                  {feature.short_description} should be an integer
                </p>
              )}
              {featureValidity[feature.name] === ErrorTypes.NOT_FLOAT && (
                <p className="text-red-700 text-sm ml-2">
                  {feature.short_description} should be a float
                </p>
              )}
            </div>
          )
        )}
        <Button
          additionalStyles="mt-2 mb-2"
          name="Submit"
          onClick={() => {
            validatePreSubmit(
              selectedModel,
              featureValidity,
              setFeatureValidity,
              setFormValidity
            );
            if (formValidity === formValidityTypes.VALID) {
              sendPredictRequest(
                selectedModel,
                featureStates,
                setXValues,
                setYValues
              );
            }
          }}
        />
        {formValidity === formValidityTypes.INVALID && (
          <p className="text-red-700 text-md ml-2">
            Please fill all fields correctly
          </p>
        )}
        <div className="float-left w-full flex mt-1">
          <p
            className="cursor-pointer text-sm hover:underline inline-block mr-3"
            onClick={() => getSyntheticData(selectedModel, setFeatureStates)}
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
      <PlotComponent xValues={xValues} yValues={yValues} />
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
