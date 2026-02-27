import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Oeuvre } from "@/lib/types";
import BoutiqueClient from "@/components/BoutiqueClient";

export const metadata: Metadata = {
  title: "Boutique - Toutenmel",
  description:
    "Achetez les œuvres originales de Mel. Paiement sécurisé, livraison soignée.",
  alternates: { canonical: "/boutique" },
  openGraph: { title: "Boutique - Toutenmel", description: "Achetez les œuvres originales de Mel. Paiement sécurisé, livraison soignée.", url: "/boutique" },
};

export const revalidate = 60;

export default async function Boutique() {
  const { data: oeuvres } = await supabase
    .from("oeuvres")
    .select("*")
    .in("status", ["disponible", "sur commande"])
    .order("created_at", { ascending: false });

  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-10 left-0 w-80 h-80 bg-amber/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-magenta/10 rounded-full blur-3xl" />

      <div className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl sm:text-7xl font-bold text-center mb-4">
            <span className="gradient-text">Boutique</span>
          </h1>
          <p className="text-center text-warm-gray mb-14 max-w-xl mx-auto text-lg">
            Chaque oeuvre est unique et originale. Paiement sécurisé, envoi soigné.
          </p>

          <BoutiqueClient oeuvres={(oeuvres as Oeuvre[]) || []} />

          {/* Info banner */}
          <div className="mt-20 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-coral via-amber to-magenta rounded-2xl blur-sm opacity-50" />
            <div className="relative bg-white rounded-2xl p-10 text-center">
              <h2 className="text-4xl font-heading font-bold gradient-text mb-6">Livraison & Paiement</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-coral to-magenta flex items-center justify-center text-2xl mb-3">🔒</div>
                  <p className="text-warm-gray font-medium">Paiement sécurisé par carte bancaire</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber to-orange flex items-center justify-center text-2xl mb-3">📦</div>
                  <p className="text-warm-gray font-medium">Envoi soigné sous 5 jours ouvrés</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-turquoise to-electric-blue flex items-center justify-center text-2xl mb-3">✨</div>
                  <p className="text-warm-gray font-medium">Certificat d&apos;authenticité inclus</p>
                </div>
              </div>
              <Link
                href="/commandes"
                className="inline-block mt-8 text-magenta hover:text-coral font-semibold transition-colors text-lg"
              >
                Envie d&apos;une création personnalisée ? &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
