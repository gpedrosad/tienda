import Link from "next/link";
import ProductCard, { RELATED_GRID_SIZES } from "@/app/components/ProductCard";
import { products, type Product } from "@/data/products";
import { getVisibleProducts, slugifyCategory } from "@/lib/catalog";
import { COFFEE_TABLE_WITH_SIZES, DINING_TABLE_IDS } from "@/lib/mesa-groups";

/** Sillas que no son de comedor: no se combinan con mesas de comedor. */
const NON_DINING_CHAIR_IDS = new Set(["silla-kentucky"]);

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
  limit?: number;
}

function selectRelated(current: Product | undefined, category: string) {
  const visible = getVisibleProducts(products).filter((product) => product.id !== current?.id);

  if (current && COFFEE_TABLE_WITH_SIZES.has(current.id)) {
    return {
      title: "También te puede interesar",
      subtitle: "Otras mesas de centro, por si buscas otra medida o terminación.",
      href: "/mesas-de-centro",
      products: visible.filter((product) => COFFEE_TABLE_WITH_SIZES.has(product.id)),
    };
  }

  if (current && DINING_TABLE_IDS.has(current.id)) {
    return {
      title: "También te puede interesar",
      subtitle: "Otras mesas de comedor, por si buscas otra medida o terminación.",
      href: "/collections/mesas",
      products: visible.filter((product) => DINING_TABLE_IDS.has(product.id)),
    };
  }

  if (current?.category === "Sillas" && !NON_DINING_CHAIR_IDS.has(current.id)) {
    return {
      title: "Combínala con",
      subtitle: "Mesas de comedor para acompañar esta silla.",
      href: "/collections/mesas",
      products: visible.filter((product) => DINING_TABLE_IDS.has(product.id)),
    };
  }

  return {
    title: "También te puede interesar",
    subtitle: "Alternativas de la misma categoría por si buscas otra medida, terminación o estilo.",
    href: `/collections/${slugifyCategory(category)}`,
    products: visible.filter((product) => product.category === category),
  };
}

export default function RelatedProducts({
  currentProductId,
  category,
  limit = 4,
}: RelatedProductsProps) {
  const current = products.find((product) => product.id === currentProductId);
  const selection = selectRelated(current, category);
  const relatedProducts = selection.products.slice(0, limit);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 md:py-20">
      <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink">
            {selection.title}
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
            {selection.subtitle}
          </p>
        </div>
        <Link
          href={selection.href}
          className="inline-flex min-h-11 items-center text-sm text-ink underline underline-offset-4 decoration-wood/40 hover:decoration-wood"
        >
          Ver todas →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} cta="ficha" sizes={RELATED_GRID_SIZES} />
        ))}
      </div>
    </section>
  );
}
