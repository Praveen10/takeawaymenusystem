$(document).ready(function() {
    // Add an "active" class to the clicked sidebar item
    $('.column1 a').on('click', function() {
      $('.column1 a').removeClass('active');
      $(this).addClass('active');
    });
  });

var table = $('#example').DataTable({
    buttons: [
        {
            extend: 'excel',
            text: '<i class="fas fa-file-excel"></i>',
            className: 'btn btn-secondary',
            titleAttr: 'Excel',
            // column to export
            exportOptions: {
                columns: [0, 1, 2, 3, 4]
            }, 
        },
        {
            extend: 'pdf',
            text: '<i class="fas fa-file-pdf"></i>',
            className: 'btn btn-secondary',
            titleAttr: 'PDF',
            // column to export
            exportOptions: {
                columns: [0, 1, 2, 3, 4]
            }, 
        },
        {
            extend: 'print',
            text: '<i class="fas fa-print"></i>',
            className: 'btn btn-secondary',
            titleAttr: 'Print',
            // column to export
            exportOptions: {
                columns: [0, 1, 2, 3, 4]
            }, 
        },
    ],
    
});

table.buttons().container().appendTo('#example_wrapper .col-md-6:eq(0)');

var table1 = $('#example1').DataTable({
    buttons: [
        {
            extend: 'excel',
            text: '<i class="fas fa-file-excel"></i>',
            className: 'btn btn-secondary',
            titleAttr: 'Excel',
            // column to export
            exportOptions: {
                columns: [0, 1, 2, 3, 4]
            }, 
        },
        {
            extend: 'pdf',
            text: '<i class="fas fa-file-pdf"></i>',
            className: 'btn btn-secondary',
            titleAttr: 'PDF',
            // column to export
            exportOptions: {
                columns: [0, 1, 2, 3, 4]
            }, 
        },
        {
            extend: 'print',
            text: '<i class="fas fa-print"></i>',
            className: 'btn btn-secondary',
            titleAttr: 'Print',
            // column to export
            exportOptions: {
                columns: [0, 1, 2, 3, 4]
            }, 
        },
    ],
    
});

table1.buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');


