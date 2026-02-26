/* =================================
   HELPER FUNCTIONS
   ================================= */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* =================================
   HEART BURST ON CLICK
   ================================= */
document.body.addEventListener('click', (event) => {
  // Don't burst on interactive elements
  if (
    event.target.tagName === 'BUTTON' ||
    event.target.tagName === 'TEXTAREA' ||
    event.target.tagName === 'INPUT' ||
    event.target.closest('a')
  ) {
    return;
  }

  const x = event.clientX;
  const y = event.clientY;

  const hearts = ['❤️', '💗', '💕', '💖', '💝'];

  for (let i = 0; i < 5; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-burst';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    // Random burst direction
    const angle = (Math.PI * 2 * i) / 5;
    const velocity = 100 + Math.random() * 200;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity - 100;

    heart.style.setProperty('--tx', `${tx}px`);
    heart.style.setProperty('--ty', `${ty}px`);
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';

    document.body.appendChild(heart);

    // Remove after animation
    setTimeout(() => heart.remove(), 1000);
  }
});

/* =================================
   3D CARD TILT EFFECT
   ================================= */
const cardWrapper = $('#card-wrapper');
const cardInner = $('.card-inner');

if (cardWrapper) {
  cardWrapper.addEventListener('mousemove', (e) => {
    const rect = cardWrapper.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const angleX = (mouseY - centerY) / 10;
    const angleY = -(mouseX - centerX) / 10;

    cardInner.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
    cardInner.style.transition = 'none';
  });

  cardWrapper.addEventListener('mouseleave', () => {
    cardInner.style.transform =
      'rotateX(0) rotateY(0) scale(1)';
    cardInner.style.transition =
      'transform 0.5s cubic-bezier(0.23, 1, 0.320, 1)';
  });
}

/* =================================
   IMAGE UPLOAD
   ================================= */
// Static image - upload manually to /assets/images/birthday-photo.jpg

/* =================================
   GALLERY MODAL
   ================================= */
const modal = $('#imageModal');
const modalImg = $('#modalImg');
const modalClose = $('.modal-close');

$$('.gallery-img').forEach((img) => {
  img.addEventListener('click', () => {
    modal.classList.add('show');
    modalImg.src = img.src;
  });
});

// Close modal
modalClose.addEventListener('click', () => {
  modal.classList.remove('show');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.remove('show');
  }
});

/* =================================
   CHARACTER COUNT FOR WISHES
   ================================= */
const wishInput = $('#wishInput');
const charCount = $('#charCount');

if (wishInput) {
  wishInput.addEventListener('input', () => {
    charCount.textContent = wishInput.value.length;
  });
}

/* =================================
   WISHES & LOCALSTORAGE
   ================================= */
function loadWishesFromStorage() {
  const wishes = JSON.parse(localStorage.getItem('birthdayWishes') || '[]');
  const wishesWall = $('#wishesWall');
  wishesWall.innerHTML = '';

  wishes.forEach((wish) => {
    const wishCard = document.createElement('div');
    wishCard.className = 'wish-card';

    const timestamp = new Date(wish.time).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    wishCard.innerHTML = `
      <p>${escapeHtml(wish.text)}</p>
      <small>📅 ${timestamp}</small>
    `;
    wishesWall.appendChild(wishCard);
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Load wishes on page load
loadWishesFromStorage();

// Send wish button
const sendWishBtn = $('#sendWish');
if (sendWishBtn) {
  sendWishBtn.addEventListener('click', () => {
    const text = wishInput.value.trim();

    if (!text || text.length === 0) {
      alert('Please write a message first! ✨');
      return;
    }

    // Get existing wishes
    const wishes = JSON.parse(localStorage.getItem('birthdayWishes') || '[]');

    // Add new wish
    wishes.unshift({
      text: text,
      time: new Date().toISOString(),
    });

    // Save to localStorage (keep last 50 wishes)
    localStorage.setItem('birthdayWishes', JSON.stringify(wishes.slice(0, 50)));

    // Clear input and reset counter
    wishInput.value = '';
    charCount.textContent = '0';

    // Reload wishes display
    loadWishesFromStorage();

    // Auto scroll to wishes wall
    setTimeout(() => {
      $('#wishesWall').scrollIntoView({ behavior: 'smooth' });
    }, 300);
  });
}

// Allow Enter key to send wish (Ctrl/Cmd + Enter)
if (wishInput) {
  wishInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      sendWishBtn.click();
    }
  });
}

/* =================================
   SURPRISE BUTTON & POPUP
   ================================= */
const surpriseBtn = $('#surpriseBtn');
const popup = $('#surprisePopup');
const popupClose = $('.popup-close');
const closePopupBtn = $('#closePopup');

if (surpriseBtn) {
  surpriseBtn.addEventListener('click', () => {
    popup.classList.add('show');
    launchConfetti();
    triggerFireworks();
  });
}

popupClose.addEventListener('click', () => {
  popup.classList.remove('show');
});

closePopupBtn.addEventListener('click', () => {
  popup.classList.remove('show');
});

popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.classList.remove('show');
  }
});

