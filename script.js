
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