from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User


class Todo(models.Model):
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE)
    created = models.DateField(auto_now_add=True)
    description = models.TextField()
    deadline = models.DateField(default=now)
    status = models.CharField(max_length=100)

    def __str__(self):
        return self.description

    class Meta:
        ordering = ['-deadline']


class Status(models.Model):
    option = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = 'Statuses'

    def __str__(self):
        return self.option
