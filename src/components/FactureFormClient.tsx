"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LineItem {
  description: string;
  quantity: number;
  price: number;
}

export default function FactureFormClient() {
  const router = useRouter();
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<LineItem[]>([
    { description: "", quantity: 1, price: 0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const total = subtotal; // Pas de TVA pour artiste non assujetti

  function addItem() {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  }

  function removeItem(index: number) {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  }

  function updateItem(index: number, field: keyof LineItem, value: string | number) {
    setItems(
      items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/factures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_name: clientName,
        client_email: clientEmail,
        items,
        subtotal,
        tax: 0,
        total,
        notes: notes || null,
      }),
    });

    if (res.ok) {
      router.push("/admin/factures");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Erreur lors de la création");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-coral/10 text-coral text-sm font-medium px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Client info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-warm-brown mb-1">
            Nom du client
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
            className="w-full rounded-xl border-2 border-cream-dark px-4 py-3 text-warm-brown focus:outline-none focus:border-coral"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-warm-brown mb-1">
            Email
          </label>
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            required
            className="w-full rounded-xl border-2 border-cream-dark px-4 py-3 text-warm-brown focus:outline-none focus:border-coral"
          />
        </div>
      </div>

      {/* Line items */}
      <div>
        <label className="block text-sm font-semibold text-warm-brown mb-3">
          Lignes de facture
        </label>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex gap-3 items-start">
              <input
                type="text"
                placeholder="Description"
                value={item.description}
                onChange={(e) => updateItem(index, "description", e.target.value)}
                required
                className="flex-1 rounded-xl border-2 border-cream-dark px-4 py-3 text-warm-brown focus:outline-none focus:border-coral"
              />
              <input
                type="number"
                placeholder="Qté"
                min={1}
                value={item.quantity}
                onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 1)}
                className="w-20 rounded-xl border-2 border-cream-dark px-3 py-3 text-warm-brown focus:outline-none focus:border-coral text-center"
              />
              <div className="relative">
                <input
                  type="number"
                  placeholder="Prix"
                  min={0}
                  value={item.price || ""}
                  onChange={(e) => updateItem(index, "price", parseInt(e.target.value) || 0)}
                  required
                  className="w-28 rounded-xl border-2 border-cream-dark px-3 py-3 pr-8 text-warm-brown focus:outline-none focus:border-coral text-right"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray">€</span>
              </div>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-warm-gray hover:text-coral transition-colors mt-3"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addItem}
          className="mt-3 text-sm font-medium text-coral hover:text-coral-dark transition-colors"
        >
          + Ajouter une ligne
        </button>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-semibold text-warm-brown mb-1">
          Notes (optionnel)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Conditions, délais, mentions légales..."
          className="w-full rounded-xl border-2 border-cream-dark px-4 py-3 text-warm-brown focus:outline-none focus:border-coral"
        />
      </div>

      {/* Total */}
      <div className="bg-cream/50 rounded-xl p-4">
        <div className="flex justify-between items-center text-lg">
          <span className="font-semibold text-warm-brown">Total</span>
          <span className="text-2xl font-bold gradient-text">{total} €</span>
        </div>
        <p className="text-xs text-warm-gray mt-1">TVA non applicable — article 293 B du CGI</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-coral to-magenta text-white py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-coral/30 transition-all hover:scale-[1.02] disabled:opacity-50"
      >
        {loading ? "Création..." : "Créer la facture"}
      </button>
    </form>
  );
}
