const copy = {
  hr: {loading:'Provjera poveznice…',title:'Postavite novu lozinku',message:'Nova lozinka mora imati najmanje 6 znakova.',password:'Nova lozinka',confirmPassword:'Ponovite novu lozinku',save:'Spremi novu lozinku',saving:'Spremanje…',mismatch:'Lozinke se ne podudaraju.',short:'Lozinka mora imati najmanje 6 znakova.',successTitle:'Lozinka je promijenjena',successMessage:'Sada se možete prijaviti novom lozinkom u SUNCRO aplikaciju.',openApp:'Otvori SUNCRO aplikaciju',errorTitle:'Poveznica nije valjana',errorMessage:'Poveznica je istekla ili je već iskorištena. U aplikaciji ponovno odaberite “Zaboravljena lozinka”.',saveError:'Lozinku nije moguće spremiti. Zatražite novu poveznicu.'},
  en: {loading:'Checking the link…',title:'Set a new password',message:'Your new password must contain at least 6 characters.',password:'New password',confirmPassword:'Repeat new password',save:'Save new password',saving:'Saving…',mismatch:'The passwords do not match.',short:'The password must contain at least 6 characters.',successTitle:'Password changed',successMessage:'You can now sign in to the SUNCRO app with your new password.',openApp:'Open the SUNCRO app',errorTitle:'Invalid link',errorMessage:'The link has expired or has already been used. Select “Forgot password” again in the app.',saveError:'The password could not be saved. Request a new link.'},
  de: {loading:'Link wird geprüft…',title:'Neues Passwort festlegen',message:'Das neue Passwort muss mindestens 6 Zeichen enthalten.',password:'Neues Passwort',confirmPassword:'Neues Passwort wiederholen',save:'Neues Passwort speichern',saving:'Speichern…',mismatch:'Die Passwörter stimmen nicht überein.',short:'Das Passwort muss mindestens 6 Zeichen enthalten.',successTitle:'Passwort geändert',successMessage:'Du kannst dich jetzt mit deinem neuen Passwort in der SUNCRO-App anmelden.',openApp:'SUNCRO-App öffnen',errorTitle:'Ungültiger Link',errorMessage:'Der Link ist abgelaufen oder wurde bereits verwendet. Wähle in der App erneut „Passwort vergessen“.',saveError:'Das Passwort konnte nicht gespeichert werden. Fordere einen neuen Link an.'},
  it: {
    loading: 'Verifica del link…',
    title: 'Imposta una nuova password',
    message: 'La nuova password deve contenere almeno 6 caratteri.',
    password: 'Nuova password',
    confirmPassword: 'Ripeti la nuova password',
    save: 'Salva la nuova password',
    saving: 'Salvataggio…',
    mismatch: 'Le password non coincidono.',
    short: 'La password deve contenere almeno 6 caratteri.',
    successTitle: 'Password modificata',
    successMessage: 'Ora puoi accedere all’app SUNCRO con la nuova password.',
    openApp: 'Apri l’app SUNCRO',
    errorTitle: 'Link non valido',
    errorMessage: 'Il link è scaduto o è già stato utilizzato. Seleziona di nuovo “Password dimenticata” nell’app.',
    saveError: 'Impossibile salvare la password. Richiedi un nuovo link.',
  },
};

let lang = localStorage.getItem('suncro-lang') || navigator.language.slice(0, 2).toLowerCase();
if (!Object.hasOwn(copy, lang)) lang = 'hr';
const languageLabels = { de: 'Sprache', en: 'Language', hr: 'Jezik', it: 'Lingua' };
let formErrorKey;
const translate = () => {
  document.documentElement.lang = lang;
  document.title = 'SUNCRO · ' + copy[lang].title;
  document.querySelector('.language-switcher').setAttribute('aria-label', languageLabels[lang]);
  document.querySelectorAll('[data-copy]').forEach(el => {
    const key = el.dataset.copy === 'save' && el.disabled ? 'saving' : el.dataset.copy;
    el.textContent = copy[lang][key];
  });
  if (formErrorKey) document.getElementById('form-error').textContent = copy[lang][formErrorKey];
  document.querySelectorAll('[data-lang]').forEach(button => {
    const selected = button.dataset.lang === lang;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
};
document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => { lang = button.dataset.lang; localStorage.setItem('suncro-lang', lang); translate(); }));
translate();

const client = supabase.createClient(
  'https://tmbmjtqmvpvrvbyqqiry.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtYm1qdHFtdnB2cnZieXFxaXJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0MDg4NTgsImV4cCI6MjEwMTk4NDg1OH0.Nc3zZzo9bmJ0aF4g4dBOrBq8oyeJtjXTaJMqfQox-zI'
);
const loading = document.getElementById('loading');
const form = document.getElementById('reset-form');
const linkError = document.getElementById('link-error');
const formError = document.getElementById('form-error');

async function establishSession() {
  try {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    let error = null;
    if (code) ({ error } = await client.auth.exchangeCodeForSession(code));
    else {
      const hash = new URLSearchParams(location.hash.slice(1));
      const accessToken = hash.get('access_token');
      const refreshToken = hash.get('refresh_token');
      if (!accessToken || !refreshToken) throw new Error('missing token');
      ({ error } = await client.auth.setSession({ access_token: accessToken, refresh_token: refreshToken }));
    }
    if (error) throw error;
    loading.hidden = true;
    form.hidden = false;
  } catch (_) {
    loading.hidden = true;
    linkError.hidden = false;
  }
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  const password = document.getElementById('password').value;
  const confirmation = document.getElementById('confirm-password').value;
  formError.hidden = true;
  formErrorKey = undefined;
  if (password.length < 6 || password !== confirmation) {
    formErrorKey = password.length < 6 ? 'short' : 'mismatch';
    formError.textContent = copy[lang][formErrorKey];
    formError.hidden = false;
    return;
  }
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = copy[lang].saving;
  const { error } = await client.auth.updateUser({ password });
  if (error) {
    button.disabled = false;
    button.textContent = copy[lang].save;
    formErrorKey = 'saveError';
    formError.textContent = copy[lang][formErrorKey];
    formError.hidden = false;
    return;
  }
  await client.auth.signOut();
  form.hidden = true;
  document.getElementById('success').hidden = false;
});

establishSession();
