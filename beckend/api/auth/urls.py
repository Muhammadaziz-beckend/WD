from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.LoginApiViews.as_view()),
    path('register/', views.RegisterApiView.as_view()),
    path('change-password/', views.ChangePasswordView.as_view()),
    path('logout/', views.LogoutApiView.as_view(), name='logout'),
]