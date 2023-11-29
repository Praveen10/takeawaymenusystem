
// const foodAddButtons = document.querySelectorAll(".foodAdd");
//     foodAddButtons.forEach(function(button) {
//         button.addEventListener("click", function() {

//             const cardElement = this.closest(".card");
//             const itemName = cardElement.querySelector(".card-title").textContent;
//             var price = this.dataset.price;

//             console.log(price)
//             alert(`You added "${itemName}" to your order. Price: £ ${price}`);
//         });
//     });
    
 

const foodAddButtons = document.querySelectorAll(".foodAdd");
const selectedList = document.querySelector(".selected-list");
const subtotalAmount = document.querySelector(".totals .subtotal .subAmount");
const totalAmount = document.querySelector(".totals .total .amount");
const serviceAmount =document.querySelector(".totals .service .serviceAmount");
const deliveryAmount =document.querySelector(".totals .delivery .deliveryAmount");
const serviceFeeAmount = 2.50;
const deliveryFeeAmount = 1.89;

let orderTotal = 0;

// foodAddButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//         const price = parseFloat(button.dataset.price);
        

//         // const itemName = button.parentNode.parentNode.querySelector(".card-title").textContent;
//         const itemName = button.parentNode.parentNode.querySelector(".card-title").textContent;
//         let itemQuantity = 1;

//         const existingItem = Array.from(selectedList.children).find((item) => {
//             const itemNameInList = item.querySelector(".item").textContent;
//             return itemNameInList === itemName;
//           });

//         console.log(existingItem)
//         if (existingItem) {
//             itemQuantity = parseInt(existingItem.querySelector(".quantity").textContent) + 1;
//             const itemPrice = (price * itemQuantity).toFixed(2);
//             existingItem.querySelector(".quantity").textContent = itemQuantity;
//             existingItem.querySelector(".price").textContent = `£${itemPrice}`;
//         } else {
//             // itemQuantity = 1;
//             const itemContainer = document.createElement("div");
//             itemContainer.classList.add("selected-item");
//             itemContainer.innerHTML = `
//                 <span class="item">${itemName}</span>
//                 <button class="minus-btn button">-</button>
//                 <span class="quantity">${itemQuantity}</span>
//                 <button class="plus-btn button">+</button>
//                 <span class="price">£${(price * itemQuantity).toFixed(2)}</span>
//             `;

//             const minusButton = itemContainer.querySelector(".minus-btn");
//             minusButton.addEventListener("click", () => {
//                 let itemQuantity = parseInt(itemContainer.querySelector(".quantity").textContent);
//                 // itemQuantity--; 
//                 if (itemQuantity > 1) {
//                     // If quantity is greater than 1, update the quantity and price
//                     itemQuantity--;
//                     const itemPrice = (price * itemQuantity).toFixed(2);
//                     itemContainer.querySelector(".quantity").textContent = itemQuantity;
//                     itemContainer.querySelector(".price").textContent = `£${itemPrice}`;
//                     orderTotal -= price;
//                   } else {
                    
//                     orderTotal -= price;
//                     selectedList.removeChild(itemContainer);
//                   }

//                 subtotalAmount.textContent = `£${orderTotal.toFixed(2)}`;
//                 console.log(subtotalAmount.textContent)
//                 totalAmount.textContent = `£${(orderTotal + serviceFeeAmount + deliveryFeeAmount).toFixed(2)}`;
//             });


