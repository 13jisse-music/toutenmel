"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Oeuvre } from "@/lib/types";

export default function EditOeuvreClient({ oeuvre }: { oeuvre: Oeuvre }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(oeuvre.image_url);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(oeuvre.image_url);
  const [galleryUrls, setGalleryUrls] = useState<string[]>(oeuvre.gallery_urls ?? []);
  const [galleryUploading, setGalleryUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (res.ok) {
      setImageUrl(data.url);
    } else {
      alert("Erreur upload : " + data.error);
    }
    setUploading(false);
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setGalleryUploading(true);

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (res.ok) {
        setGalleryUrls((prev) => [...prev, data.url]);
      } else {
        alert("Erreur upload : " + data.error);
      }
    }

    setGalleryUploading(false);
    // Reset input
    e.target.value = "";
  }

  function removeGalleryImage(index: number) {
    setGalleryUrls((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const body = {
      title: form.get("title"),
      description: form.get("description") || null,
      category: form.get("category"),
      dimensions: form.get("dimensions") || null,
      price: Number(form.get("price")),
      status: form.get("status"),
      image_url: imageUrl,
      gallery_urls: galleryUrls.length > 0 ? galleryUrls : [],
    };

    const res = await fetch(`/api/admin/oeuvres/${oeuvre.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/oeuvres");
    } else {
      const data = await res.json();
      alert("Erreur : " + data.error);
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/oeuvres" className="text-warm-gray hover:text-coral transition-colors">
          &larr; Retour
        </Link>
        <h1 className="text-3xl font-bold text-warm-brown">Modifier l&apos;oeuvre</h1>
      </div>

      <div className="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Photo upload */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-lg font-bold text-warm-brown mb-4">Photo principale</h2>
            <label className="border-2 border-dashed border-blush rounded-xl p-10 text-center hover:border-coral transition-colors cursor-pointer block relative overflow-hidden">
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {preview ? (
                <div className="relative">
                  <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                  {uploading && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg">
                      <span className="text-coral font-medium">Upload en cours...</span>
                    </div>
                  )}
                  <p className="text-xs text-warm-gray/60 mt-2">Cliquez pour changer la photo</p>
                </div>
              ) : (
                <>
                  <div className="text-4xl mb-3">📷</div>
                  <p className="text-warm-gray font-medium">Cliquez pour ajouter une photo</p>
                  <p className="text-warm-gray/60 text-sm mt-1">PNG, JPG jusqu&apos;à 10 Mo</p>
                </>
              )}
            </label>
          </div>

          {/* Gallery photos */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-lg font-bold text-warm-brown mb-2">Photos supplémentaires</h2>
            <p className="text-sm text-warm-gray mb-4">
              Ajoutez des photos sous différents angles, détails, ou en situation.
            </p>

            {/* Existing gallery thumbnails */}
            {galleryUrls.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-4">
                {galleryUrls.map((url, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={url}
                      alt={`Galerie ${i + 1}`}
                      className="w-24 h-24 object-cover rounded-xl border-2 border-cream-dark"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(i)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-coral text-white rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-magenta"
                      title="Supprimer"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload button */}
            <label className="inline-flex items-center gap-2 border-2 border-dashed border-blush rounded-xl px-6 py-4 text-center hover:border-coral transition-colors cursor-pointer relative overflow-hidden">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {galleryUploading ? (
                <span className="text-coral font-medium">Upload en cours...</span>
              ) : (
                <>
                  <svg className="w-5 h-5 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-warm-gray font-medium">Ajouter des photos</span>
                </>
              )}
            </label>
          </div>

          {/* Info */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-lg font-bold text-warm-brown mb-4">Informations</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-warm-brown mb-1">
                  Titre de l&apos;oeuvre *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  defaultValue={oeuvre.title}
                  className="w-full rounded-xl border-2 border-blush/50 px-4 py-3 text-warm-brown placeholder:text-warm-gray/40 focus:outline-none focus:border-coral transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-warm-brown mb-1">
                    Catégorie *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    defaultValue={oeuvre.category}
                    className="w-full rounded-xl border-2 border-blush/50 px-4 py-3 text-warm-brown focus:outline-none focus:border-coral transition-colors"
                  >
                    <option value="Toiles">Toiles</option>
                    <option value="Fluide Art">Fluide Art</option>
                    <option value="Aérographe">Aérographe</option>
                    <option value="Customisations">Customisations</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="dimensions" className="block text-sm font-semibold text-warm-brown mb-1">
                    Dimensions / Taille
                  </label>
                  <input
                    type="text"
                    id="dimensions"
                    name="dimensions"
                    defaultValue={oeuvre.dimensions || ""}
                    placeholder="Ex : 40x50 cm ou Taille 42"
                    className="w-full rounded-xl border-2 border-blush/50 px-4 py-3 text-warm-brown placeholder:text-warm-gray/40 focus:outline-none focus:border-coral transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-warm-brown mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  defaultValue={oeuvre.description || ""}
                  placeholder="Décrivez l'oeuvre, les techniques utilisées, l'inspiration..."
                  className="w-full rounded-xl border-2 border-blush/50 px-4 py-3 text-warm-brown placeholder:text-warm-gray/40 focus:outline-none focus:border-coral transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-lg font-bold text-warm-brown mb-4">Prix & Disponibilité</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-warm-brown mb-1">
                  Prix (&euro;) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  min="0"
                  required
                  defaultValue={oeuvre.price}
                  className="w-full rounded-xl border-2 border-blush/50 px-4 py-3 text-warm-brown placeholder:text-warm-gray/40 focus:outline-none focus:border-coral transition-colors"
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-semibold text-warm-brown mb-1">
                  Statut
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue={oeuvre.status}
                  className="w-full rounded-xl border-2 border-blush/50 px-4 py-3 text-warm-brown focus:outline-none focus:border-coral transition-colors"
                >
                  <option value="disponible">Disponible</option>
                  <option value="vendu">Vendu</option>
                  <option value="sur commande">Sur commande</option>
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || uploading || galleryUploading}
              className="flex-1 bg-gradient-to-r from-coral to-magenta text-white py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-coral/30 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? "Enregistrement..." : "Enregistrer les modifications"}
            </button>
            <Link
              href="/admin/oeuvres"
              className="px-8 py-4 rounded-full text-lg font-medium border-2 border-warm-gray/20 text-warm-gray hover:border-coral hover:text-coral transition-colors text-center"
            >
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
