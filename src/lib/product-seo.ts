import type { Product } from "@/data/products";
import { formatCLP } from "@/lib/whatsapp";

const CATEGORY_TITLE_RULES: Record<
  string,
  {
    keyword: string;
    comedorSuffix: string;
    defaultSuffix: string;
    livingSuffix?: string;
  }
> = {
  Mesas: {
    keyword: "mesa",
    comedorSuffix: "de Comedor en Madera Maciza",
    defaultSuffix: "en Madera Maciza",
  },
  Sillas: {
    keyword: "silla",
    comedorSuffix: "de Comedor en Madera",
    defaultSuffix: "en Madera",
  },
  Bancas: {
    keyword: "banca",
    comedorSuffix: "de Madera para Comedor",
    defaultSuffix: "de Madera",
  },
  Veladores: {
    keyword: "velador",
    comedorSuffix: "de Madera para Dormitorio",
    defaultSuffix: "de Madera",
  },
  Sitiales: {
    keyword: "sitial",
    comedorSuffix: "de Madera para Living",
    defaultSuffix: "de Madera",
    livingSuffix: "de Madera para Living",
  },
  Percheros: {
    keyword: "perchero",
    comedorSuffix: "de Madera para Hogar",
    defaultSuffix: "de Madera",
  },
  Pisos: {
    keyword: "piso",
    comedorSuffix: "de Madera para Interior",
    defaultSuffix: "de Madera",
  },
  Futon: {
    keyword: "futon",
    comedorSuffix: "de Madera para Living",
    defaultSuffix: "de Madera",
  },
};

function isSideboard(name: string) {
  return name.toLowerCase().includes("arrimo");
}

function isLivingRoomTable(name: string) {
  const lower = name.toLowerCase();
  return (
    lower.includes("centro") ||
    lower.includes("ratona") ||
    lower.includes("hairpin") ||
    isSideboard(name)
  );
}

function impliesDiningTable(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("comedor")) return true;
  return ["tripode", "trípode", "frida", "bolonia", "niza", "cantabria", "novara", "liguria", "praga", "genova"].some(
    (hint) => lower.includes(hint),
  );
}

function nameAlreadyDescriptive(name: string) {
  const lower = name.toLowerCase();
  return lower.includes("madera") && name.length >= 28;
}

export function buildProductMetadataTitle(product: Product): string {
  const name = product.name;

  if (nameAlreadyDescriptive(name)) {
    return name;
  }

  const rules = CATEGORY_TITLE_RULES[product.category];
  if (!rules) {
    return `${name} en Madera`;
  }

  const lower = name.toLowerCase();
  const hasKeyword = lower.includes(rules.keyword);

  if (product.category === "Mesas") {
    if (isSideboard(name)) {
      return `${name} en Madera Maciza`;
    }
    if (hasKeyword) {
      if (impliesDiningTable(name) && name.length >= 30) {
        return name;
      }
      if (isLivingRoomTable(name) || impliesDiningTable(name)) {
        return `${name} ${rules.defaultSuffix}`;
      }
      return `${name} ${rules.comedorSuffix}`;
    }
    return `${name} — Mesa de Comedor en Madera Maciza`;
  }

  if (hasKeyword) {
    const suffix =
      product.category === "Sitiales" && rules.livingSuffix
        ? rules.livingSuffix
        : rules.comedorSuffix;
    return `${name} ${suffix}`;
  }

  const fallbackByCategory: Record<string, string> = {
    Mesas: "Mesa de Comedor en Madera Maciza",
    Sillas: "Silla de Comedor en Madera",
    Bancas: "Banca de Madera",
    Veladores: "Velador de Madera",
    Sitiales: "Sitial de Madera",
    Percheros: "Perchero de Madera",
    Pisos: "Piso de Madera",
    Futon: "Futón de Madera",
  };

  return `${name} — ${fallbackByCategory[product.category] ?? "Mueble en Madera"}`;
}

export function buildProductMetadataDescription(product: Product, shortPitch: string): string {
  const base = shortPitch.trim();
  const priceHint = `Desde ${formatCLP(product.price)}.`;
  const cta = " Cotiza por WhatsApp con envío a todo Chile.";

  const hasCta =
    base.toLowerCase().includes("whatsapp") || base.toLowerCase().includes("cotiza");

  let description = hasCta ? base : `${base}${cta}`;

  if (!description.toLowerCase().includes("desde $") && description.length + priceHint.length + 1 <= 160) {
    description = `${base} ${priceHint}${hasCta ? "" : cta}`.trim();
  }

  if (description.length <= 160) {
    return description;
  }

  const target = 157;
  const truncated = description.slice(0, target).trimEnd();
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 100 ? lastSpace : target)}…`;
}

export function getProductSeo(product: Product, shortPitch: string) {
  return {
    metadataTitle: buildProductMetadataTitle(product),
    description: buildProductMetadataDescription(product, shortPitch),
  };
}
