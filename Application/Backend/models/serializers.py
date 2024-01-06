from rest_framework import serializers
from .models import Model


class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model
        fields = ("model_id", "model_name", "model_description")
