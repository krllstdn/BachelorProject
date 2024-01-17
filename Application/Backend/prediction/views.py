import pickle, json, os

from django.shortcuts import render
from django.conf import settings
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from sksurv.linear_model import CoxnetSurvivalAnalysis
import numpy as np

from .models import Prediction
from .serializers import PredictionSerializer, CoxnetDeceasedSerializer


class PredictionList(generics.ListCreateAPIView):
    queryset = Prediction.objects.all()
    serializer_class = PredictionSerializer


MODELS = {
    "COXNET_DECEASED": "coxnet_deceased_desc.json",
    "COXNET_LIVING": "coxnet_living_desc.json",
}


def load_features_json(model):
    file_path = os.path.join(settings.BASE_DIR, "models", "models", MODELS[model])
    try:
        with open(file_path, "r") as f:
            data = json.load(f)
            return (
                data["features"],
                data["model_file_name"],
                data["pipeline_file_name"],
            )
    except FileNotFoundError:
        raise ValueError(f"Model description file {model} not found")


class PredictAPIView(APIView):
    def post(self, request, *args, **kwargs):
        model_name = request.data["model_name"]

        features, model_file_name, pipeline_file_name = load_features_json(model_name)
        model_pickle_path = os.path.join(
            settings.BASE_DIR, "models", "models", model_file_name
        )

        serializer = CoxnetDeceasedSerializer(
            features=features,
            data=request.data["features"],
            pipeline_name=pipeline_file_name,
        )

        if serializer.is_valid():
            try:
                with open(model_pickle_path, "rb") as model_file:
                    model = pickle.load(model_file)
            except FileNotFoundError:
                return Response(
                    {"error": "Model pickle not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            data = serializer.validated_data

            prediction = model.predict_survival_function(data)
            risk = model.predict(data)

            return Response(
                {
                    "x_values": prediction[0].x,
                    "y_values": prediction[0].y,
                    "risk": risk[0],
                }
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RandomDataAPIView(APIView):
    def post(self, request, *args, **kwargs):
        model_name = request.data["model_name"]

        features, _, _ = load_features_json(model_name)

        synthetic_data = {}
        for feature in features:
            if feature["type"] == "categorical":
                synthetic_data[feature["name"]] = generate_synthetic_categorical_data(
                    feature
                )
            elif feature["type"] == "numerical":
                synthetic_data[feature["name"]] = generate_synthetic_numerical_data(
                    feature
                )

        return Response(synthetic_data)


def generate_synthetic_categorical_data(feature):
    freq_dict = feature["freq"]
    categories = list(freq_dict.keys())
    probabilities = list(freq_dict.values())

    synthetic_data = np.random.choice(categories, size=1, p=probabilities)[0]

    return synthetic_data


def generate_synthetic_numerical_data(feature):
    synthetic_data = np.random.normal(
        loc=feature["stats"]["median"], scale=feature["stats"]["IQR"], size=1
    )[0]
    synthetic_data = np.clip(synthetic_data, 0, None)
    synthetic_data = np.round(synthetic_data)

    return synthetic_data
