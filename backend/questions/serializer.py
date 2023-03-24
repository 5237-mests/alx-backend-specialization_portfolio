from rest_framework import serializers
from .models import Job, Question, ExamCandidates, ExamResult
from users.models import Employee

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'username', 'first_name', 'last_name', 'middlename', 'date_joined', 'curposition', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    # def create(self, validated_data):
    #     username = validated_data.pop("username")
    #     password = validated_data.po("password")
    #     user = Employee.objects.create_user(username, **validated_data)
    #     user.set_password(password)
    #     user.save()
    #     return user


class EmployeeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Employee
        fields = ('id', 'username', 'is_active', 'is_staff', 'is_superuser', 'first_name', 'last_name', 'middlename', 'date_joined', 'curposition', 'email', 'password')
        #extra_kwargs = {"password" : {"write_only": True}}
    def create(self, **validated_data):
       
        password = validated_data.pop("password")
        user = super().create(**validated_data)
        user.set_password(password)
        user.save()
        return user
    def update(self, instance, validated_data):
        
        instance.first_name=validated_data.get("first_name", instance.first_name)
        instance.last_name=validated_data.get("last_name", instance.last_name)
        instance.middlename=validated_data.get("middlename", instance.middlename)
        instance.curposition=validated_data.get("curposition", instance.curposition)
        instance.email=validated_data.get("email", instance.email)
        instance.is_staff=validated_data.get("is_staff", instance.is_staff)
        instance.is_superuser=validated_data.get("is_superuser", instance.is_superuser)
        instance.is_active=validated_data.get("is_active", instance.is_active)
        instance.set_password(validated_data["password"])
      
        instance.save()
        return instance


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ("name", "jobCode", "jobGrade", "id", "totalquestions", "allowedtime")
    
class QuesionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('text', "cha", "chb", "chc", "chd", "job", "id")

class ExamResultSerializer(serializers.ModelSerializer):
    user = EmployeeSerializer()
    job = JobSerializer()
    class Meta:
        model = ExamResult
        fields = ('user', 'examDate', 'userAnswer', 'score', 'job', "total", "id")



# class ExamResultSerializer(serializers.ModelSerializer):
#     # user = EmployeeSerializer(required=False)
#     # job = JobSerializer()
#     class Meta:
#         model = ExamResult
#         fields = ("id", 'user', "examDate", 'userAnswer', 'score', 'job', "total")



class ExamCandidateSerializer(serializers.ModelSerializer):
    user = EmployeeSerializer()
    job = JobSerializer()
    class Meta:
        model = ExamCandidates
        fields= (
                "id", "user", "examDate", "job", "exam_taken",
        )