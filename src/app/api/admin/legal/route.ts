import { supabaseAdmin } from "@/lib/supabase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("site_settings")
    .select("*")
    .eq("id", "main")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const { data, error } = await supabaseAdmin
    .from("site_settings")
    .update({
      legal_name: body.legal_name,
      legal_status: body.legal_status,
      siret: body.siret,
      address: body.address,
      region: body.region,
      phone: body.phone,
      mediator_name: body.mediator_name,
      mediator_url: body.mediator_url,
      profile_photo_url: body.profile_photo_url,
      hero_title: body.hero_title,
      hero_subtitle: body.hero_subtitle,
      hero_photo_url: body.hero_photo_url,
      about_subtitle: body.about_subtitle,
      about_text: body.about_text,
      about_closing: body.about_closing,
      updated_at: new Date().toISOString(),
    })
    .eq("id", "main")
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
