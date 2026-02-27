import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — Toutenmel",
  description: "Mentions légales du site toutenmel.fr",
};

export default function MentionsLegales() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
      <h1 className="text-4xl sm:text-5xl font-heading font-bold gradient-text mb-10">
        Mentions légales
      </h1>

      <div className="space-y-8 text-warm-gray leading-relaxed">
        <Section title="Éditeur du site">
          <p>
            <strong>Nom :</strong> [NOM COMPLET DE MEL — À COMPLÉTER]
          </p>
          <p>
            <strong>Statut :</strong> [Micro-entrepreneur / Artiste-auteur — À COMPLÉTER]
          </p>
          <p>
            <strong>SIRET :</strong> [NUMÉRO SIRET — À COMPLÉTER]
          </p>
          <p>
            <strong>Adresse :</strong> [ADRESSE POSTALE — À COMPLÉTER]
          </p>
          <p>
            <strong>Email :</strong>{" "}
            <a href="mailto:toutenmel@gmail.com" className="text-coral hover:text-magenta transition-colors">
              toutenmel@gmail.com
            </a>
          </p>
          <p>
            <strong>Directrice de la publication :</strong> [NOM COMPLET DE MEL — À COMPLÉTER]
          </p>
        </Section>

        <Section title="Hébergement">
          <p>
            <strong>Hébergeur :</strong> Vercel Inc.
          </p>
          <p>
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
          </p>
          <p>
            Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-coral hover:text-magenta transition-colors">vercel.com</a>
          </p>
        </Section>

        <Section title="Propriété intellectuelle">
          <p>
            L&apos;ensemble du contenu de ce site (textes, images, photographies,
            illustrations, oeuvres d&apos;art, logos) est la propriété exclusive de
            Toutenmel / [NOM DE MEL] et est protégé par le droit d&apos;auteur
            (Code de la propriété intellectuelle).
          </p>
          <p>
            Toute reproduction, représentation, modification ou exploitation,
            totale ou partielle, de quelque nature que ce soit, est strictement
            interdite sans autorisation écrite préalable.
          </p>
          <p>
            Les oeuvres présentées sont des créations originales. Toute
            contrefaçon est passible de poursuites pénales (articles L.335-2 et
            suivants du Code de la propriété intellectuelle).
          </p>
        </Section>

        <Section title="Responsabilité">
          <p>
            Toutenmel s&apos;efforce d&apos;assurer l&apos;exactitude des informations
            diffusées sur ce site. Toutefois, elle ne peut garantir l&apos;absence
            d&apos;erreurs ou d&apos;omissions et se réserve le droit de modifier le
            contenu à tout moment.
          </p>
          <p>
            Toutenmel ne saurait être tenue responsable des dommages directs ou
            indirects résultant de l&apos;utilisation de ce site.
          </p>
        </Section>

        <Section title="Liens hypertextes">
          <p>
            Ce site peut contenir des liens vers des sites tiers. Toutenmel
            n&apos;exerce aucun contrôle sur ces sites et décline toute
            responsabilité quant à leur contenu.
          </p>
        </Section>

        <Section title="Droit applicable">
          <p>
            Les présentes mentions légales sont régies par le droit français.
            Tout litige sera soumis à la compétence exclusive des tribunaux
            français.
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
