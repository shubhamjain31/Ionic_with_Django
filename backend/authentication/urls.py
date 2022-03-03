from django.urls import path

from authentication.views import *

urlpatterns = [
    path('login/' , login_user , name="login_user"),
    path('logout/' , custom_logout , name="custom_logout"),
    path('profile/' , user_profile , name="user_profile"),
    path('settings/' , user_settings , name="user_settings"),
    path('change/mode/' , change_theme_mode , name="change_theme_mode"),
    path('top-or-bottom-todo/' , add_or_bottom , name="add_or_bottom"),
    path('move-ticked-item/' , ticked_item_move , name="ticked_item_move"),
]
