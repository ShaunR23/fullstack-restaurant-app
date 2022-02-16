from django.shortcuts import render
from rest_framework import generics
from .models import Item, NewOrder
from .serializers import ItemSerializers, OrderSerializers

# Create your views here.
class ItemListAPIView(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializers

class OrderListCreateAPIView(generics.ListAPIView):
    queryset = NewOrder.objects.all() 
    serializer_class = OrderSerializers