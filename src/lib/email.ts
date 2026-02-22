import { Resend } from "resend";

const ADMIN_EMAIL = "toutenmel@gmail.com";
const FROM_EMAIL = "Toutenmel <notifications@toutenmel.fr>";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("RESEND_API_KEY non définie — emails désactivés");
    return null;
  }
  return new Resend(key);
}

export async function sendContactNotification({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    await getResend()?.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `Nouveau message de ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(90deg, #FF5E5B, #FFB627, #D72483); padding: 3px; border-radius: 12px;">
            <div style="background: #FFF8F0; padding: 30px; border-radius: 10px;">
              <h1 style="color: #2D1810; font-size: 24px; margin-bottom: 20px;">Nouveau message sur Toutenmel</h1>
              <p style="color: #5C4A3D;"><strong>De :</strong> ${name}</p>
              <p style="color: #5C4A3D;"><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
              <div style="background: white; border-left: 4px solid #FF5E5B; padding: 16px; border-radius: 8px; margin-top: 16px;">
                <p style="color: #2D1810; white-space: pre-wrap;">${message}</p>
              </div>
              <p style="color: #5C4A3D; margin-top: 20px; font-size: 14px;">
                Tu peux répondre directement à cet email ou depuis l'<a href="https://toutenmel.fr/admin/messages" style="color: #D72483;">espace admin</a>.
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: email,
    });
  } catch (error) {
    console.error("Erreur envoi email contact:", error);
  }
}

export async function sendCommandeNotification({
  name,
  email,
  phone,
  description,
  budget,
}: {
  name: string;
  email: string;
  phone?: string;
  description: string;
  budget?: string;
}) {
  try {
    await getResend()?.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `Nouvelle commande de ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(90deg, #FF5E5B, #FFB627, #D72483); padding: 3px; border-radius: 12px;">
            <div style="background: #FFF8F0; padding: 30px; border-radius: 10px;">
              <h1 style="color: #2D1810; font-size: 24px; margin-bottom: 20px;">Nouvelle commande personnalisée</h1>
              <p style="color: #5C4A3D;"><strong>De :</strong> ${name}</p>
              <p style="color: #5C4A3D;"><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
              ${phone ? `<p style="color: #5C4A3D;"><strong>Téléphone :</strong> ${phone}</p>` : ""}
              ${budget ? `<p style="color: #5C4A3D;"><strong>Budget :</strong> ${budget}</p>` : ""}
              <div style="background: white; border-left: 4px solid #FFB627; padding: 16px; border-radius: 8px; margin-top: 16px;">
                <p style="color: #2D1810; white-space: pre-wrap;">${description}</p>
              </div>
              <p style="color: #5C4A3D; margin-top: 20px; font-size: 14px;">
                Gérer cette commande dans l'<a href="https://toutenmel.fr/admin/commandes" style="color: #D72483;">espace admin</a>.
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: email,
    });
  } catch (error) {
    console.error("Erreur envoi email commande:", error);
  }
}

export async function sendCommandeConfirmation({
  name,
  email,
  commandeId,
}: {
  name: string;
  email: string;
  commandeId: string;
}) {
  const shortId = commandeId.slice(-8);
  try {
    await getResend()?.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Votre commande Toutenmel — ${shortId}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(90deg, #FF5E5B, #FFB627, #D72483); padding: 3px; border-radius: 12px;">
            <div style="background: #FFF8F0; padding: 30px; border-radius: 10px;">
              <h1 style="color: #2D1810; font-size: 24px; margin-bottom: 20px;">Merci ${name} !</h1>
              <p style="color: #5C4A3D;">Votre demande de commande personnalisée a bien été reçue.</p>
              <div style="background: white; border-left: 4px solid #00C9A7; padding: 16px; border-radius: 8px; margin-top: 16px;">
                <p style="color: #5C4A3D; margin: 0;"><strong>Numéro de suivi :</strong></p>
                <p style="color: #2D1810; font-size: 20px; font-family: monospace; margin: 8px 0 0;">${shortId}</p>
              </div>
              <p style="color: #5C4A3D; margin-top: 16px;">
                Vous pouvez suivre l'avancement de votre commande à tout moment :
              </p>
              <div style="text-align: center; margin-top: 16px;">
                <a href="https://toutenmel.fr/suivi" style="display: inline-block; background: linear-gradient(90deg, #00C9A7, #2196F3); color: white; padding: 12px 32px; border-radius: 50px; text-decoration: none; font-weight: bold;">
                  Suivre ma commande
                </a>
              </div>
              <p style="color: #8B7D75; margin-top: 20px; font-size: 13px;">
                Utilisez votre email et les 8 derniers caractères ci-dessus pour accéder au suivi.
              </p>
              <p style="color: #5C4A3D; margin-top: 16px;">
                Mel vous recontactera sous 24 à 48h pour discuter de votre projet et établir un devis.
              </p>
              <p style="color: #8B7D75; font-size: 13px; margin-top: 24px; border-top: 1px solid #E8DDD4; padding-top: 16px;">
                Toutenmel — Art & Créations<br>
                <a href="https://toutenmel.fr" style="color: #D72483;">toutenmel.fr</a>
              </p>
            </div>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Erreur envoi confirmation client:", error);
  }
}
