from django.db import models

# Create your models here.
class Job(models.Model):
    """Job list table"""
    name = models.CharField(max_length=255, null=False, blank=False) #Engineer 2
    jobcode = models.CharField(max_length=255, null=False, blank=False)
    jobgrade = models.CharField(max_length=20, null=False, blank=False) #D2

class Question(models.Model):
    """Question table"""
    text = models.TextField(max_length=1000, null=False, blank=False)
    cha = models.CharField(max_length=255, null=False, blank=False)
    chb = models.CharField(max_length=255, null=False, blank=False)
    chc = models.CharField(max_length=255, null=False, blank=False)
    chd = models.CharField(max_length=255, null=False, blank=False)
    ans = models.CharField(max_length=255, null=False, blank=False)
    jobid = models.ForeignKey(Job, on_delete=models.CASCADE)


class Employee(models.Model):
    """List of Employees"""
    id = models.IntegerField(max_length=10, null=False, unique=True, blank=False)
    firstname = models.CharField(max_length=255, null=False, blank=False)
    middlename = models.CharField(max_length=255, null=False, blank=False)
    lastname = models.CharField(max_length=255, null=False, blank=False)
    datejoined = models.DateField(null=False, blank=False)
    curposition = models.CharField(max_length=255, null=False, blank=False)
    jobid = models.ForeignKey(Job, null=True, on_delete=models.SET_NULL) # jobcode
    

