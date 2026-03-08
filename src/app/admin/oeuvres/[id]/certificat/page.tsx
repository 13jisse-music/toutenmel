import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Oeuvre } from "@/lib/types";
import CertificatClient from "@/components/CertificatClient";

export const revalidate = 0;

export default async function CertificatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabaseAdmin
    .from("oeuvres")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) {
    return <p className="p-10 text-center text-warm-gray">Oeuvre introuvable</p>;
  }

  return <CertificatClient oeuvre={data as Oeuvre} />;
}
