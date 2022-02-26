from django.urls import path

from authentication.views import *

urlpatterns = [
    path('login/' , login_user , name="login_user"),
    path('profile/' , user_profile , name="user_profile"),
    path('settings/' , user_settings , name="user_settings"),
    path('change/mode/' , change_theme_mode , name="change_theme_mode"),
]
