import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";
import { absoluteUrl, buildBreadcrumbSchema, buildFaqPageSchema, SITE_NAME, SITE_URL } from "@/lib/seo";
import Quote, { QuoteButton } from "./Quote";
import HouseSimulator from "./HouseSimulator";
import DltBenefits from "./DltBenefits";
import { faqs, landingPath, referenceUrl } from "./content";
import "./tiny-house.css";

const title = "Tiny House en DLT en Chile | Cotiza con Idea Madera";
const description = "Cotiza tu tiny house en DLT: madera renovable y prefabricación para un montaje rápido. Idea Madera, Chillán, con experiencia en Proyecto Refugio de Las Trancas.";
const socialImage = { url: absoluteUrl("/images/tiny-house-dlt-madera.webp"), width: 1000, height: 675, alt: "Panel de madera DLT en taller, publicado en el reportaje de Proyecto Refugio" };

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: absoluteUrl(landingPath) },
  openGraph: { title, description, url: absoluteUrl(landingPath), siteName: SITE_NAME, locale: "es_CL", type: "website", images: [socialImage] },
  twitter: { card: "summary_large_image", title, description, images: [socialImage.url] },
};

export default function TinyHousePage() {
  return (
    <div className="dlt-page">
      <JsonLd data={[
        buildBreadcrumbSchema([{ name: "Inicio", path: "/" }, { name: "Tiny house en DLT", path: landingPath }]),
        buildFaqPageSchema(faqs),
        {
          "@context": "https://schema.org", "@type": "Service", "@id": `${absoluteUrl(landingPath)}#service`,
          name: "Tiny house en DLT a medida", serviceType: "Proyectos de viviendas compactas en madera DLT",
          description, url: absoluteUrl(landingPath), image: socialImage.url,
          provider: { "@id": `${SITE_URL}/#organization` }, areaServed: { "@type": "Country", name: "Chile" },
        },
      ]} />

      <div className="dlt-wrap">
        <nav aria-label="Ruta de navegación" className="dlt-breadcrumb"><Link href="/">Inicio</Link><span aria-hidden="true">/</span><span aria-current="page">Tiny house en DLT</span></nav>
        <section className="dlt-hero" aria-labelledby="dlt-title">
          <div className="dlt-hero-copy">
            <p className="dlt-kicker">Idea Madera · Construcción en madera</p>
            <h1 id="dlt-title">Tiny house en DLT.<br /><span>Tu refugio empieza en la madera.</span></h1>
            <p className="dlt-intro">Una vivienda compacta, con madera renovable y paneles prefabricados para un montaje rápido. Llevamos nuestra experiencia en DLT desde Chillán a tu próximo proyecto.</p>
            <div className="dlt-actions"><QuoteButton /><a className="dlt-text-link" href="#proyecto-refugio">Conoce Proyecto Refugio <span aria-hidden="true">↓</span></a></div>
          </div>
          <figure className="dlt-hero-photo">
            <Image src="/images/tiny-house-dlt-madera.webp" alt="Detalle de las tablas de un panel DLT y el equipo de fabricación en taller" width={1000} height={675} priority sizes="(max-width: 800px) 100vw, 50vw" />
            <figcaption>Madera real. Experiencia construida.<br /><span>Fotografía: Jorge Calderón · Publicada en <a href={referenceUrl} target="_blank" rel="noopener noreferrer">Madera21 ↗</a></span></figcaption>
          </figure>
        </section>
        <nav className="dlt-section-nav" aria-label="En esta página"><a href="#ventajas">Por qué DLT</a><a href="#proyecto-refugio">Nuestra experiencia</a><a href="#obra">Obra real</a><a href="#proceso">Tu proyecto</a><a href="#preguntas">Preguntas frecuentes</a><a href="#cotizar">Cotizar <span aria-hidden="true">↗</span></a></nav>
      </div>

      <DltBenefits />

      <section id="proyecto-refugio" className="dlt-project" aria-labelledby="dlt-project-title"><div className="dlt-wrap dlt-project-grid">
        <figure><Image src="/images/proyecto-refugio-fabricacion-dlt.webp" alt="Fabricación de paneles DLT para Proyecto Refugio, con la participación de Idea Madera" width={1000} height={670} sizes="(max-width: 800px) 100vw, 55vw" /><figcaption>Fabricación de paneles para Proyecto Refugio. Jorge Calderón / Madera21.</figcaption></figure>
        <div><p className="dlt-project-label">Las Trancas · Región de Ñuble</p><h2 id="dlt-project-title">La experiencia detrás de tu próximo refugio.</h2><p>Idea Madera participó junto a Jorge Calderón en <strong>Proyecto Refugio</strong>, una vivienda en DLT a los pies del volcán Chillán, documentada por Madera21.</p><p>El reportaje describe una vivienda de dos plantas y 74 m², con paneles para muros, pisos y cubierta. Esa experiencia es un punto de partida para conversar sobre tu tiny house a medida.</p><p className="dlt-project-note">La publicación relata el inicio de la obra en 2020. Proyecto Refugio es un antecedente constructivo; sus dimensiones y plazos no corresponden a un modelo estándar de tiny house.</p><a className="dlt-text-link" href={referenceUrl} target="_blank" rel="noopener noreferrer">Leer el reportaje en Madera21 <span aria-hidden="true">↗</span></a></div>
      </div>
      <div id="obra" className="dlt-wrap dlt-project-build">
        <figure>
          <Image
            src="/images/tiny-house-montaje-obra-hq.webp"
            alt="Montaje de una vivienda compacta de madera en terreno: grúa posicionando paneles sobre la estructura"
            width={1536}
            height={1024}
            sizes="(max-width: 800px) 100vw, 720px"
            quality={88}
          />
          <figcaption>Montaje en terreno. Fotografía de obra de Idea Madera, versión de mayor definición.</figcaption>
        </figure>
        <div>
          <p className="dlt-project-label">Obra real · Idea Madera</p>
          <h2 id="dlt-build-title">Así se ve el montaje.</h2>
          <p>Los paneles se fabrican antes y se posicionan en el sitio, con grúa y equipo en el terreno. Esta imagen parte de una fotografía de obra real; no muestra una vivienda terminada ni un modelo estándar a la venta.</p>
        </div>
      </div>
      </section>

      <HouseSimulator />

      <section id="proceso" className="dlt-wrap dlt-section" aria-labelledby="dlt-process-title">
        <div className="dlt-process-heading"><h2 id="dlt-process-title">Del lugar que imaginas<br />al proyecto que puedes cotizar.</h2><p>Para descansar, vivir o recibir huéspedes. Empezamos por el uso, el terreno y las decisiones que hacen posible tu casa.</p></div>
        <ol className="dlt-steps"><li><span aria-hidden="true">1</span><h3>Cuéntanos dónde y cómo</h3><p>Comuna, superficie aproximada, uso y una referencia. Si tienes fotos del terreno o un croquis, puedes compartirlos por WhatsApp.</p></li><li><span aria-hidden="true">2</span><h3>Definimos el alcance</h3><p>Revisamos distribución, solución en DLT, terminaciones y condiciones del terreno. Acordamos qué considera la propuesta y qué debe resolverse aparte.</p></li><li><span aria-hidden="true">3</span><h3>Cotizamos con claridad</h3><p>Precio y plazos según tu proyecto, considerando fabricación, transporte y montaje cuando corresponda. Cada etapa queda definida antes de avanzar.</p></li></ol>
        <div className="dlt-scope"><h3>¿Qué determina el precio de una tiny house?</h3><p>Además de los metros cuadrados, influyen el diseño, las fundaciones, instalaciones, aislación, ventanas y accesibilidad del terreno. Al cotizar, revisaremos el alcance de cada partida para que puedas comparar propuestas con la misma información.</p></div>
      </section>

      <section id="cotizar" className="dlt-quote" aria-labelledby="dlt-quote-title"><div className="dlt-wrap dlt-quote-grid"><div><p className="dlt-kicker">Empecemos con tu idea</p><h2 id="dlt-quote-title">Cotiza tu<br />tiny house en DLT.</h2><p>No necesitas tener todos los planos listos. Cuéntanos lo que imaginas y te ayudamos a definir el siguiente paso.</p><p className="dlt-contact">Atención directa de Idea Madera<br />Chillán, Chile · <a href="tel:+56995497838">+56 9 9549 7838</a></p></div><Quote /></div></section>

      <section id="preguntas" className="dlt-wrap dlt-section dlt-faq" aria-labelledby="dlt-faq-title"><h2 id="dlt-faq-title">Antes de construir,<br />resolvamos tus dudas.</h2><div>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>

      <nav className="dlt-wrap dlt-related" aria-label="Complementa tu proyecto"><p>También hacemos el interior.</p><Link href="/muebles-a-medida">Muebles a medida ↗</Link><Link href="/cubiertas-a-medida">Cubiertas de madera ↗</Link><Link href="/puertas-a-medida">Puertas a medida ↗</Link><Link href="/quienes-somos">Conoce Idea Madera ↗</Link></nav>
    </div>
  );
}
