from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class BlogSave(models.Model):
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    body = models.TextField()
    date_time = models.DateTimeField(auto_now_add=True)    