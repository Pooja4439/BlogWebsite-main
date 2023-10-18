from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet,UserGetViewSet
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from rest_framework_simplejwt.views import TokenObtainPairView

router = DefaultRouter()
router.register('register',UserViewSet)
router.register('user',UserGetViewSet,basename='GetUser')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
