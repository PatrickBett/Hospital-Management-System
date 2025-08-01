from django.contrib import admin
from .models import Room, Roomtype,Department, Appointment, Medicine, Message, Payment
# Register your models here.
admin.site.register(Room)
admin.site.register(Roomtype)
admin.site.register(Department)
admin.site.register(Appointment)
admin.site.register(Medicine)
admin.site.register(Message)
admin.site.register(Payment)

  