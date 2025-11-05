// ===============================
// LOADING SCREEN WITH GSAP
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const loadingScreen = document.getElementById('loadingScreen');
  
  if (!loadingScreen) return;
  
  // Add loading class to body
  body.classList.add('loading');
  
  // Get loading elements
  const loadingIcons = loadingScreen.querySelectorAll('.loading-icon-circle');
  const loadingName = loadingScreen.querySelector('.loading-name');
  const loadingTitle = loadingScreen.querySelector('.loading-title');
  const loadingUrl = loadingScreen.querySelector('.loading-url');
  
  // Set initial states for GSAP animation
  gsap.set([loadingIcons, loadingName, loadingTitle, loadingUrl], {
    opacity: 0,
    y: 30
  });
  
  // Create loading animation timeline
  const loadingTL = gsap.timeline();
  
  // Animate icons with stagger
  loadingTL.to(loadingIcons, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power3.out'
  })
  // Animate name
  .to(loadingName, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.3')
  // Animate title
  .to(loadingTitle, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.4')
  // Animate URL
  .to(loadingUrl, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'power3.out'
  }, '-=0.3');
  
  // Animate icons pulse with GSAP (using filter drop-shadow for better animation)
  loadingIcons.forEach((icon, index) => {
    // Create a timeline for each icon's pulse animation
    const pulseTL = gsap.timeline({ repeat: -1, delay: index * 0.3 });
    
    pulseTL.to(icon, {
      filter: 'drop-shadow(0 0 30px rgba(64, 112, 244, 0.8)) drop-shadow(0 0 60px rgba(48, 86, 211, 0.6))',
      duration: 2,
      ease: 'sine.inOut'
    })
    .to(icon, {
      filter: 'drop-shadow(0 0 20px rgba(64, 112, 244, 0.6)) drop-shadow(0 0 40px rgba(48, 86, 211, 0.4))',
      duration: 2,
      ease: 'sine.inOut'
    });
    
    // Also animate scale slightly for more dynamic effect
    gsap.to(icon, {
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.3
    });
  });
  
  // Wait for all resources to load
  window.addEventListener('load', () => {
    // Minimum display time for loading screen (1.5 seconds)
    setTimeout(() => {
      if (loadingScreen) {
        // Create page reveal transition
        const mainContent = document.querySelector('main');
        const navbar = document.querySelector('.navbar');
        
        // Set initial state for page reveal
        if (mainContent) {
          gsap.set(mainContent, { opacity: 0, y: 30 });
        }
        if (navbar) {
          gsap.set(navbar, { opacity: 0, y: -20 });
        }
        
        // Create exit animation timeline
        const exitTL = gsap.timeline({
          onComplete: () => {
            loadingScreen.classList.add('hidden');
            body.classList.remove('loading');
            
            // Reveal main content and navbar with smooth transition
            const revealTL = gsap.timeline();
            
            if (navbar) {
              revealTL.to(navbar, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
              });
            }
            
            if (mainContent) {
              revealTL.to(mainContent, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out'
              }, '-=0.4');
            }
            
            // Refresh ScrollTrigger after content is revealed
            revealTL.call(() => {
              setTimeout(() => {
                ScrollTrigger.refresh();
              }, 100);
            });
            
            // Remove loading screen from DOM after fade out
            setTimeout(() => {
              if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.remove();
              }
            }, 300);
          }
        });
        
        // Animate loading screen exit with scale and fade
        exitTL.to(loadingScreen, {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: 'power3.in'
        });
      }
    }, 1500);
  });
});

// ===============================
// NAVIGATION ACTIVE LINK SYSTEM
// ===============================
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);


// Restore active link from localStorage on load
window.addEventListener('DOMContentLoaded', () => {
  const savedActiveHref = localStorage.getItem('activeNavHref');
  if (savedActiveHref) {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === savedActiveHref) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  setActiveLink();
});

function setActiveLink() {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  let activeIndex = 0;
  let maxVisibleArea = 0;
  
  // Find the section with the most visible area
  sections.forEach((section, index) => {
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      // Calculate visible area of this section
      const visibleTop = Math.max(scrollPosition, sectionTop);
      const visibleBottom = Math.min(scrollPosition + windowHeight, sectionBottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      
      // If this section has more visible area, make it active
      if (visibleHeight > maxVisibleArea) {
        maxVisibleArea = visibleHeight;
        activeIndex = index;
      }
      
      // Special case: if we're at the very top of the page
      if (scrollPosition < 100) {
        activeIndex = 0;
      }
      
      // Special case: if we're near the bottom of the page, activate last section
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        activeIndex = sections.length - 1;
      }
    }
  });
  
  // Update active class for navigation links
  navLinks.forEach((link, index) => {
    if (index === activeIndex) {
      link.classList.add('active');
      localStorage.setItem('activeNavHref', link.getAttribute('href'));
    } else {
      link.classList.remove('active');
    }
  });
}

