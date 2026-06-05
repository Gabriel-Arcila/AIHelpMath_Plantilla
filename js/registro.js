/* registro.js - Interactive controls and validation for the Registration Page */

document.addEventListener('DOMContentLoaded', () => {
  const registroForm = document.getElementById('registro-form');
  const nombreInput = document.getElementById('nombre');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const termsCheckbox = document.getElementById('terms');
  
  // Toggles and spiners
  const passwordToggle = document.getElementById('password-toggle');
  const eyeIconShow = document.getElementById('eye-icon-show');
  const eyeIconHide = document.getElementById('eye-icon-hide');
  
  const confirmPasswordToggle = document.getElementById('confirm-password-toggle');
  const confirmEyeIconShow = document.getElementById('confirm-eye-icon-show');
  const confirmEyeIconHide = document.getElementById('confirm-eye-icon-hide');
  
  const btnSubmit = document.getElementById('btn-submit-registro');
  const btnSpinner = document.getElementById('btn-spinner');
  const btnText = btnSubmit ? btnSubmit.querySelector('.btn-text') : null;
  
  // Password Strength Meter Elements
  const passwordStrengthContainer = document.getElementById('password-strength');
  const strengthFill = passwordStrengthContainer ? passwordStrengthContainer.querySelector('.strength-fill') : null;
  const strengthLabel = passwordStrengthContainer ? passwordStrengthContainer.querySelector('.strength-label') : null;

  // Form wrappers and feedback containers
  const groupNombre = document.getElementById('group-nombre');
  const groupEmail = document.getElementById('group-email');
  const groupPassword = document.getElementById('group-password');
  const groupConfirmPassword = document.getElementById('group-confirm-password');
  const groupTerms = document.getElementById('group-terms');
  
  const errorNombre = document.getElementById('error-nombre');
  const errorEmail = document.getElementById('error-email');
  const errorPassword = document.getElementById('error-password');
  const errorConfirmPassword = document.getElementById('error-confirm-password');
  const errorTerms = document.getElementById('error-terms');

  // --- Toggle Password Visibility (Original Password) ---
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

  // --- Toggle Password Visibility (Confirm Password) ---
  if (confirmPasswordToggle && confirmPasswordInput && confirmEyeIconShow && confirmEyeIconHide) {
    confirmPasswordToggle.addEventListener('click', () => {
      const isPassword = confirmPasswordInput.getAttribute('type') === 'password';
      confirmPasswordInput.setAttribute('type', isPassword ? 'text' : 'password');
      
      if (isPassword) {
        confirmEyeIconShow.style.display = 'none';
        confirmEyeIconHide.style.display = 'block';
        confirmPasswordToggle.setAttribute('aria-label', 'Ocultar contraseña');
      } else {
        confirmEyeIconShow.style.display = 'block';
        confirmEyeIconHide.style.display = 'none';
        confirmPasswordToggle.setAttribute('aria-label', 'Mostrar contraseña');
      }
    });
  }

  // --- Validations Regex ---
  const validateEmailFormat = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateNombreFormat = (nombre) => {
    const regex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/;
    return regex.test(nombre);
  };

  // --- UI Helpers ---
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

  // --- Password Strength Calculator ---
  const calculatePasswordStrength = (password) => {
    if (!password) {
      return { level: 0, label: '', className: '', labelClass: '' };
    }
    
    if (password.length < 8) {
      return { level: 1, label: 'Débil (Muy corta)', className: 'strength-weak', labelClass: 'label-weak' };
    }
    
    let score = 1;
    
    const hasMixed = /[a-z]/.test(password) && /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const isLong = password.length >= 12;
    
    if (hasMixed) score++;
    if (hasDigit) score++;
    if (hasSpecial) score++;
    if (isLong && score < 4) score++;
    
    const finalScore = Math.min(score, 4);
    
    let label = '';
    let className = '';
    let labelClass = '';
    
    switch (finalScore) {
      case 1:
        label = 'Débil';
        className = 'strength-weak';
        labelClass = 'label-weak';
        break;
      case 2:
        label = 'Regular';
        className = 'strength-fair';
        labelClass = 'label-fair';
        break;
      case 3:
        label = 'Buena';
        className = 'strength-good';
        labelClass = 'label-good';
        break;
      case 4:
        label = 'Fuerte (¡Excelente!)';
        className = 'strength-strong';
        labelClass = 'label-strong';
        break;
    }
    
    return { level: finalScore, label, className, labelClass };
  };

  const updateStrengthIndicator = () => {
    const value = passwordInput.value;
    
    if (!value) {
      if (passwordStrengthContainer) passwordStrengthContainer.style.display = 'none';
      return;
    }
    
    if (passwordStrengthContainer) passwordStrengthContainer.style.display = 'flex';
    
    const strength = calculatePasswordStrength(value);
    
    if (strengthFill) {
      // Clear previous classes
      strengthFill.className = 'strength-fill';
      if (strength.className) {
        strengthFill.classList.add(strength.className);
      }
    }
    
    if (strengthLabel) {
      strengthLabel.textContent = `Fuerza de la contraseña: ${strength.label}`;
      strengthLabel.className = 'strength-label';
      if (strength.labelClass) {
        strengthLabel.classList.add(strength.labelClass);
      }
    }
  };

  // --- Field Validation Implementations ---
  const validateNombre = () => {
    const value = nombreInput.value.trim();
    if (!value) {
      showInputError(groupNombre, errorNombre, 'El nombre completo es requerido.');
      return false;
    }
    if (value.length < 2) {
      showInputError(groupNombre, errorNombre, 'El nombre debe contener al menos 2 caracteres.');
      return false;
    }
    if (!validateNombreFormat(value)) {
      showInputError(groupNombre, errorNombre, 'El nombre solo debe contener letras y espacios.');
      return false;
    }
    clearInputError(groupNombre, errorNombre);
    setInputSuccess(nombreInput);
    return true;
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
    
    // Also revalidate confirm password if it already has value
    if (confirmPasswordInput.value) {
      validateConfirmPassword();
    }
    
    return true;
  };

  const validateConfirmPassword = () => {
    const value = confirmPasswordInput.value;
    const originalValue = passwordInput.value;
    
    if (!value) {
      showInputError(groupConfirmPassword, errorConfirmPassword, 'Por favor confirma tu contraseña.');
      return false;
    }
    if (value !== originalValue) {
      showInputError(groupConfirmPassword, errorConfirmPassword, 'Las contraseñas no coinciden.');
      return false;
    }
    clearInputError(groupConfirmPassword, errorConfirmPassword);
    setInputSuccess(confirmPasswordInput);
    return true;
  };

  const validateTerms = () => {
    if (!termsCheckbox.checked) {
      showInputError(groupTerms, errorTerms, 'Debes aceptar los Términos y Condiciones.');
      return false;
    }
    clearInputError(groupTerms, errorTerms);
    return true;
  };

  // --- Real-time Validation Event Listeners ---
  if (nombreInput) {
    nombreInput.addEventListener('blur', validateNombre);
    nombreInput.addEventListener('input', () => {
      if (groupNombre) {
        if (groupNombre.classList.contains('has-error')) {
          const value = nombreInput.value.trim();
          if (value && value.length >= 2 && validateNombreFormat(value)) {
            clearInputError(groupNombre, errorNombre);
            setInputSuccess(nombreInput);
          }
        } else if (groupNombre.classList.contains('has-success')) {
          clearInputSuccess(nombreInput);
        }
      }
    });
  }

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
      updateStrengthIndicator();
      
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

  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
    confirmPasswordInput.addEventListener('input', () => {
      if (groupConfirmPassword) {
        if (groupConfirmPassword.classList.contains('has-error')) {
          const value = confirmPasswordInput.value;
          if (value === passwordInput.value) {
            clearInputError(groupConfirmPassword, errorConfirmPassword);
            setInputSuccess(confirmPasswordInput);
          }
        } else if (groupConfirmPassword.classList.contains('has-success')) {
          clearInputSuccess(confirmPasswordInput);
        }
      }
    });
  }

  if (termsCheckbox) {
    termsCheckbox.addEventListener('change', () => {
      if (termsCheckbox.checked) {
        clearInputError(groupTerms, errorTerms);
      } else {
        validateTerms();
      }
    });
  }

  // --- Form Submission Simulation ---
  if (registroForm && btnSubmit && btnSpinner && btnText) {
    registroForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Trigger all validations
      const isNombreValid = validateNombre();
      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();
      const isConfirmPasswordValid = validateConfirmPassword();
      const isTermsValid = validateTerms();

      const formIsValid = isNombreValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isTermsValid;

      if (formIsValid) {
        // Toggle submission loading state
        btnSubmit.disabled = true;
        btnText.style.display = 'none';
        btnSpinner.style.display = 'inline-block';

        // Simulate 1.5 seconds API call
        setTimeout(() => {
          // Restore button state
          btnSubmit.disabled = false;
          btnSpinner.style.display = 'none';
          btnText.style.display = 'inline-block';
          btnText.textContent = '¡Cuenta creada! Redirigiendo...';
          
          // Redirect to dashboard.html after 1 second
          setTimeout(() => {
            window.location.href = 'dashboard.html';
          }, 1000);

        }, 1500);
      } else {
        // Scroll smoothly to the first input with error
        const firstErrorGroup = registroForm.querySelector('.has-error');
        if (firstErrorGroup) {
          firstErrorGroup.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Focus the input inside that group if possible
          const input = firstErrorGroup.querySelector('input');
          if (input) {
            setTimeout(() => input.focus(), 400);
          }
        }
      }
    });
  }
});
