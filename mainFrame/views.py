

import traceback
from django.http import HttpResponse, JsonResponse
from django.db import connection
from django.db.models import Q, Avg
from django.shortcuts import render, redirect
import json
from django.core.management.utils import get_random_secret_key
import random, string 
#Flash up messages
from django.contrib import messages
# from django.http import HttpResponse
# from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.hashers import make_password, check_password
from mainFrame.models import customer, restaurantRegister, menu, admin, orders, discounts, customerAddress, deliverer, ratingsInfo
from .email import sendForgetPassword, sendAdminKey, enquries, pushNotification, sendApproveOrRejectedMail
import uuid, datetime
import calendar
from mainFrame.forms import menuForm
import stripe
import requests

presentDate = datetime.datetime.utcnow()
# Create your views here.

def adminLogin(request): 
     context = {}
     getPassKey = admin.objects.get(admin_id='1')
     if request.method == "POST":
          keyValue = request.POST.get('key')
          if keyValue == "":
               messages.success(request, 'Please Enter the Key')
          elif keyValue == getPassKey.passKey:
               return redirect('adminLanding')
          else:
               messages.success(request, 'Please Enter the valid Key')
     return render(request, 'adminLogin.html', context)

def adminKey(request):

     randomKey = get_random_secret_key()
     with connection.cursor() as cursor:
          cursor.execute("UPDATE admin_info SET passKey = '%s'WHERE admin_id = '1'" % (randomKey))

     sendAdminKey(randomKey)

     url = "adminLanding/" 
     localHost = "http://127.0.0.1:8000/"
     bind = localHost + url
     
     # Sending response to ajax.......
     return JsonResponse({"message": "success", "url":bind})


def home(request):
     context = {}
     return render(request, 'home.html', context)

def insertMenuItem(request):

     if request.method == "POST":
          # Get user entered values and stored in a variable
          Iname = request.POST.get('getItemName')
          Idesc = request.POST.get('getItemDescription')
          Itype = request.POST.get('getItemType')
          Iprice = request.POST.get('getItemPrice')
          Iimage = request.POST.get('getItemImage')
          kcal = request.POST.get('sendCal')
          Iinput = request.POST.get('getMyInput')
          middlewareToken = request.POST.get('csrfmiddlewaretoken')
          insertMenuData = menu()
          print(request.POST.get('sendFoodGroup'))
          # print(request.POST.get('getKcal'))
          # Insert menu data to database
          insertMenuData.itemName = Iname
          insertMenuData.restaurant_id = Iinput
          insertMenuData.itemDescription = Idesc
          insertMenuData.itemType = Itype
          insertMenuData.price = Iprice
          insertMenuData.calorie = kcal
          insertMenuData.foodGroup = request.POST.get('sendFoodGroup')
          insertMenuData.isDelete = '0'
          # insertMenuData.itemImage = Iimage
          insertMenuData.save()

          # binding restaurant ID and the page in the URL
          url = "restaurantLanding/" + Iinput 
          print(url)
          # Sending response to ajax.......
          return HttpResponse(url)
     return render(request, 'home.html')

def updateMenuItem(request):
     print("update section")
     print(request.POST)
     uname = request.POST.get('itemName')
     udesc = request.POST.get('itemDesc')
     utype = request.POST.get('itemType')
     uprice = request.POST.get('price')
     uimage = request.POST.get('itemImage')
     umiddlewareToken = request.POST.get('csrfmiddlewaretoken')
     id = request.POST.get('menuid')
     getDbItem = menu.objects.get(menu_id=id)
     restId = getDbItem.restaurant_id
     print(restId)
     kCal = request.POST.get('kCal')
     foodGroup = request.POST.get('foodGroup')
     print(request.POST.get('foodGroup'))
     # updateMenuData = menu()
     # Insert menu data to database
     # updateMenuData.itemName = uname
     # updateMenuData.restaurant_id = restId
     # updateMenuData.itemDescription = udesc
     # updateMenuData.itemType = utype
     # updateMenuData.price = uprice
     # updateMenuData.itemImage = uimage
     # updateMenuData.save()

     presentDate = datetime.datetime.utcnow()
     createddate = calendar.timegm(presentDate.utctimetuple())
     with connection.cursor() as cursor:
               cursor.execute("UPDATE menu SET itemName = '%s', itemDescription = '%s', itemType = '%s', price = '%s', createdBy = '%s', calorie = '%s', foodGroup = '%s' WHERE menu_id = '%s'" % (uname, udesc, utype, uprice, createddate, kCal, foodGroup, id))
     # print(updateMenuData)
     # if request.method == "POST":
      # binding restaurant ID and the page in the URL
     url = "restaurantLanding/" + str(restId)
     localHost = "http://127.0.0.1:8000/"
     bind = localHost + url
     print(bind)
     return JsonResponse({"message": "success", "url":bind})

def deleteMenuItem(request, id):
     print("success")
     deleteItem = menu.objects.get(menu_id=id)
     print(deleteItem.restaurant_id)
     storeID = deleteItem.restaurant_id
     menu.objects.filter(menu_id=id).update(isDelete='1')

     # binding restaurant ID and the page in the URL
     url = "restaurantLanding/" + str(storeID)
     localHost = "http://127.0.0.1:8000/"
     bind = localHost + url
     
     # Sending response to ajax.......
     return JsonResponse({"message": "success", "url":bind})
     # return render(request, 'home.html')

def customerLanding(request, id):
     restaurantList = restaurantRegister.objects.all().exclude(Q(isDelete=True) | Q(isApproved=False))
     print(restaurantList)
     discountList = discounts.objects.all().exclude(isActive=False)
     print(discountList)

     if restaurantList:
          for addRating in restaurantList:
               getRating = ratingsInfo.objects.filter(restaurant_id=addRating.restaurant_id)
               print(addRating.restaurant_id)
               if getRating:
                    average_rating = getRating.aggregate(Avg('rating'))['rating__avg']
                    count = getRating.count()
                    rating = round(average_rating, 1)
                    print(rating)
                    addRating.rating = rating
                    addRating.count = count

     print(restaurantList)
     context = {
          'data':restaurantList,
          'customerId': id,
          'validation': 'landing',
          'discount': discountList
     }
     print("-------------------------------------------")
     print(id)
     
               
     presentDate = datetime.datetime.utcnow()
     print(calendar.timegm(presentDate.utctimetuple()))
     return render(request, 'customerLanding.html', context)

