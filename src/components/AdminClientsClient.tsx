"use client";

import { useState } from "react";

interface ClientAgg {
  name: string;
  email: string;
  count: number;
  lastDate: string;
  lastStatus: string;
}

const statusStyles: Record<string, string> = {
  "En attente": "bg-coral/15 text-coral",
  "Payé": "bg-turquoise/15 text-turquoise",
  "En cours": "bg-amber/15 text-amber",
  "Expédié": "bg-electric-blue/15 text-electric-blue",
  "Devis envoyé": "bg-violet/15 text-violet",
  "Terminé": "bg-warm-gray/10 text-warm-gray",
};

export default function AdminClientsClient({ clients }: { clients: ClientAgg[] }) {
  const [search, setSearch] = useState("");

  const filtered = search
    ? clients.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase())
      )
    : clients;

  return (
    <div>
      <h1 className="text-3xl font-bold text-warm-brown mb-2">Clients</h1>
      <p className="text-warm-gray mb-8">{clients.length} clients au total</p>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher par nom ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-96 rounded-xl border-2 border-cream-dark px-4 py-3 text-warm-brown focus:outline-none focus:border-coral transition-colors"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-warm-gray py-8">Aucun client trouvé.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((client) => (
            <div
              key={client.email}
              className="bg-white rounded-2xl p-5 hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-turquoise to-electric-blue flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-warm-brown">{client.name}</p>
                  <p className="text-sm text-warm-gray">{client.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <span className="text-warm-brown font-medium">
                  {client.count} commande{client.count > 1 ? "s" : ""}
                </span>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    statusStyles[client.lastStatus] || "bg-warm-gray/10 text-warm-gray"
                  }`}
                >
                  {client.lastStatus}
                </span>
                <span className="text-warm-gray text-xs">
                  {new Date(client.lastDate).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <a
                  href={`mailto:${client.email}`}
                  className="text-coral hover:text-coral-dark transition-colors font-medium"
                >
                  Email
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
