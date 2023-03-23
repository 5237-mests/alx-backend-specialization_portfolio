from django.contrib.auth.admin import UserAdmin
from django.contrib import admin
from .models import Employee

# Register your models here.

class MyUserAdmin(admin.ModelAdmin):
    # ordering = ('-date_joined',)
    #list_display = ('username', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser')
    fields = ('username', 'first_name', 'password', "email")
    #exclude = ("date_joined", "middlename", "last_name", "curposition")
    #list_filter = ('username', 'firstname', "email", "password")
admin.site.register(Employee, MyUserAdmin)