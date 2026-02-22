"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Oeuvre } from "@/lib/types";

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    disponible: "bg-turquoise/15 text-turquoise",
    vendu: "bg-warm-gray/10 text-warm-gray",
    "sur commande": "bg-amber/15 text-amber",
  };
  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium ${styles[status] || ""}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function AdminOeuvresClient({ oeuvres: initial }: { oeuvres: Oeuvre[] }) {
  const [oeuvres, setOeuvres] = useState(initial);
  const [filter, setFilter] = useState("Tout");
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  const filtered = filter === "Tout"
    ? oeuvres
    : oeuvres.filter((o) => o.status === filter.toLowerCase());

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette oeuvre ?")) return;
    setDeleting(id);
    const res = await fetch(`/api/admin/oeuvres/${id}`, { method: "DELETE" });
    if (res.ok) {
      setOeuvres(oeuvres.filter((o) => o.id !== id));
    }
    setDeleting(null);
  }

  async function handleStatusChange(id: string, newStatus: string) {
    const res = await fetch(`/api/admin/oeuvres/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setOeuvres(oeuvres.map((o) => o.id === id ? { ...o, status: newStatus as Oeuvre["status"] } : o));
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-warm-brown">Mes oeuvres</h1>
          <p className="text-warm-gray mt-1">{oeuvres.length} oeuvres au total</p>
        </div>
        <Link
          href="/admin/oeuvres/nouvelle"
          className="bg-gradient-to-r from-coral to-magenta text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-coral/20 transition-all hover:scale-105"
        >
          + Ajouter une oeuvre
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["Tout", "Disponible", "Vendu", "Sur commande"].map((f) => (
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

      {/* Table */}
      <div className="bg-white rounded-2xl overflow-hidden">
        {/* Desktop table */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead className="bg-cream-dark">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-warm-gray uppercase tracking-wider">Oeuvre</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-warm-gray uppercase tracking-wider">Catégorie</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-warm-gray uppercase tracking-wider">Prix</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-warm-gray uppercase tracking-wider">Statut</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-warm-gray uppercase tracking-wider">Date</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-warm-gray uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-dark">
              {filtered.map((oeuvre) => (
                <tr key={oeuvre.id} className="hover:bg-cream/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {oeuvre.image_url ? (
                        <img src={oeuvre.image_url} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-coral/30 to-magenta/30 flex-shrink-0" />
                      )}
                      <span className="font-medium text-warm-brown">{oeuvre.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-warm-gray">{oeuvre.category}</td>
                  <td className="px-6 py-4 font-semibold text-warm-brown">{oeuvre.price} &euro;</td>
                  <td className="px-6 py-4">
                    <select
                      value={oeuvre.status}
                      onChange={(e) => handleStatusChange(oeuvre.id, e.target.value)}
                      className="text-xs px-2 py-1 rounded-full font-medium border border-cream-dark bg-white"
                    >
                      <option value="disponible">Disponible</option>
                      <option value="vendu">Vendu</option>
                      <option value="sur commande">Sur commande</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-warm-gray">
                    {new Date(oeuvre.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(oeuvre.id)}
                      disabled={deleting === oeuvre.id}
                      className="text-warm-gray hover:text-coral text-sm disabled:opacity-50"
                    >
                      {deleting === oeuvre.id ? "..." : "Supprimer"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-cream-dark">
          {filtered.map((oeuvre) => (
            <div key={oeuvre.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-warm-brown">{oeuvre.title}</span>
                <StatusBadge status={oeuvre.status} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-warm-gray">{oeuvre.category}</span>
                <span className="font-semibold text-warm-brown">{oeuvre.price} &euro;</span>
              </div>
              <div className="flex gap-4 mt-2">
                <select
                  value={oeuvre.status}
                  onChange={(e) => handleStatusChange(oeuvre.id, e.target.value)}
                  className="text-xs px-2 py-1 rounded-full border border-cream-dark"
                >
                  <option value="disponible">Disponible</option>
                  <option value="vendu">Vendu</option>
                  <option value="sur commande">Sur commande</option>
                </select>
                <button
                  onClick={() => handleDelete(oeuvre.id)}
                  className="text-warm-gray text-sm hover:text-coral"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-warm-gray py-8">Aucune oeuvre trouvée.</p>
        )}
      </div>
    </div>
  );
}