def passwordResetView(request, id):
     context = {}
     if request.method == "POST":
          if id == "1":
               print("------------------------------iiiiiiiiiiiiiiiiiffffffffffffffffffffffffff--------------------------")
               email = request.POST.get('emailAddress')
               with connection.cursor() as cursor:
                    cursor.execute("SELECT * FROM customer WHERE email = '{}'".format(email))
                    result = cursor.fetchone()
                    print(result)
                    if result is not None:
                         # token is used to email. uuid is to generate random token
                         token = str(uuid.uuid4())
                         sendForgetPassword(email, token, id)
                         with connection.cursor() as cursor:
                              # sql = ("UPDATE customer SET token = %s WHERE email = %s" % (token, email))
                              # print(sql)
                              cursor.execute("UPDATE customer SET token = '%s' WHERE email = '%s'" % (token, email) )
                              return redirect('passwordResetDone')
                    messages.success(request, 'Please check the credentials')
          else:
               print("------------------------eeeeeeeeeeeelssssssssssseeeeeeeeeeeeee---------------------")
               email = request.POST.get('emailAddress')
               with connection.cursor() as cursor:
                    cursor.execute("SELECT * FROM restaurant_info WHERE email = '{}'".format(email))
                    result = cursor.fetchone()
                    print(result)
                    if result is not None:
                         # token is used to email. uuid is to generate random token
                         token = str(uuid.uuid4())
                         sendForgetPassword(email, token, id)
                         with connection.cursor() as cursor:
                              # sql = ("UPDATE customer SET token = %s WHERE email = %s" % (token, email))
                              # print(sql)
                              cursor.execute("UPDATE restaurant_info SET token = '%s' WHERE email = '%s'" % (token, email) )
                              return redirect('passwordResetDone')
                    messages.success(request, 'Please check the credentials')
     return render(request, 'passwordReset.html', context)

def passwordResetDoneView(request):
     context = {}
     return render(request, 'passwordResetDone.html', context)

def passwordResetCompleteView(request):
     context = {}
     return render(request, 'passwordResetComplete.html', context)

def passwordResetConfirmView(request, token, id):
     print(token)
     if request.method == "POST":
          newPassword = request.POST.get('newpass')
          cnfmPassword = request.POST.get('cnfrmpass')
          if newPassword == cnfmPassword:
               passwordEncryption = make_password(newPassword)
               if id == "1":
                    with connection.cursor() as cursor:
                         cursor.execute("UPDATE customer SET password = '%s' WHERE token = '%s'" % (passwordEncryption, token))
                         return redirect('passwordResetComplete')
               else:
                    with connection.cursor() as cursor:
                         cursor.execute("UPDATE restaurant_info SET password = '%s' WHERE token = '%s'" % (passwordEncryption, token))
                         return redirect('passwordResetComplete')

     return render(request, 'passwordResetConfirm.html')

def login(request):
     context = {}
     if request.method == "POST":
          email = request.POST.get('emailAddress')
          password = request.POST.get('password')
          with connection.cursor() as cursor:
               cursor.execute("SELECT password FROM customer WHERE email = '{}'".format(email))
               result = cursor.fetchone()
               if result is not None:
                    result = result[0]
                    result = result.strip('()')
                    result = result.replace("'", "")
                    result = result.replace(",", "")
                    print(result)
                    passwordIsValid = check_password(password, result)
                    if passwordIsValid:
                         getCustId = customer.objects.get(email=email)
                         print(getCustId.id)
                         customer.objects.filter(id=getCustId.id).update(isActive='1')
                         return redirect('customerLanding', getCustId.id)
                    else:
                         print("tesssssssssssssssssss")
                         messages.success(request, 'Please check the credentials')
                         
                         
               else:
                    # return HttpResponse('USER DOES NOT EXISTS')
                    messages.success(request, 'Email Id is not Valid')
                    # print(messcheck)
                    # return redirect('login.html')
               
     return render(request, 'login.html', context)

def register(request):

     if request.method == "POST":
          print("inside if")
          # Gets the user entered data 
          insertCustomerData = customer()
          username = request.POST.get('userName')
          firstname = request.POST.get('firstName')
          lastname = request.POST.get('lastName')
          email = request.POST.get('emailAddress')
          password = make_password(request.POST.get('password')) # Encrypt the password based on Password-Based Key Derivation Function
          # Insert values into the database    
          insertCustomerData.username = username
          insertCustomerData.firstname = firstname
          insertCustomerData.lastname = lastname
          insertCustomerData.email = email
          insertCustomerData.password = password
          insertCustomerData.save()

          return render(request, 'home.html')
     else:
          return render(request, 'register.html')
     
def duplicate(request):

     if request.method == "POST":
          print("inside if")
          # Gets the user entered data 
          insertCustomerData = customer()
          username = request.POST.get('userName')
          firstname = request.POST.get('firstName')
          lastname = request.POST.get('lastName')
          email = request.POST.get('emailAddress')
          password = make_password(request.POST.get('password')) # Encrypt the password based on Password-Based Key Derivation Function
          # Insert values into the database    
          insertCustomerData.username = username
          insertCustomerData.firstname = firstname
          insertCustomerData.lastname = lastname
          insertCustomerData.email = email
          insertCustomerData.password = password
          insertCustomerData.save()

          return render(request, 'home.html')
     else:
          return render(request, 'duplicate.html')
 
def base(request):
     return render(request, 'base.html', {})

def restaurantLanding(request, id):
     # It filters the menu based on the restaurant ID. 
     result = menu.objects.filter(restaurant_id=id, isDelete='0')

     # It stores the data to display in the HTMl dynamically.
     context = {
          'data':result,
          'pick':id,
          'validation': 'dashboard'
     }
     print(context)
     return render(request, 'restaurantLanding.html', context)
     # return render(request, 'restaurantLanding.html', {})

