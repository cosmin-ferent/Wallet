from django.urls import path
from . import views

urlpatterns = [
    path('', views.wallet_home, name='wallet-home'),
    path('incomes/', views.my_incomes, name='incomes'),
    path('add_income/', views.add_income, name='add-income'),
    path('edit_income/<int:id>', views.edit_income, name='edit-income'),
    path('delete_income/<int:id>', views.delete_income, name='delete-income'),
    path('incomes_summary/', views.incomes_summary, name='incomes-summary'),
    path('expenses/', views.my_expenses, name='expenses'),
    path('add_expense/', views.add_expense, name='add-expense'),
    path('edit_expense/<int:id>', views.edit_expense, name='edit-expense'),
    path('delete_expense/<int:id>', views.delete_expense, name='delete-expense'),
    path('expenses_summary/', views.expenses_summary, name='expenses-summary'),
]
