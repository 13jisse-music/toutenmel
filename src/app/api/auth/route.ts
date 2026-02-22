import { NextRequest, NextResponse } from "next/server";

const ADMIN_EMAIL = "toutenmel@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Yourbanlt300!";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.email === ADMIN_EMAIL && body.password === ADMIN_PASSWORD) {
    const token = Buffer.from(`${ADMIN_EMAIL}:${Date.now()}`).toString("base64");

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}
