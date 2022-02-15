from django.shortcuts import render
from rest_framework import generics
from .models import Item
from .serializers import ItemSerializers

# Create your views here.
class ItemListAPIView(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializers