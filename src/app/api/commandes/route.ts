import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendCommandeNotification, sendCommandeConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.name || !body.email || !body.description) {
    return NextResponse.json({ error: "Nom, email et description sont requis" }, { status: 400 });
  }

  const { data, error } = await supabase.from("commandes").insert({
    client_name: body.name,
    client_email: body.email,
    type: "personnalisee",
    support: body.support || null,
    description: body.description,
    budget: body.budget || null,
  }).select("id").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Notification admin (ne bloque pas la réponse)
  sendCommandeNotification({
    name: body.name,
    email: body.email,
    phone: body.phone,
    description: body.description,
    budget: body.budget,
  });

  // Confirmation client avec n° de suivi
  if (data?.id) {
    sendCommandeConfirmation({
      name: body.name,
      email: body.email,
      commandeId: data.id,
    });
  }

  return NextResponse.json({ success: true });
}
