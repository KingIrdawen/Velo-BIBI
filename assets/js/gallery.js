/**
 * Galerie avec lightbox et carrousel
 * Vélos BIBI
 */

(function() {
  'use strict';

  let currentIndex = 0;
  let images = [];
  let lightbox = null;
  let lightboxImage = null;
  let lightboxCounter = null;
  let lightboxClose = null;
  let lightboxPrev = null;
  let lightboxNext = null;

  // Initialisation de la galerie
  function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (galleryItems.length === 0) return;

    // Récupérer toutes les images
    images = Array.from(galleryItems).map(img => img.src);

    // Créer la lightbox si elle n'existe pas
    createLightbox();

    // Ajouter les événements de clic et clavier sur les images
    galleryItems.forEach((img, index) => {
      const galleryItem = img.parentElement;
      
      // Clic
      galleryItem.addEventListener('click', function() {
        openLightbox(index);
      });
      
      // Clavier (Entrée et Espace)
      galleryItem.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });
    });
  }

  // Créer la structure de la lightbox
  function createLightbox() {
    if (document.querySelector('.lightbox')) return;

    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Galerie d\'images');

    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Fermer la galerie">×</button>
      <button class="lightbox-nav lightbox-prev" aria-label="Image précédente">‹</button>
      <button class="lightbox-nav lightbox-next" aria-label="Image suivante">›</button>
      <div class="lightbox-content">
        <img class="lightbox-image" src="" alt="Image de la galerie">
        <div class="lightbox-counter"></div>
      </div>
    `;

    document.body.appendChild(lightbox);

    // Récupérer les éléments
    lightboxImage = lightbox.querySelector('.lightbox-image');
    lightboxCounter = lightbox.querySelector('.lightbox-counter');
    lightboxClose = lightbox.querySelector('.lightbox-close');
    lightboxPrev = lightbox.querySelector('.lightbox-prev');
    lightboxNext = lightbox.querySelector('.lightbox-next');

    // Événements
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));
    
    // Fermer au clic en dehors de l'image
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Navigation clavier
    document.addEventListener('keydown', handleKeyboard);
  }

  // Ouvrir la lightbox
  function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus sur le bouton fermer pour l'accessibilité
    setTimeout(() => {
      lightboxClose.focus();
    }, 100);
  }

  // Fermer la lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    
    // Retourner le focus à l'image cliquée
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems[currentIndex]) {
      galleryItems[currentIndex].focus();
    }
  }

  // Naviguer dans la lightbox
  function navigateLightbox(direction) {
    currentIndex += direction;
    
    // Boucle
    if (currentIndex < 0) {
      currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
      currentIndex = 0;
    }
    
    updateLightboxImage();
  }

  // Mettre à jour l'image de la lightbox
  function updateLightboxImage() {
    lightboxImage.src = images[currentIndex];
    lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    lightboxImage.setAttribute('alt', `Image ${currentIndex + 1} de ${images.length}`);
  }

  // Gestion du clavier
  function handleKeyboard(e) {
    if (!lightbox.classList.contains('active')) return;

    switch(e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigateLightbox(-1);
        e.preventDefault();
        break;
      case 'ArrowRight':
        navigateLightbox(1);
        e.preventDefault();
        break;
    }
  }

  // Initialisation au chargement
  document.addEventListener('DOMContentLoaded', initGallery);
})();

