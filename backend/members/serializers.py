from .models import CustomUser, Profile
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from hospital.serializers import RoomSerializer, AppointmentSerializer
from doctor.serializers import DoctordetailSerializer

class CustomUserSerializer(serializers.ModelSerializer):
    appointments = AppointmentSerializer(read_only = True)
    doctordetails = DoctordetailSerializer(source='doctordetail', read_only=True)
    room = RoomSerializer(read_only=True)
    
    class Meta:
        model = CustomUser
        fields = '__all__'

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)  # Hash the password
        user.save()
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['role'] = user.role  # Replace with `user.is_staff`, etc., if you don't have a `role` field

        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['role'] = self.user.role  # Include in response data too
        return data
