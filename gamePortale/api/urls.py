import json

from django.urls import path
from gamePortale.api.views import CredentialsOfferAPIView
from dynamodb_json import json_util as dynamodb_json
import boto3
from botocore.exceptions import ClientError
from ninja import NinjaAPI
from ninja import Schema
import json

from gamePortale.models import InfoTpl as InfoTpl
api = NinjaAPI()
class info(Schema):
    idUser: str
    type: str
    infos: str

@api.get("/getUser/{user}/{password}")
def add(request, user, password):
    return findUser(user,password)

@api.get("/getUserD/{user}")
def add(request, user):
    return findUserD(user)

@api.get("/getUserData/{iduser}/{type}")
def add(request, iduser, type):
    return getUserData(request,iduser,type)

@api.get("/getUserQuestions/{id}")
def add(request, id):
    return findQuestions(id)

@api.post("/setUserData")
def add(request,payload:info):
    print("---->"+str(payload))
    return setUserData(request,payload.idUser,payload.type,payload.infos)

@api.get("/userList")
def add(request):
    return findFakeUser()

@api.get("/checkLivLogin/{user}/{pwd}")
def add(request,user,pwd):
    return findUserFake(pwd)

def findFakeUser():
    region_name = 'eu-central-1'
    dynamodb = boto3.resource('dynamodb',region_name)
    table = dynamodb.Table('Items')
    try:
        response = table.scan()

    except ClientError as e:
        response = "{""Item"":""empty""}"
        #else:
        #    data_str = response['Item']
        #    _data_dict = dynamodb_json.loads(data_str)

        # Validation and modification of incoming data goes here.
        # Then you can do whatever you need, for example:
        #    obj, created = Credentials.objects.update_or_create(_data_dict)

    _data_dict = dynamodb_json.loads(response)

    return _data_dict
def findUser(user,pwd):
    region_name = 'eu-north-1'
    dynamodb = boto3.resource('dynamodb',region_name)
    table = dynamodb.Table('credentials')

    try:
        response =  response = table.get_item(
            Key={'groupName': user})
        print(response)

    except ClientError as e:
        response = "{""Item"":""empty""}"
    #else:
    #    data_str = response['Item']
    #    _data_dict = dynamodb_json.loads(data_str)

    # Validation and modification of incoming data goes here.
    # Then you can do whatever you need, for example:
    #    obj, created = Credentials.objects.update_or_create(_data_dict)

    _data_dict = dynamodb_json.loads(response)



    if _data_dict['Item']['groupName'] == user and _data_dict['Item']['password'] == pwd:
        return  "true"
    else:
        return  "false"
    #return _data_dict['Item']

def findUserFake(pwd):
    region_name = 'eu-north-1'
    dynamodb = boto3.resource('dynamodb',region_name)
    table = dynamodb.Table('firstLevel')

    try:
        response =  response = table.get_item(
            Key={'password': pwd})
        print(response)

    except ClientError as e:
        response = "{""Item"":""empty""}"
    #else:
    #    data_str = response['Item']
    #    _data_dict = dynamodb_json.loads(data_str)

    # Validation and modification of incoming data goes here.
    # Then you can do whatever you need, for example:
    #    obj, created = Credentials.objects.update_or_create(_data_dict)

    _data_dict = dynamodb_json.loads(response)


    try:
        if _data_dict['Item']['password'] == pwd:
            return  "true"
        else:
            return  "false"
    except Exception as e:
        return  "false"
    #return _data_dict['Item']

def findUserD(user):
    region_name = 'eu-north-1'
    dynamodb = boto3.resource('dynamodb',region_name)
    table = dynamodb.Table('credentials')

    try:
        response = table.get_item(
            Key={'groupName': user})
        print(response)

    except ClientError as e:
        response = "{""Item"":""empty""}"
    #else:
    #    data_str = response['Item']
    #    _data_dict = dynamodb_json.loads(data_str)

    # Validation and modification of incoming data goes here.
    # Then you can do whatever you need, for example:
    #    obj, created = Credentials.objects.update_or_create(_data_dict)

    _data_dict = dynamodb_json.loads(response)
    print(_data_dict)
    try:
        return  _data_dict['Item']
    except Exception as e:
        response = "{""Item"":""empty""}"
        _data_dict = dynamodb_json.loads(response)
        return  _data_dict['Item']

def findQuestions(id):
    region_name = 'eu-central-1'
    dynamodb = boto3.resource('dynamodb',region_name)
    table = dynamodb.Table('QuestionsHackerGame')

    try:
        response =  response = table.get_item(
            Key={'id': id})
        print(response)

    except ClientError as e:
        print(e.response['Error']['Message'])
        response = "{""Item"":""empty""}"
    #else:
    #    data_str = response['Item']
    #    _data_dict = dynamodb_json.loads(data_str)

    # Validation and modification of incoming data goes here.
    # Then you can do whatever you need, for example:
    #    obj, created = Credentials.objects.update_or_create(_data_dict)

    _data_dict = dynamodb_json.loads(response)


    try:
        return  _data_dict['Item']
    except Exception as e:
        response = "null"
        print(response)
        return response

def setUserData(request,iduser,type,infos):
    region_name = 'eu-central-1'
    dynamodb = boto3.resource('dynamodb',region_name)
    table = dynamodb.Table('UserData')

    try:
        response =table.put_item(Item={
            "iduser": iduser,
            "type": type,
            "info": infos
        })
        print(response)

    except ClientError as e:
        response = "{""Item"":""empty""}"
    #else:
    #    data_str = response['Item']
    #    _data_dict = dynamodb_json.loads(data_str)

    # Validation and modification of incoming data goes here.
    # Then you can do whatever you need, for example:
    #    obj, created = Credentials.objects.update_or_create(_data_dict)

    _data_dict = dynamodb_json.loads(response)


    try:
        return  _data_dict['Item']
    except Exception as e:
        response = "null"
        print(response)
        return response

def getUserData(request,idUser,type):
    region_name = 'eu-central-1'
    dynamodb = boto3.resource('dynamodb',region_name)
    table = dynamodb.Table('UserData')
    print(idUser,type)

    try:
        response = table.get_item(
            Key={'iduser':idUser,'type':type})
        print(request,response)

    except ClientError as e:
        response = "{""Item"":""empty""}"
    #else:
    #    data_str = response['Item']
    #    _data_dict = dynamodb_json.loads(data_str)

    # Validation and modification of incoming data goes here.
    # Then you can do whatever you need, for example:
    #    obj, created = Credentials.objects.update_or_create(_data_dict)

    _data_dict = dynamodb_json.loads(response)



    try:
        return  _data_dict['Item']
    except Exception as e:
        response = "null"
        print(response)
        return response

urlpatterns = [
    path("getList/",
         CredentialsOfferAPIView.as_view(),
         name="getList"),
    path("apie/", api.urls),

]