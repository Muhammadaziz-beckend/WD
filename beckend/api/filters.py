from django_filters import rest_framework as filters

from bike.models import Bike, Category,Brand


class BikeFilter(filters.FilterSet):

    # price = django_filters.NumericRangeFilter()

    price_from = filters.NumberFilter(lookup_expr='gte', field_name='price')
    price_to = filters.NumberFilter(lookup_expr='lte', field_name='price')
    categories = filters.ModelMultipleChoiceFilter(queryset=Category.objects.all(), field_name='category')
    
    brands = filters.ModelMultipleChoiceFilter(queryset=Brand.objects.all(), field_name='brand')


    class Meta:
        model = Bike
        fields = ['color',]