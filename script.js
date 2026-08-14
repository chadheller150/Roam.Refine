// === Sparkle System ===
function createSparkles() {
  const container = document.querySelector('.sparkle-container');
  if (!container) return;
  const colors = ['#1b998b', '#b8b8ff', '#ff6b6b', '#1b998b', '#b8b8ff', '#5ce6d6'];
  for (let i = 0; i < 25; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    const color = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.background = color;
    sparkle.style.boxShadow = '0 0 6px ' + color;
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 6 + 's';
    sparkle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    const size = Math.random() * 4 + 2;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    container.appendChild(sparkle);
  }
}

// === Smooth Scroll ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// === Mobile Nav Toggle ===
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// === Nav scroll effect ===
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 50) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// === Intersection Observer for animations ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .case-card, .about-card').forEach(el => {
  observer.observe(el);
});

// === Form Handler ===
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.submit-btn');
  btn.textContent = 'Sent!';
  btn.style.background = 'var(--gradient-2)';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}

// === Slideshow ===
function initSlideshow() {
  const container = document.querySelector('.slideshow-container');
  if (!container) return;

  const slides = container.querySelectorAll('.slide');
  const dotsContainer = container.querySelector('.slide-dots');
  const counter = container.querySelector('.slide-counter');
  const prevBtn = container.querySelector('.slide-prev');
  const nextBtn = container.querySelector('.slide-next');
  let current = 0;
  let autoTimer;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('slide-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(idx) {
    slides[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
    counter.textContent = (current + 1) + ' / ' + slides.length;
    resetAuto();
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Swipe support
  let startX = 0;
  container.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
  container.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo(current - 1);
      else goTo(current + 1);
    }
  });

  // Auto-advance every 5 seconds
  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }
  resetAuto();
}

// === Init ===
document.addEventListener('DOMContentLoaded', () => {
  createSparkles();
  initSlideshow();
});
