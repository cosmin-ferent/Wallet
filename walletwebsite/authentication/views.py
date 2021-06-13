from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, get_user_model, login, logout
from validate_email import validate_email
from .forms import UserRegisterForm, UserLoginForm


def register_view(request):
    next_page = request.GET.get('next')
    form = UserRegisterForm(request.POST or None)

    if form.is_valid():
        user = form.save(commit=False)
        username = form.cleaned_data.get('username')
        first_name = form.cleaned_data.get('first_name')
        last_name = form.cleaned_data.get('last_name')
        password = form.cleaned_data.get('password')
        password2 = form.cleaned_data.get('password2')
        user.set_password(password)
        user.save()
        new_user = authenticate(username=user.username, password=password)
        login(request, new_user)

        if next_page:
            return redirect(next_page)
        messages.success(request, f'{first_name} {last_name}, your account was created. Now you can login.')
        return redirect('login')

    context = {'form': form}
    return render(request, 'authentication/register.html', context)


def login_view(request):
    # next_page = request.GET.get('next')
    form = UserLoginForm(request.POST or None)

    if form.is_valid():
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password')
        user = authenticate(username=username, password=password)
        login(request, user)

        # if next_page:
        #     return redirect(next_page)

        messages.success(request, f'Wellcome, {request.user.get_full_name()} !')
        if 'next' in request.POST:
            return redirect(request.POST.get('next'))
        else:
            return redirect('/wallet')

    context = {'form': form}
    return render(request, 'authentication/login.html', context)


def logout_view(request):
    logout(request)
    messages.success(request, "You've been logged out")
    return redirect('login')



