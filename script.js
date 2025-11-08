/* ========================================
   PORTFOLIO WEBSITE - MAIN SCRIPTS
   Author: Vicky Narvare
   ======================================== */

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Check if device is mobile/tablet
 * @returns {boolean}
 */
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
         window.innerWidth <= 768 || 
         ('ontouchstart' in window);
}

// ============================================
// LOADING SCREEN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const loadingScreen = document.getElementById('loadingScreen');
  
  if (!loadingScreen || typeof gsap === 'undefined') return;
  
  body.classList.add('loading');
  
  // Get loading elements
  const loadingIcons = loadingScreen.querySelectorAll('.loading-icon-circle');
  const loadingName = loadingScreen.querySelector('.loading-name');
  const loadingTitle = loadingScreen.querySelector('.loading-title');
  const loadingUrl = loadingScreen.querySelector('.loading-url');
  
  // Set initial states
  gsap.set([loadingIcons, loadingName, loadingTitle, loadingUrl], {
    opacity: 0,
    y: 30
  });
  
  // Create animation timeline
  const loadingTL = gsap.timeline();
  
  loadingTL
    .to(loadingIcons, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out'
    })
    .to(loadingName, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.3')
    .to(loadingTitle, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4')
    .to(loadingUrl, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out'
    }, '-=0.3');
  
  // Animate icons pulse
  loadingIcons.forEach((icon, index) => {
    gsap.to(icon, {
      scale: 1.1,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      delay: index * 0.1
    });
  });
  
  // Hide loading screen after animation
  setTimeout(() => {
    gsap.to(loadingScreen, {
      opacity: 0,
      duration: 0.6,
      ease: 'power3.in',
      onComplete: () => {
        loadingScreen.style.display = 'none';
        body.classList.remove('loading');
      }
    });
  }, 1500);
});

// ============================================
// NAVIGATION ACTIVE LINK SYSTEM
// ============================================
let navLinks = [];
let sections = [];

/**
 * Set active navigation link based on scroll position
 */
function setActiveLink() {
  if (navLinks.length === 0 || sections.length === 0) return;
  
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  let activeIndex = 0;
  let maxVisibleArea = 0;
  
  sections.forEach((section, index) => {
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const visibleTop = Math.max(scrollPosition, sectionTop);
      const visibleBottom = Math.min(scrollPosition + windowHeight, sectionBottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      
      if (visibleHeight > maxVisibleArea) {
        maxVisibleArea = visibleHeight;
        activeIndex = index;
      }
      
      // Special cases
      if (scrollPosition < 100) activeIndex = 0;
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        activeIndex = sections.length - 1;
      }
    }
  });
  
  // Update active class
  navLinks.forEach((link, index) => {
    if (index === activeIndex) {
      link.classList.add('active');
      localStorage.setItem('activeNavHref', link.getAttribute('href'));
    } else {
      link.classList.remove('active');
    }
  });
}

// Initialize navigation system
window.addEventListener('DOMContentLoaded', () => {
  // Initialize navLinks and sections after DOM is ready
  navLinks = Array.from(document.querySelectorAll('.nav-link, .mobile-nav-link'));
  sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  
  // Restore active link from localStorage
  const savedActiveHref = localStorage.getItem('activeNavHref');
  if (savedActiveHref && navLinks.length > 0) {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === savedActiveHref) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  setActiveLink();
  
  // Handle nav link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      localStorage.setItem('activeNavHref', this.getAttribute('href'));
      
      // Close mobile menu
      const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
      const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
      const body = document.body;
      if (window.innerWidth <= 768 && mobileMenuOverlay?.classList.contains('active')) {
        mobileMenuOverlay.classList.remove('active');
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        body.style.overflow = '';
      }
    });
  });
});

// Throttle scroll event
let scrollTimeout;
let isScrolling = false;

