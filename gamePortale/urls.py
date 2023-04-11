from django.urls import path
from .views import gamePortale_api_app_w

from . import views

urlpatterns = [
    path('api/user', gamePortale_api_app_w.as_view()),
]