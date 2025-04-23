from .views import RoomTypeView,RoomView,DepartmentView,AppointmentsView
from django.urls import path

urlpatterns = [
    path('roomtypes/', RoomTypeView.as_view(),name="roomtype"),
    path('rooms/', RoomView.as_view(),name="room"),
    path('departments/', DepartmentView.as_view(),name="departments"),
    path('appointments/', AppointmentsView.as_view(),name="appointments"),
]
