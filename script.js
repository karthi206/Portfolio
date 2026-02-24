'use strict';

// ═══════════════════════════════════════════════
// TYPED TEXT ANIMATION (hero section)
// ═══════════════════════════════════════════════
const typedEl = document.getElementById('typed-text');
const phrases = [
  'AI & Full Stack Developer',
  'Frontend Developer',
  'Hackathon Builder',
  'Cloud Enthusiast',
  'Problem Solver',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function type() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;
    typingSpeed = 40;
  } else {
    typedEl.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;
    typingSpeed = 80;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    // Pause at end of phrase
    typingSpeed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Move to next phrase
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 400;
  }

  setTimeout(type, typingSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
  if (typedEl) setTimeout(type, 600);
});

// ═══════════════════════════════════════════════
// NAVBAR — scroll shadow + active link highlight
// ═══════════════════════════════════════════════
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateNavOnScroll() {
  // Scroll shadow on navbar
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Scroll-to-top button visibility
  const scrollTopBtn = document.getElementById('scrollTopbtn');
  if (scrollTopBtn) {
    scrollTopBtn.style.display =
      (document.documentElement.scrollTop > 200) ? 'flex' : 'none';
  }

  // Active nav link highlight
  let currentSection = '';
  const scrollPos = window.scrollY + header.offsetHeight + 40;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateNavOnScroll, { passive: true });
updateNavOnScroll(); // run once on load

// ═══════════════════════════════════════════════
// MOBILE MENU — hamburger toggle
// ═══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.getElementById('menu-icon');
  const navMenu = document.getElementById('nav-menu');

  if (!menuIcon || !navMenu) return;

  function closeMenu() {
    menuIcon.classList.remove('active');
    navMenu.classList.remove('active');
    menuIcon.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuIcon.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    menuIcon.classList.toggle('active');
    menuIcon.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close when a nav link is clicked
  document.querySelectorAll('#nav-menu .nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside the menu
  document.addEventListener('click', (e) => {
    if (
      navMenu.classList.contains('active') &&
      !navMenu.contains(e.target) &&
      !menuIcon.contains(e.target)
    ) {
      closeMenu();
    }
  });
});

// ═══════════════════════════════════════════════
// SMOOTH SCROLL — nav anchor links
// ═══════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 70;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ═══════════════════════════════════════════════
// SCROLL TO TOP BUTTON
// ═══════════════════════════════════════════════
const scrollTopBtn = document.getElementById('scrollTopbtn');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ═══════════════════════════════════════════════
// DARK MODE TOGGLE — persisted in localStorage
// ═══════════════════════════════════════════════
const toggleBtn = document.getElementById('toggleMode');

// Apply saved theme immediately
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
  if (toggleBtn) toggleBtn.textContent = '☀️';
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
  });
}

// ═══════════════════════════════════════════════
// CONTACT FORM SUBMISSION
// ═══════════════════════════════════════════════
const contactForm = document.getElementById('contactForm');
const thankYouMsg = document.getElementById('thankYouMsg');

if (contactForm && thankYouMsg) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('#submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Loading state
    if (btnText) btnText.style.display = 'none';
    if (btnLoading) btnLoading.style.display = 'inline';
    submitBtn.disabled = true;

    // Simulate async send (replace with actual fetch/emailjs in production)
    setTimeout(() => {
      thankYouMsg.style.display = 'block';
      contactForm.reset();
      if (btnText) btnText.style.display = 'inline';
      if (btnLoading) btnLoading.style.display = 'none';
      submitBtn.disabled = false;

      setTimeout(() => { thankYouMsg.style.display = 'none'; }, 6000);
    }, 1200);
  });
}

// ═══════════════════════════════════════════════
// PROJECT CARD — click navigation + keyboard
// ═══════════════════════════════════════════════
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function () {
    const liveUrl = this.dataset.live;
    const githubUrl = this.dataset.github;
    // If no live demo, open GitHub instead
    const target = (liveUrl && liveUrl !== '#') ? liveUrl : githubUrl;
    if (target) window.open(target, '_blank', 'noopener,noreferrer');
  });

  card.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  });
});

// ═══════════════════════════════════════════════
// INTERSECTION OBSERVER — scroll reveal animations
// ═══════════════════════════════════════════════
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger based on sibling index
      const siblings = Array.from(entry.target.parentElement.children);
      const siblingIndex = siblings.indexOf(entry.target);
      const delay = siblingIndex * 100;

      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, delay);

      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

// Project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.style.transition =
    'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.35s cubic-bezier(.25,.8,.25,1)';
  revealObserver.observe(card);
});

// Timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(item);
});

// Skill categories
document.querySelectorAll('.skill-category').forEach(cat => {
  cat.style.opacity = '0';
  cat.style.transform = 'translateY(30px)';
  cat.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease';
  revealObserver.observe(cat);
});

// Stat boxes
document.querySelectorAll('.stat-box').forEach(box => {
  box.style.opacity = '0';
  box.style.transform = 'translateY(20px)';
  box.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(box);
});

// ═══════════════════════════════════════════════
// SKILL PILL ANIMATION (individual pills)
// ═══════════════════════════════════════════════
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const pills = entry.target.querySelectorAll('.skill');
      pills.forEach((pill, i) => {
        setTimeout(() => pill.classList.add('animate'), i * 80);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.skill-category').forEach(cat => {
  skillObserver.observe(cat);
});

// ═══════════════════════════════════════════════
// DYNAMIC SCROLL PADDING (header height aware)
// ═══════════════════════════════════════════════
function updateScrollPadding() {
  if (header) {
    const h = header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', `${h}px`);
  }
}

window.addEventListener('load', updateScrollPadding);
window.addEventListener('resize', updateScrollPadding);