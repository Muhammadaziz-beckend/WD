from rest_framework.generics import GenericAPIView
from rest_framework import serializers
import django
from django.core.validators import MinValueValidator
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet

class SerializerByMethodMixin:
    serializer_classes = {}

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


class UltraGenericAPIView(SerializerByMethodMixin, GenericAPIView):
    pass


class MultipleDestroyMixinSerializer(serializers.Serializer):
    ids = serializers.ListSerializer(child=serializers.IntegerField(validators=[MinValueValidator(1)]))


class MultipleDestroyMixin:
    multiple_delete_permission = permission_classes

    @permission_classes([multiple_delete_permission])
    @action(methods=['POST'], url_path='multiple-delete', detail=False)
    def multiple_delete(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        queryset = self.get_queryset()
        items = queryset.filter(id__in=serializer.data['ids'])
        not_deleted_items = []
        for item in items:
            item_id = item.id
            try:
                item.delete()
            except django.db.models.deletion.ProtectedError as e:
                not_deleted_items.append(item_id)
        return Response({
            'not_deleted_items': not_deleted_items
        }, status=status.HTTP_204_NO_CONTENT if len(not_deleted_items) == 0 else status.HTTP_423_LOCKED)

    def get_serializer_class(self):
        path = self.request.path.split('/')[-2]
        if path == 'multiple-delete':
            return MultipleDestroyMixinSerializer
        return super().get_serializer_class()
    
    

class DestrouPage:
    
    @action(['GET'],False,'all-items')
    def all_items(self,request,*args, **kwargs):
        
        queryset = self.get_queryset()
        
        serializer = self.get_serializer(queryset,many=True)
        
        return Response(serializer.data)
    


class UltraModelMixin(MultipleDestroyMixin,DestrouPage,ModelViewSet):
    pass