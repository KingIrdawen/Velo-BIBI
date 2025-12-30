/**
 * Navigation principale et comportements globaux
 * Vélos BIBI
 */

(function() {
  'use strict';

  // Initialisation du menu burger
  function initBurgerMenu() {
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('nav');
    
    if (!burger || !nav) return;
    
    const navLinks = nav.querySelectorAll('a');
    const firstLink = navLinks[0];
    
    function openMenu() {
      burger.classList.add('active');
      nav.classList.add('active');
      burger.setAttribute('aria-expanded', 'true');
      // Empêcher le scroll du body
      document.body.style.overflow = 'hidden';
      // Déplacer le focus sur le premier lien
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
      }
    }
    
    function closeMenu() {
      burger.classList.remove('active');
      nav.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
      // Restaurer le scroll du body
      document.body.style.overflow = '';
      // Remettre le focus sur le bouton burger
      burger.focus();
    }
    
    burger.addEventListener('click', function() {
      const isOpen = burger.classList.contains('active');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    
    // Fermer le menu au clic sur un lien
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });
    
    // Fermer le menu avec Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && burger.classList.contains('active')) {
        closeMenu();
      }
    });
    
    // Fermer le menu au clic en dehors
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
        closeMenu();
      }
    });
  }
  
  // Marquer le lien actif dans la navigation
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
      const linkPage = link.getAttribute('href');
      if (linkPage === currentPage || 
          (currentPage === '' && linkPage === 'index.html') ||
          (currentPage === 'index.html' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
  
  // Initialisation au chargement
  document.addEventListener('DOMContentLoaded', function() {
    initBurgerMenu();
    setActiveNavLink();
  });
})();

