# Generated by Django 4.0.2 on 2022-02-27 02:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0012_orderlist_customer_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderlist',
            name='active',
            field=models.BooleanField(null=True),
        ),
    ]