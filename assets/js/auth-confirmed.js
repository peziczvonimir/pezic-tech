const copy = {
  hr: { title: 'E-mail je potvrđen', message: 'Vaš SUNCRO račun je aktiviran. Sada se možete prijaviti u aplikaciju.', openApp: 'Otvori SUNCRO aplikaciju', desktopNote: 'Ako ste potvrdu otvorili na računalu, vratite se na telefon i prijavite u SUNCRO aplikaciju.', errorTitle: 'Potvrda nije uspjela', errorMessage: 'Poveznica je istekla ili je već iskorištena. Pokušajte se prijaviti ili ponovno zatražite potvrdu.' },
  en: { title: 'Email confirmed', message: 'Your SUNCRO account is active. You can now sign in to the app.', openApp: 'Open the SUNCRO app', desktopNote: 'If you opened this confirmation on a computer, return to your phone and sign in to the SUNCRO app.', errorTitle: 'Confirmation failed', errorMessage: 'This link has expired or has already been used. Try signing in or request a new confirmation email.' },
  de: { title: 'E-Mail bestätigt', message: 'Ihr SUNCRO-Konto ist aktiviert. Sie können sich jetzt in der App anmelden.', openApp: 'SUNCRO-App öffnen', desktopNote: 'Wenn Sie die Bestätigung am Computer geöffnet haben, kehren Sie zum Smartphone zurück und melden Sie sich in der SUNCRO-App an.', errorTitle: 'Bestätigung fehlgeschlagen', errorMessage: 'Dieser Link ist abgelaufen oder wurde bereits verwendet. Melden Sie sich an oder fordern Sie eine neue Bestätigungs-E-Mail an.' },
  it: {
    title: 'Indirizzo e-mail confermato',
    message: 'Il tuo account SUNCRO è attivo. Ora puoi accedere all’app.',
    openApp: 'Apri l’app SUNCRO',
    desktopNote: 'Se hai aperto la conferma sul computer, torna sul telefono e accedi all’app SUNCRO.',
    errorTitle: 'Conferma non riuscita',
    errorMessage: 'Il link è scaduto o è già stato utilizzato. Prova ad accedere o richiedi una nuova e-mail di conferma.',
  },
};
const params = new URLSearchParams(location.search);
const hashParams = new URLSearchParams(location.hash.slice(1));
const hasError = params.has('error') || params.has('error_code') || hashParams.has('error');
const languageLabels = { de: 'Sprache', en: 'Language', hr: 'Jezik', it: 'Lingua' };
const languageButtons = document.querySelectorAll('[data-lang]');

function setLanguage(language) {
  const lang = Object.hasOwn(copy, language) ? language : 'en';
  const text = copy[lang];
  document.documentElement.lang = lang;
  document.title = 'SUNCRO · ' + (hasError ? text.errorTitle : text.title);
  document.querySelector('.language-switcher').setAttribute('aria-label', languageLabels[lang]);
  document.querySelectorAll('[data-copy]').forEach(element => {
    element.textContent = text[element.dataset.copy];
  });
  languageButtons.forEach(button => {
    const selected = button.dataset.lang === lang;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  localStorage.setItem('suncro-confirm-language', lang);
}

document.querySelector('.auth-card').classList.toggle('has-error', hasError);
const saved = localStorage.getItem('suncro-confirm-language');
setLanguage(saved || navigator.language.slice(0, 2).toLowerCase());
languageButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
