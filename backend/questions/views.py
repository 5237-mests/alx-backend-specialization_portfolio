from rest_framework import generics
from users.models import Employee
import random
import json
from .serializer import (
    ExamResultSerializer,
    RegisterSerializer,
    EmployeeSerializer,
    JobSerializer, 
    ExamCandidateSerializer,
    ExamResultSerializer,
    QuesionSerializer,
    )
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from users.models import Employee
from .models import Job, Question, ExamResult, ExamCandidates
# from knox.models import AuthToken
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import permission_classes
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

class TestAuthView(generics.GenericAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        return Response({"status": "Authenticated"})

class ExamRegisterAPIView(generics.GenericAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        print(request.data)
        return Response({"ok": "registed"})
class UserGetByUserNameAPIVIew(generics.RetrieveAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    def get(self, request, *args, **kwargs):
        try:
            queryset = Employee.objects.filter(username=kwargs.get("username")).first()
            serializer = EmployeeSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response({"status": "No User Found"}, status=status.HTTP_404_NOT_FOUND)
class UserListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionAuthentication]
    
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAdminUser]
    
    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = [AllowAny]
        return [perm() for perm in self.permission_classes]
    @method_decorator(csrf_exempt, name="dispatch")
    def post(self, request, *args, **kwargs):
        print(request.data, "FROM Reatc")
        serializer = EmployeeSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            password = request.data.get("password")
            user = Employee.objects.create(**request.data)
            user.set_password(password)
            user.save()
            user_ser = EmployeeSerializer(user)
            return Response(user_ser.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class UserDeleteUpdateViewAPIVIew(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionAuthentication]
    #permission_classes = [IsAuthenticated]
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer



class JobListCreateAPIView(generics.ListCreateAPIView):
    authentication_classes = [SessionAuthentication]
    #permission_classes = [IsAuthenticated]
    queryset = Job.objects.all()
    serializer_class = JobSerializer
class JobUpdateDeleteGetAPIVIew(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionAuthentication]
    #permission_classes = [IsAuthenticated]
    queryset = Job.objects.all()
    serializer_class = JobSerializer


class QuestionListCreateAPIView(generics.ListCreateAPIView):
    authentication_classes = [SessionAuthentication]
    # permission_classes = [IsAuthenticated]
    queryset = Question.objects.all()
    serializer_class = QuesionSerializer

class QuestionListAPIViewByJobCode(generics.ListAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = QuesionSerializer
    def get_queryset(self):
        queryset = Question.objects.filter(job__jobCode =self.kwargs["jobCode"])
        return queryset
    


# Ques  qid jobid 
# get all q for job 
# user 
class QuestionListAPIViewByJobID(generics.ListAPIView):
    serializer_class = QuesionSerializer
    authentication_classes = [SessionAuthentication]
    #permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        queryset = Question.objects.filter(job__pk=self.kwargs["pk"])
        print(queryset, "all q")
        if not queryset:
            return Response({"status": "No Question Found"}, status=status.HTTP_404_NOT_FOUND)
        # add to job model q quantity
        job= Job.objects.get(pk=self.kwargs["pk"])
        queryset = random.sample(list(queryset),k=job.totalquestions)
        serializer = QuesionSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


 
class ExamResultListCreateView(generics.ListCreateAPIView):
   authentication_classes = [SessionAuthentication]
   permission_classes = [IsAuthenticated]
   queryset = ExamResult.objects.all()
   serializer_class = ExamResultSerializer

   def get_permissions(self):
       if self.request.method == "POST":
           self.permission_classes = [IsAuthenticated]
       return [perm() for perm in self.permission_classes]
   def post(self, request, *args, **kwargs):
       us = json.loads(request.data.get("userAnswer"))
       selected = [key.split("_")[1] for key in us]
       correctAns = Question.objects.filter(job__pk=request.data.get("job")).filter(pk__in=selected)
       total = Job.objects.get(pk=request.data.get("job")).totalquestions
       ans = {f"question_{q.id}": q.ans  for q in correctAns}
       score = 0.0
       for key, val in us.items():
           if val == ans[key]:
               score += 1
       print("This will cause Interity error as employye is going to take multiple")
       instance = ExamResult.objects.create(user=Employee.objects.filter(username=request.data.get("user")).first(),
                                            job=Job.objects.get(pk=request.data.get("job")),
                                            userAnswer=request.data.get("userAnswer"),
                                            score=score, total=total)
       instance.save()
       print("No issue")
       serializer = ExamResultSerializer(instance)
       return Response(serializer.data)

class ExamEligbleGetAPIView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    queryset = ExamResult.objects.all()
    def get(self, request, *args, **kwargs):
        userid = kwargs.get("userid", None)
        jobid = kwargs.get("jobid", None)
        user = Employee.objects.get(username=userid)
        job = Employee.objects.get(pk=jobid)
        querset = ExamResult.objects.filter(user__username=userid, job__pk=jobid).first()
        if not querset:
            return Response({"can:": "Take exam"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ExamResultSerializer(querset)
        return Response(serializer.data, status=status.HTTP_200_OK)



class UpdateCandidateExamTaken(generics.GenericAPIView):
    serializer_class = ExamCandidateSerializer()
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    def post(self, request, *args, **kwargs):
        userid = kwargs.get("username", None)
        jobid = kwargs.get("jobid", None)
        print(request.data, "update data hackiy way")
        user = Employee.objects.get(username=userid)
        job = Employee.objects.get(pk=jobid)
        cand = ExamCandidates.objects.filter(user__username=userid, job__pk=jobid).first()
        if cand is None:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        cand.exam_taken=True
        cand.save()
        serializer = ExamCandidateSerializer(cand)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

class ExamResultsForUserAPIView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    queryset = ExamResult.objects.all()
    def get(self, request, *args, **kwargs):
        queryset = ExamResult.objects.filter(user__username=kwargs["username"]).all()
        if not queryset:
            return Response([])
        serializer = ExamResultSerializer(queryset, many=True)
        return Response(serializer.data)

class ExamResultDeleteUpdateGetAPIView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = ExamResult.objects.all()
    serializer_class = ExamResultSerializer
    def get(self, request, *args, **kwargs):
        userid = kwargs.get("username", None)
        jobid = kwargs.get("jobid", None)
        user = Employee.objects.get(username=userid)
        job = Employee.objects.get(pk=jobid)
        querset = ExamResult.objects.filter(user__username=userid, job__pk=jobid).first()
        if not querset:
            return Response({"can:": "Take exam"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ExamResultSerializer(querset)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def delete(self, request, *args, **kwargs):
        userid = kwargs.get("username", None)
        jobid = kwargs.get("jobid", None)
        user = Employee.objects.get(username=userid)
        job = Employee.objects.get(pk=jobid)
        queryset = ExamResult.objects.filter(user__username=userid, job__pk=jobid).first()
        #queryset = ExamResult.objects.filter(pk=self.kwargs["pk"]).first()
        queryset.delete()
        return Response({})
    
class ExamResultDeleteUpdateGetByJob(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = ExamResult.objects.all()
    serializer_class = ExamResultSerializer(many=True)
    def get(self, request, *args, **kwargs):
        queryset = ExamResult.objects.filter(job__pk=self.kwargs["pk"])
        if not queryset:
            return Response({"status": "No Result Found For the Job"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ExamResultSerializer(queryset, many=True)
        return Response(serializer.data)
   
class ExamCandiateListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = []
    queryset =  ExamCandidates.objects.all()
    serializer_class = ExamCandidateSerializer
    # def get_queryset(self):
    #     queryset = ExamCandidates.objects.filter(user__pk=self.kwargs["pk"])
    #     return queryset

class ExamAvailableListView(generics.GenericAPIView):
    queryset = ExamCandidates.objects.all()
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        queryset = ExamCandidates.objects.filter(user__username = kwargs["username"], exam_taken=False)
        if not queryset:
            return Response({"detail": "Not Found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ExamCandidateSerializer(queryset, many=True)
        return Response(serializer.data)


class ExamCandDeleteUpdateGetAPIView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = ExamCandidates.objects.all()
    serializer_class = ExamCandidateSerializer
    def get(self, request, *args, **kwargs):
        queryset = ExamCandidates.objects.filter(user__username= kwargs["username"], job__pk=kwargs["jobid"]).first()
        if queryset is None:
            return Response({"status": "Not Found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ExamCandidateSerializer(queryset)
        return Response(serializer.data)
    # def get_queryset(self):
    #     queryset = ExamCandidates.objects.filter(user__pk=self.kwargs["pk"])
    #     return queryset

# class UserLogin(generics.GenericAPIView):
#     serializer_class = RegisterSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         return Response({
#         "user":EmployeeSerializer(user, context=self.get_serializer_context()).data,
#         "token": AuthToken.objects.create(user)[1]
#         })