// Throttle scroll event for better performance
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
  
  // Also use timeout as backup for very fast scrolling
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  scrollTimeout = setTimeout(setActiveLink, 50);
});
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    localStorage.setItem('activeNavHref', this.getAttribute('href'));
    // Close mobile menu on mobile after click
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    if (window.innerWidth < 900 && mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
      mobileMenuOverlay.classList.remove('active');
      const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
      if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// ===============================
// MOBILE MENU, DARK MODE, AND TOGGLES
// ===============================
const body = document.querySelector("body");
const navbar = document.querySelector(".navbar");
const modeToggle = document.querySelector(".theme-toggle");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
const mobileMenuClose = document.querySelector(".mobile-menu-close");

// Initialize dark mode with error handling
try {
  if (localStorage.getItem("mode") === "dark-mode") {
    body.classList.add("dark");
    if (modeToggle) {
      modeToggle.classList.add("active");
    }
  }
} catch (error) {
  // Uncomment for debugging: console.warn("LocalStorage not available:", error);
}

// Theme toggle with error handling
if (modeToggle) {
  modeToggle.addEventListener("click", () => {
    try {
      body.classList.toggle("dark");
      localStorage.setItem(
        "mode",
        body.classList.contains("dark") ? "dark-mode" : "light-mode"
      );
    } catch (error) {
      // Uncomment for debugging: console.error("Error toggling dark mode:", error);
    }
  });
} else {
  // Uncomment for debugging: console.warn("Theme toggle button not found");
}

// Mobile menu toggle
if (mobileMenuToggle && mobileMenuOverlay) {
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active");
    mobileMenuOverlay.classList.toggle("active");
    body.style.overflow = mobileMenuOverlay.classList.contains("active") ? "hidden" : "";
  });
} else {
  // Uncomment for debugging: console.warn("Mobile menu elements not found");
}

// Close mobile menu
if (mobileMenuClose) {
  mobileMenuClose.addEventListener("click", () => {
    mobileMenuToggle.classList.remove("active");
    mobileMenuOverlay.classList.remove("active");
    body.style.overflow = "";
  });
}

// Close mobile menu when clicking overlay
if (mobileMenuOverlay) {
  mobileMenuOverlay.addEventListener("click", (e) => {
    if (e.target === mobileMenuOverlay) {
      mobileMenuToggle.classList.remove("active");
      mobileMenuOverlay.classList.remove("active");
      body.style.overflow = "";
    }
  });
}

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (mobileMenuOverlay.classList.contains("active")) {
      mobileMenuToggle.classList.remove("active");
      mobileMenuOverlay.classList.remove("active");
      body.style.overflow = "";
    }
  });
});

// ===============================
// FORM SUBMISSION HANDLING
// ===============================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Simulate form submission (replace with actual form handling)
    const submitBtn = this.querySelector('.contact_btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      alert('Thank you for your message! I\'ll get back to you soon.');
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// ===============================
// GSAP SMOOTH SCROLLING
// ===============================
let smoothScrollController = null;

// Check if device is mobile/tablet
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
         window.innerWidth <= 768 || 
         ('ontouchstart' in window);
}

function initSmoothScroll() {
  if (typeof gsap === 'undefined') return;
  
  // Disable smooth scroll on mobile devices
  if (isMobileDevice()) {
    return;
  }

  let current = 0;
  let target = 0;
  const ease = 0.08; // Easing factor (lower = smoother but slower)

  // Get scroll container
  const container = document.documentElement || document.body;
  
  // Initialize scroll values
  current = container.scrollTop;
  target = container.scrollTop;

  // Smooth scroll update function using GSAP ticker
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

  // Add to GSAP ticker for smooth updates
  gsap.ticker.add(smoothScroll);

  // Handle wheel events
  let isScrolling = false;
  
  function onWheel(e) {
    e.preventDefault();
    
    const delta = e.deltaY;
    target += delta;
    
    // Clamp target within scroll bounds
    const maxScroll = container.scrollHeight - window.innerHeight;
    target = Math.max(0, Math.min(target, maxScroll));
    
    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(() => {
        isScrolling = false;
      });
    }
  }

  // Handle touch events for mobile
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

  // Update target on programmatic scroll
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
  
  // Sync on scroll events (for ScrollTrigger and other programmatic scrolling)
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (isTouchScrolling) return;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(syncScroll, 50);
  }, { passive: true });

  // Store controller for external use
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
    // Update ScrollTrigger when smooth scroll position changes
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

