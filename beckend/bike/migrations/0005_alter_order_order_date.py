# Generated by Django 5.1 on 2024-10-20 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bike', '0004_wishlist'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_date',
            field=models.DateTimeField(auto_now_add=True, verbose_name='дата заказа'),
        ),
    ]