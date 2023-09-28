from rest_framework import serializers
from .models import Pair
from donor.serializers import DonorSerializer
from recipient.serializers import RecipientSerializer


class PairSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pair
        fields = ("pair_id", "donor", "recipient")


class PairDetailSerializer(serializers.ModelSerializer):
    donor = DonorSerializer()
    recipient = RecipientSerializer()

    class Meta:
        model = Pair
        fields = ("pair_id", "donor", "recipient")
