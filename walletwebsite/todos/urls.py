from django.urls import path
from . import views

urlpatterns = [
    path('', views.my_todos, name='todos'),
    path('add_todo/', views.add_todo, name='add-todo'),
    path('edit_todo/<int:id>', views.edit_todo, name='edit-todo'),
    path('delete_todo/<int:id>', views.delete_todo, name='delete-todo'),
    path('completed_todos/', views.completed_todos, name='completed-todos'),
    path('postponed_todos/', views.postponed_todos, name='postponed-todos'),
    path('work_in_progress_todos/', views.work_in_progress_todos, name='work-in-progress-todos'),
]
