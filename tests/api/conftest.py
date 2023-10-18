import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
# These are fixture which runs automatically when provided by test_user.py.

"""
    Here through these fixture auto login is create where the tester just need to 
    call get_token and an auto generated token JWT will be provided.
"""

@pytest.fixture
def client():
    return APIClient()

@pytest.fixture
def user_create():
    return User.objects.create_user(username='pytest', password='root')

@pytest.fixture
def user_login(client,user_create):
    return client.post("/auth/login/",dict(username="pytest",password="root"))

@pytest.fixture
def get_token(user_login):
    return user_login.data

@pytest.fixture
def keep_auth(user_create,client):
    refresh = RefreshToken.for_user(user_create)
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')
    return client
# @pytest.fixture
# def get_user(keep_auth):
    
