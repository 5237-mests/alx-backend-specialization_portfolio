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
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BaseAuthentication, TokenAuthentication
# Create your views here.

class TestAuthView(generics.GenericAPIView):
    authentication_classes = [TokenAuthentication,SessionAuthentication, BaseAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        return Response({"status": "Authenticated"})

class ExamRegisterAPIView(generics.GenericAPIView):
    authentication_classes = [TokenAuthentication,SessionAuthentication, BaseAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        print(request.data)
        return Response({"ok": "registed"})
class UserGetByUserNameAPIVIew(generics.RetrieveAPIView):
    authentication_classes = [TokenAuthentication,SessionAuthentication, BaseAuthentication]
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
    authentication_classes = [TokenAuthentication,SessionAuthentication, BaseAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    
   
    def post(self, request):
        print(request.data, "FROM Reatc")
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            password = request.data.get("password")
            user = Employee.objects.create(**request.data)
            user.set_password(password)
            user.save()
            user_ser = EmployeeSerializer(user)
            return Response(user_ser.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class UserDeleteUpdateViewAPIVIew(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication,SessionAuthentication, BaseAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer



class JobListCreateAPIView(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication,SessionAuthentication, BaseAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Job.objects.all()
    serializer_class = JobSerializer
class JobUpdateDeleteGetAPIVIew(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication,SessionAuthentication, BaseAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Job.objects.all()
    serializer_class = JobSerializer


class QuestionListCreateAPIView(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication,SessionAuthentication, BaseAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Question.objects.all()
    serializer_class = QuesionSerializer

class QuestionListAPIViewByJobCode(generics.ListAPIView):
    authentication_classes = [TokenAuthentication,SessionAuthentication, BaseAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = QuesionSerializer
    def get_queryset(self):
        queryset = Question.objects.filter(job__jobCode =self.kwargs["jobCode"])
        return queryset
    

class QuestionListAPIViewByJobID(generics.ListAPIView):
    serializer_class = QuesionSerializer
    authentication_classes = [TokenAuthentication,SessionAuthentication, BaseAuthentication]
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        queryset = Question.objects.filter(job__pk=self.kwargs["pk"])
        # add to job model q quantity
        job= Job.objects.get(pk=self.kwargs["pk"])
        queryset = random.sample(list(queryset),k=job.totalquestions)
        return queryset
    
class ExamResultListCreateView(generics.ListCreateAPIView):
   authentication_classes = [TokenAuthentication,SessionAuthentication, BaseAuthentication]
   permission_classes = [IsAuthenticated]
   queryset = ExamResult.objects.all()
   serializer_class = ExamResultSerializer
   #permission_classes = [IsAuthenticated,]
   def create(self, request, *args, **kwargs):
       us = json.loads(request.data.get("userAnswer")) #use ans dict  job:{"question_19": "Copper"}
    #    print("The job id is", request.data.get("job"))
       selected = [key.split("_")[1] for key in us]
       print(selected)
       correctAns = Question.objects.filter(job__pk=request.data.get("job")).filter(pk__in=selected)
       total = Job.objects.get(pk=request.data.get("job")).totalquestions
       ans = {f"question_{q.id}": q.ans  for q in correctAns} # ans dict
    #    print(ans, "The ans")
       score = 0.0
       for key, val in us.items():
           if val == ans[key]:
               score += 1
       print("You scored", score, 'out of', len(ans))
       instance = ExamResult.objects.create(user=Employee.objects.get(pk=request.data.get("user")),
                                            job=Job.objects.get(pk=request.data.get("job")),
                                            userAnswer=request.data.get("userAnswer"),
                                            score=score, total=total)
       instance.save()
       serializer = ExamResultSerializer(instance)
       return Response(serializer.data)

class ExamResultDeleteUpdateGetAPIView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication,SessionAuthentication, BaseAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = ExamResult.objects.all()
    serializer_class = ExamResultSerializer
    def get(self, request, *args, **kwargs):
        queryset = ExamResult.objects.filter(user__pk=self.kwargs["pk"]).first()
        serializer = ExamResultSerializer(queryset)
        return Response(serializer.data)
    def delete(self, request, *args, **kwargs):
        queryset = ExamResult.objects.filter(pk=self.kwargs["pk"]).first()
        queryset.delete()
        return Response({})
    
class ExamResultDeleteUpdateGetByJob(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication,SessionAuthentication, BaseAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = ExamResult.objects.all()
    serializer_class = ExamResultSerializer(many=True)
    def get(self, request, *args, **kwargs):
        queryset = ExamResult.objects.filter(job__pk=self.kwargs["pk"])
        serializer = ExamResultSerializer(queryset, many=True)
        return Response(serializer.data)
   
class ExamCandiateListCreateView(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication,SessionAuthentication, BaseAuthentication]
    permission_classes = [IsAuthenticated]
    queryset =  ExamCandidates.objects.all()
    serializer_class = ExamCandidateSerializer
    # def get_queryset(self):
    #     queryset = ExamCandidates.objects.filter(user__pk=self.kwargs["pk"])
    #     return queryset

class ExamCandDeleteUpdateGetAPIView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication,SessionAuthentication, BaseAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = ExamCandidates.objects.all()
    serializer_class = ExamCandidateSerializer
    def get(self, request, *args, **kwargs):
        queryset = ExamCandidates.objects.filter(user__id= kwargs["pk"]).first()
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