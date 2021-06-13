from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Category, Expense, Source, Income
from todos.models import Todo, Status
from dreamteam.models import Individual
from django.contrib import messages
from django.core.paginator import Paginator
import datetime
from django.http import JsonResponse
import json
from django.db.models import Sum
from collections import OrderedDict

from django.http import HttpResponse
from django.template.loader import get_template
# from .utils import render_to_pdf

today_date = datetime.date.today()
one_month_ago_date = today_date - datetime.timedelta(days=30)
six_months_ago_date = today_date - datetime.timedelta(days=183)


@login_required(login_url='/authentication/login/')
def wallet_home(request):
    total_one_month_incomes = Income.objects.filter(owner=request.user,
                                                    date__gte=one_month_ago_date,
                                                    date__lte=today_date).aggregate(Sum('amount'))['amount__sum'] or 0.00
    total_one_month_expenses = Expense.objects.filter(owner=request.user,
                                                      date__gte=one_month_ago_date,
                                                      date__lte=today_date).aggregate(Sum('amount'))['amount__sum'] or 0.00

    context = {
        'total_one_month_incomes': f'{total_one_month_incomes: ,}',
        'total_one_month_expenses': f'{total_one_month_expenses: ,}'
    }

    return render(request, 'wallet/wallet.html', context)


@login_required(login_url='/authentication/login/')
def my_incomes(request):
    incomes = Income.objects.filter(owner=request.user).order_by('-date')
    paginator = Paginator(incomes, 10)
    page_number = request.GET.get('page')
    page_object = Paginator.get_page(paginator, page_number)

    context = {
        'incomes': incomes,
        'page_object': page_object,
    }
    return render(request, 'wallet/incomes.html', context)


@login_required(login_url='/authentication/login/')
def add_income(request):
    sources = Source.objects.all()
    context = {
        'sources': sources,
        'values': request.POST
    }

    if request.method == 'GET':
        return render(request, 'wallet/add_income.html', context)

    if request.method == 'POST':
        amount = request.POST['amount']
        description = request.POST['description']
        source = request.POST['source']
        date = request.POST['income_date']

        if not amount:
            messages.error(request, 'Amount is required')
            return render(request, 'wallet/add_income.html', context)

        if not description:
            messages.error(request, 'Description is required')
            return render(request, 'wallet/add_income.html', context)

        if not source:
            messages.error(request, 'Source is required')
            return render(request, 'wallet/add_income.html', context)

        if not date:
            messages.error(request, 'Date is required')
            return render(request, 'wallet/add_income.html', context)

        Income.objects.create(owner=request.user,
                              amount=amount,
                              description=description,
                              source=source,
                              date=date)

        messages.success(request, 'Income saved successfully')
        return redirect('/wallet/incomes/')


@login_required(login_url='/authentication/login/')
def edit_income(request, id):
    income = Income.objects.get(pk=id)
    sources = Source.objects.all()
    context = {
        'income': income,
        'values': income,
        'sources': sources
    }
    if request.method == 'GET':
        return render(request, 'wallet/edit_income.html', context)
    if request.method == 'POST':
        amount = request.POST['amount']
        description = request.POST['description']
        source = request.POST['source']
        date = request.POST['income_date']

        if not amount:
            messages.error(request, 'Amount is required')
            return render(request, 'wallet/edit_income.html', context)

        if not description:
            messages.error(request, 'Description is required')
            return render(request, 'wallet/edit_income.html', context)

        if not source:
            messages.error(request, 'Source is required')
            return render(request, 'wallet/edit_income.html', context)

        if not date:
            messages.error(request, 'Date is required')
            return render(request, 'wallet/edit_income.html', context)

        income.owner = request.user
        income.amount = amount
        income.description = description
        income.source = source
        income.date = date
        income.save()

        messages.success(request, 'Income updated successfully')
        return redirect('/wallet/incomes/')
    else:
        messages.info(request, 'Handling post form')
        return render(request, 'wallet/edit_income.html', context)


@login_required(login_url='/authentication/login/')
def delete_income(request, id):
    income = Income.objects.get(pk=id)
    income.delete()
    messages.success(request, 'Income deleted')
    return redirect('/wallet/incomes/')


