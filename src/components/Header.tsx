"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "À propos", href: "/a-propos" },
  { name: "Boutique", href: "/boutique" },
  { name: "Commandes", href: "/commandes" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b-2" style={{ borderImage: "linear-gradient(90deg, #FF5E5B, #FFB627, #D72483, #06D6A0, #118AB2) 1", background: "rgba(255,248,240,0.92)", backdropFilter: "blur(12px)" }}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          <Link href="/">
            <Image
              src="/logotoutenmel.png"
              alt="Toutenmel"
              width={280}
              height={140}
              className="w-[140px] sm:w-[200px] lg:w-[260px] h-auto"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-warm-gray hover:text-coral font-heading text-xl font-bold transition-colors py-2 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-coral to-magenta group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              href="/admin"
              className="ml-2 bg-gradient-to-r from-coral to-magenta text-white px-5 py-2 rounded-full font-medium text-sm hover:shadow-lg hover:shadow-coral/30 transition-all"
            >
              Mon espace
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-coral"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t-2 mt-2 pt-4" style={{ borderImage: "linear-gradient(90deg, #FF5E5B, #FFB627, #D72483) 1" }}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 text-xl text-warm-brown hover:text-coral transition-colors font-heading font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/admin"
              className="block mt-2 py-3 text-center bg-gradient-to-r from-coral to-magenta text-white rounded-full font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Mon espace
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
