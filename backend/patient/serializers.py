from rest_framework import serializers
from .models import Patientvisit

class PatientvisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patientvisit
        fields = '__all__'