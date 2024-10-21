from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class CustomUser(AbstractUser):
    
    GENDER_CHOICES = (
        ("M","Male"),
        ("F","Female")
    )

    nationalid = models.CharField(max_length=8)
    phone = models.CharField(max_length=10)
 
    gender = models.TextField(max_length=10, choices=GENDER_CHOICES)

class Staff(models.Model):
    ROLE_CHOICES = (
        ('Nurse', 'Nurse'),
        ('Reception', 'Receptionist'),
        ('Technician', 'Lab Technician'),
    )
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    hire_date = models.DateField()

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.role}"

    
class Doctor(models.Model):
    GENDER_CHOICES = (
        ("M","Male"),
        ("F","Female")
    )

    SPECIALIZATION_CHOICES = (
        ('GP', 'General Practitioner'),
        ('CRD', 'Cardiologist'),
        ('NS', 'Neurosurgeon'),
        ('PD', 'Pediatrician'),
    
    )

    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    licenseno = models.CharField(max_length=20)
    specialization = models.CharField(max_length=3, choices=SPECIALIZATION_CHOICES)
    phone = models.CharField(max_length=10)
    email = models.TextField(max_length=50)
    gender = models.TextField(max_length=10, choices=GENDER_CHOICES)

    def __str__(self):
        return f"Dr. {self.firstname}"

class Appointment(models.Model):
    patient =models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete = models.CASCADE)
    appointment_date = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=50, default='Scheduled')  # e.g., Scheduled, Completed, Canceled

    def __str__(self):
        return f"Appointment with Dr.{self.doctor} on {self.appointment_date}"


class MedicalHistory(models.Model):
    patient = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    diagnosis = models.TextField()
    treatment = models.TextField()
    prescription = models.TextField()
    visit_date = models.DateTimeField()

    def __str__(self):
        return f"Medical History for {self.patient} on {self.visit_date}"

class Medication(models.Model):
    name = models.CharField(max_length=100)
    stock_quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    expiry_date = models.DateField()

    def __str__(self):
        return f"{self.name} - {self.stock_quantity} in stock"

class Prescription(models.Model):
    patient = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    medication = models.ForeignKey(Medication, on_delete=models.CASCADE)
    dosage = models.CharField(max_length=100)
    instructions = models.TextField()

    def __str__(self):
        return f"Prescription for {self.patient} - {self.medication}"
