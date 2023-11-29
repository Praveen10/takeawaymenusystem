// This variables holds the input from user
const form = document.getElementById('form');
const userName = document.getElementById('username');
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cnfrmpassword = document.getElementById('cnfrmpassword');

// To validate the inputs given by the user
form.addEventListener('submit', e => {
    validateInputs(e);
});

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
const validateInputs = (e) => {
    const validatUserName = userName.value.trim();
    const validatFirstName = firstName.value.trim();
    const validatLastName = lastName.value.trim();
    const validateEmail = email.value.trim();
    let validatePassword = password.value.trim();
    let validateCnfrmPassword = cnfrmpassword.value.trim();
    var isFormValid = true;
  
    // Name validation (If the first name and the last name is empty it stops to fill the space)
    if(validatUserName === '') 
    {
        setError(userName, 'User Name is required');
        isFormValid = false;
    } 
    else
    {
        setSuccess(userName);
    }
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
        setError(cnfrmpassword, 'Confirm Password is required');
        isFormValid = false;
    } 
    else if(validateCnfrmPassword != validatePassword){
        setError(cnfrmpassword, 'Confirm Password mismatch');
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



