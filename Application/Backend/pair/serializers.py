from rest_framework import serializers
from .models import Pair


class PairSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pair
        fields = ("pair_id", "donor_id", "recipient_id")
