from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.utils import timezone


class Employee(AbstractUser):
    """Custom Auth Users (Employee models)"""
    username = models.IntegerField(
        _("Username"), null=False, unique=True, blank=False)
    first_name = models.CharField(max_length=255, null=False, blank=False)
    middlename = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    date_joined = models.DateTimeField(_("Date joined"), default=timezone.now)
    curposition = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(unique=True, null=False, blank=False)
    password = models.CharField(max_length=255, null=False, blank=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["password", "first_name", "email"]

    def __str__(self) -> str:
        return f"{self.username} - {self.first_name}"
