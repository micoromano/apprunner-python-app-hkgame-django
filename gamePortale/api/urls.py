import json

from django.urls import path
from gamePortale.api.views import CredentialsOfferAPIView
from dynamodb_json import json_util as dynamodb_json
import boto3
from botocore.exceptions import ClientError
from ninja import NinjaAPI
from ninja import Schema
import json
import ast
import logging
import json
import random
import datetime
import requests
from botocore import UNSIGNED
from botocore.config import Config

logger = logging.getLogger(__name__)
from gamePortale.models import InfoTpl as InfoTpl

api = NinjaAPI(docs_url=None)
#api = NinjaAPI()


class info(Schema):
    idUser: str
    type: str
    infos: object


@api.get("/getUser/{user}/{password}")
def add(request, user, password):
    return findUser(user, password)


@api.get("/getUserD/{user}")
def add(request, user):
    return findUserD(user)


@api.get("/getUserData/{iduser}/{type}")
def add(request, iduser, type):
    return getUserData(request, iduser, type)


@api.get("/getUserQuestions/{id}/{level}")
def add(request, id, level):
    return findQuestions(id, level)


@api.post("/setUserData")
def add(request, payload: info):
    logger.info("---->" + str(payload))
    return setUserData(request, payload.idUser, payload.type, payload.infos)


@api.get("/userList")
def add(request):
    return findFakeUser()


@api.get("/checkLivLogin/{user}/{pwd}")
def add(request, user, pwd):
    return findUserFake(pwd)


@api.get("/getListLevel/{user}")
def add(request, user):
    return findLevel4User(request, user)


@api.get("/backenjavadwrapper/{user}/{iduser}/{word}")
def add(request, user, iduser, word):
    return backendwrapper(request, user, iduser, word)


def findFakeUser():
    region_name = 'eu-central-1'
    dynamodb = boto3.resource('dynamodb', region_name)
    table = dynamodb.Table('Items')
    try:
        response = table.scan()

    except ClientError as e:
        response = "{""Item"":""empty""}"
        logger.info(e)
    # else:
    #    data_str = response['Item']
    #    _data_dict = dynamodb_json.loads(data_str)

    # Validation and modification of incoming data goes here.
    # Then you can do whatever you need, for example:
    #    obj, created = Credentials.objects.update_or_create(_data_dict)

    _data_dict = dynamodb_json.loads(response)

    return _data_dict


def findUser(user, pwd):
    region_name = 'eu-central-1'
    dynamodb = boto3.resource('dynamodb', region_name)
    table = dynamodb.Table('credentials')

    try:
        response = table.get_item(
            Key={'groupName': user})
        logger.info(response)

    except ClientError as e:
        response = "{""Item"":""empty""}"
        logger.info(e)

    # else:
    #    data_str = response['Item']
    #    _data_dict = dynamodb_json.loads(data_str)

    # Validation and modification of incoming data goes here.
    # Then you can do whatever you need, for example:
    #    obj, created = Credentials.objects.update_or_create(_data_dict)
    logger.info("------->" + str(response))
    # json_data = ast.literal_eval(json.dumps(response))
    json_data = str(response).replace("\'", "\"")
    logger.info("<------->" + str(json_data))
    _data_dict = dynamodb_json.loads(json_data)
    logger.info("<------->" + str(_data_dict))

    if _data_dict['Item']['groupName'] == user and _data_dict['Item']['password'] == pwd:
        return "true"
    else:
        return "false"
    # return _data_dict['Item']


def findUserFake(pwd):
    region_name = 'eu-central-1'
    dynamodb = boto3.resource('dynamodb', region_name)
    table = dynamodb.Table('firstLevel')

    try:
        response = response = table.get_item(
            Key={'password': pwd})
        logger.info(response)

    except ClientError as e:
        response = "{""Item"":""empty""}"
        logger.info(e)
    # else:
    #    data_str = response['Item']
    #    _data_dict = dynamodb_json.loads(data_str)

    # Validation and modification of incoming data goes here.
    # Then you can do whatever you need, for example:
    #    obj, created = Credentials.objects.update_or_create(_data_dict)
    logger.info("------->" + str(response))
    # json_data = ast.literal_eval(json.dumps(response))
    json_data = str(response).replace("\'", "\"")
    logger.info("<------->" + str(json_data))
    _data_dict = dynamodb_json.loads(json_data)
    logger.info("<------->" + str(_data_dict))

    try:
        if _data_dict['Item']['password'] == pwd:
            return "true"
        else:
            return "false"
    except Exception as e:
        return "false"
    # return _data_dict['Item']


