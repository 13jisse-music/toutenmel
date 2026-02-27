import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Toutenmel",
  description: "Politique de confidentialité et protection des données personnelles de toutenmel.fr",
};

export const revalidate = 60;

async function getSettings() {
  const { data } = await supabaseAdmin
    .from("site_settings")
    .select("*")
    .eq("id", "main")
    .single();
  return data;
}

export default async function Confidentialite() {
  const s = await getSettings();
  const name = s?.legal_name || "[Non renseigné]";

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
      <h1 className="text-4xl sm:text-5xl font-heading font-bold gradient-text mb-10">
        Politique de confidentialité
      </h1>

      <div className="space-y-8 text-warm-gray leading-relaxed">
        <Section title="Responsable du traitement">
          <p>
            {name}
            <br />
            Email :{" "}
            <a href="mailto:toutenmel@gmail.com" className="text-coral hover:text-magenta transition-colors">
              toutenmel@gmail.com
            </a>
          </p>
        </Section>

        <Section title="Données collectées">
          <p>Nous collectons les données suivantes :</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Formulaire de contact :</strong> nom, adresse email, message</li>
            <li><strong>Commandes :</strong> nom, adresse email, description de la commande, budget éventuel</li>
            <li><strong>Suivi de commande :</strong> email et numéro de commande</li>
          </ul>
          <p>
            Aucune donnée bancaire n&apos;est collectée directement sur le site.
            Les paiements sont effectués par virement ou PayPal.
          </p>
        </Section>

        <Section title="Finalités du traitement">
          <p>Vos données sont utilisées pour :</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Répondre à vos messages et demandes de contact</li>
            <li>Traiter et suivre vos commandes</li>
            <li>Établir des devis et factures</li>
            <li>Vous envoyer des confirmations de commande par email</li>
          </ul>
          <p>
            Vos données ne sont <strong>jamais utilisées à des fins
            commerciales</strong> ni transmises à des tiers à des fins de
            prospection.
          </p>
        </Section>

        <Section title="Base légale">
          <p>Le traitement de vos données repose sur :</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>L&apos;exécution d&apos;un contrat</strong> (commandes, livraisons, facturation)</li>
            <li><strong>Votre consentement</strong> (formulaire de contact)</li>
            <li><strong>L&apos;intérêt légitime</strong> (amélioration du site et du service)</li>
          </ul>
        </Section>

        <Section title="Durée de conservation">
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Messages de contact :</strong> 1 an après le dernier échange</li>
            <li><strong>Données de commande :</strong> 5 ans (obligation comptable)</li>
            <li><strong>Factures :</strong> 10 ans (obligation légale)</li>
          </ul>
        </Section>

        <Section title="Sous-traitants">
          <p>
            Vos données peuvent être traitées par les prestataires suivants,
            dans le strict cadre de leurs services :
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Vercel</strong> (hébergement du site) — États-Unis, conforme aux clauses contractuelles types UE</li>
            <li><strong>Supabase</strong> (base de données) — Europe (eu-north-1)</li>
            <li><strong>Resend</strong> (envoi d&apos;emails transactionnels) — États-Unis, conforme RGPD</li>
          </ul>
        </Section>

        <Section title="Vos droits">
          <p>
            Conformément au Règlement Général sur la Protection des Données
            (RGPD) et à la loi Informatique et Libertés, vous disposez des
            droits suivants :
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Droit d&apos;accès</strong> à vos données personnelles</li>
            <li><strong>Droit de rectification</strong> des données inexactes</li>
            <li><strong>Droit à l&apos;effacement</strong> de vos données</li>
            <li><strong>Droit à la limitation</strong> du traitement</li>
            <li><strong>Droit à la portabilité</strong> de vos données</li>
            <li><strong>Droit d&apos;opposition</strong> au traitement</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à{" "}
            <a href="mailto:toutenmel@gmail.com" className="text-coral hover:text-magenta transition-colors">
              toutenmel@gmail.com
            </a>
            . Nous répondrons dans un délai d&apos;un mois.
          </p>
          <p>
            En cas de difficulté, vous pouvez introduire une réclamation auprès
            de la{" "}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-coral hover:text-magenta transition-colors">
              CNIL
            </a>
            .
          </p>
        </Section>

        <Section title="Sécurité">
          <p>
            Nous mettons en oeuvre des mesures techniques et
            organisationnelles appropriées pour protéger vos données contre
            tout accès non autorisé, perte ou destruction : connexion
            chiffrée (HTTPS), accès restreint aux données, hébergement
            sécurisé.
          </p>
        </Section>

        <p className="text-sm text-warm-gray/50 pt-4">
          Dernière mise à jour : février 2026
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-heading font-bold text-warm-brown mb-3">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
