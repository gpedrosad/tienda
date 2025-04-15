// En pages/index.tsx o en el componente HeroBanner.tsx
import Image from "next/image";
import Link from "next/link";
import { AiOutlineWhatsApp } from "react-icons/ai";


function HeroBanner() {
  return (
    <section className="relative bg-gray-100 overflow-hidden h-[50vh] md:h-[70vh]">
      {/* Contenedor de la imagen de fondo */}
      <div className="absolute inset-0">
        <Image
          src="https://cdn.shopify.com/s/files/1/0401/9994/6389/files/IMG_20201102_112309.jpg?v=1614299603"
          alt="Fondo decorativo"
          fill
          className="object-cover"
        />
        {/* Overlay oscuro para mejorar la legibilidad */}
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>
      {/* Contenedor del contenido con posición relativa y z-index para que aparezca sobre la imagen */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl font-bold mb-4 text-white">
          Bienvenido a Idea Madera
        </h1>
        <p className="text-lg text-white mb-8">
          Descubre productos exclusivos con diseño elegante y calidad excepcional.
        </p>
        <Link
  href="https://api.whatsapp.com/send?phone=56995497838&text=Hola, quiero más información sobre sus productos"
  className="inline-block bg-white text-gray-800 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2"
>
  Escríbenos
<AiOutlineWhatsApp size={16} />
</Link>

      </div>
    </section>
  );
}

export default HeroBanner;