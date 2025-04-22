from .views import RoomTypeView
from django.urls import path

urlpatterns = [
    path('roomtypes/', RoomTypeView.as_view(),name="roomtype")
]