//                 const plusButton = itemContainer.querySelector(".plus-btn");
//                 plusButton.addEventListener("click", () => {
//                     let itemQuantity = parseInt(itemContainer.querySelector(".quantity").textContent);
//                     if (itemQuantity > 1) {
//                         console.log("+IF")
//                         itemQuantity++;
//                         const itemPrice = (price * itemQuantity).toFixed(2);
//                         // itemContainer.querySelector(".quantity").textContent = itemQuantity;
//                         // itemContainer.querySelector(".price").textContent = `£${itemPrice}`;
//                         orderTotal += price;
//                       } else {
//                         console.log("+ELSE")
//                         orderTotal += price; 
//                         itemQuantity++; 
//                     }
//                     itemContainer.querySelector(".quantity").textContent = itemQuantity;
//                     itemContainer.querySelector(".price").textContent = `£${(price * itemQuantity).toFixed(2)}`;
//                     subtotalAmount.textContent = `£${orderTotal.toFixed(2)}`;
//                     totalAmount.textContent = `£${(orderTotal + serviceFeeAmount + deliveryFeeAmount).toFixed(2)}`;
//                 });

//                 selectedList.appendChild(itemContainer);
//             }

//         // selectedList.appendChild(itemContainer);
//         orderTotal += price;
//         subtotalAmount.textContent = `£${orderTotal.toFixed(2)}`;
//         totalAmount.textContent = `£${(orderTotal + serviceFeeAmount + deliveryFeeAmount).toFixed(2)}`;
//     });
// });


const checkoutButton = document.querySelector(".checkout-btn");
checkoutButton.addEventListener("click", () => {
    if (orderTotal > 1) {
        const selectedItems = []; 

        const selectedItemsContainers = document.querySelectorAll(".selected-item");
        selectedItemsContainers.forEach((itemContainer) => {
            const itemName = itemContainer.querySelector(".item").textContent;
            const itemQuantity = parseInt(itemContainer.querySelector(".quantity").textContent);
            const itemPrice = parseFloat(itemContainer.querySelector(".price").textContent.replace("£", ""));

            selectedItems.push({
                name: itemName,
                quantity: itemQuantity,
                price: itemPrice,
            });
        });

        const subTotal = parseFloat(subtotalAmount.textContent.replace("£", ""));
        const overallTotal = parseFloat(totalAmount.textContent.replace("£", ""));
        console.log(selectedItems);
        console.log(subTotal);
        console.log($(location).attr('pathname'));
        var urll = window.location.pathname;
        window.CSRF_TOKEN = document.getElementById('csrf').querySelector('input').value;
        $.ajax({
            type: "POST",
            url: urll + "/checkoutPage",
            async: false,
            cache: false,
            data: {
                foodItems: JSON.stringify(selectedItems),
                subTotal: subTotal,
                overallTotal: overallTotal,
                csrfmiddlewaretoken: window.CSRF_TOKEN
            },
            success: function(resp){
                if(resp.message === "success"){
                    window.location.href = resp.url;
                }
            }
        });

    } 
});


const minusButton = document.querySelector('.minus-btn');
const plusButton = document.querySelector('.plus-btn');
const quantityElement = document.querySelector('.quantity');
const addItemButton = document.querySelector('#addItemButton');

// Initial quantity and base price
let quantity = 1;
const basePrice = document.querySelector('#modalItemPrice').textContent.replace("£", "");
console.log(basePrice)

// Event listener for minus button
minusButton.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    quantityElement.textContent = quantity;
    const basePrice = document.querySelector('#modalItemPrice').textContent.replace("£", "");
    updateButton(basePrice);
  }
});

// Event listener for plus button
plusButton.addEventListener('click', () => {
  quantity++;
  quantityElement.textContent = quantity;
  const basePrice = document.querySelector('#modalItemPrice').textContent.replace("£", "");
  updateButton(basePrice);
});

// Event listener for add button
addItemButton.addEventListener('click', () => {
  const cardTitle = document.querySelector('#modalItemName').textContent;
  const updatedPrice = parseFloat(addItemButton.textContent.match(/[\d\.]+/)).toFixed(2);
  const basePrice = document.querySelector('#modalItemPrice').textContent.replace("£", "");

  // Push the selected item to the selected list to display in cart
  pushSelectedItem(cardTitle, quantity, updatedPrice, basePrice);
  
  quantity = 1;
  quantityElement.textContent = quantity;
  updateButton(basePrice);
          
});

