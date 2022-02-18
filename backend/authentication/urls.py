from django.urls import path

from authentication.views import *

urlpatterns = [
    path('login/' , login_user , name="login_user"),
    path('profile/' , user_profile , name="user_profile"),
]
