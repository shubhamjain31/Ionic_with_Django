from django.urls import path

from app.views import *

urlpatterns = [
    path('todos/list/' , all_todos , name="all_todos"),
    path('add/todo/' , add_todo , name="add_todo"),
    path('update/todo/' , update_todo , name="update_todo"),
    path('delete/todo/' , delete_todo , name="delete_todo"),

    path('todo/status/' , todo_status , name="todo_status"),
    path('completed/todos/' , completed_todos , name="completed_todos"),
]
