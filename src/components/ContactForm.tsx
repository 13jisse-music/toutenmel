"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const body = {
      name: form.get("name"),
      email: form.get("email"),
      subject: form.get("subject"),
      message: form.get("message"),
    };

    const res = await fetch("/api/contact", {
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
        <div className="text-5xl mb-4">✉️</div>
        <h3 className="text-2xl font-heading font-bold gradient-text mb-2">Message envoyé !</h3>
        <p className="text-warm-gray">Mel vous répondra dans les 24 à 48h.</p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-coral hover:text-coral-dark font-medium transition-colors"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-warm-brown mb-1">Nom</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full rounded-xl border-2 border-blush/50 px-4 py-3 text-warm-brown focus:outline-none focus:border-coral transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-warm-brown mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full rounded-xl border-2 border-blush/50 px-4 py-3 text-warm-brown focus:outline-none focus:border-coral transition-colors"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-warm-brown mb-1">Sujet</label>
        <select
          id="subject"
          name="subject"
          required
          className="w-full rounded-xl border-2 border-blush/50 px-4 py-3 text-warm-brown focus:outline-none focus:border-coral transition-colors"
        >
          <option value="">Choisir...</option>
          <option value="Question sur une œuvre">Question sur une œuvre</option>
          <option value="Commande personnalisée">Commande personnalisée</option>
          <option value="Collaboration / Événement">Collaboration / Événement</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-warm-brown mb-1">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Votre message..."
          className="w-full rounded-xl border-2 border-blush/50 px-4 py-3 text-warm-brown placeholder:text-warm-gray/40 focus:outline-none focus:border-coral transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-electric-blue to-turquoise text-white py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-turquoise/30 transition-all hover:scale-[1.02] disabled:opacity-50"
      >
        {loading ? "Envoi en cours..." : "Envoyer"}
      </button>
    </form>
  );
}
