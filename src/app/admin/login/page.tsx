"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Email ou mot de passe incorrect");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-cream-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/logotoutenmel.png"
            alt="Toutenmel"
            width={300}
            height={150}
            className="mx-auto w-[250px] h-auto mb-4"
          />
          <p className="text-warm-gray">Espace administration</p>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-coral via-amber to-magenta rounded-2xl blur-sm opacity-40" />
          <div className="relative bg-white rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-coral/10 text-coral text-sm font-medium px-4 py-3 rounded-xl text-center">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-warm-brown mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border-2 border-blush/50 px-4 py-3 text-warm-brown focus:outline-none focus:border-coral transition-colors"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-warm-brown mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border-2 border-blush/50 px-4 py-3 text-warm-brown focus:outline-none focus:border-coral transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-coral to-magenta text-white py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-coral/30 transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
