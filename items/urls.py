from django.urls import path
from .views import ItemListAPIView, OrderListCreateAPIView, OrderReview

app_name = 'items'

urlpatterns = [
    path('orders/<int:pk>/', OrderReview.as_view()),
    path('orders/', OrderListCreateAPIView.as_view(), name = 'orders_list_create'),
    path('',ItemListAPIView.as_view(), name='items')
]