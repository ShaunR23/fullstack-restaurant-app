from django.db import models

# Create your models here.

class Item(models.Model):
    menu_item = models.CharField(max_length=255)
    description = models.CharField(max_length=255, default ='description')
    price = models.IntegerField()
    type = models.CharField(max_length=255, default='type')
    img = models.URLField(max_length=255, default='img url')

    def __str__(self):
        return self.menu_item

class OrderList(models.Model):
    customer_name = models.CharField(max_length=255, null=True)
    item = models.CharField(max_length=255)
    price = models.IntegerField

    def __str__(self):
        return self.customer_name



    