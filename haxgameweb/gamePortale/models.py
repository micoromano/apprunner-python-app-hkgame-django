from django.db import models

# Create your models here.

class info(models.Model):
    id = models.CharField(max_length=30,primary_key=True)
    nome = models.CharField(max_length=30)
    cognome = models.CharField(max_length=30)
    attivo = models.CharField(max_length=30)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    rank = models.IntegerField

class UserItem(models.Model):
    id = models.CharField(max_length=30,primary_key=True)
    Info = models.ForeignKey(info,on_delete=models.CASCADE)


class Credentials(models.Model):
    id = models.CharField(max_length=200,primary_key=True)
    groupName = models.CharField(max_length=200)
    password = models.CharField(max_length=200)