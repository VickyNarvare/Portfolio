/* ========================================
   PORTFOLIO WEBSITE - GSAP ANIMATIONS
   Author: Vicky Narvare
   ======================================== */

// Register GSAP plugins
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}



// ============================================
// TECHNOLOGIES DATA FOR MARQUEE
// ============================================
const technologies = [
  {name: 'HTML5', color: '#E34F26', icon: 'bxl-html5'},
  { name: 'CSS3', color: '#1572B6', icon: 'bxl-css3' },
  { name: 'JavaScript', color: '#F7DF1E', icon: 'bxl-javascript' },
  {name: 'Sublime Text', color: '#000000', icon: 'bx-code'},
  { name: 'SCSS', color: '#CC6699', icon: 'bxl-sass' },
  {name: 'Chrome DevTools', color: '#000000', icon: 'bxl-chrome'},
  { name: 'Tailwind', color: '#06B6D4', icon: 'bxl-tailwind-css' },
  {name: 'CSS Animations', color: '#000000', icon: 'bx-play-circle'},
  { name: 'Git', color: '#F05032', icon: 'bxl-git' },
  { name: 'GitHub', color: '#181717', icon: 'bxl-github' },
  { name: 'React', color: '#61DAFB', icon: 'bxl-react' },
  { name: 'Next.js', color: '#000000', icon: 'bx-code-alt' },
  {name: 'MySQL', color: '#4479A1', icon: 'bx-data'},
  {name: 'Canva', color: '#000000', icon: 'bx-image'},  
  {name: 'GSAP', color: '#D9B310', icon: 'bx-movie-play'},
  {name: 'UI/UX Design', color: '#000000', icon: 'bx-palette'},
  {name: 'SQL', color: '#4479A1', icon: 'bx-data'},
  {name: 'Responsive Design', color: '#000000', icon: 'bx-devices'},
  {name: 'Figma', color: '#007AFF', icon: 'bxl-figma'},
  {name: 'VS Code', color: '#007ACC', icon: 'bxl-visual-studio'},
  {name: 'NPM/Yarn', color: '#000000', icon: 'bxl-nodejs'}
];

/**
 * Populate marquee with technology tags
 * @param {HTMLElement} trackElement - The track element to populate
 */
function populateTechMarquee(trackElement) {
  if (!trackElement) return;
  
  trackElement.innerHTML = '';
  


  
  // Create 3 sets for seamless infinite loop
  for (let i = 0; i < 3; i++) {
    technologies.forEach(tech => {
      const tag = document.createElement('div');
      tag.className = 'tech-tag';
      tag.setAttribute('data-tech', tech.name.toLowerCase());
      
      // Add icon if available
      if (tech.icon) {
        const icon = document.createElement('i');
        icon.className = `bx ${tech.icon} tech-icon`;
        icon.style.color = tech.color;
        tag.appendChild(icon);
      } else {
        // Fallback to dot if no icon
        const dot = document.createElement('span');
        dot.className = 'tech-dot';
        dot.style.backgroundColor = tech.color;
        tag.appendChild(dot);
      }
      
      const name = document.createElement('span');
      name.className = 'tech-name';
      name.textContent = tech.name;
      
      tag.appendChild(name);
      trackElement.appendChild(tag);
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
  
  // Function to initialize marquee animation
  function initMarquee(trackId, direction = 'left') {
    const techMarqueeTrack = document.getElementById(trackId);
    if (!techMarqueeTrack || typeof gsap === 'undefined') return;
    
    populateTechMarquee(techMarqueeTrack);
    
    // Wait for next frame to ensure DOM is updated
    requestAnimationFrame(() => {
      const techTags = techMarqueeTrack.querySelectorAll('.tech-tag');
      if (techTags.length > 0) {
        // Calculate width of one set of technologies
        const firstSetWidth = Array.from(techTags).slice(0, technologies.length)
          .reduce((sum, el) => sum + el.offsetWidth + 16, 0);
    
        // Animate the marquee based on direction
        if (direction === 'left') {
          // Left to Right (move from negative to positive)
          gsap.set(techTags, { x: -firstSetWidth });
          gsap.to(techTags, {
            x: 0,
            duration: 30,
            ease: 'none',
            repeat: -1
          });
        } else {
          // Right to Left (move from positive to negative)
          gsap.set(techTags, { x: 0 });
          gsap.to(techTags, {
      x: -firstSetWidth,
            duration: 30,
      ease: 'none',
      repeat: -1
    });
  }
      }
    });
  }
  
  // Initialize Left to Right marquee
  initMarquee('techMarqueeTrackLeft', 'left');
  
  // Initialize Right to Left marquee
  initMarquee('techMarqueeTrackRight', 'right');
  
  // Handle resize for both marquees
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Reinitialize both marquees on resize
      const leftTrack = document.getElementById('techMarqueeTrackLeft');
      const rightTrack = document.getElementById('techMarqueeTrackRight');
      
      if (leftTrack && typeof gsap !== 'undefined') {
        const leftTags = leftTrack.querySelectorAll('.tech-tag');
        if (leftTags.length > 0) {
          const firstSetWidth = Array.from(leftTags).slice(0, technologies.length)
            .reduce((sum, el) => sum + el.offsetWidth + 16, 0);
          
          gsap.killTweensOf(leftTags);
          gsap.set(leftTags, { x: -firstSetWidth });
          gsap.to(leftTags, {
            x: 0,
            duration: 30,
            ease: 'none',
            repeat: -1
          });
        }
      }
      
      if (rightTrack && typeof gsap !== 'undefined') {
        const rightTags = rightTrack.querySelectorAll('.tech-tag');
        if (rightTags.length > 0) {
          const firstSetWidth = Array.from(rightTags).slice(0, technologies.length)
            .reduce((sum, el) => sum + el.offsetWidth + 16, 0);
        
          gsap.killTweensOf(rightTags);
          gsap.set(rightTags, { x: 0 });
          gsap.to(rightTags, {
          x: -firstSetWidth,
            duration: 30,
          ease: 'none',
          repeat: -1
        });
        }
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