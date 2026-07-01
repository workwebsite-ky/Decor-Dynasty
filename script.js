/* ═══════════════════════════════════════════════════════════════
   DECOR DYNASTY — script.js
   ═══════════════════════════════════════════════════════════════ */

/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('home').classList.add('loaded');
  }, 1900);
});

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

/* ── MOBILE NAV ── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── BACK TO TOP ── */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── SMOOTH SCROLL FOR ANCHOR LINKS ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── INTERSECTION OBSERVER (REVEAL) ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${(i % 4) * 0.08}s`;
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── COUNTER ANIMATION ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const step = Math.ceil(duration / target);
  let current = 0;
  const timer = setInterval(() => {
    current += Math.ceil(target / 60);
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current;
  }, step);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

/* ── TESTIMONIALS SLIDER ── */
const track = document.getElementById('testimonialsTrack');
const cards = track.querySelectorAll('.testimonial-card');
let currentIndex = 0;
const visibleCards = () => window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;

function updateSlider() {
  const visible = visibleCards();
  const cardWidth = cards[0].getBoundingClientRect().width;
  const gap = 24;
  const offset = currentIndex * (cardWidth + gap);
  track.style.transform = `translateX(-${offset}px)`;
  track.style.transition = 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)';
}

document.getElementById('nextTest').addEventListener('click', () => {
  const visible = visibleCards();
  if (currentIndex < cards.length - visible) currentIndex++;
  else currentIndex = 0;
  updateSlider();
});
document.getElementById('prevTest').addEventListener('click', () => {
  const visible = visibleCards();
  if (currentIndex > 0) currentIndex--;
  else currentIndex = cards.length - visible;
  updateSlider();
});

// Auto-advance testimonials
setInterval(() => {
  const visible = visibleCards();
  if (currentIndex < cards.length - visible) currentIndex++;
  else currentIndex = 0;
  updateSlider();
}, 5500);

window.addEventListener('resize', updateSlider, { passive: true });

/* ── FAQ ACCORDION ── */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── CONTACT FORM ── */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const fname    = document.getElementById('fname').value;
  const lname    = document.getElementById('lname').value;
  const email    = document.getElementById('femail').value;
  const phone    = document.getElementById('fphone').value;
  const service  = document.getElementById('fservice').value;
  const message  = document.getElementById('fmessage').value;

  // Mailto fallback
  const subject  = encodeURIComponent(`Interior Design Inquiry – ${service || 'General'}`);
  const body     = encodeURIComponent(
    `Name: ${fname} ${lname}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`
  );
  window.location.href = `mailto:contactglanders@gmail.com?subject=${subject}&body=${body}`;

  // Show success
  this.style.display = 'none';
  const success = document.getElementById('formSuccess');
  success.classList.add('show');
  setTimeout(() => {
    success.classList.remove('show');
    this.style.display = 'flex';
    this.reset();
  }, 6000);
});

/* ── PARALLAX HERO ── */
window.addEventListener('scroll', () => {
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    const scrolled = window.scrollY;
    heroImg.style.transform = `scale(1) translateY(${scrolled * 0.3}px)`;
  }
}, { passive: true });

/* ── ACTIVE NAV LINK HIGHLIGHTING ── */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top <= 100) current = sec.id;
  });
  navLinkEls.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}, { passive: true });
