# Generated by Django 5.1 on 2024-10-19 03:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_alter_user_apartment_alter_user_avatar_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='apartment',
            field=models.CharField(max_length=10, verbose_name='квартира'),
        ),
    ]
