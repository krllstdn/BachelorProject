from django.db import models


class Prediction(models.Model):
    prediction_id = models.IntegerField()
    model_name = models.CharField(max_length=100)
    prediction_data = models.JSONField()
