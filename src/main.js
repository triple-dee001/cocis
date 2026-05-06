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

  // ---- EXECUTIVE MODAL / LIGHTBOX ----
  const execCards = document.querySelectorAll('.exec-card');
  const modalOverlay = document.getElementById('execModalOverlay');
  const modalClose = document.getElementById('execModalClose');
  const modalPrev = document.getElementById('execModalPrev');
  const modalNext = document.getElementById('execModalNext');
  const modalPhoto = document.getElementById('execModalPhoto');
  const modalAvatar = document.getElementById('execModalAvatar');
  const modalName = document.getElementById('execModalName');
  const modalRole = document.getElementById('execModalRole');
  const modalCounter = document.getElementById('execModalCounter');
  const modalBody = document.getElementById('execModalBody');

  // Build array of exec data from the cards
  const execData = [];
  execCards.forEach((card) => {
    const photoEl = card.querySelector('.exec-photo');
    const nameEl = card.querySelector('.exec-name');
    const roleEl = card.querySelector('.exec-role');
    execData.push({
      photoSrc: photoEl ? photoEl.src : '',
      photoAlt: photoEl ? photoEl.alt : '',
      hasPhoto: photoEl ? photoEl.style.display !== 'none' : false,
      name: nameEl ? nameEl.textContent : '',
      role: roleEl ? roleEl.textContent : ''
    });
  });

  let currentExecIndex = 0;
  let isAnimating = false;

  function updateModal(index) {
    const data = execData[index];
    // Check if the original card's photo is actually visible (not hidden by onerror)
    const originalCard = execCards[index];
    const originalPhoto = originalCard.querySelector('.exec-photo');
    const photoVisible = originalPhoto && originalPhoto.style.display !== 'none';

    if (photoVisible && data.photoSrc) {
      modalPhoto.src = data.photoSrc;
      modalPhoto.alt = data.photoAlt;
      modalPhoto.style.display = 'block';
      modalAvatar.style.display = 'none';
    } else {
      modalPhoto.style.display = 'none';
      modalAvatar.style.display = 'flex';
    }
    // Format name nicely (title case)
    const formattedName = data.name
      .toLowerCase()
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    modalName.textContent = formattedName;
    modalRole.textContent = data.role;
    modalCounter.textContent = `${index + 1} of ${execData.length}`;
  }

  function openModal(index) {
    currentExecIndex = index;
    updateModal(index);
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateExec(direction) {
    if (isAnimating) return;
    isAnimating = true;

    const slideOutClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
    modalBody.classList.add(slideOutClass);

    setTimeout(() => {
      if (direction === 'next') {
        currentExecIndex = (currentExecIndex + 1) % execData.length;
      } else {
        currentExecIndex = (currentExecIndex - 1 + execData.length) % execData.length;
      }
      updateModal(currentExecIndex);

      modalBody.classList.remove(slideOutClass);
      // Force reflow so transition plays
      void modalBody.offsetWidth;
      modalBody.classList.add('slide-in');

      setTimeout(() => {
        modalBody.classList.remove('slide-in');
        isAnimating = false;
      }, 300);
    }, 250);
  }

  // Attach click listeners to exec cards
  execCards.forEach((card, i) => {
    card.addEventListener('click', () => openModal(i));
  });

  // Modal controls
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalPrev) modalPrev.addEventListener('click', () => navigateExec('prev'));
  if (modalNext) modalNext.addEventListener('click', () => navigateExec('next'));

  // Close on overlay click
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modalOverlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') navigateExec('prev');
    if (e.key === 'ArrowRight') navigateExec('next');
  });

});