// Close popup on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && popup.classList.contains('show')) {
    popup.classList.remove('show');
  }
});

/* =================================
   CONFETTI ANIMATION
   ================================= */
function launchConfetti() {
  const confettiPieces = [];
  const colors = ['#ff00cc', '#6600ff', '#ff1493', '#00ccff', '#ffcc00'];

  for (let i = 0; i < 100; i++) {
    confettiPieces.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight - window.innerHeight,
      r: Math.random() * 5 + 2,
      vx: Math.random() * 6 - 3,
      vy: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
    });
  }

  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '2999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiPieces.forEach((p, index) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1; // gravity
      p.life -= 0.01;

      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.r, p.r);

      if (p.life <= 0) {
        confettiPieces.splice(index, 1);
      }
    });

    if (confettiPieces.length > 0) {
      requestAnimationFrame(animate);
    } else {
      document.body.removeChild(canvas);
    }
  }

  animate();
}

/* =================================
   FIREWORKS ANIMATION
   ================================= */
function triggerFireworks() {
  const fireworksCount = 8;

  for (let i = 0; i < fireworksCount; i++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * (window.innerHeight * 0.5);

      createFirework(x, y);
    }, i * 150);
  }
}

function createFirework(startX, startY) {
  const particles = [];
  const colors = ['#ff00cc', '#6600ff', '#ffff00', '#00ffff', '#ff6600'];

  for (let i = 0; i < 50; i++) {
    const angle = (Math.PI * 2 * i) / 50;
    const velocity = 2 + Math.random() * 8;

    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
      maxLife: 1,
    });
  }

  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '2999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15; // gravity
      p.life -= 0.02;

      const size = (p.life / p.maxLife) * 3;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fill();

      if (p.life <= 0) {
        particles.splice(index, 1);
      }
    });

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    } else {
      document.body.removeChild(canvas);
    }
  }

  animate();
}

/* =================================
   MOBILE NAVIGATION
   ================================= */
const hamburger = $('.hamburger');
const navLinks = $('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Close mobile menu on link click
$$('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

/* =================================
   MUSIC AUTO-PLAY
   ================================= */
const bgMusic = $('#birthdaySong');

// Auto-play music when page loads
// Browser policy: Audio auto-plays muted, unmutes after first user interaction
window.addEventListener('load', () => {
  if (bgMusic) {
    bgMusic.play().catch((err) => {
      console.log('Autoplay prevented by browser policy');
    });
  }
});

// Unmute on first user interaction
document.addEventListener('click', () => {
  if (bgMusic && bgMusic.muted) {
    bgMusic.muted = false;
    bgMusic.play();
  }
}, { once: true });

// Also unmute on first touch (mobile)
document.addEventListener('touchstart', () => {
  if (bgMusic && bgMusic.muted) {
    bgMusic.muted = false;
    bgMusic.play();
  }
}, { once: true });

/* =================================
   PARALLAX SCROLLING
   ================================= */
let ticking = false;

function updateParallax() {
  const scrollY = window.scrollY;

  $$('.story').forEach((el, index) => {
    const parallaxSpeed = 0.1 + index * 0.05;
    el.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
  });

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

/* =================================
   SMOOTH SCROLL
   ================================= */
$$('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = $(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

/* =================================
   PARTICLE ANIMATION BACKGROUND
   ================================= */
const canvas = $('#particles');
const ctx = canvas.getContext('2d');
let particlesArray = [];

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.color = `hsl(${Math.random() * 60 + 280}, 80%, 70%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Initialize particles
function initializeParticles() {
  particlesArray = [];
  const particleCount = Math.floor((canvas.width * canvas.height) / 10000);

  for (let i = 0; i < particleCount; i++) {
    particlesArray.push(new Particle());
  }
}

initializeParticles();
window.addEventListener('resize', initializeParticles);

function animateParticles() {
  ctx.globalAlpha = 1;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

/* =================================
   STORIES TOUCH SWIPE
   ================================= */
const storiesContainer = document.querySelector('.stories-container');

if (storiesContainer) {
  let touchStartX = 0;
  let touchEndX = 0;

  storiesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  storiesContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
      // Swiped left
      storiesContainer.scrollLeft += 400;
    } else if (touchEndX - touchStartX > 50) {
      // Swiped right
      storiesContainer.scrollLeft -= 400;
    }
  }
}

/* =================================
   INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
   ================================= */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
    }
  });
}, observerOptions);

// Observe sections
$$('section').forEach((section) => {
  observer.observe(section);
});

/* =================================
   PAGE LOAD ANIMATION
   ================================= */
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

/* =================================
   PREVENT RIGHT CLICK CONTEXT MENU
   (Optional - remove if not desired)
   ================================= */
// document.addEventListener('contextmenu', (e) => {
//   e.preventDefault();
// });

/* =================================
   LOG STARTUP MESSAGE
   ================================= */
console.log('🎉 Happy Birthday Website Loaded!');
console.log('🎂 Welcome to the birthday celebration!');
console.log('💌 Make a wish and celebrate! ✨');
