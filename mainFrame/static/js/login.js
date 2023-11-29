// This variables holds the input from user
const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

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
    const validateEmail = email.value.trim();
    let validatePassword = password.value.trim();
    var isFormValid = true;
  
   
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
    else 
    {
        setSuccess(password);
    }
    // If any data is in empty or wrong it will prevent the screen without leaving to other action
    if (!isFormValid) {
        e.preventDefault();
    }
};



