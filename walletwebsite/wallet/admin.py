from django.contrib import admin
from .models import Income, Source, Expense, Category


admin.site.register(Income)
admin.site.register(Source)
admin.site.register(Expense)
admin.site.register(Category)

