import json
import pickle
import os

from rest_framework import serializers
import pandas as pd
from sksurv.column import encode_categorical
from sksurv.column import standardize

from .models import Prediction


class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction
        fields = ("prediction_id", "pair_id", "model_id", "prediction_data")


class CoxnetDeceasedSerializer(serializers.Serializer):
    def __init__(self, features, pipeline_name, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.features = features
        self.pipeline_name = pipeline_name

        self.numerical = [
            feature["name"]
            for feature in self.features
            if feature["type"] == "numerical"
        ]
        self.categorical = [
            feature["name"]
            for feature in self.features
            if feature["type"] == "categorical"
        ]

        for feature in features:
            field_name = feature["name"]
            field_type = feature["type"]
            if field_type == "categorical":
                choices = [(k, v) for k, v in feature["possible_values"].items()]
                self.fields[field_name] = serializers.ChoiceField(choices=choices)
            elif field_type == "numerical":
                self.fields[field_name] = serializers.FloatField()
            else:
                raise ValueError(f"Unsupported feature type: {field_type}")

    def validate(self, data):
        features = self.features

        for feature in features:
            field_name = feature["name"]
            field_type = feature["type"]

            if field_type == "categorical":
                if (
                    field_name not in data
                    or data[field_name] not in feature["possible_values"]
                ):
                    raise serializers.ValidationError(
                        {field_name: "Invalid value for categorical field."}
                    )
            elif field_type == "numerical":
                try:
                    # This checks if the value is a number or a numeric string.
                    float(
                        data.get(field_name, 0)
                    )  # sets value to 0 if it is not a number
                except ValueError:
                    raise serializers.ValidationError(
                        {field_name: f"{field_name} must be a number."}
                    )
            else:
                raise serializers.ValidationError(
                    {field_name: f"Unsupported feature type: {field_type}"}
                )

        encoded_data = self.encode(data)

        return encoded_data

    def encode(self, validated_data):
        df = pd.DataFrame(validated_data, index=[0])

        path = os.path.join(os.path.dirname(__file__), "pickles", self.pipeline_name)
        try:
            with open(path, "rb") as file:
                pipeline = pickle.load(file)
        except FileNotFoundError:
            raise serializers.ValidationError(
                f"Pipeline pickle {self.pipeline_name} not found."
            )

        dataset = df[self.numerical + self.categorical]
        X = pipeline.transform(dataset)

        return X