$('#createCustomer').on('click', function(){
    var status = true;
    console.log("outside status")
    console.log(status)
    //validation part
    const custform = document.getElementById('customerform');
    const firstName = document.getElementById('customerFirstName');
    const lastName = document.getElementById('customerLastName');
    const userName = document.getElementById('customerUserName');
    const custEmail = document.getElementById('customerEmail');
    const custPassword = document.getElementById('customerPassword');
    const custCnfrmPassword = document.getElementById('customerConfirmPassword');
    const custPhoneNumber = document.getElementById('customerPhoneNumber');
    console.log(userName)
    const toValidEmail = custEmail => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(custEmail).toLowerCase());
    }

    custform.addEventListener('submit', e => {
        validateCustomerInputs(e);
        preventDefault();
    });
    // below code is to validate if user did not enter the input. It sends the error message in UI 
    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const displayError = inputControl.querySelector('.error');
        displayError.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success')
    }
            
    const setSuccess = element => {
        const inputControl = element.parentElement;
        const displayError = inputControl.querySelector('.error');
        displayError.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    };

    // It trims the empty in the given fields
    const validateCustomerInputs = (e) => {
        const validateFirstName = firstName.value.trim();
        const validateLastName = lastName.value.trim();
        const validateUserName = userName.value.trim();
        const validateCustomerEmail = custEmail.value.trim();
        const validateCustomerPassword = custPassword.value.trim();
        const validateCustomerCnfrmPassword = custCnfrmPassword.value.trim();
        const validateCustomerPhoneNumber = custPhoneNumber.value.trim();
        // let validateIImage = iImage.value.trim();
        var isFormValid = true;
        console.log(status)
        // Name validation (If the first name and the last name is empty it stops to fill the space)
        if(validateFirstName === '') 
        {
            setError(firstName, 'First Name is required');
            isFormValid = false;
        } 
        else
        {
            setSuccess(firstName);
        }
        if(validateLastName === '') 
        {
            setError(lastName, 'Last Name is required');
            isFormValid = false;
        } 
        else
        {
            setSuccess(lastName);
        }
        if(validateUserName === '') 
        {
            setError(userName, 'User Name is required');
            isFormValid = false;
        } 
        else
        {
            setSuccess(userName);
        }
        if(validateCustomerEmail === '') 
        {
            setError(custEmail, 'Email is required');
            isFormValid = false;
        } 
        else if (!toValidEmail(validateCustomerEmail)) 
        {
            setError(custEmail, 'Provide a valid email address');
            isFormValid = false;
        } 
        else 
        {
            setSuccess(custEmail);
        }
        if(validateCustomerPassword === '') 
        {
            setError(custPassword, 'Password is required');
            status = false;
        } 
        else if (validateCustomerPassword.length < 8 ) 
        {
            setError(custPassword, 'Password must be at least 8 character.');
            status = false;
        } 
        else if (!/[^a-zA-Z0-9]/.test(validateCustomerPassword)) 
        {
            setError(custPassword, 'Password requires at least one special character');
        }
        else if (!/[0-9]/.test(validateCustomerPassword)) 
        {
            setError(custPassword, 'Password requires at least one digit');
            isFormValid = false;
        }
        else if (!/[A-Z]/.test(validateCustomerPassword)) 
        {
            setError(custPassword, 'Password requires at least one uppercase letter');
            isFormValid = false;

        }
        else if (!/[a-z]/.test(validateCustomerPassword)) 
        {
            setError(custPassword, 'Password requires at least one lowecase letter');
            isFormValid = false;
        }
        else 
        {
            setSuccess(custPassword);
        }
        if(validateCustomerCnfrmPassword === '') 
        {
            setError(custCnfrmPassword, 'Confirm password is required');
            isFormValid = false;
        } 
        else if (validateCustomerCnfrmPassword != validateCustomerPassword) 
        {
            setError(custCnfrmPassword, 'Password mismatch');
            isFormValid = false;

        } 
        else 
        {
            setSuccess(custCnfrmPassword);
        }
        if(validateCustomerPhoneNumber === '') 
        {
            setError(custPhoneNumber, 'Phone Number is required');
            isFormValid = false;
            status = false;
        } 
        else 
        {
            setSuccess(custPhoneNumber);
        }

        // If any data is in empty or wrong it will prevent the screen without leaving to other action
        if (isFormValid) {
            console.log("inside status")
            $getCustFirstName = $('#customerFirstName').val();
            $getCustLastName = $('#customerLastName').val();
            $getCustUserName = $('#customerUserName').val();
            $getCustEmail = $('#customerEmail').val();
            $getCustPassword = $('#customerPassword').val();
            $getCustCnfrmPassword = $('#customerConfirmPassword').val();
            $getCustPhone = $('#customerPhoneNumber').val();

            $.ajax({
                type: "POST",
                url: "adminRestaurantOrCustomerAddition/",
                // async: false,
                cache: false,
                data: {
                    split: 'customer',
                    getFName: $getCustFirstName,
                    getLName: $getCustLastName,
                    getUName: $getCustUserName,
                    getCEmail: $getCustEmail,
                    getCPass: $getCustPassword,
                    getCConfrmPass: $getCustCnfrmPassword,
                    getCPhone: $getCustPhone,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success:function(result){
                    let localHostUrl = "http://127.0.0.1:8000/";
                    window.location.href = localHostUrl + result;
                }
            });
        }
        else {
            e.preventDefault();
        }
    };
});


