from django.http import HttpResponse
from django.template import Context, Template
from django.shortcuts import render, redirect
from django.http import JsonResponse
import json
import random
import datetime
import requests
from .templateEnum import templateEnumCat as templateEnum
import logging

logger = logging.getLogger(__name__)

def listing(request):

    return render(request, "child.html")

def liv1(request):
    if 'iduser' in request.session:
        iduser = request.session['iduser']
    else:
        return render(request, "child.html")
    responseUser = requests.get(request.build_absolute_uri('/api/apie/getUserD/')+iduser)
    logger.info(responseUser.text)
    responseUserParsed = json.loads(responseUser.text)
    responsequestions = requests.get(request.build_absolute_uri('/api/apie/getUserData/')+responseUserParsed['id']+'/tpl'+str(1))
    logger.info(responsequestions.text)
    va = json.loads(responsequestions.text)
    logger.info(va['info'])
    #vaid = ['info']
    idTpl = str(va['info']['id'])
    responsestate = requests.get(request.build_absolute_uri('/api/apie/getUserData/')+responseUserParsed['id']+'/liv1closed')
    logger.info(responsestate)
    if responsestate is None:
        logger.info(responsestate.text)
        state='"open"'
    else:
        logger.info(responsestate.text)
        va = json.loads(responsestate.text)
        logger.info(va['info'])
        vaid = json.loads(va['info'])
        state = str(vaid['state'])
    data = requests.get(request.build_absolute_uri('/api/apie/getUserQuestions/')+idTpl+'/'+str(1))
    request.session['tplch'] = idTpl
    dataBack = json.loads(data.text)
    logger.info(dataBack)
    response = {'valid':'false','password':''}
    return render(request, "Livello1Html.html", {"data":dataBack,"user":responseUserParsed,"response":response,"state":state})

def liv2(request):
    if 'iduser' in request.session:
        iduser = request.session['iduser']
    else:
        return render(request, "child.html")
    responseUser = requests.get(request.build_absolute_uri('/api/apie/getUserD/')+iduser)
    logger.info(responseUser.text)
    responseUserParsed = json.loads(responseUser.text)
    responsequestions = requests.get(request.build_absolute_uri('/api/apie/getUserData/')+responseUserParsed['id']+'/tpl'+str(2))
    logger.info(responsequestions.text)
    va = json.loads(responsequestions.text)
    logger.info(va['info'])
    #vaid = ['info']
    idTpl = str(va['info']['id'])
    responsestate = requests.get(request.build_absolute_uri('/api/apie/getUserData/')+responseUserParsed['id']+'/liv2closed')
    logger.info(responsestate)
    if responsestate.text.__eq__('null'):
        logger.info(responsestate.text)
        state='open'
    else:
        logger.info(responsestate.text)
        va = json.loads(responsestate.text)
        logger.info(va['info'])
        vaid = (va['info'])
        state = str(vaid['state'])
    data = requests.get(request.build_absolute_uri('/api/apie/getUserQuestions/')+idTpl+'/'+str(2))
    request.session['tplch'] = idTpl
    dataBack = json.loads(data.text)
    logger.info(dataBack)
    response = {'valid':'false','password':''}
    return render(request, "Livello2Html.html", {"data":dataBack,"user":responseUserParsed,"response":response,"state":state})

def logincheck(request):
    logger.info(request.build_absolute_uri('/api/apie/getUser/'))
    response = requests.get(request.build_absolute_uri('/api/apie/getUser/')+request.GET.get('username')+'/'+request.GET.get('password'))
    logger.info(response.text=='"true"')
    if response.text.__eq__('"true"'):
        responseUser = requests.get(request.build_absolute_uri('/api/apie/getUserD/')+request.GET.get('username'))
        logger.info(responseUser.text)
        responseUserParsed = json.loads(responseUser.text)
        responsequestions = requests.get(request.build_absolute_uri('/api/apie/getUserData/')+responseUserParsed['id']+'/tpl')
        request.session['iduser'] = request.GET.get('username')

        logger.info(responsequestions.text)
        if responsequestions.text.__eq__('null'):
            idTplsave = random.randint(1, 6)
            idTpl = str(idTplsave)
            url = request.build_absolute_uri('/api/apie/setUserData')
            #myobj = {'idUser': responseUserParsed['id'],'type':'tpl','infos':{"id":'+idTpl+'}}
            myobj={
                'idUser': responseUserParsed['id'],
                'type':'tpl',
                'infos':{
                    'id': idTpl
                }
            }
            requests.post(url, json = myobj)
        else:
            logger.info(responsequestions.text)
            va = json.loads(responsequestions.text)
            logger.info(va['info'])
            #vaid = ['info']
            idTpl = str(va['info']['id'])
        responsestate = requests.get(request.build_absolute_uri('/api/apie/getUserData/')+responseUserParsed['id']+'/liv1closed')
        logger.info(responsestate)
        if responsestate is not None:
            logger.info(responsestate.text)
            state='"open"'
        else:
            logger.info(responsestate.text)
            va = json.loads(responsestate.text)
            logger.info(va['info'])
            vaid = json.loads(va['info'])
            state = str(vaid['state'])
        request.session['tplch'] = idTpl
        response = {'valid':'false','password':''}
        responseUser = requests.get(request.build_absolute_uri('/api/apie/getListLevel/')+request.GET.get('username'))
        logger.info(responseUser.text)
        logger.info(json.loads(responseUser.text))
        ret = json.loads(responseUser.text)
        return render(request, "LevelList.html", ret)
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
def t7(request):
    urldata=request.build_absolute_uri('/api/apie/userList')
    data={"username":"micoromano",'urldata':urldata}
    return render(request, templateEnum['7'], data)

def loginFormliv1(request):
    response = requests.get(request.build_absolute_uri('/api/apie/checkLivLogin/')+request.GET.get('username')+'/'+request.GET.get('password'))
    logger.info(response.text=='"true"')
    if response.text.__eq__('"true"'):
        response = {'valid':'true','password':request.GET.get('password')}
        data = requests.get(request.build_absolute_uri('/api/apie/getUserQuestions/')+str(1))
        dataBack = json.loads(data.text)
        iduser = request.session['iduser']
        responseUser = requests.get(request.build_absolute_uri('/api/apie/getUserD/')+iduser)
        logger.info(responseUser.text)
        responseUserParsed = json.loads(responseUser.text)
        url = request.build_absolute_uri('/api/apie/setUserData')
        myobj = {'idUser':responseUserParsed['id'],'type':'liv1ok','infos':'{\"time\":\"'+str(datetime.datetime.now())+'\","response":"'+request.GET.get('password')+'\",\"level\":\"1\"}'}
        requests.post(url, json = myobj)
        logger.info(dataBack)
        responsestate = requests.get(request.build_absolute_uri('/api/apie/getUserData/')+responseUserParsed['id']+'/liv1closed')
        logger.info(responsestate.text)
        if responsestate.text.__eq__('"null"'):
            logger.info(responsestate.text)
            state='"open"'
        else:
            logger.info(responsestate.text)
            va = json.loads(responsestate.text)
            logger.info(va['info'])
            vaid = json.loads(va['info'])
            state = str(vaid['state'])
        return render(request, "Livello1Html.html", {"data":dataBack,"user":responseUserParsed,"response":response,"state":state})
    else:
        iduser = request.session['iduser']
        tplch = request.session['tplch']
        responseUser = requests.get(request.build_absolute_uri('/api/apie/getUserD/')+iduser)
        logger.info(responseUser.text)
        responseUserParsed = json.loads(responseUser.text)
        url = request.build_absolute_uri('/api/apie/setUserData')
        myobj = {'idUser':responseUserParsed['id'],'type':'liv1ko','infos':'{\"time\":\"'+str(datetime.datetime.now())+'\","response":"'+request.GET.get('password')+'\",\"level\":\"1\"}'}
        requests.post(url, json = myobj)
        return render(request, templateEnum[str(tplch)])

def completeLevel2(request):
    if 'iduser' in request.session:
        iduser = request.session['iduser']
    else:
        return render(request, "child.html")

    if request.GET.get('product') == 'EE02':
        responseUser = requests.get(request.build_absolute_uri('/api/apie/getUserD/')+iduser)
        logger.info(responseUser.text)
        logger.info(responseUser.text)
        responseUserParsed = json.loads(responseUser.text)
        url = request.build_absolute_uri('/api/apie/setUserData')
        myobj={
            'idUser': responseUserParsed['id'],
            'type':'liv2closed',
                   'infos': {
                            'grupName' : iduser,
                            'responseType': 'easy',
                            'state' : 'closed',
                            'level' : '2',
                            'time' : str(datetime.datetime.now())
                            }
                }
        requests.post(url, json = myobj)
        return render(request, "Livello2Html.html", {"state":"closed","user":responseUserParsed})
    elif request.GET.get('product') == 'sugo':
        responseUser = requests.get(request.build_absolute_uri('/api/apie/getUserD/')+iduser)
        logger.info(responseUser.text)
        logger.info(responseUser.text)
        responseUserParsed = json.loads(responseUser.text)
        url = request.build_absolute_uri('/api/apie/setUserData')
        myobj={
            'idUser': responseUserParsed['id'],
            'type':'liv2closed',
            'infos': {
                'grupName' : iduser,
                'responseType': 'strong',
                'state' : 'closed',
                'level' : '2',
                'time' : str(datetime.datetime.now())
            }
        }
        requests.post(url, json = myobj)
        return render(request, "Livello2Html.html", {"state":"closed","user":responseUserParsed,"response":'true'})
    else:
        if 'iduser' in request.session:
            iduser = request.session['iduser']
        else:
            return render(request, "child.html")

        responseUser = requests.get(request.build_absolute_uri('/api/apie/getUserD/')+iduser)
        logger.info(responseUser.text)
        logger.info(responseUser.text)
        responseUserParsed = json.loads(responseUser.text)
        url = request.build_absolute_uri('/api/apie/setUserData')
        myobj={
            'idUser': responseUserParsed['id'],
            'type':'liv2error',
            'infos': {
                'response' : str(request.GET.get('product')),
                'grupName' : iduser,
                'responseType': 'wrong',
                'state' : 'open',
                'level' : '2',
                'time' : str(datetime.datetime.now())
            }
        }
        requests.post(url, json = myobj)
        return redirect(liv2)
       # render(request, "Livello2Html.html", {"state":"open","user":responseUserParsed,"response":'false',"wrong":'true'})

