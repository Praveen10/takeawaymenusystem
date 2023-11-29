var btn = document.getElementById('btn')

function leftClick() {
	btn.style.left = '13%'
}

function rightClick() {
	btn.style.left = '18%'
}

// FOR CARDS
const cards = document.querySelectorAll('[id^=restaurantCard]');
 
cards.forEach(card => {
	card.addEventListener('click', function() {
		const restaurantName = this.querySelector('.card-title').textContent;
		console.log(restaurantName)
		$toGetCustomerUserName = restaurantName
		// alert($toGetCustomerUserName);
		$.ajax({
            type: "POST",
            url: "restaurantDataPage/",
            async: false,
            cache: false,
            data: {
                sendRestaurantName: $toGetCustomerUserName,
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

const checkboxes = document.querySelectorAll('[name="categories"]');
const cardWrappers = document.querySelectorAll('.col-md-3');
console.log(cardWrappers)


checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateFilter);
});

function updateFilter() {
    const selectedCuisines = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    cardWrappers.forEach(wrapper => {
        const cuisine = wrapper.querySelector('.clickable-card').getAttribute('data-cuisine');
        
        if (selectedCuisines.length === 0 || selectedCuisines.includes(cuisine)) {
            wrapper.classList.remove('hidden-card');
        
        } else {
            wrapper.classList.add('hidden-card');
        }
    });
}

const searchInput = document.getElementById('searchInput');
const cardWrapper = document.querySelectorAll('.col-md-3');

searchInput.addEventListener('input', performSearch);

function performSearch() {
    const query = searchInput.value.trim().toLowerCase();

    cardWrapper.forEach(wrapper => {
        const restaurantName = wrapper.querySelector('.card-title').textContent.toLowerCase();
        const cuisine = wrapper.querySelector('.clickable-card').getAttribute('data-cuisine').toLowerCase();
        const foodTags = wrapper.querySelectorAll('.food-tag');
        
        let restaurantNameMatch = restaurantName.includes(query);
        let cuisineMatch = cuisine.includes(query);
        let tagMatch = false;

        foodTags.forEach(tag => {
            if (tag.textContent.toLowerCase().includes(query)) {
                tagMatch = true;
            }
        });

        if (restaurantNameMatch || cuisineMatch || tagMatch) {
            wrapper.style.order = '-1'; 
            wrapper.style.display = 'block';
        } else {
            wrapper.style.order = '0'; 
            wrapper.style.display = 'none';
        }
    });
}

const rows = document.querySelectorAll('.container-fluid .row');

function sortRowCards(row, attribute) {
    const cardWrappers = Array.from(row.querySelectorAll('.col-md-3:not(.hidden-card)'));

    cardWrappers.sort((a, b) => {
        const aValue = parseFloat(a.querySelector('.clickable-card').getAttribute(`data-${attribute}`)) || 0;
        const bValue = parseFloat(b.querySelector('.clickable-card').getAttribute(`data-${attribute}`)) || 0;
        return bValue - aValue;
    });

    cardWrappers.forEach(wrapper => {
        row.appendChild(wrapper);
    });
}

function sortAllRows(attribute) {
    rows.forEach(row => {
        sortRowCards(row, attribute);
    });
}

const topRatedRadio = document.querySelector('input[name="sortOrders"][value="topRated"]');
topRatedRadio.addEventListener('change', () => {
    sortAllRows('rating');
});

const hygieneRatingRadio = document.querySelector('input[name="sortOrders"][value="hygineRating"]');
hygieneRatingRadio.addEventListener('change', () => {
    sortAllRows('hygine');
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
    // console.log(updatedValues[0])
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

        modifyPassword(newPassword);
    }

    function modifyPassword(newPassword) {

    }

    function isPasswordValid(password) {
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/;
        return passwordPattern.test(password);
    }


