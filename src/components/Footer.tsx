import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Colorful gradient bar */}
      <div className="h-2 bg-gradient-to-r from-coral via-amber to-magenta" />

      <div className="bg-warm-brown text-cream py-14">
        {/* Decorative blobs */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-magenta/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Logo & tagline */}
            <div>
              <h3 className="text-4xl font-heading font-bold gradient-text">
                Toutenmel
              </h3>
              <p className="mt-3 text-cream/60">
                La couleur et la lumière au service de l&apos;émotion.
              </p>
              <div className="mt-4 flex gap-1">
                {["#FF5E5B", "#FFB627", "#D72483", "#06D6A0", "#118AB2", "#7B2D8E"].map((color) => (
                  <div key={color} className="w-6 h-6 rounded-full" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-heading text-2xl text-amber-light mb-4">Navigation</h4>
              <ul className="space-y-2 text-cream/60">
                <li><Link href="/galerie" className="hover:text-coral transition-colors">Galerie</Link></li>
                <li><Link href="/a-propos" className="hover:text-amber transition-colors">À propos</Link></li>
                <li><Link href="/contact" className="hover:text-turquoise transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-heading text-2xl text-amber-light mb-4">Suivez Mel</h4>
              <a
                href="https://instagram.com/toutenmel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-cream/60 hover:text-fuchsia transition-colors group"
                aria-label="Instagram"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber via-coral to-magenta flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span className="text-lg">@toutenmel</span>
              </a>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-cream/10 text-center text-cream/40 text-sm">
            <p>&copy; {new Date().getFullYear()} Toutenmel — Tous droits réservés</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
