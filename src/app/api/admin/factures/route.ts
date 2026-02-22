import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// GET - List all factures
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("factures")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(data);
}

// POST - Create a new facture
export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.client_name || !body.client_email || !body.items) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  // Generate numero: TEM-YYYY-NNN
  const year = new Date().getFullYear();
  const { count } = await supabaseAdmin
    .from("factures")
    .select("*", { count: "exact", head: true })
    .like("numero", `TEM-${year}-%`);

  const num = String((count || 0) + 1).padStart(3, "0");
  const numero = `TEM-${year}-${num}`;

  const { data, error } = await supabaseAdmin
    .from("factures")
    .insert({
      numero,
      commande_id: body.commande_id || null,
      client_name: body.client_name,
      client_email: body.client_email,
      items: body.items,
      subtotal: body.subtotal || 0,
      tax: body.tax || 0,
      total: body.total || 0,
      status: body.status || "brouillon",
      notes: body.notes || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 201 });
}
