from django.db import models
from members.models import CustomUser

# Create your models here.

#Room Types i.e wards, maternity
class Roomtype(models.Model):
    type = models.CharField()
    
    def __str__(self):
        return self.type
#Room itself iincluding some details etc.
class Room(models.Model):
    patient = models.ForeignKey(CustomUser, on_delete=models.CASCADE,related_name='patient_rooms')
    doctor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='doctor_incharge')
    roomtype = models.ForeignKey(Roomtype, on_delete=models.CASCADE)
    roomnumber = models.CharField()
    dateofallotment = models.DateField()
    dischargedate = models.DateField(null=True, blank=True)
    status = models.BooleanField(default=False)
    

    def __str__(self):
        return self.roomnumber
    
class Department(models.Model):
    name = models.CharField()

    def __str__(self):
        return self.name
    

class Appointment(models.Model):
    patient = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="patient")
    doctor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="doctor")
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    problem = models.TextField()

    def __str__(self):
        return f'Appointment By {self.patient} on {self.date}'
