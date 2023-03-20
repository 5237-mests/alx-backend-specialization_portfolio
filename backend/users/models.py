from django.db import models
from django.contrib.auth.models import AbstractUser, AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from datetime import datetime
# from questions.models import Job

# Create your models here.
class MyUserManager(BaseUserManager):
    def create_user(self, username, password, **kwargs):
        if not username:
            raise ValueError(_("You must provide unique  username"))
        user = self.model(username=username, **kwargs)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, username, password, **kwargs):
        kwargs.setdefault("is_staff", True)
        kwargs.setdefault("is_superuser", True)
        kwargs.setdefault("is_active", True)
        return self.create_user(username, password, **kwargs)


class Employee(AbstractUser):
    """List of Employees"""
    username = models.IntegerField(_("Username"),null=False, unique=True, blank=False)
    first_name = models.CharField(max_length=255, null=False, blank=False)
    middlename = models.CharField(max_length=255, null=False, blank=False)
    last_name = models.CharField(max_length=255, null=False, blank=False)
    date_joined = models.DateTimeField(_("Date joined"),default=timezone.now)
    curposition = models.CharField(max_length=255, null=False, blank=False)
    # jobid = models.ForeignKey(Job, null=True, on_delete=models.SET_NULL) # jobcode
    email = models.EmailField(unique=True, null=False, blank=False)
    password = models.CharField(max_length=255, null=False, blank=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    registered_by = models.ForeignKey("Employee", on_delete=models.SET_DEFAULT, default=4)
    # objects = MyUserManager()
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["password", "email"]


    def __str__(self) -> str:
        return f"{self.username} - {self.first_name}"
    
