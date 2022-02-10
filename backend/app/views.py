from django.shortcuts import render
from django.http import JsonResponse
from urllib.parse import urlencode
from django.http import QueryDict
from django.views.decorators.csrf import csrf_exempt
from django.utils.dateparse import parse_datetime
import json, datetime

from .models import *
from backend.decorators import *

# Create your views here.

@csrf_exempt
def user_details(request):
    if request.method == "POST":
        data = urlencode(json.loads(request.body))
        user_data = QueryDict(data)
        print(user_data)
    return JsonResponse({"success":True})

@csrf_exempt
def add_todo(request):
    if request.method == "POST":
        data            = urlencode(json.loads(request.body))
        request.POST    = QueryDict(data)

        name           = request.POST.get('itemName')
        dueDate        = request.POST.get('itemDueDate')
        priority       = request.POST.get('itemPriority')
        category       = request.POST.get('itemCategory')

        print(request.POST)
        dueDate = parse_datetime(dueDate)

        Todos.objects.create(name       = name,
                             due_date   = dueDate,
                             priority   = priority,
                             category   = category,
                             ip_address = get_ip(request)
                            )
        msg = "Todo Added!"
        return JsonResponse({"success":True, "msg":msg})
    return JsonResponse({})