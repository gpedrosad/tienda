import ProductCard from "@/app/components/ProductCard";
import { products } from "@/data/products";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
  limit?: number;
}

function seededScore(seed: string, value: string) {
  const input = `${seed}:${value}`;
  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) % 100000;
  }

  return hash;
}

export default function RelatedProducts({
  currentProductId,
  category,
  limit = 4,
}: RelatedProductsProps) {
  const relatedProducts = products
    .filter((product) => product.category === category && product.id !== currentProductId)
    .sort((first, second) => seededScore(currentProductId, first.id) - seededScore(currentProductId, second.id))
    .slice(0, limit);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 md:py-20">
      <div className="mb-7 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
            Sigue explorando
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
            También te puede interesar
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-neutral-600">
          Alternativas de la misma categoría por si buscas otra medida, terminación o estilo.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
