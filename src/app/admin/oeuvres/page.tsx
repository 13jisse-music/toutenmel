import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Oeuvre } from "@/lib/types";
import AdminOeuvresClient from "@/components/AdminOeuvresClient";

export const revalidate = 0;

export default async function AdminOeuvres() {
  const { data } = await supabaseAdmin
    .from("oeuvres")
    .select("*")
    .order("created_at", { ascending: false });

  return <AdminOeuvresClient oeuvres={(data as Oeuvre[]) || []} />;
}
