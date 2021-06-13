from django import forms
from django.contrib.auth import authenticate, get_user_model

User = get_user_model()


class UserRegisterForm(forms.ModelForm):
    first_name = forms.CharField(label='First name')
    last_name = forms.CharField(label='Last name')
    email = forms.EmailField(label='Email address')
    password = forms.CharField(widget=forms.PasswordInput, label='Enter password')
    password2 = forms.CharField(widget=forms.PasswordInput, label='Confirm password')

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password', 'password2']

    def clean(self):
        username = self.cleaned_data.get('username')
        first_name = self.cleaned_data.get('first_name')
        last_name = self.cleaned_data.get('last_name')
        email = self.cleaned_data.get('email')
        password = self.cleaned_data.get('password')
        password2 = self.cleaned_data.get('password2')

        if User.objects.filter(username=self.cleaned_data['username']).exists():
            raise forms.ValidationError(f'Username {username} is already being used.')

        if password != password2:
            raise forms.ValidationError('Passwords must match')

        email_used = User.objects.filter(email=email)
        if email_used.exists():
            raise forms.ValidationError(f'Email {email} is already being used.')

        return super(UserRegisterForm, self).clean()


class UserLoginForm(forms.Form):
    username = forms.CharField(label=None)
    password = forms.CharField(widget=forms.PasswordInput, label='Enter password')

    def clean(self, *args, **kwargs):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)

            if not user:
                raise forms.ValidationError('Wrong user, wrong password or both')
            if not user.is_active:
                raise forms.ValidationError('This user is not active')

        return super(UserLoginForm, self).clean(*args, **kwargs)
