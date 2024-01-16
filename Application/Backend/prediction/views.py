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


MODELS = {
    "COXNET_DECEASED": "coxnet_deceased_desc.json",
    "COXNET_LIVING": "coxnet_living_desc.json",
}


def load_features_json(model):
    file_path = os.path.join(settings.BASE_DIR, "models", "models", MODELS[model])
    with open(file_path, "r") as f:
        data = json.load(f)
        return (
            data["features"],
            data["model_file_name"],
            data["pipeline_file_name"],
        )


class PredictAPIView(APIView):
    def post(self, request, *args, **kwargs):
        # todo: load correct features
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
            with open(model_pickle_path, "rb") as model_file:
                model = pickle.load(model_file)

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