// Initialize smooth scroll after page loads
window.addEventListener('load', () => {
  setTimeout(() => {
    initSmoothScroll();
    // Refresh ScrollTrigger after smooth scroll is initialized
    if (typeof ScrollTrigger !== 'undefined') {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    }
  }, 500);
});

// ===============================
// SCROLL PROGRESS BAR
// ===============================
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
  function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  }
  
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  
  // Update with GSAP ticker for smoother updates
  if (typeof gsap !== 'undefined') {
    gsap.ticker.add(updateScrollProgress);
  }
}

// ===============================
// SMOOTH SCROLLING FOR ANCHOR LINKS (Using GSAP)
// ===============================
function setupSmoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const targetPosition = target.offsetTop - 80; // Account for navbar height
        const container = document.documentElement || document.body;
        
        // Use native smooth scroll on mobile devices
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
          // Fallback to native smooth scroll
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// Setup smooth scroll links when DOM is ready
document.addEventListener('DOMContentLoaded', setupSmoothScrollLinks);

// ===============================
// SERVICE CARDS EXPAND/COLLAPSE
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const serviceToggles = document.querySelectorAll('.service-toggle');
  const serviceLinkToggles = document.querySelectorAll('.service-link-toggle');
  const serviceLinkExpands = document.querySelectorAll('.service-link-expand');

  // Toggle service details when clicking the arrow button
  serviceToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const serviceCard = toggle.closest('.service-card');
      if (serviceCard) {
        serviceCard.classList.toggle('expanded');
      }
    });
  });

  // Expand service details when clicking "Click for details"
  serviceLinkExpands.forEach(expand => {
    expand.addEventListener('click', () => {
      const serviceCard = expand.closest('.service-card');
      if (serviceCard) {
        serviceCard.classList.add('expanded');
      }
    });
  });

  // Collapse service details when clicking "Click to minimize"
  serviceLinkToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const serviceCard = toggle.closest('.service-card');
      if (serviceCard) {
        serviceCard.classList.remove('expanded');
      }
    });
  });
});

// ===============================
// VIEW MORE WORKS FUNCTIONALITY
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  const hiddenWorkItems = document.querySelectorAll('.work-item-hidden');
  const btnSpan = viewMoreBtn ? viewMoreBtn.querySelector('span') : null;

  if (viewMoreBtn && hiddenWorkItems.length > 0) {
    viewMoreBtn.addEventListener('click', () => {
      const isExpanded = viewMoreBtn.classList.contains('expanded');
      
      if (isExpanded) {
        // Hide the extra items
        hiddenWorkItems.forEach(item => {
          item.classList.remove('show');
        });
        viewMoreBtn.classList.remove('expanded');
        if (btnSpan) btnSpan.textContent = 'View More';
      } else {
        // Show the hidden items
        hiddenWorkItems.forEach(item => {
          item.classList.add('show');
        });
        viewMoreBtn.classList.add('expanded');
        if (btnSpan) btnSpan.textContent = 'View Less';
      }
    });
  }
});

// ===============================
// TYPING TEXT ANIMATION
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const typingText = document.getElementById('typing-text');
  if (!typingText) return;

  const texts = ['Crafting Clean Interfaces', 'User Experience Designer', 'Creating Beautiful Designs'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeText() {
    const currentText = texts[textIndex];
    let typingSpeed = 100; // Default speed
    
    if (isDeleting) {
      // Deleting characters
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Faster when deleting
      
      if (charIndex === 0) {
        // Finished deleting, move to next text
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before typing next text
      }
    } else {
      // Typing characters
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Normal speed when typing
      
      if (charIndex === currentText.length) {
        // Finished typing current text, wait before deleting
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      }
    }

    setTimeout(typeText, typingSpeed);
  }

  // Start typing animation after a short delay
  setTimeout(typeText, 500);
});