// Update the button price based on the quantity
function updateButton(basePrice) {
    const totalPrice = (basePrice * quantity).toFixed(2);
    addItemButton.textContent = `Add £${totalPrice}`;
}

// Event listener for add item button
// addItemButton.addEventListener('click', () => {
//     if (orderTotal > 1) {
//         const selectedItems = []; 

//         const selectedItemsContainers = document.querySelectorAll(".selected-item");
//         selectedItemsContainers.forEach((itemContainer) => {
//             const itemName = itemContainer.querySelector(".item").textContent;
//             const itemQuantity = parseInt(itemContainer.querySelector(".quantity").textContent);
//             const itemPrice = parseFloat(itemContainer.querySelector(".price").textContent.replace("£", ""));

//             selectedItems.push({
//                 name: itemName,
//                 quantity: itemQuantity,
//                 price: itemPrice,
//             });
//         });

//         const subTotal = parseFloat(subtotalAmount.textContent.replace("£", ""));
//         const overallTotal = parseFloat(totalAmount.textContent.replace("£", ""));
//         // console.log(selectedItems);
//         // console.log(subTotal);
//         // console.log($(location).attr('pathname'));
//         // var urll = window.location.pathname;
//         // alert(urll);
//         // window.CSRF_TOKEN = document.getElementById('csrf').querySelector('input').value;
//         // $.ajax({
//         //     type: "POST",
//         //     url: urll + "/checkoutPage",
//         //     async: false,
//         //     cache: false,
//         //     data: {
//         //         foodItems: JSON.stringify(selectedItems),
//         //         subTotal: subTotal,
//         //         overallTotal: overallTotal,
//         //         csrfmiddlewaretoken: window.CSRF_TOKEN
//         //     },
//         //     success: function(resp){
//         //         if(resp.message === "success"){
//         //             window.location.href = resp.url;
//         //         }
//         //     }
//         // });

//     } 
// });

function pushSelectedItem(title, quantity, price, basePrice) {

    const existingItemDiv = document.querySelector(`.selected-item[data-title="${title}"]`);

    if (existingItemDiv) {
        // Update the existing item's quantity and price
        const quantityElement = existingItemDiv.querySelector('.quantity');
        const priceElement = existingItemDiv.querySelector('.price');

        const oldQuantity = parseInt(quantityElement.textContent);
        const updatedQuantity = oldQuantity + quantity;
        quantityElement.textContent = updatedQuantity;

        const updatedPrice = (basePrice * updatedQuantity).toFixed(2);
        priceElement.textContent = `£${updatedPrice}`;

        updateTotal();
    } else {
        // Create a new item element
        const selectedItemDiv = document.createElement('div');
        selectedItemDiv.classList.add('selected-item');
        selectedItemDiv.setAttribute('data-title', title);
        selectedItemDiv.innerHTML = `
            <span class="item">${title}</span>
            <button class="minus-btn button">-</button>
            <span class="quantity">${quantity}</span>
            <button class="plus-btn button">+</button>
            <span class="price">£${price}</span>
        `;

        const minusButton = selectedItemDiv.querySelector('.minus-btn');
        const plusButton = selectedItemDiv.querySelector('.plus-btn');
        const quantityElement = selectedItemDiv.querySelector('.quantity');
        const priceElement = selectedItemDiv.querySelector('.price');


    // Add event listener for minus button
        minusButton.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity;
                const updatedPrice = (basePrice * quantity).toFixed(2);
                priceElement.textContent = `£${updatedPrice}`;
                updateTotal();
            } else {
                selectedList.removeChild(selectedItemDiv);
                updateTotal();
            }

        });

    // Add event listener for plus button
        plusButton.addEventListener('click', () => {

            const updatedQuantity = parseInt(quantityElement.textContent) + 1;
            quantityElement.textContent = updatedQuantity;

            const updatedPrice = (basePrice * updatedQuantity).toFixed(2);
            priceElement.textContent = `£${updatedPrice}`;

            updateTotal();
        });

        selectedList.appendChild(selectedItemDiv);

        orderTotal += parseFloat(price);
        updateTotal();

    }
}
  
