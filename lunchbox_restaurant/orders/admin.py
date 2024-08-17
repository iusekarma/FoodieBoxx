from django.contrib import admin
from .models import Order, OrderItem, Dish

admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Dish)