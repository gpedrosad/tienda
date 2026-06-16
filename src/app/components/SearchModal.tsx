"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAllProducts, Product } from "@/data/products";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const priceFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
});

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function filterProducts(products: Product[], term: string): Product[] {
  if (!term.trim()) return [];
  const lowerTerm = term.toLowerCase();
  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(lowerTerm) ||
        p.category.toLowerCase().includes(lowerTerm)
    )
    .slice(0, 8);
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setQuery("");
      setResults([]);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const allProducts = getAllProducts();
    const filtered = filterProducts(allProducts, debouncedQuery);
    setResults(filtered);
  }, [debouncedQuery]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isOpen, results]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?search=${encodeURIComponent(query.trim())}#catalogo`);
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isAnimating && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Buscar productos"
    >
      <div
        ref={modalRef}
        className={`max-w-2xl mx-auto mt-20 bg-white rounded-2xl shadow-2xl transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <form onSubmit={handleSubmit} className="p-6">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full pl-12 pr-4 py-4 text-lg font-light text-neutral-900 bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent placeholder:text-neutral-400"
              aria-label="Buscar productos"
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
            <span>Enter para buscar · Esc para cerrar</span>
            {results.length > 0 && (
              <span>{results.length} resultado{results.length !== 1 ? "s" : ""}</span>
            )}
          </div>
        </form>

        {debouncedQuery && (
          <div className="border-t border-neutral-100">
            {results.length > 0 ? (
              <ul className="py-2">
                {results.map((product, index) => (
                  <li
                    key={product.id}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="transition-all duration-200"
                  >
                    <Link
                      href={`/products/${product.handle || product.id}`}
                      className="flex items-center gap-4 px-6 py-3 hover:bg-neutral-50 transition-colors duration-150"
                      onClick={onClose}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-neutral-100 rounded-lg overflow-hidden">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-400">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={1.5}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-light text-neutral-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-neutral-500">{product.category}</p>
                      </div>
                      <div className="flex-shrink-0 text-sm font-light text-neutral-900">
                        {priceFormatter.format(product.price)}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-12 px-6 text-center">
                <svg
                  className="mx-auto h-10 w-10 text-neutral-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p className="mt-3 text-sm font-light text-neutral-500">
                  No se encontraron productos
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
