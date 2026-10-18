"use client";

import { Fragment } from "react";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";
import ProductCard from "@/app/components/ProductCard";
import WhatsAppCTA from "@/app/components/ui/WhatsAppCTA";
import { products, type Product } from "@/data/products";
import {
  buildGuideSchemaGraph,
  buildGuideWhatsAppHref,
  formatGuideUpdatedDate,
  guideDates,
  type GuideConfig,
} from "@/lib/guides";
import { InlineLinkedText } from "@/lib/inline-links";

type GuideSection = GuideConfig["sections"][number];

function leadSectionIndexOf(config: GuideConfig) {
  const index = config.leadSectionIndex;
  if (index == null || index < 0 || index >= config.sections.length) return null;
  return index;
}

function featuredProductsFor(ids: string[] | undefined) {
  if (!ids?.length) return [];
  return ids
    .map(
      (id) =>
        products.find((product) => product.id === id) ??
        products.find((product) => product.handle === id),
    )
    .filter((product): product is Product => Boolean(product?.imageUrl))
    .slice(0, 3);
}

function GuideSectionBlock({ section }: { section: GuideSection }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-light tracking-tight text-neutral-900 md:text-3xl">
        {section.title}
      </h2>
      {section.content.map((paragraph, pIdx) => (
        <p key={pIdx} className="mb-4 text-base leading-relaxed text-neutral-700">
          <InlineLinkedText text={paragraph} />
        </p>
      ))}
      {section.bullets && (
        <ul className="my-4 list-disc space-y-2 pl-5 marker:text-neutral-400">
          {section.bullets.map((bullet, bIdx) => (
            <li key={bIdx} className="text-base leading-relaxed text-neutral-700">
              <InlineLinkedText text={bullet} />
            </li>
          ))}
        </ul>
      )}
      {section.table && (
        <div className="my-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                {section.table.headers.map((header, hIdx) => (
                  <th
                    key={hIdx}
                    className="px-4 py-3 text-left text-sm font-medium text-neutral-900"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-neutral-100">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 text-sm text-neutral-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function GuideMidCta({
  href,
  title,
  productTitle,
}: {
  href: string;
  title: string;
  productTitle: string;
}) {
  return (
    <div className="not-prose mb-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:p-8">
      <h2 className="text-2xl font-light tracking-tight text-neutral-900 md:text-3xl">{title}</h2>
      <WhatsAppCTA
        href={href}
        label="Escríbenos por WhatsApp"
        placement="guide_mid"
        productTitle={productTitle}
        className="mt-5"
      />
    </div>
  );
}

function GuideFeaturedProducts({ items }: { items: Product[] }) {
  if (items.length === 0) return null;

  const category = items[0]?.category;
  const heading =
    category && items.every((item) => item.category === category)
      ? `${category} del catálogo`
      : "Del catálogo";

  return (
    <section className="not-prose mb-10" aria-labelledby="guide-featured-products">
      <h2
        id="guide-featured-products"
        className="mb-4 text-2xl font-light tracking-tight text-neutral-900 md:text-3xl"
      >
        {heading}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {items.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index === 0} />
        ))}
      </div>
    </section>
  );
}

export default function GuidePage({ config }: { config: GuideConfig }) {
  const whatsappHref = config.whatsappLines
    ? buildGuideWhatsAppHref(config.whatsappLines)
    : null;
  const structuredData = buildGuideSchemaGraph(config);
  const updatedDate = guideDates(config).modified;
  const leadIndex = leadSectionIndexOf(config);
  const featuredProducts = featuredProductsFor(config.featuredProductIds);
  const orderedSections =
    leadIndex == null
      ? config.sections.map((section, index) => ({ section, index }))
      : [
          { section: config.sections[leadIndex], index: leadIndex },
          ...config.sections
            .map((section, index) => ({ section, index }))
            .filter((item) => item.index !== leadIndex),
        ];

  const showBridge = (index: number) => leadIndex !== null && index === leadIndex;

  return (
    <>
      <JsonLd data={structuredData} />
      <main className="bg-white text-neutral-900">
        <section className="border-b border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-4 pb-10 pt-24 md:pb-14 md:pt-32">
            <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-neutral-500">
              <Link href="/" className="hover:text-neutral-900">
                Inicio
              </Link>
              <span className="mx-1.5">/</span>
              <Link href="/guias" className="hover:text-neutral-900">
                Guías
              </Link>
              <span className="mx-1.5">/</span>
              <span>{config.h1}</span>
            </nav>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                {config.eyebrow}
              </p>
              <h1 className="mt-3 text-4xl font-light tracking-tight md:text-5xl lg:text-6xl">
                {config.h1}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg">
                {config.intro}
              </p>
              {updatedDate && (
                <p className="mt-3 text-xs text-neutral-500">
                  Actualizado:{" "}
                  <time dateTime={updatedDate}>{formatGuideUpdatedDate(updatedDate)}</time>
                </p>
              )}
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <div className="prose prose-neutral max-w-none">
            {orderedSections.map(({ section, index }) => (
              <Fragment key={index}>
                <GuideSectionBlock section={section} />
                {showBridge(index) && whatsappHref && config.ctaTitle && (
                  <GuideMidCta
                    href={whatsappHref}
                    title={config.ctaTitle}
                    productTitle={config.h1}
                  />
                )}
                {showBridge(index) && <GuideFeaturedProducts items={featuredProducts} />}
              </Fragment>
            ))}
            {leadIndex == null && <GuideFeaturedProducts items={featuredProducts} />}
          </div>
        </article>

        {config.faqs && config.faqs.length > 0 && (
          <section className="border-t border-neutral-200 bg-neutral-50">
            <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
              <h2 className="mb-8 text-2xl font-light tracking-tight text-neutral-900 md:text-3xl">
                Preguntas frecuentes
              </h2>
              <div className="border-t border-neutral-200">
                {config.faqs.map((faq, idx) => (
                  <details
                    key={faq.question}
                    className="group border-b border-neutral-200 py-5"
                    open={idx === 0}
                  >
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-base font-medium text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 md:text-lg [&::-webkit-details-marker]:hidden">
                      <h3 className="text-base font-medium md:text-lg">{faq.question}</h3>
                      <span
                        aria-hidden="true"
                        className="text-neutral-500 transition-transform group-open:rotate-45 motion-reduce:transition-none"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600 md:text-base">
                      <InlineLinkedText text={faq.answer} />
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {config.relatedLinks && config.relatedLinks.length > 0 && (
          <section className="border-t border-neutral-200">
            <div className="mx-auto max-w-3xl px-4 py-10 md:py-12">
              <h2 className="mb-5 text-xl font-light tracking-tight text-neutral-900">
                También te puede interesar
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {config.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl border border-neutral-200 bg-white p-4 transition-colors hover:border-neutral-400"
                  >
                    <p className="text-sm font-medium text-neutral-900">{link.title}</p>
                    <p className="mt-1 text-xs text-neutral-600">{link.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {whatsappHref && config.ctaTitle && (
          <section className="mx-auto max-w-3xl px-4 py-12 md:py-16">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-900 p-7 text-white md:p-9">
              <h2 className="text-2xl font-light tracking-tight md:text-3xl">
                {config.ctaTitle}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-200 md:text-base">
                {config.ctaParagraph}
              </p>
              <WhatsAppCTA
                href={whatsappHref}
                label="Escríbenos por WhatsApp"
                placement="guide_cta"
                tone="dark"
                productTitle={config.h1}
                className="mt-7"
              />
            </div>
          </section>
        )}
      </main>
    </>
  );
}
