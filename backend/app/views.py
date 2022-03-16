from datetime import date, datetime
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
    todos = Todos.objects.filter(user = request.user)

    all_todos = json.loads(serialize("json", todos))
    return JsonResponse({"success":True, 'all_todos': all_todos, 'theme_mode': {'mode_status': request.user.theme_mode}, 'add_or_bottom': {'todo_add': request.user.add_or_bottom},
    'moved_ticked_item': {'todo_add': request.user.move_ticked_item}})

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
def delete_todo(request):
    if request.method == "POST":
        data            = urlencode(json.loads(request.body))
        request.POST    = QueryDict(data)

        id_           = request.POST.get('id_')

        try:
            todo_obj = Todos.objects.get(pk=id_)
        except:
            return JsonResponse({"error":True, "msg":'Invalid Data Found'})

        todo_obj.delete()

        msg = "Todo Deleted Permanently!"
        return JsonResponse({"success":True, "msg":msg})
    return JsonResponse({})

@csrf_exempt
def trash_todo(request):
    if request.method == "POST":
        data            = urlencode(json.loads(request.body))
        request.POST    = QueryDict(data)

        id_           = request.POST.get('id_')

        try:
            todo_obj = Todos.objects.get(pk=id_)
        except:
            return JsonResponse({"error":True, "msg":'Invalid Data Found'})

        todo_obj.trash = True
        todo_obj.save()

        msg = "Todo Deleted!"
        return JsonResponse({"success":True, "msg":msg})
    return JsonResponse({})

@csrf_exempt
def bookmark_todo(request):
    if request.method == "POST":
        data            = urlencode(json.loads(request.body))
        request.POST    = QueryDict(data)

        id_           = request.POST.get('id_')
        status        = request.POST.get('status')

        try:
            todo_obj = Todos.objects.get(pk=id_)
        except:
            return JsonResponse({"error":True, "msg":'Invalid Data Found'})

        todo_obj.bookmark = str_to_bool(status)
        todo_obj.save()


        if todo_obj.bookmark == True:
            msg = "Todo Bookmarked!"
        else:
            msg = "Remove Bookmarked!"
        return JsonResponse({"success":True, "msg":msg})
    return JsonResponse({})

@csrf_exempt
def undo_todo(request):
    if request.method == "POST":
        data            = urlencode(json.loads(request.body))
        request.POST    = QueryDict(data)

        id_           = request.POST.get('id_')

        try:
            todo_obj = Todos.objects.get(pk=id_)
        except:
            return JsonResponse({"error":True, "msg":'Invalid Data Found'})

        todo_obj.trash = False
        todo_obj.save()

        msg = ""
        return JsonResponse({"success":True, "msg":msg})
    return JsonResponse({})

@csrf_exempt
def unarchive_todo(request):
    if request.method == "POST":
        data            = urlencode(json.loads(request.body))
        request.POST    = QueryDict(data)

        id_           = request.POST.get('id_')

        try:
            todo_obj = Todos.objects.get(pk=id_)
        except:
            return JsonResponse({"error":True, "msg":'Invalid Data Found'})

        todo_obj.bookmark = False
        todo_obj.save()

        msg = "Todo Unarchive!"
        return JsonResponse({"success":True, "msg":msg})
    return JsonResponse({})

@csrf_exempt
def all_reminder(request):
    reminder_list = Reminder.objects.filter(user=request.user)

    reminder_list = json.loads(serialize("json", reminder_list))
    return JsonResponse({'success': True, 'all_reminders':reminder_list})

@csrf_exempt
def add_reminder(request):
    if request.method == "POST":
        data            = urlencode(json.loads(request.body))
        request.POST    = QueryDict(data)

        title           = request.POST.get('itemTitle')
        note            = request.POST.get('itemNote')
        date_           = request.POST.get('itemDate')
        time_           = request.POST.get('itemTime')

        date_ = datetime.strptime(date_, '%Y-%m-%dT%H:%M:%S.%f%z').strftime('%Y-%m-%d')
        time_ = datetime.strptime(time_, '%Y-%m-%dT%H:%M:%S.%f%z').strftime('%H:%M:%S')

        rem_date = datetime.strptime(date_, '%Y-%m-%d')
        rem_time = datetime.strptime(time_, '%H:%M:%S')

        Reminder.objects.create(user=request.user, title=title, note=note, rem_date=rem_date, rem_time=rem_time)
        
    return JsonResponse({"success":True, "msg":'Reminder Added!'})

@csrf_exempt
def update_reminder(request):
    if request.method == "POST":
        data            = urlencode(json.loads(request.body))
        request.POST    = QueryDict(data)

        title           = request.POST.get('itemTitle')
        note            = request.POST.get('itemNote')
        date_           = request.POST.get('itemDate')
        time_           = request.POST.get('itemTime')
        id_             = request.POST.get('id_')

        try:
            reminder_obj = Reminder.objects.get(pk=id_)
        except:
            return JsonResponse({"error":True, "msg":'Invalid Data Found'})

        rem_date = datetime.strptime(date_, '%Y-%m-%d')
        rem_time = datetime.strptime(time_, '%H:%M:%S')

        reminder_obj.title      = title
        reminder_obj.note       = note
        reminder_obj.rem_date   = rem_date
        reminder_obj.rem_time   = rem_time
        reminder_obj.save()
        
    return JsonResponse({"success":True, "msg":'Reminder Updated!'})

@csrf_exempt
def delete_reminder(request):
    if request.method == "POST":
        data            = urlencode(json.loads(request.body))
        request.POST    = QueryDict(data)

        id_           = request.POST.get('id_')

        try:
            reminder_obj = Reminder.objects.get(pk=id_)
        except:
            return JsonResponse({"error":True, "msg":'Invalid Data Found'})

        reminder_obj.delete()

        msg = "Reminder Deleted!"
        return JsonResponse({"success":True, "msg":msg})
    return JsonResponse({})

@csrf_exempt
def bookmark_reminder(request):
    if request.method == "POST":
        data            = urlencode(json.loads(request.body))
        request.POST    = QueryDict(data)

        id_           = request.POST.get('id_')
        status        = request.POST.get('status')

        try:
            reminder_obj = Reminder.objects.get(pk=id_)
        except:
            return JsonResponse({"error":True, "msg":'Invalid Data Found'})

        reminder_obj.bookmark = str_to_bool(status)
        reminder_obj.save()


        if reminder_obj.bookmark == True:
            msg = "Reminder Bookmarked!"
        else:
            msg = "Remove Bookmarked!"
        return JsonResponse({"success":True, "msg":msg})
    return JsonResponse({})

def str_to_bool(status):
    if status == 'True':
        return True
    elif status == 'False':
        return False
    else:
        raise ValueError