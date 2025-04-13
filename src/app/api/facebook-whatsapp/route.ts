import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { product } = await request.json();

    // Obtenemos los datos del request para user_data
    // Aseguramos un fallback en caso de que alguna cabecera no esté presente
    const client_ip_address = request.headers.get("x-forwarded-for") || "0.0.0.0";
    const client_user_agent = request.headers.get("user-agent") || "unknown";

    // Puedes agregar fbp y fbc si los tenés disponibles (por ejemplo, pasados desde el cliente)
    // const fbp = request.headers.get("fbp") || "";
    // const fbc = request.headers.get("fbc") || "";

    // Armamos el payload para enviar a la Conversion API de Facebook
    const payload = {
      event_name: "MensajeWhatsApp", // Nombre de la conversión
      event_time: Math.floor(Date.now() / 1000), // Tiempo actual en segundos
      event_source_url: "", // Opcional: agrega la URL de origen si es relevante
      action_source: "website",
      user_data: {
        client_ip_address, 
        client_user_agent,
        // Si tienes estos parámetros, descomenta y agrega:
        // fbp, 
        // fbc,
      },
      custom_data: {
        product, // Información adicional (por ejemplo, nombre del producto)
      },
    };

    // Obtenemos el ID del Pixel y el Access Token de las variables de entorno
    const fbPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
    const accessToken = process.env.NEXT_FACEBOOK_ACCESS_TOKEN;

    if (!fbPixelId || !accessToken) {
      console.error("Falta configurar el Pixel ID o Access Token en las variables de entorno.");
      return NextResponse.error();
    }

    // Endpoint de la Facebook Conversion API (ajustar versión si es necesario)
    const fbEndpoint = `https://graph.facebook.com/v16.0/${fbPixelId}/events?access_token=${accessToken}`;

    console.log("Payload enviado a Facebook:", JSON.stringify({ data: [payload] }, null, 2));

    const response = await fetch(fbEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [payload] }),
    });

    const fbResponse = await response.json();
    console.log("Facebook API Response:", fbResponse);
    return NextResponse.json(fbResponse);
  } catch (error) {
    console.error("Error en la API de Facebook:", error);
    return NextResponse.error();
  }
}