def search_incomes(request):
    if request.method == 'POST':
        search_str = json.loads(request.body).get('searchText')
        incomes = Income.objects.filter(
            amount__istartswith=search_str, owner=request.user) | Income.objects.filter(
            date__istartswith=search_str, owner=request.user) | Income.objects.filter(
            description__icontains=search_str, owner=request.user) | Income.objects.filter(
            source__icontains=search_str, owner=request.user).order_by('-date')
        data = incomes.values()
        return JsonResponse(list(data), safe=False)


def incomes_summary_by_source(request):
    one_month_incomes = Income.objects.filter(owner=request.user,
                                              date__gte=one_month_ago_date,
                                              date__lte=today_date)
    six_months_incomes = Income.objects.filter(owner=request.user,
                                               date__gte=six_months_ago_date,
                                               date__lte=today_date)
    one_month_final_representation = {}
    six_months_final_representation = {}

    def get_category(income):
        return income.source

    one_month_source_list = list(set(map(get_category, one_month_incomes)))
    six_months_source_list = list(set(map(get_category, six_months_incomes)))

    def get_income_source_one_month_amount(source):
        one_month_amount = 0
        one_month_filtered_by_source = one_month_incomes.filter(source=source)

        for item in one_month_filtered_by_source:
            one_month_amount += item.amount

        return one_month_amount

    def get_income_source_six_months_amount(source):
        six_months_amount = 0
        six_months_filtered_by_source = six_months_incomes.filter(source=source)

        for item in six_months_filtered_by_source:
            six_months_amount += item.amount

        return six_months_amount

    for each_income in one_month_incomes:
        for each_source in one_month_source_list:
            one_month_final_representation[each_source] = \
                get_income_source_one_month_amount(each_source)

    for each_income in six_months_incomes:
        for each_source in six_months_source_list:
            six_months_final_representation[each_source] = \
                get_income_source_six_months_amount(each_source)

    return JsonResponse({
        'six_months_incomes_source_data': six_months_final_representation,
        'one_month_incomes_source_data': one_month_final_representation,
    }, safe=False)


@login_required(login_url='/authentication/login/')
def incomes_summary(request):
    total_one_month_incomes = Income.objects.filter(owner=request.user,
                                                    date__gte=one_month_ago_date,
                                                    date__lte=today_date).aggregate(Sum('amount'))['amount__sum'] or 0.00
    total_six_months_incomes = Income.objects.filter(owner=request.user,
                                                     date__gte=six_months_ago_date,
                                                     date__lte=today_date).aggregate(Sum('amount'))['amount__sum'] or 0.00

    context = {
        'total_one_month_incomes': f'{total_one_month_incomes: ,}',
        'total_six_months_incomes': f'{total_six_months_incomes: ,}'
    }

    return render(request, 'wallet/incomes_summary.html', context)

# Expenses


@login_required(login_url='/authentication/login/')
def my_expenses(request):
    expenses = Expense.objects.filter(owner=request.user).order_by('-date')
    paginator = Paginator(expenses, 10)
    page_number = request.GET.get('page')
    page_object = Paginator.get_page(paginator, page_number)

    context = {
        'expenses': expenses,
        'page_object': page_object,
    }
    return render(request, 'wallet/expenses.html', context)


@login_required(login_url='/authentication/login/')
def add_expense(request):
    categories = Category.objects.all()
    context = {
        'categories': categories,
        'values': request.POST
    }

    if request.method == 'GET':
        return render(request, 'wallet/add_expense.html', context)

    if request.method == 'POST':
        amount = request.POST['amount']
        description = request.POST['description']
        category = request.POST['category']
        date = request.POST['expense_date']

        if not amount:
            messages.error(request, 'Amount is required')
            return render(request, 'wallet/add_expense.html', context)

        if not description:
            messages.error(request, 'Description is required')
            return render(request, 'wallet/add_expense.html', context)

        if not category:
            messages.error(request, 'Category is required')
            return render(request, 'wallet/add_expense.html', context)

        if not date:
            messages.error(request, 'Date is required')
            return render(request, 'wallet/add_expense.html', context)

        Expense.objects.create(owner=request.user,
                               amount=amount,
                               description=description,
                               category=category,
                               date=date)

        messages.success(request, 'Expense saved successfully')
        return redirect('/wallet/expenses/')


