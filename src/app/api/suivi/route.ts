import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  try {
    const { email, orderId } = await request.json();

    if (!email || !orderId) {
      return NextResponse.json({ error: "Email et numéro de commande requis" }, { status: 400 });
    }

    const trimmedId = orderId.trim().toLowerCase();
    const trimmedEmail = email.trim().toLowerCase();

    const { data, error } = await supabaseAdmin
      .from("commandes")
      .select("id, type, status, created_at, updated_at")
      .eq("client_email", trimmedEmail)
      .ilike("id", `%${trimmedId}`);

    if (error || !data || data.length === 0) {
      return NextResponse.json({ error: "Commande introuvable. Vérifiez votre email et numéro de commande." }, { status: 404 });
    }

    return NextResponse.json({ commande: data[0] });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la recherche" }, { status: 500 });
  }
}
