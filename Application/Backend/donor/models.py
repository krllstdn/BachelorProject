from django.db import models


class Donor(models.Model):
    patient_id = models.IntegerField()
    donor_id = models.IntegerField()
    donor_data = models.JSONField()
