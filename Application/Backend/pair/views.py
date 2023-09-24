from django.shortcuts import render
from rest_framework import generics

from .models import Pair
from .serializers import PairSerializer


class PairList(generics.ListCreateAPIView):
    queryset = Pair.objects.all()
    serializer_class = PairSerializer
