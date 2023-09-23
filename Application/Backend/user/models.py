from django.db import models


class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    login = models.CharField(max_length=100, unique=True)
    license_number = models.CharField(max_length=100, unique=True)
    hospital = models.CharField(max_length=200)
    specialization = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
