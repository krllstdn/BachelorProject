from django.db import models


# Create your models here.
class Recipient(models.Model):
    recipient_data = models.JSONField()
