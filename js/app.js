(() => {
  const intro = document.getElementById('intro');
  const skip = document.getElementById('skipIntro');
  let closed = false;
  function closeIntro() {
    if (closed) return;
    closed = true;
    intro.classList.add('is-opening');
    window.setTimeout(() => { intro.hidden = true; }, 260);
  }
  window.setTimeout(closeIntro, 2100);
  skip.addEventListener('click', closeIntro);
  intro.addEventListener('click', (event) => {
    if (event.target === intro) closeIntro();
  });

  const trigger = document.getElementById('menuTrigger');
  const drawer = document.getElementById('sideMenu');
  const backdrop = document.getElementById('menuBackdrop');
  const close = document.getElementById('menuClose');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    trigger.setAttribute('aria-expanded', String(open));
    trigger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    drawer.setAttribute('aria-hidden', String(!open));
  }
  trigger.addEventListener('click', () => setMenu(trigger.getAttribute('aria-expanded') !== 'true'));
  close.addEventListener('click', () => setMenu(false));
  backdrop.addEventListener('click', () => setMenu(false));
  drawer.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenu(false);
  });

  // Reemplazar con el número real de WhatsApp de la barbería cuando lo confirmen.
  const whatsappNumber = '';
  const message = encodeURIComponent('Hola REJA, quiero consultar por un turno.');
  document.querySelectorAll('.whatsapp-link').forEach(link => {
    link.href = whatsappNumber ? 'https://wa.me/' + whatsappNumber + '?text=' + message : 'https://wa.me/?text=' + message;
  });
  const revealTargets = document.querySelectorAll('.statement, .gallery-item, .service-card, .booking-art, .booking-copy, .price-panel');
  revealTargets.forEach(el => el.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(el => observer.observe(el));
  } else revealTargets.forEach(el => el.classList.add('visible'));

  // En móvil, anclar el logo directamente al hero para superponerlo a la foto.
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  const heroLogo = document.querySelector('.hero-brand-logo');
  function placeHeroLogo() {
    if (window.matchMedia('(max-width: 760px)').matches) {
      if (heroLogo.parentElement !== hero) hero.insertBefore(heroLogo, heroContent);
    } else {
      if (heroLogo.parentElement !== heroContent) heroContent.insertBefore(heroLogo, heroContent.firstChild);
    }
  }
  placeHeroLogo();
  window.addEventListener('resize', placeHeroLogo);

  // Carrusel automático del hero: foto actual + 5.jpeg + 4.jpeg.
  const heroSlides = Array.from(document.querySelectorAll('.hero-photo'));
  if (heroSlides.length > 1) {
    let activeSlide = 0;
    window.setInterval(() => {
      heroSlides[activeSlide].classList.remove('is-active');
      activeSlide = (activeSlide + 1) % heroSlides.length;
      heroSlides[activeSlide].classList.add('is-active');
    }, 4000);
  }
})();

// REJA: conectar los botones de reserva con la agenda online de Trimito.
(() => {
  const bookingUrl = 'https://trimito.com.ar/wb/?b=reja-barber-shop';
  const bookingLinks = [
    document.querySelector('.hero-actions .button-primary'),
    document.querySelector('.side-book'),
    document.querySelector('#turnos .booking-copy .button')
  ];
  bookingLinks.forEach((link) => {
    if (!link) return;
    link.href = bookingUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
  const turnosButton = document.querySelector('#turnos .booking-copy .button');
  if (turnosButton) {
    const label = turnosButton.querySelector('span');
    turnosButton.textContent = 'RESERVAR TURNO ONLINE ';
    if (label) turnosButton.appendChild(label);
  }
})();


// REJA: mostrar primero la pantalla de reservas propia y conservar Trimito para confirmar.
(() => {
  const localBookingPage = 'reservas.html';
  [document.querySelector('.hero-actions .button-primary'), document.querySelector('.side-book'), document.querySelector('#turnos .booking-copy .button')].forEach((link) => {
    if (!link) return;
    link.href = localBookingPage;
    link.removeAttribute('target');
    link.removeAttribute('rel');
  });
})();


// REJA: agenda online de Agenda Online.
(() => {
  const bookingUrl = 'https://agendaonline.com.ar/reja-barber-shop';
  const bookingLinks = [
    document.querySelector('.hero-actions .button-primary'),
    document.querySelector('.side-book'),
    document.querySelector('#turnos .booking-copy .button')
  ];
  bookingLinks.forEach((link) => {
    if (!link) return;
    link.href = bookingUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
  const turnosButton = document.querySelector('#turnos .booking-copy .button');
  if (turnosButton) {
    const label = turnosButton.querySelector('span');
    turnosButton.textContent = 'RESERVAR TURNO ONLINE ';
    if (label) turnosButton.appendChild(label);
  }
})();
