"""walletwebsite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from wallet import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('admin/', admin.site.urls),
    path('authentication/', include('authentication.urls')),
    path('wallet/', include('wallet.urls')),
    path('todos/', include('todos.urls')),
    path('search_incomes', csrf_exempt(views.search_incomes), name='search-incomes'),
    path('search_expenses', csrf_exempt(views.search_expenses), name='search-expenses'),
    path('search_todos', csrf_exempt(views.search_todos), name='search-todos'),
    path('search_individuals', csrf_exempt(views.search_individuals), name='search-individuals'),
    path('incomes_summary_by_source', views.incomes_summary_by_source,
         name='incomes-summary-by-source'),
    path('expenses_summary_by_category', views.expenses_summary_by_category,
         name='expenses-summary-by-category-6-months'),
]
