# Generated by Django 4.1 on 2023-09-24 08:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("donor", "0002_remove_donor_patient_id"),
        ("recipient", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Pair",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("pair_id", models.IntegerField()),
                (
                    "donor_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="donor.donor"
                    ),
                ),
                (
                    "recipient_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="recipient.recipient",
                    ),
                ),
            ],
        ),
    ]