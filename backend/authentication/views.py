from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.http import JsonResponse
from django.middleware import csrf
from django.db.models import Count

from urllib.parse import urlencode
from django.http import QueryDict

import json

from app.models import Todos

# Create your views here.

@csrf_exempt
def login_user(request):
    if request.method == "POST":
        data = urlencode(json.loads(request.body))
        user_data = QueryDict(data)

        email               = user_data.get('email')
        password            = user_data.get('password')

        user = authenticate(email=email, password=password)

        if user is not None:
            login(request, user)
            token       = csrf.get_token(request)
            sessionid   = request.session.session_key
            print(token,sessionid)

            return JsonResponse({'sessionid':sessionid, 'csrf':token, 'success':True, 'email': email})
        else:    
            msg = 'Invalid credentials'
            return JsonResponse({'msg':msg, 'error':True})   
    return JsonResponse({})

@csrf_exempt
def user_profile(request):
    
    user_data = {
        'fullname':         request.user.fullname,
        'username':         request.user.username,
        'email':            request.user.email,
        'mobile':           request.user.mobile,
        'joined':           request.user.date_joined
    }

    return JsonResponse({'success':True, 'user_data':user_data})

@csrf_exempt
def user_settings(request):
    user_data = {}
    user_data['theme_mode'] = request.user.theme_mode
    return JsonResponse({'success':True, 'user_data':user_data})

@csrf_exempt
def change_theme_mode(request):
    if request.method == "POST":
        data = urlencode(json.loads(request.body))
        user_data = QueryDict(data)

        mode_status               = user_data.get('mode_status')
        request.user.theme_mode = mode_status
        request.user.save()
    return JsonResponse({'success':True})

@csrf_exempt
def add_or_bottom(request):
    if request.method == "POST":
        data = urlencode(json.loads(request.body))
        user_data = QueryDict(data)

        status               = user_data.get('addorbottom')
        request.user.add_or_bottom = status
        request.user.save()
    return JsonResponse({'success':True})

@csrf_exempt
def ticked_item_move(request):
    if request.method == "POST":
        data = urlencode(json.loads(request.body))
        user_data = QueryDict(data)

        status         = user_data.get('movetickeditem')
        request.user.move_ticked_item = status
        request.user.save()
    return JsonResponse({'success':True})