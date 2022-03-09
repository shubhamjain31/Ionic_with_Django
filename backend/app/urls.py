from django.urls import path

from app.views import *

urlpatterns = [
    path('todos/list/' , all_todos , name="all_todos"),
    path('add/todo/' , add_todo , name="add_todo"),
    path('update/todo/' , update_todo , name="update_todo"),
    path('delete/todo/' , delete_todo , name="delete_todo"),
    path('bookmark/todo/' , bookmark_todo , name="bookmark_todo"),

    path('todo/status/' , todo_status , name="todo_status"),
    path('trash/todo/' , trash_todo , name="trash_todo"),
    path('undo/todo/' , undo_todo , name="undo_todo"),
    path('unarchive/todo/' , unarchive_todo , name="unarchive_todo"),
    path('add-reminder/' , add_reminder , name="add_reminder"),
    path('reminder-list/' , all_reminder , name="all_reminder"),
]
