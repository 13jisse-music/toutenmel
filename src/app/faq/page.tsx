import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - Toutenmel",
  description: "Questions fréquentes sur les oeuvres, commandes, livraison et paiement chez Toutenmel.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    category: "Les oeuvres",
    color: "border-coral",
    questions: [
      {
        q: "Les oeuvres sont-elles des originaux ?",
        a: "Oui, chaque oeuvre est une pièce unique, entièrement réalisée à la main par Mel. Il n'y a aucune reproduction ni impression.",
      },
      {
        q: "Quelles techniques utilise Mel ?",
        a: "Mel travaille sur toile (acrylique, Posca), en fluide art (pouring), à l'aérographe, et réalise des customisations sur objets (baskets, guitares, casques, etc.).",
      },
      {
        q: "Puis-je voir les oeuvres en vrai avant d'acheter ?",
        a: "C'est possible sur rendez-vous dans la région de Marseille. Contactez Mel pour organiser une visite.",
      },
      {
        q: "Les couleurs sont-elles fidèles aux photos ?",
        a: "Mel s'efforce de prendre des photos les plus fidèles possibles. Les couleurs peuvent légèrement varier selon votre écran, mais les oeuvres sont souvent encore plus vibrantes en réalité !",
      },
    ],
  },
  {
    category: "Commandes personnalisées",
    color: "border-magenta",
    questions: [
      {
        q: "Puis-je commander une oeuvre sur mesure ?",
        a: "Absolument ! Mel adore les défis créatifs. Décrivez votre envie (taille, couleurs, thème, support) via la page Commandes et recevez un devis gratuit sous 48h.",
      },
      {
        q: "Quel est le délai pour une commande personnalisée ?",
        a: "Comptez en moyenne 2 à 4 semaines selon la complexité de l'oeuvre. Mel vous tiendra informé(e) de l'avancement.",
      },
      {
        q: "Puis-je faire customiser mes propres objets ?",
        a: "Oui ! Baskets, casques, guitares, skateboards, coques de téléphone... Envoyez votre objet ou achetez-le neuf, et Mel le transforme.",
      },
      {
        q: "Que se passe-t-il si le résultat ne me plaît pas ?",
        a: "Mel vous envoie des photos à chaque étape clé pour validation. Si quelque chose ne vous convient pas, des ajustements sont possibles avant la finition.",
      },
    ],
  },
  {
    category: "Paiement",
    color: "border-amber",
    questions: [
      {
        q: "Quels modes de paiement acceptez-vous ?",
        a: "Paiement par carte bancaire (sécurisé), virement bancaire ou PayPal. Pour les commandes personnalisées, un acompte de 30% est demandé à la validation du devis.",
      },
      {
        q: "Le paiement en plusieurs fois est-il possible ?",
        a: "Pour les oeuvres de plus de 200\u00A0\u20AC, un paiement en 2 ou 3 fois sans frais peut être proposé. Contactez Mel pour en discuter.",
      },
      {
        q: "Les prix incluent-ils la TVA ?",
        a: "Les prix affichés sont TTC. Selon le statut de Mel (artiste-auteur), la TVA peut ne pas être applicable. Le détail figure sur la facture.",
      },
    ],
  },
  {
    category: "Livraison",
    color: "border-turquoise",
    questions: [
      {
        q: "Comment sont envoyées les oeuvres ?",
        a: "Les oeuvres sont soigneusement emballées (protections, carton renforcé) et envoyées par Colissimo avec suivi. Un certificat d'authenticité est inclus.",
      },
      {
        q: "Quels sont les délais de livraison ?",
        a: "5 jours ouvrés en France métropolitaine après expédition. Pour les DOM-TOM et l'international, comptez 7 à 14 jours.",
      },
      {
        q: "La remise en main propre est-elle possible ?",
        a: "Oui, dans la région de Marseille et environs. C'est gratuit et c'est l'occasion de voir les oeuvres en vrai !",
      },
      {
        q: "Livrez-vous à l'international ?",
        a: "Oui, la livraison internationale est possible. Les frais de port sont calculés au cas par cas. Contactez Mel pour un devis.",
      },
    ],
  },
  {
    category: "Après l'achat",
    color: "border-violet",
    questions: [
      {
        q: "Les oeuvres sont-elles accompagnées d'un certificat ?",
        a: "Oui, chaque oeuvre est livrée avec un certificat d'authenticité signé par Mel, garantissant qu'il s'agit d'un original.",
      },
      {
        q: "Comment entretenir mon oeuvre ?",
        a: "Les toiles sont vernies pour les protéger. Évitez l'exposition directe au soleil prolongée et la forte humidité. Un dépoussiérage léger au chiffon sec suffit.",
      },
      {
        q: "Puis-je retourner une oeuvre ?",
        a: "Vous disposez de 14 jours après réception pour exercer votre droit de rétractation (hors commandes personnalisées). L'oeuvre doit être retournée dans son état d'origine. Voir les CGV pour les détails.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-20 right-0 w-80 h-80 bg-magenta/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-0 w-72 h-72 bg-amber/10 rounded-full blur-3xl" />

      <div className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl sm:text-7xl font-bold text-center mb-4">
            <span className="gradient-text">Questions fréquentes</span>
          </h1>
          <p className="text-center text-warm-gray mb-14 max-w-xl mx-auto text-lg">
            Tout ce que vous devez savoir sur les oeuvres, commandes et livraisons.
          </p>

          <div className="space-y-10">
            {faqs.map((section) => (
              <section key={section.category}>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-warm-brown mb-6">
                  {section.category}
                </h2>
                <div className="space-y-4">
                  {section.questions.map((item, i) => (
                    <details
                      key={i}
                      className={`bg-white/70 backdrop-blur-sm rounded-2xl border-l-4 ${section.color} group`}
                    >
                      <summary className="cursor-pointer p-5 sm:p-6 font-medium text-warm-brown hover:text-coral transition-colors list-none flex items-center justify-between gap-4">
                        <span className="text-base sm:text-lg">{item.q}</span>
                        <svg
                          className="w-5 h-5 flex-shrink-0 text-warm-gray/40 group-open:rotate-180 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </summary>
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1">
                        <p className="text-warm-gray leading-relaxed">{item.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-coral via-amber to-magenta rounded-2xl blur-sm opacity-40" />
              <div className="relative bg-white rounded-2xl p-8 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-heading font-bold gradient-text mb-3">
                  Vous n&apos;avez pas trouvé votre réponse ?
                </h2>
                <p className="text-warm-gray mb-6">
                  Mel vous répond personnellement sous 24h.
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-gradient-to-r from-coral to-magenta text-white px-8 py-3.5 rounded-full font-medium hover:shadow-lg hover:shadow-coral/30 transition-all hover:scale-[1.02]"
                >
                  Contacter Mel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
