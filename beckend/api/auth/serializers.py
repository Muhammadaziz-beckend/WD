from rest_framework import serializers

from account.models import User


class LoginSerializer(serializers.Serializer):

    email = serializers.CharField()
    password = serializers.CharField()


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id',
            'get_full_name',
            'first_name',
            'last_name',
            'email',
            'phone',
            'avatar',
            'role',
        )
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password_confirm = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    
    class Meta:
        model = User
        fields = ('email', 'phone', 'first_name', 'last_name', 'password', 'password_confirm', 'avatar')

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Пароли не совпадают")
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(
            email=validated_data['email'],
            phone=validated_data['phone'],
            password=validated_data['password'],
            first_name=validated_data['first_name'], 
            last_name=validated_data['last_name'],    
            avatar=validated_data.get('avatar')       
        )
        return user