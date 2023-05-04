from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
import os


from django.views import View
from django.http import JsonResponse
import json
from .models import UserItem,info
import boto3
from botocore.exceptions import ClientError
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

dynamodb = boto3.resource('dynamodb','eu-central-1')
table = dynamodb.Table('items')

@method_decorator(csrf_exempt, name='dispatch')
class gamePortale_api_app_w(View):
    global response

    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))
     
        try:
            id = data.get('Id')
        except:
            id = "NA"
        try:
            nome = data.get('info.nome') 
        except:
            nome = ["NA"]
        try:
            cognome = data.get('info.cognome') 
        except:
            cognome = "NA"
        try:
            attivo = data.get('info.attivo') 
        except:
            attivo = ["NA"]
        try:
            username = data.get('info.username') 
        except:
            username = "NA"
        try:
            password = data.get('info.password') 
        except:
            password = ["NA"]
        try:
            rank = data.get('info.rank') 
        except:
            rank = 0
        
        response = table.put_item(
                Item={
                'Id': id ,
                'info': {
                    'id': id,
                    'nome': nome,
                    'cognome': cognome,
                    'attivo': attivo,
                    'username': username,
                    'password': password,
                    'rank': rank
                }
            }
            )


        UserItem.Id = id;
        info.id = id;
        info.nome=nome;
        info.cognome=cognome;
        info.attivo=attivo;
        info.username=username;
        info.password=password;
        info.rank=rank;
        UserItem.Info=info;

        cart_item = CartItem.objects.create(**product_data)

        data = {
            "message": f"User Added: {response}"
        }
        return JsonResponse(data, status=200)
    
     
     
    def get(self, request):

        try:
            response = table.scan()
        except ClientError as e:
            print(e.response['Error']['Message'])
        else:
            response = ['']

        data = json.loads(response)

        

        
        for item in data.get('Items'):
        
            dataItem = json.loads(item)

            try:
                id = dataItem.get('Id')
            except:
                id = "NA"
            try:
                nome = dataItem.get('info.nome') 
            except:
                nome = ["NA"]
            try:
                cognome = dataItem.get('info.cognome') 
            except:
                cognome = "NA"
            try:
                attivo = dataItem.get('info.attivo') 
            except:
                attivo = ["NA"]
            try:
                username = dataItem.get('info.username') 
            except:
                username = "NA"
            try:
                password = dataItem.get('info.password') 
            except:
                password = ["NA"]
            try:
                rank = dataItem.get('info.rank') 
            except:
                rank = 0

            UserItem.Id = id;
            info.id = id;
            info.nome=nome;
            info.cognome=cognome;
            info.attivo=attivo;
            info.username=username;
            info.password=password;
            info.rank=rank;
            UserItem.Info=info;
        
            response.append(UserItem)

        return JsonResponse(response, status=200)
    


    def put(self, request):

        

        data = json.loads(request.body.decode("utf-8"))
     
        try:
            id = data.get('Id')
        except:
            id = "NA"
        try:
            nome = data.get('info.nome') 
        except:
            nome = ["NA"]
        try:
            cognome = data.get('info.cognome') 
        except:
            cognome = "NA"
        try:
            attivo = data.get('info.attivo') 
        except:
            attivo = ["NA"]
        try:
            username = data.get('info.username') 
        except:
            username = "NA"
        try:
            password = data.get('info.password') 
        except:
            password = ["NA"]
        try:
            rank = data.get('info.rank') 
        except:
            rank = 0
        
        response = table.put_item(
                Item={
                'Id': id ,
                'info': {
                    'id': id,
                    'nome': nome,
                    'cognome': cognome,
                    'attivo': attivo,
                    'username': username,
                    'password': password,
                    'rank': rank
                }
            }
            )


        UserItem.Id = id;
        info.id = id;
        info.nome=nome;
        info.cognome=cognome;
        info.attivo=attivo;
        info.username=username;
        info.password=password;
        info.rank=rank;
        UserItem.Info=info;

        data = {
            "message": f"User Added: {response}"
        }
        return JsonResponse(data, status=200)

