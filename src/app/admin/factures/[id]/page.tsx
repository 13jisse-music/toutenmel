import { supabaseAdmin } from "@/lib/supabase-admin";
import FactureViewClient from "@/components/FactureViewClient";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function FactureDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("factures")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  return <FactureViewClient facture={data} />;
}
