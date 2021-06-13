from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import *
from django.contrib import messages
from django.core.paginator import Paginator
import datetime

today_date = datetime.date.today()


@login_required(login_url='/authentication/login/')
def my_todos(request):
    todos = Todo.objects.filter(owner=request.user).order_by('deadline')
    paginator = Paginator(todos, 10)
    page_number = request.GET.get('page')
    page_object = Paginator.get_page(paginator, page_number)

    context = {
        'todos': todos,
        'page_object': page_object,
        'today_date': today_date
    }

    return render(request, 'todos/todos.html', context)


@login_required(login_url='/authentication/login/')
def add_todo(request):
    statuses = Status.objects.all()
    context = {
        'statuses': statuses,
        'values': request.POST
    }

    if request.method == 'GET':
        return render(request, 'todos/add_todo.html', context)

    if request.method == 'POST':
        description = request.POST['description']
        deadline = request.POST['deadline']
        status = request.POST['status']

        if not description:
            messages.error(request, 'Task description is required')
            return render(request, 'todos/add_todo.html', context)

        if not deadline:
            messages.error(request, 'Deadline is required')
            return render(request, 'todos/add_todo.html', context)

        Todo.objects.create(owner=request.user,
                            description=description,
                            deadline=deadline,
                            status=status)

        messages.success(request, 'New task saved successfully')
        return redirect('/todos/')


@login_required(login_url='/authentication/login/')
def edit_todo(request, id):
    todo = Todo.objects.get(pk=id)
    statuses = Status.objects.all()
    context = {
        'todo': todo,
        'values': todo,
        'statuses': statuses
    }

    if request.method == 'GET':
        return render(request, 'todos/edit_todo.html', context)

    if request.method == 'POST':
        description = request.POST['description']
        deadline = request.POST['deadline']
        status = request.POST['status']

        if not description:
            messages.error(request, 'Task description is required')
            return render(request, 'todos/edit_todo.html', context)

        if not deadline:
            messages.error(request, 'Deadline is required')
            return render(request, 'todos/edit_todo.html', context)

        todo.owner = request.user
        todo.description = description
        todo.deadline = deadline
        todo.status = status
        todo.save()

        messages.success(request, 'Task updated successfully')
        return redirect('/todos/')

    else:
        messages.info(request, 'Handling post form')
        return render(request, 'todos/edit_todo.html', context)


@login_required(login_url='/authentication/login/')
def delete_todo(request, id):
    todo = Todo.objects.get(pk=id)
    todo.delete()
    messages.success(request, 'Task deleted')
    return redirect('/todos/')


@login_required(login_url='/authentication/login/')
def completed_todos(request):
    todos = Todo.objects.filter(owner=request.user).order_by('deadline')
    paginator = Paginator(todos, 10)
    page_number = request.GET.get('page')
    page_object = Paginator.get_page(paginator, page_number)

    context = {
        'todos': todos,
        'page_object': page_object,
        'today_date': today_date
    }

    return render(request, 'todos/completed_todos.html', context)


@login_required(login_url='/authentication/login/')
def postponed_todos(request):
    todos = Todo.objects.filter(owner=request.user).order_by('deadline')
    paginator = Paginator(todos, 10)
    page_number = request.GET.get('page')
    page_object = Paginator.get_page(paginator, page_number)

    context = {
        'todos': todos,
        'page_object': page_object,
        'today_date': today_date
    }

    return render(request, 'todos/postponed_todos.html', context)


@login_required(login_url='/authentication/login/')
def work_in_progress_todos(request):
    todos = Todo.objects.filter(owner=request.user).order_by('deadline')
    paginator = Paginator(todos, 10)
    page_number = request.GET.get('page')
    page_object = Paginator.get_page(paginator, page_number)

    context = {
        'todos': todos,
        'page_object': page_object,
        'today_date': today_date
    }

    return render(request, 'todos/work_in_progress_todos.html', context)
