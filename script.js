"use strict"


function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }


  const form = document.getElementById('contactForm');
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const commentsInput = document.getElementById('comments');
  const contactMethod = document.getElementsByName('contactMethod');
  const formMessage = document.getElementById('formMessage');
  
  form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      formMessage.innerText = '';

      if (validateForm()) {
          const customer = {
              name: `${firstNameInput.value} ${lastNameInput.value}`,
              email: emailInput.value,
              phone: phoneInput.value,
              comments: commentsInput.value,
              contactMethod: getContactMethod()
          };
  
          form.reset();
          showToast(`${JSON.stringify(customer, null, 2)}`)
      }
  });
  
  /*** Validate the form ***/
  function validateForm() {
      let isValid = true;
  
      if (firstNameInput.value === '') {
          showError(firstNameInput, 'First name is required');
          isValid = false;
      } else {
          removeError(firstNameInput);
      }
  
      if (lastNameInput.value === '') {
          showError(lastNameInput, 'Last name is required');
          isValid = false;
      } else {
          removeError(lastNameInput);
      }
  
      if (emailInput.value === '' && contactMethod[0].checked) {
          showError(emailInput, 'Email is required');
          isValid = false;
      } else if (!validateEmail(emailInput.value) && contactMethod[0].checked) {
          showError(emailInput, 'Please enter a valid email address');
          isValid = false;
      } else {
          removeError(emailInput);
      }
  
      if (phoneInput.value === '' && contactMethod[1].checked) {
          showError(phoneInput, 'Phone number is required');
          isValid = false;
      } else if (!validatePhone(phoneInput.value) && contactMethod[1].checked) {
          showError(phoneInput, 'Please enter a valid phone number');
          isValid = false;
      } else {
          removeError(phoneInput);
      }
  
      if (commentsInput.value === '') {
          showError(commentsInput, 'Comments are required');
          isValid = false;
      } else {
          removeError(commentsInput);
      }
  
      if (!getContactMethod()) {
          showToast('Please select a contact method', { variant: 'error' });
          isValid = false;
      }
  
      return isValid;
  }
  
  /*** Validate email address ***/
  function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }
  
  /*** Validate phone number ***/
  function validatePhone(phone) {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phone);
  }
  
  /*** Show error message ***/
  function showError(input, message) {
      const error = document.createElement('p');
      error.className = 'error';
      error.innerText = message;
  
      const inputContainer = input.parentElement;
      const existingError = inputContainer.querySelector('.error');
      if (existingError) {
          existingError.remove();
      }
      inputContainer.appendChild(error);
  }
  
  /*** Remove error message ***/
  function removeError(input) {
      const inputContainer = input.parentElement;
      const error = inputContainer.querySelector('.error');
      if (error) {
          error.remove();
      }
  }
  
  /*** Get the selected contact method ***/
  function getContactMethod() {
      let selectedMethod;
  
      contactMethod.forEach(method => {
          if (method.checked) {
              selectedMethod = method.value;
          }
      });
  
      return selectedMethod;
  }

