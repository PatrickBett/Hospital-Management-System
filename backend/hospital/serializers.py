from rest_framework import serializers
from .models import Room, Roomtype, Department, Appointment
# from members.serializers import CustomUserSerializer
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
    # doctor = CustomUserSerializer()
    class Meta:
        model = Appointment
        fields = ['doctor', 'department', 'date', 'time', 'problem', 'patient','status']
        read_only_fields = ['patient']  # prevent it from being required in POST