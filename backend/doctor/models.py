from django.db import models
from members.models import CustomUser
# Create your models here.

class Specialization(models.Model):
    name = models.TextField()

    def __str__(self):
        return self.name


class Doctordetail(models.Model):
    doctor = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    
    experience = models.IntegerField()
    phone = models.IntegerField()
    specialization = models.ForeignKey(Specialization, on_delete=models.CASCADE)
    availability = models.BooleanField(default=True)

    def __str__(self):
        return f'Dr. {self.doctor.username} Details' 
