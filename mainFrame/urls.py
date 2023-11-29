from django.urls import path, include 
from . import views


#It will take to the url based on given here
urlpatterns = [
    path('home/', views.home),
    # path('', views.login)

]
