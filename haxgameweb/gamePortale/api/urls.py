from django.urls import path
from gamePortale.views import CredentialsOfferAPIView

urlpatterns = [
    path("getList/",
         CredentialsOfferAPIView.as_view(),
         name="getList"),
]