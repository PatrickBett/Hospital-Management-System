from rest_framework import serializers
from .models import Specialization,Doctordetail

class SpecializationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Specialization
        fields = '__all__'

class DoctordetailSerializer(serializers.ModelSerializer):
    specialization = SpecializationSerializer(read_only = True)
    class Meta:
        model = Doctordetail
        fields = '__all__'