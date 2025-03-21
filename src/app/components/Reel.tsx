'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

interface ReelSliderProps {
  videoUrls: string[];
}

export default function ReelSlider({ videoUrls }: ReelSliderProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const vid = entry.target as HTMLVideoElement;

            if (entry.isIntersecting) {
              // Si aún no tiene src, asignamos el data-src (precargado o actual)
              if (!vid.src) {
                vid.src = vid.dataset.src!;
                vid.load();
              }
              vid.play().catch(() => {});
            } else {
              vid.pause();
              vid.removeAttribute('src');
              vid.load(); // Libera memoria
            }
          });
        },
        {
          threshold: 0.6,
        }
      );

      observer.observe(video);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [videoUrls, activeIndex]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-[320px] h-[570px] relative overflow-hidden rounded-2xl shadow-lg border border-gray-800">
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={false}
          centeredSlides={false}
          direction="horizontal"
          grabCursor={true}
          touchStartPreventDefault={false}
          threshold={5}
          className="h-full w-full"
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
        >
          {videoUrls.map((url, index) => {
            const isActive = Math.abs(index - activeIndex) === 0;
            const isNext = index === activeIndex + 1;

            // Solo renderiza el activo y el siguiente (con preload)
            if (!isActive && !isNext) {
              return <SwiperSlide key={index} />;
            }

            return (
              <SwiperSlide key={index}>
                <video
                  ref={(el) => {
                    if (el) {
                      videoRefs.current[index] = el;
                    }
                  }}
                  data-src={url}
                  src={isNext ? url : undefined} // preload del siguiente video
                  preload={isNext ? 'auto' : 'none'} // preload solo del siguiente
                  className="w-full h-full object-cover rounded-2xl"
                  muted
                  loop
                  playsInline
                  controls={false}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}