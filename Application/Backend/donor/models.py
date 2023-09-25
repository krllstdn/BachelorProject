from django.db import models
import uuid


class Donor(models.Model):
    # donor_id = models.CharField(default="0")
    donor_data = models.JSONField()

    # def generate_unique_patient_id(self):
    #     return str(uuid.uuid4())

    # def save(self, *args, **kwargs):
    #     if not self.donor_id:
    #         self.donor_id = self.generate_unique_patient_id()
    #     super().save(*args, **kwargs)
