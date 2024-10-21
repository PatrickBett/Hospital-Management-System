from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import requests
from django.conf import settings
from django.http import JsonResponse
import base64
from django.utils import timezone

def get_mpesa_access_token(request):
    consumer_key = settings.MPESA_CONSUMER_KEY
    consumer_secret = settings.MPESA_CONSUMER_SECRET
    api_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'

    response = requests.get(api_url, auth=(consumer_key, consumer_secret))
    if response.status_code == 200:
        access_token = response.json().get('access_token')
        return JsonResponse({'access_token': access_token})
    return JsonResponse({'error': 'Failed to get access token'}, status=400)


def lipa_na_mpesa_online(request):
    access_token = get_mpesa_access_token(request).json().get('access_token')

    api_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
    headers = {"Authorization": f"Bearer {access_token}"}

    timestamp = timezone.now().strftime('%Y%m%d%H%M%S')
    password = base64.b64encode(f"{settings.MPESA_SHORTCODE}{settings.MPESA_PASSKEY}{timestamp}".encode()).decode()

    payload = {
        "BusinessShortCode": settings.MPESA_SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": 1,  # Test amount
        "PartyA": "254791474737",  # User's phone number
        "PartyB": settings.MPESA_SHORTCODE,
        "PhoneNumber": "2547XXXXXXXX",  # User's phone number
        "CallBackURL": "https://hospital-management-system-30uy.onrender.com/",
        "AccountReference": "Test123",
        "TransactionDesc": "Payment for Test"
    }

    response = requests.post(api_url, json=payload, headers=headers)
    return JsonResponse(response.json())


@csrf_exempt
def mpesa_callback(request):
    # Process callback data from Safaricom here
    return JsonResponse({"status": "success"})