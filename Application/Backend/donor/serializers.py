from rest_framework import serializers
from .models import Donor


class DonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = ("donor_id", "donor_data")


class CreateDonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = ("donor_id", "donor_data")