$('#createRestaurant').on('click', function(){
    //validation part
    
    const restform = document.getElementById('restform');
    const restFirstName = document.getElementById('restaurantFirstName');
    const restLastName = document.getElementById('restaurantLastName');
    const restEmail = document.getElementById('restaurantEmail');
    const restPassword = document.getElementById('restaurantPassword');
    const restCnfrmPassword = document.getElementById('restaurantConfirmPassword');
    const restName = document.getElementById('restaurantName');
    const restPhoneNumber = document.getElementById('restaurantPhoneNumber');
    const restAddress = document.getElementById('restaurantAddress');
    const restCity = document.getElementById('restaurantCity');
    const restPostCode = document.getElementById('restaurantPostCode');
    const restCusineType = document.getElementById('cusineType');
    const restHygineRating = document.getElementById('hygineRating');
    console.log(restFirstName)

    const toValidEmail = restEmail => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(restEmail).toLowerCase());
    }

    restform.addEventListener('submit', e => {
        validateInputs(e);
        preventDefault();
    });
    // below code is to validate if user did not enter the input. It sends the error message in UI 
    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const displayError = inputControl.querySelector('.error');
        displayError.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success')
    }
            
    const setSuccess = element => {
        const inputControl = element.parentElement;
        const displayError = inputControl.querySelector('.error');
        displayError.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    };

    // It trims the empty in the given fields
    const validateInputs = (e) => {
        const validateRestFirstName = restFirstName.value.trim();
        const validateRestLastName = restLastName.value.trim();
        const validateRestEmail = restEmail.value.trim();
        const validateRestPassword = restPassword.value.trim();
        const validateRestCnfrmPassword = restCnfrmPassword.value.trim();
        const validateRestName = restName.value.trim();
        const validateRestPhoneNumber = restPhoneNumber.value.trim();
        const validateRestAddress = restAddress.value.trim();
        const validateRestCity = restCity.value.trim();
        const validateRestPostCode = restPostCode.value.trim();
        const validateRestCusineType = restCusineType.value.trim();
        const validateRestHygineRating = restHygineRating.value.trim();
        // let validateIImage = iImage.value.trim();
        var isFormValid = true;
    
        // Name validation (If the first name and the last name is empty it stops to fill the space)
        if(validateRestFirstName === '') 
        {
            setError(restFirstName, 'First Name is required');
            isFormValid = false;
        } 
        else
        {
            setSuccess(restFirstName);
        }
        if(validateRestLastName === '') 
        {
            setError(restLastName, 'Last Name is required');
            isFormValid = false;
        } 
        else
        {
            setSuccess(restLastName);
        }
        if(validateRestName === '') 
        {
            setError(restName, 'Name is required');
            isFormValid = false;
        } 
        else
        {
            setSuccess(restName);
        }
        if(validateRestEmail === '') 
        {
            setError(restEmail, 'Email is required');
            isFormValid = false;
        } 
        else if (!toValidEmail(validateRestEmail)) 
        {
            setError(restEmail, 'Provide a valid email address');
            isFormValid = false;
        } 
        else 
        {
            setSuccess(restEmail);
        }
        if(validateRestPassword === '') 
        {
            setError(restPassword, 'Password is required');
            isFormValid = false;
        } 
        else if (validateRestPassword.length < 8 ) 
        {
            setError(restPassword, 'Password must be at least 8 character.');
            isFormValid = false;
        } 
        else if (!/[^a-zA-Z0-9]/.test(validateRestPassword)) 
        {
            setError(restPassword, 'Password requires at least one special character');
            isFormValid = false;
        }
        else if (!/[0-9]/.test(validateRestPassword)) 
        {
            setError(restPassword, 'Password requires at least one digit');
            isFormValid = false;
        }
        else if (!/[A-Z]/.test(validateRestPassword)) 
        {
            setError(restPassword, 'Password requires at least one uppercase letter');
            isFormValid = false;
        }
        else if (!/[a-z]/.test(validateRestPassword)) 
        {
            setError(restPassword, 'Password requires at least one lowecase letter');
            isFormValid = false;
        }
        else 
        {
            setSuccess(restPassword);
        }
        if(validateRestCnfrmPassword === '') 
        {
            setError(restCnfrmPassword, 'Confirm password is required');
            isFormValid = false;
        } 
        else if (validateRestCnfrmPassword != validateRestPassword) 
        {
            setError(restCnfrmPassword, 'Password mismatch');
            isFormValid = false;
        } 
        else 
        {
            setSuccess(restCnfrmPassword);
        }
        if(validateRestPhoneNumber === '') 
        {
            setError(restPhoneNumber, 'Phone Number is required');
            isFormValid = false;
        } 
        else 
        {
            setSuccess(restPhoneNumber);
        }
        if(validateRestAddress === '') 
        {
            setError(restAddress, 'Address is required');
            isFormValid = false;
        } 
        else 
        {
            setSuccess(restAddress);
        }
        if(validateRestCity === '') 
        {
            setError(restCity, 'City is required');
            isFormValid = false;
        } 
        else 
        {
            setSuccess(restCity);
        }
        if(validateRestPostCode === '') 
        {
            setError(restPostCode, 'Post Code is required');
            isFormValid = false;
        } 
        else 
        {
            setSuccess(restPostCode);
        }
        if(validateRestCusineType === '') 
        {
            setError(restCusineType, 'Cusine type is required');
            isFormValid = false;
        } 
        else 
        {
            setSuccess(restCusineType);
        }
        if(validateRestHygineRating === '') 
        {
            setError(restHygineRating, 'Select hygine rating');
            isFormValid = false;
        } 
        else 
        {
            setSuccess(restHygineRating);
        }

        // If any data is in empty or wrong it will prevent the screen without leaving to other action
        if (isFormValid) {
            $getRestFirstName = $('#restaurantFirstName').val();
            $getRestLastName = $('#restaurantLastName').val();
            $getRestEmail = $('#restaurantEmail').val();
            $getRestPassword = $('#restaurantPassword').val();
            $getRestCnfrmPassword = $('#restaurantConfirmPassword').val();
            $getRestName = $('#restaurantName').val();
            $getRestPhone = $('#restaurantPhoneNumber').val();
            $getRestAddress = $('#restaurantAddress').val();
            $getRestCity = $('#restaurantCity').val();
            $getRestPostCode = $('#restaurantPostCode').val();
            $getRestCusine = $('#cusineType').val();
            $getRestHygine = $('#hygineRating').val();

            $.ajax({
                type: "POST",
                url: "adminRestaurantOrCustomerAddition/",
                async: false,
                cache: false,
                data: {
                    split: 'restaurant',
                    getRFName: $getRestFirstName,
                    getRLName: $getRestLastName,
                    getREmail: $getRestEmail,
                    getRPassword: $getRestPassword,
                    getRCnfrmPass: $getRestCnfrmPassword,
                    getRName: $getRestName,
                    getRPhone: $getRestPhone,
                    getRAddress: $getRestAddress,
                    getRCity: $getRestCity,
                    getRPostCode: $getRestPostCode,
                    getRCusine: $getRestCusine,
                    getRHygine: $getRestHygine,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success:function(result){
                    let localHostUrl = "http://127.0.0.1:8000/";
                    window.location.href = localHostUrl + result;
                }
            });
            
        }
        else {
            e.preventDefault();
        }
    };
});

