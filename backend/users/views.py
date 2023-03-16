# from django.shortcuts import render
from django.urls import path
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.http import HttpResponse
# from . import views
# Create your views here.

from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["POST"])
def logout_view(request):
    logout(request)
    return Response({"status": "OK"}, status=status.HTTP_200_OK)

@api_view(["POST"])
def login_view(request):
    print("The request", request)
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        print(username, password)
        user = authenticate(request, username=username, password=password) # check on Db
        print(user, "is user")
        if user is not None:
            login(request, user)
            headers = {}
            # headers = {
            #         'Access-Control-Allow-Origin': '*',
            #         'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
            #         'Access-Control-Allow-Methods': '*',
            #         "Content-Type": "application/json"
            #     }
            try:
                token = Token.objects.get(user_id=user.id)
                headers["Authorization"] = token.key
            except Token.DoesNotExist:
                token = Token.objects.create(user=user)
                headers["Authorization"] = token.key
               
            return Response({"status" :"OK", "userid": user.id}, status=status.HTTP_200_OK, headers=headers)
        else:
            # Return an 'invalid login' error message.
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({"try": "other"}, status=status.HTTP_400_BAD_REQUEST)