def findLevel4User(request, user):
    region_name = 'eu-central-1'
    dynamodb = boto3.resource('dynamodb', region_name)
    table = dynamodb.Table('LevelList')

    # getUserData(request,user,liv+1closed)
    try:
        response = table.scan();
        logger.info(response)

    except ClientError as e:
        response = "{""Item"":""empty""}"
        logger.info(e)
    # else:
    #    data_str = response['Item']
    #    _data_dict = dynamodb_json.loads(data_str)

    # Validation and modification of incoming data goes here.
    # Then you can do whatever you need, for example:
    #    obj, created = Credentials.objects.update_or_create(_data_dict)
    # logger.info("------->" + str(response))
    # json_data = ast.literal_eval(json.dumps(response))
    json_data = str(response).replace("\'", "\"")
    # logger.info("<------->" + str(json_data))
    _data_dict = dynamodb_json.loads(json_data)
    logger.info("<------->" + str(_data_dict['Items']))

    for i, element in enumerate(_data_dict['Items']):
        logger.info('liv' + element['Level'] + 'closed')
        usedata = getUserData(request, user, 'liv' + element['Level'] + 'closed')
        logger.info(type(usedata))
        logger.info(usedata is not '')

        logger.info(element['info'])

        if usedata is not None:
            status = json.loads(str(usedata).replace("\'", "\""))
            logger.info("ddcddv" + str(status) + (status['info']['state'] == 'closed'))
            if status['info']['state'] == 'closed':
                logger.info(element)
                _data_dict['Items'][i] = json.loads(
                    json.dumps({**json.loads(str(element).replace("\'", "\"")), **{"closed": "true"}}))
            else:
                _data_dict['Items'][i] = json.loads(
                    json.dumps({**json.loads(str(element).replace("\'", "\"")), **{"closed": "false"}}))
                logger.info(element)
        else:
            _data_dict['Items'][i] = json.loads(
                json.dumps({**json.loads(str(element).replace("\'", "\"")), **{"closed": "false"}}))
        logger.info(element)
        logger.info(str(_data_dict))
    logger.info(str(_data_dict))
    # try:
    #    if _data_dict['Item']['password'] == pwd:
    #        return  "true"
    #    else:
    #        return  "false"
    # except Exception as e:
    # return _data_dict
    return _data_dict


def backendwrapper(request, user, iduser, word):
    if(str(word).__eq__('}')):
        word='key=userName&value=%7B'
    elif(str(word).__eq__('{')):
        word='key=userName&value=%7B'
    else:
        word=word
    responseUser = requests.get('http://hack.haccergame.it:8080/cxf/hacker-game/second-level/sqlInjection?' + word)
    logger.info(responseUser.text)
    logger.info(responseUser.text)
    try:
        if json.loads(responseUser.text)['status'] == 404:
            infos = {
                'payload': word,
                'grupName': iduser,
                'response': {},
                'state': 'open',
                'level': '2',
                'time': str(datetime.datetime.now())
            }
            data = {
                'payload': [{'data':'no-data'}]
            }
            setUserDatafromj(request, user, 'liv2step', infos)
            return data;
        elif json.loads(responseUser.text)['status'] == 400:
            infos = {
                'payload': word,
                'grupName': iduser,
                'response': {},
                'state': 'open',
                'level': '2',
                'time': str(datetime.datetime.now())
            }
            setUserDatafromj(request, user, 'liv2step', infos)
            data = {
                'payload': [{'data':'no-data'}]
            }
            return data;
    except Exception as e:
        infos = {
            'payload': word,
            'grupName': user,
            'response': responseUser.text,
            'state': 'open',
            'level': '2',
            'time': str(datetime.datetime.now())
        }
        setUserDatafromj(request, user, 'liv2step', infos)
        return responseUser.text


def findUserD(user):
    region_name = 'eu-central-1'
    dynamodb = boto3.resource('dynamodb', region_name)
    table = dynamodb.Table('credentials')

    try:
        response = table.get_item(
            Key={'groupName': user})
        logger.info(response)

    except ClientError as e:
        response = "{""Item"":""empty""}"
        logger.info(e)
    # else:
    #    data_str = response['Item']
    #    _data_dict = dynamodb_json.loads(data_str)

    # Validation and modification of incoming data goes here.
    # Then you can do whatever you need, for example:
    #    obj, created = Credentials.objects.update_or_create(_data_dict)

    logger.info("------->" + str(response))
    # json_data = ast.literal_eval(json.dumps(response))
    json_data = str(response).replace("\'", "\"")
    logger.info("<------->" + str(json_data))
    _data_dict = dynamodb_json.loads(json_data)
    logger.info("<------->" + str(_data_dict))

    try:
        return _data_dict['Item']
    except Exception as e:
        response = "{""Item"":""empty""}"
        logger.info("------->" + str(response))
        # json_data = ast.literal_eval(json.dumps(response))
        json_data = str(response).replace("\'", "\"")
        logger.info("<------->" + str(json_data))
        _data_dict = dynamodb_json.loads(json_data)
        logger.info("<------->" + str(_data_dict))
        logger.info(e)

        return _data_dict['Item']


