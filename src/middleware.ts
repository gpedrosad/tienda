import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_HOST = "www.ideamadera.cl";
const PREVIEW_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0"]);

function isPreviewHost(hostname: string) {
  if (PREVIEW_HOSTS.has(hostname)) return true;
  if (hostname.endsWith(".localhost")) return true;
  if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}(?::[0-9]+)?$/.test(hostname)) return true;
  if (hostname.endsWith(".vercel.app")) return true;
  return false;
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("x-forwarded-host") ?? request.nextUrl.hostname;
  const hostname = host.split(":")[0]?.toLowerCase() ?? "";

  if (!hostname || isPreviewHost(hostname)) {
    return NextResponse.next();
  }

  if (hostname !== CANONICAL_HOST) {
    url.host = CANONICAL_HOST;
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  if (request.nextUrl.protocol !== "https:") {
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|api/|favicon.ico|robots.txt|sitemap.xml).*)"],
};
