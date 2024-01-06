import pickle, json, os

from django.shortcuts import render
from django.conf import settings
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from sksurv.linear_model import CoxnetSurvivalAnalysis
import matplotlib
import numpy as np

matplotlib.use("agg")
import matplotlib.pyplot as plt

from .models import Prediction
from .serializers import PredictionSerializer, CoxnetDeceasedSerializer


class PredictionList(generics.ListCreateAPIView):
    queryset = Prediction.objects.all()
    serializer_class = PredictionSerializer


def load_features_json():
    file_path = os.path.join(
        settings.BASE_DIR, "models", "models", "coxnet_deceased_desc.json"
    )
    with open(file_path, "r") as f:
        data = json.load(f)
        return data["features"], data["model_pickle_path"], data["model_file_name"]


def plot_survival_curves(prediction):
    filename = "survival_curves.png"
    path_to_save = "../Frontend/kidney-life/src/assets/"

    plt.figure(figsize=(10, 6))
    plt.step(prediction[0].x, prediction[0].y)

    plt.xlabel("Time")
    plt.ylabel("Survival Probability")
    plt.title("Survival Function")
    plt.legend()
    plt.savefig(path_to_save + filename)
    # plt.show()

    return filename


class PredictAPIView(APIView):
    def post(self, request, *args, **kwargs):
        # todo: add model name to request
        features, model_pickle_path, model_file_name = load_features_json()
        model_pickle_path = os.path.join(
            settings.BASE_DIR, "models", "models", model_file_name
        )

        serializer = CoxnetDeceasedSerializer(features, data=request.data)

        if serializer.is_valid():
            # Load ML model
            with open(model_pickle_path, "rb") as model_file:
                model = pickle.load(model_file)

            # get standardized data from request
            data = serializer.validated_data

            # make prediction with data from request
            prediction = model.predict_survival_function(data)
            risk = model.predict(data)

            plot_name = plot_survival_curves(prediction)

            return Response({"image_name": plot_name, "risk": risk[0]})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
