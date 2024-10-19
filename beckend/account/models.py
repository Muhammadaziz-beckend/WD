from django.db import models
from django.contrib.auth.models import AbstractUser
from django_resized import ResizedImageField
from phonenumber_field.modelfields import PhoneNumberField

from account.manages import UserManager


class User(AbstractUser):
    CLIENT = 'client'
    SALESMAN = 'salesman'
    ADMIN = 'admin'

    ROLE = (
        (CLIENT, 'Покупатель'),
        (SALESMAN, 'Продавец'),
        (ADMIN, 'Администратор')
    )

    class Meta:
        verbose_name = 'пользователь'
        verbose_name_plural = 'пользователи'
        ordering = ('-date_joined',)

    username = None
    avatar = ResizedImageField( 'аватарка', size=[500, 500], crop=['middle', 'center'],
                               upload_to='avatars/', force_format='WEBP', quality=90,
                               )
    phone = PhoneNumberField('номер телефона', unique=True)
    email = models.EmailField('электронная почта', blank=True, unique=True)
    displayname = models.CharField('Отображаемое имя', max_length=255,)
    role = models.CharField('роль', choices=ROLE, default=CLIENT, max_length=15)
    objects = UserManager()
    city = models.CharField('Город', max_length=100,)
    street = models.CharField('Улица',max_length=100,)
    house = models.CharField('Дом',max_length=10,)
    floor = models.CharField('Этаж',max_length=10,)
    apartment = models.CharField('квартира',max_length=10,)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    @property
    def get_full_name(self):
        return f'{self.last_name} {self.first_name}'

    get_full_name.fget.short_description = 'полное имя'

    def __str__(self):
        return f'{self.get_full_name or str(self.phone)}'

# Create your models here.