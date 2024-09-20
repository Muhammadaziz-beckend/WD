from pprint import pprint

from rest_framework import serializers

from bike.models import Bike, Category,Size,Brand,FrameMaterial,Color,Flag


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'

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

class ListBikeSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    brand = BrandSerializer()
    flag = FlagSerializer()
    color = ColorSerializer()
    Frame_material = FrameMaterialSerializer()
    class Meta:
        model = Bike
        fields = '__all__'


class DetailBikeSerializer(serializers.ModelSerializer):

    category = CategorySerializer()
    Frame_material = FrameMaterialSerializer()
    brand = BrandSerializer()
    color = ColorSerializer()
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
