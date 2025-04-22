from django.db import models
from members.models import CustomUser
from hospital.models import Department
# Create your models here.

class Patientvisit(models.Model):
    patient = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="patientvisit")
    doctor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="doctorincharge")
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    visit_date = models.DateField()
    
    def __str__(self):
        return f'{self.patient} visited {self.department} Department on {self.visit_date} '