// DELETION FOR RESTAURANT
$('[id^=deleteRestaurant]').on('click', function(e){
    var $this = $(this);
    e.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: $this.attr("href"),
                type: "POST",
                async: false,
                cache: false,
                data: {split: 'restaurant',csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()},
                dataType: "json",
                success: function(resp){
                    if(resp.message === "success"){
                        Swal.fire(
                        'Deleted!',
                        'Your item has been deleted.',
                        'success'
                    ).then(() => {
                        window.location.href = resp.url;
                    })
                }}
            });
        }
    })
});

// DELETION FOR CUSTOMER

$(document).on('click', '[id^=deleteCustomerData]', function(e) {
    var $this = $(this);
    e.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: $this.attr("href"),
                type: "POST",
                async: false,
                cache: false,
                data: {split: 'customer',csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()},
                dataType: "json",
                success: function(resp){
                    if(resp.message === "success"){
                        Swal.fire(
                        'Deleted!',
                        'Your item has been deleted.',
                        'success'
                    ).then(() => {
                        window.location.href = resp.url;
                    })
                }}
            });
        }
    })
});


// DELETE DELIVERER
$('[id^=deleteDeliverData]').on('click', function(e){
    var $this = $(this);
    e.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: $this.attr("href"),
                type: "POST",
                async: false,
                cache: false,
                data: {split: 'restaurant',csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()},
                dataType: "json",
                success: function(resp){
                    if(resp.message === "success"){
                        Swal.fire(
                        'Deleted!',
                        'Your item has been deleted.',
                        'success'
                    ).then(() => {
                        window.location.href = resp.url;
                    })
                }}
            });
        }
    })
});


