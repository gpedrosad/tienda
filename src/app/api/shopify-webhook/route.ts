// /app/api/shopify-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const hmacHeader = req.headers.get("x-shopify-hmac-sha256") || "";

  const hash = crypto
    .createHmac("sha256", SHOPIFY_WEBHOOK_SECRET)
    .update(rawBody, "utf8")
    .digest("base64");

  if (hash !== hmacHeader) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const order = JSON.parse(rawBody);
  console.log("Nueva compra:", order);

  // Acá podrías enviar el evento a Meta Conversion API u otros

  return new NextResponse("OK");
}