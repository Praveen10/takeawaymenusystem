from django.db import models
# from django.contrib.auth.models import User
# Create your models here.
# from cloudinary.models import CloudinaryField

class customer(models.Model):
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=20)
    firstname = models.CharField(max_length=20)
    lastname = models.CharField(max_length=20)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    isActive = models.CharField(max_length=10)

    class Meta:
        db_table = "customer"

class admin(models.Model):
    admin_id = models.IntegerField(primary_key=True)
    passKey = models.CharField(max_length=100)

    class Meta:
        db_table = "admin_info"

class restaurantRegister(models.Model):
    restaurant_id = models.IntegerField(primary_key=True)
    firstname = models.CharField(max_length=20)
    lastname = models.CharField(max_length=20)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=128)
    phoneNumber = models.CharField(max_length=50)
    restaurantName = models.CharField(max_length=50)
    restaurantAddress = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    postcode = models.CharField(max_length=50)
    cuisineType = models.CharField(max_length=50)
    hygineRating   =  models.IntegerField()
    isApproved   =  models.IntegerField()
    isDelete     =  models.IntegerField()
    foodTag = models.JSONField()
    createdBy = models.CharField(max_length=50)
    modifiedBy = models.CharField(max_length=50)

    class Meta:
        db_table = "restaurant_info"


class menu(models.Model):
    menu_id = models.IntegerField(primary_key=True)
    itemName = models.CharField(max_length=20)
    restaurant_id = models.IntegerField(null=True)
    itemDescription = models.CharField(max_length=150)
    itemType = models.CharField(max_length=20)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    calorie = models.IntegerField()
    foodGroup = models.CharField(max_length=25)
    itemImage = models.CharField(max_length=50)
    # itemImage = CloudinaryField('image')
    isDelete = models.IntegerField()
    createdBy = models.CharField(max_length=50)

    class Meta:
        db_table = "menu"


class orders(models.Model):
    order_id = models.IntegerField(primary_key=True)
    customer_id = models.IntegerField()
    restaurant_id = models.IntegerField()
    deliverer_id = models.IntegerField(null=True)
    orderNumber = models.CharField(max_length=25)
    foodItems = models.CharField(max_length=150)
    orderSubTotal = models.DecimalField(max_digits=5, decimal_places=2)
    orderTotal = models.DecimalField(max_digits=5, decimal_places=2)
    orderMode = models.CharField(max_length=20)
    orderStatus = models.CharField(max_length=50)
    riderTip = models.DecimalField(max_digits=5, decimal_places=2)
    riderInstruction = models.CharField(max_length=50)
    isActive = models.CharField(max_length=10)
    orderDate = models.CharField(max_length=50)

    class Meta:
        db_table = "order_info"


class discounts(models.Model):
    discount_id = models.IntegerField(primary_key=True)
    restaurant_id = models.IntegerField()
    isActive = models.IntegerField()
    description = models.CharField(max_length=50)
    couponCode = models.CharField(max_length=50)
    offPrice = models.IntegerField()
    discountType = models.CharField(max_length=25)
    spendAmount = models.IntegerField()
    operation = models.CharField(max_length=25)
    createdDate = models.CharField(max_length=50)

    class Meta:
        db_table = "discount_info"

class customerAddress(models.Model):
    address_id = models.IntegerField(primary_key=True)
    customer_id = models.IntegerField()
    street = models.CharField(max_length=25)
    city = models.CharField(max_length=25)
    postcode = models.CharField(max_length=25)
    phoneNumber = models.CharField(max_length=25)
    createdDate = models.CharField(max_length=25)

    class Meta:
        db_table = "customeraddress_info"

class deliverer(models.Model):
    deliverer_id =  models.IntegerField(primary_key=True)
    firstname    =  models.CharField(max_length=25)
    lastname     =  models.CharField(max_length=25)
    email        =  models.CharField(max_length=50)
    password     =  models.CharField(max_length=128)
    phoneNumber  =  models.CharField(max_length=25)
    postCode     =  models.CharField(max_length=25)
    token        =  models.CharField(max_length=80)
    location     =  models.CharField(max_length=25)
    dob          =  models.CharField(max_length=25)
    vehicleType  =  models.CharField(max_length=25)
    isApproved   =  models.IntegerField()
    isDelete     =  models.IntegerField()
    createdBy    =  models.CharField(max_length=25)
    modifiedBy   =  models.CharField(max_length=25)

    class Meta:
        db_table = "deliverer_info"

class ratingsInfo(models.Model):
    rating_id = models.IntegerField(primary_key=True)
    customer_id = models.IntegerField()
    restaurant_id = models.IntegerField()
    feedback = models.CharField(max_length=80)
    rating = models.IntegerField()
    createdBy = models.CharField(max_length=25)

    class Meta:
        db_table = "rating_info"