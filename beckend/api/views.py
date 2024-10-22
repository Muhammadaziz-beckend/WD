from pprint import pprint
from django.db.models import Q
from django.core.paginator import Paginator
from rest_framework.decorators import api_view, permission_classes as permission_classes_d, parser_classes, authentication_classes
from .clone import clone_bike
from api.auth.permissions import IsSuperUser
from api.filters import BikeFilter
from api.paginations import SimplePagintion
from api.serializers import BrandSerializer, CategorySerializer, ColorSerializer, DetailBikeSerializer, ListBikeSerializer, BikeSerializer, OrderSerializer
from api.permissions import IsAdminOrReadOnly
from api.mixins import UltraGenericAPIView, UltraModelMixin
from bike.models import Bike, Brand, Category, Color, Flag, FrameMaterial, Order, Size
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404, GenericAPIView,ListAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.mixins import (ListModelMixin, DestroyModelMixin)

class ListCreateBikeApiView(UltraGenericAPIView):

    queryset = Bike.objects.all()
    serializer_classes = {
        'get': ListBikeSerializer,
        'post': BikeSerializer,
    }
    filter_backends = [
        SearchFilter,
        DjangoFilterBackend,
        OrderingFilter
    ]
    search_fields = ['name', 'description',]
    ordering = ['-price','price']
    filterset_class = BikeFilter
    pagination_class = SimplePagintion
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get_serializer_class(self):
        
        assert self.serializer_classes is not None, (
                "'%s' should either include a `serializer_classes` attribute, "
                "or override the `get_serializer_class()` method."
                % self.__class__.__name__
        )

        method = self.request.method.lower()
        return self.serializer_classes[method]

    def get_read_serializer(self, *args, **kwargs):
        assert self.serializer_classes.get('get') is not None, (
                "'%s' should either include a serializer class for get method,"
                "if want to use read serializer, please set serializer class for get method"
                "or override the `get_serializer_class()` method."
                % self.__class__.__name__
        )
        serializer = self.serializer_classes.get('get')

        kwargs.setdefault('context', self.get_serializer_context())
        return serializer(*args, **kwargs)
    def get(self, request, *args, **kwargs):
        bikes = self.filter_queryset(self.get_queryset())
        bikes = self.paginate_queryset(bikes)

        clone_bike(5)

        serializer = self.get_serializer(bikes, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.save(user=request.user)
        read_serializer = self.get_read_serializer(product)
        return Response(read_serializer.data, status=status.HTTP_201_CREATED)

class DetailUpdateDestroyBikeApiView(ListModelMixin, DestroyModelMixin, UltraGenericAPIView):
    queryset = Bike.objects.all()
    serializer_classes = {
        'get': DetailBikeSerializer,
        'patch': BikeSerializer,
        'delete': DetailBikeSerializer,  
    }
    permission_classes = [IsAuthenticatedOrReadOnly | IsSuperUser]

    def get(self, request, *args, **kwargs):
        bike = self.get_object()  
        serializer = self.get_serializer(bike)  
        return Response(serializer.data) 

    def get_object(self):
        return get_object_or_404(Bike, id=self.kwargs.get('id'))

    def get_serializer_class(self):
        if self.request.method == 'PATCH':
            return BikeSerializer
        return super().get_serializer_class()

    def patch(self, request, *args, **kwargs):
        bike = self.get_object()
        serializer = self.get_serializer(instance=bike, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        bike = serializer.save()
        read_serializer = DetailBikeSerializer(instance=bike, context={'request': request})
        return Response(read_serializer.data)

    def delete(self, request, *args, **kwargs):
        bike = self.get_object()
        bike.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# class BikeViewSet(ModelViewSet):
#     queryset = Bike.objects.all()
#     filter_backends = [SearchFilter, DjangoFilterBackend, OrderingFilter]
#     search_fields = ['name', 'description']
#     ordering = ['-price', 'price']
#     filterset_class = BikeFilter
#     pagination_class = SimplePagintion
#     permission_classes = [IsAuthenticatedOrReadOnly | IsSuperUser]

#     def get_serializer_class(self):
#         if self.action == 'list':
#             return ListBikeSerializer
#         elif self.action in ['retrieve', 'update', 'partial_update']:
#             return DetailBikeSerializer
#         return BikeSerializer

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
class CategoryViewSet(UltraModelMixin):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'id'
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["name"]
    ordering = ["name"]
    # pagination_class = SimplePagintion
    permission_classes = (IsAuthenticatedOrReadOnly, IsAdminOrReadOnly)


# m
class ColorViewSet(UltraModelMixin):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer
    lookup_field = 'id'
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["name"]
    ordering = ["name"]
    permission_classes = (IsAuthenticatedOrReadOnly, IsAdminOrReadOnly)


class BrandViewSet(UltraModelMixin):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    lookup_field = 'id'
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["name"]
    ordering = ["name"]
    permission_classes = (IsAuthenticatedOrReadOnly, IsAdminOrReadOnly)
    

class FrameMaterialViewSet(UltraModelMixin):
    queryset = FrameMaterial.objects.all()
    serializer_class = BrandSerializer
    lookup_field = 'id'
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["name"]
    ordering = ["name"]
    permission_classes = (IsAuthenticatedOrReadOnly, IsAdminOrReadOnly)
    

class FlagViewSet(UltraModelMixin):
    queryset = Flag.objects.all()
    serializer_class = BrandSerializer
    lookup_field = 'id'
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["name"]
    ordering = ["name"]
    permission_classes = (IsAuthenticatedOrReadOnly, IsAdminOrReadOnly)
    

class SizeViewSet(UltraModelMixin):
    queryset = Size.objects.all()
    serializer_class = BrandSerializer
    lookup_field = 'id'
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["name"]
    ordering = ["name"]
    permission_classes = (IsAuthenticatedOrReadOnly, IsAdminOrReadOnly)
    
