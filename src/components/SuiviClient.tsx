"use client";

import { useState } from "react";
import { COMMANDE_STATUSES } from "@/lib/types";

interface CommandeResult {
  id: string;
  type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function SuiviClient() {
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [commande, setCommande] = useState<CommandeResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setCommande(null);

    const res = await fetch("/api/suivi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, orderId }),
    });

    const data = await res.json();

    if (res.ok) {
      setCommande(data.commande);
    } else {
      setError(data.error || "Commande introuvable");
    }
    setLoading(false);
  }

  const currentIndex = commande
    ? COMMANDE_STATUSES.indexOf(commande.status as typeof COMMANDE_STATUSES[number])
    : -1;

  return (
    <div>
      {/* Search form */}
      <div className="relative mb-10">
        <div className="absolute -inset-1 bg-gradient-to-r from-turquoise via-electric-blue to-violet rounded-2xl blur-sm opacity-30" />
        <div className="relative bg-white rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-coral/10 text-coral text-sm font-medium px-4 py-3 rounded-xl text-center">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-warm-brown mb-1">
                Email utilisé lors de la commande
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="votre@email.com"
                className="w-full rounded-xl border-2 border-blush/50 px-4 py-3 text-warm-brown focus:outline-none focus:border-turquoise transition-colors"
              />
            </div>

            <div>
              <label htmlFor="orderId" className="block text-sm font-semibold text-warm-brown mb-1">
                Numéro de commande (8 derniers caractères)
              </label>
              <input
                type="text"
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
                placeholder="ex: a3b4c5d6"
                className="w-full rounded-xl border-2 border-blush/50 px-4 py-3 text-warm-brown focus:outline-none focus:border-turquoise transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-turquoise to-electric-blue text-white py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-turquoise/30 transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? "Recherche..." : "Suivre ma commande"}
            </button>
          </form>
        </div>
      </div>

      {/* Results - Timeline */}
      {commande && (
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-coral via-amber to-magenta rounded-2xl blur-sm opacity-30" />
          <div className="relative bg-white rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-warm-gray">Commande</p>
                <p className="text-warm-brown font-mono text-sm">...{commande.id.slice(-8)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-warm-gray">Date</p>
                <p className="text-warm-brown text-sm">{new Date(commande.created_at).toLocaleDateString("fr-FR")}</p>
              </div>
            </div>

            {/* Status timeline */}
            <div className="space-y-0">
              {COMMANDE_STATUSES.map((status, index) => {
                const isCompleted = index <= currentIndex;
                const isCurrent = index === currentIndex;

                return (
                  <div key={status} className="flex items-start gap-4">
                    {/* Circle and line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                          isCurrent
                            ? "bg-gradient-to-br from-coral to-magenta text-white scale-110 shadow-lg shadow-coral/30"
                            : isCompleted
                            ? "bg-turquoise text-white"
                            : "bg-cream-dark text-warm-gray/40"
                        }`}
                      >
                        {isCompleted && !isCurrent ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        ) : (
                          <span className="text-xs font-bold">{index + 1}</span>
                        )}
                      </div>
                      {index < COMMANDE_STATUSES.length - 1 && (
                        <div className={`w-0.5 h-8 ${isCompleted ? "bg-turquoise" : "bg-cream-dark"}`} />
                      )}
                    </div>

                    {/* Label */}
                    <div className={`pt-1 ${isCurrent ? "font-bold text-warm-brown" : isCompleted ? "text-warm-brown" : "text-warm-gray/40"}`}>
                      <p className={isCurrent ? "text-lg" : "text-base"}>{status}</p>
                      {isCurrent && (
                        <p className="text-sm text-warm-gray font-normal mt-1">
                          Mis à jour le {new Date(commande.updated_at).toLocaleDateString("fr-FR")}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
