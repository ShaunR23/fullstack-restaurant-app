# Generated by Django 4.0.2 on 2022-02-16 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0004_item_img'),
    ]

    operations = [
        migrations.CreateModel(
            name='NewOrder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_name', models.CharField(max_length=255, null=True)),
                ('name', models.JSONField()),
            ],
        ),
    ]
