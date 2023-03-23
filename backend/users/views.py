import json
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.http import require_POST



def get_csrftoken(request):
    """Get CSRF Token"""
    resp = JsonResponse({"csrftoken": get_token(request)})
    return resp


@require_POST
def LoginAPIView(request):
    """Authenicate and give session id to user up on login"""
    data = json.loads(request.body)
    print("login dtaa", data)
    username = data.get("username")
    password = data.get("password")
    if username and password:
        user = authenticate(username=username, password=password)
        print("The user is", user)
        if user is not None:
            login(request, user)
            return JsonResponse({"status": "logged in"}, status=status.HTTP_200_OK)
    return JsonResponse({"status": "invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


def logoutAPIView(request):
    """Log out user"""
    logout(request)
    return JsonResponse({"status": "OK"}, status=status.HTTP_200_OK)