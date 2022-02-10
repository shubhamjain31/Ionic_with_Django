from django.conf import settings
from django.contrib.sessions.middleware import SessionMiddleware
import importlib

class CustomSessionMiddleware(SessionMiddleware):
    def process_request(self, request):
        # for mobile users
        if 'HTTP_AUTHORIZATION' in request.META:
            # request.META['CSRF_COOKIE'] = request.META['HTTP_X_CSRFTOKEN']
            # request.META['HTTP_COOKIE'] = 'csrftoken='+request.META['HTTP_X_CSRFTOKEN'] + '; sessionid='+ request.META['HTTP_AUTHORIZATION']
            engine = importlib.import_module(settings.SESSION_ENGINE)
            session_key = request.META['HTTP_AUTHORIZATION']
        
            request.session = engine.SessionStore(session_key)
        else:
            # for web users
            pass
        