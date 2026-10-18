import { AiOutlineCar, AiOutlineCheckCircle, AiOutlineEnvironment, AiOutlineHome, AiOutlineMessage } from "react-icons/ai";
import { DEFAULT_PRODUCTION_DAYS, WARRANTY_MONTHS } from "@/lib/seo";

interface SocialProofProps {
  partners?: string[];
  productionDays?: number;
}

const proofHighlights = [
  {
    title: "Atención por WhatsApp",
    description: "Resolvemos medidas, terminaciones y despacho antes de que tomes la decisión.",
    icon: AiOutlineMessage,
  },
  {
    title: "Fabricación propia",
    description: "Trabajamos muebles de madera con foco en estructura, terminación y uso diario.",
    icon: AiOutlineCheckCircle,
  },
  {
    title: "Taller en Chillán",
    description: "Equipo familiar con oficio en madera y atención directa desde la Región de Ñuble.",
    icon: AiOutlineHome,
  },
  {
    title: "Envío a todo Chile",
    description: "Coordinamos el despacho según comuna o región para que la compra llegue bien.",
    icon: AiOutlineCar,
  },
];

export default function SocialProof({
  partners,
  productionDays = DEFAULT_PRODUCTION_DAYS,
}: SocialProofProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
      <div className="rounded-3xl border border-line bg-canvas p-6 md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink">
              Compra con atención directa
            </h2>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-ink shadow-sm">
            <AiOutlineEnvironment className="text-wood" size={18} aria-hidden="true" />
            <span>Taller familiar en Chillán · Envíos a todo Chile</span>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {proofHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="rounded-2xl bg-white p-5 shadow-sm">
                <Icon size={24} className="text-wood" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-medium tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-line bg-white p-5 shadow-sm">
            <h3 className="font-display text-lg font-medium tracking-tight text-ink">Cotización clara</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Confirmamos medidas, terminación, plazo de fabricación y despacho antes de que pagues.
            </p>
          </article>
          <article className="rounded-2xl border border-line bg-white p-5 shadow-sm">
            <h3 className="font-display text-lg font-medium tracking-tight text-ink">Fabricación a pedido</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Cada mueble se fabrica en nuestro taller con los materiales y el acabado acordados. {productionDays} días hábiles en total.
            </p>
          </article>
          <article className="rounded-2xl border border-line bg-white p-5 shadow-sm">
            <h3 className="font-display text-lg font-medium tracking-tight text-ink">Garantía de {WARRANTY_MONTHS} meses</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Cubrimos defectos de fabricación durante {WARRANTY_MONTHS} meses desde la entrega del mueble.
            </p>
          </article>
        </div>

        {partners && partners.length > 0 && (
          <div className="mt-8 border-t border-line pt-6">
            <p className="text-sm font-medium text-ink">
              Menciones y partners
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {partners.map((partner) => (
                <span
                  key={partner}
                  className="rounded-full border border-line bg-white px-3 py-1.5 text-sm text-ink/80"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
