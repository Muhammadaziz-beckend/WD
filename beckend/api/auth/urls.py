from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.LoginApiViews.as_view()),
    path('register/', views.RegisterApiView.as_view()),
    path('change-password/', views.ChangePasswordView.as_view()),
    path('logout/', views.LogoutApiView.as_view(), name='logout'),
    path('order/create/', views.OrderCreateView.as_view({'post': 'create'}), name='order-create'),
    path('order/history/', views.OrderHistoryView.as_view({'get': 'list'}), name='order-history'),
    path('wishlist/', views.WishlistListView.as_view(), name='wishlist-list'),
    path('wishlist/add/', views.WishlistCreateView.as_view(), name='wishlist-add'),
    path('wishlist/delete/<int:pk>/', views.WishlistDeleteView.as_view(), name='wishlist-delete'),
    path('profile/update/', views.UserProfileUpdateView.as_view(), name='profile-update'),
]