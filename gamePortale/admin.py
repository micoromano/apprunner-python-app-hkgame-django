from django.contrib import admin
from .models import UserItem
from .models import Credentials


# Register your models here.
admin.site.register(UserItem)
admin.site.register(Credentials)
