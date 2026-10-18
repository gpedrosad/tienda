'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronDown, FaFacebookF, FaInstagram } from 'react-icons/fa';
import WhatsAppCTA from '@/app/components/ui/WhatsAppCTA';
import { WhatsAppAnchor } from '@/app/components/ui/WhatsAppCTA';
import { buildGeneralWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { YEARS_SINCE_FOUNDING_LABEL } from '@/lib/founding';
import {
  ALL_PRODUCTS_COLLECTION_PATH,
  collectionNavLinks,
} from '@/lib/navigation';

type FooterLink = { href: string; label: string };

const shopLinks: FooterLink[] = [
  { href: ALL_PRODUCTS_COLLECTION_PATH, label: 'Productos' },
  { href: '/ofertas', label: 'Destacados' },
  { href: '/kit-pergola', label: 'Kit pérgola' },
  { href: '/tiny-house-dlt', label: 'Tiny house en DLT' },
];

const customMadeLinks: FooterLink[] = [
  { href: '/muebles-a-medida', label: 'Muebles a medida' },
  { href: '/muebles-de-cocina-chillan', label: 'Muebles de cocina' },
  { href: '/mesas-de-comedor-a-medida', label: 'Mesas de comedor a medida' },
  { href: '/cubiertas-a-medida', label: 'Cubiertas a medida' },
  { href: '/molduras-a-medida', label: 'Molduras a medida' },
  { href: '/puertas-a-medida', label: 'Puertas a medida' },
  { href: '/peldanos-a-medida', label: 'Peldaños a medida' },
];

const doorAndStepLinks: FooterLink[] = [
  { href: '/puertas-interiores', label: 'Puertas interiores' },
  { href: '/puertas-exteriores', label: 'Puertas exteriores' },
  { href: '/puertas-correderas', label: 'Puertas correderas' },
  { href: '/escaleras-de-madera', label: 'Escaleras de madera' },
  { href: '/peldanos-flotantes', label: 'Peldaños flotantes' },
  { href: '/guias/medidas-y-madera-puertas', label: 'Medidas de puertas' },
  { href: '/guias/medidas-peldanos-escalera', label: 'Huella y contrahuella' },
];

const companyLinks: FooterLink[] = [
  { href: '/', label: 'Inicio' },
  { href: '/quienes-somos', label: 'Quiénes somos' },
  { href: '/muebles-chillan', label: 'Muebles en Chillán' },
  { href: '/guias', label: 'Guías' },
  { href: '/contacto', label: 'Contacto' },
];

const linkClass =
  'inline-flex min-h-9 items-center text-sm text-canvas/70 transition-colors duration-200 hover:text-white md:min-h-0';

const socialClass =
  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-canvas/80 transition-colors duration-200 hover:border-wood-light hover:text-wood-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70';

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [desktop, setDesktop] = React.useState(false);

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;
    const media = window.matchMedia('(min-width: 768px)');
    const sync = () => {
      setDesktop(media.matches);
      if (media.matches) details.open = true;
    };
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return (
    <details ref={detailsRef} className="footer-col group border-b border-white/10 md:border-0">
      <summary
        tabIndex={desktop ? -1 : 0}
        className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:mb-4 md:block md:min-h-0 md:cursor-default md:pointer-events-none"
      >
        <h3 className="text-[15px] font-medium text-white">{title}</h3>
        <FaChevronDown
          size={11}
          aria-hidden="true"
          className="shrink-0 text-canvas/50 transition-transform duration-200 group-open:rotate-180 md:hidden"
        />
      </summary>
      <ul className="pb-4 md:space-y-2.5 md:pb-0">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

const footerContactUrl = buildWhatsAppUrl(
  buildGeneralWhatsAppMessage('footer del sitio', [
    'Quiero consultar por disponibilidad, medidas y despacho.',
  ])
);

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-10">
        <div className="grid gap-10 pt-12 pb-6 md:pt-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,3fr)] lg:gap-16 lg:pt-20 lg:pb-12">
          {/* Marca, CTA y contacto */}
          <div className="max-w-sm space-y-6">
            <div className="flex items-center gap-4">
              <Link href="/" className="shrink-0">
                <Image
                  src="/logonegro.png"
                  alt="Idea Madera"
                  width={100}
                  height={100}
                  sizes="64px"
                  className="h-14 w-14 object-contain md:h-16 md:w-16"
                />
              </Link>
              <p className="text-sm leading-relaxed text-canvas/70">
                Taller familiar en Chillán. {YEARS_SINCE_FOUNDING_LABEL} fabricando muebles de madera, con envíos a todo Chile.
              </p>
            </div>

            <WhatsAppCTA
              href={footerContactUrl}
              label="Escríbenos por WhatsApp"
              placement="footer_cta"
              productTitle="Contacto"
            />

            <div className="space-y-1 text-sm text-canvas/70">
              <a href="mailto:hola@ideamadera.cl" className="block w-fit transition-colors hover:text-white">
                hola@ideamadera.cl
              </a>
              <WhatsAppAnchor
                href={footerContactUrl}
                placement="footer_phone"
                productTitle="Contacto"
                className="block w-fit transition-colors hover:text-white"
              >
                +56 9 9549 7838
              </WhatsAppAnchor>
              <p className="text-canvas/60">Boyén Sector 01, Chillán</p>
            </div>
          </div>

          {/* Enlaces: plegables en móvil, columnas desde md */}
          <nav aria-label="Pie de página" className="border-t border-white/10 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10 md:border-0 xl:grid-cols-5">
            <FooterColumn title="Tienda" links={shopLinks} />
            <FooterColumn title="Colecciones" links={collectionNavLinks} />
            <FooterColumn title="A medida" links={customMadeLinks} />
            <FooterColumn title="Puertas y peldaños" links={doorAndStepLinks} />
            <FooterColumn title="Idea Madera" links={companyLinks} />
          </nav>
        </div>

        <div
          id="footer-creditos"
          className="flex flex-col gap-5 border-t border-white/10 py-6 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/ideamadera.cl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={socialClass}
            >
              <FaFacebookF size={16} aria-hidden="true" />
            </a>
            <a
              href="https://instagram.com/ideamadera.cl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={socialClass}
            >
              <FaInstagram size={17} aria-hidden="true" />
            </a>
          </div>
          <p className="text-xs leading-relaxed text-canvas/60">
            © 2026 Idea Madera · Sitio por{' '}
            <WhatsAppAnchor
              href="https://wa.me/56968257817"
              placement="footer_credit"
              productTitle="Gonzalo Pedrosa"
              className="underline decoration-white/20 underline-offset-2 transition-colors hover:text-white hover:decoration-white"
            >
              Gonzalo Pedrosa
            </WhatsAppAnchor>
          </p>
        </div>
      </div>
    </footer>
  );
}
