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
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('Denied', 'Denied'),
    ]
    patient = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="patient")
    doctor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="doctor")
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    problem = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f'Appointment By {self.patient} on {self.date}'


class Medicine(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.CharField(blank=True)
    quantity_in_stock = models.PositiveIntegerField(default=0)
    price_per_unit = models.DecimalField(max_digits=6, decimal_places=2)
    expiry_date = models.DateField(null=True, blank=True)
    date_added = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.name} - quantity is {self.quantity_in_stock}'

