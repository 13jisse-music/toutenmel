-- =============================================
-- SCHEMA TOUTENMEL - Base de données Supabase
-- =============================================

-- Table des oeuvres
CREATE TABLE oeuvres (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('Toiles', 'Fluide Art', 'Aérographe', 'Customisations')),
  dimensions TEXT,
  price INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'disponible' CHECK (status IN ('disponible', 'vendu', 'sur commande')),
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des commandes
CREATE TABLE commandes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'personnalisee' CHECK (type IN ('achat', 'personnalisee')),
  oeuvre_id UUID REFERENCES oeuvres(id),
  support TEXT,
  description TEXT,
  budget TEXT,
  status TEXT NOT NULL DEFAULT 'En attente' CHECK (status IN ('En attente', 'Devis envoyé', 'Payé', 'En cours', 'Expédié', 'Terminé')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des messages (formulaire contact)
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_name TEXT NOT NULL,
  from_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- RLS POLICIES (sécurité)
-- =============================================

-- Oeuvres : lecture publique, écriture admin seulement
ALTER TABLE oeuvres ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Oeuvres visibles par tous" ON oeuvres FOR SELECT USING (true);

-- Commandes : insertion publique (formulaire), lecture admin
ALTER TABLE commandes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Créer une commande" ON commandes FOR INSERT WITH CHECK (true);

-- Messages : insertion publique (formulaire contact), lecture admin
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Envoyer un message" ON messages FOR INSERT WITH CHECK (true);

-- =============================================
-- Storage bucket pour les photos
-- =============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('oeuvres', 'oeuvres', true);

-- Politique : lecture publique des images
CREATE POLICY "Images publiques" ON storage.objects FOR SELECT USING (bucket_id = 'oeuvres');
