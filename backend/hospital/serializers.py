from rest_framework import serializers
from .models import Room, Roomtype, Department, Appointment

class RoomtypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roomtype
        fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'