from django.shortcuts import render

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
