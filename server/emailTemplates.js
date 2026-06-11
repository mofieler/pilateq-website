// Email template helpers for the Pilateq Resend backend.
// These templates use table-based layouts for maximum email client compatibility.

const BRAND = {
  cream: '#FAF6F0',
  sand: '#F0EAE0',
  brown: '#4A3427',
  tan: '#C4956A',
  white: '#FFFFFF',
};

const getLogoUrl = (baseUrl) => `${baseUrl.replace(/\/$/, '')}/assets/logo.png`;

const escapeHtml = (text = '') =>
  String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const emailShell = (content, baseUrl, title) => `
<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <style>
      @media only screen and (max-width: 600px) {
        .container { width: 100% !important; padding: 24px !important; }
        .heading { font-size: 22px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:${BRAND.cream};font-family:'Outfit',Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${BRAND.cream};">
      <tr>
        <td align="center" style="padding: 40px 16px;">
          <table role="presentation" class="container" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:600px;background:${BRAND.white};border-radius:24px;overflow:hidden;">
            <tr>
              <td align="center" style="padding: 36px 40px 24px;">
                <img src="${getLogoUrl(baseUrl)}" alt="Pilateq" width="56" height="56" style="display:block;border-radius:50%;" />
              </td>
            </tr>
            ${content}
            <tr>
              <td style="padding: 24px 40px 40px; text-align: center;">
                <p style="margin:0;font-size:12px;color:rgba(74,52,39,0.45);line-height:1.6;">
                  Pilateq · Stuttgart, Deutschland<br />
                  <a href="${baseUrl}" style="color:${BRAND.tan};text-decoration:none;">pilateq.de</a> · <a href="mailto:info@pilateq.de" style="color:${BRAND.tan};text-decoration:none;">info@pilateq.de</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

// -----------------------------------------------------------------------------
// Admin notification email (German, sent to info@pilateq.de)
// -----------------------------------------------------------------------------

const adminEmail = (data, baseUrl) => {
  const subject = `Neue Pilateq-Anfrage von ${data.name}`;

  const html = emailShell(
    `
    <tr>
      <td style="padding: 0 40px 8px;">
        <h1 class="heading" style="margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-size:28px;font-weight:600;color:${BRAND.brown};line-height:1.2;text-align:center;">
          Neue Kontaktanfrage
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 0 40px 32px; text-align: center;">
        <p style="margin:0;font-size:15px;color:rgba(74,52,39,0.65);line-height:1.6;">
          <strong>${escapeHtml(data.name)}</strong> möchte die 14-tägige Testphase starten.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 0 40px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
          <tr>
            <td style="padding:14px 0;border-bottom:1px solid ${BRAND.sand};font-size:12px;color:${BRAND.tan};text-transform:uppercase;letter-spacing:0.08em;width:120px;vertical-align:top;">Name</td>
            <td style="padding:14px 0;border-bottom:1px solid ${BRAND.sand};font-size:15px;color:${BRAND.brown};vertical-align:top;">${escapeHtml(data.name)}</td>
          </tr>
          <tr>
            <td style="padding:14px 0;border-bottom:1px solid ${BRAND.sand};font-size:12px;color:${BRAND.tan};text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">E-Mail</td>
            <td style="padding:14px 0;border-bottom:1px solid ${BRAND.sand};font-size:15px;color:${BRAND.brown};vertical-align:top;"><a href="mailto:${escapeHtml(data.email)}" style="color:${BRAND.brown};text-decoration:underline;">${escapeHtml(data.email)}</a></td>
          </tr>
          <tr>
            <td style="padding:14px 0;border-bottom:1px solid ${BRAND.sand};font-size:12px;color:${BRAND.tan};text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Studio</td>
            <td style="padding:14px 0;border-bottom:1px solid ${BRAND.sand};font-size:15px;color:${BRAND.brown};vertical-align:top;">${escapeHtml(data.studio) || '<span style="color:rgba(74,52,39,0.45);">Nicht angegeben</span>'}</td>
          </tr>
          <tr>
            <td style="padding:14px 0;font-size:12px;color:${BRAND.tan};text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Nachricht</td>
            <td style="padding:14px 0;font-size:15px;color:${BRAND.brown};white-space:pre-wrap;line-height:1.6;vertical-align:top;">${escapeHtml(data.message) || '<span style="color:rgba(74,52,39,0.45);">Keine Nachricht</span>'}</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px 40px 0; text-align: center;">
        <a href="mailto:${encodeURIComponent(data.email)}" style="display:inline-block;padding:14px 28px;background:${BRAND.tan};color:#fff;font-size:14px;font-weight:600;text-decoration:none;border-radius:9999px;">Antworten</a>
      </td>
    </tr>
    `,
    baseUrl,
    subject
  );

  const text = `Neue Pilateq-Anfrage\n\nName: ${data.name}\nE-Mail: ${data.email}\nStudio: ${data.studio || 'Nicht angegeben'}\n\nNachricht:\n${data.message || 'Keine Nachricht'}\n\n---\npilateq.de`;

  return { subject, html, text };
};

// -----------------------------------------------------------------------------
// User confirmation email (localized)
// -----------------------------------------------------------------------------

const userCopy = {
  de: {
    subject: 'Wir haben deine Anfrage erhalten',
    heading: 'Danke für deine Anfrage',
    intro: 'Wir prüfen deine Nachricht und melden uns innerhalb von 24 Stunden bei dir. In der Zwischenzeit kannst du dich schon einmal auf unserer Website umsehen.',
    stepsTitle: 'So geht es weiter',
    steps: [
      'Wir prüfen deine Nachricht innerhalb von 24 Stunden',
      'Du erhältst Zugang zu deinem Testkonto',
      'Wir vereinbaren ein kurzes Onboarding-Gespräch',
      'Du beginnst, dein Studio wunderschön zu verwalten',
    ],
    cta: 'Zurück zu Pilateq',
    privacy: 'Deine Daten werden vertraulich behandelt und nur zur Bearbeitung deiner Anfrage verwendet.',
  },
  en: {
    subject: 'We received your message',
    heading: 'Thanks for reaching out',
    intro: 'We are reviewing your message and will get back to you within 24 hours. In the meantime, feel free to explore our website.',
    stepsTitle: 'What happens next',
    steps: [
      'We review your message within 24 hours',
      'You receive access to your trial account',
      'We schedule a short onboarding call',
      'You start managing your studio beautifully',
    ],
    cta: 'Back to Pilateq',
    privacy: 'Your data is kept confidential and used only to process your request.',
  },
  es: {
    subject: 'Hemos recibido tu mensaje',
    heading: 'Gracias por contactarnos',
    intro: 'Estamos revisando tu mensaje y te responderemos en un plazo de 24 horas. Mientras tanto, puedes explorar nuestra web.',
    stepsTitle: 'Qué ocurre a continuación',
    steps: [
      'Revisamos tu mensaje en un plazo de 24 horas',
      'Recibes acceso a tu cuenta de prueba',
      'Acordamos una breve llamada de onboarding',
      'Empiezas a gestionar tu estudio con elegancia',
    ],
    cta: 'Volver a Pilateq',
    privacy: 'Tus datos se tratan de forma confidencial y solo se utilizan para gestionar tu solicitud.',
  },
  fr: {
    subject: 'Nous avons bien reçu votre message',
    heading: 'Merci pour votre message',
    intro: "Nous examinons votre message et vous répondrons dans les 24 heures. En attendant, n'hésitez pas à explorer notre site.",
    stepsTitle: 'Prochaines étapes',
    steps: [
      'Nous examinons votre message dans les 24 heures',
      "Vous recevez l'accès à votre compte d'essai",
      "Nous planifions un court appel d'intégration",
      'Vous commencez à gérer votre studio en toute sérénité',
    ],
    cta: 'Retour à Pilateq',
    privacy: 'Vos données sont traitées confidentiellement et utilisées uniquement pour traiter votre demande.',
  },
  it: {
    subject: 'Abbiamo ricevuto il tuo messaggio',
    heading: 'Grazie per averci contattato',
    intro: 'Stiamo esaminando il tuo messaggio e ti risponderemo entro 24 ore. Nel frattempo, sentiti libero di esplorare il nostro sito.',
    stepsTitle: 'Cosa succede ora',
    steps: [
      'Esaminiamo il tuo messaggio entro 24 ore',
      "Ricevi l'accesso al tuo account di prova",
      'Fissiamo una breve call di onboarding',
      'Inizi a gestire il tuo studio con eleganza',
    ],
    cta: 'Torna a Pilateq',
    privacy: 'I tuoi dati sono trattati in modo confidenziale e utilizzati solo per gestire la tua richiesta.',
  },
};

const userConfirmationEmail = (data, baseUrl) => {
  const locale = data.locale && userCopy[data.locale] ? data.locale : 'de';
  const copy = userCopy[locale];
  const subject = copy.subject;
  const firstName = escapeHtml(String(data.name).split(' ')[0]);

  const stepsHtml = copy.steps
    .map((step, i) => `
      <tr>
        <td style="padding:10px 0;vertical-align:top;" width="28">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:${BRAND.tan};color:#fff;border-radius:50%;font-size:11px;font-weight:600;">${i + 1}</span>
        </td>
        <td style="padding:10px 0;font-size:14px;color:${BRAND.brown};line-height:1.5;vertical-align:top;">${step}</td>
      </tr>
    `)
    .join('');

  const html = emailShell(
    `
    <tr>
      <td style="padding: 0 40px 12px; text-align: center;">
        <h1 class="heading" style="margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-size:28px;font-weight:600;color:${BRAND.brown};line-height:1.2;">
          ${copy.heading}, ${firstName}
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 0 40px 32px; text-align: center;">
        <p style="margin:0;font-size:15px;color:rgba(74,52,39,0.65);line-height:1.6;">
          ${copy.intro}
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 0 40px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${BRAND.cream};border-radius:16px;">
          <tr>
            <td style="padding: 24px;">
              <h2 style="margin:0 0 16px;font-size:14px;font-weight:600;color:${BRAND.tan};text-transform:uppercase;letter-spacing:0.08em;">${copy.stepsTitle}</h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${stepsHtml}</table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px 40px 0; text-align: center;">
        <a href="${baseUrl}" style="display:inline-block;padding:14px 28px;background:${BRAND.tan};color:#fff;font-size:14px;font-weight:600;text-decoration:none;border-radius:9999px;">${copy.cta}</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 28px 40px 0; text-align: center;">
        <p style="margin:0;font-size:12px;color:rgba(74,52,39,0.45);line-height:1.6;">${copy.privacy}</p>
      </td>
    </tr>
    `,
    baseUrl,
    subject
  );

  const text = `${copy.heading}, ${firstName}\n\n${copy.intro}\n\n${copy.stepsTitle}:\n${copy.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n${baseUrl}\n\n${copy.privacy}`;

  return { subject, html, text };
};

export { adminEmail, userConfirmationEmail };
