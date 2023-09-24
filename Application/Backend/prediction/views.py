from django.shortcuts import render
from rest_framework import generics

from .models import Prediction
from .serializers import PredictionSerializer


class PredictionList(generics.ListCreateAPIView):
    queryset = Prediction.objects.all()
    serializer_class = PredictionSerializer
