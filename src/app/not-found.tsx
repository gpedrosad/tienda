import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";
import { buildOrganizationSchema, buildOpenGraphDefaults, buildTwitterDefaults, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe en Idea Madera.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    ...buildOpenGraphDefaults(),
    title: `Página no encontrada | ${SITE_NAME}`,
    description: "La página que buscas no existe en Idea Madera.",
  },
  twitter: {
    ...buildTwitterDefaults(),
    title: `Página no encontrada | ${SITE_NAME}`,
  },
};

export default function NotFound() {
  return (
    <>
      <JsonLd data={buildOrganizationSchema()} />
      <main className="bg-white text-neutral-900">
        <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col justify-center px-4 pt-24 pb-16">
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Error 404</p>
          <h1 className="mt-4 text-4xl font-light tracking-tight text-neutral-900 md:text-5xl">
            No encontramos esta página
          </h1>
          <p className="mt-4 max-w-xl text-neutral-600">
            Puede que el enlace haya cambiado o que la página ya no exista. Puedes volver al
            catálogo o explorar nuestras colecciones.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex w-fit rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Ir al inicio
            </Link>
            <Link
              href="/collections/todos-los-productos"
              className="inline-flex w-fit rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-900 hover:border-neutral-900"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
