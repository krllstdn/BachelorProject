from django.db import models


class Donor(models.Model):
    donor_id = models.AutoField(primary_key=True)
    donor_data = models.JSONField()
