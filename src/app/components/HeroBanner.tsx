import Image from "next/image";
import WhatsAppCTA from "@/app/components/ui/WhatsAppCTA";
import { SINCE_FOUNDING_LABEL } from "@/lib/founding";
import { buildGeneralWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const heroWhatsAppUrl = buildWhatsAppUrl(
  buildGeneralWhatsAppMessage("inicio de Idea Madera", [
    "Estoy revisando el catálogo y quiero orientación para elegir un producto.",
  ])
);

function HeroBanner() {
  return (
    <section id="inicio-hero" className="relative bg-ink overflow-hidden min-h-[70vh] md:min-h-[90vh]">
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.webp"
          alt="Muebles de madera artesanales fabricados por Idea Madera en Chillán, Chile"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="hero-bg-image object-cover object-center"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      <div className="relative z-10 flex flex-col items-start justify-end h-full min-h-[70vh] md:min-h-[90vh] px-5 pb-12 md:px-12 md:pb-16 lg:px-20 lg:pb-20">
        <div className="max-w-2xl space-y-4 md:space-y-6">
          <p className="hero-enter hero-enter-1 text-sm md:text-base font-medium text-wood-light">
            {SINCE_FOUNDING_LABEL} · Taller familiar en Chillán
          </p>

          <h1 className="font-display hero-enter hero-enter-2 text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-white tracking-tight text-balance font-semibold">
            Muebles de madera en Chillán
          </h1>

          <p className="hero-enter hero-enter-3 text-sm md:text-base lg:text-lg text-canvas/80 leading-relaxed max-w-xl text-pretty">
            Idea Madera fabrica mesas, sillas y piezas a medida en Chillán, con envío a todo Chile.
            Cotiza por WhatsApp o revisa el catálogo.
          </p>

          <div className="hero-enter hero-enter-4 pt-4 md:pt-6">
            <WhatsAppCTA
              href={heroWhatsAppUrl}
              label="Cotizar por WhatsApp"
              placement="home_hero"
              tone="dark"
              productTitle="Inicio"
            />
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 opacity-70"
        aria-hidden="true"
      >
        <div className="w-6 h-10 border border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="scroll-hint-dot w-1 h-2 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
