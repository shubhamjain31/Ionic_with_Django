from django.urls import path

from app.views import *

urlpatterns = [
    path('user/details/' , user_details , name="user_details"),
    path('add/todo/' , add_todo , name="add_todo"),
]
