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
  const overlay = document.querySelector(".theme-transition-overlay");
  modeToggle.addEventListener("click", () => {
    try {
      const rect = modeToggle.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const isDark = body.classList.contains("dark");
      const targetColor = isDark ? "#e4e9f7" : "#18191a";

      gsap.set(overlay, {
        x: x,
        y: y,
        backgroundColor: targetColor,
        transformOrigin: "center center",
      });

      gsap.to(overlay, {
        scale: 200,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          modeToggle.classList.toggle("active");
          body.classList.toggle("dark");
          localStorage.setItem(
            "mode",
            body.classList.contains("dark") ? "dark-mode" : "light-mode"
          );
          gsap.to(overlay, {
            scale: 0,
            duration: 0.6,
            ease: "power3.inOut",
          });
        },
      });
    } catch (error) {
      console.error("Error toggling dark mode:", error);
    }
  });
} else {
  console.warn("Dark mode toggle button not found");
}

// GSAP Sidebar Animation
const menu = document.querySelector(".menu");

let sidebarTimeline = gsap.timeline({ paused: true });

sidebarTimeline.to(menu, {
  duration: 0.4,
  left: "0%",
  ease: "power2.inOut",
});

if (sidebarOpen) {
  sidebarOpen.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebarTimeline.play();
  });
}

if (sidebarClose) {
  sidebarClose.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebarTimeline.reverse();
  });
}

body.addEventListener("click", (e) => {
  if (!e.target.closest(".menu") && !e.target.classList.contains("sidebarOpen")) {
    sidebarTimeline.reverse();
  }
});
