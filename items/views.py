from django.shortcuts import render
from rest_framework import generics
from .models import Item, OrderList
from .serializers import ItemSerializers, OrderSerializers

# Create your views here.
class ItemListAPIView(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializers

class OrderListCreateAPIView(generics.ListCreateAPIView):
    queryset = OrderList.objects.all() 
    serializer_class = OrderSerializers

class OrderReview(generics.RetrieveUpdateDestroyAPIView):
    queryset = OrderList.objects.all()
    serializer_class = OrderSerializers