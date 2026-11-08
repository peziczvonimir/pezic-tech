const copy = {
  hr: {loading:'Provjera poveznice…',title:'Postavite novu lozinku',message:'Nova lozinka mora imati najmanje 6 znakova.',password:'Nova lozinka',confirmPassword:'Ponovite novu lozinku',save:'Spremi novu lozinku',saving:'Spremanje…',mismatch:'Lozinke se ne podudaraju.',short:'Lozinka mora imati najmanje 6 znakova.',successTitle:'Lozinka je promijenjena',successMessage:'Sada se možete prijaviti novom lozinkom u SUNCRO aplikaciju.',openApp:'Otvori SUNCRO aplikaciju',errorTitle:'Poveznica nije valjana',errorMessage:'Poveznica je istekla ili je već iskorištena. U aplikaciji ponovno odaberite “Zaboravljena lozinka”.',saveError:'Lozinku nije moguće spremiti. Zatražite novu poveznicu.'},
  en: {loading:'Checking the link…',title:'Set a new password',message:'Your new password must contain at least 6 characters.',password:'New password',confirmPassword:'Repeat new password',save:'Save new password',saving:'Saving…',mismatch:'The passwords do not match.',short:'The password must contain at least 6 characters.',successTitle:'Password changed',successMessage:'You can now sign in to the SUNCRO app with your new password.',openApp:'Open the SUNCRO app',errorTitle:'Invalid link',errorMessage:'The link has expired or has already been used. Select “Forgot password” again in the app.',saveError:'The password could not be saved. Request a new link.'},
  de: {loading:'Link wird geprüft…',title:'Neues Passwort festlegen',message:'Das neue Passwort muss mindestens 6 Zeichen enthalten.',password:'Neues Passwort',confirmPassword:'Neues Passwort wiederholen',save:'Neues Passwort speichern',saving:'Speichern…',mismatch:'Die Passwörter stimmen nicht überein.',short:'Das Passwort muss mindestens 6 Zeichen enthalten.',successTitle:'Passwort geändert',successMessage:'Du kannst dich jetzt mit deinem neuen Passwort in der SUNCRO-App anmelden.',openApp:'SUNCRO-App öffnen',errorTitle:'Ungültiger Link',errorMessage:'Der Link ist abgelaufen oder wurde bereits verwendet. Wähle in der App erneut „Passwort vergessen“.',saveError:'Das Passwort konnte nicht gespeichert werden. Fordere einen neuen Link an.'},
  fr: {
    loading: 'Vérification du lien…',
    title: 'Choisissez un nouveau mot de passe',
    message: 'Votre nouveau mot de passe doit contenir au moins 6 caractères.',
    password: 'Nouveau mot de passe',
    confirmPassword: 'Confirmez le nouveau mot de passe',
    save: 'Enregistrer le mot de passe',
    saving: 'Enregistrement…',
    mismatch: 'Les mots de passe ne correspondent pas.',
    short: 'Le mot de passe doit contenir au moins 6 caractères.',
    successTitle: 'Mot de passe modifié',
    successMessage: 'Vous pouvez maintenant vous connecter dans l’application SUNCRO avec votre nouveau mot de passe.',
    openApp: 'Ouvrir l’application SUNCRO',
    errorTitle: 'Lien non valide',
    errorMessage: 'Ce lien a expiré ou a déjà été utilisé. Sélectionnez de nouveau « Mot de passe oublié » dans l’application.',
    saveError: 'Impossible d’enregistrer le mot de passe. Demandez un nouveau lien.',
  },
};

let lang = accountLanguage;
let formErrorKey;
const translate = () => {
  updateAccountLanguage(lang);
  document.title = 'SUNCRO · ' + copy[lang].title;
  document.querySelectorAll('[data-copy]').forEach(el => {
    const key = el.dataset.copy === 'save' && el.disabled ? 'saving' : el.dataset.copy;
    el.textContent = copy[lang][key];
  });
  if (formErrorKey) document.getElementById('form-error').textContent = copy[lang][formErrorKey];
};
accountLanguageButtons.forEach(button => button.addEventListener('click', () => {
  lang = button.dataset.lang;
  translate();
}));
translate();

// Retain a same-origin PKCE verifier from an existing flow without persisting the recovery session.
const recoveryValues = new Map();
const recoveryStorage = {
  getItem(key) {
    if (recoveryValues.has(key)) return recoveryValues.get(key);
    if (!key.endsWith('-code-verifier')) return null;
    try { return localStorage.getItem(key); } catch { return null; }
  },
  setItem(key, value) {
    recoveryValues.set(key, value);
  },
  removeItem(key) {
    recoveryValues.delete(key);
    if (key.endsWith('-code-verifier')) {
      try { localStorage.removeItem(key); } catch {}
    }
  },
};
const createRecoveryClient = () => supabase.createClient(
  'https://tmbmjtqmvpvrvbyqqiry.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtYm1qdHFtdnB2cnZieXFxaXJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0MDg4NTgsImV4cCI6MjEwMTk4NDg1OH0.Nc3zZzo9bmJ0aF4g4dBOrBq8oyeJtjXTaJMqfQox-zI',
  { auth: { storage: recoveryStorage, detectSessionInUrl: false, autoRefreshToken: false } },
);
const loading = document.getElementById('loading');
const form = document.getElementById('reset-form');
const linkError = document.getElementById('link-error');
const formError = document.getElementById('form-error');
let client;

async function establishSession() {
  const url = new URL(location.href);
  const code = url.searchParams.get('code');
  const hash = new URLSearchParams(url.hash.slice(1));
  const accessToken = hash.get('access_token');
  const refreshToken = hash.get('refresh_token');
  try {
    if (!code && (!accessToken || !refreshToken)) throw new Error('missing token');

    client = createRecoveryClient();
    const { error } = code
      ? await client.auth.exchangeCodeForSession(code)
      : await client.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
    if (error) throw error;
    loading.hidden = true;
    form.hidden = false;
  } catch (_) {
    loading.hidden = true;
    linkError.hidden = false;
  } finally {
    url.searchParams.delete('code');
    url.hash = '';
    if (url.href !== location.href) history.replaceState(null, '', url.href);
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
  try {
    const { error } = await client.auth.updateUser({ password });
    if (error) throw error;
  } catch {
    button.disabled = false;
    button.textContent = copy[lang].save;
    formErrorKey = 'saveError';
    formError.textContent = copy[lang][formErrorKey];
    formError.hidden = false;
    return;
  }
  await client.auth.signOut().catch(() => {});
  form.hidden = true;
  document.getElementById('success').hidden = false;
});

establishSession();
