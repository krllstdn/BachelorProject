# Generated by Django 4.1 on 2023-09-28 07:31

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("pair", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="pair",
            old_name="donor_id",
            new_name="donor",
        ),
        migrations.RenameField(
            model_name="pair",
            old_name="recipient_id",
            new_name="recipient",
        ),
    ]
