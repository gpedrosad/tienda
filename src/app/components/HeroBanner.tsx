import Image from "next/image";
import Link from "next/link";
import { AiOutlineWhatsApp } from "react-icons/ai";

function HeroBanner() {
  return (
    <section className="relative bg-neutral-900 overflow-hidden min-h-[85vh] md:min-h-[90vh]">
      {/* Imagen de fondo con overlay gradiente sobrio */}
      <div className="absolute inset-0">
        <Image
          src="https://cdn.shopify.com/s/files/1/0401/9994/6389/files/IMG_20201102_112309.jpg?v=1614299603"
          alt="Fondo decorativo"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        {/* Overlay gradiente elegante y sobrio */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      {/* Contenido principal - Mobile First */}
      <div className="relative z-10 flex flex-col items-start justify-end h-full min-h-[85vh] md:min-h-[90vh] px-5 pb-12 md:px-12 md:pb-16 lg:px-20 lg:pb-20">
        <div className="max-w-2xl space-y-4 md:space-y-6">
          {/* Subtítulo minimalista */}
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-neutral-300 font-light">
            Artesanía en madera
          </p>
          
          {/* Título principal - Jerarquía visual clara */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight text-white tracking-tight">
            Diseño elegante,
            <br />
            <span className="font-normal">calidad excepcional</span>
          </h1>
          
          {/* Descripción concisa */}
          <p className="text-sm md:text-base lg:text-lg text-neutral-200 font-light leading-relaxed max-w-xl">
            Productos exclusivos elaborados con dedicación y precisión para espacios que inspiran.
          </p>
          
          {/* CTA minimalista y elegante */}
          <div className="pt-4 md:pt-6">
            <Link
              href="https://api.whatsapp.com/send?phone=56995497838&text=Hola, quiero más información sobre sus productos"
              className="inline-flex items-center gap-2.5 bg-white text-neutral-900 px-7 py-3.5 md:px-8 md:py-4 text-sm md:text-base font-medium tracking-wide hover:bg-neutral-100 transition-all duration-300 group border border-white/20 shadow-lg hover:shadow-xl"
            >
              <span>Contáctanos</span>
              <AiOutlineWhatsApp 
                size={20} 
                className="group-hover:scale-110 transition-transform duration-300" 
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Indicador de scroll sutil (opcional) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <div className="w-6 h-10 border border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;