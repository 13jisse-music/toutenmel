import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact - Toutenmel",
  description:
    "Contactez Mel pour toute question sur ses œuvres, commandes ou collaborations.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact - Toutenmel", description: "Contactez Mel pour toute question sur ses œuvres, commandes ou collaborations.", url: "/contact" },
};

export default function Contact() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-20 right-10 w-80 h-80 bg-turquoise/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-72 h-72 bg-coral/10 rounded-full blur-3xl" />

      <div className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl sm:text-7xl font-bold text-center mb-4">
            <span className="gradient-text">Contact</span>
          </h1>
          <p className="text-center text-warm-gray mb-16 max-w-xl mx-auto text-lg">
            Une question, une envie, une collaboration ? N&apos;hésitez pas !
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact form */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-turquoise via-electric-blue to-violet rounded-2xl blur-sm opacity-30" />
              <div className="relative bg-white rounded-2xl p-8">
                <h2 className="text-3xl font-heading font-bold gradient-text mb-6">
                  Écrivez-moi
                </h2>
                <Suspense fallback={<div className="py-8 text-center text-warm-gray">Chargement...</div>}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>

            {/* Info panel */}
            <div className="space-y-8">
              {/* Instagram card */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber via-coral to-magenta rounded-2xl blur-sm opacity-30" />
                <div className="relative bg-white rounded-2xl p-8">
                  <h2 className="text-3xl font-heading font-bold text-warm-brown mb-4">
                    Retrouvez Mel
                  </h2>
                  <a
                    href="https://instagram.com/toutenmel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber via-coral to-magenta flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <svg className="h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-warm-brown text-lg group-hover:text-coral transition-colors">@toutenmel</p>
                      <p className="text-warm-gray text-sm">Suivez les coulisses de l&apos;atelier</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Response time */}
              <div className="bg-gradient-to-br from-coral/10 via-magenta/10 to-violet/10 rounded-2xl p-8">
                <h3 className="text-2xl font-heading font-bold text-warm-brown mb-3">
                  Délais de réponse
                </h3>
                <p className="text-warm-gray">
                  Mel répond généralement sous <span className="font-semibold text-coral">24 à 48h</span>.
                  Pour les commandes personnalisées, comptez <span className="font-semibold text-magenta">1 à 3 semaines</span> de création selon le projet.
                </p>
              </div>

              {/* Color palette decoration */}
              <div className="flex gap-2 justify-center">
                {["bg-coral", "bg-orange", "bg-amber", "bg-turquoise", "bg-electric-blue", "bg-violet", "bg-magenta"].map((color) => (
                  <div key={color} className={`w-10 h-10 rounded-full ${color} hover:scale-125 transition-transform`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
