import type { Metadata } from "next";
import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";
import { supabase } from "@/lib/supabase";
import type { Oeuvre } from "@/lib/types";
import { getGradient } from "@/lib/gradients";

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

  const products = (oeuvres as Oeuvre[]) || [];

  const categoryCounters: Record<string, number> = {};

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
            Chaque œuvre est unique et originale. Paiement sécurisé, envoi soigné.
          </p>

          {products.length === 0 ? (
            <p className="text-center text-warm-gray text-lg py-12">
              Aucune œuvre disponible pour le moment. Revenez bientôt !
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => {
                const catKey = product.category;
                categoryCounters[catKey] = categoryCounters[catKey] || 0;
                const gradient = getGradient(catKey, categoryCounters[catKey]);
                categoryCounters[catKey]++;

                return (
                  <div key={product.id} className="art-card bg-white rounded-2xl overflow-hidden">
                    <div className={`aspect-square bg-gradient-to-br ${gradient} flex items-center justify-center relative group cursor-pointer`}>
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white/80 font-heading text-3xl drop-shadow-lg text-center px-4">
                          {product.title}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-warm-brown/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-lg font-medium bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full">
                          Détails
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-bold text-magenta uppercase tracking-widest">
                        {product.category}
                      </p>
                      <h3 className="text-2xl text-warm-brown font-heading font-semibold mt-1">
                        {product.title}
                      </h3>
                      <p className="text-sm text-warm-gray mt-1">{product.dimensions}</p>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-2xl font-bold gradient-text">{product.price} &euro;</p>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            product.status === "disponible"
                              ? "bg-turquoise/15 text-turquoise"
                              : "bg-amber/15 text-amber"
                          }`}
                        >
                          {product.status === "disponible" ? "Disponible" : "Sur commande"}
                        </span>
                      </div>
                      <button className="w-full mt-4 bg-gradient-to-r from-coral to-magenta text-white py-3 rounded-full font-medium hover:shadow-lg hover:shadow-coral/30 transition-all hover:scale-[1.02]">
                        {product.status === "disponible" ? "Ajouter au panier" : "Commander"}
                      </button>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-cream-dark">
                        <span className="text-xs text-warm-gray/50">Partager</span>
                        <ShareButtons title={product.title} category={product.category} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

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
