/* ==========================================================================
   STACKLY — MAIN JAVASCRIPT, AOS & GSAP INTERACTION MODULE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileDrawer();
  initDashSidebarToggle();
  initFaqAccordions();
  initStatCounters();
  initCategoryFilters();
  initRoiCalculator();
  initContactForm();
  initNewsletterForm();
  initAosAnimations();
  initGsapAnimations();
});

/* 1. NAVBAR SCROLL EFFECT */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* 2. MOBILE NAVIGATION DRAWER & DASHBOARD SIDEBAR TOGGLE */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const closeBtn = document.querySelector('.drawer-close');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);
}

function initDashSidebarToggle() {
  // Sidebar toggling is managed cleanly by js/dashboard.js with backdrop overlay support
}

/* 3. FAQ ACCORDION INTERACTION */
function initFaqAccordions() {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      items.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* 4. STAT COUNTERS ANIMATION */
function initStatCounters() {
  const counters = document.querySelectorAll('.counter-value');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-count'), 10) || 0;
        let count = 0;
        const duration = 2000;
        const step = Math.ceil(countTo / (duration / 20));

        const timer = setInterval(() => {
          count += step;
          if (count >= countTo) {
            target.textContent = countTo;
            clearInterval(timer);
          } else {
            target.textContent = count;
          }
        }, 20);

        obs.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* 5. CATEGORY FILTER TABS (PROJECTS / BLOG) */
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const filterCards = document.querySelectorAll('.filterable-card');

  if (filterBtns.length === 0 || filterCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      filterCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 6. INTERACTIVE ROI CALCULATOR */
function initRoiCalculator() {
  const devSlider = document.getElementById('calc-developers');
  const monthSlider = document.getElementById('calc-months');
  const costOutput = document.getElementById('calc-cost');
  const savingsOutput = document.getElementById('calc-savings');

  if (!devSlider || !monthSlider || !costOutput || !savingsOutput) return;

  function updateCalculator() {
    const devs = parseInt(devSlider.value, 10);
    const months = parseInt(monthSlider.value, 10);

    const devLabel = document.getElementById('val-developers');
    const monthLabel = document.getElementById('val-months');
    if (devLabel) devLabel.textContent = devs;
    if (monthLabel) monthLabel.textContent = months;

    const traditionalCost = devs * months * 12500;
    const stacklyCost = Math.round(traditionalCost * 0.42);
    const savings = traditionalCost - stacklyCost;

    costOutput.textContent = `$${stacklyCost.toLocaleString()}`;
    savingsOutput.textContent = `$${savings.toLocaleString()}`;
  }

  devSlider.addEventListener('input', updateCalculator);
  monthSlider.addEventListener('input', updateCalculator);
  updateCalculator();
}

/* 7. CLIENT-SIDE CONTACT FORM & TOAST NOTIFICATION */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value;
    const email = document.getElementById('contact-email')?.value;
    const message = document.getElementById('contact-message')?.value;

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    showToast(`Thank you, ${name}! Your request has been received.`, 'success');
    contactForm.reset();
  });
}

/* 7B. NEWSLETTER SUBSCRIPTION FORM RESET & TOAST */
function initNewsletterForm() {
  const newsletterForm = document.getElementById('newsletter-form');
  if (!newsletterForm) return;

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('newsletter-email');
    if (!emailInput || !emailInput.value) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    showToast('Thank you for subscribing to Engineering Dispatches!', 'success');
    newsletterForm.reset();
  });
}

/* 8. AOS SCROLL ANIMATION INITIALIZATION */
function initAosAnimations() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 850,
      once: false,
      mirror: true,
      offset: 50,
      easing: 'ease-out-back'
    });
  }
}

/* 9. GSAP SCROLL REVEAL ANIMATIONS */
function initGsapAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.gsap-reveal').forEach(element => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  gsap.utils.toArray('.gsap-stagger-container').forEach(container => {
    const children = container.querySelectorAll('.gsap-stagger-item');
    gsap.from(children, {
      scrollTrigger: {
        trigger: container,
        start: 'top 80%'
      },
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out'
    });
  });
}

/* GLOBAL TOAST NOTIFICATION SYSTEM */
function showToast(message, type = 'info') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 2000;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#f43f5e' : '#4f46e5';
  toast.style.cssText = `
    background: ${bgColor};
    color: #ffffff;
    padding: 14px 22px;
    border-radius: 12px;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
    animation: fadeIn 0.3s ease;
    display: flex;
    align-items: center;
    gap: 12px;
  `;
  toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i> ${message}`;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