// Function to update the total amount
function updateTotal() {

    let total = 0;

    const selectedItemDivs = document.querySelectorAll('.selected-item');
    selectedItemDivs.forEach(selectedItemDiv => {
        const priceElement = selectedItemDiv.querySelector('.price');
        const price = parseFloat(priceElement.textContent.replace('£', ''));
        total += price;
    });

    orderTotal = total;

    if (orderTotal != 0) {
        serviceAmount.textContent = `£${serviceFeeAmount.toFixed(2)}`;
        deliveryAmount.textContent = `£${deliveryFeeAmount}`;
        totalAmount.textContent = `£${(orderTotal + serviceFeeAmount + deliveryFeeAmount).toFixed(2)}`;
        
    }else {
        serviceAmount.textContent = `£0.00`;
        deliveryAmount.textContent = `£0.00`;
        totalAmount.textContent = `£0.00`;
    }

    subtotalAmount.textContent = `£${orderTotal.toFixed(2)}`;
    // totalAmount.textContent = `£${(orderTotal + serviceFeeAmount + deliveryFeeAmount).toFixed(2)}`;

    
}

// Hide model 
$("#addItemButton").click(function(){
    $("#itemModal").modal("hide");
});



// Show the dynamic data when card is in focus
const clickableCards = document.querySelectorAll('.clickable-card');
const modalItemFoodGroup = document.querySelector('#modalItemFoodGroup');
const restaurantAddressSpan = document.querySelector('#restaurantAddress');
const restaurantPhoneSpan = document.querySelector('#restaurantPhone');

clickableCards.forEach((card) => {
    card.addEventListener('click', () => {
        const itemName = card.dataset.name;
        const itemDescription = card.dataset.description;
        const itemPrice = parseFloat(card.dataset.price);
        const itemKcal = card.dataset.calorie;
        const itemFoodGroup = card.dataset.food;
        const restaurantAddress = card.dataset.address;
        const restaurantCity = card.dataset.city;
        const restaurantPostCode = card.dataset.postcode;
        const restaurantPhone = card.dataset.phone;
        const restaurantName = card.dataset.restaurantname;

        document.querySelector('#modalItemName').textContent = itemName;
        document.querySelector('#modalItemDescription').textContent = itemDescription;
        document.querySelector('#modalItemPrice').textContent = `£${itemPrice.toFixed(2)}`;
        document.querySelector('#modalItemKcal').textContent = itemKcal + ' Kcal';

        modalItemFoodGroup.innerHTML = '';

        const foodGroupLabel = document.createElement('span');
        foodGroupLabel.className = 'food-group-label';

        if (itemFoodGroup === 'Vegetarian') {
            foodGroupLabel.textContent = '🟢 VEG';
            foodGroupLabel.style.color = 'green';
        } else if (itemFoodGroup === 'Non Vegetarian') {
            foodGroupLabel.textContent = '🔴 NON-VEG';
            foodGroupLabel.style.color = 'red';
        } else if (itemFoodGroup === 'Vegan') {
            foodGroupLabel.textContent = '🌿 VEGAN';
            foodGroupLabel.style.color = 'green';
        }

        modalItemFoodGroup.appendChild(foodGroupLabel);


        restaurantAddressSpan.textContent = ' ' + restaurantAddress + ', ' + restaurantCity + ', ' + restaurantPostCode ;
        restaurantPhoneSpan.textContent = 'Call ' + restaurantName + 'on ' + restaurantPhone;

        const contactLink = document.getElementById('contactLink');
        const contactInfo = document.getElementById('contactInfo');

        contactLink.addEventListener('click', function () {
            if (contactInfo.style.display === 'none') {
                contactInfo.style.display = 'block';
            } else {
                contactInfo.style.display = 'none';
            }
        });

        addItemButton.textContent = `Add £${itemPrice.toFixed(2)}`;
    });
});


