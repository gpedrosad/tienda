"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AiOutlineWhatsApp } from 'react-icons/ai';

const FabricaVideo = React.memo(() => {
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => {
      if (videoContainerRef.current) {
        observer.unobserve(videoContainerRef.current);
      }
    };
  }, []);

  return (
    <section className="relative bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
          {/* Sección del video */}
          <div ref={videoContainerRef} className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
            {isVisible ? (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src="https://cdn.shopify.com/videos/c/o/v/96cf6f2a33c149e3b1d124adf6ae4c90.mp4"
                autoPlay
                muted
                loop
                playsInline
                poster="/poster.jpg"
              />
            ) : (
              <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
            )}
          </div>

          {/* Sección del texto */}
          <div className="px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20 space-y-6">
            {/* Subtítulo */}
            <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-neutral-600 font-light">
              Nuestra historia
            </p>
            
            {/* Título */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-neutral-900 tracking-tight">
              Bienvenido a
              <br />
              <span className="font-normal">Idea Madera</span>
            </h2>
            
            {/* Descripción */}
            <p className="text-sm md:text-base text-neutral-700 font-light leading-relaxed max-w-lg">
              Somos una empresa familiar con 31 años de pasión en el diseño y fabricación de muebles en madera. 
              En este video verás a nuestro talentoso equipo en acción, trabajando con dedicación para crear 
              piezas únicas que cuentan nuestra historia.
            </p>
            
            {/* CTA */}
            <div className="pt-2">
              <Link
                href="https://api.whatsapp.com/send?phone=56995497838&text=Hola, vengo de la página web"
                className="inline-flex items-center gap-2.5 bg-neutral-900 text-white px-7 py-3.5 md:px-8 md:py-4 text-sm md:text-base font-medium tracking-wide hover:bg-neutral-800 transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                <span>Conócenos</span>
                <AiOutlineWhatsApp 
                  size={20} 
                  className="group-hover:scale-110 transition-transform duration-300" 
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

FabricaVideo.displayName = "FabricaVideo";

export default FabricaVideo;