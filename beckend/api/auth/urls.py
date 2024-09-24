from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.LoginApiViews.as_view()),
    path('register/', views.RegisterApiView.as_view())
]