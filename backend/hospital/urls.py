from .views import RoomTypeView,RoomView,DeleteDepartmentView,DepartmentView, UpdateAppointmentStatusView,ListInventoryView, AppointmentsView, AppointmentsDoctorView, MessageView, mpesa_stk_push, mpesa_callback
from django.urls import path

urlpatterns = [
    path('roomtypes/', RoomTypeView.as_view(),name="roomtype"),
    path('rooms/', RoomView.as_view(),name="room"),
    path('inventory/', ListInventoryView.as_view(), name="inventory"),


    path('departments/', DepartmentView.as_view(),name="departments"),
    path('departments/<int:pk>/', DeleteDepartmentView.as_view(), name='delete-department'),

    path('appointments/', AppointmentsView.as_view(),name="appointments"),
    path('appointments/doctor/', AppointmentsDoctorView.as_view(),name="doctorsappointments"),
    path('appointments/<int:pk>/update-status/', UpdateAppointmentStatusView.as_view(), name='update-appointment-status'),

    path('messages/', MessageView.as_view(),name="messages"),
    path('stk-push/', mpesa_stk_push,name="stk-push"),
    path('mpesa_callback/', mpesa_callback,name="mpesa_callback"),
]
