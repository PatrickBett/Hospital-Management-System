
from django.contrib import admin
from django.urls import path,include
from members import views
from hospital import views
from doctor import views
urlpatterns = [
    
    path('admin/', admin.site.urls),
    path('api/', include('members.urls')),
    path('api/', include('hospital.urls')),
    path('api/', include('doctor.urls')),
]
