from django.urls import path
from .views import login_view, logout_view, order_view, payment_success, payment_cancel, register, api_login, set_csrf_token

urlpatterns = [
    path('api/login/', api_login, name='api_login'),  # API for login
    path('api/csrf-token/', set_csrf_token, name='csrf_token'),
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
    path('', order_view, name='order'),
    path('success/', payment_success, name='payment_success'),
    path('cancel/', payment_cancel, name='payment_cancel'),
    path('logout/', logout_view, name='logout'),
]