def restaurantRegistration(request):
     if request.method == "POST":
          insertRestaurantData = restaurantRegister()
          firstname = request.POST.get('firstName')
          lastname = request.POST.get('lastName')
          email = request.POST.get('emailAddress')
          phoneNumber = request.POST.get('phnumber')
          password = make_password(request.POST.get('password'))
          restaurantName = request.POST.get('restaurantname')
          restaurantAddress = request.POST.get('restaurantaddress')
          restaurantCity = request.POST.get('city')
          restaurantPostCode = request.POST.get('postcode')
          restaurantCusine = request.POST.get('cusinetype')
          restaurantHygine = request.POST.get('hygineRating')
          presentDate = datetime.datetime.utcnow()

          # Insert values into the database    
          insertRestaurantData.firstname = firstname
          insertRestaurantData.lastname = lastname
          insertRestaurantData.email = email
          insertRestaurantData.phoneNumber = phoneNumber
          insertRestaurantData.password = password
          insertRestaurantData.restaurantName = restaurantName
          insertRestaurantData.restaurantAddress = restaurantAddress
          insertRestaurantData.city = restaurantCity
          insertRestaurantData.postcode = restaurantPostCode
          insertRestaurantData.cuisineType = restaurantCusine
          insertRestaurantData.hygineRating = restaurantHygine
          insertRestaurantData.isApproved = "0"
          insertRestaurantData.isDelete = "0"
          insertRestaurantData.createdBy = calendar.timegm(presentDate.utctimetuple())
          insertRestaurantData.save()   
          getRestaurantInfo = restaurantRegister.objects.get(email=email)  
          print(getRestaurantInfo)
          getRestaurantID = getRestaurantInfo.restaurant_id
          print(getRestaurantID)

          # commented to verify 
          # Insert sample data
          # insertSampleMenu = menu()
          # insertSampleMenu.restaurant_id = getRestaurantID
          # insertSampleMenu.itemName = 'Chicken Soup'
          # insertSampleMenu.itemDescription = 'Homemade chicken broth topped with spring onion and pepper'
          # insertSampleMenu.itemType = 'Starter'
          # insertSampleMenu.price = '3.50'
          # insertSampleMenu.createdBy = calendar.timegm(presentDate.utctimetuple())
          # print(insertSampleMenu.itemDescription)
          # insertSampleMenu.save()
          return redirect('restaurantLogin')
     return render(request, 'restaurantRegistration.html', {})

def delivererRegistration(request):
     if request.method == "POST":
          # insertRestaurantData = restaurantRegister()
          firstname = request.POST.get('firstName')
          lastname = request.POST.get('lastName')
          email = request.POST.get('emailAddress')
          phoneNumber = request.POST.get('phnumber')
          password = make_password(request.POST.get('password'))
          workLocation = request.POST.get('workCity')
          dateOfBirth = request.POST.get('dob')
          postCode = request.POST.get('postcode')
          vehicleType = request.POST.get('vehicletype')
          print(email)
          print(phoneNumber)
          print(workLocation)
          print(dateOfBirth)
          print(postCode)
          print(vehicleType)
          print(password)
          print(lastname)
          insertDelivererData = deliverer()
          insertDelivererData.firstname  = firstname
          insertDelivererData.lastname  = lastname
          insertDelivererData.email  = email
          insertDelivererData.password  = password
          insertDelivererData.phoneNumber  = phoneNumber
          insertDelivererData.postCode  = postCode
          insertDelivererData.location  = workLocation
          insertDelivererData.dob  = dateOfBirth
          insertDelivererData.vehicleType  = vehicleType
          insertDelivererData.isApproved  = "0"
          insertDelivererData.isDelete  = "0"
          insertDelivererData.createdBy  = calendar.timegm(presentDate.utctimetuple())
          insertDelivererData.save()
          # restaurantPostCode = request.POST.get('postcode')
          # restaurantCusine = request.POST.get('cusinetype')
          # presentDate = datetime.datetime.utcnow()
          print(request.POST.get('firstName'))
          return JsonResponse({"success": "success"})
          # return redirect('delivererLogin')
     return render(request, 'delivererRegistration.html', {})

def restaurantLogin(request):
     if request.method == "POST":
          email = request.POST.get('emailAddress')
          password = request.POST.get('password')
          getRestaurantInfo = restaurantRegister.objects.filter(email=email).exclude(Q(isDelete=True) | Q(isApproved=False))
          print(getRestaurantInfo)
          # if getRestaurantInfo:
          #      passwordValidation = check_password(password, getRestaurantInfo.password)
          #      if passwordValidation:
          #           getRestaurantID = getRestaurantInfo.restaurant_id
          #           print(getRestaurantID)
          #           return redirect("restaurantLanding", id=getRestaurantID)
          #      else:
          #           print("NOoooooooooooooooooooooooooooooooo")
          getId = ''
          if getRestaurantInfo:
               for checkPassword in getRestaurantInfo:
                    isValid = check_password(password, checkPassword.password)
                    getId = checkPassword.restaurant_id
               if isValid:
                    print("success")
                    print(getId)
                    return redirect("restaurantLanding", id=getId)
               else:
                    messages.success(request, 'Please check your credentials')
          else:
               messages.success(request, 'Email Id is not Valid')

     return render(request, 'restaurantLogin.html', {})

def delivererLogin(request):
     if request.method == "POST":
          email = request.POST.get('emailAddress')
          password = request.POST.get('password')
          print(password)
          getId = ''
          getDelivererInfo = deliverer.objects.filter(email=email).exclude(Q(isDelete=True) | Q(isApproved=False))
          if getDelivererInfo:
               for checkPassword in getDelivererInfo:
                    isValid = check_password(password, checkPassword.password)
                    getId = checkPassword.deliverer_id
               if isValid:
                    print("success")
                    print(getId)
                    return redirect("delivererLanding", id=getId)
               else:
                    messages.success(request, 'Please check your credentials')
          else:
               messages.success(request, 'Email Id is not Valid')

     return render(request, 'delivererLogin.html', {})

