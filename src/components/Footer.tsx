"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

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
                <li><Link href="/boutique" className="hover:text-amber transition-colors">Boutique</Link></li>
                <li><Link href="/commandes" className="hover:text-magenta transition-colors">Commandes</Link></li>
                <li><Link href="/a-propos" className="hover:text-turquoise transition-colors">À propos</Link></li>
                <li><Link href="/contact" className="hover:text-electric-blue transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Légal */}
            <div>
              <h4 className="font-heading text-2xl text-amber-light mb-4">Informations</h4>
              <ul className="space-y-2 text-cream/60">
                <li><Link href="/mentions-legales" className="hover:text-cream transition-colors">Mentions légales</Link></li>
                <li><Link href="/cgv" className="hover:text-cream transition-colors">CGV</Link></li>
                <li><Link href="/confidentialite" className="hover:text-cream transition-colors">Confidentialité</Link></li>
                <li><Link href="/cookies" className="hover:text-cream transition-colors">Cookies</Link></li>
              </ul>
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
