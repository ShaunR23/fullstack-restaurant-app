# Generated by Django 4.0.2 on 2022-02-15 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0003_remove_item_img'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='img',
            field=models.URLField(default='img url', max_length=255),
        ),
    ]
