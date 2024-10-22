from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CartItemCreateView,
    CartItemUpdateDeleteView,
    CartListView,
    ChangePasswordView,
    LoginApiViews,
    LogoutApiView,
    OrderViewSet,
    RegisterApiView,
    WishlistViewSet,
    UserProfileUpdateView,
)

router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'wishlist', WishlistViewSet, basename='wishlist')

urlpatterns = [
    path('login/', LoginApiViews.as_view()),
    path('register/', RegisterApiView.as_view()),
    path('change-password/', ChangePasswordView.as_view()),
    path('cart/', CartListView.as_view(), name='cart-list'),
    path('cart/item/', CartItemCreateView.as_view(), name='cart-item-create'),
    path('cart/item/<int:pk>/', CartItemUpdateDeleteView.as_view(), name='cart-item-update-delete'),
    path('logout/', LogoutApiView.as_view(), name='logout'),
    path('profile/update/', UserProfileUpdateView.as_view(), name='profile-update'),
    path('', include(router.urls)), 
]
