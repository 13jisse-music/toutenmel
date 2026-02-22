import Image from "next/image";
import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";
import { supabase } from "@/lib/supabase";
import type { Oeuvre } from "@/lib/types";
import { getGradient } from "@/lib/gradients";

export const revalidate = 60;

export default async function Home() {
  const { data: oeuvres } = await supabase
    .from("oeuvres")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  const featuredWorks = (oeuvres as Oeuvre[]) || [];
  const categoryCounters: Record<string, number> = {};

  return (
    <>
      {/* Hero Section - ultra coloré */}
      <section className="relative flex items-center overflow-hidden">
        {/* Paint blob backgrounds */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-coral/30 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-magenta/20 rounded-full blur-3xl" style={{ animationDelay: "1s", animation: "float 4s ease-in-out infinite" }} />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-amber/25 rounded-full blur-3xl" style={{ animationDelay: "2s", animation: "float 5s ease-in-out infinite" }} />
        <div className="absolute top-60 left-2/3 w-64 h-64 bg-turquoise/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 right-1/4 w-56 h-56 bg-violet/15 rounded-full blur-3xl" style={{ animation: "float 6s ease-in-out infinite" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center py-8 sm:py-12">
          <Image
            src="/logotoutenmel.png"
            alt="Toutenmel"
            width={600}
            height={300}
            className="mx-auto mb-4 w-[380px] sm:w-[550px] lg:w-[700px] h-auto"
            priority
          />
          <p className="text-xl sm:text-2xl text-warm-gray max-w-2xl mx-auto mb-4 leading-relaxed">
            La <span className="paint-underline font-semibold">couleur</span> et la <span className="paint-underline font-semibold">lumière</span> au service de l&apos;émotion.
          </p>
          <p className="text-lg text-warm-gray/70 max-w-xl mx-auto mb-12">
            Toiles, fluide art, aérographe &amp; customisations uniques
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/galerie"
              className="inline-block bg-gradient-to-r from-coral to-magenta text-white px-10 py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-coral/30 transition-all hover:scale-105"
            >
              Découvrir mes créations
            </Link>
            <Link
              href="/boutique"
              className="inline-block bg-white/80 backdrop-blur-sm border-2 border-coral text-coral px-10 py-4 rounded-full text-lg font-medium hover:bg-coral hover:text-white transition-all"
            >
              Boutique
            </Link>
          </div>
        </div>
      </section>

      {/* Color strip separator */}
      <div className="h-2 bg-gradient-to-r from-coral via-amber to-magenta" />

      {/* Featured works */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-magenta/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl sm:text-6xl font-bold text-center mb-3">
            <span className="gradient-text">Coups de coeur</span>
          </h2>
          <p className="text-center text-warm-gray mb-14 text-lg">
            Quelques créations récentes de l&apos;atelier
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWorks.map((work) => {
              const catKey = work.category;
              categoryCounters[catKey] = categoryCounters[catKey] || 0;
              const gradient = getGradient(catKey, categoryCounters[catKey]);
              categoryCounters[catKey]++;

              return (
                <div key={work.id} className="art-card bg-white rounded-2xl overflow-hidden">
                  <div className={`aspect-square bg-gradient-to-br ${gradient} flex items-center justify-center relative group`}>
                    {work.image_url ? (
                      <img
                        src={work.image_url}
                        alt={work.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white/70 font-heading text-3xl drop-shadow-lg">
                        {work.title}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-warm-brown/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-medium text-lg">Voir l&apos;œuvre</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-magenta">
                      {work.category}
                    </p>
                    <h3 className="text-2xl mt-1 text-warm-brown font-heading font-semibold">{work.title}</h3>
                    <span
                      className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-medium ${
                        work.status === "disponible"
                          ? "bg-turquoise/15 text-turquoise"
                          : work.status === "vendu"
                          ? "bg-warm-gray/10 text-warm-gray"
                          : "bg-amber/15 text-amber"
                      }`}
                    >
                      {work.status === "disponible" ? "Disponible" : work.status === "vendu" ? "Vendu" : "Sur commande"}
                    </span>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-cream-dark">
                      <span className="text-xs text-warm-gray/50">Partager</span>
                      <ShareButtons title={work.title} category={work.category} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/galerie"
              className="inline-block bg-gradient-to-r from-magenta to-violet text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-magenta/30 transition-all hover:scale-105"
            >
              Voir toutes les créations &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Techniques section - colorful cards */}
      <section className="py-16 bg-warm-brown relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-violet/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl sm:text-6xl font-bold text-center text-amber-light mb-14">
            Mes techniques
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Toiles", desc: "Peinture sur toile, couleurs vibrantes", color: "from-coral to-orange", icon: "🎨" },
              { name: "Fluide Art", desc: "L'art du mouvement et des couleurs mélangées", color: "from-magenta to-violet", icon: "🌊" },
              { name: "Aérographe", desc: "Précision et dégradés sur tous supports", color: "from-electric-blue to-turquoise", icon: "✨" },
              { name: "Customisation", desc: "Baskets, guitares, objets uniques", color: "from-amber to-lemon", icon: "👟" },
            ].map((tech) => (
              <div
                key={tech.name}
                className={`bg-gradient-to-br ${tech.color} rounded-2xl p-6 text-white hover:scale-105 transition-transform cursor-pointer`}
              >
                <span className="text-4xl">{tech.icon}</span>
                <h3 className="text-2xl font-heading font-bold mt-3">{tech.name}</h3>
                <p className="text-white/80 mt-2 text-sm">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA custom orders */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-coral/10 via-magenta/10 to-violet/10" />
        <div className="absolute top-10 left-20 w-40 h-40 bg-amber/20 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-20 w-56 h-56 bg-turquoise/15 rounded-full blur-2xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="gradient-text">Envie d&apos;une création unique ?</span>
          </h2>
          <p className="text-warm-gray text-lg max-w-xl mx-auto mb-10">
            Baskets customisées, guitare peinte, toile sur mesure...
            Mel réalise vos idées les plus colorées.
          </p>
          <Link
            href="/commandes"
            className="inline-block bg-gradient-to-r from-amber to-orange text-white px-10 py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-amber/30 transition-all hover:scale-105"
          >
            Commander une création sur mesure
          </Link>
        </div>
      </section>
    </>
  );
}
