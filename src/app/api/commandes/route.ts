import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.name || !body.email || !body.description) {
    return NextResponse.json({ error: "Nom, email et description sont requis" }, { status: 400 });
  }

  const { error } = await supabase.from("commandes").insert({
    client_name: body.name,
    client_email: body.email,
    type: "personnalisee",
    support: body.support || null,
    description: body.description,
    budget: body.budget || null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
