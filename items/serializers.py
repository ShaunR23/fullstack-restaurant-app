from rest_framework import serializers
from .models import Item, OrderList

class ItemSerializers(serializers.ModelSerializer):
    class Meta: 
        model = Item
        fields = '__all__'


class OrderSerializers(serializers.ModelSerializer):
    class Meta: 
        model = OrderList
        fields = '__all__'