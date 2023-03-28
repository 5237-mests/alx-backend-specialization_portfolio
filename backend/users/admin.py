from django.contrib.auth.admin import UserAdmin
from django.contrib import admin
from .models import Employee


# Register your models to be controlled with django admin panel
# class MyUserAdmin(admin.ModelAdmin):
#     class Meta:
#         fields = "__all__"


admin.site.register(Employee)
