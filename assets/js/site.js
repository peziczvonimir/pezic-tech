const header = document.querySelector('.header');
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');
const languages = document.querySelector('.languages');

header.classList.add('enhanced');
menu.hidden = false;

function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}

menu.addEventListener('click', event => {
  const open = navigation.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', String(open));
  languages.open = false;
  if (open && event.detail === 0) navigation.querySelector('a').focus();
});

navigation.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  const section = navigation.classList.contains('is-open') && link.getAttribute('href').startsWith('#')
    ? document.getElementById(link.hash.slice(1))
    : null;
  closeMenu();
  if (section) {
    section.tabIndex = -1;
    section.focus({ preventScroll: true });
  }
});

languages.addEventListener('toggle', () => {
  if (languages.open) closeMenu();
});

document.addEventListener('click', event => {
  if (!header.contains(event.target)) closeMenu();
  if (!languages.contains(event.target)) languages.open = false;
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (languages.open) {
    languages.open = false;
    languages.querySelector('summary').focus();
  } else if (menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});

document.querySelectorAll('[data-language]').forEach(link => {
  function preserveSection() {
    const hash = location.hash;
    link.hash = hash && document.getElementById(hash.slice(1)) ? hash : '';
  }

  // Keep the corresponding section when opening the locale in this tab or a new one.
  preserveSection();
  window.addEventListener('hashchange', preserveSection);
});

const projectToggle = document.querySelector('[data-project-toggle]');
if (projectToggle) {
  const projectViewer = document.getElementById(projectToggle.getAttribute('aria-controls'));
  const projectTemplate = projectViewer.querySelector('template');
  const openLabel = projectToggle.querySelector('[data-open-label]');
  const closeLabel = projectToggle.querySelector('[data-close-label]');
  projectToggle.hidden = false;
  projectToggle.addEventListener('click', () => {
    const open = projectViewer.hidden;
    projectToggle.setAttribute('aria-expanded', String(open));
    openLabel.hidden = open;
    closeLabel.hidden = !open;
    projectViewer.hidden = !open;
    if (open) {
      if (!projectViewer.querySelector('iframe')) projectViewer.append(projectTemplate.content.cloneNode(true));
      projectViewer.focus({ preventScroll: true });
      projectViewer.scrollIntoView({ block: 'start' });
    }
  });
  projectViewer.querySelector('[data-project-close]')?.addEventListener('click', () => {
    projectToggle.click();
    projectToggle.focus();
  });
}

if (document.body.dataset.page === 'home') {
  if ('IntersectionObserver' in window && matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('entered');
        observer.unobserve(entry.target);
      }
    }, { threshold: .18 });
    document.querySelectorAll('.product-card .product-graphic, .project-media').forEach(item => revealObserver.observe(item));
  }

  const destinations = { '#suncro': 'suncro/', '#app': 'suncro/#app', '#process': 'suncro/', '#support': '#contact' };
  const redirectLegacySection = () => {
    if (Object.hasOwn(destinations, location.hash)) location.replace(destinations[location.hash]);
  };
  redirectLegacySection();
  window.addEventListener('hashchange', redirectLegacySection);
}
