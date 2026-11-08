const copy = {
  hr: { title: 'E-mail je potvrđen', message: 'Vaš SUNCRO račun je aktiviran. Sada se možete prijaviti u aplikaciju.', openApp: 'Otvori SUNCRO aplikaciju', desktopNote: 'Ako ste potvrdu otvorili na računalu, vratite se na telefon i prijavite u SUNCRO aplikaciju.', errorTitle: 'Potvrda nije uspjela', errorMessage: 'Poveznica je istekla ili je već iskorištena. Pokušajte se prijaviti ili ponovno zatražite potvrdu.' },
  en: { title: 'Email confirmed', message: 'Your SUNCRO account is active. You can now sign in to the app.', openApp: 'Open the SUNCRO app', desktopNote: 'If you opened this confirmation on a computer, return to your phone and sign in to the SUNCRO app.', errorTitle: 'Confirmation failed', errorMessage: 'This link has expired or has already been used. Try signing in or request a new confirmation email.' },
  de: { title: 'E-Mail bestätigt', message: 'Ihr SUNCRO-Konto ist aktiviert. Sie können sich jetzt in der App anmelden.', openApp: 'SUNCRO-App öffnen', desktopNote: 'Wenn Sie die Bestätigung am Computer geöffnet haben, kehren Sie zum Smartphone zurück und melden Sie sich in der SUNCRO-App an.', errorTitle: 'Bestätigung fehlgeschlagen', errorMessage: 'Dieser Link ist abgelaufen oder wurde bereits verwendet. Melden Sie sich an oder fordern Sie eine neue Bestätigungs-E-Mail an.' },
  fr: {
    title: 'Adresse e-mail confirmée',
    message: 'Votre compte SUNCRO est actif. Vous pouvez maintenant vous connecter dans l’application.',
    openApp: 'Ouvrir l’application SUNCRO',
    desktopNote: 'Si vous avez ouvert la confirmation sur un ordinateur, revenez sur votre téléphone et connectez-vous dans l’application SUNCRO.',
    errorTitle: 'Échec de la confirmation',
    errorMessage: 'Ce lien a expiré ou a déjà été utilisé. Essayez de vous connecter ou demandez un nouvel e-mail de confirmation.',
  },
};
const params = new URLSearchParams(location.search);
const hashParams = new URLSearchParams(location.hash.slice(1));
const hasError = params.has('error') || params.has('error_code') || hashParams.has('error');
const url = new URL(location.href);
for (const key of ['access_token', 'refresh_token', 'token', 'token_hash', 'code']) {
  url.searchParams.delete(key);
}
if (hashParams.has('error') && !params.has('error')) url.searchParams.set('error', 'confirmation');
url.hash = '';
if (url.href !== location.href) history.replaceState(null, '', url.href);
function setLanguage(lang) {
  const text = copy[lang];
  updateAccountLanguage(lang);
  document.title = 'SUNCRO · ' + (hasError ? text.errorTitle : text.title);
  document.querySelectorAll('[data-copy]').forEach(element => {
    element.textContent = text[element.dataset.copy];
  });
}

document.querySelector('.auth-card').classList.toggle('has-error', hasError);
document.querySelector('.error-box').hidden = !hasError;
setLanguage(accountLanguage);
accountLanguageButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
