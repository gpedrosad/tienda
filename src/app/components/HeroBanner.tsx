import Image from "next/image";
import Link from "next/link";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { buildGeneralWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const heroWhatsAppUrl = buildWhatsAppUrl(
  buildGeneralWhatsAppMessage("inicio de Idea Madera", [
    "Estoy revisando el catálogo y quiero orientación para elegir un producto.",
  ])
);

function HeroBanner() {
  return (
    <section className="relative bg-neutral-900 overflow-hidden min-h-[85vh] md:min-h-[90vh]">
      <div className="absolute inset-0">
        <Image
          src="https://cdn.shopify.com/s/files/1/0401/9994/6389/files/IMG_20201102_112309.jpg?v=1614299603"
          alt="Fondo decorativo"
          fill
          priority
          className="hero-bg-image object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      <div className="relative z-10 flex flex-col items-start justify-end h-full min-h-[85vh] md:min-h-[90vh] px-5 pb-12 md:px-12 md:pb-16 lg:px-20 lg:pb-20">
        <div className="max-w-2xl space-y-4 md:space-y-6">
          <p className="hero-enter hero-enter-1 text-xs md:text-sm tracking-[0.2em] uppercase text-neutral-300 font-light">
            Artesanía en madera
          </p>

          <h1 className="hero-enter hero-enter-2 text-3xl md:text-5xl lg:text-6xl font-light leading-tight text-white tracking-[-0.03em] text-balance">
            Diseño elegante,
            <br />
            <span className="font-normal">calidad excepcional</span>
          </h1>

          <p className="hero-enter hero-enter-3 text-sm md:text-base lg:text-lg text-neutral-200 font-light leading-relaxed max-w-xl text-pretty">
            Productos exclusivos elaborados con dedicación y precisión para espacios que inspiran.
          </p>

          <div className="hero-enter hero-enter-4 pt-4 md:pt-6">
            <Link
              href={heroWhatsAppUrl}
              className="inline-flex items-center gap-2.5 bg-white text-neutral-900 px-7 py-3.5 md:px-8 md:py-4 text-sm md:text-base font-medium tracking-wide hover:bg-neutral-100 transition-colors duration-200 group border border-white/20 active:scale-[0.98]"
              style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
            >
              <span>Contáctanos</span>
              <AiOutlineWhatsApp
                size={20}
                className="group-hover:scale-110 transition-transform duration-200"
                style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
              />
            </Link>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 opacity-70"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">Explorar</span>
        <div className="w-6 h-10 border border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="scroll-hint-dot w-1 h-2 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
