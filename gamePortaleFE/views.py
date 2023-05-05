from django.http import HttpResponse
from django.template import Context, Template
from django.shortcuts import render
from django.http import JsonResponse
import json
import random
import datetime
import requests
from .templateEnum import templateEnumCat as templateEnum


def listing(request):

    return render(request, "child.html")

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


def logincheck(request):
    print(request.build_absolute_uri('/api/apie/getUser/'))
    response = requests.get(request.build_absolute_uri('/api/apie/getUser/')+request.GET.get('username')+'/'+request.GET.get('password'))
    print(response.text=='"true"')
    if response.text.__eq__('"true"'):
        responseUser = requests.get(request.build_absolute_uri('/api/apie/getUserD/')+request.GET.get('username'))
        print(responseUser.text)
        responseUserParsed = json.loads(responseUser.text)
        responsequestions = requests.get(request.build_absolute_uri('/api/apie/getUserData/')+responseUserParsed['id']+'/tpl')
        request.session['iduser'] = request.GET.get('username')

        print(responsequestions.text)
        if responsequestions.text.__eq__('"null"'):
            idTplsave = random.randint(1, 6)
            idTpl = str(idTplsave)
            url = request.build_absolute_uri('/api/apie/setUserData')
            myobj = {'idUser': responseUserParsed['id'],'type':'tpl','infos':'{\"id\":'+idTpl+'}'}
            requests.post(url, json = myobj)
        else:
            print(responsequestions.text)
            va = json.loads(responsequestions.text)
            print(va['info'])
            vaid = json.loads(va['info'])
            idTpl = str(vaid['id'])
        responsestate = requests.get(request.build_absolute_uri('/api/apie/getUserData/')+responseUserParsed['id']+'/liv1closed')
        print(responsestate.text)
        if responsestate.text.__eq__('"null"'):
            print(responsestate.text)
            state='"open"'
        else:
            print(responsestate.text)
            va = json.loads(responsestate.text)
            print(va['info'])
            vaid = json.loads(va['info'])
            state = str(vaid['state'])
        data = requests.get(request.build_absolute_uri('/api/apie/getUserQuestions/')+idTpl)
        request.session['tplch'] = idTpl
        dataBack = json.loads(data.text)
        print(dataBack)
        response = {'valid':'false','password':''}
        return render(request, "Livello1Html.html", {"data":dataBack,"user":responseUserParsed,"response":response,"state":state})
    else:
        return render(request, "child.html")

def splash(request):
    data={"username":"micoromano"}

    return render(request, "homeSplash.html", data)

def t1(request):
    urldata=request.build_absolute_uri('/api/apie/userList')
    data={"username":"micoromano",'urldata':urldata}
    return render(request, templateEnum['1'], data)

def t2(request):
    urldata=request.build_absolute_uri('/api/apie/userList')
    data={"username":"micoromano",'urldata':urldata}
    return render(request, templateEnum['2'], data)

def t3(request):
    urldata=request.build_absolute_uri('/api/apie/userList')
    data={"username":"micoromano",'urldata':urldata}
    return render(request, templateEnum['3'], data)

def t4(request):
    urldata=request.build_absolute_uri('/api/apie/userList')
    data={"username":"micoromano",'urldata':urldata}
    return render(request, templateEnum['4'], data)

def t5(request):
    urldata=request.build_absolute_uri('/api/apie/userList')
    data={"username":"micoromano",'urldata':urldata}
    return render(request, templateEnum['5'], data)

def t6(request):
    urldata=request.build_absolute_uri('/api/apie/userList')
    data={"username":"micoromano",'urldata':urldata}
    return render(request, templateEnum['6'], data)

def loginFormliv1(request):
    response = requests.get(request.build_absolute_uri('/api/apie/checkLivLogin/')+request.GET.get('username')+'/'+request.GET.get('password'))
    print(response.text=='"true"')
    if response.text.__eq__('"true"'):
        response = {'valid':'true','password':request.GET.get('password')}
        data = requests.get(request.build_absolute_uri('/api/apie/getUserQuestions/')+str(1))
        dataBack = json.loads(data.text)
        iduser = request.session['iduser']
        responseUser = requests.get(request.build_absolute_uri('/api/apie/getUserD/')+iduser)
        print(responseUser.text)
        responseUserParsed = json.loads(responseUser.text)
        url = request.build_absolute_uri('/api/apie/setUserData')
        myobj = {'idUser':responseUserParsed['id'],'type':'liv1ok','infos':'{\"time\":\"'+str(datetime.datetime.now())+'\","response":"'+request.GET.get('password')+'\",\"level\":\"1\"}'}
        requests.post(url, json = myobj)
        print(dataBack)
        responsestate = requests.get(request.build_absolute_uri('/api/apie/getUserData/')+responseUserParsed['id']+'/liv1closed')
        print(responsestate.text)
        if responsestate.text.__eq__('"null"'):
            print(responsestate.text)
            state='"open"'
        else:
            print(responsestate.text)
            va = json.loads(responsestate.text)
            print(va['info'])
            vaid = json.loads(va['info'])
            state = str(vaid['state'])
        return render(request, "Livello1Html.html", {"data":dataBack,"user":responseUserParsed,"response":response,"state":state})
    else:
        iduser = request.session['iduser']
        tplch = request.session['tplch']
        responseUser = requests.get(request.build_absolute_uri('/api/apie/getUserD/')+iduser)
        print(responseUser.text)
        responseUserParsed = json.loads(responseUser.text)
        url = request.build_absolute_uri('/api/apie/setUserData')
        myobj = {'idUser':responseUserParsed['id'],'type':'liv1ko','infos':'{\"time\":\"'+str(datetime.datetime.now())+'\","response":"'+request.GET.get('password')+'\",\"level\":\"1\"}'}
        requests.post(url, json = myobj)
        return render(request, templateEnum[str(tplch)])

def completeLevel1(request):

    if 'iduser' in request.session:
        iduser = request.session['iduser']
    responseUser = requests.get(request.build_absolute_uri('/api/apie/getUserD/')+iduser)
    print(responseUser.text)
    responseUserParsed = json.loads(responseUser.text)
    url = request.build_absolute_uri('/api/apie/setUserData')
    myobj = {'idUser':responseUserParsed['id'],'type':'liv1closed','infos':'{\"time\":\"'+str(datetime.datetime.now())+'\",\"state\":\"closed\",\"level\":\"1\"}'}
    requests.post(url, json = myobj)
    return render(request, "Livello1Html.html", {"state":"closed","user":responseUserParsed})
