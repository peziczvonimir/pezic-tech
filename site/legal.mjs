export const operator = {
  name: 'Zvonimir Pezic',
  street: 'Bauernstraße 34',
  city: '71254 Ditzingen',
  email: 'info@pezic-tech.com',
};

export const legalSources = {
  github: ['GitHub Pages', 'https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection'],
  githubPrivacy: ['GitHub Privacy Statement', 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement'],
  cloudflare: ['Cloudflare', 'https://www.cloudflare.com/privacypolicy/'],
  workspace: ['Google Workspace', 'https://workspace.google.com/terms/dpa_terms.html'],
  supabase: ['Supabase', 'https://supabase.com/legal/customer-resources/data-processing-addendum'],
  heatcontrol: ['HEATCONTROL', 'https://heatcontrol.pezic-tech.com/privacy'],
  authority: ['LfDI Baden-Württemberg', 'https://www.baden-wuerttemberg.datenschutz.de/kontakt-aufnehmen/'],
};

export const legalCopy = {
  de: {
    country: 'Deutschland',
    operator: 'Anbieter und Kontakt',
    controller: 'Verantwortlicher',
    imprint: 'Pezic Tech Solutions ist ein privat betriebenes Technologieprojekt. Diese Website stellt das Projekt und seine Anwendungen vor.',
    scope: 'Diese Hinweise gelten für pezic-tech.com und go.pezic-tech.com einschließlich der SUNCRO-Seiten zur E-Mail-Bestätigung und Passwort-Wiederherstellung. Für das verlinkte HEATCONTROL-Portal gilt dessen eigene Datenschutzerklärung.',
    sections: [
      ['Hosting und Serverprotokolle', [
        'pezic-tech.com wird über GitHub Pages bereitgestellt. go.pezic-tech.com wird über Cloudflare Pages ausgeliefert. Beim Abruf verarbeiten die Hosting-Anbieter die IP-Adresse und technische Anfragedaten, etwa Zeit, angeforderte Adresse und Browserinformationen. GitHub protokolliert IP-Adressen zu Sicherheitszwecken.',
        'Zweck sind die Bereitstellung, der sichere Betrieb und die Störungsanalyse. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse ist ein funktionsfähiger und sicherer Webauftritt. Die Aufbewahrung der Hosting-Protokolle richtet sich nach den Sicherheits- und Löschregeln des jeweiligen Anbieters.',
      ], ['github', 'githubPrivacy', 'cloudflare']],
      ['Cookies und Browserspeicher', [
        'Die öffentlichen Seiten verwenden keine eigenen Cookies, Webanalyse, Werbetracker oder Speicherung der Sprachwahl. Die Sprache ergibt sich aus der Seitenadresse. Die SUNCRO-Vorschau verwendet Beispieldaten und sendet keine Eingaben.',
        'Bei der Passwort-Wiederherstellung bleiben die Sitzungsdaten im Arbeitsspeicher der geöffneten Seite. Ist für einen Wiederherstellungscode bereits ein Prüfwert im lokalen Browserspeicher vorhanden, kann dieser gelesen und entfernt werden. Diese Nutzung dient der angeforderten Funktion nach § 25 Abs. 2 Nr. 2 TDDDG. Der Hosting-Anbieter kann technisch erforderliche Sicherheits-Cookies einsetzen, etwa bei einer Sicherheitsprüfung.',
      ]],
      ['SUNCRO-Konto', [
        'Die Bestätigungsseite zeigt den Status des E-Mail-Links an. Bei der Wiederherstellung verarbeitet Supabase Auth (Supabase Pte. Ltd.) den Code oder die Sitzungstokens sowie das neue Passwort. Die Daten sind erforderlich, um die Berechtigung zu prüfen und das Passwort zu ändern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Der Wiederherstellungslink ist nur begrenzt gültig. Kontodaten werden während der Kontonutzung und soweit für gesetzliche Pflichten oder Rechtsansprüche erforderlich verarbeitet.',
      ], ['supabase']],
      ['Kontakt per E-Mail', [
        'Wenn Sie uns schreiben, verarbeiten wir Ihre E-Mail-Adresse, Ihre Nachricht und freiwillig mitgeteilte Angaben, um die Anfrage zu beantworten. Als E-Mail-Dienst nutzen wir Google Workspace. Rechtsgrundlage ist je nach Anliegen Art. 6 Abs. 1 lit. b DSGVO für Vertrags- und vorvertragliche Anfragen oder Art. 6 Abs. 1 lit. f DSGVO für sonstige Korrespondenz. Unser berechtigtes Interesse ist die Bearbeitung der Anfrage.',
        'Wir bewahren Nachrichten für die Bearbeitung auf. Eine längere Aufbewahrung erfolgt, soweit gesetzliche Pflichten oder die Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen dies erfordern.',
      ], ['workspace']],
      ['Empfänger und internationale Übermittlungen', [
        'Die oben genannten Anbieter erhalten nur die für ihren jeweiligen Dienst erforderlichen Daten. Soweit Daten außerhalb des Europäischen Wirtschaftsraums verarbeitet werden, gelten je nach Anbieter und Verarbeitung ein anwendbarer Angemessenheitsbeschluss oder geeignete Garantien wie die EU-Standardvertragsklauseln. Informationen zu den jeweiligen Garantien finden Sie bei den Anbietern oder erhalten Sie über unsere Kontaktadresse.',
      ], ['githubPrivacy', 'cloudflare', 'workspace', 'supabase']],
      ['Ihre Rechte', [
        'Sie haben nach Maßgabe der DSGVO das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit. Sie können der Verarbeitung auf Grundlage berechtigter Interessen aus Gründen widersprechen, die sich aus Ihrer besonderen Situation ergeben. Wenden Sie sich dazu an die oben genannte Kontaktadresse.',
        'Sie können sich bei einer Datenschutzaufsichtsbehörde beschweren, zum Beispiel beim Landesbeauftragten für den Datenschutz und die Informationsfreiheit Baden-Württemberg.',
      ], ['authority']],
    ],
  },
  en: {
    country: 'Germany',
    operator: 'Website operator and contact',
    controller: 'Data controller',
    imprint: 'Pezic Tech Solutions is a privately operated technology project. This website introduces the project and its applications.',
    scope: 'This notice covers pezic-tech.com and go.pezic-tech.com, including the SUNCRO email confirmation and password recovery pages. The linked HEATCONTROL portal has its own privacy notice.',
    sections: [
      ['Hosting and server logs', [
        'GitHub Pages hosts pezic-tech.com. Cloudflare Pages hosts go.pezic-tech.com. When you visit, the hosting providers process your IP address and technical request data such as the time, requested address and browser information. GitHub logs IP addresses for security.',
        'We use hosting to deliver and secure the website and diagnose problems. The legal basis is Article 6(1)(f) GDPR. Our legitimate interest is to keep the site available and secure. Each provider retains its hosting logs according to its security and deletion policies.',
      ], ['github', 'githubPrivacy', 'cloudflare']],
      ['Cookies and browser storage', [
        'The public pages use no first-party cookies, analytics, advertising trackers or saved language preferences. The page address determines the language. The SUNCRO preview uses sample data and sends no inputs.',
        'During password recovery, session data stays in the open page’s memory. If a verifier for a recovery code already exists in local browser storage, the page may read and remove it. This supports the requested service under section 25(2)(2) of the German TDDDG. A hosting provider may use essential security cookies, for example during a security check.',
      ]],
      ['SUNCRO account', [
        'The confirmation page shows the status of the email link. During recovery, Supabase Auth (Supabase Pte. Ltd.) processes the code or session tokens and the new password. This data is needed to verify authorisation and change the password. The legal basis is Article 6(1)(b) GDPR. Recovery links expire. We process account data while the account is in use and for as long as needed for legal obligations or claims.',
      ], ['supabase']],
      ['Contact by email', [
        'When you write to us, we process your email address, message and any details you choose to provide so we can respond. We use Google Workspace for email. The legal basis is Article 6(1)(b) GDPR for contractual and pre-contractual enquiries or Article 6(1)(f) GDPR for other correspondence. Our legitimate interest is to handle the enquiry.',
        'We retain correspondence to handle the enquiry. We keep it longer where necessary to meet a legal obligation or to establish, exercise or defend a legal claim.',
      ], ['workspace']],
      ['Recipients and international transfers', [
        'The providers listed above receive the data needed for their respective services. When data is processed outside the European Economic Area, an applicable adequacy decision or appropriate safeguards such as the EU Standard Contractual Clauses apply, depending on the provider and processing. For details about those safeguards, see the provider links or contact us.',
      ], ['githubPrivacy', 'cloudflare', 'workspace', 'supabase']],
      ['Your rights', [
        'Subject to the GDPR, you have the right to access, rectify or erase your data, restrict processing and receive your data in a portable form. You may object to processing based on legitimate interests on grounds relating to your particular situation. To exercise your rights, use the contact address above.',
        'You can lodge a complaint with a data protection authority, such as the State Commissioner for Data Protection and Freedom of Information in Baden-Württemberg.',
      ], ['authority']],
    ],
  },
  hr: {
    country: 'Njemačka',
    operator: 'Operater i kontakt',
    controller: 'Voditelj obrade',
    imprint: 'Pezic Tech Solutions privatni je tehnološki projekt. Na ovoj stranici predstavljamo projekt i njegove aplikacije.',
    scope: 'Ova obavijest vrijedi za pezic-tech.com i go.pezic-tech.com, uključujući SUNCRO stranice za potvrdu e-pošte i obnovu lozinke. Povezani portal HEATCONTROL ima vlastitu obavijest o privatnosti.',
    sections: [
      ['Posluživanje stranice i zapisi poslužitelja', [
        'Stranicu pezic-tech.com poslužuje GitHub Pages, a go.pezic-tech.com poslužuje Cloudflare Pages. Pri posjetu pružatelji hostinga obrađuju IP adresu i tehničke podatke zahtjeva, primjerice vrijeme, traženu adresu i podatke o pregledniku. GitHub bilježi IP adrese radi sigurnosti.',
        'Ti se podaci koriste za isporuku stranice, siguran rad i otklanjanje poteškoća. Pravna osnova je čl. 6. st. 1. t. (f) GDPR-a. Naš je legitimni interes dostupnost i sigurnost stranice. Pružatelji čuvaju zapise prema svojim pravilima sigurnosti i brisanja.',
      ], ['github', 'githubPrivacy', 'cloudflare']],
      ['Kolačići i pohrana u pregledniku', [
        'Javne stranice nemaju vlastite kolačiće, analitiku ni oglasno praćenje. Odabir jezika određuje adresa stranice i ne sprema se u preglednik. SUNCRO prikaz koristi primjere podataka i ništa ne šalje.',
        'Tijekom obnove lozinke podaci sesije ostaju u memoriji otvorene stranice. Ako lokalna pohrana preglednika već sadrži verifikator koda za obnovu, stranica ga može pročitati i ukloniti. To služi zatraženoj funkciji prema § 25 st. 2. t. 2. njemačkog TDDDG-a. Pružatelj hostinga može koristiti nužne sigurnosne kolačiće, primjerice pri sigurnosnoj provjeri.',
      ]],
      ['SUNCRO račun', [
        'Stranica za potvrdu prikazuje status poveznice iz e-pošte. Pri obnovi lozinke Supabase Auth (Supabase Pte. Ltd.) obrađuje kod ili tokene sesije te novu lozinku. Ti su podaci potrebni za provjeru ovlaštenja i promjenu lozinke. Pravna osnova je čl. 6. st. 1. t. (b) GDPR-a. Poveznice za obnovu imaju ograničenu valjanost. Podatke računa obrađujemo dok je račun u uporabi i koliko je potrebno radi zakonskih obveza ili pravnih zahtjeva.',
      ], ['supabase']],
      ['Kontakt e-poštom', [
        'Kad nam pišete, obrađujemo vašu adresu e-pošte, poruku i podatke koje dobrovoljno navedete kako bismo odgovorili. Za e-poštu koristimo Google Workspace. Pravna osnova je čl. 6. st. 1. t. (b) GDPR-a za ugovorne i predugovorne upite ili t. (f) za ostalu korespondenciju. Naš je legitimni interes odgovoriti na upit.',
        'Poruke čuvamo dok obrađujemo upit. Čuvamo ih dulje kad to zahtijeva zakon ili kad su potrebne za postavljanje, ostvarivanje ili obranu pravnih zahtjeva.',
      ], ['workspace']],
      ['Primatelji i međunarodni prijenosi', [
        'Navedeni pružatelji primaju podatke potrebne za svoje usluge. Pri obradi podataka izvan Europskoga gospodarskog prostora primjenjuje se odgovarajuća odluka o primjerenosti ili zaštitne mjere poput standardnih ugovornih klauzula EU-a, ovisno o pružatelju i obradi. Pojedinosti možete pronaći na poveznicama pružatelja ili zatražiti od nas.',
      ], ['githubPrivacy', 'cloudflare', 'workspace', 'supabase']],
      ['Vaša prava', [
        'Prema GDPR-u imate pravo na pristup, ispravak, brisanje, ograničenje obrade i prenosivost podataka. Obradi na temelju legitimnog interesa možete prigovoriti iz razloga koji proizlaze iz vaše posebne situacije. Za ostvarenje prava javite nam se na navedenu adresu.',
        'Pritužbu možete podnijeti nadzornom tijelu za zaštitu podataka, primjerice tijelu LfDI Baden-Württemberg.',
      ], ['authority']],
    ],
  },
  fr: {
    country: 'Allemagne',
    operator: 'Éditeur du site et contact',
    controller: 'Responsable du traitement',
    imprint: 'Pezic Tech Solutions est un projet technologique géré à titre privé. Ce site présente le projet et ses applications.',
    scope: 'Cette notice s’applique à pezic-tech.com et go.pezic-tech.com, y compris aux pages SUNCRO de confirmation d’adresse e-mail et de réinitialisation du mot de passe. Le portail HEATCONTROL dispose de sa propre notice de confidentialité.',
    sections: [
      ['Hébergement et journaux du serveur', [
        'GitHub Pages héberge pezic-tech.com. Cloudflare Pages héberge go.pezic-tech.com. Lors d’une visite, les hébergeurs traitent l’adresse IP et les données techniques de la requête, par exemple l’heure, l’adresse demandée et les informations sur le navigateur. GitHub enregistre les adresses IP à des fins de sécurité.',
        'Ces données servent à fournir le site, à le sécuriser et à diagnostiquer les problèmes. La base juridique est l’article 6, paragraphe 1, point f) du RGPD. Notre intérêt légitime est de maintenir un site disponible et sûr. Les hébergeurs conservent leurs journaux selon leurs règles de sécurité et de suppression.',
      ], ['github', 'githubPrivacy', 'cloudflare']],
      ['Cookies et stockage dans le navigateur', [
        'Les pages publiques n’utilisent ni cookies propres au site, ni mesure d’audience, ni suivi publicitaire. L’adresse de la page détermine la langue, sans enregistrer cette préférence dans le navigateur. L’aperçu SUNCRO utilise des exemples de données et ne transmet aucune saisie.',
        'Pendant la réinitialisation du mot de passe, les données de session restent en mémoire dans la page ouverte. Si un vérificateur du code de récupération existe déjà dans le stockage local du navigateur, la page peut le lire et le supprimer. Ce traitement sert à fournir la fonction demandée, conformément au § 25, alinéa 2, point 2 de la loi allemande TDDDG. L’hébergeur peut utiliser des cookies de sécurité nécessaires, par exemple lors d’une vérification.',
      ]],
      ['Compte SUNCRO', [
        'La page de confirmation affiche l’état du lien envoyé par e-mail. Lors de la réinitialisation, Supabase Auth (Supabase Pte. Ltd.) traite le code ou les jetons de session ainsi que le nouveau mot de passe. Ces données servent à vérifier l’autorisation et à modifier le mot de passe. La base juridique est l’article 6, paragraphe 1, point b) du RGPD. Les liens de réinitialisation ont une durée de validité limitée. Nous traitons les données du compte pendant son utilisation et aussi longtemps que nécessaire pour remplir nos obligations légales ou défendre des droits.',
      ], ['supabase']],
      ['Contact par e-mail', [
        'Lorsque vous nous écrivez, nous traitons votre adresse e-mail, votre message et les informations que vous choisissez de nous communiquer pour vous répondre. Nous utilisons Google Workspace pour la messagerie. La base juridique est l’article 6, paragraphe 1, point b) du RGPD pour les demandes contractuelles ou précontractuelles, ou le point f) pour les autres échanges. Notre intérêt légitime est de traiter votre demande.',
        'Nous conservons les messages le temps de traiter la demande. Nous les gardons plus longtemps si la loi l’exige ou si cela est nécessaire pour constater, exercer ou défendre un droit en justice.',
      ], ['workspace']],
      ['Destinataires et transferts internationaux', [
        'Les prestataires ci-dessus reçoivent les données nécessaires à leurs services respectifs. Pour les traitements hors de l’Espace économique européen, une décision d’adéquation applicable ou des garanties appropriées, comme les clauses contractuelles types de l’UE, s’appliquent selon le prestataire et le traitement. Vous pouvez consulter les liens des prestataires ou nous contacter pour en savoir plus.',
      ], ['githubPrivacy', 'cloudflare', 'workspace', 'supabase']],
      ['Vos droits', [
        'Dans les conditions prévues par le RGPD, vous pouvez demander l’accès à vos données, leur rectification, leur effacement, la limitation de leur traitement ou leur portabilité. Vous pouvez vous opposer à un traitement fondé sur un intérêt légitime pour des raisons liées à votre situation particulière. Pour exercer vos droits, utilisez l’adresse de contact ci-dessus.',
        'Vous pouvez déposer une réclamation auprès d’une autorité de protection des données, par exemple le LfDI du Bade-Wurtemberg.',
      ], ['authority']],
    ],
  },
};
