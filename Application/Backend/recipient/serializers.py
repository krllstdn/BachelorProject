from rest_framework import serializers
from .models import Recipient


class RecipientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipient
        fields = ("recipient_id", "recipient_data")