// REJECT DELIVERER
$('[id^=deleteDelivererData]').on('click', function(e){
    var $this = $(this);
    e.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: "Action cannot be undone",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reject it!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: $this.attr("href"),
                type: "POST",
                async: false,
                cache: false,
                data: {restaurantOrDeliverer: 'deliverer', approveOrReject: 'reject',csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()},
                dataType: "json",
                success: function(resp){
                    if(resp.message === "success"){
                        Swal.fire(
                        'Rejected!',
                        'The rider has been rejected.',
                        'success'
                    ).then(() => {
                        window.location.href = resp.url;
                    })
                }}
            });
        }
    })
});

// REJECT RESTAURANT
$('[id^=rejectRestaurantData]').on('click', function(e){
    var $this = $(this);
    e.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: "Action cannot be undone",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reject it!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: $this.attr("href"),
                type: "POST",
                async: false,
                cache: false,
                data: {restaurantOrDeliverer: 'restaurant', approveOrReject: 'reject',csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()},
                dataType: "json",
                success: function(resp){
                    if(resp.message === "success"){
                        Swal.fire(
                        'Rejected!',
                        'The restaurant has been rejected.',
                        'success'
                    ).then(() => {
                        window.location.href = resp.url;
                    })
                }}
            });
        }
    })
});


// APPROVE DELIVERER
$('[id^=acceptRider]').on('click', function(e){
    var $this = $(this);
    e.preventDefault();
    Swal.fire(
        'Approved!',
        'Rider is now approved!',
        'success'
      ).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: $this.attr("href"),
                type: "POST",
                async: false,
                cache: false,
                data: {restaurantOrDeliverer: 'deliverer', approveOrReject: 'approve',csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()},
                dataType: "json",
                success: function(resp){
                    if(resp.message === "success"){
                        window.location.href = resp.url;
                    }}
            });
        }
    })
});

// APPROVE RESTAURANT
$('[id^=acceptRestaurant]').on('click', function(e){
    var $this = $(this);
    e.preventDefault();
    Swal.fire(
        'Approved!',
        'Restaurant is now approved!',
        'success'
      ).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: $this.attr("href"),
                type: "POST",
                async: false,
                cache: false,
                data: {restaurantOrDeliverer: 'restaurant', approveOrReject: 'approve',csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()},
                dataType: "json",
                success: function(resp){
                    if(resp.message === "success"){
                        window.location.href = resp.url;
                    }}
            });
        }
    })
});



// CUSTOMER EDIT
let editCustomerItemData;
$("#example tbody").on("click", ".editCustomer", function(e){

    e.preventDefault();
    var $this = $(this);
    console.log($this)
    console.log("fvweagiujujujujujujujujujujujujujujujujujujujujujujujujujujujujujujujuj")
    let toGeCustomerID = $this.data('customerid')
    editCustomerItemData = toGeCustomerID;

    let toGetCustomerUserName = $this.parents(".record").find('td').eq(1).text();
    let toGetCustomerFirstName = $this.parents(".record").find('td').eq(2).text();
    let toGetCustomerLastName = $this.parents(".record").find('td').eq(3).text();
    let toGetCustomerEmail = $this.parents(".record").find('td').eq(4).text();
    let toGetCustomerPhone = $this.parents(".record").find('td').eq(5).text();

    $("#editCustomerForm").modal("show");
    $('#editCustomerUserName').val(toGetCustomerUserName);
    $('#editCustomerFirstName').val(toGetCustomerFirstName);
    $('#editCustomerLastName').val(toGetCustomerLastName);
    $('#editCustomerEmail').val(toGetCustomerEmail);
    $('#editCustomerPhoneNumber').val(toGetCustomerPhone);
    
});


