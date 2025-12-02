// Services Data
const servicesData = [
  {
    id: 1,
    icon: 'bx-code-alt',
    title: 'Frontend Development',
    description: 'Building modern, responsive web applications with React, Next.js, and JavaScript. Creating fast, scalable, and user-friendly interfaces that deliver exceptional experiences.',
    services: [
      'React & Next.js application development',
      'Responsive, mobile-first design implementation',
      'Tailwind CSS & SCSS styling solutions',
      'GSAP animations for smooth, interactive experiences',
      'Performance optimization & code splitting',
      'SEO-friendly architecture & meta tags'
    ]
  },
  {
    id: 2,
    icon: 'bx-palette',
    title: 'UI/UX Design',
    description: 'Creating intuitive and visually appealing user interfaces with Figma. Designing user-centered experiences that are both beautiful and functional.',
    services: [
      'UI/UX design with Figma & Canva',
      'Wireframing and user flow design',
      'Interactive prototypes and mockups',
      'Responsive design for all screen sizes',
      'Design system creation & style guides',
      'Design-to-code handoff & collaboration'
    ]
  },
  {
    id: 3,
    icon: 'bx-grid-alt',
    title: 'Web Animation & Interactivity',
    description: 'Adding smooth animations and interactive elements using GSAP and CSS. Creating engaging, dynamic user experiences that captivate and delight.',
    services: [
      'GSAP animations for scroll-triggered effects',
      'CSS animations & transitions',
      'Interactive UI components & micro-interactions',
      'Page transitions & loading animations',
      'Performance-optimized animation solutions',
      'Cross-browser animation compatibility'
    ]
  },
  {
    id: 4,
    icon: 'bx-code-block',
    title: 'Web Development & Deployment',
    description: 'Complete web development solutions from code to deployment. Building scalable applications with modern tools and best practices.',
    services: [
      'Full-stack development with React & Next.js',
      'API integration & RESTful services',
      'Database integration (MySQL, SQL)',
      'Version control with Git & GitHub',
      'Cloud deployment on Vercel & Netlify',
      'Performance optimization & testing'
    ]
  }
];

// Function to create service card HTML
function createServiceCard(service) {
  const servicesList = service.services.map(item => `<li>${item}</li>`).join('');
  
  return `
    <div class="service-card">
      <div class="service-header">
        <div class="service-icon">
          <i class="bx ${service.icon}"></i>
        </div>
        <button class="service-toggle" aria-label="Toggle service details">
          <i class="bx bx-down-arrow-alt service-arrow"></i>
        </button>
      </div>
      <h3 class="service-title">${service.title}</h3>
      <p class="service-description">${service.description}</p>
      <div class="service-details">
        <h4 class="services-include-title">Services Include:</h4>
        <ul class="services-list">
          ${servicesList}
        </ul>
      </div>
      <div class="service-footer">
        <button class="service-link-toggle">Click to minimize</button>
        <button class="service-link-expand">Click for details</button>
        <a href="#contact" class="service-btn">Custom Quote</a>
      </div>
    </div>
  `;
}

// Function to render all services
function renderServices() {
  const servicesGrid = document.querySelector('.services-grid');
  
  if (!servicesGrid) {
    console.error('Services grid container not found');
    return;
  }
  
  servicesGrid.innerHTML = servicesData.map(service => createServiceCard(service)).join('');
}

// Initialize services when DOM is loaded
document.addEventListener('DOMContentLoaded', renderServices);