@login_required(login_url='/authentication/login/')
def edit_expense(request, id):
    expense = Expense.objects.get(pk=id)
    categories = Category.objects.all()
    context = {
        'expense': expense,
        'values': expense,
        'categories': categories
    }
    if request.method == 'GET':
        return render(request, 'wallet/edit_expense.html', context)
    if request.method == 'POST':
        amount = request.POST['amount']
        description = request.POST['description']
        category = request.POST['category']
        date = request.POST['expense_date']

        if not amount:
            messages.error(request, 'Amount is required')
            return render(request, 'wallet/edit_expense.html', context)

        if not description:
            messages.error(request, 'Description is required')
            return render(request, 'wallet/edit_expense.html', context)

        if not category:
            messages.error(request, 'Category is required')
            return render(request, 'wallet/edit_expense.html', context)

        if not date:
            messages.error(request, 'Date is required')
            return render(request, 'wallet/edit_expense.html', context)

        expense.owner = request.user
        expense.amount = amount
        expense.description = description
        expense.category = category
        expense.date = date
        expense.save()

        messages.success(request, 'Expense updated successfully')
        return redirect('/wallet/expenses/')
    else:
        messages.info(request, 'Handling post form')
        return render(request, 'wallet/edit_expense.html', context)


@login_required(login_url='/authentication/login/')
def delete_expense(request, id):
    expense = Expense.objects.get(pk=id)
    expense.delete()
    messages.success(request, 'Expense deleted')
    return redirect('/wallet/expenses/')


def search_expenses(request):
    if request.method == 'POST':
        search_str = json.loads(request.body).get('searchText')
        expenses = Expense.objects.filter(
            amount__istartswith=search_str, owner=request.user) | Expense.objects.filter(
            date__istartswith=search_str, owner=request.user) | Expense.objects.filter(
            description__icontains=search_str, owner=request.user) | Expense.objects.filter(
            category__icontains=search_str, owner=request.user).order_by('-date')
        data = expenses.values()
        return JsonResponse(list(data), safe=False)


