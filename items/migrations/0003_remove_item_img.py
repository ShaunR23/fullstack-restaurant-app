# Generated by Django 4.0.2 on 2022-02-15 17:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0002_item_description_item_type_alter_item_img_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item',
            name='img',
        ),
    ]