def findQuestions(id, level):
    region_name = 'eu-central-1'
    dynamodb = boto3.resource('dynamodb', region_name)
    table = dynamodb.Table('QuestionsHackerGame')
    logger.info(str(str(id) + ',' + str(level)))
    try:
        response = response = table.get_item(
            Key={'id': str(str(id) + ',' + str(level))})
        logger.info(response)

    except ClientError as e:
        logger.info(e.response['Error']['Message'])
        response = "{""Item"":""empty""}"
        logger.info(e)
    # else:
    #    data_str = response['Item']
    #    _data_dict = dynamodb_json.loads(data_str)

    # Validation and modification of incoming data goes here.
    # Then you can do whatever you need, for example:
    #    obj, created = Credentials.objects.update_or_create(_data_dict)

    logger.info("------->" + str(response))
    # json_data = ast.literal_eval(json.dumps(response))
    json_data = str(response).replace("\'", "\"")
    logger.info("<------->" + str(json_data))
    _data_dict = dynamodb_json.loads(response)
    logger.info("<------->" + str(_data_dict))

    try:
        return _data_dict['Item']
    except Exception as e:
        response = None
        logger.info(response)
        return response


def setUserData(request, iduser, type, infos):
    region_name = 'eu-central-1'
    dynamodb = boto3.resource('dynamodb', region_name)
    table = dynamodb.Table('UserData')

    try:
        response = table.put_item(Item={
            "iduser": iduser,
            "type": type,
            "info": json.loads(str(infos).replace("\'", "\""))
        })
        logger.info(response)

    except ClientError as e:
        response = "{""Item"":""empty""}"
        logger.info(e)
    # else:
    #    data_str = response['Item']
    #    _data_dict = dynamodb_json.loads(data_str)

    # Validation and modification of incoming data goes here.
    # Then you can do whatever you need, for example:
    #    obj, created = Credentials.objects.update_or_create(_data_dict)

    logger.info("------->" + str(response))
    # json_data = ast.literal_eval(json.dumps(response))
    json_data = str(response).replace("\'", "\"")
    logger.info("<------->" + str(json_data))
    _data_dict = dynamodb_json.loads(json_data)
    logger.info("<------->" + str(_data_dict))

    try:
        return _data_dict['Item']
    except Exception as e:
        response = None
        logger.info(response)
        return response


def setUserDatafromj(request, iduser, type, infos):
    region_name = 'eu-central-1'
    dynamodb = boto3.resource('dynamodb', region_name)
    table = dynamodb.Table('UserData')

    try:
        response = table.put_item(Item={
            "iduser": iduser,
            "type": type,
            "info": infos
        })
        logger.info(response)

    except ClientError as e:
        response = "{""Item"":""empty""}"
        logger.info(e)
    # else:
    #    data_str = response['Item']
    #    _data_dict = dynamodb_json.loads(data_str)

    # Validation and modification of incoming data goes here.
    # Then you can do whatever you need, for example:
    #    obj, created = Credentials.objects.update_or_create(_data_dict)

    logger.info("------->" + str(response))
    # json_data = ast.literal_eval(json.dumps(response))
    json_data = str(response).replace("\'", "\"")
    logger.info("<------->" + str(json_data))
    _data_dict = dynamodb_json.loads(json_data)
    logger.info("<------->" + str(_data_dict))

    try:
        return _data_dict['Item']
    except Exception as e:
        response = None
        logger.info(response)
        return response


def getUserData(request, idUser, type):
    region_name = 'eu-central-1'
    dynamodb = boto3.resource('dynamodb', region_name)
    table = dynamodb.Table('UserData')
    logger.info(idUser)
    logger.info(type)

    try:
        response = table.get_item(
            Key={'iduser': idUser, 'type': type})
        logger.info(request)
        logger.info(response)


    except ClientError as e:
        response = "{""Item"":""empty""}"
        logger.info(e)
    # else:
    #    data_str = response['Item']
    #    _data_dict = dynamodb_json.loads(data_str)

    # Validation and modification of incoming data goes here.
    # Then you can do whatever you need, for example:
    #    obj, created = Credentials.objects.update_or_create(_data_dict)

    logger.info("------->" + str(response))
    # json_data = ast.literal_eval(json.dumps(response))
    json_data = str(response).replace("\"", "\\\"")
    json_data = str(json_data).replace("\'", "\"")
    logger.info("<------->" + str(json_data))
    _data_dict = dynamodb_json.loads(response)
    logger.info("<------->" + str(_data_dict))

    try:
        return _data_dict['Item']
    except Exception as e:
        response = None
        logger.info(response)
        return response


urlpatterns = [
    path("getList/",
         CredentialsOfferAPIView.as_view(),
         name="getList"),
    path("apie/", api.urls),

]
