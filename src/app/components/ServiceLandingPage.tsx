import Image from "next/image";
import Link from "next/link";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import { buttonClasses } from "@/app/components/ui/Button";
import WhatsAppCTA, { WhatsAppAnchor } from "@/app/components/ui/WhatsAppCTA";
import JsonLd from "@/app/components/JsonLd";
import { InlineLinkedText } from "@/lib/inline-links";
import {
  buildLandingSchemaGraph,
  buildLandingWhatsAppHref,
  buildLandingWhatsAppMessage,
  type LandingImage,
  type LandingRelatedLink,
  type ServiceLandingConfig,
} from "@/lib/service-landings";
import { ALL_PRODUCTS_COLLECTION_PATH } from "@/lib/navigation";

function isWideGalleryImage(image: LandingImage) {
  return image.width / image.height >= 1.35;
}

function galleryFrame(image: LandingImage, stretchOnMobile: boolean) {
  if (isWideGalleryImage(image)) {
    return {
      item: "col-span-2",
      frame: "aspect-[3/2]",
      sizes: "(max-width: 768px) 100vw, 66vw",
    };
  }
  if (stretchOnMobile) {
    return {
      item: "col-span-2 md:col-span-1",
      frame: "aspect-[3/2] md:aspect-[3/4]",
      sizes: "(max-width: 768px) 100vw, 33vw",
    };
  }
  return {
    item: "",
    frame: "aspect-[3/4]",
    sizes: "(max-width: 768px) 50vw, 33vw",
  };
}

function lastPortraitGalleryIndex(images: LandingImage[]) {
  const cells = images.reduce((sum, image) => sum + (isWideGalleryImage(image) ? 2 : 1), 0);
  if (cells % 2 === 0) return -1;
  for (let index = images.length - 1; index >= 0; index -= 1) {
    if (!isWideGalleryImage(images[index])) return index;
  }
  return -1;
}

function RelatedLinkGrid({ links }: { links: LandingRelatedLink[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-xl border border-line bg-white p-4 shadow-sm hover:border-wood/40 transition-colors"
        >
          <p className="text-sm font-medium text-ink">{link.title}</p>
          <p className="mt-1 text-sm text-ink-muted">{link.description}</p>
        </Link>
      ))}
    </div>
  );
}

interface ServiceLandingPageProps {
  config: ServiceLandingConfig;
}

