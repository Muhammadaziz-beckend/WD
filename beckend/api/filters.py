# from django_filters import rest_framework as filters

# from bike.models import Bike, Category,Brand


# class BikeFilter(filters.FilterSet):

#     # price = django_filters.NumericRangeFilter()

#     price_from = filters.NumberFilter(lookup_expr='gte', field_name='price')
#     price_to = filters.NumberFilter(lookup_expr='lte', field_name='price')
#     categories = filters.ModelMultipleChoiceFilter(queryset=Category.objects.all(), field_name='category')
    
#     brands = filters.ModelMultipleChoiceFilter(queryset=Brand.objects.all(), field_name='brand')


#     class Meta:
#         model = Bike
#         fields = ['color',]

from django_filters import rest_framework as filters
from bike.models import Bike, Category, Brand

class BikeFilter(filters.FilterSet):
    price_from = filters.NumberFilter(lookup_expr='gte', field_name='price')
    price_to = filters.NumberFilter(lookup_expr='lte', field_name='price')
    categories = filters.ModelMultipleChoiceFilter(queryset=Category.objects.all(), field_name='category')
    brands = filters.ModelMultipleChoiceFilter(queryset=Brand.objects.all(), field_name='brand')
    
    in_stock = filters.BooleanFilter(method='filter_in_stock', label='Только в наличии')

    class Meta:
        model = Bike
        fields = ['color',]

    def filter_in_stock(self, queryset, name, value):
        if value:
            return queryset.filter(receive_type=Bike.IN_STOCK)
        return queryset
