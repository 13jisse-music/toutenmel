import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = await supabaseAdmin.from("oeuvres").insert({
    title: body.title,
    description: body.description || null,
    category: body.category,
    dimensions: body.dimensions || null,
    price: body.price,
    status: body.status || "disponible",
    image_url: body.image_url || null,
  }).select().single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
