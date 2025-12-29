# Checklist de Tests - Site Vélos BIBI

## ✅ Tests de Navigation

### Menu de navigation
- [ ] Le menu s'affiche correctement sur toutes les pages
- [ ] Le lien de la page courante est marqué comme "actif" (couleur orange)
- [ ] Tous les liens du menu fonctionnent et mènent aux bonnes pages
- [ ] Sur mobile, le menu burger s'ouvre/ferme correctement
- [ ] Le menu burger se ferme au clic sur un lien
- [ ] Le menu burger se ferme au clic en dehors du menu

### Header
- [ ] Le logo est visible et cliquable (retour à l'accueil)
- [ ] Le header reste fixe en haut lors du scroll (sticky)

## ✅ Tests Responsive

### Mobile (≤ 480px)
- [ ] Le menu burger s'affiche correctement
- [ ] Les cartes s'empilent verticalement
- [ ] Les textes sont lisibles
- [ ] Les boutons sont facilement cliquables
- [ ] La galerie s'adapte (grille responsive)

### Tablette (481px - 768px)
- [ ] La mise en page s'adapte correctement
- [ ] Les cartes s'organisent en colonnes
- [ ] Le menu fonctionne correctement

### Desktop (≥ 1024px)
- [ ] Le menu horizontal s'affiche
- [ ] Les cartes sont en grille multi-colonnes
- [ ] La mise en page est optimale

## ✅ Tests des Pages

### Page d'accueil (index.html)
- [ ] Le hero s'affiche avec le titre et les CTA
- [ ] Les 4 cartes "Services Phares" sont visibles
- [ ] Les liens des cartes fonctionnent
- [ ] La section "Notre Engagement" est présente

### Page À propos (a-propos.html)
- [ ] Le contenu de présentation est affiché
- [ ] Les 4 cartes "Valeurs" sont présentes
- [ ] Le texte est bien formaté

### Page Vélos (velos.html)
- [ ] Les 3 cartes de présentation sont visibles
- [ ] Les liens vers "Contact" fonctionnent
- [ ] Le contenu est clair et informatif

### Page Pièces & Accessoires (pieces-accessoires.html)
- [ ] Les 6 cartes de catégories sont affichées
- [ ] Les listes à puces sont bien formatées
- [ ] Le lien de contact fonctionne

### Page Services (services.html)
- [ ] Les 6 cartes de services sont présentes
- [ ] Le contenu détaillé est affiché
- [ ] Les liens vers "Contact" fonctionnent

### Page Réalisations/Galerie (realisations-galerie.html)
- [ ] Les 9 images sont affichées en grille
- [ ] Les images sont cliquables
- [ ] La lightbox s'ouvre au clic
- [ ] La navigation dans la lightbox fonctionne (précédent/suivant)
- [ ] Le compteur affiche "X / 9"
- [ ] La fermeture fonctionne (croix, clic extérieur, Esc)
- [ ] La navigation clavier fonctionne (← / →)
- [ ] La lightbox boucle (de 9 à 1 et vice versa)
- [ ] L'accessibilité est respectée (role="dialog", aria-modal, focus)

### Page Contact (contact.html)
- [ ] Les informations de contact sont affichées (adresse, téléphone, email)
- [ ] Le formulaire est présent
- [ ] Les champs obligatoires sont marqués
- [ ] Le formulaire affiche un message au submit (démonstration)
- [ ] Les liens tel: et mailto: fonctionnent

### Page Mentions légales (mentions-legales.html)
- [ ] Toutes les sections sont présentes
- [ ] Le contenu est complet et formaté

### Page Cookies (cookies.html)
- [ ] Le contenu explicatif est présent
- [ ] Le bouton "Réinitialiser mon choix cookies" fonctionne
- [ ] La bannière réapparaît après réinitialisation

## ✅ Tests de la Bannière Cookies

- [ ] La bannière s'affiche à la première visite
- [ ] Les boutons "Accepter" et "Refuser" fonctionnent
- [ ] Le choix est sauvegardé dans localStorage
- [ ] La bannière ne réapparaît pas après acceptation/refus
- [ ] Le choix persiste après rechargement de la page
- [ ] Le bouton de réinitialisation sur cookies.html fonctionne

## ✅ Tests du Footer

- [ ] Le footer est présent sur toutes les pages
- [ ] Les informations de contact sont correctes
- [ ] Les liens vers Facebook et Instagram fonctionnent (nouvel onglet)
- [ ] Les icônes SVG des réseaux sociaux s'affichent
- [ ] Les liens "Mentions légales" et "Cookies" fonctionnent
- [ ] Le copyright est présent

## ✅ Tests d'Accessibilité

- [ ] Les images ont des attributs alt appropriés
- [ ] Les liens sont descriptifs
- [ ] La navigation au clavier fonctionne (Tab, Enter, Espace)
- [ ] Les focus sont visibles (outline)
- [ ] La lightbox est accessible (role="dialog", aria-modal)
- [ ] Les boutons ont des aria-label appropriés

## ✅ Tests Visuels

- [ ] Les couleurs du logo sont respectées (orange, jaune)
- [ ] Le design est sobre et professionnel
- [ ] Les transitions sont fluides
- [ ] Les hover states sont visibles
- [ ] Les cartes ont un effet au survol
- [ ] Les séparateurs sont visibles

## ✅ Tests Techniques

- [ ] Tous les fichiers CSS et JS se chargent
- [ ] Les images se chargent correctement
- [ ] Aucune erreur dans la console du navigateur
- [ ] Le site fonctionne en local (sans serveur)
- [ ] Les chemins relatifs sont corrects

## ✅ Tests Cross-browser (optionnel mais recommandé)

- [ ] Chrome/Edge (dernière version)
- [ ] Firefox (dernière version)
- [ ] Safari (dernière version)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Notes

- Tous les tests doivent être effectués sur différentes tailles d'écran
- Tester avec et sans JavaScript activé (dégradation gracieuse)
- Vérifier que le localStorage fonctionne correctement
- Tester la navigation au clavier complète

## Commandes utiles pour tester

Pour tester en local, ouvrez simplement les fichiers HTML dans votre navigateur :
```bash
# Sur macOS
open index.html

# Sur Linux
xdg-open index.html

# Ou utilisez un serveur local simple (Python)
python3 -m http.server 8000
# Puis ouvrez http://localhost:8000
```

