from django.http import JsonResponse
from urllib.parse import urlencode
from django.http import QueryDict
from django.views.decorators.csrf import csrf_exempt
from django.utils.dateparse import parse_datetime
from django.core.serializers import serialize
import json

from validators import is_invalid

from .models import *
from backend.decorators import *

# Create your views here.

@csrf_exempt
def all_todos(request):
    todos = Todos.objects.filter(user = request.user).order_by('-date_created')

    all_todos = json.loads(serialize("json", todos))
    return JsonResponse({"success":True, 'all_todos': all_todos})

@csrf_exempt
def add_todo(request):
    if request.method == "POST":
        data            = urlencode(json.loads(request.body))
        request.POST    = QueryDict(data)

        name           = request.POST.get('itemName')
        dueDate        = request.POST.get('itemDueDate')
        priority       = request.POST.get('itemPriority')
        category       = request.POST.get('itemCategory')

        if name is None:
            return JsonResponse({"error":True, "msg":"Name is Required!"})

        if priority is None:
            return JsonResponse({"error":True, "msg":"Please Select Any Priority!"})

        if dueDate is None:
            return JsonResponse({"error":True, "msg":"Due Date is Required!"})

        if category is None:
            return JsonResponse({"error":True, "msg":"Category is Required!"})

        dueDate = parse_datetime(dueDate)

        Todos.objects.create(name       = name,
                             due_date   = dueDate,
                             priority   = priority,
                             category   = category,
                             ip_address = get_ip(request),
                             user       = request.user
                            )
        msg = "Todo Added!"
        return JsonResponse({"success":True, "msg":msg})
    return JsonResponse({})

@csrf_exempt
def todo_status(request):
    if request.method == "POST":
        data            = urlencode(json.loads(request.body))
        request.POST    = QueryDict(data)

        done_           = request.POST.get('done')
        id_            = request.POST.get('id')
        try:
            obj = Todos.objects.get(pk=id_)
        except:
            return JsonResponse({'error': True})

        obj.done = done_
        obj.save()
        
        if obj.done == 'True':
            msg = "Todo Completed!"
            return JsonResponse({"ticked":True, "msg":msg})
        else:
            msg = "Todo Completed!"
            return JsonResponse({"not_ticked":True, "msg":msg})

    return JsonResponse({})

@csrf_exempt
def update_todo(request):
    if request.method == "POST":
        data            = urlencode(json.loads(request.body))
        request.POST    = QueryDict(data)

        id_            = request.POST.get('id_')
        name           = request.POST.get('itemName')
        dueDate        = request.POST.get('itemDueDate')
        priority       = request.POST.get('itemPriority')
        category       = request.POST.get('itemCategory')

        if name is None:
            return JsonResponse({"error":True, "msg":"Name is Required!"})

        if priority is None:
            return JsonResponse({"error":True, "msg":"Please Select Any Priority!"})

        if dueDate is None:
            return JsonResponse({"error":True, "msg":"Due Date is Required!"})

        if category is None:
            return JsonResponse({"error":True, "msg":"Category is Required!"})

        dueDate = parse_datetime(dueDate)
        
        try:
            todo_obj = Todos.objects.get(pk=id_)
        except:
            return JsonResponse({"error":True, "msg":'Invalid Data Found'})

        todo_obj.name           = name
        todo_obj.due_date       = dueDate
        todo_obj.category       = category
        todo_obj.priority       = priority
        todo_obj.save()
        msg = "Todo Updated!"
        return JsonResponse({"success":True, "msg":msg})
    return JsonResponse({})


@csrf_exempt
def completed_todos(request):
    all_completed_todos = Todos.objects.filter(user = request.user, done=True)

    todos_list = json.loads(serialize("json", all_completed_todos))
    return JsonResponse({"success":True, 'todos_list': todos_list})