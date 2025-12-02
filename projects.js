// Projects Data
const projectsData = [
  {
    id: 1,
    title: "Weather Application",
    description: "A modern Weather Application that provides real-time weather information for any location. Features current temperature, humidity, wind speed, and 5-day forecast with beautiful UI.",
    image: "Images/project1.webp",
    imageAlt: "Weather Application by Vicky Narvare",
    demoLink: "https://weatherappbyvicky.netlify.app",
    codeLink: "https://github.com/VickyNarvare/Weather-webiste",
    technologies: ["HTML", "CSS", "JavaScript", "Weather API"],
    layout: "left"
  },
  {
    id: 2,
    title: "ElectraX Website",
    description: "A futuristic website featuring stunning GSAP animations and smooth transitions. Showcases scroll-triggered animations, parallax effects, and modern aesthetics with vibrant colors.",
    image: "Images/project2.webp",
    imageAlt: "ElectraX Website by Vicky Narvare",
    demoLink: "https://electraxbyvicky.netlify.app",
    codeLink: "https://github.com/VickyNarvare/Electra-X",
    technologies: ["HTML", "CSS", "JavaScript", "GSAP", "ScrollTrigger"],
    layout: "right"
  },
  {
    id: 3,
    title: "Kalika Construction",
    description: "A professional construction company website showcasing services, projects, and company information. Features clean, modern design with responsive layout and portfolio sections.",
    image: "Images/project3.webp",
    imageAlt: "Kalika Construction Website by Vicky Narvare",
    demoLink: "https://kalikaconstruction2.netlify.app",
    codeLink: "https://github.com/VickyNarvare/Kalika-Website",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    layout: "left"
  },
  {
    id: 4,
    title: "JARVIS AI",
    description: "An innovative AI-powered demo platform inspired by JARVIS. Features voice command recognition, interactive AI responses, and a sleek dark-themed interface with real-time functionality.",
    image: "Images/project4.webp",
    imageAlt: "JARVIS AI Platform by Vicky Narvare",
    demoLink: "https://jarvisbyvicky.netlify.app",
    codeLink: "https://github.com/VickyNarvare/Jarvis-website",
    technologies: ["HTML", "CSS", "JavaScript"],
    layout: "right"
  },
  {
    id: 5,
    title: "Coffee Cup - Cafe Website",
    description: "A full-featured coffee shop website with online ordering system, shopping cart, order tracking, and admin dashboard. Built with React and Vite, featuring a modern UI with Tailwind CSS and complete e-commerce functionality.",
    image: "Images/project5.webp",
    imageAlt: "Coffee Cup Cafe Website by Vicky Narvare",
    demoLink: "https://coffeeap.vercel.app/",
    codeLink: "https://github.com/VickyNarvare/coffeeapp",
    technologies: ["React", "Vite", "Tailwind CSS", "JavaScript", "Context API"],
    layout: "left"
  }
];

// Function to create project HTML
function createProjectHTML(project) {
const isLeft = project.layout === "left";
  
  const technologiesHTML = project.technologies.map(tech => 
    `<span class="tech-tag">${tech}</span>`
  ).join('');
  
  const contentHTML = `
    <div class="project-content">
      <span class="project-number">PROJECT ${project.id}</span>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <div class="project-technologies">
        ${technologiesHTML}
      </div>
      <div class="project-links">
        <a href="${project.demoLink}" class="project-btn btn-demo" target="_blank" rel="noopener noreferrer">
          <i class="bx bx-link-external"></i>
          <span>Demo</span>
        </a>
        <a href="${project.codeLink}" class="project-btn btn-code" target="_blank" rel="noopener noreferrer">
          <i class="bx bxl-github"></i>
          <span>View Code</span>
        </a>
      </div>
    </div>
  `;
  
  const imageHTML = `
    <div class="project-image-wrapper">
      <div class="project-image">
        <img src="${project.image}" alt="${project.imageAlt}" loading="lazy" />
      </div>
    </div>
  `;
  
  return `
    <div class="project-item project-${project.layout}">
      ${isLeft ? contentHTML + imageHTML : imageHTML + contentHTML}
    </div>
  `;
}

// Function to render all projects
function renderProjects() {
  const projectsGrid = document.querySelector('.projects-grid');
  
  if (!projectsGrid) {
    console.error('Projects grid container not found');
    return;
  }
  
  projectsGrid.innerHTML = projectsData.map(project => createProjectHTML(project)).join('');
}

// Initialize projects when DOM is loaded
document.addEventListener('DOMContentLoaded', renderProjects);
