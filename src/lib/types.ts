export interface Oeuvre {
  id: string;
  title: string;
  description: string | null;
  category: "Toiles" | "Fluide Art" | "Aérographe" | "Customisations";
  dimensions: string | null;
  price: number;
  status: "disponible" | "vendu" | "sur commande";
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Commande {
  id: string;
  client_name: string;
  client_email: string;
  type: "achat" | "personnalisee";
  oeuvre_id: string | null;
  support: string | null;
  description: string | null;
  budget: string | null;
  status: "En attente" | "Devis envoyé" | "Payé" | "En cours" | "Expédié" | "Terminé";
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export const COMMANDE_STATUSES = [
  "En attente",
  "Devis envoyé",
  "Payé",
  "En cours",
  "Expédié",
  "Terminé",
] as const;
