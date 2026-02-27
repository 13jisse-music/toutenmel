"use client";

import { useState } from "react";
import ShareButtons from "@/components/ShareButtons";
import type { Oeuvre } from "@/lib/types";
import { getGradient } from "@/lib/gradients";

const techniqueOrder = ["Toiles", "Fluide Art", "Aérographe"];

export default function BoutiqueClient({ oeuvres }: { oeuvres: Oeuvre[] }) {
  const [filter, setFilter] = useState<"tout" | "toiles" | "custom">("tout");

  const toiles = oeuvres.filter((o) => o.category !== "Customisations");
  const customs = oeuvres
    .filter((o) => o.category === "Customisations")
    .sort((a, b) => a.title.localeCompare(b.title, "fr"));

  // Group toiles by technique
  const toilesByTechnique: Record<string, Oeuvre[]> = {};
  for (const t of techniqueOrder) {
    const items = toiles.filter((o) => o.category === t);
    if (items.length > 0) toilesByTechnique[t] = items;
  }

  const showToiles = filter === "tout" || filter === "toiles";
  const showCustoms = filter === "tout" || filter === "custom";

  if (oeuvres.length === 0) {
    return (
      <p className="text-center text-warm-gray text-lg py-12">
        Aucune oeuvre disponible pour le moment. Revenez bientôt !
      </p>
    );
  }

  return (
    <>
      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <FilterBtn active={filter === "tout"} onClick={() => setFilter("tout")} gradient="from-coral to-magenta">
          Tout
        </FilterBtn>
        <FilterBtn active={filter === "toiles"} onClick={() => setFilter("toiles")} gradient="from-amber to-coral">
          Toiles
        </FilterBtn>
        <FilterBtn active={filter === "custom"} onClick={() => setFilter("custom")} gradient="from-violet to-electric-blue">
          <span className="hidden sm:inline">Customisations</span>
          <span className="sm:hidden">Custom.</span>
        </FilterBtn>
      </div>

      {/* ═══════════ TOILES ═══════════ */}
      {showToiles && toiles.length > 0 && (
        <section className="mb-16">
          {filter === "tout" && (
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
              <span className="gradient-text">Toiles</span>
            </h2>
          )}

          {Object.entries(toilesByTechnique).map(([technique, items]) => (
            <div key={technique} className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-coral/30" />
                <h3 className="text-lg sm:text-xl font-heading font-bold text-warm-brown whitespace-nowrap px-2">
                  {technique}
                </h3>
                <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-coral/30" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ═══════════ CUSTOMISATIONS ═══════════ */}
      {showCustoms && customs.length > 0 && (
        <section className="mb-16">
          {filter === "tout" && (
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
              <span className="gradient-text">Customisations</span>
            </h2>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {customs.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function FilterBtn({
  active,
  onClick,
  gradient,
  children,
}: {
  active: boolean;
  onClick: () => void;
  gradient: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
        active
          ? `bg-gradient-to-r ${gradient} text-white shadow-lg scale-105`
          : "bg-white text-warm-gray border-2 border-cream-dark hover:border-coral hover:text-coral"
      }`}
    >
      {children}
    </button>
  );
}

function ProductCard({ product, index }: { product: Oeuvre; index: number }) {
  const gradient = getGradient(product.category, index);

  return (
    <div className="art-card bg-white rounded-2xl overflow-hidden">
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
        {product.description && (
          <p className="text-sm text-warm-gray mt-2 line-clamp-3">
            {product.description}
          </p>
        )}
        {product.dimensions && (
          <p className="text-xs text-warm-gray/60 mt-1">{product.dimensions}</p>
        )}
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
}
