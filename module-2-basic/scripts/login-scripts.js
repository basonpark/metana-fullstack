document.addEventListener("DOMContentLoaded", function () {

//all form input variables
const usernameInput = document.querySelector('[name="username"]');
const firstNameInput = document.querySelector('[name="firstName"]');
const lastNameInput = document.querySelector('[name="lastName"]');
const emailInput = document.querySelector('[name="email"]');
const passwordInput = document.querySelector('[name="password"]');
const confirmPasswordInput = document.querySelector('[name="confirmPassword"]');

//form validation
function validateNotEmpty(input, errorElementId, errorMessage) {
    if (!input.value) {
        document.getElementById(errorElementId).innerText = errorMessage;
        return false;
    } else {
        document.getElementById(errorElementId).innerText = '';
        return true;
    }
}

function validateForm() {
    let isValid = true;

    if (currentSlide == 0) {
        isValid = validateNotEmpty(usernameInput, 'usernameError', 'Username is required') && isValid;
        isValid = validateNotEmpty(firstNameInput, 'firstnameError', 'First name is required') && isValid;
        isValid = validateNotEmpty(lastNameInput, 'lastnameError', 'Last name is required') && isValid;
    }
    
    if (currentSlide === 1) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!validateNotEmpty(emailInput, 'emailError', 'Email is required') || !emailRegex.test(emailInput.value)) {
            document.getElementById('emailError').innerText = !emailRegex.test(emailInput.value) ? 'Invalid email format' : '';
            isValid = false;
        } else {
            document.getElementById('emailError').innerText = "";
        }
    }

    if (currentSlide === 2) {
        isValid = validateNotEmpty(passwordInput, 'passwordError', 'Password is required') && isValid;
        isValid = validateNotEmpty(confirmPasswordInput, 'confirmPasswordError', 'Confirm password is required') && isValid;

        if (passwordInput.value !== confirmPasswordInput.value) {
            document.getElementById('confirmPasswordError').innerText = 'Passwords do not match';
            isValid = false;
        } else {
            document.getElementById('confirmPasswordError').innerText = '';
        }
    }
    return isValid;
}

function saveToLocalStorage() {
    const formData = {
        username: usernameInput.value,
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        password: passwordInput.value, 
    };
    localStorage.setItem('registrationFormData', JSON.stringify(formData));
}


//form page toggle
const slides = document.querySelectorAll('.input-slide');
const steps = document.querySelectorAll('.steps');

let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.display = 'flex';
        } else {
            slide.style.display = 'none';
        }
    });

    updateStepIndicator(index);
}


function updateStepIndicator(index) {
    steps.forEach((step, i) => {
        if (i < index) {
            step.style.backgroundColor = '#80ed99';
        } else {
            step.style.backgroundColor = '#f8f9fa'; 
        }
    });
}

function nextSlide() {
    if (!validateForm()) {
        return;
    }
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        console.log(`Next button clicked, showing slide ${currentSlide + 1}`); // Debug
        showSlide(currentSlide);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        console.log(`Back button clicked, showing slide ${currentSlide + 1}`);
        showSlide(currentSlide);
    }
}


showSlide(0);

document.querySelectorAll('.button-nex').forEach((button, index) => {
    if (button.textContent === 'Next') {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
        });
    }
});


document.querySelectorAll('.button-back').forEach((button, index) => {
    if (button.textContent === 'Back') {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
        });
    }
});


document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
        saveToLocalStorage();
        
        document.getElementById('success-message').style.display = 'block';
        setTimeout(function() {
            window.location.href = 'movies.html';
        }, 2000);
    }
});

});