def delivererLanding(request, id): 
     print("deliverLanding")
     delivererData = deliverer.objects.get(deliverer_id = id)
     orderDelivery = orders.objects.filter(deliverer_id = id).exclude(Q(isActive=False) | Q(orderMode="pickup"))
     if orderDelivery:
          print('It has')
          # if orderDelivery.isActive == '1':
          print(orderDelivery)
          for order in orderDelivery:
               if order.orderStatus == 'delivered':
                    orders.objects.filter(order_id=order.order_id).update(isActive = '0')
                    print('hello world')
               order.restaurantInfo = restaurantRegister.objects.get(restaurant_id=order.restaurant_id)
               order.customerInfo = customer.objects.get(id=order.customer_id)
               order.customerAddress = customerAddress.objects.get(customer_id=order.customer_id)
               order.split = 'start'
               print('jjj')
          context = {
               'deliverData' : delivererData,
               'validation': 'orders',
               'data': orderDelivery,
               'id': id
          }
     else:         
          orderList = orders.objects.all().exclude(Q(isActive=False) | Q(orderMode="pickup"))
          print(orderList)
          if orderList:
               for order in orderList:
                    order.restaurantInfo = restaurantRegister.objects.get(restaurant_id=order.restaurant_id)
                    order.customerInfo = customer.objects.get(id=order.customer_id)
                    order.customerAddress = customerAddress.objects.get(customer_id=order.customer_id)
                    order.split = 'all'
          context = {
               'deliverData' : delivererData,
               'validation': 'orders',
               'data': orderList,
               'id': id
          }
     return render(request, 'delivererLanding.html', context)

def adminLanding(request):
     # getMenuCount = menu.objects.all().count
     getOrderCount = orders.objects.all().count()
     # print(getMenuCount)
     getCustomerCount = customer.objects.all().count()
     print(getCustomerCount)
     getRestaurantCount = restaurantRegister.objects.all().count()
     print(getRestaurantCount)
     allOrders = orders.objects.all()
     getRevenue = sum(orders.orderTotal for orders in allOrders)
     getProfit = getOrderCount * 2.50
     getDelivererCount = deliverer.objects.all().count()
     print(getDelivererCount)
     # getChart = []
     context = {
          'orderCount': getOrderCount,
          'revenue': getRevenue,
          'profit': getProfit,
          "customerCount" : getCustomerCount,
          "restaurantCount" : getRestaurantCount,
          "delivererCount" : getDelivererCount,
          'chartCheck' : [getOrderCount, getCustomerCount, getRestaurantCount],
          'validation' : 'dashboard'
     }
     return render(request, 'adminLanding.html', context)

def restaurantList(request):
     result = restaurantRegister.objects.filter(isDelete='0', isApproved='1')
     print("resturantList")
     print(result)
     context = {
          'data': result,
          'validation' : 'restaurant'
     }
     return render(request, 'adminLanding.html', context)

def customerList(request):
     result = customer.objects.all()
     print(result)
     context = {
          'data': result,
          'validation' : 'customer'
     }
     return render(request, 'adminLanding.html', context)

def delivererList(request):
     delivererDataList = deliverer.objects.all().exclude(isApproved = False).exclude(isDelete = True)
     context = {
          'data': delivererDataList,
          'validation' : 'deliverer'
     }
     return render(request, 'adminLanding.html', context)

def approvalList(request):
     delivererApproval = deliverer.objects.filter(isApproved=False, isDelete=False).exists()
     restaurantApproval = restaurantRegister.objects.filter(isApproved=False, isDelete=False).exists()
     print(delivererApproval)
     print(restaurantApproval)
     restaurantData = []
     delivererData = []
     print(restaurantData)
     
     if delivererApproval:
          if not restaurantApproval:
               delivererApprovalData = deliverer.objects.filter(isApproved=False, isDelete=False)
               print(delivererApprovalData)
               for delivery in delivererApprovalData:
                    if not delivery.isDelete:
                         delivererData.append(delivery)
               context = {
                    'validation' : 'approval',
                    'delivererData' : delivererData,
                    'toList' : 'rider'
                }
          else:
               print("£££££££££££££££££££££££££££££££££££££££££££")
               restaurantApprovalData = restaurantRegister.objects.filter(isApproved=False, isDelete=False)
               for restaurant in restaurantApprovalData:
                    if not restaurant.isDelete:
                         restaurantData.append(restaurant)

               delivererApprovalData = deliverer.objects.filter(isApproved=False, isDelete=False)
               for delivery in delivererApprovalData:
                    if not delivery.isDelete:
                         delivererData.append(delivery)

               context = {
                    'validation' : 'approval',
                    'restaurantData' : restaurantData,
                    'delivererData' : delivererData,
                    'toList' : 'both'
               }
     else:
          if restaurantApproval:
               restaurantApprovalData = restaurantRegister.objects.filter(isApproved=False, isDelete=False)
               for restaurant in restaurantApprovalData:
                    if not restaurant.isDelete:
                         restaurantData.append(restaurant)
               context = {
                    'validation' : 'approval',
                    'restaurantData' : restaurantData,
                    'toList' : 'restaurant'
               }
          else:
               print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
               context = {
                    'validation' : 'approval',
                    # 'restaurantData' : restaurantData,
                    'toList' : 'both'
               }

     return render(request, 'adminLanding.html', context)

