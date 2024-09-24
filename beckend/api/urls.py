from django.urls import path, include
from . import views
from .yasg import urlpatterns as url_doc

urlpatterns = [
    path('products/', views.ListCreateBikeApiView.as_view(), name='bike-list-create'),
    path('products/<int:id>/', views.DetailUpdateDestroyBikeApiView.as_view(),name='bike-detail-update-delete'),
    path('auth/', include('api.auth.urls')),
]

urlpatterns += url_doc