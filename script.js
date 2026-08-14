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

// === Init ===
document.addEventListener('DOMContentLoaded', createSparkles);
