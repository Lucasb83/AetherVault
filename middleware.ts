import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isProtectedPage = req.nextUrl.pathname.startsWith("/admin/editor");
  const isProtectedApi =
    req.nextUrl.pathname.startsWith("/api/posts") && req.method !== "GET";

  if (isProtectedPage || isProtectedApi) {
    const session = req.cookies.get("admin_session")?.value;
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (!session || session !== correctPassword) {
      if (isProtectedApi) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/editor/:path*", "/api/posts/:path*"],
};