def expenses_summary_by_category(request):
    one_month_expenses = Expense.objects.filter(owner=request.user,
                                                date__gte=one_month_ago_date,
                                                date__lte=today_date).order_by('category')
    six_months_expenses = Expense.objects.filter(owner=request.user,
                                                 date__gte=six_months_ago_date,
                                                 date__lte=today_date).order_by('category')
    one_month_food_expenses = Expense.objects.filter(owner=request.user,
                                                     category='Food',
                                                     date__gte=one_month_ago_date,
                                                     date__lte=today_date).order_by('description')
    six_months_food_expenses = Expense.objects.filter(owner=request.user,
                                                      category='Food',
                                                      date__gte=six_months_ago_date,
                                                      date__lte=today_date).order_by('description')
    one_month_beverages_expenses = Expense.objects.filter(owner=request.user,
                                                          category='Beverages',
                                                          date__gte=one_month_ago_date,
                                                          date__lte=today_date).order_by('description')
    six_months_beverages_expenses = Expense.objects.filter(owner=request.user,
                                                           category='Beverages',
                                                           date__gte=six_months_ago_date,
                                                           date__lte=today_date).order_by('description')
    one_month_utilities_expenses = Expense.objects.filter(owner=request.user,
                                                          category='Utilities',
                                                          date__gte=one_month_ago_date,
                                                          date__lte=today_date).order_by('description')
    six_months_utilities_expenses = Expense.objects.filter(owner=request.user,
                                                           category='Utilities',
                                                           date__gte=six_months_ago_date,
                                                           date__lte=today_date).order_by('description')

    one_month_final_representation = {}
    six_months_final_representation = {}
    one_month_food_final_representation = {}
    six_months_food_final_representation = {}
    one_month_beverages_final_representation = {}
    six_months_beverages_final_representation = {}
    one_month_utilities_final_representation = {}
    six_months_utilities_final_representation = {}

    def get_category(expense):
        return expense.category

    def get_food_description(expense):
        return expense.description

    def get_beverages_description(expense):
        return expense.description

    def get_utilities_description(expense):
        return expense.description

    one_month_category_list = list(set(map(get_category, one_month_expenses)))
    six_months_category_list = list(set(map(get_category, six_months_expenses)))
    one_month_food_list = list(set(map(get_food_description, one_month_food_expenses)))
    six_months_food_list = list(set(map(get_food_description, six_months_food_expenses)))
    one_month_beverages_list = list(set(map(get_beverages_description, one_month_beverages_expenses)))
    six_months_beverages_list = list(set(map(get_beverages_description, six_months_beverages_expenses)))
    one_month_utilities_list = list(set(map(get_utilities_description, one_month_utilities_expenses)))
    six_months_utilities_list = list(set(map(get_utilities_description, six_months_utilities_expenses)))

    def get_expense_category_one_month_amount(category):
        one_month_amount = 0
        one_month_filtered_by_category = one_month_expenses.filter(category=category)

        for item in one_month_filtered_by_category:
            one_month_amount += item.amount

        return one_month_amount

    def get_expense_category_six_months_amount(category):
        six_months_amount = 0
        six_months_filtered_by_category = six_months_expenses.filter(category=category)

        for item in six_months_filtered_by_category:
            six_months_amount += item.amount

        return six_months_amount

    def get_food_expense_one_month_amount(description):
        one_month_amount = 0
        one_month_filtered_by_description = one_month_food_expenses.filter(description=description)

        for item in one_month_filtered_by_description:
            one_month_amount += item.amount

        return one_month_amount

    def get_food_expense_six_months_amount(description):
        six_months_amount = 0
        six_months_filtered_by_description = six_months_food_expenses.filter(description=description)

        for item in six_months_filtered_by_description:
            six_months_amount += item.amount

        return six_months_amount

    def get_beverages_expense_one_month_amount(description):
        one_month_amount = 0
        one_month_filtered_by_description = one_month_beverages_expenses.filter(description=description)

        for item in one_month_filtered_by_description:
            one_month_amount += item.amount

        return one_month_amount

    def get_beverages_expense_six_months_amount(description):
        six_months_amount = 0
        six_months_filtered_by_description = six_months_beverages_expenses.filter(description=description)

        for item in six_months_filtered_by_description:
            six_months_amount += item.amount

        return six_months_amount

    def get_utilities_expense_one_month_amount(description):
        one_month_amount = 0
        one_month_filtered_by_description = one_month_utilities_expenses.filter(description=description)

        for item in one_month_filtered_by_description:
            one_month_amount += item.amount

        return one_month_amount

    def get_utilities_expense_six_months_amount(description):
        six_months_amount = 0
        six_months_filtered_by_description = six_months_utilities_expenses.filter(description=description)

        for item in six_months_filtered_by_description:
            six_months_amount += item.amount

        return six_months_amount

    for each_expense in one_month_expenses:
        for each_category in one_month_category_list:
            one_month_final_representation[each_category] = \
                get_expense_category_one_month_amount(each_category)

    for each_expense in six_months_expenses:
        for each_category in six_months_category_list:
            six_months_final_representation[each_category] = \
                get_expense_category_six_months_amount(each_category)

    for each_expense in one_month_food_expenses:
        for each_description in one_month_food_list:
            one_month_food_final_representation[each_description] = \
                get_food_expense_one_month_amount(each_description)

    for each_expense in six_months_food_expenses:
        for each_description in six_months_food_list:
            six_months_food_final_representation[each_description] = \
                get_food_expense_six_months_amount(each_description)

    for each_expense in one_month_beverages_expenses:
        for each_description in one_month_beverages_list:
            one_month_beverages_final_representation[each_description] = \
                get_beverages_expense_one_month_amount(each_description)

    for each_expense in six_months_beverages_expenses:
        for each_description in six_months_beverages_list:
            six_months_beverages_final_representation[each_description] = \
                get_beverages_expense_six_months_amount(each_description)

    for each_expense in one_month_utilities_expenses:
        for each_description in one_month_utilities_list:
            one_month_utilities_final_representation[each_description] = \
                get_utilities_expense_one_month_amount(each_description)

    for each_expense in six_months_utilities_expenses:
        for each_description in six_months_utilities_list:
            six_months_utilities_final_representation[each_description] = \
                get_utilities_expense_six_months_amount(each_description)

    return JsonResponse({
        'one_month_expenses_category_data': one_month_final_representation,
        'six_months_expenses_category_data': six_months_final_representation,
        'one_month_food_expenses_data': one_month_food_final_representation,
        'six_months_food_expenses_data': six_months_food_final_representation,
        'one_month_beverages_expenses_data': one_month_beverages_final_representation,
        'six_months_beverages_expenses_data': six_months_beverages_final_representation,
        'one_month_utilities_expenses_data': one_month_utilities_final_representation,
        'six_months_utilities_expenses_data': six_months_utilities_final_representation,
    }, safe=False)


