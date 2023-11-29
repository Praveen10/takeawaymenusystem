// const steps = Array.from(document.querySelectorAll("form .step"));
// const nextBtn = document.querySelectorAll("form .next-btn");
// const prevBtn = document.querySelectorAll("form .previous-btn");
const form = document.getElementById("form");
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cnfrmpassword = document.getElementById('cnfrmpassword');
const phoneNumber = document.getElementById('phnumber');
const citySelect = document.getElementById('workCity');
const dateOfBirth = document.getElementById('dob');
const postCode = document.getElementById('postcode');
const vehicletypeSelect = document.getElementById('vehicletype');
const rightToWorkSelect = document.getElementById('righttowork');
const rightToWorkUpload = document.getElementById('rightToWorkUpload');
const proofOfAddressSelect = document.getElementById('proofofaddress');
const proofOfAddressUpload = document.getElementById('proofOfAddressUpload');

const steps = document.querySelectorAll(".step");
const nextButtons = document.querySelectorAll(".next-btn");
const previousButtons = document.querySelectorAll(".previous-btn");

let currentStep = 0;

// Show the current step and hide others
function showStep(stepIndex) {
    steps.forEach((step, index) => {
        if (index === stepIndex) {
            step.classList.add("active");
        } else {
            step.classList.remove("active");
        }
    });
}


nextButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            steps[currentStep].classList.remove('active');
            currentStep++;
            steps[currentStep].classList.add('active');
        }
    });
});


previousButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (currentStep > 0) {
            steps[currentStep].classList.remove('active');
            currentStep--;
            steps[currentStep].classList.add('active');
        }
    });
});

form.addEventListener('submit', (e) => {
    console.log("inside form")
    validateSubmitInputs(e);
    // alert("stop");
});

function setupUpload(inputId, iconId, displayId, selectId) {
    const fileInput = document.getElementById(inputId);
    const uploadIcon = document.getElementById(iconId);
    const fileDisplay = document.getElementById(displayId);
    const selectElement = document.getElementById(selectId);
    
    function updateIconVisibility() {
        uploadIcon.style.display = selectElement.value === "select" ? "none" : "block";
    }

    uploadIcon.addEventListener("click", function () {
        fileInput.click();
    });

    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            fileDisplay.textContent = "Uploaded file: " + fileInput.files[0].name;
        } else {
            fileDisplay.textContent = "";
        }
        updateIconVisibility();
    });

    selectElement.addEventListener("change", updateIconVisibility);
    
    updateIconVisibility();
}

// setupUpload("vehicleUpload", "vehicleUploadIcon", "vehicleFileDisplay", "vehicletype");
setupUpload("rightToWorkUpload", "rightToWorkUploadIcon", "rightToWorkFileDisplay", "righttowork");
setupUpload("proofOfAddressUpload", "proofOfAddressUploadIcon", "proofOfAddressFileDisplay", "proofofaddress");

// // To validate email function
const toValidEmail = email => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

// // below code is to validate if user did not enter the input. It sends the error message in UI 
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

const validateStep = (step) => {
    if (step === 0) {
        return validateStep1();
    } else if (step === 1) {
        return validateStep2();
    }
    return true; // Default to true if step is not handled
};

const validateStep1 = () => {
    
    const selectedCity = citySelect.value.trim();
    var isFormValid = true;
    if (selectedCity === 'select') {
        setError(citySelect, 'Please select a city to work');
        isFormValid = false;
    } else {
        setSuccess(citySelect);
    }

    if (!isFormValid) {
        return false; 
    } else {
        return true;
    }
};


// // It trims the empty in the given fields
const validateStep2  = () => {
    console.log("in validate input")
    const validatFirstName = firstName.value.trim();
    const validatLastName = lastName.value.trim();
    const validateEmail = email.value.trim();
    const validatePhoneNumber = phoneNumber.value.trim();
    let validatePassword = password.value.trim();
    let validateCnfrmPassword = cnfrmpassword.value.trim();
    const dob = dateOfBirth.value.trim();
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
        setError(password, 'Password requires at least one lowecase letter');
        isFormValid = false;
    }
    else 
    {
        setSuccess(password);
    }
    if(validateCnfrmPassword === '') 
    {
        setError(cnfrmpassword, 'Confirm Name is required');
        isFormValid = false;
    } 
    else if(validateCnfrmPassword != validatePassword) {
        setError(cnfrmpassword, 'Confirm Mismatch');
        isFormValid = false;
    }
    else
    {
        setSuccess(cnfrmpassword);
    }
    if(dob === '') 
    {
        setError(dateOfBirth, 'Date of Birth is required');
        isFormValid = false;
    } 
    else
    {
        setSuccess(dateOfBirth);
    }
    // If any data is in empty or wrong it will prevent the screen without leaving to other action
    console.log(isFormValid)
    if (!isFormValid) {
        return false; 
    } else {
        return true;
    }
};


const validateSubmitInputs = (e) => {
    // const validatRestaurantName = restaurantName.value.trim();
    // e.preventDefault();
    const validateVehicleType = vehicletypeSelect.value.trim();
    const validatePostCode = postCode.value.trim();
    const validateRightToWork = rightToWorkSelect.value.trim();
    const validateAddressProof = proofOfAddressSelect.value.trim();
    const validateRightToWorkDocument = rightToWorkUpload.files[0];
    const validateAddressProofDocument = proofOfAddressUpload.files[0];

    var isFormValid = true;

    if(validatePostCode === '') 
    {
        setError(postCode, 'Post Code is required');
        isFormValid = false;
    } 
    else
    {
        setSuccess(postCode);
    }
    if (validateVehicleType === "select") {
        setError(vehicletypeSelect, 'Please select a vehicle type');
        isFormValid = false;
    } else {
        setSuccess(vehicletypeSelect);
    }
    
    if (validateRightToWork === "select") {
        setError(rightToWorkSelect, 'Please select a right to work');
        isFormValid = false;
    } 
    else if (validateRightToWork !== 'select' && !validateRightToWorkDocument) 
    {
        setError(rightToWorkSelect, 'Upload right to work document');
        isFormValid = false;
    } 
    else {
        setSuccess(rightToWorkSelect);
    }
    if (validateAddressProof === "select") {
        setError(proofOfAddressSelect, 'Please select a address proof');
        isFormValid = false;
    }  else if (validateAddressProof !== 'select' && !validateAddressProofDocument) 
    {
        setError(proofOfAddressSelect, 'Upload address proof document');
        isFormValid = false;
    } 
    else {
        setSuccess(proofOfAddressSelect);
    }

    // if (!rightToWorkFile) {
    //     setError(rightToWorkUploadIcon, 'Right to Work file is required');
    //     return false;
    // } else {
    //     setSuccess(rightToWorkUploadIcon);
    // }
    
    
    // if (!proofOfAddressFile) {
    //     setError(proofOfAddressUploadIcon, 'Proof of Address file is required');
    //     return false;
    // } else {
    //     setSuccess(proofOfAddressUploadIcon);
    // }
    
    // return true;
     // If any data is in empty or wrong it will prevent the screen without leaving to other action
     if (!isFormValid) {
        e.preventDefault();
    }
};


const successContainer = document.getElementById('successContainer');
const containerHeader = document.querySelector('.signupHeader');
form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    if (validateStep(currentStep)) {
        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                console.log('Submission Successful');
                form.style.display = 'none';
                containerHeader.style.display = 'none';
                successContainer.style.display = 'block';
            } else {
                console.log('Submission Unsuccessful');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

steps[currentStep].classList.add('active');