window.addEventListener('scroll', () => {
  if (!isScrolling) {
    requestAnimationFrame(() => {
      setActiveLink();
      isScrolling = false;
    });
    isScrolling = true;
  }
  
  if (scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(setActiveLink, 50);
});

// ============================================
// MOBILE MENU & DARK MODE TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector("body");
  const modeToggle = document.querySelector(".theme-toggle");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const mobileMenuClose = document.querySelector(".mobile-menu-close");

  // Initialize dark mode
  try {
    if (localStorage.getItem("mode") === "dark-mode") {
      body.classList.add("dark");
      if (modeToggle) modeToggle.classList.add("active");
    }
  } catch (error) {
    console.warn("LocalStorage not available:", error);
  }

  // Theme toggle
  if (modeToggle) {
    modeToggle.addEventListener("click", () => {
      try {
        body.classList.toggle("dark");
        localStorage.setItem(
          "mode",
          body.classList.contains("dark") ? "dark-mode" : "light-mode"
        );
      } catch (error) {
        console.error("Error toggling dark mode:", error);
      }
    });
  }

  // Mobile menu toggle
  if (mobileMenuToggle && mobileMenuOverlay) {
    mobileMenuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      mobileMenuToggle.classList.toggle("active");
      mobileMenuOverlay.classList.toggle("active");
      body.style.overflow = mobileMenuOverlay.classList.contains("active") ? "hidden" : "";
    });
  }

  // Close mobile menu
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (mobileMenuToggle) mobileMenuToggle.classList.remove("active");
      if (mobileMenuOverlay) mobileMenuOverlay.classList.remove("active");
      body.style.overflow = "";
    });
  }

  // Close mobile menu when clicking overlay
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", (e) => {
      if (e.target === mobileMenuOverlay) {
        if (mobileMenuToggle) mobileMenuToggle.classList.remove("active");
        mobileMenuOverlay.classList.remove("active");
        body.style.overflow = "";
      }
    });
  }

  // Close mobile menu on window resize if screen becomes large
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      if (mobileMenuToggle) mobileMenuToggle.classList.remove("active");
      if (mobileMenuOverlay) mobileMenuOverlay.classList.remove("active");
      body.style.overflow = "";
    }
  });
});

// ============================================
// TOAST NOTIFICATION SYSTEM
// ============================================
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  const toastIcon = toast.querySelector('.toast-icon');
  const toastMessage = toast.querySelector('.toast-message');
  const toastClose = toast.querySelector('.toast-close');
  
  // Set icon based on type
  if (type === 'success') {
    toastIcon.innerHTML = '<i class="bx bx-check-circle"></i>';
    toast.className = 'toast success';
  } else if (type === 'error') {
    toastIcon.innerHTML = '<i class="bx bx-error-circle"></i>';
    toast.className = 'toast error';
  }
  
  toastMessage.textContent = message;
  toast.classList.add('show');
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    hideToast();
  }, 5000);
  
  // Close button functionality
  if (toastClose) {
    toastClose.onclick = () => hideToast();
  }
}

function hideToast() {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.classList.remove('show');
  }
}

