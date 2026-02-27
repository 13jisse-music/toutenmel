import type { Metadata } from "next";
import Image from "next/image";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const metadata: Metadata = {
  title: "À propos - Toutenmel",
  description:
    "Mel, artiste peintre autodidacte. Découvrez son parcours, son univers et sa passion pour la couleur.",
  alternates: { canonical: "/a-propos" },
  openGraph: { title: "À propos - Toutenmel", description: "Mel, artiste peintre autodidacte. Découvrez son parcours, son univers et sa passion pour la couleur.", url: "/a-propos" },
};

export const revalidate = 60;

async function getSettings() {
  const { data } = await supabaseAdmin
    .from("site_settings")
    .select("*")
    .eq("id", "main")
    .single();
  return data;
}

const borderColors = ["border-coral", "border-magenta", "border-amber", "border-turquoise", "border-violet", "border-electric-blue"];

export default async function APropos() {
  const s = await getSettings();

  const subtitle = s?.about_subtitle || "Artiste peintre autodidacte";
  const photoUrl = s?.profile_photo_url;
  const closing = s?.about_closing || "Bienvenue dans mon univers.\nBienvenue chez Toutenmel.";
  const aboutText = s?.about_text || "";

  // Split text into paragraphs (separated by empty lines)
  const paragraphs = aboutText
    .split(/\n\s*\n/)
    .map((p: string) => p.trim())
    .filter(Boolean);

  return (
    <div className="relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-coral/15 rounded-full blur-3xl" />
      <div className="absolute top-60 right-0 w-72 h-72 bg-magenta/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-1/4 w-64 h-64 bg-amber/15 rounded-full blur-3xl" />

      <div className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-magenta font-medium mb-2">{subtitle}</p>
          <h1 className="text-5xl sm:text-7xl font-bold text-center mb-10">
            <span className="gradient-text">À propos de Mel</span>
          </h1>

          {/* Photo with colorful border */}
          <div className="relative max-w-2xl mx-auto mb-14">
            <div className="absolute -inset-1 bg-gradient-to-r from-coral via-amber to-magenta rounded-2xl blur-sm" />
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt="Mel - Toutenmel"
                  fill
                  className="object-cover"
                  quality={85}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blush via-amber/20 to-magenta/20 flex items-center justify-center">
                  <span className="text-warm-gray/50 font-heading text-3xl">
                    Photo de Mel dans son atelier
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic text */}
          <div className="space-y-8 text-lg leading-relaxed">
            {paragraphs.length > 0 ? (
              <>
                <p className="text-3xl sm:text-4xl font-heading gradient-text font-bold text-center">
                  Mel, {subtitle.toLowerCase()}.
                </p>

                {paragraphs.map((paragraph: string, i: number) => (
                  <div
                    key={i}
                    className={`bg-white/60 backdrop-blur-sm rounded-2xl p-8 border-l-4 ${borderColors[i % borderColors.length]}`}
                  >
                    <p className="text-warm-brown">{paragraph}</p>
                  </div>
                ))}
              </>
            ) : (
              <>
                <p className="text-3xl sm:text-4xl font-heading gradient-text font-bold text-center">
                  Mel, {subtitle.toLowerCase()}.
                </p>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border-l-4 border-coral">
                  <p className="text-warm-gray/60 italic">
                    Le texte de présentation sera bientôt disponible.
                  </p>
                </div>
              </>
            )}

            <p className="text-3xl sm:text-4xl font-heading gradient-text font-bold text-center pt-4 whitespace-pre-line">
              {closing}
            </p>
          </div>

          {/* Color palette decoration */}
          <div className="flex justify-center gap-3 mt-14">
            {["bg-coral", "bg-orange", "bg-amber", "bg-lemon", "bg-turquoise", "bg-electric-blue", "bg-violet", "bg-magenta", "bg-fuchsia"].map((color) => (
              <div key={color} className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full ${color} hover:scale-125 transition-transform`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
