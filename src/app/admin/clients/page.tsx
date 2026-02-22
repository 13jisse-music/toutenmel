import { supabaseAdmin } from "@/lib/supabase-admin";
import AdminClientsClient from "@/components/AdminClientsClient";

export const revalidate = 0;

interface CommandeRow {
  client_name: string;
  client_email: string;
  status: string;
  created_at: string;
}

export default async function AdminClients() {
  const { data } = await supabaseAdmin
    .from("commandes")
    .select("client_name, client_email, status, created_at")
    .order("created_at", { ascending: false });

  const rows = (data as CommandeRow[]) || [];

  // Agrégation par email
  const map = new Map<
    string,
    { name: string; email: string; count: number; lastDate: string; lastStatus: string }
  >();

  for (const row of rows) {
    const existing = map.get(row.client_email);
    if (existing) {
      existing.count++;
    } else {
      map.set(row.client_email, {
        name: row.client_name,
        email: row.client_email,
        count: 1,
        lastDate: row.created_at,
        lastStatus: row.status,
      });
    }
  }

  const clients = Array.from(map.values());

  return <AdminClientsClient clients={clients} />;
}
