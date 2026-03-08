"use client";

import type { Oeuvre } from "@/lib/types";

export default function CertificatClient({ oeuvre }: { oeuvre: Oeuvre }) {
  const today = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const numCertificat = `TEM-${oeuvre.id.slice(0, 8).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-cream p-4 sm:p-8 print:p-0 print:bg-white">
      {/* Bouton imprimer */}
      <div className="text-center mb-6 print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-gradient-to-r from-coral to-magenta text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all"
        >
          Imprimer le certificat
        </button>
      </div>

      {/* Certificat */}
      <div className="mx-auto max-w-[700px] bg-white border-2 border-warm-brown/20 rounded-lg p-8 sm:p-12 print:border-2 print:rounded-none print:shadow-none print:max-w-none">
        {/* Bordure décorative */}
        <div className="border-2 border-warm-brown/30 rounded-lg p-6 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-heading text-4xl sm:text-5xl text-warm-brown mb-2">
              Certificat d&apos;authenticité
            </h1>
            <p className="text-warm-gray text-sm tracking-widest uppercase">
              Certificate of Authenticity
            </p>
            <div className="mt-4 mx-auto w-32 h-0.5 bg-gradient-to-r from-coral via-magenta to-violet" />
          </div>

          {/* Corps */}
          <div className="space-y-6 text-warm-brown">
            <p className="text-center text-lg leading-relaxed">
              Je soussignée, <strong>Mel</strong>, artiste peintre, certifie que l&apos;oeuvre
              décrite ci-dessous est une création originale, réalisée entièrement de ma main.
            </p>

            <div className="bg-cream/50 rounded-xl p-6 space-y-3">
              <div className="flex justify-between border-b border-warm-brown/10 pb-2">
                <span className="text-warm-gray text-sm">Titre</span>
                <span className="font-heading text-xl font-bold">{oeuvre.title}</span>
              </div>
              <div className="flex justify-between border-b border-warm-brown/10 pb-2">
                <span className="text-warm-gray text-sm">Technique</span>
                <span className="font-medium">{oeuvre.category}</span>
              </div>
              {oeuvre.dimensions && (
                <div className="flex justify-between border-b border-warm-brown/10 pb-2">
                  <span className="text-warm-gray text-sm">Dimensions</span>
                  <span className="font-medium">{oeuvre.dimensions}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-warm-brown/10 pb-2">
                <span className="text-warm-gray text-sm">N&deg; certificat</span>
                <span className="font-mono text-sm">{numCertificat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-gray text-sm">Date</span>
                <span className="font-medium">{today}</span>
              </div>
            </div>

            <p className="text-sm text-warm-gray text-center leading-relaxed">
              Cette oeuvre est unique et ne fait l&apos;objet d&apos;aucune reproduction.
              Ce certificat atteste de son authenticité et accompagne l&apos;oeuvre lors de toute transaction.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-10 flex justify-between items-end">
            <div>
              <p className="text-warm-gray text-xs mb-1">Date d&apos;émission</p>
              <p className="text-warm-brown font-medium">{today}</p>
            </div>
            <div className="text-right">
              <p className="text-warm-gray text-xs mb-1">L&apos;artiste</p>
              <p className="font-heading text-3xl text-warm-brown">Mel</p>
              <p className="text-xs text-warm-gray">Toutenmel</p>
              <p className="text-xs text-warm-gray">toutenmel.fr</p>
            </div>
          </div>

          {/* Pied */}
          <div className="mt-8 pt-4 border-t border-warm-brown/10 text-center">
            <div className="flex gap-1 justify-center mb-2">
              {["#FF5E5B", "#FFB627", "#D72483", "#06D6A0", "#118AB2", "#7B2D8E"].map((c) => (
                <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
              ))}
            </div>
            <p className="text-xs text-warm-gray">
              toutenmel.fr &mdash; Toiles, fluide art, aérographe &amp; customisations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
