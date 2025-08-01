import base64
import requests
from datetime import datetime
from rest_framework.decorators import api_view
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from .serializers import RoomSerializer,RoomtypeSerializer,DepartmentSerializer,AppointmentSerializer, MessageSerializer
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Room, Roomtype, Department, Appointment, Message, CustomUser
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes, authentication_classes
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
    
    
class MessageView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self,request):
        user = request.user
        if user.role == 'doctor':
            messages = Message.objects.filter(doctor = user)
        elif user.role == 'patient':
            messages = Message.objects.filter(patient = user)
        else:
            messages = Message.objects.none()
        
        message_data = []
        for message in messages:
            message_dict = {
                "id": message.id,
                "message": message.message,
                "doctor": message.doctor.username,
                "patient": message.patient.username,
            }
            message_data.append(message_dict)
        return Response(message_data)
    
    def post(self, request):
        serializer = MessageSerializer(data = request.data)
        if serializer.is_valid():
             patient = request.user
             message = request.data.get("message")
             doctor_id= request.data.get("doctor")

             try:
                 doctor = CustomUser.objects.get(id =doctor_id, role = 'doctor')
                 
             except CustomUser.DoesNotExist:
                 return Response({"error":"Doctor not found"})
             serializer.save(doctor = doctor, patient = patient, message = message)
             return Response(serializer.data)

        return Response(serializer.errors)

        

       

# function to pay appointment fee
@api_view(['POST'])
def mpesa_stk_push(request):
    mpesaNumber = request.data.get('mpesaNumber')
    consumer_key = settings.CONSUMER_KEY
    consumer_secret = settings.CONSUMER_SECRET
    shortcode = '174379'
    passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'

    #Get access token
    auth_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    auth_response = requests.get(auth_url, auth=(consumer_key, consumer_secret))
    access_token = auth_response.json().get('access_token')

    #create timestamp and password
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    data_to_encode = shortcode + passkey + timestamp
    password = base64.b64encode(data_to_encode.encode()).decode('utf-8')

    #Prepare STK push request
    stk_push_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
    headers = {
  'Content-Type': 'application/json',
  'Authorization': f'Bearer {access_token}'
}

    payload = {
    "BusinessShortCode": 174379,
    "Password": password,
    "Timestamp": timestamp,
    "TransactionType": "CustomerPayBillOnline",
    "Amount": 1,
    "PartyA": mpesaNumber,
    "PartyB": 174379,
    "PhoneNumber": mpesaNumber,
    "CallBackURL": "https://7c0c1ce77d07.ngrok-free.app/api/mpesa_callback/",
    "AccountReference": "MEDICARE PRO",
    "TransactionDesc": "Payment of Consultations" 
  }

    response = requests.post(stk_push_url,json=payload, headers=headers)


    return JsonResponse(response.json())

@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])  # disable authentication
def mpesa_callback(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            stk_callback = data['Body']['stkCallback']
            result_code = stk_callback.get('ResultCode')
            checkout_request_id = stk_callback.get('CheckoutRequestID')
            merchant_request_id = stk_callback.get('MerchantRequestID')
            result_desc = stk_callback.get('ResultDesc')

            callback_metadata = stk_callback.get('CallbackMetadata', {}).get('Item', [])
            metadata = {item['Name']: item.get('Value') for item in callback_metadata}

            amount = metadata.get('Amount')
            receipt_number = metadata.get('MpesaReceiptNumber')
            transaction_date = metadata.get('TransactionDate')
            phone_number = metadata.get('PhoneNumber')

            # ✅ Save to DB (optional, depends on your Payment model)
            # from .models import Payment
            # Payment.objects.create(
            #     phone_number=phone_number,
            #     amount=amount,
            #     receipt_number=receipt_number,
            #     transaction_date=transaction_date,
            #     result_code=result_code,
            #     checkout_request_id=checkout_request_id
            # )

            print("📲 STK Callback Received ✅")
            print("Phone:", phone_number, "Amount:", amount, "Status:", result_code)
            print(json.dumps(request.data, indent=4))  # logs body

            return JsonResponse({"ResultCode": 0, "ResultDesc": "Callback received successfully"}, status=200)

        except Exception as e:
            print("Error handling callback:", e)
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"message": "GET method not allowed"}, status=405)