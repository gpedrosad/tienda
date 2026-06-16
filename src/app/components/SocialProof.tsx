import { AiOutlineCheckCircle, AiOutlineHome, AiOutlineMessage, AiOutlineStar } from "react-icons/ai";
import {
  PRODUCT_AGGREGATE_RATING,
  productReviewSnippets,
} from "@/lib/seo";

interface SocialProofProps {
  partners?: string[];
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
    icon: AiOutlineStar,
  },
];

export default function SocialProof({ partners }: SocialProofProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
      <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
              Confianza
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
              Compra con atención directa
            </h2>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-neutral-800 shadow-sm">
            <span className="text-[#25D366]">★</span>
            <span>
              {PRODUCT_AGGREGATE_RATING.ratingValue} · {PRODUCT_AGGREGATE_RATING.reviewCount}+ clientes en Chile
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {proofHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="rounded-2xl bg-white p-5 shadow-sm">
                <Icon size={24} className="text-neutral-900" />
                <h3 className="mt-4 text-lg font-light tracking-tight text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {productReviewSnippets.map((review) => (
            <figure
              key={review.authorName}
              className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-1 text-[#25D366]" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index}>★</span>
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-neutral-700">
                “{review.reviewBody}”
              </blockquote>
              <figcaption className="mt-3 text-xs text-neutral-500">{review.authorName}</figcaption>
            </figure>
          ))}
        </div>

        {partners && partners.length > 0 && (
          <div className="mt-8 border-t border-neutral-200 pt-6">
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
              Menciones y partners
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {partners.map((partner) => (
                <span
                  key={partner}
                  className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700"
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
