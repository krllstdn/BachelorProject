from django.shortcuts import render
from rest_framework import generics

from .models import Donor
from .serializers import DonorSerializer, CreateDonorSerializer
from rest_framework.response import Response
from rest_framework import status

# from rest_framework.permissions import IsAuthenticated


class DonorList(generics.ListCreateAPIView):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer


class CreateDonor(generics.CreateAPIView):
    queryset = Donor.objects.all()
    serializer_class = CreateDonorSerializer

    # I am not sure if this will be needed
    # def post(self, request, *args, **kwargs):
    #     if not self.request.session.exists(self.request.session.session_key):
    #         self.request.session.create()

    #     serializer = self.serializer_class(data=request.data)

    #     if serializer.is_valid():
    #         donor_data = serializer.data.get("donor_data")

    #     return Response(
    #         DonorSerializer(donor_data).data, status=status.HTTP_201_CREATED
    #     )


class DonorRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer
