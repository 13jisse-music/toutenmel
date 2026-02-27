"use client";

import { useState, useRef } from "react";
import Image from "next/image";

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
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_photo_url: string | null;
  about_subtitle: string | null;
  about_text: string | null;
  about_closing: string | null;
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
    hero_title: initial?.hero_title || "Toutenmel",
    hero_subtitle: initial?.hero_subtitle || "",
    hero_photo_url: initial?.hero_photo_url || "",
    about_subtitle: initial?.about_subtitle || "Artiste peintre autodidacte",
    about_text: initial?.about_text || "",
    about_closing: initial?.about_closing || "Bienvenue dans mon univers. Bienvenue chez Toutenmel.",
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
        Mon site
      </h1>
      <p className="text-warm-gray mb-8">
        Gère tes photos, textes du site et informations légales depuis cette page.
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
        {/* Section photos */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-heading text-2xl text-violet mb-1">
            Mes photos
          </h2>
          <p className="text-warm-gray/70 text-sm mb-5">
            Ta photo de profil (page À propos) et la photo d&apos;accueil du
            site. Tu peux les uploader depuis ton téléphone.
          </p>

          <div className="space-y-6">
            <PhotoUpload
              label="Photo de profil"
              help="S'affiche sur la page À propos. Choisis une belle photo de toi !"
              currentUrl={form.profile_photo_url}
              onUploaded={(url) => update("profile_photo_url", url)}
            />
            <PhotoUpload
              label="Photo d'accueil"
              help="S'affiche en fond de la page d'accueil. Une photo grand format de toi ou de ton atelier."
              currentUrl={form.hero_photo_url}
              onUploaded={(url) => update("hero_photo_url", url)}
            />
          </div>
        </section>

        {/* Section textes accueil */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-heading text-2xl text-coral mb-1">
            Texte d&apos;accueil
          </h2>
          <p className="text-warm-gray/70 text-sm mb-5">
            Le texte qui apparaît sur la page d&apos;accueil de ton site.
          </p>

          <div className="space-y-4">
            <Field
              label="Titre principal"
              value={form.hero_title}
              onChange={(v) => update("hero_title", v)}
              placeholder="Toutenmel"
            />
            <TextArea
              label="Texte d'introduction"
              value={form.hero_subtitle}
              onChange={(v) => update("hero_subtitle", v)}
              placeholder="Toiles, fluide art, aérographe & customisations uniques..."
              rows={3}
              help="Ce texte apparaît sous le logo sur la page d'accueil"
            />
          </div>
        </section>

        {/* Section textes À propos */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-heading text-2xl text-magenta mb-1">
            Page À propos
          </h2>
          <p className="text-warm-gray/70 text-sm mb-5">
            Ton texte de présentation — raconte ton parcours, ta passion.
          </p>

          <div className="space-y-4">
            <Field
              label="Sous-titre"
              value={form.about_subtitle}
              onChange={(v) => update("about_subtitle", v)}
              placeholder="Artiste peintre autodidacte"
              help="Le petit texte qui apparaît au-dessus du titre"
            />
            <TextArea
              label="Texte de présentation"
              value={form.about_text}
              onChange={(v) => update("about_text", v)}
              placeholder="Depuis l'enfance, le dessin et la couleur..."
              rows={10}
              help="Sépare tes paragraphes par une ligne vide. Chaque paragraphe aura un style différent."
            />
            <Field
              label="Phrase de conclusion"
              value={form.about_closing}
              onChange={(v) => update("about_closing", v)}
              placeholder="Bienvenue dans mon univers. Bienvenue chez Toutenmel."
              help="La phrase finale en gros sur la page À propos"
            />
          </div>
        </section>

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
      </div>

      {/* Save button */}
      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-coral to-magenta text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all disabled:opacity-50"
        >
          {saving ? "Enregistrement..." : "Enregistrer tout"}
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

/* ═══════════════════════ PHOTO UPLOAD ═══════════════════════ */

function PhotoUpload({
  label,
  help,
  currentUrl,
  onUploaded,
}: {
  label: string;
  help?: string;
  currentUrl: string;
  onUploaded: (url: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Erreur lors de l'upload");
      const data = await res.json();
      onUploaded(data.url);
    } catch (err) {
      setUploadError((err as Error).message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-warm-brown mb-2">
        {label}
      </label>

      <div className="flex items-start gap-4">
        {/* Preview */}
        <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-cream border-2 border-dashed border-cream-dark flex-shrink-0">
          {currentUrl ? (
            <Image
              src={currentUrl}
              alt={label}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-warm-gray/40 text-3xl">
              +
            </div>
          )}
        </div>

        <div className="flex-1">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="bg-gradient-to-r from-violet/80 to-magenta/80 text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-md transition-all disabled:opacity-50"
          >
            {uploading ? "Upload en cours..." : currentUrl ? "Changer la photo" : "Choisir une photo"}
          </button>
          {help && <p className="mt-1.5 text-xs text-warm-gray/60">{help}</p>}
          {uploadError && (
            <p className="mt-1 text-xs text-coral">{uploadError}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ FIELD COMPONENTS ═══════════════════════ */

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

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  help,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  help?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-warm-brown mb-1">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-2.5 rounded-xl border border-cream-dark bg-cream text-warm-brown placeholder:text-warm-gray/40 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-colors resize-y"
      />
      {help && <p className="mt-1 text-xs text-warm-gray/60">{help}</p>}
    </div>
  );
}