def adminRestaurantOrCustomerAddition(request):
     if request.method == "POST":
          print("adminRestaurantOrCustomerAddition")
          if request.POST.get('split') == 'customer':
               insertCustomerData = customer()
               customerFirstName = request.POST.get('getFName')
               customerLastName = request.POST.get('getLName')
               customerUserName = request.POST.get('getUName')
               customerEmail = request.POST.get('getCEmail')
               customerPassword = request.POST.get('getCPass')
               customerPhoneNumber = request.POST.get('getCPhone')
               token = request.POST.get('csrfmiddlewaretoken')

               insertCustomerData.username = customerUserName
               insertCustomerData.firstname = customerFirstName
               insertCustomerData.lastname = customerLastName
               insertCustomerData.email = customerEmail
               insertCustomerData.password = make_password(customerPassword)
               insertCustomerData.phone = customerPhoneNumber
               insertCustomerData.save()

               print(customerPhoneNumber)

               # binding restaurant ID and the page in the URL
               url = "customerList/" 
               print(url)
               # Sending response to ajax.......
               return HttpResponse(url)
          else:
              if request.method == "POST":
                    print("------------------------------------------------------------------")
                    token = request.POST.get('csrfmiddlewaretoken')
                    restaurantUserFirstName = request.POST.get('getRFName')
                    restaurantUserLastName = request.POST.get('getRLName')
                    restaurantEmail = request.POST.get('getREmail')
                    restaurantUserPassword = request.POST.get('getRPassword')
                    restaurantName = request.POST.get('getRName')
                    restaurantPhoneNumber = request.POST.get('getRPhone')
                    restaurantAddress = request.POST.get('getRAddress')
                    restaurantCity = request.POST.get('getRCity')
                    restaurantPostCode = request.POST.get('getRPostCode')
                    restaurantCusine = request.POST.get('getRCusine')
                    restaurantHygine = request.POST.get('getRHygine')
                    print(restaurantCusine)
                    print(restaurantHygine)

                    insertRestaurantData = restaurantRegister()
                    # Insert values into the database    
                    insertRestaurantData.firstname = restaurantUserFirstName
                    insertRestaurantData.lastname = restaurantUserLastName
                    insertRestaurantData.email = restaurantEmail
                    insertRestaurantData.phoneNumber = restaurantPhoneNumber
                    insertRestaurantData.password = make_password(restaurantUserPassword)
                    insertRestaurantData.restaurantName = restaurantName
                    insertRestaurantData.restaurantAddress = restaurantAddress
                    insertRestaurantData.city = restaurantCity
                    insertRestaurantData.postcode = restaurantPostCode
                    insertRestaurantData.cuisineType = restaurantCusine
                    insertRestaurantData.hygineRating = restaurantHygine
                    insertRestaurantData.isApproved = "0"
                    insertRestaurantData.isDelete = "0"
                    insertRestaurantData.createdBy = calendar.timegm(presentDate.utctimetuple())
                    insertRestaurantData.save()   

                    # binding restaurant ID and the page in the URL
                    url = "restaurantList/" 
                    print(url)
                    # Sending response to ajax.......
                    return HttpResponse(url)

def adminRestaurantOrCustomerDeletion(request, id):
     print("adminRestaurantOrCustomerDeletion")
     if request.method == "POST":
          print("PPPPPPPPPPPOOOOOOOOOOOOOOSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTT")
          # deleteItem = menu.objects.get(menu_id=id)
          if request.POST.get('split') == 'restaurant':
               print(request.POST.get('split'))
               token = request.POST.get('csrfmiddlewaretoken')

               isMenuDataExists = menu.objects.filter(restaurant_id=id).exists()
               if isMenuDataExists:
                    menu.objects.filter(restaurant_id=id).update(isDelete='1', modifiedBy= calendar.timegm(presentDate.utctimetuple()))
               
               restaurantRegister.objects.filter(restaurant_id=id).update(isDelete='1', modifiedBy= calendar.timegm(presentDate.utctimetuple()))
               print("success")
               # binding restaurant ID and the page in the URL
               url = "restaurantList/"
               localHost = "http://127.0.0.1:8000/"
               bind = localHost + url
               
               # Sending response to ajax.......
               return JsonResponse({"message": "success", "url":bind})
          else:
               deleteCustomerData = customer.objects.get(id=id)
               
               token = request.POST.get('csrfmiddlewaretoken')
               deleteCustomerData.delete()
               print("customer success")
               # binding restaurant ID and the page in the URL
               url = "customerList/"
               localHost = "http://127.0.0.1:8000/"
               bind = localHost + url
               return JsonResponse({"message": "success", "url":bind})
     return HttpResponse("Invalid request method.")

def adminEditCustomerOrRestaurant(request):
     if request.method == "POST":
          if request.POST.get('validate') == 'restaurant':
               print("*********************************************")
               getRestaurantName = request.POST.get('sendRestaurantName')
               getRestaurantCusine = request.POST.get('sendRestaurantCusine')
               getRestaurantAddress = request.POST.get('sendRestaurantAddress')
               getRestaurantPhoneNumber = request.POST.get('sendRestaurantPhone')
               getCity = request.POST.get('sendRestaurantCity')
               getPostCode = request.POST.get('sendPostCode')
               getHygineRating = request.POST.get('sendHygineRating')
               middleware = request.POST.get('csrfmiddlewaretoken')
               restaurantID = request.POST.get('sendRestID')
               getFoodTags = request.POST.get('sendFoodTag')
               json_value = json.loads(getFoodTags)
               print(json_value)
               modifiedDate = calendar.timegm(presentDate.utctimetuple())

               with connection.cursor() as cursor:
                    cursor.execute("UPDATE restaurant_info SET restaurantName = '%s', cuisineType = '%s', restaurantAddress = '%s', phoneNumber = '%s', city = '%s', postcode = '%s', foodTag = '%s', hygineRating = '%s', modifiedBy = '%s' WHERE restaurant_id = '%s'" % (getRestaurantName, getRestaurantCusine, getRestaurantAddress, getRestaurantPhoneNumber, getCity, getPostCode, json.dumps(json_value), getHygineRating, modifiedDate, restaurantID))
               
               url = "restaurantList/" 
               localHost = "http://127.0.0.1:8000/"
               bind = localHost + url
               print(bind)
               return JsonResponse({"message": "success", "url":bind})
               
          else:    
               print("update section")
               print(request.POST)
               cUName = request.POST.get('sendUserName')
               cFName = request.POST.get('sendFirstName')
               cLName = request.POST.get('sendLastName')
               cEmail = request.POST.get('sendEmail')
               cPhone = request.POST.get('sendPhone')
               customerIDD = request.POST.get('sendID')
               umiddlewareToken = request.POST.get('csrfmiddlewaretoken')
      
               with connection.cursor() as cursor:
                    cursor.execute("UPDATE customer SET username = '%s', firstname = '%s', lastname = '%s', email = '%s', phone = '%s' WHERE id = '%s'" % (cUName, cFName, cLName, cEmail, cPhone, customerIDD))

               # binding restaurant ID and the page in the URL
               url = "customerList/" 
               localHost = "http://127.0.0.1:8000/"
               bind = localHost + url
               print(bind)
               return JsonResponse({"message": "success", "url":bind})


