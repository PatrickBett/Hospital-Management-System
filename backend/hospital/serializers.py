from rest_framework import serializers
from .models import Room, Roomtype, Department, Appointment, Message

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

# Import the base class for creating serializers from Django REST Framework
class AppointmentSerializer(serializers.ModelSerializer):
    
    # Override the default representation method to customize the serialized output
    def to_representation(self, instance):
        # Import CustomUserSerializer inside the method to avoid circular import issues
        from members.serializers import CustomUserSerializer  # Lazy import

        # Call the parent class’s to_representation to get the default serialized data
        rep = super().to_representation(instance)

        # Replace the default doctor ID with serialized doctor data
        rep['doctor'] = CustomUserSerializer(instance.doctor).data

        # Replace the default patient ID with serialized patient data
        rep['patient'] = CustomUserSerializer(instance.patient).data
        rep['id'] = instance.id
        # Return the updated representation
        return rep

    # Inner class to specify metadata for the serializer
    class Meta:
        model = Appointment  # The model this serializer is for
        fields = ['doctor', 'department', 'date', 'time', 'problem', 'patient', 'status']  # Fields to include in serialization
        read_only_fields = ['patient']  # Prevent the 'patient' field from being required in POST requests


class MessageSerializer(serializers.ModelSerializer):
      
    class Meta:
        model = Message
        fields = '__all__'
        
