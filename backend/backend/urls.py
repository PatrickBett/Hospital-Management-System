
from django.contrib import admin
from django.urls import path,include
from members import views
from hospital import views
urlpatterns = [
    # path('', views.home ),
    path('admin/', admin.site.urls),
    path('api/', include('members.urls')),
    path('api/', include('hospital.urls')),
]