// ============================================
// FORM SUBMISSION HANDLING
// ============================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validation
    if (!name || !email || !subject || !message) {
      showToast('Please fill in all fields.', 'error');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    
    // Submit form (replace with actual API call - EmailJS, Formspree, etc.)
    const submitBtn = this.querySelector('.contact_btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      showToast('Thank you for your message! I\'ll get back to you soon.', 'success');
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// ============================================
// COPY EMAIL TO CLIPBOARD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const copyEmailBtn = document.querySelector('.copy-email-btn');
  
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'vickynarvare51@gmail.com';
      const copyText = copyEmailBtn.querySelector('.copy-text');
      
      try {
        // Try modern Clipboard API first
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
          copyEmailBtn.classList.add('copied');
          if (copyText) {
            copyText.textContent = 'Copied!';
          }
          showToast('Email copied to clipboard!', 'success');
          
          // Reset after 3 seconds
          setTimeout(() => {
            copyEmailBtn.classList.remove('copied');
            if (copyText) {
              copyText.textContent = 'Copy';
            }
          }, 3000);
        } else {
          throw new Error('Clipboard API not available');
        }
      } catch (err) {
        // Fallback for older browsers using execCommand
        try {
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.top = '0';
          textArea.style.left = '0';
          textArea.style.width = '2em';
          textArea.style.height = '2em';
          textArea.style.padding = '0';
          textArea.style.border = 'none';
          textArea.style.outline = 'none';
          textArea.style.boxShadow = 'none';
          textArea.style.background = 'transparent';
          textArea.style.opacity = '0';
          
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          
          const successful = document.execCommand('copy');
          document.body.removeChild(textArea);
          
          if (successful) {
            copyEmailBtn.classList.add('copied');
            if (copyText) {
              copyText.textContent = 'Copied!';
            }
            showToast('Email copied to clipboard!', 'success');
            
            setTimeout(() => {
              copyEmailBtn.classList.remove('copied');
              if (copyText) {
                copyText.textContent = 'Copy';
              }
            }, 3000);
          } else {
            throw new Error('execCommand failed');
          }
        } catch (fallbackErr) {
          // If both methods fail, show error
          showToast('Failed to copy email. Please copy manually: ' + email, 'error');
        }
      }
    });
  }
});

// ============================================
// GSAP SMOOTH SCROLLING
// ============================================
let smoothScrollController = null;

function initSmoothScroll() {
  if (typeof gsap === 'undefined' || isMobileDevice()) return;
  
  let current = 0;
  let target = 0;
  const ease = 0.08;
  const container = document.documentElement || document.body;
  
  current = container.scrollTop;
  target = container.scrollTop;
  
  function smoothScroll() {
    const diff = target - current;
    if (Math.abs(diff) > 0.1) {
      current += diff * ease;
      container.scrollTop = current;
    } else {
      current = target;
      container.scrollTop = current;
    }
  }
  
  gsap.ticker.add(smoothScroll);
  
  // Handle wheel events
  let isScrolling = false;
  
  function onWheel(e) {
    e.preventDefault();
    const delta = e.deltaY;
    target += delta;
    const maxScroll = container.scrollHeight - window.innerHeight;
    target = Math.max(0, Math.min(target, maxScroll));
    
    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(() => {
        isScrolling = false;
      });
    }
  }
  
  // Handle touch events
  let touchStartY = 0;
  let touchScrollStart = 0;
  let isTouchScrolling = false;
  
  function onTouchStart(e) {
    touchStartY = e.touches[0].clientY;
    touchScrollStart = container.scrollTop;
    isTouchScrolling = true;
    target = touchScrollStart;
    current = touchScrollStart;
  }
  
  function onTouchMove(e) {
    if (!isTouchScrolling) return;
    const touchY = e.touches[0].clientY;
    const delta = touchStartY - touchY;
    target = touchScrollStart + delta;
    const maxScroll = container.scrollHeight - window.innerHeight;
    target = Math.max(0, Math.min(target, maxScroll));
    container.scrollTop = target;
  }
  
  function onTouchEnd() {
    isTouchScrolling = false;
    current = container.scrollTop;
    target = container.scrollTop;
  }
  
  function syncScroll() {
    if (!isTouchScrolling) {
      const scrollTop = container.scrollTop;
      target = scrollTop;
      current = scrollTop;
    }
  }
  
  // Event listeners
  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('touchend', onTouchEnd, { passive: true });
  
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (isTouchScrolling) return;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(syncScroll, 50);
  }, { passive: true });
  
  // Controller object
  smoothScrollController = {
    scrollTo: (position, duration = 1.2) => {
      gsap.to(container, {
        scrollTop: position,
        duration: duration,
        ease: 'power2.out',
        onUpdate: () => {
          target = container.scrollTop;
          current = container.scrollTop;
        }
      });
    },
    update: syncScroll,
    destroy: () => {
      gsap.ticker.remove(smoothScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    }
  };
  
  // Integrate with ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined') {
    const originalUpdate = smoothScroll;
    gsap.ticker.remove(smoothScroll);
    gsap.ticker.add(() => {
      originalUpdate();
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.update();
      }
    });
  }
}

