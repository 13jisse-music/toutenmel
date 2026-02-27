"use client";

import { useState } from "react";

interface SiteSettings {
  id: string;
  legal_name: string | null;
  legal_status: string | null;
  siret: string | null;
  address: string | null;
  region: string | null;
  phone: string | null;
  mediator_name: string | null;
  mediator_url: string | null;
  profile_photo_url: string | null;
  updated_at: string | null;
}

export default function AdminLegalClient({
  settings: initial,
}: {
  settings: SiteSettings | null;
}) {
  const [form, setForm] = useState({
    legal_name: initial?.legal_name || "",
    legal_status: initial?.legal_status || "",
    siret: initial?.siret || "",
    address: initial?.address || "",
    region: initial?.region || "",
    phone: initial?.phone || "",
    mediator_name: initial?.mediator_name || "CM2C",
    mediator_url: initial?.mediator_url || "https://www.cm2c.net",
    profile_photo_url: initial?.profile_photo_url || "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/legal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur lors de la sauvegarde");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  const complete =
    form.legal_name && form.legal_status && form.siret && form.address;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-warm-brown mb-2">
        Informations légales
      </h1>
      <p className="text-warm-gray mb-8">
        Ces informations sont utilisées dans les pages Mentions légales, CGV,
        et Politique de confidentialité de ton site. Remplis tout pour être en
        règle !
      </p>

      {/* Status indicator */}
      {!complete && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-amber/10 to-orange/10 border border-amber/30">
          <p className="text-warm-brown font-medium text-sm">
            Il manque des informations obligatoires pour être conforme.
            Remplis au minimum : nom, statut, SIRET et adresse.
          </p>
        </div>
      )}

      {complete && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-turquoise/10 to-electric-blue/10 border border-turquoise/30">
          <p className="text-warm-brown font-medium text-sm">
            Toutes les informations obligatoires sont remplies. Ton site est
            conforme !
          </p>
        </div>
      )}

      <div className="space-y-8">
        {/* Section identité */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-heading text-2xl text-coral mb-1">
            Ton identité
          </h2>
          <p className="text-warm-gray/70 text-sm mb-5">
            Ces infos apparaissent dans les Mentions légales et les CGV.
            C&apos;est obligatoire pour vendre en ligne en France.
          </p>

          <div className="space-y-4">
            <Field
              label="Nom complet"
              placeholder="Ex : Mélanie Martinez"
              value={form.legal_name}
              onChange={(v) => update("legal_name", v)}
              required
              help="Ton nom tel qu'il apparaît sur les documents officiels"
            />
            <Field
              label="Statut juridique"
              value={form.legal_status}
              onChange={(v) => update("legal_status", v)}
              required
              options={[
                "",
                "Micro-entrepreneur",
                "Artiste-auteur (MDA / AGESSA)",
                "Auto-entrepreneur",
                "Entreprise individuelle",
                "SARL / EURL",
                "SAS / SASU",
              ]}
              help="Si tu n'es pas sûre, c'est probablement Micro-entrepreneur ou Artiste-auteur"
            />
            <Field
              label="Numéro SIRET"
              placeholder="Ex : 123 456 789 00012"
              value={form.siret}
              onChange={(v) => update("siret", v)}
              required
              help="14 chiffres, visible sur ton extrait SIRENE ou tes factures"
            />
            <Field
              label="Adresse postale"
              placeholder="Ex : 12 rue des Arts, 13000 Marseille"
              value={form.address}
              onChange={(v) => update("address", v)}
              required
              help="L'adresse de ton activité (peut être ton domicile)"
            />
            <Field
              label="Téléphone"
              placeholder="Ex : 06 12 34 56 78"
              value={form.phone}
              onChange={(v) => update("phone", v)}
              help="Optionnel — s'affiche dans les mentions légales si renseigné"
            />
          </div>
        </section>

        {/* Section livraison */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-heading text-2xl text-magenta mb-1">
            Livraison & remise en main propre
          </h2>
          <p className="text-warm-gray/70 text-sm mb-5">
            Pour les CGV — où tes clients peuvent venir chercher leurs
            oeuvres.
          </p>

          <Field
            label="Région / Ville pour remise en main propre"
            placeholder="Ex : Marseille et environs"
            value={form.region}
            onChange={(v) => update("region", v)}
            help="S'affiche dans les CGV comme option de retrait"
          />
        </section>

        {/* Section médiateur */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-heading text-2xl text-electric-blue mb-1">
            Médiateur de la consommation
          </h2>
          <p className="text-warm-gray/70 text-sm mb-5">
            Obligatoire pour la vente en ligne. CM2C est déjà configuré,
            tu n&apos;as rien à faire sauf si tu utilises un autre médiateur.
          </p>

          <div className="space-y-4">
            <Field
              label="Nom du médiateur"
              value={form.mediator_name}
              onChange={(v) => update("mediator_name", v)}
              help="CM2C (Centre de Médiation de la Consommation de Conciliateurs) est gratuit"
            />
            <Field
              label="Site web du médiateur"
              value={form.mediator_url}
              onChange={(v) => update("mediator_url", v)}
            />
          </div>
        </section>

        {/* Section photo */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-heading text-2xl text-violet mb-1">
            Photo de profil
          </h2>
          <p className="text-warm-gray/70 text-sm mb-5">
            Ta photo pour le site (page À propos, etc.). Tu pourras
            l&apos;ajouter plus tard si tu veux.
          </p>

          <Field
            label="URL de la photo"
            placeholder="https://..."
            value={form.profile_photo_url}
            onChange={(v) => update("profile_photo_url", v)}
            help="Pour l'instant, colle un lien vers ta photo. On ajoutera un bouton d'upload bientôt !"
          />
        </section>
      </div>

      {/* Save button */}
      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-coral to-magenta text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all disabled:opacity-50"
        >
          {saving ? "Enregistrement..." : "Enregistrer"}
        </button>

        {saved && (
          <span className="text-turquoise font-medium text-sm animate-slide-up">
            Sauvegardé !
          </span>
        )}
        {error && (
          <span className="text-coral font-medium text-sm">{error}</span>
        )}
      </div>

      {/* Aide */}
      <div className="mt-10 p-5 rounded-xl bg-cream border border-cream-dark">
        <h3 className="font-heading text-xl text-warm-brown mb-2">
          Besoin d&apos;aide ?
        </h3>
        <ul className="space-y-2 text-warm-gray text-sm">
          <li>
            <strong>SIRET :</strong> tu le trouves sur{" "}
            <a
              href="https://www.sirene.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:text-magenta"
            >
              sirene.fr
            </a>{" "}
            en cherchant ton nom
          </li>
          <li>
            <strong>Statut :</strong> si tu vends tes oeuvres et que tu es
            inscrite à la MDA, choisis &quot;Artiste-auteur&quot;
          </li>
          <li>
            <strong>Médiateur :</strong> CM2C est déjà configuré, c&apos;est
            gratuit et ça suffit pour être en règle
          </li>
          <li>
            <strong>Questions ?</strong> Demande à Jisse, il saura
            t&apos;aider !
          </li>
        </ul>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  help,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  help?: string;
  options?: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-warm-brown mb-1">
        {label}
        {required && <span className="text-coral ml-1">*</span>}
      </label>
      {options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-cream-dark bg-cream text-warm-brown focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-colors"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt || "— Choisir —"}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 rounded-xl border border-cream-dark bg-cream text-warm-brown placeholder:text-warm-gray/40 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-colors"
        />
      )}
      {help && <p className="mt-1 text-xs text-warm-gray/60">{help}</p>}
    </div>
  );
}
