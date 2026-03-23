# RAPPORT AUDIT TOUTENMEL — 23 mars 2026

Projet : toutenmel.fr
Stack : Next.js 16.1.6 + TypeScript + Tailwind CSS v4 + Supabase
Deploiement : Vercel
Repo : github.com/13jisse-music/toutenmel

---

## 1. Structure du projet

### Pages publiques (10)
| Route | Description |
|-------|-------------|
| `/` | Accueil (hero photo dynamique, mosaique oeuvres, categories) |
| `/a-propos` | Biographie Mel |
| `/boutique` | Catalogue oeuvres (prix, statut, filtres) |
| `/galerie` | Redirect vers /boutique |
| `/commandes` | Commandes personnalisees (formulaire + 4 etapes) |
| `/suivi` | Suivi commande client (email + n° commande) |
| `/contact` | Formulaire contact |
| `/faq` | Questions frequentes (categories colorees) |
| `/mentions-legales` | Mentions legales (dynamiques depuis BDD) |
| `/cgv` | Conditions Generales de Vente |
| `/confidentialite` | Politique confidentialite RGPD |
| `/cookies` | Politique cookies |

### Pages admin (10)
| Route | Description |
|-------|-------------|
| `/admin` | Dashboard (stats, analytics prix par categorie) |
| `/admin/login` | Connexion admin |
| `/admin/logout` | Deconnexion |
| `/admin/oeuvres` | CRUD oeuvres (liste + filtres) |
| `/admin/oeuvres/nouvelle` | Ajouter oeuvre |
| `/admin/oeuvres/[id]` | Modifier oeuvre |
| `/admin/oeuvres/[id]/certificat` | Certificat authenticite |
| `/admin/commandes` | Gestion commandes |
| `/admin/clients` | Vue clients agregee |
| `/admin/messages` | Messages contact (lu/non lu) |
| `/admin/factures` | CRUD factures |
| `/admin/factures/nouvelle` | Nouvelle facture |
| `/admin/factures/[id]` | Voir/modifier facture |
| `/admin/legal` | Infos legales (formulaire dynamique) |

### API Routes (12)
| Route | Methodes |
|-------|----------|
| `/api/auth` | POST (login admin) |
| `/api/contact` | POST (formulaire contact) |
| `/api/commandes` | POST (nouvelle commande) |
| `/api/suivi` | POST (suivi commande) |
| `/api/admin/oeuvres` | POST (creer oeuvre) |
| `/api/admin/oeuvres/[id]` | PATCH/DELETE |
| `/api/admin/upload` | POST (upload image) |
| `/api/admin/commandes/[id]` | PATCH (maj statut) |
| `/api/admin/factures` | POST (creer facture) |
| `/api/admin/factures/[id]` | PATCH/DELETE |
| `/api/admin/messages/[id]` | PATCH (marquer lu) |
| `/api/admin/legal` | PUT (maj infos legales) |

### Composants (19)
AdminClientsClient, AdminCommandesClient, AdminFacturesClient, AdminLegalClient, AdminMessagesClient, AdminOeuvresClient, BoutiqueClient, CertificatClient, CommandeForm, ContactForm, EditOeuvreClient, FactureFormClient, FactureViewClient, Footer, GalerieClient, Header, PhotoGallery, ShareButtons, SuiviClient

### Librairies (5 fichiers)
- `supabase.ts` — Client public
- `supabase-admin.ts` — Client service_role
- `types.ts` — Types TypeScript
- `email.ts` — Envoi emails Resend
- `gradients.ts` — Gradients decoratifs

---

## 2. Auth et securite

### Authentification admin
- **Methode** : cookie `admin_token` (pas Supabase Auth)
- **Middleware** : protege `/admin/*` sauf login/logout
- **Credentials** : toutenmel@gmail.com / Yourbanlt300!
- **ADMIN_PASSWORD** : fallback hardcode dans `/api/auth/route.ts`

### Points d'attention
- ⚠️ **Pas de Supabase Auth** : auth custom par cookie, moins securise que JWT
- ⚠️ **Password hardcode** : risque si le code est public (repo GitHub)
- ⚠️ **Pas de CSRF** : les routes API admin ne verifient que le cookie
- ✅ **RLS active** sur toutes les tables Supabase
- ✅ **supabaseAdmin** (service_role) utilise cote serveur uniquement

---

## 3. Base de donnees Supabase

### Tables (5 + settings)
| Table | Colonnes cles |
|-------|---------------|
| `oeuvres` | id, title, description, category, dimensions, price, status, image_url |
| `commandes` | id, client_name, client_email, type, oeuvre_id, support, description, budget, status |
| `messages` | id, from_name, from_email, subject, message, read |
| `factures` | id, numero (TEM-YYYY-NNN), commande_id, items JSONB, subtotal, tax, total, status |
| `site_settings` | id, legal_name, legal_status, siret, address, mediator_name, profile_photo_url |

