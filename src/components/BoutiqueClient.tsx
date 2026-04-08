"use client";

import { useState } from "react";
import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";
import PhotoGallery from "@/components/PhotoGallery";
import type { Oeuvre } from "@/lib/types";
import { getGradient } from "@/lib/gradients";

const techniqueOrder = ["Toiles", "Fluide Art", "Aérographe"];

const categoryGradients: Record<string, string> = {
  "Toiles": "from-amber to-coral",
  "Fluide Art": "from-coral to-magenta",
  "Aérographe": "from-electric-blue to-turquoise",
  "Customisations": "from-violet to-electric-blue",
};

export default function BoutiqueClient({ oeuvres }: { oeuvres: Oeuvre[] }) {
  const [filter, setFilter] = useState("tout");
  const [lightboxOeuvre, setLightboxOeuvre] = useState<Oeuvre | null>(null);

  // Build ordered categories that exist in the data
  const allCategories = [...techniqueOrder, "Customisations"];
  const existingCategories = allCategories.filter((cat) => oeuvres.some((o) => o.category === cat));

  // Filtered oeuvres
  const filtered = filter === "tout" ? oeuvres : oeuvres.filter((o) => o.category === filter);

  // Group by technique for display
  const groupedByCategory: Record<string, Oeuvre[]> = {};
  for (const cat of allCategories) {
    const items = filtered.filter((o) => o.category === cat);
    if (items.length > 0) {
      groupedByCategory[cat] = cat === "Customisations"
        ? items.sort((a, b) => a.title.localeCompare(b.title, "fr"))
        : items;
    }
  }

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
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
        <FilterBtn active={filter === "tout"} onClick={() => setFilter("tout")} gradient="from-coral to-magenta">
          Tout
        </FilterBtn>
        {existingCategories.map((cat) => (
          <FilterBtn key={cat} active={filter === cat} onClick={() => setFilter(cat)} gradient={categoryGradients[cat] || "from-coral to-magenta"}>
            <span className="hidden sm:inline">{cat}</span>
            <span className="sm:hidden">{cat === "Customisations" ? "Custom." : cat}</span>
          </FilterBtn>
        ))}
      </div>

      {/* All categories */}
      {Object.entries(groupedByCategory).map(([category, items]) => (
        <section key={category} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-coral/30" />
            <h3 className="text-lg sm:text-xl font-heading font-bold text-warm-brown whitespace-nowrap px-2">
              {category}
            </h3>
            <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-coral/30" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} onOpenGallery={setLightboxOeuvre} />
            ))}
          </div>
        </section>
      ))}

      {/* Lightbox */}
      <PhotoGallery
        mainImage={lightboxOeuvre?.image_url ?? null}
        galleryUrls={lightboxOeuvre?.gallery_urls ?? []}
        title={lightboxOeuvre?.title ?? ""}
        isOpen={!!lightboxOeuvre}
        onClose={() => setLightboxOeuvre(null)}
      />
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

function ProductCard({
  product,
  index,
  onOpenGallery,
}: {
  product: Oeuvre;
  index: number;
  onOpenGallery: (oeuvre: Oeuvre) => void;
}) {
  const gradient = getGradient(product.category, index);
  const hasImages = !!(product.image_url || (product.gallery_urls && product.gallery_urls.length > 0));
  const galleryCount = (product.gallery_urls?.length ?? 0) + (product.image_url ? 1 : 0);

  return (
    <div className="art-card bg-white rounded-2xl overflow-hidden">
      <div
        className={`aspect-square bg-gradient-to-br ${gradient} flex items-center justify-center relative group cursor-pointer`}
        onClick={() => hasImages && onOpenGallery(product)}
      >
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
        {product.status === "vendu" && (
          <div className="absolute top-3 right-3 bg-warm-brown/90 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg z-10">
            Vendu
          </div>
        )}
        {/* Gallery count badge */}
        {galleryCount > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 z-10">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {galleryCount}
          </div>
        )}
        <div className="absolute inset-0 bg-warm-brown/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-lg font-medium bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full">
            {hasImages ? "Voir les photos" : "Détails"}
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
          <p className={`text-2xl font-bold ${product.status === "vendu" ? "text-warm-gray/50 line-through" : "gradient-text"}`}>{product.price} &euro;</p>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              product.status === "disponible"
                ? "bg-turquoise/15 text-turquoise"
                : product.status === "vendu"
                ? "bg-warm-brown/10 text-warm-brown"
                : "bg-amber/15 text-amber"
            }`}
          >
            {product.status === "disponible" ? "Disponible" : product.status === "vendu" ? "Vendu" : "Sur commande"}
          </span>
        </div>
        {product.status !== "vendu" ? (
          <Link
            href={`/contact?oeuvre=${encodeURIComponent(product.title)}&prix=${product.price}&type=${product.status === "disponible" ? "achat" : "commande"}`}
            data-track="btn_commander_tem"
            className="block w-full mt-4 bg-gradient-to-r from-coral to-magenta text-white py-3 rounded-full font-medium hover:shadow-lg hover:shadow-coral/30 transition-all hover:scale-[1.02] text-center"
          >
            {product.status === "disponible" ? "Je suis intéressé(e)" : "Commander"}
          </Link>
        ) : (
          <p className="mt-4 text-center text-sm text-warm-gray/60 py-3">
            Cette oeuvre a trouvé son collectionneur
          </p>
        )}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-cream-dark">
          <span className="text-xs text-warm-gray/50">Partager</span>
          <ShareButtons title={product.title} category={product.category} />
        </div>
      </div>
    </div>
  );
}
