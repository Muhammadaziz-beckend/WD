from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView,UpdateAPIView
from .serializers import ChangePasswordSerializer, LoginSerializer, ProfileSerializer, RegisterSerializer, UserProfileSerializer
from account.models import User
from rest_framework import generics, permissions
from rest_framework import viewsets
from django.utils import timezone
from api.mixins import UltraModelMixin
from api.serializers import OrderSerializer, PurchaseSerializer, WishlistSerializer, CartItemSerializer, CartSerializer
from bike.models import Bike, Cart, CartItem, Order, Wishlist
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.decorators import action

class LoginApiViews(GenericAPIView):
    serializer_class = [LoginSerializer, ProfileSerializer]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data.get("email")
        password = serializer.validated_data.get("password")

        user = authenticate(email=email, password=password)

        if not user:
            return Response(
                {"detail": "The user does not exist or the password is incorrect"},
                status.HTTP_401_UNAUTHORIZED,
            )
        
        read_serializer = self.get_serializer(index=1,instance=user)
        
        token = Token.objects.get_or_create(user=user)[0].key

        data = {**read_serializer.data, "token": token}

        return Response(data)

    def get_serializer(self, index=0, *args, **kwargs):

        serializer_class = self.get_serializer_class()
        kwargs.setdefault("context", self.get_serializer_context())
        return serializer_class[index](*args, **kwargs)
class RegisterApiView(GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user_data = ProfileSerializer(user).data
            if user_data.get('avatar'):
                avatar_url = request.build_absolute_uri(user_data['avatar'])
                user_data['avatar'] = avatar_url

            return Response(user_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(GenericAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = self.get_object()
        user.set_password(serializer.validated_data['new_password'])
        user.save()

        return Response({'detail': 'Пароль успешно изменен'}, status=status.HTTP_200_OK)

from rest_framework.authtoken.models import Token

class LogoutApiView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            token = request.auth
            if token:
                token.delete()  
                return Response({"detail": "Вы успешно вышли из системы."}, status=status.HTTP_200_OK)
            return Response({"detail": "Токен не найден."}, status=status.HTTP_400_BAD_REQUEST)
        except (AttributeError, Token.DoesNotExist): 
            return Response({"detail": "Ошибка при выходе."}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        return Response({"detail": "Метод GET не поддерживается для выхода. Используйте POST."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

class PurchaseView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PurchaseSerializer

    def post(self, request, *args, **kwargs):
        user = request.user

        try:
            cart = Cart.objects.get(user=user)
        except Cart.DoesNotExist:
            return Response({"detail": "Корзина не найдена."}, status=status.HTTP_404_NOT_FOUND)

        if not cart.items.exists():
            return Response({"detail": "Корзина пуста."}, status=status.HTTP_400_BAD_REQUEST)

        total_price = sum(cart_item.total_price for cart_item in cart.items.all())

        orders = [
            Order(
                user=user,
                bike=cart_item.bike,
                quantity=cart_item.quantity,
                price=cart_item.price,
                status=Order.PENDING
            )
            for cart_item in cart.items.all()
        ]
        Order.objects.bulk_create(orders)

        cart.items.all().delete()  

        if total_price == total_price.to_integral_value():
            total_price = int(total_price)

        return Response({
            "detail": "Покупка успешно завершена.",
            "total_price": total_price
        }, status=status.HTTP_200_OK)

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        bike = serializer.validated_data['bike']
        quantity = serializer.validated_data['quantity']
        price = bike.price  
        serializer.save(user=self.request.user, price=price, status=Order.PENDING)

    @action(detail=False, methods=['post'], url_path='checkout')
    def checkout(self, request):
        cart = Cart.objects.filter(user=request.user).first()

        if not cart or not cart.items.exists():
            return Response({'detail': 'Корзина пуста'}, status=status.HTTP_400_BAD_REQUEST)

        for cart_item in cart.items.all():
            Order.objects.create(
                user=request.user,
                bike=cart_item.bike,
                quantity=cart_item.quantity,
                price=cart_item.price,
                status=Order.PENDING
            )

        cart.items.all().delete()

        return Response({'detail': 'Покупка успешно завершена'}, status=status.HTTP_201_CREATED)



class CartListView(generics.ListAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        total_price = sum(cart_item.quantity * int(cart_item.price) for cart in queryset for cart_item in cart.items.all())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response({
                'carts': serializer.data,
                'total_price': total_price,
            })

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'carts': serializer.data,
            'total_price': total_price,
        })


class CartItemCreateView(generics.CreateAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        cart, created = Cart.objects.get_or_create(user=user)

        bike_id = self.request.data.get('bike_id')
        quantity = self.request.data.get('quantity')

        try:
            bike = Bike.objects.get(id=bike_id)
        except Bike.DoesNotExist:
            raise serializers.ValidationError({"detail": "Велосипед не найден."})

        serializer.save(cart=cart, bike=bike, quantity=int(quantity), price=bike.price)


class CartItemUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(cart__user=self.request.user)

class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        item_id = self.kwargs.get('pk') 
        try:
            wishlist_item = self.get_queryset().get(id=item_id)
            wishlist_item.delete()
            return Response({"detail": "Элемент успешно удален из списка желаемого."}, status=status.HTTP_204_NO_CONTENT)
        except Wishlist.DoesNotExist:
            return Response({"detail": "Элемент не найден в вашем списке."}, status=status.HTTP_404_NOT_FOUND)

class UserProfileUpdateView(generics.UpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user 

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)