from django.core.mail import send_mail
from django.conf import settings
from time import strftime

def sendForgetPassword(email, token, id):    
    subject = 'Password Reset Request for YummiLicious'
    # f is a string
    # message = f'Hello, Please click the following link to reset your password http://127.0.0.1:8000/passwordResetConfirm/{token}/{id}'
    message = f'Hello,<br><br>Your YummiLicious password can be reset by clicking the button below.<br>'
    message += f'<br><button style = "background-color: #037c21;"><a href="http://127.0.0.1:8000/passwordResetConfirm/{token}/{id}" style = "text-decoration:none; color: white;">Reset Password</a></button>'
    emailFrom = settings.EMAIL_HOST_USER
    print(emailFrom)
    print(email)
    print(token)
    print(id)
    recipient =  [email]
    send_mail(subject, '', emailFrom, recipient, html_message=message)
    return True

def sendAdminKey(key):
    time = strftime("%Y-%m-%d %H:%M:%S")
    print('Admin key')
    subject = "New Key Generated - Important Information Enclosed"
    message = (f"The new key has been successfully generated for YummiLicious Admin. This key is vital for maintaining the security and integrity of our system.\n\nKey: {key} \nGenerated On: {time} \n\nKindly keep this key confidential and secure to ensure the safety of the associated assets or data.")
    emailFrom = settings.EMAIL_HOST_USER
    recipient = ["praveenrajamani58@gmail.com"]
    send_mail(subject, message, emailFrom, recipient)
    return True

def enquries(fromMail, subjectContent, body):
    print(fromMail)
    print(subjectContent)
    print(body)
    subject = subjectContent
    message = (f"Customer Mail ID : {fromMail}\n\n{body}")
    emailFrom = settings.EMAIL_HOST_USER
    recipient = ['praveenrajamani58@gmail.com']
    send_mail(subject, message, emailFrom, recipient)
    return True

def pushNotification(getStatus, getRestaurantToAddress, getCustomerToAddress):
    time = strftime("%Y-%m-%d %H:%M:%S")
    print('PUSH NOTIFICATION')
    print(getStatus)
    print(getRestaurantToAddress)
    print(getCustomerToAddress)
    if getStatus == 'placed':
        emailFrom = settings.EMAIL_HOST_USER
        restaurantMailAddress = [getRestaurantToAddress]
        restaurantMailSubject = (f"New Order Alert.! - {time}")
        restaurantMailBody = "Hello Restaurant,\n\nWe're thrilled to inform you that a new order is on its way, and please get ready to create something extraordinary for our valued customer. Once the order is ready, kindly hand it over to our delivery team or inform the customer for pickup.\n\nRegards\nYummiLicious team"
        send_mail(restaurantMailSubject, restaurantMailBody, emailFrom, restaurantMailAddress)
        customerMailSubject = 'Confirmation - Your Food Order Has Been Placed'
        customerMailBody = 'Hello, \n\nWe are delighted to inform you that your recent food order has been successfully placed and you can track the status of your order in real-time using our website.\n\nRegards\nYummiLicious team'
        customerMailAddress = [getCustomerToAddress]
        send_mail(customerMailSubject, customerMailBody, emailFrom, customerMailAddress)
        return True
    elif getStatus == 'in_kitchen':
        emailFrom = settings.EMAIL_HOST_USER
        delivererMailAddress = [getCustomerToAddress]
        delivererMailSubject = "Order Status Update - In Kitchen"
        delivererMailBody = "Hello, \n\nWe're excited to let you know that your order is currently in the kitchen, where our expert culinary team is passionately crafting your meal with the utmost care and precision and your satisfaction remains our highest priority.\n\nRegards\nYummiLicious team"
        send_mail(delivererMailSubject, delivererMailBody, emailFrom, delivererMailAddress)
    elif getStatus == 'en_route':
        emailFrom = settings.EMAIL_HOST_USER
        subject = 'Order Status Update - Enroute'
        message = 'Hello, \n\nExciting news! Your order is now enroute to your location, and our dedicated delivery team is working diligently to ensure it reaches you as quickly and safely as possible. We understand how eager you must be to enjoy your meal, and we appreciate your patience.\n\nRegards\nYummiLicious team'
        recipient = [getCustomerToAddress]
        print('in enroute status')
        send_mail(subject, message, emailFrom, recipient)

def sendApproveOrRejectedMail(delivererOrRestaurant, approveOrReject, toAddress):
    emailFrom = settings.EMAIL_HOST_USER
    if delivererOrRestaurant == 'deliverer':
        if approveOrReject == 'approved':
            print("rider")
            subject = 'Approval Mail'
            message = (f"Hello Rider,\n\nWelcome! Thank you for partening with YummiLicious.\nJoin the well connected network of professional riders who deliver food to the customer, fresh and on time.\n\nRegards\nYummiLicious team")
            recipient = [toAddress]
            send_mail(subject, message, emailFrom, recipient)
        else:
            print("")
            subject = 'Rejected Mail'
            message = (f"Hello Rider,\n\nUnfortunately! You are not going to be partening with YummiLicious.\n\nRegards\nYummiLicious team")
            recipient = [toAddress]
            send_mail(subject, message, emailFrom, recipient)
    else:
        if approveOrReject == 'approved':
            print("restaurant APPRROOVVAALL")
            subject = 'Approval Mail'
            message = (f"Hello Restaurant,\n\nWelcome! Thank you for partening with YummiLicious.\nStart expanding your restaurant's reach and serve more clients than even before.\n\nRegards\nYummiLicious team")
            recipient = [toAddress]
            send_mail(subject, message, emailFrom, recipient)
        else:
            subject = 'Rejected Mail'
            message = (f"Hello Restaurant,\n\nUnfortunately! You are not going to be partening with YummiLicious.\n\nRegards\nYummiLicious team")
            recipient = [toAddress]
            send_mail(subject, message, emailFrom, recipient)