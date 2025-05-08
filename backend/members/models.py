from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('patient', 'Patient'),
        ('doctor', 'Doctor'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    doctor_number = models.CharField(max_length=20, blank=True, null=True)

    def save(self, *args, **kwargs):
        # Optional: Clear doctor_number if not a doctor
        if self.role != 'doctor':
            self.doctor_number = None
        super().save(*args, **kwargs)

class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    age = models.IntegerField()
    phone = models.IntegerField()
    dob = models.DateField()

    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        
    ]
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)

    def __str__(self):
        return f"{self.user.username} profile"