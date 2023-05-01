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
            url = "http://a4835dbad60fc4590addbd1e70bc622e-2044858126.eu-central-1.elb.amazonaws.com:8081/api/users"

            headers = {
                'HodHodApiKey': 'xyz',
                'Content-Type': 'application/json'
            }
            response = requests.request("GET", url, headers=headers, data=payload)
            print(response.text)

            responseParsed=json.loads(response.text)            

    else:
            url = "http://a4835dbad60fc4590addbd1e70bc622e-2044858126.eu-central-1.elb.amazonaws.com:8081/api/user?id="+id

            headers = {
                'HodHodApiKey': 'xyz',
                'Content-Type': 'application/json'
            }
            response = requests.request("GET", url, headers=headers, data=payload)
            print(response.text)

            responseParsed=json.loads(response.text)     

    
    
    #print(responseParsed)

            

    return render(request, "child.html", responseParsed)

def liv1(request):
    user={"username":"micoromano"}

    data={
             "Id": "1",
             "level":"1",
             "info": {
                 "Title": "Ready to Pwning ?",
                 "Description": "In this level you will have to intercept the password in a site login.... Thank you for choosing the Blue Pill ..",
                 "DescriptionHTD": "access the site at the link below, find the password, enter the password in the box below and click on complete the level to send the answer, once the answer has been sent the level it will be inaccessible for the whole team.... GoodWork ..",
                 "attivo": 'true',
                 "url": "http://a50242d0b3bff423eafcb357dc512d03-1269416428.eu-central-1.elb.amazonaws.com/t1/"
             }
         }
    return render(request, "Livello1Html.html", {"data":data,"user":user})

def splash(request):
    data={"username":"micoromano"}

    return render(request, "homeSplash.html", data)

def t1(request):
    data={"username":"micoromano"}

    return render(request, "t1/bluene-html/index.html", data)

def t2(request):
    data={"username":"micoromano"}

    return render(request, "t2/bootstrap-restaurant-template/index.html", data)

def t3(request):
    data={"username":"micoromano"}

    return render(request, "t3/digitf-html/index.html", data)

def t4(request):
    data={"username":"micoromano"}

    return render(request, "t4/html/index.html", data)

def t5(request):
    data={"username":"micoromano"}

    return render(request, "t5/2121_wave_cafe/index.html", data)

def t6(request):
    data={"username":"micoromano"}

    return render(request, "t6/templatemo_568_digimedia/homepage_1.html", data)