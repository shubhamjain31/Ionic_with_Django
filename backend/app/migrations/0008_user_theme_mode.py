# Generated by Django 4.0.2 on 2022-02-25 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_todos_bookmark'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='theme_mode',
            field=models.BooleanField(default=False),
        ),
    ]
