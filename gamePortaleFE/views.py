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
            url = "https://fgp6etm3dp.eu-central-1.awsapprunner.com/api/users"

            headers = {
                'HodHodApiKey': 'xyz',
                'Content-Type': 'application/json'
            }
            response = requests.request("GET", url, headers=headers, data=payload)
            print(response.text)

            responseParsed=json.loads(response.text)            

    else:
            url = "https://fgp6etm3dp.eu-central-1.awsapprunner.com/api/user?id="+id

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