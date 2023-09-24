from django.db import models


class Prediction(models.Model):
    prediction_id = models.IntegerField()
    model_id = models.ForeignKey(
        "models.Model", on_delete=models.CASCADE
    )  # think about CASCADE
    pair_id = models.ForeignKey("pair.Pair", on_delete=models.CASCADE)
    prediction_data = models.JSONField()
