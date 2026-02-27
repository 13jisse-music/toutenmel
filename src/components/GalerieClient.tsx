"use client";

import ShareButtons from "@/components/ShareButtons";
import type { Oeuvre } from "@/lib/types";
import { getGradient } from "@/lib/gradients";

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

const techniqueOrder = ["Toiles", "Fluide Art", "Aérographe"];
const techniqueGradients: Record<string, string> = {
  Toiles: "from-amber via-orange to-coral",
  "Fluide Art": "from-coral via-magenta to-violet",
  Aérographe: "from-electric-blue via-turquoise to-amber",
};

export default function GalerieClient({ oeuvres }: { oeuvres: Oeuvre[] }) {
  // Séparer Toiles (peintures) et Customisations (objets)
  const toiles = oeuvres.filter((o) => o.category !== "Customisations");
  const customs = oeuvres
    .filter((o) => o.category === "Customisations")
    .sort((a, b) => a.title.localeCompare(b.title, "fr"));

  // Grouper les toiles par technique
  const toilesByTechnique: Record<string, Oeuvre[]> = {};
  for (const t of techniqueOrder) {
    const items = toiles.filter((o) => o.category === t);
    if (items.length > 0) toilesByTechnique[t] = items;
  }

  const categoryCounters: Record<string, number> = {};

  return (
    <>
      {/* ═══════════════ SECTION TOILES ═══════════════ */}
      {toiles.length > 0 && (
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl font-bold">
              <span className="gradient-text">Toiles</span>
            </h2>
            <p className="mt-2 text-warm-gray">Peintures originales par technique</p>
          </div>

          {Object.entries(toilesByTechnique).map(([technique, items]) => (
            <div key={technique} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className={`h-1 flex-1 rounded bg-gradient-to-r ${techniqueGradients[technique] || "from-coral to-magenta"}`} />
                <h3 className="text-2xl font-heading font-bold text-warm-brown whitespace-nowrap">
                  {technique}
                </h3>
                <div className={`h-1 flex-1 rounded bg-gradient-to-r ${techniqueGradients[technique] || "from-coral to-magenta"}`} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((work) => {
                  const catKey = work.category;
                  categoryCounters[catKey] = categoryCounters[catKey] || 0;
                  const gradient = getGradient(catKey, categoryCounters[catKey]);
                  categoryCounters[catKey]++;
                  return <OeuvreCard key={work.id} work={work} gradient={gradient} />;
                })}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ═══════════════ SECTION CUSTOMISATIONS ═══════════════ */}
      {customs.length > 0 && (
        <section>
          <div className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl font-bold">
              <span className="gradient-text">Customisations</span>
            </h2>
            <p className="mt-2 text-warm-gray">Objets uniques peints à la main</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {customs.map((work, i) => {
              const gradient = getGradient("Customisations", i);
              return <OeuvreCard key={work.id} work={work} gradient={gradient} />;
            })}
          </div>
        </section>
      )}

      {oeuvres.length === 0 && (
        <p className="text-center text-warm-gray text-lg py-12">
          Aucune oeuvre pour le moment. Revenez bientôt !
        </p>
      )}
    </>
  );
}

function OeuvreCard({ work, gradient }: { work: Oeuvre; gradient: string }) {
  return (
    <div className="art-card bg-white rounded-2xl overflow-hidden">
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
            Voir l&apos;oeuvre
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
        {work.description && (
          <p className="text-sm text-warm-gray mt-2 line-clamp-3">
            {work.description}
          </p>
        )}
        {work.dimensions && (
          <p className="text-xs text-warm-gray/60 mt-1">{work.dimensions}</p>
        )}
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
}
