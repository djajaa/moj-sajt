import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Vercel već servira sve preko HTTPS-a (x-forwarded-proto stiže kao "https"
// prije nego zahtjev dođe ovdje), pa je ovo no-op na Vercelu. Ako se sajt
// ikad hostuje iza drugog proxy-ja koji propušta plain HTTP, ovo ga presrijeće.
export function middleware(request: NextRequest) {
  const proto = request.headers.get("x-forwarded-proto");
  const host = request.headers.get("host") ?? "";
  const isLocal = host.startsWith("localhost") || host.startsWith("127.0.0.1");

  if (proto === "http" && !isLocal) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Statički fajlovi (slike, ikonice...) moraju biti izuzeti — next/image
  // interno re-fetch-uje originalnu sliku sa te iste putanje da bi je
  // optimizovao, i taj fetch NE smije proći kroz middleware, inače
  // optimizacija otkazuje ("not a valid image").
  matcher: "/((?!_next/static|_next/image|favicon\\.ico|icon|apple-icon|opengraph-image|images/|.*\\.(?:png|jpe?g|gif|webp|svg|ico)$).*)",
};
