"""
Authentication urls
"""
from django.urls import path
from .views import LoginAPIView, get_csrftoken, logoutAPIView, UserDetalView


urlpatterns = [
    path("getcsrf/", get_csrftoken),  # Get CSRFTOKEN
    path("login", LoginAPIView),  # Authenticate login and send sessionid
    path("logout/", logoutAPIView),  # logout session
    path("users/me/<int:username>/", UserDetalView.as_view())
]
