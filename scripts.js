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
  renderServices();
  renderFeatured();
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
        <img src="${config.hero.image}" alt="Stage Ready Performance" class="hero-image" />
      </div>
    </div>
  `;
}

function renderServices() {
  const services = document.getElementById('services');
  const cards = config.services.map(service => `
    <div class="statement-card">
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    </div>
  `).join('');

  services.innerHTML = `
    <div class="section-container">
      <div class="statement-grid">${cards}</div>
    </div>
  `;
}

function renderFeatured() {
  const featured = document.getElementById('featured');
  const cards = config.services.map(service => `
    <a href="${service.href}" class="feature-card">
      <img src="${service.image}" alt="${service.title}" />
      <div class="feature-overlay">
        <h2>${service.title}</h2>
        <p>${service.overlay}</p>
      </div>
    </a>
  `).join('');

  featured.innerHTML = `
    <div class="section-container">
      <div class="featured-grid">${cards}</div>
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
        <p class="eyebrow dark">${config.methodology.eyebrow}</p>
        <h2>${config.methodology.title}</h2>
      </div>
      <div class="methodology-grid">${images}</div>
    </div>
  `;
}

function renderAbout() {
  const about = document.getElementById('about');
  about.innerHTML = `
    <div class="section-container about-grid">
      <div class="about-image">
        <img src="${config.founder.image}" alt="Founder" />
      </div>
      <div class="about-content">
        <p class="eyebrow">${config.founder.eyebrow}</p>
        <h2>${config.founder.title}</h2>
        <p>${config.founder.description}</p>
        <a href="${config.founder.buttonHref}" class="primary-btn">${config.founder.buttonLabel}</a>
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
  const navLinks = config.navigation.map(link => 
    `<a href="${link.href}">${link.label}</a>`
  ).join('');

  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-left">
        <h3>${config.footer.title}</h3>
        <p>${config.footer.tagline}</p>
      </div>
      <div class="footer-right">${navLinks}</div>
    </div>
  `;
}