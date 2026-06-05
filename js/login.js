/* login.js - Interactive controls for the Login Page */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const passwordToggle = document.getElementById('password-toggle');
  const eyeIconShow = document.getElementById('eye-icon-show');
  const eyeIconHide = document.getElementById('eye-icon-hide');
  const btnSubmit = document.getElementById('btn-submit');
  const btnSpinner = document.getElementById('btn-spinner');
  const btnText = btnSubmit ? btnSubmit.querySelector('.btn-text') : null;

  // Form wrappers and feedback containers
  const groupEmail = document.getElementById('group-email');
  const groupPassword = document.getElementById('group-password');
  const errorEmail = document.getElementById('error-email');
  const errorPassword = document.getElementById('error-password');

  // --- Toggle Password Visibility ---
  if (passwordToggle && passwordInput && eyeIconShow && eyeIconHide) {
    passwordToggle.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      
      if (isPassword) {
        eyeIconShow.style.display = 'none';
        eyeIconHide.style.display = 'block';
        passwordToggle.setAttribute('aria-label', 'Ocultar contraseña');
      } else {
        eyeIconShow.style.display = 'block';
        eyeIconHide.style.display = 'none';
        passwordToggle.setAttribute('aria-label', 'Mostrar contraseña');
      }
    });
  }

  // --- Regex Email & Password Length Validations ---
  const validateEmailFormat = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const showInputError = (group, errorContainer, message) => {
    if (group && errorContainer) {
      group.classList.remove('has-success');
      group.classList.add('has-error');
      errorContainer.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <span>${message}</span>
      `;
      errorContainer.style.display = 'flex';
    }
  };

  const clearInputError = (group, errorContainer) => {
    if (group && errorContainer) {
      group.classList.remove('has-error');
      errorContainer.textContent = '';
      errorContainer.style.display = 'none';
    }
  };

  const setInputSuccess = (inputElement) => {
    const group = inputElement.closest('.form-group');
    if (group) {
      group.classList.remove('has-error');
      group.classList.add('has-success');
      const errorContainer = group.querySelector('.form-error-msg');
      if (errorContainer) {
        errorContainer.textContent = '';
        errorContainer.style.display = 'none';
      }
    }
  };

  const clearInputSuccess = (inputElement) => {
    const group = inputElement.closest('.form-group');
    if (group) {
      group.classList.remove('has-success');
    }
  };

  const validateEmail = () => {
    const value = emailInput.value.trim();
    if (!value) {
      showInputError(groupEmail, errorEmail, 'El correo electrónico es requerido.');
      return false;
    }
    if (!validateEmailFormat(value)) {
      showInputError(groupEmail, errorEmail, 'Por favor ingresa un correo válido.');
      return false;
    }
    clearInputError(groupEmail, errorEmail);
    setInputSuccess(emailInput);
    return true;
  };

  const validatePassword = () => {
    const value = passwordInput.value;
    if (!value) {
      showInputError(groupPassword, errorPassword, 'La contraseña es requerida.');
      return false;
    }
    if (value.length < 8) {
      showInputError(groupPassword, errorPassword, 'La contraseña debe contener al menos 8 caracteres.');
      return false;
    }
    clearInputError(groupPassword, errorPassword);
    setInputSuccess(passwordInput);
    return true;
  };

  // Attach Event listeners for real-time validation on blur/input
  if (emailInput) {
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', () => {
      if (groupEmail) {
        if (groupEmail.classList.contains('has-error')) {
          const value = emailInput.value.trim();
          if (value && validateEmailFormat(value)) {
            clearInputError(groupEmail, errorEmail);
            setInputSuccess(emailInput);
          }
        } else if (groupEmail.classList.contains('has-success')) {
          clearInputSuccess(emailInput);
        }
      }
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener('blur', validatePassword);
    passwordInput.addEventListener('input', () => {
      if (groupPassword) {
        if (groupPassword.classList.contains('has-error')) {
          const value = passwordInput.value;
          if (value.length >= 8) {
            clearInputError(groupPassword, errorPassword);
            setInputSuccess(passwordInput);
          }
        } else if (groupPassword.classList.contains('has-success')) {
          clearInputSuccess(passwordInput);
        }
      }
    });
  }

  // --- Simulate Form Submission ---
  if (loginForm && btnSubmit && btnSpinner && btnText) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Trigger all validations on submit attempt
      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();

      if (isEmailValid && isPasswordValid) {
        // Toggle submission loading state
        btnSubmit.disabled = true;
        btnText.style.display = 'none';
        btnSpinner.style.display = 'inline-block';

        // Simulate 1.5 seconds server verification
        setTimeout(() => {
          // Restore button state
          btnSubmit.disabled = false;
          btnSpinner.style.display = 'none';
          btnText.style.display = 'inline-block';
          btnText.textContent = '¡Éxito! Redirigiendo...';
          
          // Redirect to dashboard.html after 1 second
          setTimeout(() => {
            window.location.href = 'dashboard.html';
          }, 1000);

        }, 1500);
      }
    });
  }
});
