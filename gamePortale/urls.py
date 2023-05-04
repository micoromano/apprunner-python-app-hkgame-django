from django.urls import path
from .views import gamePortale_api_app_w
from gamePortale.api.views import CredentialsOfferAPIView

from . import views

urlpatterns = [
    path("getList/",
         CredentialsOfferAPIView.as_view(),
         name="getList"),]