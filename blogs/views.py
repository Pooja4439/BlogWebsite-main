from rest_framework import viewsets,status 
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser
from .serializer import BlogGetSerializer, BlogSaveSerializer,DeleteOwnBlogSerializer
from .models import BlogSave
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from .pagination import BlogPagination

class NoHeaderProvided(APIException):
        status_code = 400
        default_detail = 'No token is provided in the header or the header is missing.'
        default_code = 'no_header_provided'

class BlogDoesNotExists(APIException):
    status_code = 405
    default_detail = 'No blog for such user exists'
    default_code = 'blog_does_not_exists'
# Create your views here.

class BlogSaveViewSet(viewsets.ModelViewSet):
    queryset = BlogSave.objects.all()
    serializer_class = BlogSaveSerializer
    http_method_names = ['post']
    permission_classes = [IsAuthenticated]

class BlogGetViewSet(viewsets.ModelViewSet):
    serializer_class = BlogGetSerializer
    http_method_names = ['get']
    permission_classes = [IsAuthenticated]
    queryset = BlogSave.objects.all().order_by('-date_time')
    pagination_class = BlogPagination
    
class BlogGetUserViewSet(viewsets.ModelViewSet):
    serializer_class = BlogGetSerializer
    http_method_names = ['get']
    permission_classes = [IsAuthenticated]
    pagination_class = BlogPagination

    def get_queryset(self):
        user_id = int(self.kwargs.get('pk', self.request.user.id))
        return BlogSave.objects.filter(author_id=user_id).order_by('-date_time')
    
    def retrieve(self, request, *args, **kwargs): # Change is here <<
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
class BlogGetAdminViewSet(viewsets.ModelViewSet):
    serializer_class = BlogSaveSerializer
    http_method_names = ['get']
    permission_classes = [IsAdminUser]
    queryset =  BlogSave.objects.all()
    pagination_class = BlogPagination

class DeleteByUserViewSet(viewsets.ModelViewSet):
    serializer_class = DeleteOwnBlogSerializer
    http_method_names = ['delete']
    permission_classes = [IsAuthenticated]
    queryset = BlogSave.objects.all()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        data = BlogSave.objects.get(id=instance.id)
        decode = JWTAuthentication().authenticate(request)
        if decode is not None:
            _ , token = decode
            if(str(token.payload['username']) == str(data.author)):
                self.perform_destroy(instance)
                return Response({"message": "Object deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
            else:
                 raise BlogDoesNotExists()
        else:
            raise NoHeaderProvided()
        
class DeleteByAdminViewSet(viewsets.ModelViewSet):
    serializer_class = DeleteOwnBlogSerializer
    http_method_names = ['delete']
    permission_classes = [IsAdminUser]
    queryset = BlogSave.objects.all()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        decode = JWTAuthentication().authenticate(request)
        if decode is not None:
            self.perform_destroy(instance)
            return Response({"message": "Object deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        else:
            raise NoHeaderProvided()
