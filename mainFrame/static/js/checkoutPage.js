
// RIDER TIP
document.querySelector(".tip-button[data-percentage='0']").classList.add("active");

document.querySelectorAll(".tip-button").forEach(function(button) {
    button.addEventListener("click", function() {
        const tipPercentage = parseFloat(button.getAttribute("data-percentage"));
        if (!isNaN(tipPercentage)) {
            
            document.querySelectorAll(".tip-button").forEach(function(btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const subtotalElement = document.querySelector("[data-subtotal]");
            const subtotal = parseFloat(subtotalElement.getAttribute("data-subtotal"));

            const serviceFee = 2.50;
            const deliveryFee = 1.89;

            if (tipPercentage === 0) {
                const existingTipItem = document.querySelector(".customTipItem");
                if (existingTipItem) {
                    existingTipItem.remove();
                    const totalAmount = subtotal + serviceFee + deliveryFee
                    const orderTotalElement = document.querySelector(".orderTotal");
                    orderTotalElement.textContent = `£${totalAmount.toFixed(2)}`;

                }
            } else {
                const tipAmount = (subtotal + serviceFee + deliveryFee) * (tipPercentage / 100);
                const totalWithTip = subtotal + serviceFee + deliveryFee + tipAmount;

                const orderTotalElement = document.querySelector(".orderTotal");
                orderTotalElement.textContent = `£${totalWithTip.toFixed(2)}`;

                const orderSummaryList = document.querySelector(".orderSummaryList");
                const existingTipItem = orderSummaryList.querySelector(".customTipItem");

                if (existingTipItem) {
                    const tipAmountElement = existingTipItem.querySelector(".tipAmount");
                    tipAmountElement.textContent = `£${tipAmount.toFixed(2)}`;
                } else {
                    const tipLineItem = document.createElement("li");
                    tipLineItem.className = "d-flex justify-content-between py-3 border-bottom customTipItem";
                    tipLineItem.innerHTML = `<strong class="text-muted">Rider Tip</strong><strong class="tipAmount">£${tipAmount.toFixed(2)}</strong>`;
                    orderSummaryList.insertBefore(tipLineItem, orderTotalElement.parentNode);
                }
            }
        }
    });
});

// const applyButton = document.getElementById("applyCustomTip");
// applyButton.addEventListener("click", function() {
//     const customTipInput = document.getElementById("customTipInput");
//     const customTipValue = parseFloat(customTipInput.value);
    
//     if (!isNaN(customTipValue) && customTipValue <= 5.00) {

//         const subtotalElement = document.querySelector("[data-subtotal]");
//         const subtotal = parseFloat(subtotalElement.getAttribute("data-subtotal"));

//         const serviceFee = 2.50;
//         const deliveryFee = 1.89;
        

//         const totalWithoutTip = subtotal + serviceFee + deliveryFee;
//         const totalWithTip = totalWithoutTip + customTipValue;
  

//         const orderTotalElement = document.querySelector(".orderTotal");
//         orderTotalElement.textContent = `£${totalWithTip.toFixed(2)}`;
        

//         const orderSummaryList = document.querySelector(".orderSummaryList");
//         const existingTipItem = orderSummaryList.querySelector(".customTipItem");
        
//         if (existingTipItem) {
//             const tipAmountElement = existingTipItem.querySelector(".tipAmount");
//             tipAmountElement.textContent = `£${customTipValue.toFixed(2)}`;
//         } else {

//             const tipLineItem = document.createElement("li");
//             tipLineItem.className = "d-flex justify-content-between py-3 border-bottom customTipItem";
//             tipLineItem.innerHTML = `<strong class="text-muted">Custom Tip</strong><strong class="tipAmount">£${customTipValue.toFixed(2)}</strong>`;
//             console.log(orderTotalElement.parentNode)
//             orderSummaryList.insertBefore(tipLineItem, orderTotalElement.parentNode);
//         }

//         customTipInput.value = "";
//     }
// });


var delivererInst = '';
// RIDER INSTRUCTION 
  function showTextArea() {
    // Hide the card body
    document.getElementById("riderInstructionsCard").style.display = "none";

    // Create the text area container
    var textAreaContainer = document.createElement("div");
    textAreaContainer.id = "textAreaContainer";
    textAreaContainer.style.display = "block";

    // Create the text area element
    var textarea = document.createElement("textarea");
    textarea.id = "riderTextArea";
    textarea.className = "form-control";
    textarea.rows = "4";
    textAreaContainer.appendChild(textarea);

    // Create the "Save" button
    var saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.className = "textbutton saveTextArea";
    saveButton.disabled = true;
    saveButton.classList.add("dullSaveButton");
    saveButton.onclick = saveInstructions;
    textAreaContainer.appendChild(saveButton);

    // Create the "Cancel" button
    var cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.className = "textbutton cancelTextArea";
    cancelButton.onclick = cancel;
    textAreaContainer.appendChild(cancelButton);

    // Insert the text area container after the card
    var card = document.getElementById("riderInstructionsCard");
    card.parentNode.insertBefore(textAreaContainer, card.nextSibling);

    textarea.addEventListener("input", function() {

        saveButton.disabled = textarea.value.trim() === "";
        if (saveButton.disabled) {
            saveButton.classList.add("dullSaveButton");
        } else {
            saveButton.classList.remove("dullSaveButton");
        }
    });

}

function saveInstructions() {
    // Get the entered text from the textarea
    var newText = document.getElementById("riderTextArea").value;
    delivererInst = newText;
    // Update the content of the riderInstructionsCard
    var cardBody = document.querySelector("#riderInstructionsCard .card-body");
    cardBody.innerHTML = `
        <span class="icon"><i class="fa-regular fa-clipboard"></i></span>&ensp;
        <span class="instructionLabel"><b>Instructions for rider</b></span>
        <span class="instructionChange">Change</span>
        <div class="instructionText">${newText}</div>
    `;

    // Remove the text area container and show the updated card
    var textAreaContainer = document.getElementById("textAreaContainer");
    textAreaContainer.parentNode.removeChild(textAreaContainer);
    document.getElementById("riderInstructionsCard").style.display = "block";
}

function cancel() {
    // Remove the text area container and show the original card
    var textAreaContainer = document.getElementById("textAreaContainer");
    textAreaContainer.parentNode.removeChild(textAreaContainer);
    document.getElementById("riderInstructionsCard").style.display = "block";
}

// MODE OF ORDER
var radioButtons = document.querySelectorAll('input[name="orderMode"]');
var orderDetailsList = document.getElementById("orderDetailsList");

// Default: Show Delivery
toggleElements("delivery");

for (var i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener("click", function() {
        var selectedMode = document.querySelector('input[name="orderMode"]:checked').value;
        console.log(selectedMode);
        
        var orderSubTotal = parseFloat(orderDetailsList.getAttribute("data-subtotal"));
        var orderTotal = parseFloat(orderDetailsList.getAttribute("data-total"));
        

        orderDetailsList.innerHTML = '';


        var subtotalLi = document.createElement("li");
        subtotalLi.className = "d-flex justify-content-between py-3 border-bottom";
        subtotalLi.dataset.subtotal = orderSubTotal;
        subtotalLi.innerHTML = '<strong class="text-muted">Subtotal</strong><strong>£' + orderSubTotal.toFixed(2) + '</strong>';
        orderDetailsList.appendChild(subtotalLi);

        if (selectedMode === "delivery") {

            var serviceLi = document.createElement("li");
            serviceLi.className = "d-flex justify-content-between py-3 border-bottom servicehide";
            serviceLi.innerHTML = '<strong class="text-muted">Service fee</strong><strong>£2.50</strong>';
            orderDetailsList.appendChild(serviceLi);

  
            var deliveryLi = document.createElement("li");
            deliveryLi.className = "d-flex justify-content-between py-3 border-bottom deliveryhide";
            deliveryLi.innerHTML = '<strong class="text-muted">Delivery fee</strong><strong>£1.89</strong>';
            orderDetailsList.appendChild(deliveryLi);

        
            var totalLi = document.createElement("li");
            totalLi.className = "d-flex justify-content-between py-3 border-bottom totalhide";
            totalLi.innerHTML = '<strong class="text-muted">Total</strong><strong class="orderTotal">£' + orderTotal.toFixed(2) + '</strong>';
            orderDetailsList.appendChild(totalLi);

            toggleElements("delivery");
        } else if (selectedMode === "pickup") {
            toggleElements("pickup");
        }
    });
}

function toggleElements(mode) {
    var instructionCard = document.getElementById("riderInstructionsCard");
    var addressCard = document.querySelector(".clickable-card");
    var tipCard = document.querySelector(".tipCard");
    var serviceHide = document.querySelector(".servicehide");
    var deliveryHide = document.querySelector(".deliveryhide");
    var totalHide = document.querySelector(".totalhide");


    if (mode === "pickup") {
        toggleElement(instructionCard, "none");
        toggleElement(tipCard, "none");
        toggleElement(addressCard, "none");
        toggleElement(serviceHide, "none");
        toggleElement(deliveryHide, "none");
        toggleElement(totalHide, "none");
    } else {
        toggleElement(instructionCard, "block");
        toggleElement(tipCard, "block");
        toggleElement(addressCard, "block");
        toggleElement(serviceHide, "block");
        toggleElement(deliveryHide, "block");
        toggleElement(totalHide, "block");
        document.querySelectorAll(".tip-button").forEach(function(btn) {
            btn.classList.remove("active");
        });
        document.querySelector(".tip-button[data-percentage='0']").classList.add("active");
    }
}

function toggleElement(element, displayValue) {
    if (element) {
        element.style.display = displayValue;
    }
}

 // ADDRESS 
var mode = document.querySelector('input[name="orderMode"]:checked').value;
console.log("mode")
console.log(mode)
console.log("mode")
if (mode === "delivery") {
document.getElementById("addAddressButton").addEventListener("click", function() {
    const streetAddress = document.getElementById("streetAddress");
    const city = document.getElementById("city");
    const postcode = document.getElementById("postcode");
    const phoneNumber = document.getElementById("phoneNumber");

    const streetAddressError = document.getElementById("streetAddressError");
    const cityError = document.getElementById("cityError");
    const postcodeError = document.getElementById("postcodeError");
    const phoneNumberError = document.getElementById("phoneNumberError");

    const inputFields = [streetAddress, city, postcode, phoneNumber];
    const errorMessages = [streetAddressError, cityError, postcodeError, phoneNumberError];

    inputFields.forEach((inputField) => {
        inputField.classList.remove("border-red");
    });

    errorMessages.forEach((errorMessage) => {
        errorMessage.style.display = "none";
    });

    // Validate and apply styles
    let isValid = true;
    for (let i = 0; i < inputFields.length; i++) {
        if (inputFields[i].value === "") {
            inputFields[i].classList.add("border-red");
            errorMessages[i].style.display = "block";
            isValid = false;
        }
    }

    if (isValid) {
        const streetAddress = document.getElementById("streetAddress").value;
        const city = document.getElementById("city").value;
        const postcode = document.getElementById("postcode").value;
        const phoneNumber = document.getElementById("phoneNumber").value;

        if (streetAddress && city && postcode && phoneNumber) {
            const clickableCard = document.querySelector(".clickable-card");
            const cardBody = clickableCard.querySelector(".card-body");

            const contentWrapper = document.createElement("div");
            contentWrapper.classList.add("content-wrapper");

            const addressLabel = document.createElement("span");
            addressLabel.classList.add("addressLabel");
            addressLabel.innerHTML = `<b>${streetAddress}</b>`;

            const addressDetails = document.createElement("span");
            addressDetails.innerHTML = `<br>${city}, ${postcode} <span class="change-text"> Change </span><br> ${phoneNumber}`;

            cardBody.innerHTML = ''; 

            contentWrapper.appendChild(addressLabel);
            contentWrapper.appendChild(addressDetails);
            cardBody.appendChild(contentWrapper);

            const modal = document.getElementById("addressModal");
            const modalInstance = bootstrap.Modal.getInstance(modal);
        

            const customerId = addressModal.getAttribute("data-customerid");

            $.ajax({
                type: "POST",
                url: "/saveAddress",
                data: {
                    customerStreetAddress: streetAddress,
                    customerCity: city,
                    customerPostCode: postcode,
                    customerPhoneNumber: phoneNumber,
                    customerIdToUpdate: customerId,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function(response) {
                    console.log(response);
                    modalInstance.hide();
                }
            });
            
        }
    }
  });
}

// COUPON CODE
$(document).ready(function () {
    $(".coupon").click(function () {
        var couponInput = $(this).closest(".input-group").find("input");
        var couponCode = couponInput.data("couponcode");
        var offPrice = parseFloat(couponInput.data("offprice"));
        var discountType = couponInput.data("discounttype");
        var spendAmount = parseFloat(couponInput.data("spendamount"));
        var operation = couponInput.data("operation");
        var orderSubTotal = parseFloat($("#orderDetailsList").data("subtotal")); 

        const subTotalAmount = document.querySelector('.subTotalAmount');
        console.log(orderSubTotal)
        
        // console.log(orderTotalElement.textContent)
        if (couponInput.val() === couponCode) {
            if ((operation === "greater" && orderSubTotal > spendAmount) ||
                (operation === "greater or equal" && orderSubTotal >= spendAmount)) {
                applyDiscount(orderSubTotal, offPrice, discountType);
                couponInput.removeClass("is-invalid");
            } else {
                couponInput.addClass("is-invalid");
            }
        } else {
            couponInput.addClass("is-invalid");
        }
    });

    function applyDiscount(orderSubTotal, offPrice, discountType) {
        var newTotal;
        var mode = document.querySelector('input[name="orderMode"]:checked').value;
        console.log(mode)
        if (mode === "pickup") {
            var totalLineItem = document.createElement("li");
            totalLineItem.className = "d-flex justify-content-between py-3 border-bottom toHide";
            totalLineItem.innerHTML = `<strong class="text-muted">Total</strong><strong class="orderTotal">£${orderSubTotal}</strong>`;
            const orderSummaryList = document.querySelector(".orderSummaryList");
            orderSummaryList.insertBefore(totalLineItem, orderSubTotal.nextSibling);
        }

        const orderTotalElement = document.querySelector(".orderTotal");
        var orderTotal = orderTotalElement.textContent.replace("£", "");

        if (discountType === "fixed amount off") {
            newTotal = orderTotal - offPrice;
        } else if (discountType === "percentage off") {
            newTotal = orderTotal * (1 - offPrice / 100);
        }

        $(".orderTotal").text("£" + newTotal.toFixed(2));

        var discountAmount = discountType === "percentage off" ? (orderTotal - newTotal).toFixed(2) : offPrice.toFixed(2);
        var discountList = $(".discountList");


        if (discountList.length === 0) {
            discountList = $("<ul>").addClass("discountList");
            var discountLineItem = document.createElement("li");
            discountLineItem.className = "d-flex justify-content-between py-3 border-bottom discountItem";
            discountLineItem.innerHTML = `<strong class="text-muted">Discount</strong><strong class="discountAmount">£${discountAmount}</strong>`;
            const orderTotalElement = document.querySelector(".orderTotal");
            const orderSummaryList = document.querySelector(".orderSummaryList");
            orderSummaryList.insertBefore(discountLineItem, orderTotalElement.parentNode);
            $(".orderTotalList").append(discountList);
        } else {
            var discountLineItem = document.querySelector(".discountItem .discountAmount");
            discountLineItem.textContent = `£${discountAmount}`;
        }


        var discountAmountElement = $(".discountAmount");
        discountAmountElement.text("-£" + (discountType === "fixed" ? "£" : "") + discountAmount);
        discountAmountElement.show();
    }
});

// ORDER 
$(document).ready(function () {
    $(".placeOrderButton").click(function (event) {
        event.preventDefault(); 

        const streetAddress = document.getElementById("streetAddress").value;
        const city = document.getElementById("city").value;
        const postcode = document.getElementById("postcode").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        var selectedMode = document.querySelector('input[name="orderMode"]:checked').value;
        console.log(document.querySelector(".orderTotal"))
        if (selectedMode == "delivery") {
            if (!streetAddress || !city || !postcode || !phoneNumber) {
                    const addressError = document.getElementById("emptyAddressError");
                    addressError.style.display = "block";
            } else {
                var placeOrder = document.querySelector(".orderTotal");
                var tip = document.querySelector(".customTipItem");
                var selectedMode = document.querySelector('input[name="orderMode"]:checked').value;
                // var delivererInst = document.querySelector('.riderTextArea');
                console.log(delivererInst)

                document.getElementById("calculatedTotalInput").value = placeOrder.textContent.replace("£", "");

                if (tip === null) {
                    document.getElementById("collectRiderTip").value = '0.00';
                } else {
                    const tipAmountValue = parseFloat(tip.querySelector(".tipAmount").textContent.replace("£", ""));
                    document.getElementById("collectRiderTip").value = tipAmountValue;
                }

                document.getElementById("collectOrderMode").value = selectedMode
                document.getElementById("delivererInstruction").value = delivererInst

                console.log(placeOrder.textContent);


                $(".placeOrderButton").unbind('submit').submit();
            }
        } else {
            var placeOrder = document.querySelector(".orderTotal");
            console.log(placeOrder)
            if (placeOrder == null) {
                var subtotal = document.querySelector("[data-subtotal]");
                placeOrder = subtotal.getAttribute('data-subtotal');
            } else {
                placeOrder = placeOrder.textContent.replace("£", "");
            }

            var tip = document.querySelector(".customTipItem");
            var selectedMode = document.querySelector('input[name="orderMode"]:checked').value;
            // var delivererInst = document.querySelector('.riderTextArea');
            console.log(delivererInst)


            document.getElementById("calculatedTotalInput").value = placeOrder;

            document.getElementById("collectRiderTip").value = '0.00';
            document.getElementById("collectOrderMode").value = selectedMode
            document.getElementById("delivererInstruction").value = '';


            console.log(placeOrder.textContent);


            $(".placeOrderButton").unbind('submit').submit();
        }
    });
})
// var placeOrder = document.querySelector(".orderTotal");
// console.log(placeOrder)

