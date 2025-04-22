from django.shortcuts import render
from .models import CustomUser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse
from .serializers import CustomUserSerializer,ProfileSerializer
# Create your views here.

def home(request):
    return HttpResponse("Hospital Management System API")

class CustomUserListView(APIView):
    def get(self,request):
        users = CustomUser.objects.all()
        serializer = CustomUserSerializer(users,many =True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)