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
    class Meta:
        model = Order
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    total_price = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'bike', 'quantity', 'price', 'total_price']

    def get_total_price(self, obj):
        return int(obj.quantity) * int(obj.price)

    def get_price(self, obj):
        return int(obj.price)

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
