from django.shortcuts import render
from django.http import JsonResponse
from urllib.parse import urlencode
from django.http import QueryDict
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

@csrf_exempt
def user_details(request):
    if request.method == "POST":
        data = urlencode(json.loads(request.body))
        user_data = QueryDict(data)
        print(user_data)
    return JsonResponse({"success":True})