from django.db import models
from django.contrib.auth.hashers import make_password
# from .models import User
from django.contrib.auth.models import User
    
# class UserLogin(models.Model):
#     email = models.EmailField(max_length=255)
#     password = models.CharField(max_length=30)
# class Blog(models.Model):
#     author = models.ForeignKey(User,on_delete=models.CASCADE)
#     title = models.CharField(max_length=50)
#     body = models.TextField()
#     date_time = models.DateTimeField(auto_now_add=True)