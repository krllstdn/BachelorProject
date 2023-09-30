from django.db import models
import uuid


class Donor(models.Model):
    donor_id = models.IntegerField(null=False, unique=True)
    donor_data = models.JSONField()
