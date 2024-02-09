import { MODELS, MODEL_DESCRIPTIONS } from "../types";
import { ErrorTypes } from "../types";

export const getUpdatedFeatures = (model: MODELS) => {
  const features = MODEL_DESCRIPTIONS[model];

  if (Array.isArray(features.features)) {
    return features.features.reduce<{ [key: string]: string | number }>(
      (acc, feature) => {
        acc[feature.name] = "";
        return acc;
      },
      {}
    );
  }
  return {};
};

export const getFeaturesStateValidity = (model: MODELS) => {
  const features = MODEL_DESCRIPTIONS[model];

  if (Array.isArray(features.features)) {
    return features.features.reduce<{ [key: string]: ErrorTypes }>(
      (acc, feature) => {
        acc[feature.name] = ErrorTypes.NONE;
        return acc;
      },
      {}
    );
  }
  return {};
};
