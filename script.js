/**
 * COGNIFYZ TECHNOLOGIES - WEB DEVELOPER INTERNSHIP LANDING PAGE
 * Interactive Logic & Dynamic UI Components
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initThemeToggle();
  initNavbarScroll();
  initMobileMenu();
  initStatsCounter();
  initSkillsFilter();
  initFaqAccordion();
  initApplicationForm();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. DARK / LIGHT THEME TOGGLE WITH LOCALSTORAGE
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  // Read saved theme preference or system preference
  const savedTheme = localStorage.getItem('cognifyz_theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('cognifyz_theme', newTheme);
  });
}

/* --------------------------------------------------------------------------
   2. NAVBAR STICKY GLASS EFFECT & ACTIVE LINK HIGHLIGHTING
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');

  window.addEventListener('scroll', () => {
    // Add scrolled class for glass background shadow
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link detection
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. MOBILE MENU TOGGLE
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
  });

  // Close mobile drawer when clicking any link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    });
  });
}

/* --------------------------------------------------------------------------
   4. ANIMATED METRICS STATS COUNTER
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 2000; // ms
          const step = Math.ceil(target / (duration / 16));
          let current = 0;

          const updateCount = () => {
            current += step;
            if (current >= target) {
              counter.innerText = target.toLocaleString();
            } else {
              counter.innerText = current.toLocaleString();
              requestAnimationFrame(updateCount);
            }
          };
          updateCount();
        });
      }
    });
  }, { threshold: 0.5 });

  const heroSection = document.getElementById('hero');
  if (heroSection) {
    observer.observe(heroSection);
  }
}

/* --------------------------------------------------------------------------
   5. SKILLS MATRIX TAB FILTERING
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const tabBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active state from all buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-category');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other open items
      faqItems.forEach(i => i.classList.remove('active'));

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. APPLICATION FORM VALIDATION & MODAL FEEDBACK
   -------------------------------------------------------------------------- */
function initApplicationForm() {
  const form = document.getElementById('applicationForm');
  const modal = document.getElementById('successModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalConfirmBtn = document.getElementById('modalConfirmBtn');
  const submittedNameElem = document.getElementById('submittedApplicantName');
  const submittedEmailElem = document.getElementById('submittedApplicantEmail');
  const submitBtn = document.getElementById('submitAppBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset error states
    let isValid = true;
    const inputs = form.querySelectorAll('.form-group');
    inputs.forEach(group => group.classList.remove('has-error'));

    // Validate Full Name
    const nameInput = document.getElementById('fullName');
    if (!nameInput.value.trim()) {
      showError(nameInput, 'fullNameError');
      isValid = false;
    }

    // Validate Email
    const emailInput = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
      showError(emailInput, 'emailError');
      isValid = false;
    }

    // Validate Phone
    const phoneInput = document.getElementById('phone');
    if (!phoneInput.value.trim()) {
      showError(phoneInput, 'phoneError');
      isValid = false;
    }

    // Validate Duration Select
    const durationInput = document.getElementById('duration');
    if (!durationInput.value) {
      showError(durationInput, 'durationError');
      isValid = false;
    }

    // Validate Tech Skills Select
    const techSkillsInput = document.getElementById('techSkills');
    if (!techSkillsInput.value) {
      showError(techSkillsInput, 'techSkillsError');
      isValid = false;
    }

    if (!isValid) return;

    // Show Loading Feedback on button
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').innerText = 'Submitting Application...';
    submitBtn.querySelector('.btn-icon').className = 'fa-solid fa-circle-notch fa-spin btn-icon';

    // Simulate submission delay
    setTimeout(() => {
      // Set applicant info in modal
      submittedNameElem.innerText = nameInput.value.trim();
      submittedEmailElem.innerText = emailInput.value.trim();

      // Show success modal
      modal.classList.add('active');

      // Reset form & button
      form.reset();
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').innerText = 'Submit Application';
      submitBtn.querySelector('.btn-icon').className = 'fa-solid fa-paper-plane btn-icon';
    }, 1200);
  });

  // Helper function to show validation errors
  function showError(inputElem, errorId) {
    const formGroup = inputElem.closest('.form-group');
    if (formGroup) {
      formGroup.classList.add('has-error');
    }
  }

  // Modal Close Handlers
  const closeModal = () => modal.classList.remove('active');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalConfirmBtn) modalConfirmBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

/* --------------------------------------------------------------------------
   8. SMOOTH SCROLL HELPER
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