def restaurantDataPage(request):
     print(request.POST.get('sendRestaurantName'))
     getRestaurantName = request.POST.get('sendRestaurantName')
     restaurantData = restaurantRegister.objects.get(restaurantName=getRestaurantName)
     print(restaurantData)

     url = "restaurantMenuPage/" + str(restaurantData.restaurant_id)
     
     localHost = "http://127.0.0.1:8000/"
     bind = localHost + url
     print(bind)
     return JsonResponse({"message": "success", "url":bind})
     # context = {}
     # return render(request, 'restaurantMenuPage.html', context)

def restaurantMenuPage(request, id):
     restaurantData = restaurantRegister.objects.get(restaurant_id=id)
     # menuData = menu.objects.all().filter(restaurant_id=id, isDelete='0')
     menuData = menu.objects.filter(restaurant_id=id, isDelete='0')
     print(menuData)
     context = {
          'data': restaurantData,
          'menuData': menuData
          }
     return render(request, 'restaurantMenuPage.html', context)

def generateUniqueString():
    while True:
        random_string = '#' + ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        if random_string.count('#') == 1 and sum(1 for char in random_string if char.isdigit()) == 2:
            return random_string


def checkoutPage(request, id):
     if request.method == "POST":
          print("Chekout Page")
          print(id)
          print(request.POST.get('foodItems'))
          items = json.loads(request.POST.get('foodItems'))
          dumps = json.dumps(items)
          print(dumps)
          print(request.POST.get('subTotal'))
          print(request.POST.get('overallTotal'))
          insertOrder = orders()
          getUser = customer.objects.get(isActive="1")
          print(getUser.id)
          insertOrder.customer_id = getUser.id
          insertOrder.restaurant_id = id
          insertOrder.orderNumber = generateUniqueString()
          insertOrder.foodItems = dumps
          insertOrder.orderSubTotal = request.POST.get('subTotal')
          insertOrder.orderTotal = request.POST.get('overallTotal')
          insertOrder.orderStatus = "waiting"
          insertOrder.isActive = "1"
          insertOrder.orderStatus = "placed"
          insertOrder.orderDate = calendar.timegm(presentDate.utctimetuple())
          # unique_string = generateUniqueString()
  
          insertOrder.save()
          # with connection.cursor() as cursor:
          #      cursor.execute("UPDATE order_info SET isActive = '%s' WHERE id = '%s'" % ('1', id))
          getOrderItem = orders.objects.get(foodItems=dumps)
          print("getOrderItem")
          print(getOrderItem)

          url = "restaurantMenuPage/" + str(id) + "/checkoutPage"
          
          localHost = "http://127.0.0.1:8000/"
          bind = localHost + url
          print(bind)
          return JsonResponse({"message": "success", "url":bind})
     
     checkoutData = orders.objects.get(restaurant_id=id, isActive='1')
     # discountData = discounts.objects.extra(where=[(restaurant_id=id , isActive='1')])
     discountData = discounts.objects.filter(restaurant_id=id, isActive='1')
     discount_instance = discountData.first()
     # print(discount_instance.description)
     
     print(checkoutData)
     context = {
          "check": checkoutData,
          "disc": discount_instance
     }
     # print(dumps)
     return render(request, "checkoutPage.html", context)

stripe.api_key = "sk_test_51NcrL0KbCVnnz0TFLKDozQ7VGNgT6weesye9uQbdUTxBMrwLEi3fracZuEFvzswPaT2kft3Xu52zsRhK5smT6DPn00iljdaORK"
 
def checkout_session(request,id):
     calculated_total = float(request.POST.get("calculatedTotal"))
     print(request.POST.get("collectTip"))
     print(request.POST.get("collectOrderType"))
     print(request.POST.get("collectInstruction"))
     orders.objects.filter(order_id=id, isActive='1').update(orderMode=request.POST.get("collectOrderType"), riderTip=request.POST.get("collectTip"), riderInstruction=request.POST.get("collectInstruction"), orderTotal=calculated_total)
     calculated_total_cents = int(calculated_total * 100)
     checkoutData = orders.objects.get(order_id=id)
     print(checkoutData.restaurant_id)
     restaurantName = restaurantRegister.objects.get(restaurant_id=checkoutData.restaurant_id)
     print(restaurantName.restaurantName)
     session = stripe.checkout.Session.create(
          payment_method_types=['card'],
          line_items=[{
          'price_data': {
          'currency': 'GBP',
          'product_data': {
               'name': 'Amount to pay',
          },
          'unit_amount': calculated_total_cents,
          },
          'quantity': 1,
          }],
          mode='payment',
          success_url='http://127.0.0.1:8000//pay_success?session_id={CHECKOUT_SESSION_ID}',
          cancel_url='http://127.0.0.1:8000//pay_cancel',
          client_reference_id=id
     )
     return redirect(session.url, code=303)

def get_lat_lng_from_postcode(postcode):
    api_key = 'AIzaSyAAsh0tj8eTStHlgvOiN0zV-3QRHqwvF4Q'
    base_url = 'https://maps.googleapis.com/maps/api/geocode/json'

    params = {
        'address': postcode,
        'key': api_key,
    }

    response = requests.get(base_url, params=params)
    data = response.json()
    print(data)

    if data['status'] == 'OK':
        location = data['results'][0]['geometry']['location']
        lat = location['lat']
        lng = location['lng']
        return lat, lng
    else:
        return None, None

