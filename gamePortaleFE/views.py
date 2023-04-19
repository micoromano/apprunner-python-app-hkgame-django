from django.http import HttpResponse
from django.template import Context, Template
from django.shortcuts import render
from django.http import JsonResponse
import json

import requests



def listing(request):

    id = request.GET.get('id')

    payload = '[{\"cameraId\":"' + str(1) + '","companyId\":"' + str(1) + '",\"name\": "' + str(
                1) + '",\"warehouse\":"' + str(1) + '",\"picture\": "' + str(
                1) + '", \"channelNo\":"' + str(1) + '"\r\n\t}]'


    if id is None:
            url = "http://a12aad629b9b5489a92792c29f62f9b1-1647943714.eu-central-1.elb.amazonaws.com:8080/api/users"

            headers = {
                'HodHodApiKey': 'xyz',
                'Content-Type': 'application/json'
            }
            response = requests.request("GET", url, headers=headers, data=payload)
            print(response.text)

            responseParsed=json.loads(response.text)            

    else:
            url = "http://a12aad629b9b5489a92792c29f62f9b1-1647943714.eu-central-1.elb.amazonaws.com:8080/api/user?id="+id

            headers = {
                'HodHodApiKey': 'xyz',
                'Content-Type': 'application/json'
            }
            response = requests.request("GET", url, headers=headers, data=payload)
            print(response.text)

            responseParsed=json.loads(response.text)     

    
    
    print(responseParsed)

            

    return render(request, "child.html", responseParsed)

def splash(request):
    data={"username":"micoromano"}

    return render(request, "homeSplash.html", data)

def t1(request):
    data={"username":"micoromano"}

    return render(request, "t1\index.html", data)

def t2(request):
    data={"username":"micoromano"}

    return render(request, "t2\index.html", data)

def t3(request):
    data={"username":"micoromano"}

    return render(request, "t3\index.html", data)

def t4(request):
    data={"username":"micoromano"}

    return render(request, "t4\index.html", data)

def t5(request):
    data={"username":"micoromano"}

    return render(request, "t5\index.html", data)

def t6(request):
    data={"username":"micoromano"}

    return render(request, "t6\index.html", data)