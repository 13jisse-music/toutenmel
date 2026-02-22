"use client";

import { useState } from "react";
import Link from "next/link";

interface Facture {
  id: string;
  numero: string;
  commande_id: string | null;
  client_name: string;
  client_email: string;
  items: { description: string; quantity: number; price: number }[];
  subtotal: number;
  tax: number;
  total: number;
  status: string;
  notes: string | null;
  created_at: string;
}

const statusStyles: Record<string, string> = {
  brouillon: "bg-warm-gray/10 text-warm-gray",
  envoyee: "bg-amber/15 text-amber",
  payee: "bg-turquoise/15 text-turquoise",
};

const statusLabels: Record<string, string> = {
  brouillon: "Brouillon",
  envoyee: "Envoyée",
  payee: "Payée",
};

export default function AdminFacturesClient({ factures: initial }: { factures: Facture[] }) {
  const [factures, setFactures] = useState(initial);
  const [filter, setFilter] = useState("Tout");
  const [search, setSearch] = useState("");

  let filtered = filter === "Tout"
    ? factures
    : factures.filter((f) => f.status === filter);

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (f) =>
        f.client_name.toLowerCase().includes(q) ||
        f.numero.toLowerCase().includes(q) ||
        f.client_email.toLowerCase().includes(q)
    );
  }

  async function handleStatusChange(id: string, newStatus: string) {
    const res = await fetch(`/api/admin/factures/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setFactures(factures.map((f) => (f.id === id ? { ...f, status: newStatus } : f)));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette facture ?")) return;
    const res = await fetch(`/api/admin/factures/${id}`, { method: "DELETE" });
    if (res.ok) {
      setFactures(factures.filter((f) => f.id !== id));
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold text-warm-brown">Factures</h1>
        <Link
          href="/admin/factures/nouvelle"
          className="bg-gradient-to-r from-coral to-magenta text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-coral/20 transition-all hover:scale-105"
        >
          + Nouvelle facture
        </Link>
      </div>
      <p className="text-warm-gray mb-6">{factures.length} factures au total</p>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher par n°, client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 rounded-xl border-2 border-cream-dark px-4 py-2 text-sm text-warm-brown focus:outline-none focus:border-coral"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["Tout", "brouillon", "envoyee", "payee"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              filter === f
                ? "bg-coral text-white border-coral"
                : "bg-white text-warm-gray border-cream-dark hover:bg-coral hover:text-white"
            }`}
          >
            {f === "Tout" ? "Tout" : statusLabels[f]}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <p className="text-center text-warm-gray py-8">Aucune facture trouvée.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((facture) => (
            <div
              key={facture.id}
              className="bg-white rounded-2xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-mono font-bold text-warm-brown">{facture.numero}</p>
                    <p className="text-sm text-warm-gray">{facture.client_name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-xl font-bold gradient-text">{facture.total} &euro;</p>
                  <select
                    value={facture.status}
                    onChange={(e) => handleStatusChange(facture.id, e.target.value)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium border border-cream-dark ${
                      statusStyles[facture.status] || ""
                    }`}
                  >
                    <option value="brouillon">Brouillon</option>
                    <option value="envoyee">Envoyée</option>
                    <option value="payee">Payée</option>
                  </select>
                  <span className="text-xs text-warm-gray">
                    {new Date(facture.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-3 pt-3 border-t border-cream-dark">
                <Link
                  href={`/admin/factures/${facture.id}`}
                  className="text-sm font-medium text-coral hover:text-coral-dark transition-colors"
                >
                  Voir / Imprimer
                </Link>
                <button
                  onClick={() => handleDelete(facture.id)}
                  className="text-sm text-warm-gray hover:text-coral transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
