// Social Links Data
const socialLinksData = [
    {
        name: 'GitHub',
        url: 'https://github.com/VickyNarvare',
        icon: 'bxl-github',
        tooltip: 'GitHub'
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/vicky-narvare-4a7712395',
        icon: 'bxl-linkedin',
        tooltip: 'LinkedIn'
    },
    {
        name: 'Facebook',
        url: 'https://www.facebook.com/people/Vicky-Narvare/61570312627409/',
        icon: 'bxl-facebook',
        tooltip: 'Facebook'
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/mr_ankush_narvare_143',
        icon: 'bxl-instagram',
        tooltip: 'Instagram'
    },
    {
        name: 'WhatsApp',
        url: 'https://wa.me/916267607029',
        icon: 'bxl-whatsapp',
        tooltip: 'WhatsApp'
    },
];

// Function to create social link HTML
function createSocialLink(social, className = 'social-link') {
    return `
    <a
      href="${social.url}"
      class="${className}"
      aria-label="${social.name}"
      data-tooltip="${social.tooltip}"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i class="bx ${social.icon}"></i>
    </a>
  `;
}

// Function to render social links in different sections
function renderSocialLinks() {
    // Contact Section Social Links
    const contactSocial = document.querySelector('.contact-info .social-links');
    if (contactSocial) {
        // Only first 4 links for contact section (excluding Instagram)
        const contactLinks = socialLinksData.filter(s => s.name !== 'Instagram');
        contactSocial.innerHTML = contactLinks.map(social => createSocialLink(social)).join('');
    }

    // Footer Social Links
    const footerSocial = document.querySelector('.footer-social');
    if (footerSocial) {
        footerSocial.innerHTML = socialLinksData.map(social => createSocialLink(social)).join('');
    }

    // Floating Social Links
    const floatingSocial = document.querySelector('.floating-social-links');
    if (floatingSocial) {
        floatingSocial.innerHTML = socialLinksData.map(social => createSocialLink(social, 'floating-social-link')).join('');
    }
}

// Initialize social links when DOM is loaded
document.addEventListener('DOMContentLoaded', renderSocialLinks);
