from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Staff,Doctor, Appointment, MedicalHistory,Prescription,Medication

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'is_staff', 'is_active','nationalid','phone','gender')
    list_filter = ('is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2')}
        ),
        ('Personal Information', {
            'classes': ('wide',),
            'fields': ('nationalid', 'phone', 'gender')}
        ),
        ('Permissions', {
            'classes': ('wide',),
            'fields': ('is_staff', 'is_active')}
        ),
    )
    search_fields = ('email', 'username')
    ordering = ('email',)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Staff)
admin.site.register(Doctor)
admin.site.register(Appointment)
admin.site.register(MedicalHistory)
admin.site.register(Medication)
admin.site.register(Prescription)