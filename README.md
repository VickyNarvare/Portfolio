# 🚀 Vicky Narvare - Portfolio Website

> A modern, responsive portfolio website showcasing my work as a Frontend Developer. Built with vanilla HTML, CSS, and JavaScript, featuring smooth animations using GSAP.

**[🌐 Live Demo](https://vickynarvare.vercel.app)** | **[📧 Contact](mailto:vickynarvare51@gmail.com)**

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎯 **Modern Design** | Clean and professional UI with dark/light theme toggle |
| 📱 **Fully Responsive** | Optimized for mobile, tablet, and desktop devices |
| ✨ **Smooth Animations** | GSAP-powered animations and scroll transitions |
| 🔍 **SEO Optimized** | Meta tags, Open Graph, Twitter Cards & JSON-LD structured data |
| 📦 **PWA Ready** | Progressive Web App with offline capabilities & installation support |
| ⚡ **High Performance** | Optimized loading, preload directives & mobile-friendly animations |
| 🔤 **Custom Typography** | LucyRose (headings) & Lato (body) for enhanced readability |
| 💬 **Smart Forms** | Contact form with validation and toast notifications |
| 🎪 **Interactive Sections** | Typing animations, skill showcases, expandable services & project gallery |

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| 🏗️ **HTML5** | Semantic markup with comprehensive SEO meta tags |
| 🎨 **CSS3** | Modern styling with variables, flexbox, grid & custom fonts |
| ⚙️ **JavaScript ES6+** | Interactive functionality with form validation |
| 🎬 **GSAP** | Smooth animations and scroll effects |
| 🎪 **Boxicons** | Beautiful icon library |
| 📊 **Schema.org** | JSON-LD structured data for search engines |
| 📦 **PWA** | Service workers & manifest.json for offline support |

## 📁 Project Structure

```
📦 portfolio/
├── 📄 index.html                    # Main HTML file with SEO meta tags
├── 🎨 css/
│   └── main.css                     # Optimized stylesheet
├── ⚙️  js/
│   ├── script.js                    # Main JavaScript file
│   ├── animation.js                 # GSAP animations
│   ├── projects.js                  # Projects functionality
│   ├── services.js                  # Services functionality
│   ├── skills.js                    # Skills functionality
│   └── social-links.js              # Social links
├── 🔤 fonts/
│   ├── Lato/                        # LatoRegular font files
│   └── LucyRose/                    # LucyRose font files
├── 🖼️  Images/
│   ├── vicky.jpg                    # Profile picture
│   ├── project1.png - project4.png  # Project screenshots
│   └── favicon.ico                  # Website favicon
├── ⚙️  config/
│   ├── robots.txt                   # SEO crawling directives
│   ├── sitemap.xml                  # XML sitemap
│   └── vercel.json                  # Vercel deployment config
├── 📦 manifest.json                 # PWA manifest
├── 📖 README.md                     # This file
└── 🎨 VISUALS.md                    # Design guide & visuals
```

## 🚀 Getting Started

### ✅ Prerequisites

- 🌐 A modern web browser (Chrome, Firefox, Safari, Edge)
- 💻 A code editor (VS Code recommended)
- 📚 Basic knowledge of HTML, CSS, and JavaScript

### 📥 Installation

#### 1️⃣ Clone the Repository
```bash
git clone <repository-url>
cd portfolio
```

#### 2️⃣ Open the Project
Choose one of the following methods:

**Method A: Direct Browser**
```bash
# Simply open index.html in your web browser
```

**Method B: Local Server** (Recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using VS Code Live Server Extension
# Right-click index.html > Open with Live Server
```

#### 3️⃣ Customize Your Content
- 📝 Edit `index.html` to update your information
- 🎨 Modify `css/main.css` to change colors and styling
- 🖼️ Update images in the `Images/` folder
- ⚙️ Configure social links and contact information

## 🎨 Customization Guide

### 🎭 Changing Colors

Edit CSS variables in `css/main.css`:

```css
:root {
  --primary-color: #4070f4;        /* Main brand color */
  --accent-color: #4070f4;         /* Accent highlights */
  --text-color: #333;              /* Primary text */
  --bg-color: #ffffff;             /* Background */
  --secondary-text: #666;          /* Secondary text */
  /* ... other variables */
}
```

### 🔤 Changing Fonts

The portfolio uses two custom fonts in `css/main.css`:

- **Headings**: 🎯 LucyRose (elegant, personalized)
- **Body**: 📄 Lato (clean, highly readable)

To modify fonts, update the `@font-face` declarations at the top of `main.css`.

### 📦 Updating Projects

Edit the works section in `index.html`:

```html
<div class="work-item">
  <div class="work-image">
    <img src="Images/project1.png" alt="Project description" />
  </div>
  <div class="work-content">
    <h3>Project Name</h3>
    <p>Project description</p>
    <a href="#" target="_blank">View Project →</a>
  </div>
</div>
```

### 👤 Adding Your Information

1. 📝 **Personal Info**: Update meta tags and content in `index.html`
2. 🔗 **Social Links**: Update social media URLs in the contact section
3. 💼 **Projects**: Add/remove projects in the works section
4. 🏆 **Skills**: Modify skill tags in the about section
5. 📞 **Contact**: Update email and contact methods

## 📱 Browser Support

| Browser | Status | Version |
|---------|--------|---------|
| 🌐 Chrome | ✅ Fully Supported | Latest |
| 🔥 Firefox | ✅ Fully Supported | Latest |
| 🧭 Safari | ✅ Fully Supported | Latest |
| 🔷 Edge | ✅ Fully Supported | Latest |
| 📲 Mobile Browsers | ✅ Fully Supported | iOS Safari, Chrome Mobile |
## ⚙️ Configuration

### 🔍 SEO Configuration

#### 🤖 Robots.txt (`config/robots.txt`)
- Controls search engine crawling
- Specifies sitemap location
- Optimized crawl delays for major search engines

#### 🗺️ Sitemap (`config/sitemap.xml`)
- Lists all portfolio sections for search engines
- Helps search engines discover and index pages

#### 📌 Meta Tags (`index.html`)
- 📤 Open Graph tags for social media sharing
- 🐦 Twitter Card tags for Twitter/X
- 📊 JSON-LD structured data for Google
- 📱 Mobile and PWA meta tags

### 💬 Contact Form Setup

Currently, the contact form shows an error message. To enable it, integrate with one of these services:

#### ✉️ Option 1: Formspree (Recommended)
1. Go to [Formspree](https://formspree.io)
2. Create new form and get form ID
3. Update `js/script.js` line ~331:
```javascript
fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  body: new FormData(contactForm)
})
```

#### 📧 Option 2: EmailJS
- Sign up at [EmailJS](https://www.emailjs.com)
- Add EmailJS script to `index.html`
- Configure service ID, template ID, and public key

#### 🌐 Option 3: Netlify Forms
- Add `netlify` attribute to contact form in `index.html`

### 📊 Analytics Setup

Add Google Analytics:

```html
<!-- Add before closing </head> tag in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 📦 PWA Configuration

