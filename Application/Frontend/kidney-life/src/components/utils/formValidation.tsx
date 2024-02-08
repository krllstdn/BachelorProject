import {
  ErrorTypes,
  Feature,
  formValidityTypes,
  FeatureValidity,
  MODEL_DESCRIPTIONS,
  MODELS,
  FeatureStates,
} from "../types";

export const validateFeature = (feature: Feature, value: string) => {
  if (feature.type === "categorical" && feature.possible_values) {
    if (feature.possible_values[value as string] === undefined) {
      // TODO: check its validity
      return ErrorTypes.WRONG_SELECT;
    }
  } else {
    if (!/^-?\d*\.?\d+$/.test(value)) {
      return ErrorTypes.NOT_NUMBER;
    }

    const isFloat = value.includes(".");
    const num = isFloat ? parseFloat(value) : parseInt(value, 10);
    if (feature.is_float && !isFloat) {
      return ErrorTypes.NOT_FLOAT;
    } else if (!feature.is_float && isFloat) {
      return ErrorTypes.NOT_INT;
    } else if (num < 0) {
      return ErrorTypes.NEGATIVE;
    } else if (
      feature.stats &&
      (num < feature.stats.min || num > feature.stats.max)
    ) {
      return ErrorTypes.NOT_IN_RANGE;
    }
  }
  return ErrorTypes.VALID;
};

export const validatePreSubmit = (
  selectedModel: MODELS,
  featureValidity: FeatureValidity,
  featureStates: FeatureStates,
  setFeatureValidity: React.Dispatch<React.SetStateAction<FeatureValidity>>,
  setFormValidity: React.Dispatch<React.SetStateAction<formValidityTypes>>
) => {
  const featureDescriptions: Feature[] =
    MODEL_DESCRIPTIONS[selectedModel].features;
  let formValidity = formValidityTypes.VALID;
  const updatedFeatureValidity: FeatureValidity = {};

  for (const feature in featureValidity) {
    if (featureValidity[feature] === ErrorTypes.NONE) {
      const featureDesc = featureDescriptions.find((f) => f.name === feature);
      if (featureDesc?.type === "categorical") {
        if (featureStates[feature] === "") {
          updatedFeatureValidity[feature] = ErrorTypes.NOT_SELECTED;
          formValidity = formValidityTypes.INVALID;
        }
      } else {
        if (featureStates[feature] === "") {
          updatedFeatureValidity[feature] = ErrorTypes.EMPTY;
          formValidity = formValidityTypes.INVALID;
        }
      }
    } else if (featureValidity[feature] !== ErrorTypes.VALID) {
      formValidity = formValidityTypes.INVALID;
    }
  }
  setFeatureValidity({ ...featureValidity, ...updatedFeatureValidity });
  setFormValidity(formValidity);
};
