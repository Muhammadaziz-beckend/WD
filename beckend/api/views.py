from pprint import pprint
from django.db.models import Q
from django.core.paginator import Paginator
from rest_framework.decorators import api_view, permission_classes as permission_classes_d, parser_classes, authentication_classes

from api.auth.permissions import IsSuperUser
from api.filters import BikeFilter
from api.paginations import SimplePagintion
from api.serializers import CategorySerializer, DetailBikeSerializer, ListBikeSerializer, BikeSerializer
from api.permissions import IsAdminOrReadOnly
from api.mixins import UltraGenericAPIView
from bike.models import Bike, Category
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404, GenericAPIView
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

    def get(self, request, *args, **kwargs):
        bikes = self.filter_queryset(self.get_queryset())
        bikes = self.paginate_queryset(bikes)
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
    serializer_class = DetailBikeSerializer
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


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'id'
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["name"]
    ordering = ["name"]
    pagination_class = SimplePagintion
    permission_classes = (IsAuthenticatedOrReadOnly, IsAdminOrReadOnly)