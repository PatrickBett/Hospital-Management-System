from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import requests
from django.conf import settings
from django.http import JsonResponse
import base64
from django.utils import timezone

def get_mpesa_access_token():
    consumer_key = settings.MPESA_CONSUMER_KEY
    consumer_secret = settings.MPESA_CONSUMER_SECRET
    api_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'

    response = requests.get(api_url, auth=(consumer_key, consumer_secret))
    if response.status_code == 200:
        return response.json().get('access_token')  # Get access token from JSON response
    return None

def lipa_na_mpesa_online(request):
    access_token = get_mpesa_access_token()  # Call the function to get the token

    if access_token is None:
        return JsonResponse({'error': 'Failed to get access token'}, status=400)

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
        "PhoneNumber": "254791474737",  # User's phone number
        "CallBackURL": "https://your-callback-url.com/",
        "AccountReference": "Test123",
        "TransactionDesc": "Payment for Test"
    }

    response = requests.post(api_url, json=payload, headers=headers)
    
    if response.status_code == 200:
        return JsonResponse(response.json())  # Return the response from the M-Pesa API
    else:
        return JsonResponse({'error': 'Payment initiation failed'}, status=response.status_code)



@csrf_exempt
def mpesa_callback(request):
    # Process callback data from Safaricom here
    return JsonResponse({"status": "success"})