def pay_success(request):
     checkuu = stripe.Charge.list(limit=3)
     print(checkuu)
     session = stripe.checkout.Session.retrieve(request.GET[('session_id')])
     print(session.client_reference_id)   
     getOrderData = orders.objects.get(order_id=session.client_reference_id)
     print(getOrderData.customer_id)   
     print(getOrderData.orderStatus)   
     getCustomerMail = customer.objects.get(id=getOrderData.customer_id)
     
     if getOrderData.orderStatus == 'placed':
          getRestaurantMail = restaurantRegister.objects.get(restaurant_id=getOrderData.restaurant_id)
          pushNotification(getOrderData.orderStatus, getRestaurantMail.email, getCustomerMail.email)
     elif getOrderData.orderStatus == 'in_kitchen':
          print()
          # getDelivererMail = customer.objects.get(id=getOrderData.deliverer_id)
          pushNotification(getOrderData.orderStatus, '', getCustomerMail.email)
     elif getOrderData.orderStatus == 'en_route':
          pushNotification(getOrderData.orderStatus, '', getCustomerMail.email) 

     # for details in getOrderData:
     getOrderData.restaurantInfo = restaurantRegister.objects.get(restaurant_id=getOrderData.restaurant_id)
     getOrderData.customerInfo = customer.objects.get(id=getOrderData.customer_id)
     getOrderData.customerAddress = customerAddress.objects.get(customer_id=getOrderData.customer_id)
     print(getOrderData)
     context = {
          'orderData': getOrderData,
          # 'getDetails': getRestaurantAndCustomerData
     }
     return render(request, 'success.html', context)

def pay_cancel(request):
     return render(request, 'cancel.html')


def enquiry(request):
     print(request.POST.get("toAddress"))
     mailToAddress = request.POST.get("toAddress")
     mailSubject = request.POST.get("subject")
     mailBody = request.POST.get("body")
     print(request.POST.get("subject"))
     print(request.POST.get("body"))
     enquries(mailToAddress, mailSubject, mailBody)
     response_data = {'message': 'Email sent successfully'}
     return JsonResponse(response_data)
# Usage

def saveAddress(request):

     streetAddress = request.POST.get("customerStreetAddress")
     city = request.POST.get("customerCity")
     postCode = request.POST.get("customerPostCode")
     phoneNumber = request.POST.get("customerPhoneNumber")
     customerId = request.POST.get("customerIdToUpdate")

     isExists = customerAddress.objects.filter(customer_id=customerId).exists()
     if isExists:
          customerAddress.objects.filter(customer_id=customerId).update(street=streetAddress, city=city, postcode=postCode, phoneNumber=phoneNumber)
          print("IF DONE")
     else:
          insertAddressData = customerAddress()
          insertAddressData.customer_id = customerId
          insertAddressData.street = streetAddress
          insertAddressData.city = city
          insertAddressData.postcode = postCode
          insertAddressData.phoneNumber = phoneNumber
          insertAddressData.createdDate = calendar.timegm(presentDate.utctimetuple())
          insertAddressData.save()
          print("IF ELSE DONE")

     response_data = {'message': 'added successfully'}
     return JsonResponse(response_data)


# AIzaSyAAsh0tj8eTStHlgvOiN0zV-3QRHqwvF4Q

def delivererRestaurantAcceptOrDelete(request, id):
     if request.POST.get('restaurantOrDeliverer') == 'deliverer':
          print("iiiiiiiiiiiiiiiiiiiiiiifffffffffffffffffffffffffffff")
          print(request.POST.get('approveOrReject'))
          if request.POST.get('approveOrReject') == 'reject':
               print(id)
               deliverer.objects.filter(deliverer_id=id).update(isDelete='1')
               getDelivererData = deliverer.objects.get(deliverer_id=id)
               sendApproveOrRejectedMail('deliverer', 'reject', getDelivererData.email)
          else:
               deliverer.objects.filter(deliverer_id=id).update(isApproved='1')
               getDelivererData = deliverer.objects.get(deliverer_id=id)
               sendApproveOrRejectedMail('deliverer', 'approved', getDelivererData.email)
          url = "approvalList/"
          localHost = "http://127.0.0.1:8000/"
          bind = localHost + url
          return JsonResponse({"message": "success", "url":bind})
     else:
          print("EEEEEEEEEEELLLLLLLLLLLLLSSSSSSSSSSSSSSEEEEEEEEE")
          print(request.POST.get("approveOrReject"))
          if request.POST.get('approveOrReject') == 'reject':
               print(id)
               restaurantRegister.objects.filter(restaurant_id=id).update(isDelete='1')
               getRestaurantData = restaurantRegister.objects.get(restaurant_id=id)
               sendApproveOrRejectedMail('restaurant', 'reject', getRestaurantData.email)
          else:
               print("insideelse")
               print(id)
               restaurantRegister.objects.filter(restaurant_id=id).update(isApproved='1')
               getRestaurantData = restaurantRegister.objects.get(restaurant_id=id)
               sendApproveOrRejectedMail('restaurant', 'approved', getRestaurantData.email)
          url = "approvalList/"
          localHost = "http://127.0.0.1:8000/"
          bind = localHost + url
          return JsonResponse({"message": "success", "url":bind})

def delivererUpdateOrDelete(request, id):
     print("hello")
     if request.POST.get("updateOrDelete") == 'update':
          print(id)
          delivererName = request.POST.get("sendDelivererName")
          delivererEmail = request.POST.get("sendDelivererEmail")
          delivererNumber = request.POST.get("sendDelivererNumber")
          delivererWorkLocation = request.POST.get("sendDelivererWorkLocation")
          delivererLocation = request.POST.get("sendRDelivererLocation")
          delivererVehicleType = request.POST.get("sendDelivererVehicleType")
          deliverer.objects.filter(deliverer_id=id).update(firstname = delivererName, email=delivererEmail, phoneNumber=delivererNumber, location=delivererWorkLocation, postCode=delivererLocation, vehicleType=delivererVehicleType)
     else:
          print(id)
          deliverer.objects.filter(deliverer_id=id).update(isDelete='1')
     url = "delivererList/"
     localHost = "http://127.0.0.1:8000/"
     bind = localHost + url
     return JsonResponse({"message": "success", "url":bind})

def restaurantOrderList(request, id):
#      orderList = orders.objects.filter(restaurant_id=id).exclude(
#     Q(isActive=False) | Q(orderStatus="en_route") | Q(orderStatus="delivered")
# )
     orderList = orders.objects.filter(restaurant_id=id).exclude(Q(isActive=False))
     print("resturantList")
     print(orderList)
     print(orderList)
     if orderList:
          for order in orderList:
               customerName = customer.objects.get(id=order.customer_id).firstname
               order.customerName = customerName
     context = {
          'data': orderList,
          'validation': 'orders',
          'pick':id
     }
     return render(request, 'restaurantLanding.html', context)

