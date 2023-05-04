from rest_framework import serializers
from gamePortale.models import Credentials


class CredentialsOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credentials.objects.get()
        fields = "__all__"

