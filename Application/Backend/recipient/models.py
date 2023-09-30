from django.db import models


# Create your models here.
class Recipient(models.Model):
    recipient_id = models.IntegerField(null=False, unique=True)
    recipient_data = models.JSONField()
