/**
 * 3D CLAYMORPHISM PORTFOLIO - SIRICHON THUNGKLANG
 * Interactive logic for Splash Screen, Navigation, Filter & Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initNavigation();
  initWorksFilter();
  initLightboxModal();
  initBackToTop();
  initTactileEffects();
});

/* ==========================================================================
   1. SPLASH SCREEN (FIRST VISIT & REFRESH)
   ========================================================================== */
function initSplashScreen() {
  const splashOverlay = document.getElementById('splashScreen');
  const enterBtn = document.getElementById('btnEnterPortfolio');
  const progressBar = document.getElementById('splashProgressBar');

  if (!splashOverlay) return;

  // Animate progress bar
  setTimeout(() => {
    if (progressBar) {
      progressBar.style.width = '100%';
    }
  }, 100);

  // Function to close splash screen with animation
  const closeSplash = () => {
    splashOverlay.classList.add('fade-out');
    document.body.style.overflow = '';
    setTimeout(() => {
      splashOverlay.style.display = 'none';
    }, 700);
  };

  // Prevent scrolling while splash screen is active
  document.body.style.overflow = 'hidden';

  // Allow manual entry on button click
  if (enterBtn) {
    enterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeSplash();
    });
  }

  // Automatic dismiss after ~2.6 seconds
  setTimeout(() => {
    if (!splashOverlay.classList.contains('fade-out')) {
      closeSplash();
    }
  }, 2600);
}

/* ==========================================================================
   2. NAVIGATION & ACTIVE MENU HIGHLIGHT
   ========================================================================== */
function initNavigation() {
  const navLinks = document.querySelectorAll('.clay-nav-btn');
  const sections = document.querySelectorAll('.section-container');
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
    });
  }

  // Close mobile nav when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  });

  // Intersection Observer for scroll spy
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   3. OUTSTANDING WORKS FILTER (ผลงานโดดเด่น)
   ========================================================================== */
function initWorksFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn-clay');
  const workItems = document.querySelectorAll('.work-item-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      workItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterCategory === 'all' || itemCategory === filterCategory) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   4. LIGHTBOX MODAL (เปิดดูภาพหน้าเอกสาร / ผลงานแบบคมชัด)
   ========================================================================== */
function initLightboxModal() {
  const modal = document.getElementById('clayModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalCaption = document.getElementById('modalCaption');
  const btnClose = document.getElementById('btnCloseModal');

  if (!modal) return;

  const openModal = (data) => {
    if (modalImg) modalImg.src = data.imgSrc || '';
    if (modalTitle) modalTitle.textContent = data.title || 'รายละเอียดผลงาน';
    if (modalSubtitle) modalSubtitle.textContent = data.subtitle || '';
    if (modalCaption) modalCaption.innerHTML = data.caption || '';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Close triggers
  if (btnClose) btnClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Attach to all cards and preview images with [data-modal]
  document.querySelectorAll('[data-modal]').forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const data = {
        imgSrc: element.getAttribute('data-img'),
        title: element.getAttribute('data-title'),
        subtitle: element.getAttribute('data-subtitle'),
        caption: element.getAttribute('data-caption')
      };
      openModal(data);
    });
  });
}

/* ==========================================================================
   5. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btnTop = document.getElementById('btnBackToTop');
  if (!btnTop) return;

  btnTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   6. TACTILE SQUISHY CLAY INTERACTIONS
   ========================================================================== */
function initTactileEffects() {
  // Add slight spring sound effect simulation or tactile transform
  const clayButtons = document.querySelectorAll('.btn-clay-primary, .btn-clay-secondary, .filter-btn-clay, .clay-nav-btn');

  clayButtons.forEach(btn => {
    btn.addEventListener('mousedown', () => {
      btn.style.transform = 'translateY(2px) scale(0.97)';
    });
    btn.addEventListener('mouseup', () => {
      btn.style.transform = '';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}
