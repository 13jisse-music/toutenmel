import { supabaseAdmin } from "@/lib/supabase-admin";
import AdminFacturesClient from "@/components/AdminFacturesClient";

export const revalidate = 0;

export default async function AdminFactures() {
  const { data } = await supabaseAdmin
    .from("factures")
    .select("*")
    .order("created_at", { ascending: false });

  return <AdminFacturesClient factures={data || []} />;
}
