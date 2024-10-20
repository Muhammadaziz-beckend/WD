# Generated by Django 5.1 on 2024-10-19 10:24

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bike', '0003_order'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Wishlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('added_at', models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления')),
                ('bike', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bike.bike', verbose_name='Велосипед')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'Список желаний',
                'verbose_name_plural': 'Списки желаний',
                'unique_together': {('user', 'bike')},
            },
        ),
    ]
