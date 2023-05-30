from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views
from .views import MainList

router = DefaultRouter()
router.register('items', views.ItemViewSet)

menu = DefaultRouter()
menu.register('adminmenu', views.ItemCreate)

event = DefaultRouter()
event.register('adminevent', views.EventCreate)
urlpatterns = [
    path('test/', views.test, name='test'),
    path('', include(router.urls)),
    path('', include(menu.urls)),
    path('', include(event.urls)),
    path('main/', MainList.as_view(), name='main_list'),
]
