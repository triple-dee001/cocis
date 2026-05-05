document.addEventListener('DOMContentLoaded', () => {

  // ---- ANNOUNCEMENT POPUP ----
  const popupOverlay = document.getElementById('popupOverlay');
  const popupClose = document.getElementById('popupClose');
  const popupDismiss = document.getElementById('popupDismiss');

  // Show popup after a short delay
  setTimeout(() => {
    if (popupOverlay) popupOverlay.classList.add('active');
  }, 1500);

  function closePopup() {
    if (popupOverlay) popupOverlay.classList.remove('active');
  }
  if (popupClose) popupClose.addEventListener('click', closePopup);
  if (popupDismiss) popupDismiss.addEventListener('click', closePopup);
  // Close on clicking outside the card
  if (popupOverlay) {
    popupOverlay.addEventListener('click', (e) => {
      if (e.target === popupOverlay) closePopup();
    });
  }

  // ---- NAVBAR: Scroll background change ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ---- MOBILE MENU TOGGLE ----
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const el = document.querySelector(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- SCROLL REVEAL ANIMATION ----
  const revealElements = document.querySelectorAll(
    '.section-header, .event-block, .sport-card, .culture-card, .awards-card, .exec-card'
  );
  revealElements.forEach(el => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

});
