from .views import RoomTypeView,RoomView,DepartmentView, UpdateAppointmentStatusView, AppointmentsView, AppointmentsDoctorView, MessageView
from django.urls import path

urlpatterns = [
    path('roomtypes/', RoomTypeView.as_view(),name="roomtype"),
    path('rooms/', RoomView.as_view(),name="room"),
    path('departments/', DepartmentView.as_view(),name="departments"),
    path('appointments/', AppointmentsView.as_view(),name="appointments"),
    path('appointments/doctor/', AppointmentsDoctorView.as_view(),name="doctorsappointments"),
    path('appointments/<int:pk>/update-status/', UpdateAppointmentStatusView.as_view(), name='update-appointment-status'),
    path('messages/', MessageView.as_view(),name="messages"),
]
