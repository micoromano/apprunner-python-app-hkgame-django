from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
import os
from gamePortale.models import Credentials as Credentials
from gamePortale.api.serializers import CredentialsOfferSerializer
from dynamodb_json import json_util as dynamodb_json
import boto3
from botocore.exceptions import ClientError
import logging as logger
import datetime
from ninja import Schema, Path

class CredentialsOfferAPIView(APIView):

    #def get(self, request):
    #    credentials = Credentials.objects.filter()
    #    serializer = CredentialsOfferSerializer(credentials, many=True)
    #    return Response(serializer.data)

    def get(self, request):
        region_name = 'eu-north-1'
        dynamodb = boto3.resource('dynamodb',region_name)
        table = dynamodb.Table('credentials')

        try:
            response = table.scan()
            logger.info(response)
            print(response['Items'])

        except ClientError as e:
            logger.warning(e.response['Error']['Message'])
        #else:
        #    data_str = response['Item']
        #    _data_dict = dynamodb_json.loads(data_str)

            # Validation and modification of incoming data goes here.
            # Then you can do whatever you need, for example:
        #    obj, created = Credentials.objects.update_or_create(_data_dict)

        _data_dict = dynamodb_json.loads(response)

        print(_data_dict)
        serializer = CredentialsOfferSerializer(_data_dict, many=True)
        return Response(_data_dict['Items'])




