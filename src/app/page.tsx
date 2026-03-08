import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Oeuvre } from "@/lib/types";
import { getGradient } from "@/lib/gradients";

export const revalidate = 60;

async function getSettings() {
  const { data } = await supabaseAdmin
    .from("site_settings")
    .select("*")
    .eq("id", "main")
    .single();
  return data;
}

export default async function Home() {
  const [{ data: oeuvres }, settings] = await Promise.all([
    supabase.from("oeuvres").select("*").order("created_at", { ascending: false }),
    getSettings(),
  ]);

  const allOeuvres = (oeuvres as Oeuvre[]) || [];
  const disponibles = allOeuvres.filter((o) => o.status === "disponible" || o.status === "sur commande");
  const toutesVisibles = allOeuvres; // inclut les vendues
  const categories = [...new Set(allOeuvres.map((o) => o.category))];

  const heroSubtitle = settings?.hero_subtitle || "Toiles, fluide art, aérographe & customisations uniques. Chaque création est une pièce originale, réalisée avec passion.";
  const heroPhoto = settings?.hero_photo_url;

  return (
    <div className="relative overflow-hidden">
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center">
        {/* Photo de fond */}
        {heroPhoto ? (
          <>
            <Image
              src={heroPhoto}
              alt="Toutenmel"
              fill
              className="object-cover object-center"
              priority
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-warm-brown/60 via-warm-brown/40 to-cream" />
          </>
        ) : (
          <>
            <div className="absolute top-5 left-0 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-coral/20 rounded-full blur-3xl animate-float" />
            <div className="absolute top-20 right-0 w-40 sm:w-64 lg:w-80 h-40 sm:h-64 lg:h-80 bg-magenta/15 rounded-full blur-3xl" style={{ animation: "float 4s ease-in-out infinite" }} />
            <div className="absolute bottom-10 left-1/4 w-36 sm:w-56 lg:w-72 h-36 sm:h-56 lg:h-72 bg-amber/20 rounded-full blur-3xl" style={{ animation: "float 5s ease-in-out infinite" }} />
          </>
        )}

        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 pt-48 sm:pt-56 pb-10 sm:pb-14 text-center flex flex-col justify-end min-h-[85vh] sm:min-h-[70vh]">
          {!heroPhoto && (
            <Image
              src="/logotoutenmel.png"
              alt="Toutenmel"
              width={400}
              height={200}
              className="mx-auto mb-6 w-[220px] sm:w-[320px] lg:w-[380px] h-auto"
              priority
            />
          )}
          <p className={`max-w-lg mx-auto leading-relaxed ${heroPhoto ? "text-xl sm:text-2xl font-semibold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]" : "text-lg sm:text-xl gradient-text"}`}>
            {heroSubtitle}
          </p>

          {/* Stats rapides */}
          {allOeuvres.length > 0 && (
            <div className="mt-10 flex gap-8 justify-center">
              <div>
                <p className={`text-3xl sm:text-4xl font-bold ${heroPhoto ? "text-white" : "gradient-text"}`}>{allOeuvres.length}</p>
                <p className={`text-xs uppercase tracking-wider ${heroPhoto ? "text-white/60" : "text-warm-gray/60"}`}>créations</p>
              </div>
              {categories.length > 0 && (
                <div>
                  <p className={`text-3xl sm:text-4xl font-bold ${heroPhoto ? "text-white" : "gradient-text"}`}>{categories.length}</p>
                  <p className={`text-xs uppercase tracking-wider ${heroPhoto ? "text-white/60" : "text-warm-gray/60"}`}>techniques</p>
                </div>
              )}
              {disponibles.length > 0 && (
                <div>
                  <p className={`text-3xl sm:text-4xl font-bold ${heroPhoto ? "text-white" : "gradient-text"}`}>{disponibles.length}</p>
                  <p className={`text-xs uppercase tracking-wider ${heroPhoto ? "text-white/60" : "text-warm-gray/60"}`}>disponibles</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════ DERNIÈRES CRÉATIONS ═══════════════════════ */}
      {disponibles.length > 0 && (
        <section className="py-16 sm:py-24 relative">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber/10 rounded-full blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold">
                  <span className="gradient-text">Dernières créations</span>
                </h2>
                <p className="mt-2 text-warm-gray">
                  Pièces originales disponibles à la vente
                </p>
              </div>
              <Link
                href="/boutique"
                className="hidden sm:inline-flex text-coral hover:text-magenta font-semibold transition-colors text-lg"
              >
                Tout voir &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {disponibles.slice(0, 6).map((oeuvre, i) => {
                const gradient = getGradient(oeuvre.category, i);
                return (
                  <Link key={oeuvre.id} href="/boutique" className="art-card bg-white rounded-2xl overflow-hidden group">
                    <div className={`aspect-square bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
                      {oeuvre.image_url ? (
                        <img
                          src={oeuvre.image_url}
                          alt={oeuvre.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white/80 font-heading text-3xl drop-shadow-lg text-center px-4">
                          {oeuvre.title}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-warm-brown/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-lg font-medium bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full">
                          Voir
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-bold text-magenta uppercase tracking-widest">
                        {oeuvre.category}
                      </p>
                      <h3 className="text-2xl text-warm-brown font-heading font-semibold mt-1">
                        {oeuvre.title}
                      </h3>
                      {oeuvre.dimensions && (
                        <p className="text-sm text-warm-gray mt-1">{oeuvre.dimensions}</p>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-2xl font-bold gradient-text">{oeuvre.price} &euro;</p>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            oeuvre.status === "disponible"
                              ? "bg-turquoise/15 text-turquoise"
                              : "bg-amber/15 text-amber"
                          }`}
                        >
                          {oeuvre.status === "disponible" ? "Disponible" : "Sur commande"}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/boutique"
                className="inline-block bg-gradient-to-r from-coral to-magenta text-white px-8 py-3 rounded-full font-medium"
              >
                Voir toute la boutique
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════ CATÉGORIES ═══════════════════════ */}
      {categories.length > 0 && (
        <section className="py-16 bg-warm-brown/[0.03] relative">
          <div className="absolute top-10 left-0 w-60 h-60 bg-violet/10 rounded-full blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12">
              <span className="gradient-text">Techniques</span>
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Toiles", gradient: "from-amber via-orange to-coral", icon: "🖼️" },
                { name: "Fluide Art", gradient: "from-coral via-magenta to-violet", icon: "🌊" },
                { name: "Aérographe", gradient: "from-electric-blue via-turquoise to-amber", icon: "🎨" },
                { name: "Customisations", gradient: "from-violet via-electric-blue to-turquoise", icon: "✨" },
              ]
                .filter((cat) => categories.includes(cat.name as Oeuvre["category"]))
                .map((cat) => {
                  const count = allOeuvres.filter((o) => o.category === cat.name).length;
                  return (
                    <Link
                      key={cat.name}
                      href="/boutique"
                      className={`art-card bg-gradient-to-br ${cat.gradient} rounded-2xl p-6 sm:p-8 text-white text-center`}
                    >
                      <span className="text-4xl">{cat.icon}</span>
                      <h3 className="font-heading text-base sm:text-2xl font-bold mt-3">
                        <span className="hidden sm:inline">{cat.name}</span>
                        <span className="sm:hidden">{cat.name === "Customisations" ? "Custom." : cat.name}</span>
                      </h3>
                      <p className="text-white/70 text-sm mt-1">
                        {count} {count > 1 ? "créations" : "création"}
                      </p>
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════ COMMANDES PERSO ═══════════════════════ */}
      <section className="py-16 sm:py-24 relative">
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-magenta/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-coral via-amber to-magenta rounded-2xl blur-sm opacity-40" />
            <div className="relative bg-white rounded-2xl p-8 sm:p-12">
              <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
                Une idée en tête ?
              </h2>
              <p className="text-warm-gray text-lg max-w-xl mx-auto mb-8">
                Mel réalise des créations sur mesure : toiles, objets
                customisés, tout est possible. Décrivez votre envie et
                recevez un devis gratuit.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/commandes"
                  className="bg-gradient-to-r from-coral to-magenta text-white px-8 py-3.5 rounded-full font-medium hover:shadow-lg hover:shadow-coral/30 transition-all hover:scale-[1.02]"
                >
                  Demander un devis gratuit
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-warm-gray/20 text-warm-gray px-8 py-3.5 rounded-full font-medium hover:border-coral hover:text-coral transition-all"
                >
                  Me contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ RÉSEAUX SOCIAUX ═══════════════════════ */}
      <section className="py-12 bg-warm-brown/[0.03]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            <span className="gradient-text">Suivez Mel</span>
          </h2>
          <div className="flex justify-center gap-8 sm:gap-12">
            <a
              href="https://www.facebook.com/toutenmel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1877F2] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span className="text-warm-brown font-medium group-hover:text-[#1877F2] transition-colors">Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/toutenmel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </div>
              <span className="text-warm-brown font-medium group-hover:text-magenta transition-colors">Instagram</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ COULEURS ═══════════════════════ */}
      <section className="py-10 text-center">
        <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
          {["bg-coral", "bg-orange", "bg-amber", "bg-lemon", "bg-turquoise", "bg-electric-blue", "bg-violet", "bg-magenta", "bg-fuchsia"].map((color) => (
            <div key={color} className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${color} hover:scale-150 transition-transform cursor-pointer`} />
          ))}
        </div>
      </section>
    </div>
  );
}
