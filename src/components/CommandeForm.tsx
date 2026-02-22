"use client";

import { useState } from "react";

export default function CommandeForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const body = {
      name: form.get("name"),
      email: form.get("email"),
      support: form.get("support"),
      description: form.get("description"),
      budget: form.get("budget"),
    };

    const res = await fetch("/api/commandes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setSent(true);
    } else {
      const data = await res.json();
      alert("Erreur : " + data.error);
    }
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">🎨</div>
        <h3 className="text-2xl font-heading font-bold gradient-text mb-2">Demande envoyée !</h3>
        <p className="text-warm-gray">Mel étudie votre projet et vous recontactera rapidement avec un devis.</p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-coral hover:text-coral-dark font-medium transition-colors"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-warm-brown mb-1">Nom *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full rounded-xl border-2 border-blush/50 px-4 py-3 text-warm-brown focus:outline-none focus:border-coral transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-warm-brown mb-1">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-xl border-2 border-blush/50 px-4 py-3 text-warm-brown focus:outline-none focus:border-coral transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="support" className="block text-sm font-semibold text-warm-brown mb-1">Type de support</label>
        <select
          id="support"
          name="support"
          className="w-full rounded-xl border-2 border-blush/50 px-4 py-3 text-warm-brown focus:outline-none focus:border-coral transition-colors"
        >
          <option value="">Choisir...</option>
          <option value="Toile / Tableau">Toile / Tableau</option>
          <option value="Baskets / Chaussures">Baskets / Chaussures</option>
          <option value="Guitare / Instrument">Guitare / Instrument</option>
          <option value="Objet du quotidien">Objet du quotidien</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-warm-brown mb-1">Décrivez votre idée *</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          placeholder="Couleurs souhaitées, dimensions, inspiration, occasion..."
          className="w-full rounded-xl border-2 border-blush/50 px-4 py-3 text-warm-brown placeholder:text-warm-gray/40 focus:outline-none focus:border-coral transition-colors"
        />
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-semibold text-warm-brown mb-1">Budget indicatif</label>
        <input
          type="text"
          id="budget"
          name="budget"
          placeholder="Ex : 100-200€"
          className="w-full rounded-xl border-2 border-blush/50 px-4 py-3 text-warm-brown placeholder:text-warm-gray/40 focus:outline-none focus:border-coral transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-coral to-magenta text-white py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-coral/30 transition-all hover:scale-[1.02] disabled:opacity-50"
      >
        {loading ? "Envoi en cours..." : "Envoyer ma demande"}
      </button>
    </form>
  );
}
