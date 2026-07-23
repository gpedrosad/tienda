import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Limpia parámetros de paginación/legacy que generan URLs indexables ruidosas.
 * Canonical de colecciones ya apunta a la ruta limpia; este redirect acelera la consolidación.
 */
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname.startsWith("/collections/") && searchParams.has("page")) {
    const page = searchParams.get("page");
    if (!page || page === "1") {
      const cleanUrl = request.nextUrl.clone();
      cleanUrl.searchParams.delete("page");
      return NextResponse.redirect(cleanUrl, 308);
    }
  }

  // Parámetros de recomendaciones Shopify que aún aparecen en GSC
  const shopifyParams = [
    "pr_prod_strat",
    "pr_rec_id",
    "pr_rec_pid",
    "pr_ref_pid",
    "pr_seq",
  ];
  if (pathname.startsWith("/products/") && shopifyParams.some((param) => searchParams.has(param))) {
    const cleanUrl = request.nextUrl.clone();
    for (const param of shopifyParams) {
      cleanUrl.searchParams.delete(param);
    }
    return NextResponse.redirect(cleanUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/collections/:path*", "/products/:path*"],
};
