from django.db import models

from django.contrib.auth.models import AbstractUser
from .manager import UserManager
from django.utils.translation import gettext_lazy as _

# Create your models here.

class User(AbstractUser):
    fullname                = models.CharField(max_length=20, blank=True, null=True)
    username                = models.CharField(max_length=20, blank=True, null=True)
    email                   = models.EmailField(unique=True)
    mobile                  = models.CharField(max_length=20, blank=True, null=True)
    first_name              = models.CharField(max_length=30, blank=True, null=True)
    last_name               = models.CharField(max_length=30, blank=True, null=True)
    password                = models.CharField(max_length=150)
    provider                = models.CharField(max_length=50, default="manual")
    user_social_id          = models.CharField(max_length=50, blank=True, null=True)
    api_response            = models.JSONField(default=dict, blank=True, null=True)
     
    last_login              = models.DateTimeField(blank=True, null=True)
    last_logout             = models.DateTimeField(blank=True, null=True)
    theme_mode              = models.BooleanField(default=False)
    add_or_bottom           = models.BooleanField(default=False)
    move_ticked_item        = models.BooleanField(default=False)
    date_joined             = models.DateTimeField(auto_now_add=True, editable=False, blank=True)
    ip_address              = models.CharField(max_length=100, null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'user'
        verbose_name = _('user')
        verbose_name_plural = _('users')

class Todos(models.Model):
    user                    = models.ForeignKey(User, on_delete=models.CASCADE)
    name                    = models.CharField(max_length=200, blank=True, null=True)
    due_date                = models.DateTimeField(blank=True, null=True)
    category                = models.CharField(max_length=50, blank=True, null=True)
    priority                = models.CharField(max_length=50, blank=True, null=True)
    done                    = models.BooleanField(default=False)
    bookmark                = models.BooleanField(default=False)
    trash                   = models.BooleanField(default=False)
    date_created            = models.DateTimeField(auto_now_add=True, editable=False, blank=True)
    ip_address              = models.CharField(max_length=100, null=True, blank=True) 

    def __str__(self):
        return self.name


class Reminder(models.Model):
    user                    = models.ForeignKey(User, on_delete=models.CASCADE)
    title                   = models.CharField(max_length=200, blank=True, null=True)
    note                    = models.TextField()
    bookmark                = models.BooleanField(default=False)
    rem_date                = models.DateField(blank=True, null=True)
    rem_time                = models.TimeField(blank=True, null=True)
    date_created            = models.DateTimeField(auto_now_add=True, editable=False, blank=True)
    ip_address              = models.CharField(max_length=100, null=True, blank=True) 

    def __str__(self):
        return self.title