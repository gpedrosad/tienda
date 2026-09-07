"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppUrl, trackWhatsAppClick } from "@/lib/whatsapp";
import { landingPath } from "./content";

const defaultMessage = "Hola Idea Madera, quiero cotizar una tiny house en DLT. Me gustaría revisar diseño, precio y plazos para mi proyecto.";
const track = (placement: "inline" | "banner") => {
  void trackWhatsAppClick({ productTitle: "Tiny house en DLT", productId: "tiny-house-dlt", placement });
};

export function QuoteButton({ children = "Cotizar mi tiny house" }: { children?: React.ReactNode }) {
  return <a className="dlt-button" href={buildWhatsAppUrl(defaultMessage)} target="_blank" rel="noopener noreferrer" onClick={() => track("inline")}><FaWhatsapp aria-hidden="true" size={21} />{children}<span aria-hidden="true">↗</span></a>;
}

export default function Quote() {
  const [commune, setCommune] = useState("");
  const [area, setArea] = useState("");
  const [use, setUse] = useState("Refugio de descanso");
  const message = [defaultMessage, `Comuna: ${commune.trim() || "Por definir"}`, `Superficie aproximada: ${area.trim() ? `${area.trim()} m²` : "Por definir"}`, `Uso: ${use}`, `Referencia: https://www.ideamadera.cl${landingPath}`].join("\n");

  return (
    <div className="dlt-quote-fields">
      <div className="dlt-field"><label htmlFor="dlt-commune">Comuna del proyecto</label><input id="dlt-commune" autoComplete="address-level2" maxLength={100} placeholder="Ej. Pinto, Ñuble" value={commune} onChange={(e) => setCommune(e.target.value)} /></div>
      <div className="dlt-field"><label htmlFor="dlt-area">Superficie aproximada (m²)</label><input id="dlt-area" inputMode="decimal" maxLength={20} placeholder="Ej. 30" value={area} onChange={(e) => setArea(e.target.value)} /></div>
      <div className="dlt-field dlt-field-wide"><label htmlFor="dlt-use">¿Cómo quieres usarla?</label><select id="dlt-use" value={use} onChange={(e) => setUse(e.target.value)}><option>Refugio de descanso</option><option>Vivienda habitual</option><option>Alojamiento turístico</option><option>Otro proyecto</option></select></div>
      <a className="dlt-button dlt-field-wide" href={buildWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer" onClick={() => track("banner")}><FaWhatsapp aria-hidden="true" size={22} />Cotizar por WhatsApp<span aria-hidden="true">↗</span></a>
      <p className="dlt-field-wide dlt-form-note">Todos los campos son opcionales. Se abrirá WhatsApp con tu consulta preparada para que la revises y envíes.</p>
    </div>
  );
}
