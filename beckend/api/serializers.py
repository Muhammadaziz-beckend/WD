from pprint import pprint

from rest_framework import serializers

from bike.models import Bike, Cart, CartItem, Category, Order,Size,Brand,FrameMaterial,Color,Flag, Wishlist


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'

class SizeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Size
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'quantity', 'price', 'status', 'order_date', 'user', 'bike']

    def get_price(self, obj):
        return int(obj.price)

class PurchaseSerializer(serializers.Serializer):
    bike_id = serializers.IntegerField()
    quantity = serializers.IntegerField()

    def validate_bike_id(self, value):
        try:
            bike = Bike.objects.get(id=value)
        except Bike.DoesNotExist:
            raise serializers.ValidationError("Велосипед с таким ID не найден.")
        
        if bike.receive_type != 'in_stock':
            raise serializers.ValidationError("Этот велосипед недоступен для покупки.")
        
        return value

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError("Количество должно быть больше 0.")
        return value

class CartItemSerializer(serializers.ModelSerializer):
    bike_id = serializers.IntegerField(write_only=True)  

    class Meta:
        model = CartItem
        fields = ['id', 'bike_id', 'quantity', 'price', 'total_price']

    def get_total_price(self, obj):
        return float(obj.total_price)


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']

class FrameMaterialSerializer(serializers.ModelSerializer):

    class Meta:
        model = FrameMaterial
        fields = '__all__'

class ColorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Color
        fields = '__all__'
        
class FlagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Flag
        fields = '__all__'


class BrandSerializer(serializers.ModelSerializer):

    class Meta:
        model = Brand
        fields = '__all__'

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'bike', 'added_at']

class ListBikeSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    brand = BrandSerializer()
    flag = FlagSerializer()
    color = ColorSerializer()
    size = SizeSerializer()
    frame_material = FrameMaterialSerializer()
    class Meta:
        model = Bike
        fields = '__all__'


class DetailBikeSerializer(serializers.ModelSerializer):

    category = CategorySerializer()
    frame_material = FrameMaterialSerializer()
    brand = BrandSerializer()
    color = ColorSerializer()
    flag = FlagSerializer()
    size = SizeSerializer()
    class Meta:
        model = Bike
        fields = '__all__'


class BikeSerializer(serializers.ModelSerializer):


    class Meta:
        model = Bike
        fields = '__all__'



    def create(self, validated_data):

        product = super().create(validated_data)
        product.save()

        return product

    def update(self, instance, validated_data):
        product: Bike = super().update(instance, validated_data)
        product.save()

        return product