// Initialize smooth scroll
window.addEventListener('load', () => {
  setTimeout(() => {
    initSmoothScroll();
    if (typeof ScrollTrigger !== 'undefined') {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    }
  }, 500);
});

// ============================================
// SCROLL PROGRESS BAR
// ============================================
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
  function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  }
  
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  
  if (typeof gsap !== 'undefined') {
    gsap.ticker.add(updateScrollProgress);
  }
}

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
function setupSmoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const targetPosition = target.offsetTop - 80;
        const container = document.documentElement || document.body;
        
        if (isMobileDevice()) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        } else if (smoothScrollController) {
          smoothScrollController.scrollTo(targetPosition, 1.2);
        } else if (typeof gsap !== 'undefined') {
          gsap.to(container, {
            scrollTop: targetPosition,
            duration: 1.2,
            ease: 'power2.out'
          });
        } else {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', setupSmoothScrollLinks);

// ============================================
// SERVICE CARDS EXPAND/COLLAPSE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const serviceToggles = document.querySelectorAll('.service-toggle');
  const serviceLinkToggles = document.querySelectorAll('.service-link-toggle');
  const serviceLinkExpands = document.querySelectorAll('.service-link-expand');
  
  serviceToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const serviceCard = toggle.closest('.service-card');
      if (serviceCard) serviceCard.classList.toggle('expanded');
    });
  });
  
  serviceLinkExpands.forEach(expand => {
    expand.addEventListener('click', () => {
      const serviceCard = expand.closest('.service-card');
      if (serviceCard) serviceCard.classList.add('expanded');
    });
  });
  
  serviceLinkToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const serviceCard = toggle.closest('.service-card');
      if (serviceCard) serviceCard.classList.remove('expanded');
    });
  });
});

