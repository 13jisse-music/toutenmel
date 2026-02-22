import type { Metadata } from "next";
import SuiviClient from "@/components/SuiviClient";

export const metadata: Metadata = {
  title: "Suivi de commande - Toutenmel",
  description: "Suivez l'avancement de votre commande Toutenmel.",
  alternates: { canonical: "/suivi" },
  openGraph: { title: "Suivi de commande - Toutenmel", description: "Suivez l'avancement de votre commande Toutenmel.", url: "/suivi" },
};

export default function Suivi() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-20 left-0 w-80 h-80 bg-turquoise/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-0 w-72 h-72 bg-amber/10 rounded-full blur-3xl" />

      <div className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl sm:text-7xl font-bold text-center mb-4">
            <span className="gradient-text">Suivi de commande</span>
          </h1>
          <p className="text-center text-warm-gray mb-12 max-w-xl mx-auto text-lg">
            Entrez votre email et votre numéro de commande pour suivre l&apos;avancement.
          </p>

          <SuiviClient />
        </div>
      </div>
    </div>
  );
}
