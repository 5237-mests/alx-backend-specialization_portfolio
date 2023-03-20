from django.db import models
from users.models import Employee

# Create your models here.
class Job(models.Model):
    """Job list table"""
    name = models.CharField(max_length=255, null=False, blank=False) #Engineer 2
    jobCode = models.CharField(max_length=255, null=False, blank=False)
    jobGrade = models.CharField(max_length=20, null=False, blank=False) #D2
    totalquestions = models.IntegerField(default=3)
    def __str__(self) -> str:
        return f'{self.name}- {self.jobCode} - {self.jobCode}'

class Question(models.Model):
    """Question table"""
    text = models.TextField(max_length=1000, null=False, blank=False)
    cha = models.CharField(max_length=255, null=False, blank=False)
    chb = models.CharField(max_length=255, null=False, blank=False)
    chc = models.CharField(max_length=255, null=False, blank=False)
    chd = models.CharField(max_length=255, null=False, blank=False)
    ans = models.CharField(max_length=255, null=False, blank=False)
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="questions", related_query_name="job")
    def __str__(self) -> str:
        return self.text


class ExamResult(models.Model):
    user = models.OneToOneField(Employee, on_delete=models.DO_NOTHING)
    examDate = models.DateTimeField(auto_now_add=True)
    userAnswer = models.TextField()
    score = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    total = models.IntegerField(default=0)
    job = models.ForeignKey(Job, on_delete=models.CASCADE, unique=True)
    def __str__(self) -> str:
        return self.score

class ExamCandidates(models.Model):
    user = models.OneToOneField(Employee, on_delete=models.CASCADE)
    examDate = models.DateTimeField()
    job= models.ForeignKey(Job, on_delete=models.CASCADE)
    def __str__(self) -> str:
        return str(self.user.id)