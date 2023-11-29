"""
URL configuration for takeAwayMenuSystem project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path, include 
from mainFrame import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.home, name='home'),
    path('home/', views.home, name='home'),
    path('login/', views.login, name='login'),
    path('adminLogin/', views.adminLogin, name='adminLogin'),
    path('adminLanding/adminKey/', views.adminKey, name='adminKey'),
    path('register/', views.register, name='register'),
    path('base/', views.base, name='base'),
    # path('passwordReset/<str:id>', views.passwordResetView, name='passwordReset'),
    path('passwordReset/<str:id>', views.passwordResetView, name='passwordReset'),
    path('passwordResetConfirm/<token>/<str:id>', views.passwordResetConfirmView, name='passwordConfirmReset'),
    path('passwordResetDone/', views.passwordResetDoneView, name='passwordResetDone'),
    path('passwordResetComplete/', views.passwordResetCompleteView, name='passwordResetComplete'),
    path('restaurantRegistration/', views.restaurantRegistration, name='restaurantRegistration'),
    path('restaurantLogin/', views.restaurantLogin, name='restaurantLogin'),
    path('delivererRegistration/', views.delivererRegistration, name='delivererRegistration'),
    path('delivererLogin/', views.delivererLogin, name='delivererLogin'),
    path('customerLanding/<str:id>', views.customerLanding, name='customerLanding'),
    path('restaurantLanding/<str:id>', views.restaurantLanding, name='restaurantLanding'),
    path('delivererLanding/<str:id>', views.delivererLanding, name='delivererLanding'),
    path('delivererProfile/<str:id>', views.delivererProfile, name='delivererProfile'),
    path('customerProfile/<str:id>', views.customerProfile, name='customerProfile'),
    path('restaurantLanding/insertMenuItem/', views.insertMenuItem, name='insertMenuItem'),
    path('restaurantLanding/deleteItem/<str:id>', views.deleteMenuItem, name='deleteMenuItem'),
    path('restaurantLanding/updateMenuItem/', views.updateMenuItem, name='updateMenuItem'),
    path('adminLanding/', views.adminLanding, name='adminLanding'),
    path('restaurantList/', views.restaurantList, name='restaurantList'),
    path('customerList/', views.customerList, name='customerList'),
    path('delivererList/', views.delivererList, name='delivererList'),
    path('approvalList/', views.approvalList, name='approvalList'),
    path('customerList/adminRestaurantOrCustomerAddition/', views.adminRestaurantOrCustomerAddition, name='adminRestaurantOrCustomerAddition'),
    path('restaurantList/adminRestaurantOrCustomerAddition/', views.adminRestaurantOrCustomerAddition, name='adminRestaurantOrCustomerAddition'),
    path('restaurantList/adminRestaurantOrCustomerDeletion/<str:id>', views.adminRestaurantOrCustomerDeletion, name='adminRestaurantOrCustomerDeletion'),
    path('customerList/adminRestaurantOrCustomerDeletion/<str:id>', views.adminRestaurantOrCustomerDeletion, name='adminRestaurantOrCustomerDeletion'),
    path('customerList/adminEditCustomerOrRestaurant', views.adminEditCustomerOrRestaurant, name='adminEditCustomerOrRestaurant'),
    path('restaurantList/adminEditCustomerOrRestaurant', views.adminEditCustomerOrRestaurant, name='adminEditCustomerOrRestaurant'),
    path('approvalList/delivererRestaurantAcceptOrDelete/<str:id>', views.delivererRestaurantAcceptOrDelete, name='delivererRestaurantAcceptOrDelete'),
    path('delivererList/delivererUpdateOrDelete/<str:id>', views.delivererUpdateOrDelete, name='delivererUpdateOrDelete'),
    path('customerLanding/restaurantDataPage/', views.restaurantDataPage, name='restaurantDataPage'),
    path('restaurantMenuPage/<str:id>', views.restaurantMenuPage, name='restaurantMenuPage'),
    path('restaurantMenuPage/<str:id>/checkoutPage', views.checkoutPage, name='checkoutPage'),
    path('restaurantMenuPage/<str:id>/checkoutPage/checkout_session', views.checkout_session, name='checkout_session'),
    path('pay_success', views.pay_success, name='pay_success'),
    path('pay_cancel', views.pay_cancel, name='pay_cancel'),
    path('enquiry', views.enquiry, name='enquiry'),
    path('ratings', views.ratings, name='ratings'),
    path('saveAddress', views.saveAddress, name='saveAddress'),
    path('restaurantOrderList/<str:id>', views.restaurantOrderList, name='restaurantOrderList'),
    path('restaurantDiscount/<str:id>', views.restaurantDiscount, name='restaurantDiscount'),
    path('restaurantDiscount/<str:id>/insertDiscount', views.insertDiscount, name='insertDiscount'),
    path('restaurantOrderList/<str:id>/changeOrderStatus', views.changeOrderStatus, name='changeOrderStatus'),
    path('delivererLanding/<str:id>/changeOrderStatus', views.delivererOrderStatus, name='delivererOrderStatus'),
    path('delivererLanding/acceptOrder/<str:order_id>', views.acceptOrder, name='acceptOrder'),
    path('restaurantDiscount/discountUpdateOrDelete/<str:id>', views.discountUpdateOrDelete, name='discountUpdateOrDelete'),
    path('customerLogout/<str:id>', views.customerLogout, name='customerLogout'),
    path('customerLanding/customerLogout/<str:id>', views.customerLogout, name='customerLogout'),
    


    # path('', include('mainFrame.urls'))

]
