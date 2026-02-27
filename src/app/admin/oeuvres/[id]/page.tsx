import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Oeuvre } from "@/lib/types";
import EditOeuvreClient from "@/components/EditOeuvreClient";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditOeuvre({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data } = await supabaseAdmin
    .from("oeuvres")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  return <EditOeuvreClient oeuvre={data as Oeuvre} />;
}