@login_required(login_url='/authentication/login/')
def expenses_summary(request):
    total_one_month_expenses = Expense.objects.filter(owner=request.user,
                                                      date__gte=one_month_ago_date,
                                                      date__lte=today_date).aggregate(Sum('amount'))['amount__sum'] or 0.00
    total_six_months_expenses = Expense.objects.filter(owner=request.user,
                                                       date__gte=six_months_ago_date,
                                                       date__lte=today_date).aggregate(Sum('amount'))['amount__sum'] or 0.00
    total_one_month_food_expenses = Expense.objects.filter(owner=request.user,
                                                           category='Food',
                                                           date__gte=one_month_ago_date,
                                                           date__lte=today_date).aggregate(Sum('amount'))['amount__sum'] or 0.00
    total_six_months_food_expenses = Expense.objects.filter(owner=request.user,
                                                            category='Food',
                                                            date__gte=six_months_ago_date,
                                                            date__lte=today_date).aggregate(Sum('amount'))['amount__sum'] or 0.00
    total_one_month_beverages_expenses = Expense.objects.filter(owner=request.user,
                                                                category='Beverages',
                                                                date__gte=one_month_ago_date,
                                                                date__lte=today_date).aggregate(Sum('amount'))['amount__sum'] or 0.00
    total_six_months_beverages_expenses = Expense.objects.filter(owner=request.user,
                                                                 category='Beverages',
                                                                 date__gte=six_months_ago_date,
                                                                 date__lte=today_date).aggregate(Sum('amount'))['amount__sum'] or 0.00
    total_one_month_utilities_expenses = Expense.objects.filter(owner=request.user,
                                                                category='Utilities',
                                                                date__gte=one_month_ago_date,
                                                                date__lte=today_date).aggregate(Sum('amount'))['amount__sum'] or 0.00
    total_six_months_utilities_expenses = Expense.objects.filter(owner=request.user,
                                                                 category='Utilities',
                                                                 date__gte=six_months_ago_date,
                                                                 date__lte=today_date).aggregate(Sum('amount'))['amount__sum'] or 0.00

    context = {
        'total_one_month_expenses': f'{total_one_month_expenses: ,}',
        'total_six_months_expenses': f'{total_six_months_expenses: ,}',
        'total_one_month_food_expenses': f'{total_one_month_food_expenses: ,}',
        'total_six_months_food_expenses': f'{total_six_months_food_expenses: ,}',
        'total_one_month_beverages_expenses': f'{total_one_month_beverages_expenses: ,}',
        'total_six_months_beverages_expenses': f'{total_six_months_beverages_expenses: ,}',
        'total_one_month_utilities_expenses': f'{total_one_month_utilities_expenses: ,}',
        'total_six_months_utilities_expenses': f'{total_six_months_utilities_expenses: ,}'
    }

    return render(request, 'wallet/expenses_summary.html', context)


def search_todos(request):
    if request.method == 'POST':
        search_str = json.loads(request.body).get('searchText')
        todos = Todo.objects.filter(
            created__istartswith=search_str, owner=request.user) | Todo.objects.filter(
            description__istartswith=search_str, owner=request.user) | Todo.objects.filter(
            deadline__icontains=search_str, owner=request.user) | Todo.objects.filter(
            status__icontains=search_str, owner=request.user).order_by('-deadline')
        data = todos.values()
        return JsonResponse(list(data), safe=False)


def search_individuals(request):
    if request.method == 'POST':
        search_str = json.loads(request.body).get('searchText')
        individuals = Individual.objects.filter(
            first_name__istartswith=search_str) | Individual.objects.filter(
            last_name__istartswith=search_str) | Individual.objects.filter(
            birth_date__icontains=search_str) | Individual.objects.filter(
            email__icontains=search_str) | Individual.objects.filter(
            phone__icontains=search_str)
        data = individuals.values()
        return JsonResponse(list(data), safe=False)
