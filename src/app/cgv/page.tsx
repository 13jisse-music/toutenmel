import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente — Toutenmel",
  description: "CGV du site toutenmel.fr — Vente d'oeuvres d'art originales",
};

export default function CGV() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
      <h1 className="text-4xl sm:text-5xl font-heading font-bold gradient-text mb-10">
        Conditions Générales de Vente
      </h1>

      <div className="space-y-8 text-warm-gray leading-relaxed">
        <Section title="Article 1 — Objet">
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent les
            ventes d&apos;oeuvres d&apos;art originales et de créations
            personnalisées réalisées par Toutenmel / [NOM DE MEL], artiste
            peintre, via le site <strong>toutenmel.fr</strong>.
          </p>
          <p>
            Toute commande implique l&apos;acceptation sans réserve des présentes
            CGV.
          </p>
        </Section>

        <Section title="Article 2 — Produits">
          <p>Les produits proposés sont :</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Des oeuvres d&apos;art originales (toiles, fluide art, aérographe)</li>
            <li>Des customisations d&apos;objets</li>
            <li>Des commandes personnalisées sur mesure</li>
          </ul>
          <p>
            Chaque oeuvre est unique. Les photographies sont aussi fidèles que
            possible mais peuvent présenter de légères différences avec
            l&apos;oeuvre réelle (couleurs, reflets).
          </p>
        </Section>

        <Section title="Article 3 — Prix">
          <p>
            Les prix sont indiqués en euros (EUR) toutes taxes comprises (TTC).
          </p>
          <p>
            Conformément à l&apos;article 293 B du Code Général des Impôts, la TVA
            n&apos;est pas applicable (franchise en base de TVA).
          </p>
          <p>
            Les frais de livraison sont indiqués séparément et dépendent du
            format et de la destination.
          </p>
          <p>
            Toutenmel se réserve le droit de modifier ses prix à tout moment.
            Le prix applicable est celui affiché au moment de la commande.
          </p>
        </Section>

        <Section title="Article 4 — Commandes">
          <p>
            <strong>Oeuvres disponibles :</strong> La commande est confirmée
            après réception du paiement intégral.
          </p>
          <p>
            <strong>Commandes personnalisées :</strong> Un devis est établi
            après échange. Un acompte de 50% est demandé avant le début de la
            création. Le solde est dû à la livraison.
          </p>
          <p>
            Toutenmel se réserve le droit de refuser une commande pour tout
            motif légitime.
          </p>
        </Section>

        <Section title="Article 5 — Paiement">
          <p>Le paiement peut s&apos;effectuer par :</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Virement bancaire</li>
            <li>PayPal</li>
            <li>Espèces (en cas de remise en main propre)</li>
          </ul>
          <p>
            La commande n&apos;est traitée qu&apos;après encaissement effectif du
            paiement.
          </p>
        </Section>

        <Section title="Article 6 — Livraison">
          <p>
            Les oeuvres sont expédiées avec soin, emballées de manière adaptée
            à leur format et fragilité.
          </p>
          <p>
            <strong>Délais :</strong> Les délais de livraison sont donnés à
            titre indicatif et dépendent du transporteur. Toutenmel ne saurait
            être tenue responsable des retards de livraison imputables au
            transporteur.
          </p>
          <p>
            <strong>Remise en main propre :</strong> Possible sur rendez-vous
            dans la région [RÉGION — À COMPLÉTER].
          </p>
          <p>
            En cas de dommage constaté à la réception, le client doit émettre
            des réserves auprès du transporteur et contacter Toutenmel sous 48h
            avec photos du colis et de l&apos;oeuvre.
          </p>
        </Section>

        <Section title="Article 7 — Droit de rétractation">
          <p>
            Conformément à l&apos;article L.221-18 du Code de la consommation,
            vous disposez d&apos;un délai de <strong>14 jours</strong> à compter
            de la réception de l&apos;oeuvre pour exercer votre droit de
            rétractation, sans avoir à justifier de motifs.
          </p>
          <p>
            <strong>Exceptions :</strong> Conformément à l&apos;article L.221-28
            du Code de la consommation, le droit de rétractation ne
            s&apos;applique pas aux <strong>commandes personnalisées</strong>{" "}
            (biens confectionnés selon les spécifications du consommateur ou
            nettement personnalisés).
          </p>
          <p>
            Pour exercer ce droit, contactez-nous à{" "}
            <a href="mailto:toutenmel@gmail.com" className="text-coral hover:text-magenta transition-colors">
              toutenmel@gmail.com
            </a>
            . L&apos;oeuvre doit être retournée dans son état d&apos;origine,
            soigneusement emballée. Les frais de retour sont à la charge de
            l&apos;acheteur. Le remboursement intervient sous 14 jours après
            réception et vérification de l&apos;oeuvre.
          </p>
        </Section>

        <Section title="Article 8 — Propriété intellectuelle">
          <p>
            L&apos;achat d&apos;une oeuvre confère un droit de propriété sur
            l&apos;objet physique uniquement. Les droits d&apos;auteur restent
            la propriété exclusive de l&apos;artiste.
          </p>
          <p>
            Toute reproduction, même partielle, est interdite sans accord
            écrit. L&apos;utilisation commerciale de l&apos;image de l&apos;oeuvre
            nécessite une autorisation préalable.
          </p>
        </Section>

        <Section title="Article 9 — Garantie">
          <p>
            Les oeuvres sont vendues en l&apos;état. Toutenmel garantit
            l&apos;authenticité et l&apos;originalité de chaque création.
          </p>
          <p>
            Un certificat d&apos;authenticité peut être fourni sur demande.
          </p>
        </Section>

        <Section title="Article 10 — Responsabilité">
          <p>
            Toutenmel ne saurait être tenue responsable des dommages résultant
            d&apos;une mauvaise utilisation ou d&apos;un stockage inadapté de
            l&apos;oeuvre après livraison.
          </p>
        </Section>

        <Section title="Article 11 — Médiation">
          <p>
            En cas de litige, une solution amiable sera recherchée en
            priorité. À défaut, conformément à l&apos;article L.612-1 du Code
            de la consommation, le consommateur peut recourir gratuitement au
            service de médiation :
          </p>
          <p>
            [NOM DU MÉDIATEUR — À COMPLÉTER]
            <br />
            Site : [URL DU MÉDIATEUR — À COMPLÉTER]
          </p>
          <p>
            Plateforme européenne de règlement en ligne des litiges :{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:text-magenta transition-colors"
            >
              ec.europa.eu/consumers/odr
            </a>
          </p>
        </Section>

        <Section title="Article 12 — Droit applicable">
          <p>
            Les présentes CGV sont soumises au droit français. Tout litige
            relève de la compétence des tribunaux français.
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
