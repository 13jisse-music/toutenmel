import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos - Toutenmel",
  description:
    "Mel, artiste peintre autodidacte. Découvrez son parcours, son univers et sa passion pour la couleur.",
};

export default function APropos() {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-coral/15 rounded-full blur-3xl" />
      <div className="absolute top-60 right-0 w-72 h-72 bg-magenta/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-1/4 w-64 h-64 bg-amber/15 rounded-full blur-3xl" />

      <div className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-magenta font-medium mb-2">Artiste peintre autodidacte</p>
          <h1 className="text-5xl sm:text-7xl font-bold text-center mb-10">
            <span className="gradient-text">À propos de Mel</span>
          </h1>

          {/* Photo placeholder with colorful border */}
          <div className="relative max-w-2xl mx-auto mb-14">
            <div className="absolute -inset-1 bg-gradient-to-r from-coral via-amber to-magenta rounded-2xl blur-sm" />
            <div className="relative aspect-video bg-gradient-to-br from-blush via-amber/20 to-magenta/20 rounded-2xl flex items-center justify-center">
              <span className="text-warm-gray/50 font-heading text-3xl">
                Photo de Mel dans son atelier
              </span>
            </div>
          </div>

          {/* Official text with artistic styling */}
          <div className="space-y-8 text-lg leading-relaxed">
            <p className="text-3xl sm:text-4xl font-heading gradient-text font-bold text-center">
              Mel, artiste peintre autodidacte.
            </p>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border-l-4 border-coral">
              <p className="text-warm-brown">
                Depuis l&apos;enfance, le dessin et la couleur ont toujours fait partie de ma vie.
                Ce qui a commencé comme une passion instinctive est devenu, au fil des années,
                un véritable langage artistique.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border-l-4 border-magenta">
              <p className="text-warm-brown">
                Autodidacte dans l&apos;âme, j&apos;ai construit mon univers en expérimentant sans
                relâche — des Posca au fluide art, de la toile aux objets du quotidien, jusqu&apos;à
                l&apos;aérographe. Chaque technique explorée est venue enrichir mon style et nourrir
                ma créativité.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border-l-4 border-amber">
              <p className="text-warm-brown">
                Ce qui traverse toute mon œuvre ? <span className="font-semibold text-coral">La couleur</span> et <span className="font-semibold text-amber">la lumière</span>. Elles sont au cœur de
                chaque création, qu&apos;il s&apos;agisse d&apos;une toile, d&apos;une paire de
                baskets customisée ou d&apos;une guitare transformée.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border-l-4 border-turquoise">
              <p className="text-warm-brown">
                Peindre, c&apos;est pour moi bien plus qu&apos;un acte créatif — c&apos;est
                transmettre une émotion, ouvrir un dialogue, partager un regard sur le monde.
              </p>
            </div>

            <p className="text-3xl sm:text-4xl font-heading gradient-text font-bold text-center pt-4">
              Bienvenue dans mon univers.
              <br />Bienvenue chez Toutenmel.
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
