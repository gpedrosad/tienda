"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";
import {
  REPISA_J60_ID,
  REPISA_J60_MAX_CM,
  REPISA_J60_MIN_CM,
  REPISA_J60_PRESETS,
  buildRepisaJ60WhatsAppMessage,
  isRepisaJ60Length,
  repisaJ60Price,
  type RepisaLengthMode,
} from "@/lib/repisa-j60";
import { buildProductWhatsAppMessage, formatCLP } from "@/lib/whatsapp";

export type ProductQuote = {
  active: true;
  valid: boolean;
  price: number;
  priceLabel: string;
  message: string;
  lengthCm: number | null;
  mode: RepisaLengthMode;
  customInput: string;
  setMode: (mode: RepisaLengthMode) => void;
  setCustomInput: (value: string) => void;
};

const ProductQuoteContext = createContext<ProductQuote | null>(null);

export function useProductQuote() {
  return useContext(ProductQuoteContext);
}

export function RepisaJ60Provider({
  product,
  origin,
  children,
}: {
  product: Product;
  origin: string;
  children: ReactNode;
}) {
  const enabled = product.id === REPISA_J60_ID;
  const [mode, setMode] = useState<RepisaLengthMode>("60");
  const [customInput, setCustomInput] = useState("");

  const value = useMemo<ProductQuote | null>(() => {
    if (!enabled) return null;

    const parsed = mode === "custom" ? Number(customInput) : Number(mode);
    const valid = isRepisaJ60Length(parsed);
    const price = valid ? repisaJ60Price(parsed) : product.price;
    const message = valid
      ? buildRepisaJ60WhatsAppMessage(product, origin, parsed, price, mode === "custom")
      : buildProductWhatsAppMessage(product, origin);

    return {
      active: true,
      valid,
      price,
      priceLabel: formatCLP(price),
      message,
      lengthCm: valid ? parsed : null,
      mode,
      customInput,
      setMode,
      setCustomInput,
    };
  }, [customInput, enabled, mode, origin, product]);

  return <ProductQuoteContext.Provider value={value}>{children}</ProductQuoteContext.Provider>;
}

function optionClass(selected: boolean) {
  return `rounded-2xl border px-3 py-2.5 text-left transition-colors ${
    selected ? "border-ink bg-canvas" : "border-line bg-white hover:border-ink/30"
  }`;
}

export function ProductPriceBlock({ product, priceLabel }: { product: Product; priceLabel: string }) {
  const quote = useProductQuote();
  if (quote?.active) return <RepisaJ60Calculator quote={quote} />;

  return (
    <>
      <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink md:mt-6 md:text-4xl">
        {product.priceNote === "desde" ? (
          <span className="mr-2 text-lg font-normal text-ink-muted md:text-xl">desde</span>
        ) : null}
        {priceLabel}
      </p>
      <p className="mt-1 text-xs text-ink-muted">
        {product.priceNote && product.priceNote !== "desde" ? `${product.priceNote} · ` : ""}
        IVA incluido
      </p>
      {product.priceDetail ? (
        <p className="mt-2 text-sm leading-relaxed text-ink/80">{product.priceDetail}</p>
      ) : null}
    </>
  );
}

function RepisaJ60Calculator({ quote }: { quote: ProductQuote }) {
  const customActive = quote.mode === "custom";
  const showLengthHint = customActive && !quote.valid;

  return (
    <div className="mt-2 md:mt-6">
      <fieldset>
        <legend className="text-sm font-medium text-ink">Elige el largo</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {REPISA_J60_PRESETS.map((preset) => {
            const presetMode = String(preset.cm) as RepisaLengthMode;
            const selected = quote.mode === presetMode;
            return (
              <button
                key={preset.cm}
                type="button"
                aria-pressed={selected}
                onClick={() => quote.setMode(presetMode)}
                className={optionClass(selected)}
              >
                <span className="block text-sm font-medium text-ink">{preset.cm} cm</span>
                <span className="block text-xs text-ink-muted">{formatCLP(preset.price)}</span>
              </button>
            );
          })}
          <button
            type="button"
            aria-pressed={customActive}
            onClick={() => quote.setMode("custom")}
            className={optionClass(customActive)}
          >
            <span className="block text-sm font-medium text-ink">A medida</span>
            <span className="block text-xs text-ink-muted">
              {REPISA_J60_MIN_CM}–{REPISA_J60_MAX_CM} cm
            </span>
          </button>
        </div>
      </fieldset>

      {customActive ? (
        <label className="mt-3 block text-sm text-ink" htmlFor="repisa-j60-largo">
          Largo en centímetros
          <input
            id="repisa-j60-largo"
            type="number"
            inputMode="numeric"
            min={REPISA_J60_MIN_CM}
            max={REPISA_J60_MAX_CM}
            step={1}
            value={quote.customInput}
            onChange={(event) => quote.setCustomInput(event.target.value)}
            placeholder={`Entre ${REPISA_J60_MIN_CM} y ${REPISA_J60_MAX_CM}`}
            className="mt-1 w-full rounded-2xl border border-line bg-canvas px-3 py-2.5 text-base text-ink outline-none focus-visible:ring-2 focus-visible:ring-wood"
          />
        </label>
      ) : null}

      {showLengthHint ? (
        <p className="mt-2 text-sm text-ink" role="status">
          {quote.customInput.trim() === ""
            ? "Ingresa el largo en centímetros."
            : `El largo va de ${REPISA_J60_MIN_CM} a ${REPISA_J60_MAX_CM} cm.`}
        </p>
      ) : null}

      <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl" aria-live="polite">
        {quote.valid ? quote.priceLabel : "—"}
      </p>
      <p className="mt-1 text-xs text-ink-muted">
        {quote.lengthCm ? `${quote.lengthCm} cm · ` : ""}
        IVA incluido
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink/80">
        El precio de lista es desde {formatCLP(REPISA_J60_PRESETS[0].price)}, el tramo de 60 cm. Entre 60 y
        120 cm el valor se interpola. Fuera de ese tramo se usa la misma pendiente, unos $667 por cm, y se
        redondea hacia arriba a un precio terminado en 990. Fondo 10 cm y respaldo 8 cm son del plano de
        referencia; el largo es el que eliges.
      </p>
    </div>
  );
}
