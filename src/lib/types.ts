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
