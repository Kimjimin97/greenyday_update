from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from . import views

obtain_jwt_token = TokenObtainPairView.as_view()
refresh_jwt_token = TokenRefreshView.as_view()
verify_jwt_token = TokenVerifyView.as_view()

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('login/kakao/', views.kakao_login, name='kakao_login'),
    path('logout/', views.logout, name='logout'),
    path('token/', obtain_jwt_token),
    path('token/refresh/', refresh_jwt_token),
    path('token/verify/', verify_jwt_token),
]
