import type { Metadata } from "next";
import CommandeForm from "@/components/CommandeForm";

export const metadata: Metadata = {
  title: "Commandes personnalisées - Toutenmel",
  description:
    "Commandez une création unique : toile sur mesure, baskets customisées, aérographe... Mel réalise vos envies.",
  alternates: { canonical: "/commandes" },
  openGraph: { title: "Commandes personnalisées - Toutenmel", description: "Commandez une création unique : toile sur mesure, baskets customisées, aérographe... Mel réalise vos envies.", url: "/commandes" },
};

const steps = [
  {
    number: "1",
    title: "Décrivez votre projet",
    description: "Remplissez le formulaire avec votre idée : support, couleurs, dimensions, inspiration...",
    gradient: "from-coral to-orange",
  },
  {
    number: "2",
    title: "Échange & devis",
    description: "Mel vous recontacte pour affiner le projet et proposer un devis personnalisé.",
    gradient: "from-magenta to-violet",
  },
  {
    number: "3",
    title: "Création",
    description: "Une fois le devis validé, Mel crée votre œuvre. Photos d'avancement incluses !",
    gradient: "from-electric-blue to-turquoise",
  },
  {
    number: "4",
    title: "Livraison",
    description: "Votre création unique est soigneusement emballée et expédiée chez vous.",
    gradient: "from-amber to-lemon",
  },
];

export default function Commandes() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-20 left-10 w-80 h-80 bg-amber/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-10 w-72 h-72 bg-violet/10 rounded-full blur-3xl" />

      <div className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl sm:text-7xl font-bold text-center mb-4">
            <span className="gradient-text">Commandes personnalisées</span>
          </h1>
          <p className="text-center text-warm-gray mb-20 max-w-2xl mx-auto text-lg">
            Baskets customisées, toile sur mesure, guitare peinte, objet personnalisé...
            <span className="font-semibold text-coral"> Tout est possible !</span>
          </p>

          {/* Process steps - colorful */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {steps.map((step) => (
              <div key={step.number} className="text-center group">
                <div className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center text-3xl font-heading font-bold text-white mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {step.number}
                </div>
                <h3 className="text-2xl font-heading font-bold text-warm-brown mb-2">
                  {step.title}
                </h3>
                <p className="text-warm-gray">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Contact form with colorful border */}
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-coral via-amber to-magenta rounded-2xl blur-sm opacity-40" />
            <div className="relative bg-white rounded-2xl p-8 sm:p-10">
              <h2 className="text-4xl font-heading font-bold gradient-text mb-8 text-center">
                Décrivez votre projet
              </h2>
              <CommandeForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
