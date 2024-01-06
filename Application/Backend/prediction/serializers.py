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
    def __init__(self, features, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.features = features

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
                    float(data.get(field_name, 0))
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

        path = os.path.join(
            os.path.dirname(__file__), "pickles", "trained_pipeline.pkl"
        )
        with open(path, "rb") as file:
            pipeline = pickle.load(file)

        numerical = [
            "AGE",
            "BMI_CALC",
            "AGE_DON",
            "CREAT_TRR",
            "NPKID",
            "RDR2",
            "DR53",
            "DR2",
            "COLD_ISCH_KI",
            "CREAT_DON",
        ]
        categorical = [
            "ON_DIALYSIS",
            "PRE_TX_TXFUS",
            "GENDER",
            "ETHCAT",
            "DIABETES_DON",
            "DIAB",
            "HCV_SEROSTATUS",
        ]

        dataset = df[numerical + categorical]
        X = pipeline.transform(dataset)

        return X

    def _encode_categorical(self, data):  # obsolete
        columns = [
            feature["name"]
            for feature in self.features
            if feature["type"] == "categorical"
        ]
        encoded_cols = {}
        for column in columns:
            possible_values = list(
                [
                    feature["possible_values"].keys()
                    for feature in self.features
                    if feature["name"] == column
                ][0]
            )

            for val in possible_values:
                end = f"{val}.0" if str(val).isdigit() else val

                encoded_col = f"{column}={end}"
                encoded_cols[encoded_col] = [1 if x == val else 0 for x in data[column]]

            encoded_cols.pop(f"{column}={possible_values[0]}", None)

        return pd.DataFrame(encoded_cols)
        # get categorical features
        # look how categories are encoded in the model. (what values to what numbers or columns)

    def _standardize():
        pass
