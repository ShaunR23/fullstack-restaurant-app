from django.urls import path
from .views import ItemListAPIView

app_name = 'Item'

urlpatterns = [
    path('',ItemListAPIView.as_view(), name='items')
]