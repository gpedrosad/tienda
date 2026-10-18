import Image from "next/image";
import { AiOutlineCalendar, AiOutlineSafety, AiOutlineTool } from "react-icons/ai";
import { SINCE_FOUNDING } from "@/lib/founding";
import { DEFAULT_PRODUCTION_DAYS, WARRANTY_MONTHS } from "@/lib/seo";

interface SocialProofProps {
  productionDays?: number;
}

/** Quién fabrica el mueble: lo único que la ficha no dice en otro bloque. */
export default function SocialProof({ productionDays = DEFAULT_PRODUCTION_DAYS }: SocialProofProps) {
  const facts = [
    { icon: AiOutlineCalendar, label: `Taller familiar ${SINCE_FOUNDING}` },
    { icon: AiOutlineTool, label: `Fabricación a pedido · ${productionDays} días hábiles` },
    { icon: AiOutlineSafety, label: `Garantía de ${WARRANTY_MONTHS} meses` },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <div className="grid overflow-hidden rounded-3xl border border-line bg-canvas md:grid-cols-[5fr_7fr]">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[320px]">
          <Image
            src="/images/taller-idea-madera.webp"
            alt="Mesa de madera recién terminada en el taller de Idea Madera en Chillán"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            loading="lazy"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center p-6 md:p-10">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">Quién lo fabrica</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink text-balance">
            Lo fabricamos en nuestro taller de Chillán
          </h2>
          <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-ink-muted">
            Cada mueble se hace a pedido en nuestro taller familiar, con la madera y la terminación que acordamos contigo
            por WhatsApp.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {facts.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-2.5 text-sm leading-snug text-ink">
                <Icon size={20} className="mt-px shrink-0 text-wood" aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
