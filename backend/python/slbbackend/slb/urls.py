from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('slb/', views.getSlb, name="slb"),
    path("slb/chat/", views.chat, name="chat"),
]
