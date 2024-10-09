from django.db import models
from colorfield.fields import ColorField
from django.core.validators import MinValueValidator

    
class Category(models.Model):
    class Meta:
        verbose_name = 'категория'
        verbose_name_plural = 'категории'

    name = models.CharField('название', max_length=250, unique=True)

    def __str__(self):
        return f'{self.name}'

class Size(models.Model):
    class Meta:
        verbose_name = 'размер'
        verbose_name_plural = 'размеры'

    name = models.CharField('название', max_length=255)

    def __str__(self):
        return f'{self.name}'
class Brand(models.Model):
    class Meta:
        verbose_name = 'бренд'
        verbose_name_plural = 'бренды'

    name = models.CharField('название', max_length=255)

    def __str__(self):
        return f'{self.name}'
    
class FrameMaterial(models.Model):
    class Meta:
        verbose_name = 'Материал рам'
        verbose_name_plural = 'Материал рамы'
    
    name = models.CharField('название', max_length=255)

    def __str__(self):
        return f'{self.name}'
    
class Color(models.Model):
    class Meta:
        verbose_name = 'Цвет'
        verbose_name_plural = 'Цветы'
        
    name = models.CharField('цвет', max_length=20)
    image = models.ImageField('color', upload_to='images/')
    def __str__(self):
        return f'{self.name}'

class Flag(models.Model):
    class Meta:
        verbose_name = 'Флаг'
        verbose_name_plural = 'Флаги'
        
    name = models.CharField('Флаг', max_length=100)
    image = models.ImageField('флаг', upload_to='images/')
    def __str__(self):
        return f'{self.name}'
    
class Bike(models.Model):
    IN_STOCK = 'in_stock'
    SOLD_OUT = 'sold_out'

    RECEIVE_TYPE = (
        (IN_STOCK, 'в наличии'),
    )
    class Meta:
        verbose_name = 'велосипед'
        verbose_name_plural = 'велосипеды'
    name = models.CharField('название', max_length=100)
    created_at = models.DateTimeField('дата добавление', auto_now_add=True)
    updated_at = models.DateTimeField('дата изменения', auto_now=True)
    frame_material = models.ForeignKey('bike.FrameMaterial', models.PROTECT, verbose_name='Материал рам',help_text='Выберите Материал рамы')
    description = models.CharField('описание', max_length=400, help_text='Просто описание')
    category = models.ForeignKey('bike.Category', models.PROTECT, verbose_name='категория',help_text='Выберите категорию')
    brand  = models.ForeignKey('bike.Brand', models.PROTECT, verbose_name='бренд',help_text='Выберите бренд')
    color = models.ForeignKey('bike.Color', models.PROTECT, verbose_name='Цвет',help_text='Выберите цвет')
    price = models.DecimalField('цена', max_digits=10, decimal_places=2, default=0)
    is_published = models.BooleanField('публичность', default=True)
    flag = models.ForeignKey('bike.Flag', models.PROTECT, verbose_name='флаг',help_text='Выберите флаг')
    receive_type = models.CharField('условия получение', choices=RECEIVE_TYPE, default=IN_STOCK, max_length=15)
    image = models.ImageField('выберите велосипед', upload_to='images/')
    size = models.ForeignKey('bike.Size', models.PROTECT, verbose_name='размер',help_text='Выберите размер')
    year = models.IntegerField('Год')
    wheel_diameter = models.DecimalField('Диаметр колеса', max_digits=3, decimal_places=1, default=0.0)
    user = models.ForeignKey('account.User', on_delete=models.CASCADE, verbose_name='пользователь')
    tires = models.CharField('Покрышки', max_length=170)
    frame = models.CharField('рамка', max_length=170)
    seatpost = models.CharField('Подседельный Штырь', max_length=170)
    saddle = models.CharField('седло', max_length=170)
    fork = models.CharField('Вилка', max_length=170)
    takeaway = models.CharField('Вынос', max_length=170) 
    wheels = models.CharField('Колеса', max_length=170) 
    handlebar = models.CharField('руль', max_length=170) 
    brake_type = models.CharField(
        max_length=50,
        choices=[
            ('disc', 'Disc'),
            ('hydraulic', 'Hydraulic'),
            ('mechanical', 'Mechanical'),
        ],
        default='disc'
    )
    brake_system = models.CharField('Тормозная система', max_length=170) 
    shifters = models.CharField('Манетки', max_length=170)
    connecting_rod_system =  models.CharField('Система шатунов', max_length=170)
    rear_derailleur = models.CharField('Задний переключатель', max_length=100)
    Chain = models.CharField('Цепь', max_length=50)
    num_gears = models.IntegerField(validators=[MinValueValidator(1)])
    warranty_years = models.IntegerField(
        validators=[MinValueValidator(0)],
    )
    def __str__(self):
        return f'{self.name}'