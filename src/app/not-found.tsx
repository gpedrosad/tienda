import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";
import { buttonClasses } from "@/app/components/ui/Button";
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
      <main className="bg-white text-ink">
        <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col justify-center px-4 pt-24 pb-16">
          <p className="text-sm font-medium text-wood">Error 404</p>
          <h1 className="font-display mt-4 text-4xl tracking-tight text-ink md:text-5xl font-semibold">
            No encontramos esta página
          </h1>
          <p className="mt-4 max-w-xl text-ink-muted">
            Puede que el enlace haya cambiado o que la página ya no exista. Puedes volver al
            catálogo o explorar nuestras colecciones.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className={buttonClasses({ variant: "primary" })}>
              Ir al inicio
            </Link>
            <Link
              href="/collections/todos-los-productos"
              className={buttonClasses({ variant: "secondary" })}
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
