from django.urls import path
from .views import ItemListAPIView, OrderListCreateAPIView

app_name = 'Item'

urlpatterns = [
    path('orders/', OrderListCreateAPIView.as_view(), name = 'orders_list_create'),
    path('',ItemListAPIView.as_view(), name='items')
]