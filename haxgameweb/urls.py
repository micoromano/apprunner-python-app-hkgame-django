"""
URL configuration for haxgameweb project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from gamePortaleFE import views as gamePortaleFEw
from gamePortale import views as gamePortalewBE


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include("gamePortale.api.urls")),
    path('fe/', gamePortaleFEw.listing),
    path('splash/', gamePortaleFEw.splash),
    path('t1/', gamePortaleFEw.t1),
    path('t2/', gamePortaleFEw.t2),
    path('t3/', gamePortaleFEw.t3),
    path('t4/', gamePortaleFEw.t4),
    path('t5/', gamePortaleFEw.t5),
    path('t6/', gamePortaleFEw.t6),
    path('liv1/', gamePortaleFEw.liv1),
    path('login/', gamePortaleFEw.logincheck),
    path('loginFormliv1', gamePortaleFEw.loginFormliv1),





]
