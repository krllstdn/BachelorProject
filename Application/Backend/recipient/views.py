from django.shortcuts import render
from rest_framework import generics

from .models import Recipient
from .serializers import RecipientSerializer


class RecipientList(generics.ListCreateAPIView):
    queryset = Recipient.objects.all()
    serializer_class = RecipientSerializer
