# Toutenmel — Contexte projet

## Description
Site vitrine + boutique pour Mel, artiste peintre autodidacte.
URL : https://toutenmel.fr

## Stack technique
- **Framework** : Next.js 16 (App Router) + TypeScript
- **CSS** : Tailwind CSS v4 (config inline dans `@theme` de globals.css)
- **Base de données** : Supabase (projet `wufkuvudhlafattkaysk`, région eu-north-1)
- **Email** : Resend (domaine vérifié toutenmel.fr, clé API sur Vercel)
- **Déploiement** : Vercel (projet `toutenmel`, compte `13jisse-music`)
- **Repo** : github.com/13jisse-music/toutenmel (branche master)
- **DNS** : IONOS (zone `c794865d-1000-11f1-8880-0a5864440f43`)
- **Polices** : Caveat (headings/nav) + Inter (body)

## Connexion Supabase
- `DATABASE_URL` dans `.env.local` : Session Pooler via `aws-1-eu-north-1.pooler.supabase.com:5432`
- La connexion directe (`db.*.supabase.co`) ne marche PAS (IPv6 only, machine IPv4)
- Pour exécuter du SQL, utiliser le module `pg` avec `NODE_TLS_REJECT_UNAUTHORIZED=0`

## Tables Supabase
- `oeuvres` : id, title, description, category, dimensions, price, status, image_url, created_at, updated_at
- `commandes` : id, client_name, client_email, type, oeuvre_id, support, description, budget, status, created_at, updated_at
- `messages` : id, from_name, from_email, subject, message, read, created_at
- `factures` : id, numero, commande_id, client_name, client_email, items (JSONB), subtotal, tax, total, status, notes, created_at, updated_at
- RLS activé sur toutes les tables. Admin utilise `supabaseAdmin` (service_role key)

## Auth admin
- Email : toutenmel@gmail.com / Mot de passe : Yourbanlt300!
- Cookie `admin_token` via `response.cookies.set()` (pas `cookies()` de next/headers)
- Middleware protège toutes les routes `/admin/*` sauf login/logout
- ADMIN_PASSWORD PAS sur Vercel — fallback hardcodé dans `src/app/api/auth/route.ts`

## Pages publiques
- `/` — Page d'accueil (hero + mosaïque oeuvres + dernières créations + catégories + commandes perso)
- `/a-propos` — Biographie Mel
- `/contact` — Formulaire contact + infos
- `/boutique` — Catalogue oeuvres (prix, statut, bouton achat)
- `/galerie` — Galerie photos (filtres, lightbox)
- `/commandes` — Commandes personnalisées (formulaire + 4 étapes)
- `/suivi` — Suivi de commande client (email + n° commande, timeline visuelle)
- `/mentions-legales` — Mentions légales (dynamiques depuis BDD)
- `/cgv` — Conditions Générales de Vente (12 articles, médiateur CM2C)
- `/confidentialite` — Politique de confidentialité RGPD
- `/cookies` — Politique de cookies

## Pages admin
- `/admin` — Dashboard (stats + analytics prix par catégorie)
- `/admin/oeuvres` — CRUD oeuvres (filtres catégorie, tri prix/date)
- `/admin/commandes` — Gestion commandes (recherche client, filtres date, export CSV)
- `/admin/clients` — Vue clients agrégée depuis commandes (groupé par email)
- `/admin/messages` — Messages contact (lu/non lu)
- `/admin/factures` — Factures (CRUD, numérotation TEM-YYYY-NNN, vue imprimable)
- `/admin/legal` — Infos légales (formulaire nom, SIRET, adresse, médiateur, photo)

## Navigation
- Header : Accueil, À propos, Galerie, Boutique, Commandes, Contact
- Footer : 3 colonnes (Logo, Navigation 5 liens, Informations légales 4 liens)
- Header et Footer se cachent automatiquement sur `/admin/*`
- Admin sidebar (desktop) + bottom nav scrollable (mobile) : 7 onglets

## Emails (Resend)
- `sendContactNotification` : notification admin nouveau message
- `sendCommandeNotification` : notification admin nouvelle commande
- `sendCommandeConfirmation` : confirmation au client avec n° de suivi
- FROM : `Toutenmel <notifications@toutenmel.fr>`
- Resend lazy-init (`getResend()`) pour éviter erreur build sans clé API

## SEO (Phase 1 — terminée)
- `sitemap.ts` — sitemap dynamique
- `robots.ts` — bloque /admin/
- Open Graph + Twitter Cards sur toutes les pages publiques
- JSON-LD schema.org (Person/Artist) dans layout.tsx

## Fonctionnalités terminées (22 fév 2026)
1. SEO complet (sitemap, robots, OG, JSON-LD)
2. Suivi commande client (/suivi + email confirmation)
3. Gestion clients admin (/admin/clients)
4. Filtres améliorés (catégorie/tri oeuvres, recherche/dates/CSV commandes)
5. Analytics prix (dashboard: moyenne, min-max, ratio vendu par catégorie)
6. Factures (CRUD, numérotation auto, vue imprimable, mention TVA 293 B CGI)
7. Corrections mobile admin (header/footer masqués, stats compactes, menu scrollable)

## Fonctionnalités terminées (27 fév 2026)
8. Boutique/Galerie/Commandes activées dans la navigation
9. Page d'accueil complète (remplace coming soon) — oeuvres dynamiques
10. Pages légales : mentions légales, CGV, confidentialité, cookies
11. Admin /admin/legal : formulaire infos légales (dynamique → pages publiques)
12. Table `site_settings` : nom, statut, SIRET, adresse, médiateur CM2C
13. Footer 3 colonnes avec liens légaux

## Tables Supabase
- `oeuvres` : id, title, description, category, dimensions, price, status, image_url, created_at, updated_at
- `commandes` : id, client_name, client_email, type, oeuvre_id, support, description, budget, status, created_at, updated_at
- `messages` : id, from_name, from_email, subject, message, read, created_at
- `factures` : id, numero, commande_id, client_name, client_email, items (JSONB), subtotal, tax, total, status, notes, created_at, updated_at
- `site_settings` : id, legal_name, legal_status, siret, address, region, phone, mediator_name, mediator_url, profile_photo_url, updated_at

## Prochaines étapes possibles
- Intégrer Stripe pour le paiement en ligne
- Photo de profil Mel (upload dans Storage)
- Instagram (lier le compte quand prêt)
- Créer un compte Instagram @toutenmel et réactiver les liens
- Gestion de stock automatique
