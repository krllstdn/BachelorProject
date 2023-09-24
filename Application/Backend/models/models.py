from django.db import models


# Create your models here.
class Model(models.Model):
    model_id = models.IntegerField()
    model_name = models.CharField(max_length=100)
