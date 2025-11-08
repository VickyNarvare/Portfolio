/* ========================================
   PORTFOLIO WEBSITE - GSAP ANIMATIONS
   Author: Vicky Narvare
   ======================================== */

// Register GSAP plugins
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================
// TECHNOLOGIES MARQUEE DATA
// ============================================
const technologies = [
  'CSS3',
  'JAVASCRIPT',
  'GSAP',
  'REACT',
  'TAILWIND',
  'SASS',
  'JAVA',
  'PYTHON',
  'HTML5'
];

/**
 * Populate marquee with technologies
 * @param {HTMLElement} trackElement - The track element to populate
 */
function populateTechMarquee(trackElement) {
  if (!trackElement) return;
  
  trackElement.innerHTML = '';
  
  // Create 3 sets for seamless infinite loop
  for (let i = 0; i < 3; i++) {
    technologies.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'tech-marquee__item';
      span.textContent = tech;
      trackElement.appendChild(span);
    });
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  // ============================================
  // HERO SECTION ANIMATIONS
  // ============================================
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    const homeSection = document.querySelector("#home");
    if (homeSection) {
      const heroTitle = document.querySelector(".hero-title");
      const heroSubtitle = document.querySelector(".hero-subtitle");
      const heroDescription = document.querySelector(".hero-description");
      const heroButtons = document.querySelector(".hero-buttons");
      
      if (heroTitle) {
        gsap.from(heroTitle, {
          scrollTrigger: {
            trigger: homeSection,
            start: "top center",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power4.out"
        });
      }
      
      if (heroSubtitle) {
        gsap.from(heroSubtitle, {
          scrollTrigger: {
            trigger: homeSection,
            start: "top center",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          ease: "power4.out"
        });
      }
      
      if (heroDescription) {
        gsap.from(heroDescription, {
          scrollTrigger: {
            trigger: homeSection,
            start: "top center",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          delay: 0.4,
          ease: "power4.out"
        });
      }
      
      if (heroButtons) {
        gsap.from(heroButtons, {
          scrollTrigger: {
            trigger: homeSection,
            start: "top center",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          delay: 0.6,
          ease: "power4.out"
        });
      }
    }
  }

  // ============================================
  // TECHNOLOGIES MARQUEE ANIMATION
  // ============================================
  const homeMarquee = document.getElementById('homeTechMarquee');
  if (homeMarquee && typeof gsap !== 'undefined') {
    populateTechMarquee(homeMarquee);
    
    const items = homeMarquee.querySelectorAll('.tech-marquee__item');
    const firstSetWidth = Array.from(items).slice(0, technologies.length)
      .reduce((sum, el) => sum + el.offsetWidth + 36, 0);
    
    gsap.to(items, {
      x: -firstSetWidth,
      duration: 20,
      ease: 'none',
      repeat: -1
    });
  }
  
  // Handle resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (homeMarquee) {
        populateTechMarquee(homeMarquee);
        const items = homeMarquee.querySelectorAll('.tech-marquee__item');
        const firstSetWidth = Array.from(items).slice(0, technologies.length)
          .reduce((sum, el) => sum + el.offsetWidth + 36, 0);
        
        gsap.killTweensOf(items);
        gsap.to(items, {
          x: -firstSetWidth,
          duration: 20,
          ease: 'none',
          repeat: -1
        });
      }
    }, 150);
  });

  // ============================================
  // SERVICES SECTION ANIMATIONS
  // ============================================
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    const servicesSection = document.querySelector("#services");
    if (servicesSection) {
      // Services Title
      const servicesTitle = document.querySelector(".services-title");
      if (servicesTitle) {
        gsap.from(servicesTitle, {
          scrollTrigger: {
            trigger: servicesSection,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power4.out"
        });
      }
      
      // Services Description
      const servicesDescription = document.querySelector(".services-description");
      if (servicesDescription) {
        gsap.from(servicesDescription, {
          scrollTrigger: {
            trigger: servicesSection,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          ease: "power4.out"
        });
      }
      
      // Service Cards
      const serviceCards = document.querySelectorAll(".service-card");
      if (serviceCards.length > 0) {
        gsap.from(serviceCards, {
          scrollTrigger: {
            trigger: servicesSection,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out"
        });
      }
      
      // Service Icons
      const serviceIcons = document.querySelectorAll(".service-icon");
      if (serviceIcons.length > 0) {
        gsap.from(serviceIcons, {
          scrollTrigger: {
            trigger: servicesSection,
            start: "top 80%",
          },
          scale: 0,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)"
        });
      }
    }
  }

  // ============================================
  // CTA SECTION ANIMATIONS
  // ============================================
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    const ctaContainer = document.querySelector(".cta-container");
    if (ctaContainer) {
      const ctaCard = document.querySelector(".cta-card");
      const ctaTitle = document.querySelector(".cta-title");
      const ctaLead = document.querySelector(".cta-lead");
      const ctaButtons = document.querySelector(".cta-buttons");
      
      if (ctaCard) {
        gsap.from(ctaCard, {
          scrollTrigger: {
            trigger: ctaContainer,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power4.out"
        });
      }
      
      if (ctaTitle) {
        gsap.from(ctaTitle, {
          scrollTrigger: {
            trigger: ctaContainer,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          ease: "power4.out"
        });
      }
      
      if (ctaLead) {
        gsap.from(ctaLead, {
          scrollTrigger: {
            trigger: ctaContainer,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          duration: 1,
          delay: 0.4,
          ease: "power4.out"
        });
      }
      
      if (ctaButtons) {
        gsap.from(ctaButtons, {
          scrollTrigger: {
            trigger: ctaContainer,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          duration: 1,
          delay: 0.6,
          ease: "power4.out"
        });
      }
    }
  }

  // ============================================
  // HOVER ANIMATIONS
  // ============================================
  if (typeof gsap === 'undefined') return;
  
  // Primary Buttons
  document.querySelectorAll(".btn-primary").forEach(btn => {
    if (btn) {
      btn.addEventListener("mouseenter", () => {
        gsap.to(btn, { y: -2, duration: 0.3, ease: "power2.out" });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { y: 0, duration: 0.3, ease: "power2.out" });
      });
    }
  });
  
  // Secondary Buttons
  document.querySelectorAll(".btn-secondary").forEach(btn => {
    if (btn) {
      btn.addEventListener("mouseenter", () => {
        gsap.to(btn, {
          backgroundColor: "var(--text-color)",
          color: "var(--body-color)",
          duration: 0.3,
          ease: "power2.out"
        });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          backgroundColor: "transparent",
          color: "var(--text-color)",
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }
  });
  
  // Work Items
  document.querySelectorAll(".work-item").forEach(item => {
    if (item) {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          y: -8,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }
  });
  
  // Work Links
  document.querySelectorAll(".work-link").forEach(link => {
    if (link) {
      link.addEventListener("mouseenter", () => {
        gsap.to(link, { y: -2, duration: 0.3, ease: "power2.out" });
        const icon = link.querySelector("i");
        if (icon) {
          gsap.to(icon, { scale: 1.1, duration: 0.3, ease: "power2.out" });
        }
      });
      link.addEventListener("mouseleave", () => {
        gsap.to(link, { y: 0, duration: 0.3, ease: "power2.out" });
        const icon = link.querySelector("i");
        if (icon) {
          gsap.to(icon, { scale: 1, duration: 0.3, ease: "power2.out" });
        }
      });
      link.addEventListener("mousedown", () => {
        gsap.to(link, { y: 0, duration: 0.1, ease: "power2.out" });
      });
      link.addEventListener("mouseup", () => {
        gsap.to(link, { y: -2, duration: 0.1, ease: "power2.out" });
      });
    }
  });
  
  // Social Links
  document.querySelectorAll(".social-link").forEach(link => {
    if (link) {
      link.addEventListener("mouseenter", () => {
        gsap.to(link, {
          scale: 1.15,
          rotate: 5,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      link.addEventListener("mouseleave", () => {
        gsap.to(link, {
          scale: 1,
          rotate: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }
  });
});