The portfolio includes Progressive Web App features:

- 📱 App installation on mobile devices
- 🔌 Offline support with service workers
- 🎨 Custom theme colors and icons

**To customize:**
1. Edit `manifest.json` with your app details
2. Replace icons in `Images/` folder
3. Ensure `start_url` points to your deployment

## 🎉 Recent Updates (December 2025)

### 🔤 Typography Enhancement
- ✨ Applied **LucyRose** font to all headings for elegant, personalized appearance
- 📖 Applied **Lato** font to body text for improved readability
- ⚡ Custom font-face declarations optimized for web loading

### ⚡ Performance Optimization
- 📉 Removed ~484 lines of unused CSS (10% reduction)
- 🧹 Eliminated orphaned classes and old responsive rules
- 🚀 Added resource preloading for critical assets
- 📱 Optimized animations for mobile devices

### 🎨 User Experience Improvements
- 🔔 Added error toast notification for contact form
- ✅ Enhanced form validation feedback
- 👆 Improved mobile navigation interaction
- 🎬 Smooth scroll animations on desktop

### 🔍 SEO & Search Engine Optimization
- 📌 Added comprehensive meta tags (color-scheme, language, security)
- 📤 Enhanced Open Graph tags for social media sharing
- 🐦 Added Twitter Card meta tags
- 📦 Created PWA manifest for app installation
- 📊 Added JSON-LD structured data (Person, WebSite, Skills)
- 🤖 Optimized robots.txt with crawl delays
- 🗺️ XML sitemap with all portfolio sections

### 🌐 Browser Compatibility
- ✅ Tested and optimized for all major browsers:
  - 🌐 Chrome/Chromium (Desktop & Mobile)
  - 🔥 Firefox (Desktop & Mobile)
  - 🧭 Safari (macOS & iOS)
  - 🔷 Edge (Desktop)
  - 📱 Samsung Internet
- 🎨 CSS variables for consistent theming
- 🔤 Fallback fonts for custom typography

## 📝 License

📄 This project is open source and available under the **MIT License**.

## 👨‍💻 Author

**Vicky Narvare** - Frontend Developer & Web Designer

| Platform | Link |
|----------|------|
| 📧 Email | [vickynarvare51@gmail.com](mailto:vickynarvare51@gmail.com) |
| 🐙 GitHub | [@VickyNarvare](https://github.com/VickyNarvare) |
| 💼 LinkedIn | [vickynarvare](https://linkedin.com/in/vickynarvare) |
| 🌐 Portfolio | [vickynarvare.vercel.app](https://vickynarvare.vercel.app) |

## 🙏 Credits & Acknowledgments

- 🎬 **GSAP** - For amazing animation library
- 🎪 **Boxicons** - For beautiful icon library
- 🌍 **Open Source Community** - For inspiration and support
- 💙 **All Contributors** - For feedback and suggestions

## 💬 Support & Feedback

Have questions or suggestions? I'd love to hear from you!

- 📧 Drop me an email at [vickynarvare51@gmail.com](mailto:vickynarvare51@gmail.com)
- 🌐 Visit my portfolio: [vickynarvare.vercel.app](https://vickynarvare.vercel.app)
- 📝 Open an issue on [GitHub](https://github.com/VickyNarvare/portfolio)

---

<div align="center">

### ⭐ If you found this helpful, please consider giving it a star! ⭐

**Made with ❤️ by Vicky Narvare**

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vickynarvare.vercel.app)
[![GitHub](https://img.shields.io/badge/Source%20on-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VickyNarvare)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

