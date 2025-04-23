from django.urls import path,include
from .views import SpecializationView, DoctorDetailView

urlpatterns = [
    path("specializations/", SpecializationView.as_view(), name="specializations"),
    path("doctordetails/", DoctorDetailView.as_view(), name="doctordetails"),
]