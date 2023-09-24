from django.db import models


class Donor(models.Model):
    donor_id = models.IntegerField()
    donor_data = models.JSONField()
