from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated,AllowAny
from .serializer import  UserSerializer,UserGetSerializer
from rest_framework import viewsets 
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import APIException

# Raising API exception if no header is provided while accessing user data
class NoHeaderProvided(APIException):
        status_code = 400
        default_detail = 'No token is provided in the header or the header is missing.'
        default_code = 'no_header_provided'

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    http_method_names = ['post']


# Pass the JWT token as header and in return user data will be provided mainly user_id
class UserGetViewSet(viewsets.ModelViewSet):
    serializer_class = UserGetSerializer
    http_method_names = ['get']
    permission_classes = [AllowAny]
    queryset = User.objects.all()

    def get_queryset(self):
        request = self.request
        response = JWTAuthentication().authenticate(request)
        if response is not None:
            _ , token = response
            user_id = token.payload['user_id']
        else:
            raise NoHeaderProvided()
        
        return User.objects.filter(id=user_id)
    

    
