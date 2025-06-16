from django.shortcuts import render
from .serializers import RoomSerializer,RoomtypeSerializer,DepartmentSerializer,AppointmentSerializer
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Room, Roomtype, Department, Appointment
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
# View to list all Room types
class RoomTypeView(APIView):
    permission_classes = [IsAuthenticated] #Only authenticated users

    def get(self,request):
        roomtypes = Roomtype.objects.all()
        serializer = RoomtypeSerializer(roomtypes, many=True)
        return Response(serializer.data)
    
# View to list all Rooms
class RoomView(APIView):
    permission_classes = [IsAuthenticated] #Only authenticated users

    def get(self,request):
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)

# View to list all Departments
class DepartmentView(APIView):
    # permission_classes = [IsAuthenticated] #Only authenticated users

    def get(self,request):
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)
    
# View to list all Apointments
class AppointmentsView(APIView):
    permission_classes = [IsAuthenticated] #Only authenticated users

    def get(self,request):
        if request.user.role == "admin":
            appointments = Appointment.objects.all()
        else:
            appointments = Appointment.objects.filter(patient=request.user)    
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(patient=request.user)
            print("Request user",request.user)
            print("Self Request user",self.request.user)
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors)
    
class UpdateAppointmentStatusView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self,request,pk):
        try:
            appointment =  Appointment.objects.get(pk=pk)

        except Appointment.DoesNotExist:
            return Response({
                "error":"Appointment not found"
            })
        
        new_status = request.data.get("status")
        if new_status not in dict(Appointment.STATUS_CHOICES):
            return Response({
                "error":"Invalid Status Value"
            })
        appointment.status = new_status
        appointment.save()

        return Response(AppointmentSerializer(appointment).data)
    

# View to list all Doctors Apointments
class AppointmentsDoctorView(APIView):
    
    def get(self, request):
        appointments = Appointment.objects.filter(doctor = request.user)
        serializer = AppointmentSerializer(appointments, many = True)
        return Response(serializer.data)
    
    
    
