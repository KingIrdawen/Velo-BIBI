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
    console.log('Scripts de tracking autorisés (mais non implémentés)');
  }

  // Réinitialiser le consentement (pour la page cookies.html)
  function resetConsent() {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    showBanner();
  }

  // Initialisation
  function initCookies() {
    // Vérifier si on est sur la page cookies.html
    const isCookiesPage = window.location.pathname.includes('cookies.html');
    
    if (!hasConsent() && !isCookiesPage) {
      showBanner();
    }

    // Boutons d'action
    const acceptBtn = document.getElementById('cookie-accept');
    const refuseBtn = document.getElementById('cookie-refuse');
    const resetBtn = document.getElementById('cookie-reset');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', acceptCookies);
    }

    if (refuseBtn) {
      refuseBtn.addEventListener('click', refuseCookies);
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', resetConsent);
    }

    // Charger les scripts si déjà accepté
    if (getConsent() === 'accepted') {
      loadTrackingScripts();
    }
  }

  // Exposer la fonction de réinitialisation globalement
  window.resetCookieConsent = resetConsent;

  // Initialisation au chargement
  document.addEventListener('DOMContentLoaded', initCookies);
})();

