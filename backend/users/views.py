import json
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from users.models import Employee
from questions.serializer import EmployeeSerializer
from rest_framework.response import Response


def get_csrftoken(request):
    """Get CSRF Token"""
    resp = JsonResponse({"csrftoken": get_token(request)})
    return resp


@require_POST
def LoginAPIView(request):
    """Authenicate and give session id to user up on login"""
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")
    if username and password:
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)  # generate session_id
            return JsonResponse(
                {"status": "logged in"}, status=status.HTTP_200_OK)
    return JsonResponse(
        {"status": "invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


def logoutAPIView(request):
    """Log out user"""
    logout(request)
    return JsonResponse({"status": "OK"}, status=status.HTTP_200_OK)


class UserDetalView(generics.RetrieveUpdateAPIView):
    """User Detail and update view"""
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    queryset = Employee.objects.all()

    def get(self, request, *args, **kwargs):
        """ override get method to use username"""
        user = Employee.objects.filter(username=kwargs["username"]).first()
        if not user:
            return Response({"statu": "Not Found"},
                            status=status.HTTP_404_NOT_FOUND)
        serializer = EmployeeSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        """ override update method"""
        instance = Employee.objects.filter(
            username=request.data.get("username")).first()
        if not instance:
            return Response({"status": "Not Found"},
                            status=status.HTTP_404_NOT_FOUND)
        instance.first_name = request.data.get("first_name",
                                               instance.first_name)
        instance.last_name = request.data.get("last_name",
                                              instance.last_name)
        instance.middlename = request.data.get("middlename",
                                               instance.middlename)
        instance.curposition = request.data.get("curposition",
                                                instance.curposition)
        instance.email = request.data.get("email",
                                          instance.email)
        instance.save()
        serialzer = EmployeeSerializer(instance)
        return Response(serialzer.data, status=status.HTTP_200_OK)
