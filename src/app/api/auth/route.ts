import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_EMAIL = "toutenmel@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Yourbanlt300!";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.email === ADMIN_EMAIL && body.password === ADMIN_PASSWORD) {
    const token = Buffer.from(`${ADMIN_EMAIL}:${Date.now()}`).toString("base64");

    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: "/",
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  return NextResponse.json({ success: true });
}
