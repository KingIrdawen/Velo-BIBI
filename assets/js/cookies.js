/**
 * Gestion des cookies et consentement
 * Vélos BIBI
 */

(function() {
  'use strict';

  const COOKIE_CONSENT_KEY = 'vb_cookie_consent';
  const COOKIE_BANNER_ID = 'cookie-banner';

  // Vérifier si un consentement existe
  function hasConsent() {
    return localStorage.getItem(COOKIE_CONSENT_KEY) !== null;
  }

  // Obtenir le consentement
  function getConsent() {
    return localStorage.getItem(COOKIE_CONSENT_KEY);
  }

  // Sauvegarder le consentement
  function saveConsent(choice) {
    localStorage.setItem(COOKIE_CONSENT_KEY, choice);
  }

  // Afficher la bannière
  function showBanner() {
    const banner = document.getElementById(COOKIE_BANNER_ID);
    if (banner) {
      banner.classList.add('active');
    }
  }

  // Masquer la bannière
  function hideBanner() {
    const banner = document.getElementById(COOKIE_BANNER_ID);
    if (banner) {
      banner.classList.remove('active');
    }
  }

  // Accepter les cookies
  function acceptCookies() {
    saveConsent('accepted');
    hideBanner();
    // Ici, on pourrait charger des scripts de tracking
    loadTrackingScripts();
  }

  // Refuser les cookies
  function refuseCookies() {
    saveConsent('refused');
    hideBanner();
    // Ne pas charger de scripts de tracking
  }

  // Charger les scripts de tracking (si accepté)
  function loadTrackingScripts() {
    // Cette fonction serait utilisée pour charger Google Analytics, etc.
    // Pour l'instant, elle reste vide car il n'y a pas de tracking dans ce projet
  }

  // Réinitialiser le consentement (pour la page cookies.html)
  function resetConsent() {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    showBanner();
  }

  // Modifier le choix (réafficher la bannière)
  function modifyChoice() {
    // Réafficher la bannière pour permettre de choisir à nouveau
    showBanner();
    // Optionnel : scroll vers la bannière pour améliorer l'UX
    setTimeout(() => {
      const banner = document.getElementById(COOKIE_BANNER_ID);
      if (banner) {
        banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  }

  // Initialisation
  function initCookies() {
    // Vérifier si on est sur la page cookies.html
    const isCookiesPage = window.location.pathname.includes('cookies.html');
    
    // Afficher la bannière uniquement si aucun choix n'existe
    if (!hasConsent() && !isCookiesPage) {
      showBanner();
    }

    // Boutons d'action
    const acceptBtn = document.getElementById('cookie-accept');
    const refuseBtn = document.getElementById('cookie-refuse');
    const resetBtn = document.getElementById('cookie-reset');
    const modifyBtn = document.getElementById('modify-cookie-choice');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', acceptCookies);
    }

    if (refuseBtn) {
      refuseBtn.addEventListener('click', refuseCookies);
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', resetConsent);
    }

    // Lien "Modifier mon choix cookies" dans le footer
    if (modifyBtn) {
      modifyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modifyChoice();
      });
    }

    // Charger les scripts UNIQUEMENT si accepté
    // IMPORTANT : ne pas charger de scripts si refusé
    if (getConsent() === 'accepted') {
      loadTrackingScripts();
    }
  }

  // Exposer les fonctions globalement
  window.resetCookieConsent = resetConsent;
  window.modifyCookieChoice = modifyChoice;

  // Initialisation au chargement
  document.addEventListener('DOMContentLoaded', initCookies);
})();

