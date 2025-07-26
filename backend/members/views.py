from django.shortcuts import render
from .models import CustomUser
from rest_framework.response import Response
from rest_framework.views import APIView
from google.oauth2 import id_token
from google.auth.transport import requests
from django.http import HttpResponse
from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer,ProfileSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.

def home(request):
    return HttpResponse("Hospital Management System API")

class CustomUserListView(APIView):
    permission_classes = [AllowAny]
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
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class GoogleLoginView(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        token = request.data.get("token")
        userType = request.data.get("userType")
        try:
            #verify token with google
            idinfo = id_token.verify_oauth2_token(token,requests.Request())
            email = idinfo["email"]
            name = idinfo["name"]

            #create user if not exist
            user, created = CustomUser.objects.get_or_create(username = email, defaults={"first_name" : name}, role = userType)
            #create jwt tokens
            refresh = RefreshToken.for_user(user)

            return Response({
                "refresh_token": str(refresh),
                "access_token": str(refresh.access_token,),
                "role": str(userType),
            })
        except Exception as e:
            return Response({"error":str(e)})