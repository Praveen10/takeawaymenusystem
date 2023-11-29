const steps = Array.from(document.querySelectorAll("form .step"));
const nextBtn = document.querySelectorAll("form .next-btn");
const prevBtn = document.querySelectorAll("form .previous-btn");
const form = document.getElementById("form");
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cnfrmpassword = document.getElementById('cnfrmpassword');
const phoneNumber = document.getElementById('phnumber');
const restaurantName = document.getElementById('restaurantname');
const restaurantAddress = document.getElementById('restaurantaddress');
const city = document.getElementById('city');
const postCode = document.getElementById('postcode');
const cusineType = document.getElementById('cusinetype');
const restaurantHygine = document.getElementById('hygineRating');

nextBtn.forEach((button) => {
  button.addEventListener("click", () => {
    validateNextInputs();
    changeStep("next");
  });
});
prevBtn.forEach((button) => {
  button.addEventListener("click", () => {
    changeStep("prev");
  });
});

// form.addEventListener("submit", (e) => {
//   const inputs = [];
//   form.querySelectorAll("input").forEach((input) => {
//     const { name, value } = input;
//     inputs.push({ name, value });
//   });
//   console.log(inputs);
//   form.reset();
// });

// To validate the inputs given by the user
form.addEventListener('submit', e => {
    console.log("inside form")
    validateSubmitInputs(e);
});


function changeStep(btn) {
  let index = 0;
  const active = document.querySelector(".active");
  index = steps.indexOf(active);
  steps[index].classList.remove("active");
  if (btn === "next") {
    index++;
  } else if (btn === "prev") {
    index--;
  }
  steps[index].classList.add("active");
}

// To validate email function
const toValidEmail = email => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

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
const validateNextInputs = (e) => {
    const validatFirstName = firstName.value.trim();
    const validatLastName = lastName.value.trim();
    const validateEmail = email.value.trim();
    const validatePhoneNumber = phoneNumber.value.trim();
    let validatePassword = password.value.trim();
    let validateCnfrmPassword = cnfrmpassword.value.trim();
    var isFormValid = true;
  
    // Name validation (If the first name and the last name is empty it stops to fill the space)
    if(validatFirstName === '') 
    {
        setError(firstName, 'First Name is required');
        isFormValid = false;
    } 
    else
    {
        setSuccess(firstName);
    }
    if(validatLastName === '') 
    {
        setError(lastName, 'Last Name is required');
        isFormValid = false;
    } 
    else 
    {
        setSuccess(lastName);
    }
    if(validateEmail === '') 
    {
        setError(email, 'Email is required');
        isFormValid = false;
    } 
    else if (!toValidEmail(validateEmail)) 
    {
        setError(email, 'Provide a valid email address');
        isFormValid = false;
    } 
    else 
    {
        setSuccess(email);
    }
    if(validatePhoneNumber === '') 
    {
        setError(phoneNumber, 'Phone Number is required');
        isFormValid = false;
    } 
    else 
    {
        setSuccess(phoneNumber);
    }
    if(validatePassword === '') 
    {
        setError(password, 'Password is required');
        isFormValid = false;
    } 
    else if (validatePassword.length < 8 ) 
    {
        setError(password, 'Password must be at least 8 character.');
        isFormValid = false;
    } 
    else if (!/[^a-zA-Z0-9]/.test(validatePassword)) 
    {
        setError(password, 'Password requires at least one special character');
        isFormValid = false;
    }
    else if (!/[0-9]/.test(validatePassword)) 
    {
        setError(password, 'Password requires at least one digit');
        isFormValid = false;
    }
    else if (!/[A-Z]/.test(validatePassword)) 
    {
        setError(password, 'Password requires at least one uppercase letter');
        isFormValid = false;
    }
    else if (!/[a-z]/.test(validatePassword)) 
    {
        setError(password, 'Password requires at least one lowercase letter');
        isFormValid = false;
    }
    else 
    {
        setSuccess(password);
    }
    if(validateCnfrmPassword === '') 
    {
        setError(cnfrmpassword, 'Confirm password is required');
        isFormValid = false;
    } 
    else if(validateCnfrmPassword != validatePassword) {
        setError(cnfrmpassword, 'Confirm password incorrect');
        isFormValid = false;
    }
    else
    {
        setSuccess(cnfrmpassword);
    }
    // If any data is in empty or wrong it will prevent the screen without leaving to other action
    if (!isFormValid) {
        e.preventDefault();
    }
};


const validateSubmitInputs = (e) => {
    const validatRestaurantName = restaurantName.value.trim();
    const validatRestaurantAddress = restaurantAddress.value.trim();
    const validateCity = city.value.trim();
    const validatePostCode = postCode.value.trim();
    const validateCusineType = cusineType.value.trim();
    const validateRestaurantHygine = restaurantHygine.value.trim();
    var isFormValid = true;

    if(validatRestaurantName === '') 
    {
        setError(restaurantName, 'Restaurant Name is required');
        isFormValid = false;
    } 
    else
    {
        setSuccess(restaurantName);
    }
    if(validatRestaurantAddress === '') 
    {
        setError(restaurantAddress, 'Restaurant Address is required');
        isFormValid = false;
    } 
    else
    {
        setSuccess(restaurantAddress);
    }
    if(validateCity === '') 
    {
        setError(city, 'City is required');
        isFormValid = false;
    } 
    else
    {
        setSuccess(city);
    }
    if(validatePostCode === '') 
    {
        setError(postCode, 'Post Code is required');
        isFormValid = false;
    } 
    else
    {
        setSuccess(postCode);
    }
    if(validateCusineType === '') 
    {
        setError(cusineType, 'Cusine Type is required');
        isFormValid = false;
    } 
    else
    {
        setSuccess(cusineType);
    }
    if(validateRestaurantHygine === '') 
    {
        setError(restaurantHygine, 'Please select hygine rating');
        isFormValid = false;
    } 
    else
    {
        setSuccess(restaurantHygine);
    }
     // If any data is in empty or wrong it will prevent the screen without leaving to other action
     if (!isFormValid) {
        e.preventDefault();
    }
};