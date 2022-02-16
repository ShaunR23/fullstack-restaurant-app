from rest_framework import serializers
from .models import Item, NewOrder

class ItemSerializers(serializers.ModelSerializer):
    class Meta: 
        model = Item
        fields = '__all__'


class OrderSerializers(serializers.ModelSerializer):
    class Meta: 
        model = NewOrder
        fields = '__all__'