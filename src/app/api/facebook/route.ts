import { NextRequest, NextResponse } from "next/server";

const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID!;
const ACCESS_TOKEN = process.env.NEXT_FACEBOOK_ACCESS_TOKEN!;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    event_name,
    event_source_url,
    fbp,
    fbc,
    value,
    currency = "CLP",
    content_name,   // Nuevo
    content_ids,    // Nuevo: se espera un array de strings
    content_type,   // Nuevo
  } = body;

  const event_time = Math.floor(Date.now() / 1000);

  const user_data: any = {
    client_ip_address: req.headers.get("x-forwarded-for"),
    client_user_agent: req.headers.get("user-agent"),
  };

  if (fbp) user_data.fbp = fbp;
  if (fbc) user_data.fbc = fbc;

  const payload = {
    data: [
      {
        event_name,
        event_time,
        event_source_url,
        action_source: "website",
        user_data,
        custom_data: {
          value,
          currency,
          content_name,   // Se incluye el nombre del producto
          content_ids,    // Se incluye el ID(s) del producto
          content_type,   // Usualmente "product"
        },
      },
    ],
    access_token: ACCESS_TOKEN,
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      console.error("Error CAPI:", data);
      return NextResponse.json({ success: false, error: data }, { status: 500 });
    }
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error CAPI:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}