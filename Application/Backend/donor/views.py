from django.shortcuts import render
from rest_framework import generics

from .models import Donor
from .serializers import DonorSerializer


class DonorList(generics.RetrieveUpdateDestroyAPIView):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer
