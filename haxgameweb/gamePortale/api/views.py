from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from gamePortale.models import Credentials
from gamePortale.serializers import CredentialsOfferSerializer

class CredentialsOfferAPIView(APIView):

    def get(self, request):
        credentials = Credentials.objects.filter(available=True)
        serializer = CredentialsOfferSerializer(credentials, many=True)
        return Response(serializer.data)