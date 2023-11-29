// $("#example").DataTable({
//     paging: true,
//     pageLength: 10,
//     lengthChange: true,
//     autoWidth: true,
//     searching: true,
//     bInfo: true,
//     bSort: true, 
// })
var table = $('#example').DataTable({
    // "columnDefs": [{
    //     "targets": [4, 5],
    //     "orderable": false
    // }],
    // dom: 'Bfrtip',
    // buttons: [{
    //     extend: 'excel',
    //     text: '<i class="fas fa-file-excel"></i>',
    //     className: 'btn btn-secondary',
    //     titleAttr: 'Excel',
    //     // column to export
    //     exportOptions: {
    //         columns: [0, 1, 2, 3, 4]
    //     }, 
    // }]
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

// $('#exampleModal').on('show.bs.modal', function (event) {
//     var button = $(event.relatedTarget) // Button that triggered the modal
//     var recipient = button.data('whatever') // Extract info from data-* attributes
//     
//     var modal = $(this)
//     modal.find('.modal-title').text('New message to ' + recipient)
//     modal.find('.modal-body input').val(recipient)
//   })

$('#addItem').on('click', function(){


    //validation part
    const form = document.getElementById('form');
    const iName = document.getElementById('itemname');
    const iDesc = document.getElementById('itemdescription');
    const iType = document.getElementById('itemtype');
    const iPrice = document.getElementById('itemprice');
    const iImage = document.getElementById('itemimage');
    const kCal = document.getElementById('foodKcal')
    const iFoodGroup = document.getElementById('foodGroup')

    form.addEventListener('submit', e => {
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
        const validatIName = iName.value.trim();
        const validatIDesc = iDesc.value.trim();
        const validatIIype = iType.value.trim();
        const validateIPrice = iPrice.value.trim();
        const validateIFoodGroup = iFoodGroup.value.trim();
        // let validateIImage = iImage.value.trim();
        var isFormValid = true;
    
        // Name validation (If the first name and the last name is empty it stops to fill the space)
        if(validatIName === '') 
        {
            setError(iName, 'Item Name is required');
            isFormValid = false;
        } 
        else
        {
            setSuccess(iName);
        }
        if(validatIDesc === '') 
        {
            setError(iDesc, 'Item Description is required');
            isFormValid = false;
        } 
        else
        {
            setSuccess(iDesc);
        }
        if(validatIIype === '') 
        {
            setError(iType, 'Item Type is required');
            isFormValid = false;
        } 
        else
        {
            setSuccess(iType);
        }
        if(validateIPrice === '') 
        {
            setError(iPrice, 'Item Description is required');
            isFormValid = false;
        } 
        else
        {
            setSuccess(iPrice);
        }
        if(validateIFoodGroup === '') 
        {
            setError(iFoodGroup, 'Food Group is required');
            isFormValid = false;
        } 
        else
        {
            setSuccess(iFoodGroup);
        }

        // If any data is in empty or wrong it will prevent the screen without leaving to other action
        if (isFormValid) {

            $getItemName = $('#itemname').val();
            $getItemDescription = $('#itemdescription').val();
            $getItemType = $('#itemtype').val();
            $getItemPrice = $('#itemprice').val();
            $getItemImage = $('#itemimage').val();
            $getMyInput = $('#my_input').val();
            getKcal = $('#foodKcal').val();
            getfoodGroup = $('#foodGroup').val();

            $.ajax({
                type: "POST",
                url: "insertMenuItem/",
                async: false,
                cache: false,
                data: {
                    getItemName: $getItemName,
                    getItemDescription: $getItemDescription,
                    getItemType: $getItemType,
                    getItemPrice: $getItemPrice,
                    sendCal: getKcal,
                    sendFoodGroup: getfoodGroup,
                    // getCheck: JSON.stringify(tagsArray),
                    getItemImage: $getItemImage,
                    getMyInput: $getMyInput,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success:function(result){
                    let localHostUrl = "http://127.0.0.1:8000/";
                    window.location.href = localHostUrl + result;
                    console.log(window.location.href)
                }
            });
        }
        else{
            console.log("Yes")
            e.preventDefault();
        }
    };

    
});


let tagsAdded = 0;
const maxTags = 2;

// $(document).ready(function () {
//     $("#tagInput").on("keydown", function (e) {
//         if (e.key === "Enter" || e.ctrlKey || e.key === ",") {
//             if (tagsAdded >= maxTags) {
//                 return; 
//             }
//             e.preventDefault();
//             const tag = $("<div>").addClass("tag");
//             const tagText = $("<span>").addClass("tag-text").text($(this).val().trim());
//             const tagRemove = $("<span>").addClass("tag-remove").text("x");

//             tag.append(tagText, tagRemove);
//             $(".tag-container").append(tag);
//             $(this).val("");
//             tagsAdded++;
//         }
//     });

    
// });

// $(".tag-container").on("click", ".tag-remove", function () {
//     $(this).parent().remove();
//     tagsAdded--;
// });

// If the ID starts with delete function it gets the value to delete the data item using jquery and swal function is used to beutify the page
$('[id^=deleteItem]').on('click', function(e){
    console.log("DELLLEEETEEEE IIITTTEEEMMMM")
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
                type: "GET",
                async: false,
                cache: false,
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

// $("#table tbody").on("click", ".editItem", function(e){
//     e.preventDefault();
//     // let item = $this.parents(".recor")
//     var $this = $(this);
//     print($this)
// })

// $('#editItem').on('click', function(e){
//     console.log("UUUUUUPPPPPPPPPPPPPDDDDDDDDDDDAAAAAAAAAAAAAAAAATTTTTTTTTTTTEEEEEEEEE")
//     var $this = $(this);
//     print($this)
//     let $item = $this.data('item');
//     print($item)
// });

// $('#editItem').on('click', function(){
//     // let getdata = element.getAttribute('data-name');
//     let getdata = $('#like').attr('data-name');
//     console.log(getdata)
// });


// function loadEditForm(event){
//     // alert(data);
//     var itemname = $('#itemName2').html();
//     console.log($('itemName1'))
//     alert(itemname);
//     $('#itemEditName').val(itemname);
//     event.preventDefault();
//   ;
// }
let editMenuItemData;
$("#example tbody").on("click", ".editMenuItem", function(e){
    e.preventDefault();
    var $this = $(this);
    console.log($this)
    console.log("fvweagiujujujujujujujujujujujujujujujujujujujujujujujujujujujujujujujuj")
    let toGetMenuID = $this.data('menuid')
    editMenuItemData = toGetMenuID;
    console.log(editMenuItemData)
    // console.log(toGetMenuID)
    let toGetItemName = $this.parents(".record").find('td').eq(1).text();
    let toGetItemDesc = $this.parents(".record").find('td').eq(2).text();
    let toGetItemPrice = $this.parents(".record").find('td').eq(3).text();
    let toGetItemType = $this.parents(".record").find('td').eq(4).text();
    let toGetKcal = $this.parents(".record").find('td').eq(5).text();
    let toGetFoodGroup = $this.parents(".record").find('td').eq(6).text();
    let toGetItemImage = $this.parents(".record").find('td').eq(8).text();

    $("#editModelItem").modal("show");
    $('#itemEditName').val(toGetItemName);
    $('#itemEditDescription').val(toGetItemDesc);
    $('#itemEditPrice').val(toGetItemPrice);
    $('#itemEditType').val(toGetItemType);
    $('#updateFoodKcal').val(toGetKcal);
    $('#updateFoodGroup').val(toGetFoodGroup);
    $('#itemEditImage').val(toGetItemImage);
    
    
    
});


$('#modifyChange').on('click', function(){ 
    console.log(editMenuItemData)
    $getEditItemName = $('#itemEditName').val();
    $getEditItemDescription = $('#itemEditDescription').val();
    $getEditItemType = $('#itemEditType').val();
    $getEditItemPrice = $('#itemEditPrice').val();
    getkcal = $('#updateFoodKcal').val();
    getFoodGroup = $('#updateFoodGroup').val();
    $getEditItemImage = $('#itemEditImage').val();

    $.ajax({
        type: "POST",
        url: "updateMenuItem/",
        async: false,
        cache: false,
        data: {
            menuid: editMenuItemData,
            itemName: $getEditItemName,
            itemDesc: $getEditItemDescription,
            itemType: $getEditItemType,
            price: $getEditItemPrice,
            kCal: getkcal,
            foodGroup: getFoodGroup,
            itemImage: $getEditItemImage,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success: function(resp){
            if(resp.message === "success"){
                window.location.href = resp.url;
            }
        }
    });
});

$('#addDiscount').on('click', function(){
    
    const form = document.getElementById('discountForm');
    const offPrice = document.getElementById('offPrice');
    const discounttype = document.getElementById('discountType');
    const discountoperation = document.getElementById('operation');
    const discountspend = document.getElementById('spend');
    const discountdescription = document.getElementById('description');
    const discountCouponCode = document.getElementById('couponCode');

    console.log(discountType)
    console.log(operation)
    console.log(spend)
    form.addEventListener('submit', e => {
        validateInputs(e);
        e.preventDefault();
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
        const validateOffPrice = offPrice.value.trim();
        const validateDiscountType = discounttype.value.trim();
        const validateOperation = discountoperation.value.trim();
        const validateSpend = discountspend.value.trim();
        const validatedescription = discountdescription.value.trim();
        const validateCouponCode = discountCouponCode.value.trim();
        var isFormValid = true;
    
        // Name validation (If the first name and the last name is empty it stops to fill the space)
        if(validateOffPrice === '') 
        {
            setError(offPrice, 'Please enter off price');
            isFormValid = false;
        } 
        else
        {
            setSuccess(offPrice);
        }
        if(validateDiscountType === '') 
        {
            setError(discounttype, 'Please select discount type');
            isFormValid = false;
        } 
        else
        {
            setSuccess(discounttype);
        }
        if(validateOperation === '') 
        {
            setError(discountoperation, 'Please select operation');
            isFormValid = false;
        } 
        else
        {
            setSuccess(discountoperation);
        }
        if(validateSpend === '') 
        {
            setError(discountspend, 'Please enter amount');
            isFormValid = false;
        } 
        else
        {
            setSuccess(discountspend);
        }
        if(validatedescription === '') 
        {
            setError(discountdescription, 'Please enter description');
            isFormValid = false;
        } 
        else
        {
            setSuccess(discountdescription);
        }
        if(validateCouponCode === '') 
        {
            setError(discountCouponCode, 'Please enter coupon code');
            isFormValid = false;
        } 
        else
        {
            setSuccess(discountCouponCode);
        }

        // If any data is in empty or wrong it will prevent the screen without leaving to other action
        if (isFormValid) {
            var getOffPrice = $('#offPrice').val();
            var getDiscountType = $('#discountType').val();
            var getOperation = $('#operation').val();
            var getSpend = $('#spend').val();
            var getDescription = $('#description').val();
            var getCoupon = $('#couponCode').val();
            var getMyInput = $('#my_input').val();
        
            $.ajax({
                type: "POST",
                url: getMyInput + "/insertDiscount",
                async: false,
                cache: false,
                data: {
                    sendOffPrice: getOffPrice,
                    sendDiscountType: getDiscountType,
                    sendOperation: getOperation,
                    sendSpendAmount: getSpend,
                    sendDescription: getDescription,
                    sendCouponCode: getCoupon,
                    sendid: getMyInput,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function(result) {
                    var localHostUrl = "http://127.0.0.1:8000/";
                    window.location.href = localHostUrl + result;
                    console.log(window.location.href);
                }
            });
        }
        else{
            e.preventDefault();
        }
    };

});

// DISCOUNT UPDATE

let editAddress;
$("#example tbody").on("click", ".editDiscount", function(e){

    e.preventDefault();
    var $this = $(this);
    editAddress = $this.attr("href")

    let toGetDescription = $this.parents(".record").find('td').eq(1).text();
    let toGetOffPrice = $this.parents(".record").find('td').eq(2).text();
    let toGetDiscountType = $this.parents(".record").find('td').eq(3).text();
    let toGetOperation = $this.parents(".record").find('td').eq(4).text();
    let toGetSpend = $this.parents(".record").find('td').eq(5).text();
    let toGetCouponCode = $this.parents(".record").find('td').eq(6).text();
    // alert(toGetDelivererName);
    $("#editDiscountForm").modal("show");
    $('#updateDescription').val(toGetDescription);
    $('#updateOffPrice').val(toGetOffPrice);
    $('#updatDiscountType').val(toGetDiscountType);
    $('#updateOperation').val(toGetOperation);
    $('#updateSpend').val(toGetSpend.replace('£', '')); 
    $('#updateCouponCode').val(toGetCouponCode);   
    
});


$('#updateDiscount').on('click', function(){ 

    $toGetDescription = $('#updateDescription').val();
    $toGetOffPrice = $('#updateOffPrice').val();
    $toGetDiscountType = $('#updatDiscountType').val();
    $toGetOperation = $('#updateOperation').val();
    $toGetSpend = $('#updateSpend').val();
    $toGetCouponCode = $('#updateCouponCode').val();
    
    $.ajax({
        type: "POST",
        url: editAddress,
        async: false,
        cache: false,
        data: {
            updateOrDelete: 'update',
            sendDescription: $toGetDescription,
            sendOffPrice: $toGetOffPrice,
            sendDiscountType: $toGetDiscountType,
            sendOperation: $toGetOperation,
            sendSpend: $toGetSpend,
            sendCouponCode: $toGetCouponCode,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success: function(resp){
            if(resp.message === "success"){
                window.location.href = resp.url;
            }
        }
    });
});

// DELETE DISCOUNT

// DELETE DELIVERER
$('[id^=discountDelete]').on('click', function(e){
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
                data: {updateOrDelete: 'delete', csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()},
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


var orderStatusButtons = document.querySelectorAll('.order-status-button');

orderStatusButtons.forEach(function(button) {
    var dropdownItems = button.nextElementSibling.querySelectorAll('.dropdown-item');

    var orderStatus = button.getAttribute('data-orderstatus'); 
    if (orderStatus) {
        button.textContent = orderStatus.replace(/_/g, ' ').replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            var newStatus = this.getAttribute('data-status');
            button.textContent = newStatus.replace(/_/g, ' ').replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
            var orderNumber = button.getAttribute('data-orderid');
            $.ajax({
                type: "POST",
                url: window.location.href + "/changeOrderStatus",
                async: false,
                cache: false,
                data: {
                    orderNumber: orderNumber,
                    url: window.location.href,
                    change: newStatus,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function(resp){
                    if(resp.message === "success"){
                        window.location.href = resp.url;
                    }
                }
            });
        });
    });
});
