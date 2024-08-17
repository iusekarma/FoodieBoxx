import stripe
# from .forms import OrderForm, OrderItemFormSet
from .models import Order, OrderItem, Dish
from .forms import RegistrationForm
from django.conf import settings
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm

stripe.api_key = settings.STRIPE_SECRET_KEY

def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('order')  # Redirect to the order page or any other page
    else:
        form = RegistrationForm()
    
    return render(request, 'registration/register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('order')
    else:
        form = AuthenticationForm()
    return render(request, 'orders/login.html', {'form': form})

@login_required
def logout_view(request):
    logout(request)
    return redirect('login')

@login_required
def order_view(request):
    if request.method == 'POST':
        # Create the order
        order = Order(customer=request.user)
        order.save()
        total_amount = 0
        line_items = []
        
        # Process each item in the order
        for dish_id, quantity in zip(request.POST.getlist('dishes[]'),
                                     request.POST.getlist('quantities[]')):
            dish_id = int(dish_id)
            quantity = int(quantity)
            dish = Dish.objects.get(pk=dish_id)
            order_item = OrderItem(order=order, dish=dish, quantity=quantity)
            order_item.save()
            total_amount += dish.price * quantity
            
            # Add to Stripe line items
            line_items.append({
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': dish.name,
                        # If you have images for the product, you can add them here
                        'images': [request.build_absolute_uri(dish.image.url)],
                    },
                    'unit_amount': int(dish.price * 100),  # Amount in cents
                },
                'quantity': quantity,
            })
        
        order.total_amount = total_amount
        order.save()

        # Create a Stripe Checkout session
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url=request.build_absolute_uri('/success/'),  # Redirect after successful payment
            cancel_url=request.build_absolute_uri('/cancel/'),  # Redirect if payment is canceled
            customer_email=request.user.email,  # Optional: Pre-fill user's email
        )

        # Redirect to Stripe Checkout
        return redirect(session.url, code=303)

    # If GET request, display the order form
    dishes = []
    for dish in Dish.objects.all():
        dishes.append({
            'id': dish.id,
            'name': dish.name,
            'price': dish.price,
            'image': dish.image.url,
            'available': dish.available
        })
    return render(request, 'orders/order.html', {'dishes': tuple(dishes)})

def payment_success(request):
    return render(request, 'orders/payment_success.html')

def payment_cancel(request):
    return render(request, 'orders/payment_cancel.html')

# @login_required
# def order_view(request):
#     if request.method == 'POST':
#         order = Order(customer=request.user)
#         order.save()
#         total_amount = 0
#         for dish_id, quantity in zip(request.POST.getlist('dishes[]'),
#                                      request.POST.getlist('quantities[]')):
#             dish_id = int(dish_id)
#             quantity = int(quantity)
#             dish = Dish.objects.get(pk=dish_id)
#             order_item = OrderItem(order=order, dish=dish, quantity=quantity)
#             order_item.save()
#             total_amount += dish.price * quantity
#         order.total_amount = total_amount
#         order.save()
                
#     dishes = []
#     for dish in Dish.objects.all():
#         dishes.append({
#             'id': dish.id,
#             'name': dish.name,
#             'price': dish.price,
#             'image': dish.image.url,
#             'available': dish.available
#         })
#     return render(request, 'orders/order.html', {'dishes':tuple(dishes)})