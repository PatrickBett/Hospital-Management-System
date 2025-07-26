from django.urls import path
from .views import CustomUserListView, GoogleLoginView, home
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import MyTokenObtainPairView


urlpatterns = [
    
    path('users/',CustomUserListView.as_view(), name="users" ),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('google-login', GoogleLoginView.as_view(), name="googlelogin")
]