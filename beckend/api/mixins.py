from rest_framework.generics import GenericAPIView


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