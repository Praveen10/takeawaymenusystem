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



$('[id^=acceptOrder]').on('click', function(e){
    var $this = $(this);
    console.log('IN ACCEPT ORDER');
    console.log($('input[name=csrfmiddlewaretoken]').val());
    var delivererID = $this.data("delivererid");
    e.preventDefault();
    Swal.fire(
        'Accepted!',
        'Order is now accepted!',
        'success'
      ).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: $this.attr("href"),
                type: "POST",
                async: false,
                cache: false,
                data: {url: window.location.href, delivererid: delivererID, csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()},
                dataType: "json",
                success: function(resp){
                    if(resp.message === "success"){
                        window.location.href = resp.url;
                    }
                }
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


const editButton = document.getElementById('editButton');
const submitButton = document.getElementById('submitButton');
const submitButtonRow = document.getElementById('submitButtonRow');
const cardBody = document.querySelector('.informationBody');


editButton.addEventListener('click', function() {
    const inputs = document.querySelectorAll('.text-secondary');
    for (const input of inputs) {
        const originalText = input.textContent.trim();
        input.innerHTML = `<input type="text" class="form-control" value="${originalText}" />`;
    }
    
    cardBody.style.height = "730px";
    submitButtonRow.style.display = 'block';
    
});

submitButton.addEventListener('click', function() {
    const inputs = document.querySelectorAll('.text-secondary input');
    const updatedValues = [];
    for (const input of inputs) {
        const newValue = input.value.trim();
        input.parentNode.innerHTML = newValue;
        updatedValues.push(newValue);
    }
    console.log(updatedValues[0])
    const delivererID = document.getElementById("submitButton").getAttribute("data-delivererID");

    $.ajax({
        type: "POST",
        url: "updateProfile/",
        async: false,
        cache: false,
        data: {
            profileOwner: 'deliverer',
            id: delivererID,
            fullName: updatedValues[0],
            email: updatedValues[1],
            phone: updatedValues[2],
            dob: updatedValues[3],
            vehicleType: updatedValues[4],
            postCode: updatedValues[5],
            workLocation: updatedValues[6],
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success:function(result){
            let localHostUrl = "http://127.0.0.1:8000/";
            window.location.href = localHostUrl + result;
            console.log(window.location.href)
        }
    });
    
    cardBody.style.height = "600px";
    submitButtonRow.style.display = 'none';
 
});


const submitPasswordButton = document.getElementById('submitPassword');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const newPasswordError = document.getElementById('newPasswordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const resetModal = new bootstrap.Modal(document.getElementById('resetModal'));

    submitPasswordButton.addEventListener('click', handleSubmit);

    function handleSubmit() {
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        newPasswordError.textContent = '';
        if (!isPasswordValid(newPassword)) {
            newPasswordError.textContent = "Password must be at least 8 characters and include uppercase, lowercase, numeric, and special characters.";
            return;
        }

        confirmPasswordError.textContent = '';
        if (newPassword !== confirmPassword) {
            confirmPasswordError.textContent = "Confirmation password does not match.";
            return;
        }

        console.log('New Password:', newPassword);
        console.log('Confirm Password:', confirmPassword);

        resetModal.hide();
    }

    function isPasswordValid(password) {
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/;
        return passwordPattern.test(password);
    }


