from django.urls import path, include
from . import views

urlpatterns = [
    path('products/', views.ListCreateBikeApiView.as_view()),
    path('products/<int:id>/', views.detail_update_product),
    path('auth/', include('api.auth.urls')),
]