from django.shortcuts import render
from .models import Specialization, Doctordetail
from members.models import CustomUser
from members.serializers import CustomUserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import SpecializationSerializer, DoctordetailSerializer
# Create your views here.

class SpecializationView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self,request):
        specializations = Specialization.objects.all()
        serializer = SpecializationSerializer(specializations, many=True)
        return Response(serializer.data)


class DoctorDetailView(APIView):
    
    # permission_classes = [IsAuthenticated]
    def get(self,request):
        details = Doctordetail.objects.all()
        serializer = DoctordetailSerializer(details, many=True)
        return Response(serializer.data)