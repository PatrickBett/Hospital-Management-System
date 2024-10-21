# urls.py
from django.urls import path
from .views import get_mpesa_access_token, lipa_na_mpesa_online, mpesa_callback

urlpatterns = [
    path('mpesa-token/', get_mpesa_access_token),
    path('mpesa-payment/', lipa_na_mpesa_online),
    path('mpesa-callback/', mpesa_callback),
]
