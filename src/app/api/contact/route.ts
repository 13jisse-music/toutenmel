import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendContactNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.name || !body.email || !body.subject || !body.message) {
    return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
  }

  const { error } = await supabase.from("messages").insert({
    from_name: body.name,
    from_email: body.email,
    subject: body.subject,
    message: body.message,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Envoyer notification email (ne bloque pas la réponse)
  sendContactNotification({
    name: body.name,
    email: body.email,
    message: body.message,
  });

  return NextResponse.json({ success: true });
}
