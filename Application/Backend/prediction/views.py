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
from .utils import load_model_description, load_model, MODELS, generate_synthetic_data


class PredictionList(generics.ListCreateAPIView):
    queryset = Prediction.objects.all()
    serializer_class = PredictionSerializer


class PredictAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            model_name = request.data["model_name"]
            data = request.data["features"]
        except KeyError:
            return Response(
                {"error": "Missing 'model_name' or 'features' in request data"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        features, model_pickle_path, pipeline_file_name = load_model_description(
            model_name
        )

        serializer = CoxnetDeceasedSerializer(
            features=features,
            data=request.data["features"],
            pipeline_name=pipeline_file_name,
        )

        if serializer.is_valid():
            model = load_model(model_pickle_path)
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
        try:
            model_name = request.data["model_name"]
        except KeyError:
            return Response(
                {"error": "Missing 'model_name' in request data"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        features, _, _ = load_model_description(model_name)

        synthetic_data = generate_synthetic_data(features)

        return Response(synthetic_data)