// ============================================
// VIEW MORE WORKS FUNCTIONALITY
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Projects Carousel Functionality
  const allCards = document.querySelectorAll('.projects-carousel-wrapper .project-preview-card');
  const sidePrevCard = document.querySelector('.projects-carousel-wrapper > .project-preview-card.prev');
  const sideNextCard = document.querySelector('.projects-carousel-wrapper > .project-preview-card.next');
  const activeCard = document.querySelector('.projects-carousel-wrapper > .project-preview-card.active');
  const projectDetails = document.querySelectorAll('.project-detail');
  const projectsContainer = document.querySelector('.projects-carousel-wrapper');
  
  // All project images data
  const projectImages = [
    { src: 'Images/project1.webp', alt: 'Weather Application by Vicky Narvare' },
    { src: 'Images/project2.webp', alt: 'ElectraX Website by Vicky Narvare' },
    { src: 'Images/project3.webp', alt: 'Kalika Construction Website by Vicky Narvare' },
    { src: 'Images/project4.webp', alt: 'JARVIS AI Platform by Vicky Narvare' }
  ];
  
  let currentProjectIndex = 0; // Start with first project (index 0)
  let autoPlayInterval;
  const autoPlayDelay =  3000; // 3 seconds between slides
  const totalProjects = projectImages.length;
  
  // Preload all images for smooth switching
  function preloadImages() {
    projectImages.forEach((imgData) => {
      const img = new Image();
      img.src = imgData.src;
    });
  }
  
  // Preload images on page load
  preloadImages();
  
  function updateCards() {
    const prevIndex = (currentProjectIndex - 1 + totalProjects) % totalProjects;
    const nextIndex = (currentProjectIndex + 1) % totalProjects;
    
    // Helper function to switch image
    function switchImage(imgElement, newSrc, newAlt) {
      if (!imgElement) return;
      
      // Create new image to preload
      const newImg = new Image();
      newImg.onload = () => {
        // Image loaded, now switch
        imgElement.src = newSrc;
        imgElement.alt = newAlt;
      };
      newImg.src = newSrc;
    }
    
    // Update prev card
    if (sidePrevCard) {
      const prevImg = sidePrevCard.querySelector('img');
      switchImage(prevImg, projectImages[prevIndex].src, projectImages[prevIndex].alt);
      sidePrevCard.setAttribute('data-project', prevIndex);
      sidePrevCard.classList.add('prev');
      sidePrevCard.classList.remove('active', 'next');
    }
    
    // Update active card
    if (activeCard) {
      const activeImg = activeCard.querySelector('img');
      switchImage(activeImg, projectImages[currentProjectIndex].src, projectImages[currentProjectIndex].alt);
      activeCard.setAttribute('data-project', currentProjectIndex);
      activeCard.classList.add('active');
      activeCard.classList.remove('prev', 'next');
    }
    
    // Update next card
    if (sideNextCard) {
      const nextImg = sideNextCard.querySelector('img');
      switchImage(nextImg, projectImages[nextIndex].src, projectImages[nextIndex].alt);
      sideNextCard.setAttribute('data-project', nextIndex);
      sideNextCard.classList.add('next');
      sideNextCard.classList.remove('active', 'prev');
    }
    
    // No animations - instant switch
  }
  
  function switchProject(index) {
    if (index < 0 || index >= totalProjects) {
      console.error('Invalid project index:', index);
      return;
    }
    currentProjectIndex = index;
    updateCards();
    
    // Update project details - no animations
    projectDetails.forEach((detail, i) => {
      if (i === index) {
        detail.classList.add('active');
      } else {
        detail.classList.remove('active');
      }
    });
    
    currentProjectIndex = index;
  }
  
  function nextProject() {
    const nextIndex = (currentProjectIndex + 1) % totalProjects;
    switchProject(nextIndex);
  }
  
  function prevProject() {
    const prevIndex = (currentProjectIndex - 1 + totalProjects) % totalProjects;
    switchProject(prevIndex);
  }
  
  function startAutoPlay() {
    // Clear any existing interval first
    stopAutoPlay();
    autoPlayInterval = setInterval(() => {
      nextProject();
    }, autoPlayDelay);
  }
  
  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }
  
  // Card click handlers
  if (sideNextCard) {
    sideNextCard.addEventListener('click', () => {
      nextProject();
      stopAutoPlay();
      startAutoPlay();
    });
  }
  
  if (sidePrevCard) {
    sidePrevCard.addEventListener('click', () => {
      prevProject();
      stopAutoPlay();
      startAutoPlay();
    });
  }
  
  if (activeCard) {
    activeCard.addEventListener('click', () => {
      // Could add functionality here if needed
    });
  }
  
  // Pause auto-play on hover, resume on mouse leave
  if (projectsContainer) {
    projectsContainer.addEventListener('mouseenter', stopAutoPlay);
    projectsContainer.addEventListener('mouseleave', startAutoPlay);
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevProject();
      stopAutoPlay();
      startAutoPlay();
    } else if (e.key === 'ArrowRight') {
      nextProject();
      stopAutoPlay();
      startAutoPlay();
    }
  });
  
  // Initialize cards on page load
  if (sidePrevCard && activeCard && sideNextCard && totalProjects > 0) {
    updateCards();
    
    // Start auto-play when page loads
    startAutoPlay();
    
    console.log('Carousel initialized with', totalProjects, 'projects');
  } else {
    console.error('Carousel elements not found:', {
      sidePrevCard: !!sidePrevCard,
      activeCard: !!activeCard,
      sideNextCard: !!sideNextCard,
      totalProjects: totalProjects
    });
  }
});

// ============================================
// TYPING TEXT ANIMATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const typingText = document.getElementById('typing-text');
  if (!typingText) return;
  
  const texts = [
    'Crafting Clean Interfaces',
    'User Experience Designer',
    'Creating Beautiful Designs'
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function typeText() {
    const currentText = texts[textIndex];
    let typingSpeed = 100;
    
    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
      
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
      }
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
      
      if (charIndex === currentText.length) {
        typingSpeed = 2000;
        isDeleting = true;
      }
    }
    
    setTimeout(typeText, typingSpeed);
  }
  
  setTimeout(typeText, 500);
});