def changeOrderStatus(request, id):
     print(request.POST.get("url"))
     orderNumber = request.POST.get("orderNumber")
     changeStatus = request.POST.get("change")
     orders.objects.filter(orderNumber=orderNumber).update(orderStatus=changeStatus)
     return JsonResponse({"message": "success", "url":request.POST.get("url")})

def delivererProfile(request, id):
     delivererData = deliverer.objects.get(deliverer_id = id)
     context = {
          "data" : delivererData,
          'validation': 'profile',
          'id': id
     }
     return render(request, 'delivererLanding.html', context)

def customerProfile(request, id):

     customerrData = customer.objects.get(id = id)
     address = customerAddress.objects.get(customer_id = id)
     context = {
          "data" : customerrData,
          'validation': 'profile',
          'customerId': id,
          'customerAddress': address
     }
     return render(request, 'customerLanding.html', context)

def acceptOrder(request, order_id):
     orders.objects.filter(order_id=order_id).update(deliverer_id=request.POST.get("delivererid"))
     return JsonResponse({"message": "success", "url":request.POST.get("url")})

def delivererOrderStatus(request, id):
     print(request.POST.get("url"))
     orderNumber = request.POST.get("orderNumber")
     changeStatus = request.POST.get("change")
     orders.objects.filter(orderNumber=orderNumber).update(orderStatus=changeStatus)
     return JsonResponse({"message": "success", "url":request.POST.get("url")})

def restaurantDiscount(request, id):
     print("d")
     discountDetails = discounts.objects.filter(restaurant_id = id, isActive = '1')
     context = {}
     if discountDetails:
          context = {
               'data': discountDetails,
               'validation': 'discount',
               'pick':id
          }
     else:
          context = {
               'data': '',
               'validation': 'discount',
               'pick':id
          }

     return render(request, 'restaurantLanding.html', context)

def insertDiscount(request, id):
     if request.method == "POST":
          # Get user entered values and stored in a variable
          offPrice = request.POST.get('sendOffPrice')
          discontType = request.POST.get('sendDiscountType')
          operation = request.POST.get('sendOperation')
          spend = request.POST.get('sendSpendAmount')
          id = request.POST.get('sendid')
          description = request.POST.get('sendDescription')
          couponCode = request.POST.get('sendCouponCode')
          insertDiscount = discounts()
          print(request.POST.get('sendOffPrice'))
          print(request.POST.get('sendDiscountType'))
          print(request.POST.get('sendOperation'))
          # Insert menu data to database
          insertDiscount.offPrice = offPrice
          insertDiscount.restaurant_id = id
          insertDiscount.discountType = discontType
          insertDiscount.operation = operation
          insertDiscount.description = description
          insertDiscount.spendAmount = spend
          insertDiscount.couponCode = couponCode
          insertDiscount.isActive = '1'
          insertDiscount.createdDate = calendar.timegm(presentDate.utctimetuple())

          insertDiscount.save()

          # binding restaurant ID and the page in the URL
          url = "restaurantDiscount/" + str(id)
          print(url)
          # Sending response to ajax.......
          return HttpResponse(url)

def discountUpdateOrDelete(request, id):
     print("hello")
     restaurantId = discounts.objects.get(discount_id=id).restaurant_id
     if request.POST.get("updateOrDelete") == 'update':
          print(id)
          discountDescription = request.POST.get("sendDescription")
          discountOffPrice = request.POST.get("sendOffPrice")
          discountType = request.POST.get("sendDiscountType")
          discountOperation = request.POST.get("sendOperation")
          discountSpend = request.POST.get("sendSpend")
          discountCouponCode = request.POST.get("sendCouponCode")
          print(discountDescription)
          discounts.objects.filter(discount_id=id).update(description = discountDescription, offPrice=discountOffPrice, discountType=discountType, operation=discountOperation, spendAmount=discountSpend, couponCode=discountCouponCode)
     else:
          print(id)
          print('YAAY')
          discounts.objects.filter(discount_id=id).update(isActive='0')
     url = "restaurantDiscount/" + str(restaurantId)
     localHost = "http://127.0.0.1:8000/"
     bind = localHost + url
     return JsonResponse({"message": "success", "url":bind})

def ratings(request):
     response_data = {'message': 'Updated'}

     insertDiscountData = ratingsInfo()
     insertDiscountData.customer_id = request.POST.get("customerId")
     insertDiscountData.restaurant_id = request.POST.get("restaurantId")
     insertDiscountData.feedback = request.POST.get("feedback")
     insertDiscountData.rating = request.POST.get("rating")
     insertDiscountData.createdBy = calendar.timegm(presentDate.utctimetuple())
     insertDiscountData.save()

     return JsonResponse(response_data)

def customerLogout(request, id):
     print("CUSTOMER LOGOUT")
     customer.objects.filter(id=id).update(isActive='0')
     return redirect('home')

def updateProfile(request):
     print("IF DONE")
     # if request.POST.get("customerStreetAddress") == 'deliverer':

     #      streetAddress = request.POST.get("customerStreetAddress"),city = request.POST.get("customerCity"),postCode = request.POST.get("customerPostCode"),phoneNumber = request.POST.get("customerPhoneNumber"),
     #      customerId = request.POST.get("customerIdToUpdate"),

     # isExists = customerAddress.objects.filter(customer_id=customerId).exists()
     # if isExists:
     #      customerAddress.objects.filter(customer_id=customerId).update(street=streetAddress, city=city, postcode=postCode, phoneNumber=phoneNumber)
     #      print("IF DONE")
     # else:
     #      insertAddressData = customerAddress()
     #      insertAddressData.customer_id = customerId
     #      insertAddressData.street = streetAddress
     #      insertAddressData.city = city
     #      insertAddressData.postcode = postCode
     #      insertAddressData.phoneNumber = phoneNumber
     #      insertAddressData.createdDate = calendar.timegm(presentDate.utctimetuple())
     #      insertAddressData.save()
     #      print("IF ELSE DONE")

     # response_data = {'message': 'added successfully'}
     # return JsonResponse(response_data)