gsap.registerPlugin(ScrollTrigger);
// Hero Section Animation
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

// Simple GSAP marquee: leftward loop
window.addEventListener('load', function () {
    const tracks = document.querySelectorAll('.marquee .marquee__track');
    if (!tracks.length) return;

    const SPEED = 80; // px per second
    const tweens = [];

    function init() {
        // kill old tweens
        while (tweens.length) {
            const t = tweens.pop();
            t && t.kill && t.kill();
        }

        tracks.forEach(track => {
            // start from 0 each build
            gsap.set(track, { x: 0 });

            // requires duplicated items in HTML for seamless loop
            const distance = track.scrollWidth / 2;
            if (!distance) return;

            const duration = distance / SPEED;
            const tween = gsap.to(track, {
                x: -distance,
                duration,
                ease: 'none',
                repeat: -1
            });
            tweens.push(tween);

            const wrapper = track.closest('.marquee');
            if (wrapper) {
                wrapper.addEventListener('mouseenter', () => tween.pause());
                wrapper.addEventListener('mouseleave', () => tween.resume());
            }
        });
    }

    init();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(init, 150);
    });
});

// Technologies Array
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

// Function to populate marquee with technologies from array (infinite loop)
function populateTechMarquee(trackElement) {
    if (!trackElement) return;
    
    // Clear existing content
    trackElement.innerHTML = '';
    
    // Create multiple sets for seamless infinite loop (at least 3 sets for smooth infinite effect)
    for (let i = 0; i < 3; i++) {
        technologies.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'tech-marquee__item';
            span.textContent = tech;
            trackElement.appendChild(span);
        });
    }
}

// Technologies Marquee Animation with GSAP - Infinite Loop
window.addEventListener('load', function () {
    const techTracks = document.querySelectorAll('.tech-marquee .tech-marquee__track');
    if (!techTracks.length) return;

    // Populate marquee from array
    techTracks.forEach(track => {
        populateTechMarquee(track);
    });

    const TECH_SPEED = 60; // px per second
    const techTweens = [];

    function initTechMarquee() {
        // kill old tweens
        while (techTweens.length) {
            const t = techTweens.pop();
            t && t.kill && t.kill();
        }

        techTracks.forEach(track => {
            // Reset position
            gsap.set(track, { x: 0 });

            // Calculate distance for seamless infinite loop
            // We use 1/3 of the width since we have 3 sets of items
            const itemsWidth = track.scrollWidth / 3;
            if (!itemsWidth) return;

            // Duration for smooth animation
            const duration = itemsWidth / TECH_SPEED;

            // Perfect infinite seamless loop animation
            // repeat: -1 means infinite loop
            const infiniteTween = gsap.to(track, {
                x: -itemsWidth,
                duration: duration,
                ease: 'none',
                repeat: -1, // Infinite repeat - never stops
                immediateRender: true
            });

            techTweens.push(infiniteTween);

            // Pause on hover
            const wrapper = track.closest('.tech-marquee');
            if (wrapper) {
                wrapper.addEventListener('mouseenter', () => infiniteTween.pause());
                wrapper.addEventListener('mouseleave', () => infiniteTween.resume());
            }
        });
    }

    // Wait for DOM to update after populating
    setTimeout(() => {
        initTechMarquee();
    }, 100);

    // Handle window resize
    let techResizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(techResizeTimer);
        techResizeTimer = setTimeout(() => {
            // Repopulate and reinit on resize
            techTracks.forEach(track => {
                populateTechMarquee(track);
            });
            setTimeout(initTechMarquee, 50);
        }, 150);
    });
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

gsap.from(".about-image", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 75%",
    },
    x: 50,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
});

gsap.from(".about-text p", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 70%",
    },
    x: -50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power4.out"
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
        start: "top 70%",
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

// Hover Animations with error handling
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

document.querySelectorAll(".skill-tag").forEach(tag => {
    if (tag) {
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
    }
});

document.querySelectorAll(".work-item").forEach(item => {
    if (item) {
        item.addEventListener("mouseenter", () => {
            gsap.to(item, { y: -8, scale: 1.02, duration: 0.3, ease: "power2.out" });
        });
        item.addEventListener("mouseleave", () => {
            gsap.to(item, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
        });
    }
});

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

document.querySelectorAll(".social-link").forEach(link => {
    if (link) {
        link.addEventListener("mouseenter", () => {
            gsap.to(link, { y: -2, duration: 0.3, ease: "power2.out" });
        });
        link.addEventListener("mouseleave", () => {
            gsap.to(link, { y: 0, duration: 0.3, ease: "power2.out" });
        });
    }
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

// Development Process Section Animation
if (document.querySelectorAll('.devSection .card').length) {
    const cards = document.querySelectorAll('.devSection .card');
    cards.forEach((card, i) => {
        const fromX = (i % 2 === 0) ? -80 : 80;
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
            },
            x: fromX,
            y: 10,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.05,
            ease: 'power3.out'
        });
    });
}