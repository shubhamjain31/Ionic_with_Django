from django.urls import path

from app.views import *

urlpatterns = [
    path('todos/list/' , all_todos , name="all_todos"),
    path('add/todo/' , add_todo , name="add_todo"),
]
