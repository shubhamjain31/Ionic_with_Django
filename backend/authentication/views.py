from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.http import JsonResponse
from django.middleware import csrf

from urllib.parse import urlencode
from django.http import QueryDict

import json

# Create your views here.

@csrf_exempt
def login_user(request):
    if request.method == "POST":
        data = urlencode(json.loads(request.body))
        user_data = QueryDict(data)
        print(user_data)

        email               = user_data.get('email')
        password            = user_data.get('password')

        user = authenticate(email=email, password=password)

        if user is not None:
            login(request, user)
            token       = csrf.get_token(request)
            sessionid   = request.session.session_key
            print(token,sessionid)

            return JsonResponse({'sessionid':sessionid, 'csrf':token, 'success':True})
        else:    
            msg = 'Invalid credentials'
            return JsonResponse({'msg':msg, 'error':True})   
    return JsonResponse({})