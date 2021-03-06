# Generated by Django 4.0.2 on 2022-02-15 00:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='description',
            field=models.CharField(default='description', max_length=255),
        ),
        migrations.AddField(
            model_name='item',
            name='type',
            field=models.CharField(default='type', max_length=255),
        ),
        migrations.AlterField(
            model_name='item',
            name='img',
            field=models.CharField(default='img url', max_length=255),
        ),
        migrations.AlterField(
            model_name='item',
            name='price',
            field=models.IntegerField(),
        ),
    ]
