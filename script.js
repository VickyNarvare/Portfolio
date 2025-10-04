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
  link.addEventListener('click', function () {
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    localStorage.setItem('activeNavHref', this.getAttribute('href'));
    // Close sidebar on mobile after click
    if (window.innerWidth < 900 && nav.classList.contains('active')) {
      nav.classList.remove('active');
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
  console.warn("LocalStorage not available:", error);
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
      console.error("Error toggling dark mode:", error);
    }
  });
} else {
  console.warn("Theme toggle button not found");
}

// Mobile menu toggle
if (mobileMenuToggle && mobileMenuOverlay) {
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active");
    mobileMenuOverlay.classList.toggle("active");
    body.style.overflow = mobileMenuOverlay.classList.contains("active") ? "hidden" : "";
  });
} else {
  console.warn("Mobile menu elements not found");
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
// SCROLL PROGRESS BAR
// ===============================
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  });
}

// ===============================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});