### Statuts oeuvres
- `disponible`, `sur commande`, `vendu`

---

## 4. SEO

| Element | Statut |
|---------|--------|
| `sitemap.ts` | ✅ 7 URLs (accueil, faq, boutique, a-propos, commandes, contact, mentions-legales) |
| `robots.ts` | ✅ Allow /, Disallow /admin/ |
| Open Graph | ✅ Toutes les pages publiques |
| Twitter Cards | ✅ summary_large_image |
| JSON-LD Schema.org | ✅ Person/Artist dans layout.tsx |
| Meta descriptions | ✅ Presentes sur toutes les pages |
| Canonical URLs | ✅ alternates.canonical sur boutique, faq |

### Points d'attention SEO
- ⚠️ **Pas de blog** : pas de contenu editorial pour le SEO longue traine
- ⚠️ **Galerie = redirect** : /galerie redirige vers /boutique, pas de page galerie dediee
- ⚠️ **Sitemap statique** : pas de sitemap dynamique pour les oeuvres individuelles
- ⚠️ **Pas de pages individuelles par oeuvre** : pas de route `/boutique/[slug]` pour le SEO

---

## 5. Emails (Resend)

| Fonction | Description |
|----------|-------------|
| `sendContactNotification` | Notification admin nouveau message |
| `sendCommandeNotification` | Notification admin nouvelle commande |
| `sendCommandeConfirmation` | Confirmation client avec n° suivi |

- FROM : `Toutenmel <notifications@toutenmel.fr>`
- Lazy-init pour eviter erreur build sans cle API

---

## 6. Paiement

- ❌ **Pas de Stripe** : pas de paiement en ligne
- Les commandes sont des demandes manuelles (formulaire → admin gere)
- Factures generees manuellement depuis l'admin
- **Prevu** : integration Stripe (mentionee dans CLAUDE.md)

---

## 7. Configuration Next.js

```typescript
// next.config.ts
images: { remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }] }
```

- ✅ Images Supabase configurees
- ⚠️ **Pas de prebuild** script pour OneDrive/.next (contrairement aux autres projets)
- ⚠️ **Pas de distDir** override vers node_modules/.cache/.next
- `revalidate: 60` sur les pages dynamiques (boutique, accueil)

---

## 8. Dependances

| Package | Version |
|---------|---------|
| next | 16.1.6 |
| react | 19.2.3 |
| @supabase/supabase-js | ^2.97.0 |
| pg | ^8.18.0 |
| resend | ^6.9.2 |
| tailwindcss | ^4 |

- ⚠️ **Pas de @supabase/ssr** : pas de middleware SSR Supabase (coherent avec auth custom)
- ⚠️ **Pas de stripe** dans les dependances

---

## 9. Points d'attention critiques

### Securite
1. ⚠️ **Password admin hardcode** dans le code source — risque si repo public
2. ⚠️ **Auth par cookie simple** sans expiration robuste ni rotation
3. ⚠️ **Pas de rate limiting** sur les API publiques (contact, commandes)

### Business
4. ⚠️ **Pas de paiement en ligne** — frein a la conversion
5. ⚠️ **Pas de blog SEO** — manque de contenu pour le referencement
6. ⚠️ **Pas de pages produit individuelles** — chaque oeuvre devrait avoir sa propre URL pour Google
7. ⚠️ **Pas de Google Analytics** — pas de suivi du trafic
8. ⚠️ **1 seule vente (270EUR)** — le tunnel de conversion n'est pas optimise

### Technique
9. ⚠️ **Pas de prebuild OneDrive** — risque EPERM au build
10. ⚠️ **Galerie = redirect** — fonctionnalite perdue, a restaurer ou supprimer du sitemap
11. ✅ **Certificat authenticite** — bonne fonctionnalite pour la credibilite
12. ✅ **Suivi commande** — experience client professionnelle

---

## 10. Recommandations prioritaires

### Rapide (1-2h chacun)
1. Ajouter pages individuelles `/boutique/[slug]` pour chaque oeuvre (SEO++)
2. Ajouter prebuild + distDir OneDrive dans next.config.ts
3. Ajouter Google Analytics (gtag.js)
4. Deplacer ADMIN_PASSWORD vers variable d'environnement Vercel uniquement

### Moyen terme (demi-journee)
5. Integrer Stripe pour le paiement en ligne
6. Creer 3-4 articles blog SEO (fluide art, techniques, entretien tableaux)
7. Restaurer une vraie page galerie avec lightbox

### Long terme
8. Instagram integration (@toutenmel)
9. Newsletter (table a creer)
10. Photo de profil Mel (upload Storage)

---

## Metriques actuelles

| Metrique | Valeur |
|----------|--------|
| Oeuvres | 24 creations |
| Ventes | 1 (270 EUR) |
| Google rating | 0 (pas de fiche Google) |
| Blog articles | 0 |
| Newsletter | pas configure |
| Stripe | pas configure |
