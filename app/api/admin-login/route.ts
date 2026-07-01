import { NextRequest, NextResponse } from "next/server";

// La contraseña se define en .env.local como ADMIN_PASSWORD.
// Nunca subas esa contraseña real al repo: .env.local está en .gitignore por defecto en Next.js.

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (!correctPassword) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD no configurada en .env.local" },
      { status: 500 }
    );
  }

  if (password === correctPassword) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin_session", correctPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    });
    return res;
  }

  return NextResponse.json({ error: "Incorrecto" }, { status: 401 });
}
