import Link from "next/link";
import { AiOutlineWhatsApp } from "react-icons/ai";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import JsonLd from "@/app/components/JsonLd";
import {
  buildLandingSchemaGraph,
  buildLandingWhatsAppHref,
  buildLandingWhatsAppMessage,
  type ServiceLandingConfig,
} from "@/lib/service-landings";
import { ALL_PRODUCTS_COLLECTION_PATH } from "@/lib/navigation";

interface ServiceLandingPageProps {
  config: ServiceLandingConfig;
}

export default function ServiceLandingPage({ config }: ServiceLandingPageProps) {
  const whatsappHref = buildLandingWhatsAppHref(config);
  const whatsappMessage = buildLandingWhatsAppMessage(config);

  return (
    <>
      <JsonLd data={buildLandingSchemaGraph(config)} />

      <main className="bg-white text-neutral-900">
        <section className="border-b border-neutral-200 bg-gradient-to-b from-neutral-100 to-white">
          <div className="max-w-6xl mx-auto px-4 pt-24 md:pt-32 pb-12 md:pb-16">
            <p className="text-[11px] md:text-sm uppercase tracking-[0.18em] text-neutral-600">
              {config.eyebrow}
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
              {config.h1}
            </h1>
            <p className="mt-5 text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed max-w-3xl">
              {config.heroParagraph}
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {config.badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs md:text-sm text-neutral-700"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-neutral-900 text-white px-7 py-3.5 text-sm md:text-base font-medium tracking-wide hover:bg-neutral-800 transition-colors"
              >
                <AiOutlineWhatsApp className="mr-2 text-emerald-400" size={20} />
                {config.whatsappButtonLabel}
              </a>
              {config.schemaType === "AboutPage" && (
                <Link
                  href={ALL_PRODUCTS_COLLECTION_PATH}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-900 px-7 py-3.5 text-sm md:text-base font-medium tracking-wide hover:bg-neutral-50 transition-colors"
                >
                  Ver catálogo
                </Link>
              )}
            </div>

            {config.stats && config.stats.length > 0 && (
              <div className="mt-8 grid grid-cols-3 gap-3 max-w-2xl">
                {config.stats.map((stat) => (
                  <div key={stat.label} className="text-center sm:text-left">
                    <p className="text-2xl md:text-3xl font-light text-neutral-900">{stat.value}</p>
                    <p className="mt-1 text-xs md:text-sm text-neutral-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {config.heroHighlights.map((item) => (
                <div key={item.title} className="border border-neutral-200 rounded-xl p-4 bg-white shadow-sm">
                  <p className="mt-3 text-sm font-medium text-neutral-900">{item.title}</p>
                  <p className="mt-1 text-xs text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {config.contactDetails && (
          <section className="border-b border-neutral-200 bg-neutral-50">
            <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Teléfono</p>
                  <a
                    href={whatsappHref}
                    className="mt-2 block text-lg font-light text-neutral-900 hover:text-neutral-700"
                  >
                    {config.contactDetails.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Correo</p>
                  <a
                    href={`mailto:${config.contactDetails.email}`}
                    className="mt-2 block text-lg font-light text-neutral-900 hover:text-neutral-700"
                  >
                    {config.contactDetails.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Ubicación</p>
                  <p className="mt-2 text-lg font-light text-neutral-900">{config.contactDetails.address}</p>
                  {config.contactDetails.instagramHandle && (
                    <a
                      href="https://instagram.com/ideamadera.cl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-neutral-600 hover:text-neutral-900"
                    >
                      Instagram {config.contactDetails.instagramHandle}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="max-w-6xl mx-auto px-4 py-14 md:py-16">
          <h2 className="mt-3 text-3xl md:text-4xl font-light tracking-tight">{config.sectionTitle}</h2>
          <p className="mt-5 text-neutral-700 leading-relaxed max-w-4xl">{config.sectionParagraph}</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {config.featureCards.map((card) => (
              <article key={card.title} className="border border-neutral-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-lg font-medium text-neutral-900">{card.title}</h3>
                <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-neutral-50 border-y border-neutral-200">
          <div className="max-w-6xl mx-auto px-4 py-14 md:py-16">
            <h2 className="mt-3 text-3xl md:text-4xl font-light tracking-tight">{config.stepsTitle}</h2>
            <ol className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {config.steps.map((step, index) => (
                <li key={step.title} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-neutral-500">
                    Paso {index + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-medium text-neutral-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {config.bottomHighlights && config.bottomHighlights.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 py-4 md:py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.bottomHighlights.map((item) => (
                <article key={item.title} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <h2 className="mt-3 text-xl md:text-2xl font-light tracking-tight text-neutral-900">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-neutral-700 leading-relaxed">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="max-w-6xl mx-auto px-4 py-14 md:py-16">
          <h2 className="mt-3 text-3xl md:text-4xl font-light tracking-tight">Preguntas frecuentes</h2>
          <div className="mt-8 border-t border-neutral-200">
            {config.faqItems.map((item) => (
              <article key={item.question} className="border-b border-neutral-200 py-5">
                <h3 className="text-lg font-medium text-neutral-900">{item.question}</h3>
                <p className="mt-2 text-sm md:text-base text-neutral-700 leading-relaxed">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 pt-0 pb-32 md:pb-36">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-900 p-7 md:p-9 text-white">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight">{config.ctaTitle}</h2>
            <p className="mt-3 text-neutral-200 leading-relaxed max-w-3xl">{config.ctaParagraph}</p>
            <ul className="mt-5 space-y-2 text-sm text-neutral-200">
              {config.ctaBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-white text-neutral-900 px-7 py-3 text-sm md:text-base font-medium tracking-wide hover:bg-neutral-100 transition-colors"
            >
              <AiOutlineWhatsApp className="mr-2 text-neutral-900" size={20} />
              {config.whatsappButtonLabel}
            </a>
          </div>
        </section>
      </main>

      <WhatsAppButton
        productTitle={config.whatsappProductTitle}
        prefilledMessage={whatsappMessage}
        buttonLabel={config.whatsappButtonLabel}
      />
    </>
  );
}
