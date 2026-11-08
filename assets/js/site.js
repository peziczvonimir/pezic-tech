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

menu.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', String(open));
  languages.open = false;
});

navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
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

if (document.body.dataset.page === 'home') {
  const destinations = { '#suncro': 'suncro/', '#app': 'suncro/#app', '#process': 'suncro/', '#support': '#contact' };
  const redirectLegacySection = () => {
    if (Object.hasOwn(destinations, location.hash)) location.replace(destinations[location.hash]);
  };
  redirectLegacySection();
  window.addEventListener('hashchange', redirectLegacySection);
}
