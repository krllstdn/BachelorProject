from django.db import models


# Create your models here.
class Recipient(models.Model):
    recipient_id = models.AutoField(primary_key=True)
    recipient_data = models.JSONField()
