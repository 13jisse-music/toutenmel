import { supabaseAdmin } from "@/lib/supabase-admin";
import AdminLegalClient from "@/components/AdminLegalClient";

export const revalidate = 0;

export default async function AdminLegal() {
  const { data } = await supabaseAdmin
    .from("site_settings")
    .select("*")
    .eq("id", "main")
    .single();

  return <AdminLegalClient settings={data} />;
}
