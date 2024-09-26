from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .yasg import urlpatterns as url_doc

router = DefaultRouter()
router.register('categories', views.CategoryViewSet)

urlpatterns = [
    path('products/', views.ListCreateBikeApiView.as_view(), name='bike-list-create'),
    path('products/<int:id>/', views.DetailUpdateDestroyBikeApiView.as_view(),name='bike-detail-update-delete'),
    path('auth/', include('api.auth.urls')),
    path('', include(router.urls)),
]

urlpatterns += url_doc