import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[80vh] relative overflow-hidden flex items-center">
      {/* Paint blob backgrounds */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-coral/30 rounded-full blur-3xl animate-float" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-magenta/20 rounded-full blur-3xl" style={{ animation: "float 4s ease-in-out infinite" }} />
      <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-amber/25 rounded-full blur-3xl" style={{ animation: "float 5s ease-in-out infinite" }} />
      <div className="absolute top-60 left-2/3 w-64 h-64 bg-turquoise/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-40 right-1/4 w-56 h-56 bg-violet/15 rounded-full blur-3xl" style={{ animation: "float 6s ease-in-out infinite" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center py-12">
        <Image
          src="/logotoutenmel.png"
          alt="Toutenmel"
          width={600}
          height={300}
          className="mx-auto mb-8 w-[380px] sm:w-[550px] lg:w-[700px] h-auto"
          priority
        />

        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="gradient-text">L&apos;atelier se prépare...</span>
          </h1>
          <p className="text-xl text-warm-gray leading-relaxed mb-4">
            Toiles, fluide art, aérographe &amp; customisations uniques.
          </p>
          <p className="text-lg text-warm-gray/70 mb-10">
            Le site de Mel arrive très bientôt avec toutes ses créations colorées.
            <br />En attendant, retrouvez-la sur Instagram !
          </p>

          <a
            href="https://instagram.com/toutenmel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber via-coral to-magenta text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-coral/30 transition-all hover:scale-105"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @toutenmel sur Instagram
          </a>
        </div>

        {/* Color palette decoration */}
        <div className="flex gap-3 justify-center mt-16">
          {["bg-coral", "bg-orange", "bg-amber", "bg-lemon", "bg-turquoise", "bg-electric-blue", "bg-violet", "bg-magenta", "bg-fuchsia"].map((color) => (
            <div key={color} className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${color} hover:scale-150 transition-transform cursor-pointer`} />
          ))}
        </div>
      </div>
    </div>
  );
}
