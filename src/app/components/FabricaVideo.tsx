import Image from "next/image";
import Link from "next/link";
import { AiOutlineWhatsApp } from "react-icons/ai";
import Reveal from "@/app/components/Reveal";
import { buttonClasses } from "@/app/components/ui/Button";
import { SINCE_FOUNDING } from "@/lib/founding";
import { buildGeneralWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const storyWhatsAppUrl = buildWhatsAppUrl(
  buildGeneralWhatsAppMessage("sección Nuestra historia", [
    "Quiero conocer opciones de fabricación y cotización.",
  ]),
);

export default function FabricaVideo() {
  return (
    <section className="relative bg-canvas overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
            <Image
              src="/images/taller-idea-madera.webp"
              alt="Taller de Idea Madera en Chillán, con muebles de madera en fabricación"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          <Reveal as="div" className="px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20 space-y-6">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-ink tracking-tight text-balance">
              Bienvenido a Idea Madera
            </h2>

            <p className="text-sm md:text-base text-ink/80 leading-relaxed max-w-lg text-pretty">
              Somos una empresa familiar {SINCE_FOUNDING}, con pasión en el diseño y fabricación de muebles en
              madera. En el taller de Chillán el equipo trabaja cada pieza a medida, con dedicación, para
              crear muebles que duran.
            </p>

            <div className="pt-2">
              <Link
                href={storyWhatsAppUrl}
                className={buttonClasses({ variant: "primary", className: "group" })}
              >
                <span>Conócenos</span>
                <AiOutlineWhatsApp
                  size={20}
                  className="group-hover:scale-110 transition-transform duration-200"
                  style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
