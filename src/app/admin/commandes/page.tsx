import { supabaseAdmin } from "@/lib/supabase-admin";
import AdminCommandesClient from "@/components/AdminCommandesClient";

export const revalidate = 0;

export default async function AdminCommandes() {
  const { data } = await supabaseAdmin
    .from("commandes")
    .select("*")
    .order("created_at", { ascending: false });

  return <AdminCommandesClient commandes={data || []} />;
}
