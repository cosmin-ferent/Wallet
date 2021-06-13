from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User


class Income(models.Model):
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE)
    source = models.CharField(max_length=250)
    description = models.TextField()
    amount = models.FloatField()
    date = models.DateField(default=now)

    def __str__(self):
        return self.source

    class Meta:
        ordering: ['-date']


class Source(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name


class Expense(models.Model):
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE)
    category = models.CharField(max_length=250)
    description = models.TextField()
    amount = models.FloatField()
    date = models.DateField(default=now)

    def __str__(self):
        return self.category

    class Meta:
        ordering: ['-date']


class Category(models.Model):
    name = models.CharField(max_length=250)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name
