"use client";

import { useState } from "react";
import ShareButtons from "@/components/ShareButtons";
import type { Oeuvre } from "@/lib/types";
import { getGradient } from "@/lib/gradients";

const categories = [
  { name: "Tout", color: "from-coral to-magenta" },
  { name: "Toiles", color: "from-coral to-orange" },
  { name: "Fluide Art", color: "from-magenta to-violet" },
  { name: "Aérographe", color: "from-electric-blue to-turquoise" },
  { name: "Customisations", color: "from-amber to-lemon" },
];

function StatusBadge({ status }: { status: Oeuvre["status"] }) {
  const styles = {
    disponible: "bg-turquoise/15 text-turquoise",
    vendu: "bg-warm-gray/10 text-warm-gray",
    "sur commande": "bg-amber/15 text-amber",
  };
  const labels = {
    disponible: "Disponible",
    vendu: "Vendu",
    "sur commande": "Sur commande",
  };
  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function GalerieClient({ oeuvres }: { oeuvres: Oeuvre[] }) {
  const [active, setActive] = useState("Tout");

  const filtered = active === "Tout" ? oeuvres : oeuvres.filter((o) => o.category === active);

  // Track index per category for gradient variety
  const categoryCounters: Record<string, number> = {};

  return (
    <>
      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-14">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActive(cat.name)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              active === cat.name
                ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-105`
                : "bg-white text-warm-gray border-2 border-cream-dark hover:border-coral hover:text-coral"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Works grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-warm-gray text-lg py-12">
          Aucune œuvre dans cette catégorie pour le moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((work) => {
            const catKey = work.category;
            categoryCounters[catKey] = (categoryCounters[catKey] || 0);
            const gradient = getGradient(catKey, categoryCounters[catKey]);
            categoryCounters[catKey]++;

            return (
              <div key={work.id} className="art-card bg-white rounded-2xl overflow-hidden">
                <div className={`aspect-square bg-gradient-to-br ${gradient} flex items-center justify-center relative group cursor-pointer`}>
                  {work.image_url ? (
                    <img
                      src={work.image_url}
                      alt={work.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white/80 font-heading text-3xl drop-shadow-lg text-center px-4">
                      {work.title}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-warm-brown/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-lg font-medium bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full">
                      Voir l&apos;œuvre
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-bold text-magenta uppercase tracking-widest">
                      {work.category}
                    </p>
                    <StatusBadge status={work.status} />
                  </div>
                  <h3 className="text-2xl text-warm-brown font-heading font-semibold">
                    {work.title}
                  </h3>
                  <p className="text-sm text-warm-gray mt-1">{work.dimensions}</p>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-xl font-bold text-warm-brown">{work.price} &euro;</p>
                    {work.status === "disponible" ? (
                      <button className="bg-gradient-to-r from-coral to-magenta text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-coral/30 transition-all hover:scale-105">
                        Acheter
                      </button>
                    ) : (
                      <button className="border-2 border-coral text-coral px-5 py-2 rounded-full text-sm font-medium hover:bg-coral hover:text-white transition-all">
                        Me contacter
                      </button>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-cream-dark">
                    <span className="text-xs text-warm-gray/50">Partager</span>
                    <ShareButtons title={work.title} category={work.category} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