$('#editCustomerData').on('click', function(){ 

    $toGetCustomerUserName = $('#editCustomerUserName').val();
    $toGetCustomerFirstName = $('#editCustomerFirstName').val();
    $toGetCustomerLastName = $('#editCustomerLastName').val();
    $toGetCustomerEmail = $('#editCustomerEmail').val();
    $toGetCustomerPhone = $('#editCustomerPhoneNumber').val();

    $.ajax({
        type: "POST",
        url: "adminEditCustomerOrRestaurant",
        async: false,
        cache: false,
        data: {
            sendUserName: $toGetCustomerUserName,
            sendFirstName: $toGetCustomerFirstName,
            sendLastName: $toGetCustomerLastName,
            sendEmail: $toGetCustomerEmail,
            sendPhone: $toGetCustomerPhone,
            sendID: editCustomerItemData,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success: function(resp){
            if(resp.message === "success"){
                window.location.href = resp.url;
            }
        }
    });
});

// RESTAURANT EDIT
let editRestaurantItemData;
$("#example tbody").on("click", ".editRestaurant", function(e){

    e.preventDefault();
    var $this = $(this);
    console.log($this)
    let toGetRestaurantID = $this.data('restaurantid')
    editRestaurantItemData = toGetRestaurantID;

    let toGetRestaurantName = $this.parents(".record").find('td').eq(1).text();
    let toGetRestaurantCusine = $this.parents(".record").find('td').eq(2).text();
    let toGetRestaurantAddress = $this.parents(".record").find('td').eq(3).text();
    let toGetRestaurantPhoneNumber = $this.parents(".record").find('td').eq(4).text();
    let toGetRestaurantCity = $this.parents(".record").find('td').eq(5).text();
    let toGetRestaurantPostCode = $this.parents(".record").find('td').eq(6).text();
    let toGetRestaurantHygineRating = $this.parents(".record").find('td').eq(7).text();

    $("#editRestaurantForm").modal("show");
    $('#editRestaurantName').val(toGetRestaurantName);
    $('#editCusineType').val(toGetRestaurantCusine);
    $('#editRestaurantAddress').val(toGetRestaurantAddress);
    $('#editRestaurantPhoneNumber').val(toGetRestaurantPhoneNumber);
    $('#editRestaurantCity').val(toGetRestaurantCity);
    $('#editRestaurantPostCode').val(toGetRestaurantPostCode);   
    $('#editRestaurantHygineRating').val(toGetRestaurantHygineRating);   
    
});


$('#editRestaurantData').on('click', function(){ 

    const tagsArray = $(".tag-text").map(function () {
        return $(this).text();
    }).get();

    const jsonData = {
        tag1: tagsArray[0],
        tag2: tagsArray[1],
    };

    $toGetRestName = $('#editRestaurantName').val();
    $toGetRestCusine = $('#editCusineType').val();
    $toGetRestAddress = $('#editRestaurantAddress').val();
    $toGetRestPhone = $('#editRestaurantPhoneNumber').val();
    $toGetRestCity = $('#editRestaurantCity').val();
    $toGetRestPostCode = $('#editRestaurantPostCode').val();
    $toGetRestHygineRating = $('#editRestaurantHygineRating').val();

    $.ajax({
        type: "POST",
        url: "adminEditCustomerOrRestaurant",
        async: false,
        cache: false,
        data: {
            validate: 'restaurant',
            sendRestaurantName: $toGetRestName,
            sendRestaurantCusine: $toGetRestCusine,
            sendRestaurantAddress: $toGetRestAddress,
            sendRestaurantPhone: $toGetRestPhone,
            sendRestaurantCity: $toGetRestCity,
            sendPostCode: $toGetRestPostCode,
            sendHygineRating: $toGetRestHygineRating,
            sendRestID: editRestaurantItemData,
            sendFoodTag: JSON.stringify(jsonData),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success: function(resp){
            if(resp.message === "success"){
                window.location.href = resp.url;
            }
        }
    });
});


// DELIVERER EDIT
let editAddressId;
$("#example tbody").on("click", ".editDeliverer", function(e){

    e.preventDefault();
    var $this = $(this);
    editAddressId = $this.attr("href")

    let toGetDelivererName = $this.parents(".record").find('td').eq(1).text();
    let toGetDelivererEmail = $this.parents(".record").find('td').eq(2).text();
    let toGetDelivererNumber = $this.parents(".record").find('td').eq(3).text();
    let toGetDelivererWorkLocation = $this.parents(".record").find('td').eq(4).text();
    let toGetDelivererLocation = $this.parents(".record").find('td').eq(5).text();
    let toGetDelivererVehicleType = $this.parents(".record").find('td').eq(6).text();

    $("#editDelivererForm").modal("show");
    $('#delivererName').val(toGetDelivererName);
    $('#delivererEmail').val(toGetDelivererEmail);
    $('#delivererNumber').val(toGetDelivererNumber);
    $('#delivererWorkLocation').val(toGetDelivererWorkLocation);
    $('#delivererLocation').val(toGetDelivererLocation); 
    $('#vehicleType').val(toGetDelivererVehicleType);   
    
});


$('#updateDeliverer').on('click', function(){ 

    $toGetDeliverName = $('#delivererName').val();
    $toGetDeliverEmail = $('#delivererEmail').val();
    $toGetDeliverNumber = $('#delivererNumber').val();
    $toGetDeliverWorkLocation = $('#delivererWorkLocation').val();
    $toGetDeliverLocation = $('#delivererLocation').val();
    $toGetDeliverVehicleType = $('#vehicleType').val();
    
    $.ajax({
        type: "POST",
        url: editAddressId,
        async: false,
        cache: false,
        data: {
            updateOrDelete: 'update',
            sendDelivererName: $toGetDeliverName,
            sendDelivererEmail: $toGetDeliverEmail,
            sendDelivererNumber: $toGetDeliverNumber,
            sendDelivererWorkLocation: $toGetDeliverWorkLocation,
            sendRDelivererLocation: $toGetDeliverLocation,
            sendDelivererVehicleType: $toGetDeliverVehicleType,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success: function(resp){
            if(resp.message === "success"){
                window.location.href = resp.url;
            }
        }
    });
});


let tagsAdded = 0;
const maxTags = 2;

$(document).ready(function () {
    $("#tagInput").on("keydown", function (e) {
        if (e.key === "Enter" || e.key === ",") {
            if (tagsAdded >= maxTags) {
                return; 
            }
            e.preventDefault();
            const tag = $("<div>").addClass("tag");
            const tagText = $("<span>").addClass("tag-text").text($(this).val().trim());
            const tagRemove = $("<span>").addClass("tag-remove").text("x");

            tag.append(tagText, tagRemove);
            $(".tag-container").append(tag);
            $(this).val("");
            tagsAdded++;
        }
    });

        
});

$(".tag-container").on("click", ".tag-remove", function () {
    $(this).parent().remove();
    tagsAdded--;
});


$("#keyGenerate").on('click', function(e) {
    e.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to change the Admin's key!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, proceed!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: 'adminKey/',
                type: "POST",
                async: false,
                cache: false,
                data: {csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()},
                dataType: "json",
                success: function(resp){
                    if(resp.message === "success"){
                        Swal.fire(
                        'Success!',
                        "New Key is now generated and sent it to admin's email",
                        'success'
                    ).then(() => {
                        window.location.href = resp.url;
                    })
                }}
            });
        }
    })
});

