from django.contrib.auth.models import User
from rest_framework import serializers
from .models import BlogSave

class BlogSaveSerializer(serializers.ModelSerializer):
   # author_id  = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = BlogSave
        fields = "__all__"
        read_only_fields = ["author"]
    def create(self, validated_data):
        user = self.context["request"].user
        blog = BlogSave.objects.create(**validated_data, author=user)
        return blog
    

class BlogGetSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = BlogSave
        fields = ['id', 'author','title', 'body', 'date_time', 'author_name']
    
    def get_author_name(self, blog):
        name = blog.author.username
        return name



class DeleteOwnBlogSerializer(serializers.ModelSerializer):
    # delete_user_blog = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = BlogSave
        fields = ('id')