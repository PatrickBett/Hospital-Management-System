from rest_framework import serializers
from .models import Specialization,Doctordetail

class SpecializationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Specialization
        fields = '__all__'

class DoctordetailSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Doctordetail
        fields = '__all__'