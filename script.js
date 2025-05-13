// 1. Event Handling
const clickMeButton = document.getElementById('clickMeButton');
const hoverMeArea = document.getElementById('hoverMeArea');
const keypressInput = document.getElementById('keypressInput');
const keypressOutput = document.getElementById('keypressOutput');
const doubleClickButton = document.getElementById('doubleClickButton');
const doubleClickMessage = document.getElementById('doubleClickMessage');
let clickCount = 0;
let timer;

clickMeButton.addEventListener('click', () => {
    alert('Button Clicked!');
});

hoverMeArea.addEventListener('mouseover', () => {
    hoverMeArea.textContent = 'Mouse Over!';
});

hoverMeArea.addEventListener('mouseout', () => {
    hoverMeArea.textContent = 'Hover Over Me';
});

keypressInput.addEventListener('keypress', (event) => {
    keypressOutput.textContent = `You pressed: ${event.key}`;
});

doubleClickButton.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 2) {
        doubleClickMessage.classList.remove('hidden');
        setTimeout(() => {
            doubleClickMessage.classList.add('hidden');
            clickCount = 0;
        }, 2000);
    } else if (clickCount === 1) {
        timer = setTimeout(() => {
            clickCount = 0; // Reset if not double-clicked within a timeframe
        }, 300);
    }
});

// Bonus: Long Press (Simple implementation using mouse down and up)
let pressTimer;
hoverMeArea.addEventListener('mousedown', () => {
    pressTimer = setTimeout(() => {
        alert('Long Press Detected!');
    }, 1000);
});

hoverMeArea.addEventListener('mouseup', () => {
    clearTimeout(pressTimer);
});

hoverMeArea.addEventListener('mouseout', () => {
    clearTimeout(pressTimer); // Clear timer if mouse leaves
});

// 2. Interactive Elements
const changeTextButton = document.getElementById('changeTextButton');
const dynamicText = document.getElementById('dynamicText');
const images = document.querySelectorAll('#galleryContainer img');
const prevImageButton = document.getElementById('prevImage');
const nextImageButton = document.getElementById('nextImage');
let currentIndex = 0;

changeTextButton.addEventListener('click', () => {
    dynamicText.textContent = dynamicText.textContent === 'Initial Text' ? 'Text Changed!' : 'Initial Text';
    changeTextButton.textContent = changeTextButton.textContent === 'Change Text' ? 'Revert Text' : 'Change Text';
});

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.remove('active');
        if (i === index) {
            img.classList.add('active');
        }
    });
}

if (prevImageButton && nextImageButton && images.length > 0) {
    prevImageButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    nextImageButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    showImage(currentIndex); // Show the initial image
}

const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        content.classList.toggle('open');
    });
});

// Bonus: Simple CSS Animation (applied in style.css to .gallery-image)

// 3. Form Validation
const myForm = document.getElementById('myForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const formMessage = document.getElementById('formMessage');

function validateForm() {
    let isValid = true;

    // Required field check for Name
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required.';
        isValid = false;
    } else {
        nameError.textContent = '';
    }

    // Email format validation (simple regex)
    if (emailInput.value.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        emailError.textContent = 'Invalid email format.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    // Password rules (min 8 characters)
    if (passwordInput.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
        isValid = false;
    } else {
        passwordError.textContent = '';
    }

    return isValid;
}

myForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default submission

    if (validateForm()) {
        formMessage.textContent = 'Form submitted successfully!';
        formMessage.className = 'success';
        myForm.reset(); // Clear the form
        setTimeout(() => {
            formMessage.className = 'hidden';
        }, 3000);
    } else {
        formMessage.textContent = 'Please correct the form errors.';
        formMessage.className = 'error';
        setTimeout(() => {
            formMessage.className = 'hidden';
        }, 3000);
    }
});

// Bonus: Real-time feedback while typing (for password length)
passwordInput.addEventListener('input', () => {
    if (passwordInput.value.length < 8) {
        passwordError.textContent = `Password too short (${passwordInput.value.length}/8)`;
    } else {
        passwordError.textContent = '';
    }
});