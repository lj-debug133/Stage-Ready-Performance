let config = {};

// Load config.json
fetch('config.json')
  .then(response => response.json())
  .then(data => {
    config = data;
    renderPage();
  })
  .catch(error => console.error('Error loading config:', error));

function renderPage() {
  renderNavbar();
  renderHero();
  renderPrinciples();
  renderServices();
  renderMethodology();
  renderAbout();
  renderCTA();
  renderFooter();
}

function renderNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = config.navigation.map(link => 
    `<li><a href="${link.href}">${link.label}</a></li>`
  ).join('');

  navbar.innerHTML = `
    <div class="nav-container">
      <a href="index.html" class="logo-wrap">
        <div class="logo">${config.branding.shortName}</div>
        <div class="logo-text">
          <span>${config.branding.name}</span>
          <small>${config.branding.tagline}</small>
        </div>
      </a>
      <nav>
        <ul class="nav-links">${navLinks}</ul>
      </nav>
    </div>
  `;
}

function renderHero() {
  const hero = document.getElementById('hero');
  const buttons = config.hero.buttons.map(btn =>
    `<a href="${btn.href}" class="${btn.style}-btn">${btn.label}</a>`
  ).join('');

  hero.innerHTML = `
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="hero-left">
        <p class="eyebrow">${config.hero.eyebrow}</p>
        <h1>${config.hero.title}<span>${config.hero.titleHighlight}</span></h1>
        <p class="hero-description">${config.hero.description}</p>
        <div class="hero-buttons">${buttons}</div>
      </div>
      <div class="hero-right">
        <img src="${config.hero.image}" alt="Stage Ready Performance Hero" class="hero-image" />
      </div>
    </div>
  `;
}

function renderPrinciples() {
  const principles = document.getElementById('principles');
  const principleCards = config.principles.map(principle => `
    <div class="principle-card">
      <div class="principle-icon">${principle.icon}</div>
      <h3>${principle.title}</h3>
      <p>${principle.description}</p>
    </div>
  `).join('');

  principles.innerHTML = `
    <div class="principles-container">
      ${principleCards}
    </div>
  `;
}

function renderServices() {
  const services = document.getElementById('services');
  const serviceCards = config.services.map(service => `
    <a href="${service.href}" class="service-card">
      <div class="service-image" style="background-image: url('${service.image}')"></div>
      <div class="service-overlay">
        <h2>${service.title}</h2>
        <p>${service.description}</p>
      </div>
    </a>
  `).join('');

  services.innerHTML = `
    <div class="section-container">
      <div class="services-grid">${serviceCards}</div>
    </div>
  `;
}

function renderMethodology() {
  const methodology = document.getElementById('methodology');
  const images = config.methodology.images.map(img => `
    <div class="method-card">
      <img src="${img.src}" alt="${img.alt}" />
    </div>
  `).join('');

  methodology.innerHTML = `
    <div class="section-container">
      <div class="methodology-header">
        <p class="eyebrow">${config.methodology.eyebrow}</p>
        <h2>${config.methodology.title}</h2>
        <p class="methodology-description">${config.methodology.description}</p>
      </div>
      <div class="methodology-grid">${images}</div>
    </div>
  `;
}

function renderAbout() {
  const about = document.getElementById('about');
  const educationList = config.founder.education.map(item => `<li>${item}</li>`).join('');

  about.innerHTML = `
    <div class="section-container about-grid">
      <div class="about-image">
        <img src="${config.founder.image}" alt="${config.founder.name}" />
      </div>
      <div class="about-content">
        <p class="eyebrow">${config.founder.eyebrow}</p>
        <h2>${config.founder.name}</h2>
        <p class="about-description">${config.founder.description}</p>
        <h3>Education & Certifications</h3>
        <ul class="education-list">
          ${educationList}
        </ul>
      </div>
    </div>
  `;
}

function renderCTA() {
  const cta = document.getElementById('cta');
  cta.innerHTML = `
    <div class="section-container">
      <h2>${config.cta.title}</h2>
      <a href="${config.cta.buttonHref}" class="primary-btn">${config.cta.buttonLabel}</a>
    </div>
  `;
}

function renderFooter() {
  const footer = document.getElementById('footer');
  const navLinks = config.navigation.filter(link => link.label !== 'Home').map(link => 
    `<a href="${link.href}">${link.label}</a>`
  ).join('');

  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-left">
        <h3>${config.footer.title}</h3>
        <p>${config.footer.tagline}</p>
      </div>
      <div class="footer-right">
        ${navLinks}
      </div>
    </div>
  `;
}