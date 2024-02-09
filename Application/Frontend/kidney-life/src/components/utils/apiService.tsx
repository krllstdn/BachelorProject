import { MODELS, FeatureStates, url } from "../types";

export const sendPredictRequest = async (
  selectedModel: MODELS,
  featureStates: FeatureStates,
  setXValues: React.Dispatch<React.SetStateAction<any[]>>,
  setYValues: React.Dispatch<React.SetStateAction<any[]>>
) => {
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

export const getSyntheticData = async (
  selectedModel: MODELS,
  setFeatureStates: React.Dispatch<React.SetStateAction<FeatureStates>>
) => {
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
