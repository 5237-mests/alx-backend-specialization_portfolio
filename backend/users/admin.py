from django.contrib.auth.admin import UserAdmin
from django.contrib import admin
from .models import Employee

# Register your models here.

class UserAdmin(UserAdmin):
    # ordering = ('-date_joined',)
    #list_display = ('username', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser')
    list_display = ('username', 'password')
    #exclude = ("date_joined", )
    # list_filter = ('username', 'firstname',)
admin.site.register(Employee, UserAdmin)