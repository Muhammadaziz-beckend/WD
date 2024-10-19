from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView,UpdateAPIView
from api.auth.serializers import ChangePasswordSerializer, LoginSerializer, ProfileSerializer, RegisterSerializer
from account.models import User
from rest_framework import generics, permissions

from api.mixins import UltraModelMixin
from api.serializers import OrderSerializer, WishlistSerializer
from bike.models import Order, Wishlist
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

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

class LogoutApiView(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            token = request.auth  
            token.delete()  
            return Response({"detail": "Вы успешно вышли из системы."}, status=status.HTTP_200_OK)
        except (AttributeError, Token.DoesNotExist):
            return Response({"detail": "Ошибка при выходе."}, status=status.HTTP_400_BAD_REQUEST)

class OrderCreateView(UltraModelMixin, GenericAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        bike = serializer.validated_data['bike']
        quantity = serializer.validated_data['quantity']
        price = bike.price  

        serializer.save(user=self.request.user, price=price, status=Order.PENDING)

class OrderHistoryView(UltraModelMixin, GenericAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-order_date')

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
class WishlistCreateView(generics.CreateAPIView):
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class WishlistListView(generics.ListAPIView):
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)