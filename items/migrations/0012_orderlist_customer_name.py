# Generated by Django 4.0.2 on 2022-02-27 02:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0011_remove_orderlist_customer_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderlist',
            name='customer_name',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
