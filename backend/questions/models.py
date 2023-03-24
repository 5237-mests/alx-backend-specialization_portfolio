from django.db import models
from users.models import Employee


class Job(models.Model):
    """Job list table"""
    name = models.CharField(max_length=255, null=False, blank=False) 
    jobCode = models.CharField(max_length=255, null=False, blank=False)
    jobGrade = models.CharField(max_length=20, null=False, blank=False)
    totalquestions = models.IntegerField(default=3)
    allowedtime = models.IntegerField(default=60)# in minute
    def __str__(self) -> str:
        return f'{self.id} - {self.jobCode}'

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


# use1 3 {} 8 HR
# use1 3 {} 8 ENG
# use 3 {} PL
# us2 3 {} 87 HR

class ExamResult(models.Model):
    "Table for list of exam results by user and job code"
    user = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True)
    examDate = models.DateTimeField(auto_now_add=True)
    userAnswer = models.TextField()
    score = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    total = models.IntegerField(default=0)
    job = models.ForeignKey(Job, on_delete=models.SET_NULL, null=True)
    class Meta:
        unique_together = (('job', 'user'),)
    def __str__(self) -> str:
        return str(self.score)


class ExamCandidates(models.Model):
    """ List of approved exam candidates"""
    user = models.ForeignKey(Employee, on_delete=models.CASCADE)
    examDate = models.DateTimeField()
    job= models.ForeignKey(Job, on_delete=models.CASCADE)
    exam_taken =models.BooleanField(default=False)
    class Meta:
        unique_together = (('job', 'user'),)
    def __str__(self) -> str:
        return str(self.user.id)