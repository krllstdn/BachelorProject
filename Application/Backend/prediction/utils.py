import pickle, os, json

import numpy as np

from django.conf import settings
from rest_framework.response import Response
from rest_framework import status

MODELS = {
    "COXNET_DECEASED": "coxnet_deceased_desc.json",
    "COXNET_LIVING": "coxnet_living_desc.json",
}


def load_model_description(model):
    """
    Load model description for the provided model name.

    Args:
        model (str): Model name.

    Returns:
        tuple: Features, model pickle path, pipeline pickle path.
    """
    file_path = os.path.join(settings.BASE_DIR, "prediction", "models", MODELS[model])
    try:
        with open(file_path, "r") as f:
            data = json.load(f)
            return (
                data["features"],
                _get_model_path(data["model_file_name"]),
                data["pipeline_file_name"],
            )
    except FileNotFoundError:
        raise ValueError(f"Model description file {MODELS[model]} not found")


def _get_model_path(model_file_name):
    return os.path.join(settings.BASE_DIR, "prediction", "models", model_file_name)


def load_model(model_path):
    """
    Load model pickle from the provided path.

    Args:
        model_path (str): Path to the model pickle.

    Returns:
        model: Loaded model.
    """
    try:
        with open(model_path, "rb") as model_file:
            model = pickle.load(model_file)
        return model
    except FileNotFoundError:
        return Response(
            {"error": "Model pickle not found"},
            status=status.HTTP_404_NOT_FOUND,
        )


def generate_synthetic_data(features):
    """
    Generate synthetic data based on the provided features.

    Args:
        features (list): List of feature dictionaries.

    Returns:
        dict: Synthetic data.
    """
    synthetic_data = {}
    for feature in features:
        if feature["type"] == "categorical":
            synthetic_data[feature["name"]] = generate_synthetic_categorical_data(
                feature
            )
        elif feature["type"] == "numerical":
            synthetic_data[feature["name"]] = generate_synthetic_numerical_data(feature)
    return synthetic_data


def generate_synthetic_categorical_data(feature):
    """
    Generate synthetic categorical data based on the provided feature description.

    Args:
        feature (dict): Feature description.

    Returns:
        Str: Synthetic categorical data.
    """
    freq_dict = feature["freq"]
    categories = list(freq_dict.keys())
    probabilities = list(freq_dict.values())

    try:
        synthetic_data = np.random.choice(categories, size=1, p=probabilities)[0]
    except ValueError:
        raise ValueError(
            f"Probabilities do not sum to 1 for feature {feature['name']}. Probabilities: {probabilities}"
        )

    return synthetic_data


def generate_synthetic_numerical_data(feature):
    """
    Generate synthetic numerical data based on the provided feature description.

    Args:
        feature (dict): Feature description.

    Returns:
        float: Synthetic numerical data.
    """
    median = feature["stats"]["median"]
    iqr = feature["stats"]["IQR"]
    std = iqr / (2 * 0.6745)

    synthetic_data = np.random.normal(loc=median, scale=std, size=1)[0]

    synthetic_data = np.clip(
        synthetic_data, feature["stats"]["q10"], feature["stats"]["q90"]
    )
    if feature["is_float"] == True:
        synthetic_data = np.round(synthetic_data, 2)
    else:
        synthetic_data = np.round(synthetic_data)

    return synthetic_data
