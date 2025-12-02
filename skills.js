// Skills Data
const skillsData = [
  {
    id: 1,
    icon: 'bx-code-alt',
    title: 'Frontend',
    skills: [
      { name: 'HTML5', dataSkill: 'html5' },
      { name: 'CSS3', dataSkill: 'css3' },
      { name: 'JavaScript', dataSkill: 'javascript' },
      { name: 'React', dataSkill: 'react' },
      { name: 'Next.js', dataSkill: 'nextjs' },
      { name: 'Tailwind CSS', dataSkill: 'tailwind' },
      { name: 'SCSS', dataSkill: 'scss' }
    ]
  },
  {
    id: 2,
    icon: 'bx-data',
    title: 'Database',
    skills: [
      { name: 'SQL', dataSkill: 'sql' },
      { name: 'MySQL', dataSkill: 'mysql' }
    ]
  },
  {
    id: 3,
    icon: 'bx-movie-play',
    title: 'Animation',
    skills: [
      { name: 'GSAP', dataSkill: 'gsap' },
      { name: 'CSS Animations', dataSkill: 'css-animations' }
    ]
  },
  {
    id: 4,
    icon: 'bx-git-branch',
    title: 'Version Control',
    skills: [
      { name: 'Git', dataSkill: 'git' },
      { name: 'GitHub', dataSkill: 'github' }
    ]
  },
  {
    id: 5,
    icon: 'bx-palette',
    title: 'Design & UX',
    skills: [
      { name: 'UI/UX Design', dataSkill: 'uiux' },
      { name: 'Responsive Design', dataSkill: 'responsive' },
      { name: 'Figma', dataSkill: 'figma' },
      { name: 'Canva', dataSkill: 'canva' }
    ]
  },
  {
    id: 6,
    icon: 'bx-code-curly',
    title: 'Dev Tools',
    skills: [
      { name: 'VS Code', dataSkill: 'vscode' },
      { name: 'Sublime Text', dataSkill: 'sublime' },
      { name: 'Chrome DevTools', dataSkill: 'devtools' },
      { name: 'NPM/Yarn', dataSkill: 'npm' }
    ]
  }
];

// Function to create skill card HTML
function createSkillCard(skillCategory) {
  const skillTags = skillCategory.skills
    .map(skill => `<span class="skill-tag" data-skill="${skill.dataSkill}">${skill.name}</span>`)
    .join('');
  
  return `
    <div class="skill-card">
      <div class="skill-icon">
        <i class="bx ${skillCategory.icon}"></i>
      </div>
      <h3 class="skill-card-title">${skillCategory.title}</h3>
      <div class="skill-tags-container">
        ${skillTags}
      </div>
    </div>
  `;
}

// Function to render all skills
function renderSkills() {
  const skillsGrid = document.querySelector('.skills-grid');
  
  if (!skillsGrid) {
    console.error('Skills grid container not found');
    return;
  }
  
  skillsGrid.innerHTML = skillsData.map(category => createSkillCard(category)).join('');
}

// Initialize skills when DOM is loaded
document.addEventListener('DOMContentLoaded', renderSkills);
