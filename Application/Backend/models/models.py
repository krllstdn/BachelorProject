from django.db import models


# Create your models here.
class Model(models.Model):
    model_id = models.IntegerField()
    model_name = models.CharField(max_length=100)
    model_description = (
        models.JSONField()
    )  # file with the model desc. (e.g. contents of coxnet_deceased_desc.json)
