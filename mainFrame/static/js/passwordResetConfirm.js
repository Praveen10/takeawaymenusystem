// This variables holds the input from user
const form = document.getElementById('form');
const password = document.getElementById('newpass');
const cnfrmpassword = document.getElementById('cnfrmpass');

// To validate the inputs given by the user
form.addEventListener('submit', e => {
    validateInputs(e);
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
    let validatePassword = password.value.trim();
    let validateCnfrmPassword = cnfrmpassword.value.trim();
    var isFormValid = true;

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
        setError(cnfrmpassword, 'Password is required');
        isFormValid = false;
    } 
    else if (validateCnfrmPassword !== validatePassword)
    {
        setError(cnfrmpassword, 'Password must be same');
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



