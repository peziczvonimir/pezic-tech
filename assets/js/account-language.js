const accountLabels = {
  de: { language: 'Sprache', legal: 'Rechtliches', imprint: 'Impressum', privacy: 'Datenschutz' },
  en: { language: 'Language', legal: 'Legal', imprint: 'Legal notice', privacy: 'Privacy notice' },
  hr: { language: 'Jezik', legal: 'Pravne informacije', imprint: 'Impresum', privacy: 'Privatnost' },
  fr: { language: 'Langue', legal: 'Informations légales', imprint: 'Mentions légales', privacy: 'Confidentialité' },
};
const accountLanguageButtons = document.querySelectorAll('[data-lang]');
const browserLanguage = navigator.language.slice(0, 2).toLowerCase();
const accountLanguage = Object.hasOwn(accountLabels, browserLanguage) ? browserLanguage : 'hr';

function updateAccountLanguage(lang) {
  const labels = accountLabels[lang];
  const folder = lang === 'de' ? '../legal/' : '../' + lang + '/legal/';
  document.documentElement.lang = lang;
  document.querySelector('.language-switcher').setAttribute('aria-label', labels.language);
  accountLanguageButtons.forEach(button => {
    const selected = button.dataset.lang === lang;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  const legal = document.querySelector('.account-legal');
  const [imprint, privacy] = legal.querySelectorAll('a');
  legal.setAttribute('aria-label', labels.legal);
  imprint.href = folder + 'impressum.html';
  imprint.textContent = labels.imprint;
  privacy.href = folder + 'datenschutz.html';
  privacy.textContent = labels.privacy;
}
