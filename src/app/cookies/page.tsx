import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de cookies — Toutenmel",
  description: "Gestion des cookies sur toutenmel.fr",
};

export default function Cookies() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
      <h1 className="text-4xl sm:text-5xl font-heading font-bold gradient-text mb-10">
        Politique de cookies
      </h1>

      <div className="space-y-8 text-warm-gray leading-relaxed">
        <Section title="Qu'est-ce qu'un cookie ?">
          <p>
            Un cookie est un petit fichier texte déposé sur votre appareil
            lors de la visite d&apos;un site web. Il permet au site de
            mémoriser certaines informations pour améliorer votre expérience
            de navigation.
          </p>
        </Section>

        <Section title="Cookies utilisés sur ce site">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2" style={{ borderImage: "linear-gradient(90deg, #FF5E5B, #FFB627, #D72483) 1" }}>
                  <th className="text-left py-3 pr-4 text-warm-brown font-heading text-base">Cookie</th>
                  <th className="text-left py-3 pr-4 text-warm-brown font-heading text-base">Type</th>
                  <th className="text-left py-3 pr-4 text-warm-brown font-heading text-base">Finalité</th>
                  <th className="text-left py-3 text-warm-brown font-heading text-base">Durée</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-gray/10">
                <tr>
                  <td className="py-3 pr-4 font-mono text-xs">admin_token</td>
                  <td className="py-3 pr-4">Essentiel</td>
                  <td className="py-3 pr-4">Authentification de l&apos;administrateur</td>
                  <td className="py-3">Session</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            Ce site utilise <strong>uniquement des cookies essentiels</strong>{" "}
            au fonctionnement du site. Aucun cookie publicitaire, de tracking
            ou de mesure d&apos;audience n&apos;est utilisé.
          </p>
        </Section>

        <Section title="Cookies tiers">
          <p>
            Ce site n&apos;utilise actuellement aucun cookie tiers (pas de
            Google Analytics, pas de réseaux sociaux, pas de publicité).
          </p>
          <p>
            Si des cookies tiers venaient à être ajoutés à l&apos;avenir,
            votre consentement vous serait demandé préalablement via un
            bandeau de consentement.
          </p>
        </Section>

        <Section title="Gérer vos cookies">
          <p>
            Vous pouvez à tout moment gérer vos préférences de cookies
            depuis les paramètres de votre navigateur :
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Chrome :</strong> Paramètres → Confidentialité et
              sécurité → Cookies
            </li>
            <li>
              <strong>Firefox :</strong> Paramètres → Vie privée et
              sécurité → Cookies
            </li>
            <li>
              <strong>Safari :</strong> Préférences → Confidentialité →
              Cookies
            </li>
            <li>
              <strong>Edge :</strong> Paramètres → Cookies et autorisations
              de site
            </li>
          </ul>
          <p>
            La désactivation des cookies essentiels peut empêcher le bon
            fonctionnement de certaines parties du site (accès
            administrateur).
          </p>
        </Section>

        <Section title="Plus d'informations">
          <p>
            Pour en savoir plus sur les cookies et vos droits, consultez le
            site de la{" "}
            <a
              href="https://www.cnil.fr/fr/cookies-et-autres-traceurs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:text-magenta transition-colors"
            >
              CNIL
            </a>
            .
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
