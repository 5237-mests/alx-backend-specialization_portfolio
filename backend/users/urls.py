"""
Authentication urls
"""
from django.urls import path
from .views import LoginAPIView, get_csrftoken, logoutAPIView

urlpatterns = [

    path("getcsrf/", get_csrftoken),
    path("login", LoginAPIView),
    path("logout/", logoutAPIView),
]
