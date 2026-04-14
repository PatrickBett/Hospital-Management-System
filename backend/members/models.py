from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('patient', 'Patient'),
        ('doctor', 'Doctor'),
        ('nurse', 'Nurse'),
        ('receptionist', 'Receptionist'),
        ('labtech', 'Lab Technician'),
        ('pharmacist', 'Pharmacist')
        
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

class Staff(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    staff_number = models.CharField(max_length=20, unique=True, blank=True, null=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    phone = models.CharField(max_length=30)
    email = models.CharField(max_length=60)
    def save(self, *args, **kwargs):
        # Optional: Clear staff_number if not a doctor
        if self.user.role == 'patient':
            self.staff_number = None
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