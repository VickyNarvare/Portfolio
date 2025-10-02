gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-title", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power4.out",
    delay: 0.5
});
gsap.from(".hero-subtitle", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power4.out",
    delay: 0.8
});
gsap.from(".hero-description", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power4.out",
    delay: 1.1
});
gsap.from(".hero-buttons .btn", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power4.out",
    stagger: 0.2,
    delay: 1.4
});

// About Section Animation
gsap.from("#about .section-title", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
});

gsap.from(".about-text p", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 70%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
  ease: "bounce.out"
});

gsap.from(".skill-tag", {
    scrollTrigger: {
        trigger: ".skills",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power4.out"
});

// Works Section Animation
gsap.from("#works .section-title", {
    scrollTrigger: {
        trigger: "#works",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
});

gsap.from(".work-item", {
    scrollTrigger: {
        trigger: "#works",
        start: "top 70%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power4.out"
});

// Contact Section Animation
gsap.from("#contact .section-title", {
    scrollTrigger: {
        trigger: "#contact",
        start: "top 80%",
    },
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
});

gsap.from(".contact-info", {
    scrollTrigger: {
        trigger: "#contact",
        start: "top 70%",
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
});

gsap.from(".contact-form", {
    scrollTrigger: {
        trigger: "#contact",
        start: "top 70%",
    },
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
});

// Hover Animations
document.querySelectorAll(".btn-primary").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        gsap.to(btn, { y: -2, duration: 0.3, ease: "power2.out" });
    });
    btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { y: 0, duration: 0.3, ease: "power2.out" });
    });
});

document.querySelectorAll(".btn-secondary").forEach(btn => {
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
});

document.querySelectorAll(".skill-tag").forEach(tag => {
    tag.addEventListener("mouseenter", () => {
        gsap.to(tag, { 
            y: -2, 
            boxShadow: "0 4px 12px rgba(64, 112, 244, 0.3)", 
            "--tooltip-opacity": 1,
            "--tooltip-visibility": "visible",
            "--tooltip-y": "-10px",
            duration: 0.3, 
            ease: "power2.out" 
        });
    });
    tag.addEventListener("mouseleave", () => {
        gsap.to(tag, { 
            y: 0, 
            boxShadow: "none", 
            "--tooltip-opacity": 0,
            "--tooltip-visibility": "hidden",
            "--tooltip-y": "0px",
            duration: 0.3, 
            ease: "power2.out" 
        });
    });
});

document.querySelectorAll(".work-item").forEach(item => {
    item.addEventListener("mouseenter", () => {
        gsap.to(item, { y: -8, scale: 1.02, duration: 0.3, ease: "power2.out" });
    });
    item.addEventListener("mouseleave", () => {
        gsap.to(item, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
    });
});

document.querySelectorAll(".work-link").forEach(link => {
    link.addEventListener("mouseenter", () => {
        gsap.to(link, { y: -2, duration: 0.3, ease: "power2.out" });
        gsap.to(link.querySelector("i"), { scale: 1.1, duration: 0.3, ease: "power2.out" });
    });
    link.addEventListener("mouseleave", () => {
        gsap.to(link, { y: 0, duration: 0.3, ease: "power2.out" });
        gsap.to(link.querySelector("i"), { scale: 1, duration: 0.3, ease: "power2.out" });
    });
    link.addEventListener("mousedown", () => {
        gsap.to(link, { y: 0, duration: 0.1, ease: "power2.out" });
    });
    link.addEventListener("mouseup", () => {
        gsap.to(link, { y: -2, duration: 0.1, ease: "power2.out" });
    });
});

document.querySelectorAll(".social-link").forEach(link => {
    link.addEventListener("mouseenter", () => {
        gsap.to(link, { y: -2, duration: 0.3, ease: "power2.out" });
    });
    link.addEventListener("mouseleave", () => {
        gsap.to(link, { y: 0, duration: 0.3, ease: "power2.out" });
    });
});

const sidebarCloseButton = document.querySelector(".logo-toggle .sidebarClose");
if (sidebarCloseButton) {
    sidebarCloseButton.addEventListener("mouseenter", () => {
        gsap.to(sidebarCloseButton, { rotation: 90, scale: 1.1, duration: 0.3, ease: "power2.out" });
    });
    sidebarCloseButton.addEventListener("mouseleave", () => {
        gsap.to(sidebarCloseButton, { rotation: 0, scale: 1, duration: 0.3, ease: "power2.out" });
    });
}
