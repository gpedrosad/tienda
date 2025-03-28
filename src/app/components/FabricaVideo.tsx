"use client";
import React, { useEffect, useRef, useState } from 'react';

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
      { threshold: 0.5 }
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
    <section className="w-full m-0 p-0">
      <div className="flex flex-col md:flex-row w-full m-0 p-0">
        {/* Sección del video */}
        <div ref={videoContainerRef} className="w-full md:w-1/2 m-0 p-0">
          {isVisible ? (
            <video
              className="block w-full h-auto m-0 p-0"
              src="https://cdn.shopify.com/videos/c/o/v/96cf6f2a33c149e3b1d124adf6ae4c90.mp4"
              autoPlay
              muted
              loop
              playsInline
              poster="/poster.jpg"
            />
          ) : (
            <img
              src="/poster.jpg"
              alt="Poster de Idea Madera"
              className="block w-full h-auto m-0 p-0"
            />
          )}
        </div>

        {/* Sección del texto */}
        <div className="w-full md:w-1/2 m-0 p-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bienvenido a Idea Madera
          </h2>
          <p className="mb-6 leading-relaxed">
            Somos una empresa familiar con 31 años de pasión en el diseño y fabricación de muebles en madera. En este video verás a nuestro talentoso equipo en acción en nuestra fábrica, trabajando con dedicación para crear piezas únicas que cuentan nuestra historia. ¡Queremos compartir contigo el corazón de nuestro trabajo!
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=56995497838&text=Hola%2C%20vengo%20de%20la%20pagina%20web"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-black text-white px-6 py-3 rounded hover:opacity-80 transition-opacity">
              Conócenos
            </button>
          </a>
        </div>
      </div>
    </section>
  );
});

FabricaVideo.displayName = "FabricaVideo";

export default FabricaVideo;