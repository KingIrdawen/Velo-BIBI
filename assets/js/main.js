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
    
    burger.addEventListener('click', function() {
      burger.classList.toggle('active');
      nav.classList.toggle('active');
    });
    
    // Fermer le menu au clic sur un lien
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        burger.classList.remove('active');
        nav.classList.remove('active');
      });
    });
    
    // Fermer le menu au clic en dehors
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !burger.contains(e.target)) {
        burger.classList.remove('active');
        nav.classList.remove('active');
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

