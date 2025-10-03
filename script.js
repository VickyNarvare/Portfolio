// ===============================
// NAVIGATION ACTIVE LINK SYSTEM
// ===============================
const navLinks = document.querySelectorAll('.nav-links a');
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
  let index = sections.length - 1;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (section && window.scrollY + 80 < section.offsetTop) {
      index = i - 1;
      break;
    }
  }
  navLinks.forEach((link, i) => {
    if (i === index && index >= 0) {
      link.classList.add('active');
      localStorage.setItem('activeNavHref', link.getAttribute('href'));
    } else {
      link.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink);
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
// SIDEBAR, DARK MODE, AND TOGGLES
// ===============================
const body = document.querySelector("body");
const nav = document.querySelector("nav");
const modeToggle = document.querySelector(".dark-light");
const sidebarOpen = document.querySelector(".sidebarOpen");
const sidebarClose = document.querySelector(".sidebarClose");

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

// Mode toggle with error handling
if (modeToggle) {
  modeToggle.addEventListener("click", () => {
    try {
      modeToggle.classList.toggle("active");
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
  console.warn("Dark mode toggle button not found");
}

// Sidebar open with error handling
if (sidebarOpen && nav) {
  sidebarOpen.addEventListener("click", () => {
    nav.classList.add("active");
  });
} else {
  console.warn("Sidebar elements not found");
}

// Close sidebar when clicking outside or on close button
body.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("sidebarOpen") &&
    !e.target.closest(".menu")
  ) {
    nav.classList.remove("active");
  }
});

if (sidebarClose) {
  sidebarClose.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}