import coxnet_deceased_features from "../models/coxnet_deceased_desc.json";
import coxnet_living_features from "../models/coxnet_living_desc.json";

export enum MODELS {
  COXNET_DECEASED = "COXNET_DECEASED",
  COXNET_LIVING = "COXNET_LIVING",
}

export type ModelDescriptions = {
  [key in keyof typeof MODELS]: ModelInfo;
};

export const MODEL_DESCRIPTIONS: ModelDescriptions = {
  COXNET_DECEASED: coxnet_deceased_features,
  COXNET_LIVING: coxnet_living_features,
};

export interface PossibleValues {
  [key: string]: string | undefined;
}

export interface Feature {
  name: string;
  type: string;
  short_description: string;
  description: string;
  possible_values?: PossibleValues;
  is_float?: boolean;
  stats?: {
    IQR: number;
    median: number;
    q10: number;
    q90: number;
    min: number;
    max: number;
  };
  // freq?: {
  //   [key: string | number]: number | undefined;
  // };
}

export interface ModelInfo {
  model_pickle_path: string;
  model_file_name: string;
  features: Feature[];
}

export interface FeatureStates {
  [key: string]: string | number;
}

export enum ErrorTypes {
  NOT_NUMBER = "NOT_NUMBER", // onChange
  NOT_IN_RANGE = "NOT_IN_RANGE", // onChange
  NOT_INT = "NOT_INT", // onChange
  NOT_FLOAT = "NOT_FLOAT",
  NEGATIVE = "NEGATIVE",
  EMPTY = "EMPTY", // onSubmit
  NOT_SELECTED = "NOT_SELECTED", // onSubmit
  WRONG_SELECT = "WRONG_SELECT", // onSubmit
  VALID = "VALID",
  NONE = "NONE",
}

export enum formValidityTypes {
  VALID = "VALID",
  INVALID = "INVALID",
  NONE = "NONE",
}

export interface FeatureValidity {
  [key: string]: ErrorTypes;
}

const be_host = process.env.REACT_APP_BE_HOST;
export const url = "http://" + be_host + "/api/"; // "http://localhost:8000/";
