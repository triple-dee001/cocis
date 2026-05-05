document.addEventListener('DOMContentLoaded', () => {

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

  // ---- RENDER 16 EXECUTIVES ----
  const execRoles = [
    'President', 'Vice President', 'General Secretary', 'Asst. Secretary',
    'Financial Secretary', 'Treasurer', 'Public Relations Officer', 'Social Director',
    'Sports Director', 'Welfare Director', 'Academic Director', 'Tech Lead',
    'Media Head', 'Logistics Director', 'Events Coordinator', 'Chaplain'
  ];

  const execGrid = document.getElementById('execGrid');
  if (execGrid) {
    execRoles.forEach(role => {
      const card = document.createElement('div');
      card.className = 'exec-card reveal';
      card.innerHTML = `
        <div class="exec-avatar"><i class="bx bx-question-mark"></i></div>
        <h4>Unveiling Soon</h4>
        <p class="exec-role">${role}</p>
      `;
      execGrid.appendChild(card);
    });
  }

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
