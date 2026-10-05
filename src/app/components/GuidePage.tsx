"use client";

import Link from "next/link";
import { AiOutlineWhatsApp } from "react-icons/ai";
import JsonLd from "@/app/components/JsonLd";
import { buildGuideSchemaGraph, buildGuideWhatsAppHref, type GuideConfig } from "@/lib/guides";

export default function GuidePage({ config }: { config: GuideConfig }) {
  const whatsappHref = config.whatsappLines
    ? buildGuideWhatsAppHref(config.whatsappLines)
    : null;
  const structuredData = buildGuideSchemaGraph(config);

  return (
    <>
      <JsonLd data={structuredData} />
      <main className="bg-white text-neutral-900">
        <section className="border-b border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-4xl px-4 pb-10 pt-24 md:pb-14 md:pt-32">
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
              {config.updatedDate && (
                <p className="mt-3 text-xs text-neutral-500">
                  Actualizado: {config.updatedDate}
                </p>
              )}
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <div className="prose prose-neutral max-w-none">
            {config.sections.map((section, idx) => (
              <section key={idx} className="mb-10">
                <h2 className="mb-4 text-2xl font-light tracking-tight text-neutral-900 md:text-3xl">
                  {section.title}
                </h2>
                {section.content.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="mb-4 text-base leading-relaxed text-neutral-700"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="my-4 space-y-2 pl-5">
                    {section.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="text-base leading-relaxed text-neutral-700"
                      >
                        {bullet}
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
                              <td
                                key={cIdx}
                                className="px-4 py-3 text-sm text-neutral-700"
                              >
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
            ))}
          </div>
        </article>

        {config.faqs && config.faqs.length > 0 && (
          <section className="border-t border-neutral-200 bg-neutral-50">
            <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
              <h2 className="mb-8 text-2xl font-light tracking-tight text-neutral-900 md:text-3xl">
                Preguntas frecuentes
              </h2>
              <div className="space-y-5">
                {config.faqs.map((faq, idx) => (
                  <article key={idx} className="border-b border-neutral-200 pb-5">
                    <h3 className="mb-2 text-base font-medium text-neutral-900 md:text-lg">
                      {faq.question}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
                      {faq.answer}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {config.relatedLinks && config.relatedLinks.length > 0 && (
          <section className="border-t border-neutral-200">
            <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
              <h2 className="mb-5 text-xl font-light tracking-tight text-neutral-900">
                También te puede interesar
              </h2>
              <div className="grid gap-3 sm:grid-cols-3">
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
          <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-900 p-7 text-white md:p-9">
              <h2 className="text-2xl font-light tracking-tight md:text-3xl">
                {config.ctaTitle}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base">
                {config.ctaParagraph}
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-neutral-950 transition hover:bg-[#1ebe57] md:text-base"
              >
                <AiOutlineWhatsApp size={22} />
                Escribir por WhatsApp
              </a>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
