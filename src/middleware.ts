// src/middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LANGS = ["en", "pt", "es"] as const;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignora estáticos e API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Falta locale na URL? -> detecta e redireciona
  const missingLocale = SUPPORTED_LANGS.every(
    (l) => !pathname.startsWith(`/${l}`)
  );
  if (missingLocale) {
    const preferred =
      req.headers.get("accept-language")?.split(",")[0].split("-")[0] ?? "en";
    const lang = (SUPPORTED_LANGS as readonly string[]).includes(preferred)
      ? preferred
      : "en";

    const url = new URL(`/${lang}${pathname}`, req.url);
    const res = NextResponse.redirect(url);
    res.cookies.set("lang", lang, { path: "/" });
    return res;
  }

  // Já tem /:lang -> mantém cookie em dia
  const current = pathname.split("/")[1] as (typeof SUPPORTED_LANGS)[number];
  const res = NextResponse.next();
  res.cookies.set("lang", current, { path: "/" });
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|assets).*)"],
};