export default function ServiceLandingPage({ config }: ServiceLandingPageProps) {
  const whatsappHref = buildLandingWhatsAppHref(config);
  const whatsappMessage = buildLandingWhatsAppMessage(config);
  const galleryStretchIndex = lastPortraitGalleryIndex(config.gallery ?? []);
  const hasStats = Boolean(config.stats && config.stats.length > 0);
  const visibleBadges = hasStats ? [] : config.badges.slice(0, 3);
  const relatedLinks = config.relatedLinks ?? [];
  const visibleRelatedLinks = relatedLinks.slice(0, 6);
  const moreRelatedLinks = relatedLinks.slice(6);

  return (
    <>
      <JsonLd data={buildLandingSchemaGraph(config)} />

      <main className="bg-white text-ink">
        <section className="border-b border-line bg-gradient-to-b from-canvas to-white">
          <div className="max-w-6xl mx-auto px-4 pt-24 md:pt-32 pb-12 md:pb-16">
            <div
              className={
                config.heroImage
                  ? "flex flex-col lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:grid-rows-[auto_1fr] lg:gap-x-10"
                  : undefined
              }
            >
              <div className={config.heroImage ? "lg:col-start-1 lg:row-start-1" : undefined}>
                <p className="text-sm font-medium text-wood">
                  {config.eyebrow}
                </p>
                <h1 className="font-display mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight font-semibold">
                  {config.h1}
                </h1>
              </div>

              {config.heroImage?.caption ? (
                <figure className="mt-6 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:mt-0 lg:flex lg:h-full lg:min-h-[560px] lg:flex-col">
                  <div className="relative h-[min(64vw,420px)] overflow-hidden rounded-2xl bg-canvas-deep shadow-sm lg:h-auto lg:min-h-0 lg:flex-1">
                    <Image
                      src={config.heroImage.src}
                      alt={config.heroImage.alt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {config.heroImage.caption}
                  </figcaption>
                </figure>
              ) : config.heroImage ? (
                <figure className="relative mt-6 h-[min(64vw,420px)] overflow-hidden rounded-2xl bg-canvas-deep shadow-sm lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:mt-0 lg:h-full lg:min-h-[560px]">
                  <Image
                    src={config.heroImage.src}
                    alt={config.heroImage.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </figure>
              ) : null}

              <div className={config.heroImage ? "lg:col-start-1 lg:row-start-2" : undefined}>
                <p
                  className={
                    config.heroImage
                      ? "mt-6 text-base md:text-lg text-ink/80 leading-relaxed max-w-3xl lg:mt-5"
                      : "mt-5 text-base md:text-lg text-ink/80 leading-relaxed max-w-3xl"
                  }
                >
                  {config.heroParagraph}
                </p>

                {visibleBadges.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {visibleBadges.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center rounded-full border border-ink/20 bg-white px-3 py-1.5 text-xs md:text-sm text-ink/80"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <WhatsAppCTA
                    href={whatsappHref}
                    label={config.whatsappButtonLabel}
                    placement="landing_hero"
                    productTitle={config.whatsappProductTitle}
                  />
                  {config.schemaType === "AboutPage" && (
                    <Link
                      href={ALL_PRODUCTS_COLLECTION_PATH}
                      className={buttonClasses({ variant: "secondary" })}
                    >
                      Ver catálogo
                    </Link>
                  )}
                </div>

                {hasStats && config.stats ? (
                  <div className="mt-8 grid grid-cols-3 gap-3 max-w-2xl">
                    {config.stats.map((stat) => (
                      <div key={stat.label} className="text-center sm:text-left">
                        <p className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink">{stat.value}</p>
                        <p className="mt-1 text-xs md:text-sm text-ink-muted">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {config.gallery && config.gallery.length > 0 ? (
          <section className="border-b border-line" aria-label={config.galleryTitle ?? "Galería"}>
            <div className="max-w-6xl mx-auto px-4 py-14 md:py-16">
              <h2 className="font-display text-3xl md:text-4xl tracking-tight font-semibold">
                {config.galleryTitle ?? "Trabajos reales"}
              </h2>
              {config.galleryIntro ? (
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/80 md:text-base">
                  {config.galleryIntro}
                </p>
              ) : null}
              <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                {config.gallery.map((image, index) => {
                  const frame = galleryFrame(image, index === galleryStretchIndex);
                  return (
                    <li key={image.src} className={frame.item}>
                      <figure className={`relative overflow-hidden rounded-2xl bg-canvas-deep ${frame.frame}`}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes={frame.sizes}
                          loading="lazy"
                          className="object-cover"
                        />
                      </figure>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        ) : null}

        {config.heroHighlights.length > 0 ? (
          <section className="border-b border-line">
            <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {config.heroHighlights.map((item) => (
                  <div key={item.title} className="border border-line rounded-xl p-4 bg-white shadow-sm">
                    <p className="text-sm font-medium text-ink">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {config.contactDetails && (
          <section className="border-b border-line bg-canvas">
            <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-ink-muted">Teléfono</p>
                  <WhatsAppAnchor
                    href={whatsappHref}
                    placement="landing_phone"
                    productTitle={config.whatsappProductTitle}
                    className="mt-1 block text-lg font-medium text-ink hover:text-wood"
                  >
                    {config.contactDetails.phone}
                  </WhatsAppAnchor>
                </div>
                <div>
                  <p className="text-sm text-ink-muted">Correo</p>
                  <a
                    href={`mailto:${config.contactDetails.email}`}
                    data-placement="landing_contact_email"
                    className="mt-1 block text-lg font-medium text-ink hover:text-wood"
                  >
                    {config.contactDetails.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-ink-muted">Ubicación</p>
                  <p className="mt-1 text-lg font-medium text-ink">{config.contactDetails.address}</p>
                  {config.contactDetails.instagramHandle && (
                    <a
                      href="https://instagram.com/ideamadera.cl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-ink-muted hover:text-ink"
                    >
                      Instagram {config.contactDetails.instagramHandle}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="bg-canvas border-y border-line">
          <div className="max-w-6xl mx-auto px-4 py-14 md:py-16">
            <h2 className="font-display text-3xl md:text-4xl tracking-tight font-semibold">{config.stepsTitle}</h2>
            <ol className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {config.steps.map((step, index) => (
                <li key={step.title} className="rounded-2xl border border-line bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-wood">
                    Paso {index + 1}
                  </p>
                  <h3 className="font-display mt-2 text-lg text-ink tracking-tight font-medium">{step.title}</h3>
                  <p className="mt-2 text-sm text-ink/80 leading-relaxed">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 pt-10 md:pt-12">
          <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 md:flex-row md:items-center md:justify-between md:p-6">
            <p className="text-base md:text-lg text-ink">¿Ya tienes las medidas? Envíalas y te respondemos con la propuesta.</p>
            <WhatsAppCTA
              href={whatsappHref}
              label={config.whatsappButtonLabel}
              placement="landing_mid"
              productTitle={config.whatsappProductTitle}
              fullWidthMobile={false}
              className="w-full shrink-0 md:w-auto"
            />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-14 md:py-16">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight font-semibold">{config.sectionTitle}</h2>
          <p className="mt-5 text-ink/80 leading-relaxed max-w-4xl">{config.sectionParagraph}</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {config.featureCards.map((card) => (
              <article key={card.title} className="border border-line rounded-2xl p-5 shadow-sm">
                <h3 className="font-display text-lg text-ink tracking-tight font-medium">{card.title}</h3>
                <p className="mt-2 text-sm text-ink/80 leading-relaxed">{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        {config.extraSections?.map((section) => (
          <section key={section.title} className="border-t border-line bg-white">
            <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
              <div className="max-w-3xl">
                <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl font-semibold">
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="mt-4 text-base leading-relaxed text-ink/80"
                  >
                    <InlineLinkedText text={paragraph} />
                  </p>
                ))}
                {section.bullets && section.bullets.length > 0 ? (
                  <ul className="mt-5 list-disc space-y-1.5 pl-5 text-base text-ink/80">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>
                        <InlineLinkedText text={bullet} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </section>
        ))}

        <section className="max-w-6xl mx-auto px-4 py-14 md:py-16">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight font-semibold">Preguntas frecuentes</h2>
          <div className="mt-8 border-t border-line">
            {config.faqItems.map((item, index) => (
              <details
                key={item.question}
                className="group border-b border-line py-5"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-medium text-ink [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm">
                  <h3 className="font-display text-lg tracking-tight font-medium">{item.question}</h3>
                  <span aria-hidden="true" className="mt-1 text-ink-muted transition-transform group-open:rotate-45 motion-reduce:transition-none">+</span>
                </summary>
                <p className="mt-2 text-sm md:text-base text-ink/80 leading-relaxed">
                  <InlineLinkedText text={item.answer} />
                </p>
              </details>
            ))}
          </div>
        </section>

        {relatedLinks.length > 0 ? (
          <section className="border-t border-line bg-canvas">
            <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
              <h2 className="font-display text-xl tracking-tight text-ink font-medium">También te puede interesar</h2>
              <div className="mt-5">
                <RelatedLinkGrid links={visibleRelatedLinks} />
              </div>
              {moreRelatedLinks.length > 0 ? (
                <details className="mt-4">
                  <summary className="inline-flex min-h-11 cursor-pointer list-none items-center rounded-sm text-sm font-medium text-ink underline underline-offset-4 decoration-wood/40 hover:decoration-wood focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                    Ver más páginas relacionadas
                  </summary>
                  <div className="mt-3">
                    <RelatedLinkGrid links={moreRelatedLinks} />
                  </div>
                </details>
              ) : null}
            </div>
          </section>
        ) : null}

        <section className="max-w-6xl mx-auto px-4 pt-0 pb-32 md:pb-36">
          <div className="rounded-2xl border border-line bg-ink p-7 md:p-9 text-white">
            <h2 className="font-display text-2xl md:text-3xl tracking-tight font-semibold">{config.ctaTitle}</h2>
            <p className="mt-3 text-canvas/80 leading-relaxed max-w-3xl">{config.ctaParagraph}</p>
            <ul className="mt-5 space-y-2 text-sm text-canvas/80">
              {config.ctaBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <WhatsAppCTA
              href={whatsappHref}
              label={config.whatsappButtonLabel}
              placement="landing_final"
              tone="dark"
              productTitle={config.whatsappProductTitle}
              className="mt-6"
            />
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
