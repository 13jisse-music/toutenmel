import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[80vh] relative overflow-hidden flex items-center">
      {/* Paint blob backgrounds - smaller on mobile */}
      <div className="absolute top-5 left-0 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-coral/30 rounded-full blur-3xl animate-float" />
      <div className="absolute top-20 right-0 w-40 sm:w-64 lg:w-80 h-40 sm:h-64 lg:h-80 bg-magenta/20 rounded-full blur-3xl" style={{ animation: "float 4s ease-in-out infinite" }} />
      <div className="absolute bottom-10 left-1/4 w-36 sm:w-56 lg:w-72 h-36 sm:h-56 lg:h-72 bg-amber/25 rounded-full blur-3xl" style={{ animation: "float 5s ease-in-out infinite" }} />
      <div className="absolute bottom-20 right-1/4 w-32 sm:w-48 lg:w-56 h-32 sm:h-48 lg:h-56 bg-violet/15 rounded-full blur-3xl" style={{ animation: "float 6s ease-in-out infinite" }} />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 text-center py-8 sm:py-12">
        <Image
          src="/logotoutenmel.png"
          alt="Toutenmel"
          width={600}
          height={300}
          className="mx-auto mb-6 sm:mb-8 w-[280px] sm:w-[450px] lg:w-[600px] h-auto"
          priority
        />

        <div className="max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto px-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">L&apos;atelier se prépare...</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-warm-gray leading-relaxed mb-3 sm:mb-4">
            Toiles, fluide art, aérographe &amp; customisations uniques.
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-warm-gray/70">
            Le site de Mel arrive très bientôt avec toutes ses créations colorées.
          </p>
        </div>

        {/* Color palette decoration */}
        <div className="flex gap-2 sm:gap-3 justify-center mt-10 sm:mt-16 flex-wrap">
          {["bg-coral", "bg-orange", "bg-amber", "bg-lemon", "bg-turquoise", "bg-electric-blue", "bg-violet", "bg-magenta", "bg-fuchsia"].map((color) => (
            <div key={color} className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full ${color} hover:scale-150 transition-transform cursor-pointer`} />
          ))}
        </div>
      </div>
    </div>
  );
}