def backendWrapper(request):

    if 'iduser' in request.session:
        iduser = request.session['iduser']
    else:
        return render(request, "child.html")

    responseUser = requests.get(request.build_absolute_uri('/api/apie/getUserD/')+iduser)
    logger.info(responseUser.text)
    logger.info(responseUser.text)
    responseUserParsed = json.loads(responseUser.text)
    data = requests.get(request.build_absolute_uri('/api/apie/backenjavadwrapper/'+iduser+'/'+responseUserParsed['id']+'/'+request.GET.get('payload')))
    if(data.status_code!=200):
        back = {
            'payload': [{'data':'no-data'}]
        }
        ret = back
    else:
        logger.info(data.text)
        try:
            logger.info(str(data.text).replace("\\\"","\"").replace("\"{","{").replace("}\"","}"))
            ret = json.loads(str(data.text).replace("\\\"","\"").replace("\"{","{").replace("}\"","}"))
        except Exception as e:
            ret=data.text
            logger.error(e)

    logger.info(ret)
    return render(request, templateEnum['7'], ret)
def completeLevel1(request):

    if 'iduser' in request.session:
        iduser = request.session['iduser']
    responseUser = requests.get(request.build_absolute_uri('/api/apie/getUserD/')+iduser)
    logger.info(responseUser.text)
    responseUserParsed = json.loads(responseUser.text)
    url = request.build_absolute_uri('/api/apie/setUserData')
    myobj = {'idUser':responseUserParsed['id'],'type':'liv1closed','infos':'{\"time\":\"'+str(datetime.datetime.now())+'\",\"state\":\"closed\",\"level\":\"1\"}'}
    requests.post(url, json = myobj)
    return render(request, "Livello1Html.html", {"state":"closed","user":responseUserParsed})

def levellist(request):
    if 'iduser' in request.session:
        iduser = request.session['iduser']
    else:
        return render(request, "child.html")
    if 'iduser' in request.session:
        iduser = request.session['iduser']
        logger.info(iduser)
    responseUser = requests.get(request.build_absolute_uri('/api/apie/getListLevel/')+iduser)
    logger.info(responseUser.text)
    logger.info(json.loads(responseUser.text))
    ret = json.loads(responseUser.text)
    return render(request, "LevelList.html", ret)

def suggest_view(request,id):
    idTpl = id.split(',')[0]
    level = id.split(',')[1]
    id = id.split(',')[2]
    data = requests.get(request.build_absolute_uri('/api/apie/getUserQuestions/')+idTpl+'/'+level)
    dataBack = json.loads(data.text)
    logger.info(dataBack)
    for sugg in dataBack['info']['suggestions']:
        logger.info("leggo"+str(sugg)+str(sugg['id']))
        if str(sugg['id']) == id:
                logger.info("trovo"+str(sugg))
                suggBack = sugg
                if 'iduser' in request.session:
                    iduser = request.session['iduser']
                else:
                    return render(request, "child.html")
                responseUser = requests.get(request.build_absolute_uri('/api/apie/getUserD/')+iduser)
                logger.info(responseUser.text)
                responseUserParsed = json.loads(responseUser.text)
                url = request.build_absolute_uri('/api/apie/setUserData')
                myobj={
                    'idUser': responseUserParsed['id'],
                    'type':'suggestion'+id,
                    'infos':{
                        'suggestion': sugg['id'],
                        'value': sugg['value'],
                        'time': str(datetime.datetime.now())
                    }
                }
                requests.post(url, json = myobj)

    return render(request, "suggest.html", suggBack)

def wrongrespview(request):
   return render(request, "respHelper.html")

def acceptSuggestions(request,id,val):
    idTpl = id.split(',')[0]
    level = id.split(',')[1]
    id = id.split(',')[2]
    data = requests.get(request.build_absolute_uri('/api/apie/getUserQuestions/')+idTpl+'/'+level)
    dataBack = json.loads(data.text)
    logger.info(dataBack)
    for sugg in dataBack['info']['suggestions']:
        logger.info("leggo"+str(sugg)+str(sugg['id']))
        if str(sugg['id']) == id:
            logger.info("trovo"+str(sugg))
            suggBack = sugg
    return render(request, "suggest.html", suggBack)