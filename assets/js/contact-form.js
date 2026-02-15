/**
 * Validation du formulaire de contact
 * Vélos BIBI
 */

(function() {
  'use strict';

  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submit-btn');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');
  const privacyConsent = document.getElementById('privacy-consent');
  
  // Zone pour les messages d'accessibilité
  let liveRegion = document.getElementById('form-live-region');
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'form-live-region';
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    form.appendChild(liveRegion);
  }

  // Expression régulière pour valider l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Fonction de validation de l'email
  function isValidEmail(email) {
    return emailRegex.test(email);
  }

  // Fonction de validation du nom (minimum 3 caractères)
  function isValidName(name) {
    return name.trim().length >= 3;
  }

  // Fonction de validation du sujet (minimum 3 caractères)
  function isValidSubject(subject) {
    return subject.trim().length >= 3;
  }

  // Fonction de validation du message (non vide)
  function isValidMessage(message) {
    return message.trim().length > 0;
  }

  // Fonction pour afficher une erreur
  function showError(errorElement, message) {
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }

  // Fonction pour masquer une erreur
  function hideError(errorElement) {
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  }

  // Fonction pour valider tous les champs
  function validateForm() {
    let isValid = true;

    // Validation du nom
    if (!isValidName(nameInput.value)) {
      showError(nameError, 'Le nom doit contenir au moins 3 caractères');
      isValid = false;
    } else {
      hideError(nameError);
    }

    // Validation de l'email
    if (!isValidEmail(emailInput.value)) {
      showError(emailError, 'Veuillez entrer une adresse email valide');
      isValid = false;
    } else {
      hideError(emailError);
    }

    // Validation du sujet
    if (!isValidSubject(subjectInput.value)) {
      showError(subjectError, 'Le sujet doit contenir au moins 3 caractères');
      isValid = false;
    } else {
      hideError(subjectError);
    }

    // Validation du message
    if (!isValidMessage(messageInput.value)) {
      showError(messageError, 'Le message ne peut pas être vide');
      isValid = false;
    } else {
      hideError(messageError);
    }

    // Validation du consentement RGPD
    if (privacyConsent && !privacyConsent.checked) {
      isValid = false;
    }

    // Activer/désactiver le bouton
    if (submitBtn) {
      if (isValid && (!privacyConsent || privacyConsent.checked)) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-disabled');
      } else {
        submitBtn.disabled = true;
        submitBtn.classList.add('btn-disabled');
      }
    }

    return isValid && (!privacyConsent || privacyConsent.checked);
  }

  // Validation en temps réel
  nameInput.addEventListener('input', function() {
    if (nameInput.value.trim().length >= 3) {
      hideError(nameError);
    }
    validateForm();
  });

  nameInput.addEventListener('blur', function() {
    if (!isValidName(nameInput.value)) {
      showError(nameError, 'Le nom doit contenir au moins 3 caractères');
    }
    validateForm();
  });

  emailInput.addEventListener('input', function() {
    if (isValidEmail(emailInput.value)) {
      hideError(emailError);
    }
    validateForm();
  });

  emailInput.addEventListener('blur', function() {
    if (!isValidEmail(emailInput.value)) {
      showError(emailError, 'Veuillez entrer une adresse email valide');
    }
    validateForm();
  });

  subjectInput.addEventListener('input', function() {
    if (subjectInput.value.trim().length >= 3) {
      hideError(subjectError);
    }
    validateForm();
  });

  subjectInput.addEventListener('blur', function() {
    if (!isValidSubject(subjectInput.value)) {
      showError(subjectError, 'Le sujet doit contenir au moins 3 caractères');
    }
    validateForm();
  });

  messageInput.addEventListener('input', function() {
    if (isValidMessage(messageInput.value)) {
      hideError(messageError);
    }
    validateForm();
  });

  messageInput.addEventListener('blur', function() {
    if (!isValidMessage(messageInput.value)) {
      showError(messageError, 'Le message ne peut pas être vide');
    }
    validateForm();
  });

  // Validation du consentement RGPD
  if (privacyConsent) {
    privacyConsent.addEventListener('change', function() {
      validateForm();
    });
  }

  // Validation initiale
  validateForm();

  // Gestion de la soumission du formulaire
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Désactiver le bouton pendant l'envoi
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('btn-disabled');
      submitBtn.textContent = 'Envoi en cours...';
    }

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Succès
        if (liveRegion) {
          liveRegion.textContent = 'Message envoyé avec succès. Nous revenons vers vous rapidement.';
        }
        alert('Message envoyé. Nous revenons vers vous rapidement.');
        form.reset();
        validateForm(); // Réinitialiser l'état du bouton
        if (liveRegion) {
          setTimeout(() => { liveRegion.textContent = ''; }, 5000);
        }
      } else {
        // Erreur
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      // Erreur réseau ou autre
      const errorMsg = 'Une erreur est survenue. Merci de réessayer ou d\'écrire à contact@velosbibi.fr';
      if (liveRegion) {
        liveRegion.textContent = errorMsg;
      }
      alert(errorMsg);
      
      // Réactiver le bouton
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-disabled');
        submitBtn.textContent = 'Envoyer le message';
        validateForm();
      }
    }
  });
})();

