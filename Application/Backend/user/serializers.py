# file for serialization of models into JSON format:
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "first_name",
            "last_name",
            "email",
            "login",
            "license_number",
            "hospital",
            "specialization",
        )
