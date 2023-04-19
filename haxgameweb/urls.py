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
from gamePortaleFE import views



urlpatterns = [
    path('admin/', admin.site.urls),
    path('gamePortale/', include('gamePortale.urls')),
    path('fe/', views.listing),
    path('splash/', views.splash),
    path('t1/', views.t1),
    path('t2/', views.t2),
    path('t3/', views.t3),
    path('t4/', views.t4),
    path('t5/', views.t5),
    path('t6/', views.t6),


]
