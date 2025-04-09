import { NextRequest, NextResponse } from "next/server";

// Declaramos una interfaz para el cuerpo de la petición (opcional, pero recomendada)
interface CapiRequestBody {
  event_name: string;
  event_source_url: string;
  fbp?: string;
  fbc?: string;
  value?: number;
  currency?: string;
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
}

// Interfaz para user_data que se enviará a Facebook
interface UserData {
  client_ip_address: string | null;
  client_user_agent: string | null;
  fbp?: string;
  fbc?: string;
}

const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID!;
const ACCESS_TOKEN = process.env.NEXT_FACEBOOK_ACCESS_TOKEN!;

export async function POST(req: NextRequest) {
  const body = (await req.json()) as CapiRequestBody;

  const {
    event_name,
    event_source_url,
    fbp,
    fbc,
    value,
    currency = "CLP",
    content_name,
    content_ids,
    content_type,
  } = body;

  const event_time = Math.floor(Date.now() / 1000);

  // Usamos la interfaz UserData en lugar de any
  const user_data: UserData = {
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
          content_name,
          content_ids,
          content_type,
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error CAPI:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    console.error("Error CAPI:", error);
    return NextResponse.json({ success: false, error: "Unknown error" }, { status: 500 });
  }
}