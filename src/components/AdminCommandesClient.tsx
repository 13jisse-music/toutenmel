"use client";

import { useState } from "react";

interface Commande {
  id: string;
  client_name: string;
  client_email: string;
  type: string;
  oeuvre_id: string | null;
  support: string | null;
  description: string | null;
  budget: string | null;
  status: string;
  created_at: string;
}

const allStatuses = ["En attente", "Devis envoyé", "Payé", "En cours", "Expédié", "Terminé"];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "En attente": "bg-coral/15 text-coral",
    "Payé": "bg-turquoise/15 text-turquoise",
    "En cours": "bg-amber/15 text-amber",
    "Expédié": "bg-electric-blue/15 text-electric-blue",
    "Devis envoyé": "bg-violet/15 text-violet",
    "Terminé": "bg-warm-gray/10 text-warm-gray",
  };
  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium ${styles[status] || "bg-warm-gray/10 text-warm-gray"}`}>
      {status}
    </span>
  );
}

export default function AdminCommandesClient({ commandes: initial }: { commandes: Commande[] }) {
  const [commandes, setCommandes] = useState(initial);
  const [filter, setFilter] = useState("Tout");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  let filtered = filter === "Tout"
    ? commandes
    : commandes.filter((c) => c.status === filter);

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (c) => c.client_name.toLowerCase().includes(q) || c.client_email.toLowerCase().includes(q)
    );
  }

  if (dateFrom) {
    filtered = filtered.filter((c) => c.created_at >= dateFrom);
  }
  if (dateTo) {
    const end = dateTo + "T23:59:59";
    filtered = filtered.filter((c) => c.created_at <= end);
  }

  function exportCSV() {
    const headers = ["Date", "Client", "Email", "Type", "Support", "Description", "Budget", "Statut"];
    const rows = filtered.map((c) => [
      new Date(c.created_at).toLocaleDateString("fr-FR"),
      c.client_name,
      c.client_email,
      c.type,
      c.support || "",
      (c.description || "").replace(/"/g, '""'),
      c.budget || "",
      c.status,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `commandes-toutenmel-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleStatusChange(id: string, newStatus: string) {
    const res = await fetch(`/api/admin/commandes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setCommandes(commandes.map((c) => c.id === id ? { ...c, status: newStatus } : c));
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold text-warm-brown">Commandes</h1>
        <button
          onClick={exportCSV}
          className="text-sm font-medium text-coral hover:text-coral-dark transition-colors border border-coral/30 px-4 py-2 rounded-full hover:bg-coral/5"
        >
          Exporter CSV
        </button>
      </div>
      <p className="text-warm-gray mb-6">{commandes.length} commandes au total — {filtered.length} affichées</p>

      {/* Search + Date filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Rechercher un client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border-2 border-cream-dark px-4 py-2 text-sm text-warm-brown focus:outline-none focus:border-coral w-full sm:w-64"
        />
        <div className="flex items-center gap-2">
          <label className="text-xs text-warm-gray">Du</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="rounded-xl border-2 border-cream-dark px-3 py-2 text-sm text-warm-brown focus:outline-none focus:border-coral"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-warm-gray">Au</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="rounded-xl border-2 border-cream-dark px-3 py-2 text-sm text-warm-brown focus:outline-none focus:border-coral"
          />
        </div>
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["Tout", ...allStatuses].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              filter === f
                ? "bg-coral text-white border-coral"
                : "bg-white text-warm-gray border-cream-dark hover:bg-coral hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Orders */}
      {filtered.length === 0 ? (
        <p className="text-center text-warm-gray py-8">Aucune commande trouvée.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((cmd) => (
            <div key={cmd.id} className="bg-white rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral to-magenta flex items-center justify-center text-white font-bold text-sm">
                    {cmd.client_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-warm-brown">{cmd.client_name}</p>
                    <p className="text-sm text-warm-gray">{cmd.client_email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={cmd.status}
                    onChange={(e) => handleStatusChange(cmd.id, e.target.value)}
                    className="text-xs px-3 py-1.5 rounded-full font-medium border border-cream-dark bg-white"
                  >
                    {allStatuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <span className="text-xs text-warm-gray">
                    {new Date(cmd.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
              </div>

              <div className="bg-cream/50 rounded-xl p-4 mb-3">
                <div className="flex flex-wrap gap-4 text-sm mb-2">
                  <span className="text-warm-gray">Type : <span className="font-medium text-warm-brown">{cmd.type === "achat" ? "Achat boutique" : "Commande personnalisée"}</span></span>
                  {cmd.support && (
                    <span className="text-warm-gray">Support : <span className="font-medium text-warm-brown">{cmd.support}</span></span>
                  )}
                  {cmd.budget && (
                    <span className="text-warm-gray">Budget : <span className="font-medium text-warm-brown">{cmd.budget}</span></span>
                  )}
                </div>
                {cmd.description && <p className="text-sm text-warm-brown">{cmd.description}</p>}
              </div>

              <div className="flex gap-3">
                <a
                  href={`mailto:${cmd.client_email}`}
                  className="text-sm font-medium text-coral hover:text-coral-dark transition-colors"
                >
                  Répondre par email
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
