from django.db import models


class Pair(models.Model):
    pair_id = models.AutoField(primary_key=True)
    recipient = models.ForeignKey("recipient.Recipient", on_delete=models.CASCADE)
    donor = models.ForeignKey("donor.Donor", on_delete=models.CASCADE)
