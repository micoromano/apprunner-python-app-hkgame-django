from django.contrib import admin
from .models import UserItem
from .models import Credentials
from .models import info


# Register your models here.
admin.site.register(UserItem)
admin.site.register(info)
admin.site.register(Credentials)