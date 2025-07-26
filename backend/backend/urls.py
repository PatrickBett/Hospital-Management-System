
from django.contrib import admin
from django.urls import path,include
from members import views as members_views
from hospital import views as hospital_views
from doctor import views as doctor_views
urlpatterns = [
    path('', members_views.home,name ="home"),
    path('admin/', admin.site.urls),
    path('api/', include('members.urls')),
    path('api/', include('hospital.urls')),
    path('api/', include('doctor.urls')),
]
