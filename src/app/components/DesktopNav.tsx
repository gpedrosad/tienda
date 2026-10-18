"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import {
  ALL_PRODUCTS_COLLECTION_PATH,
  KIT_PERGOLA_PATH,
  collectionNavLinks,
  customMadeNavLinks,
} from "@/lib/navigation";

type DropdownId = "collections" | "medida";

type DropdownLink = { label: string; href: string };

const navItems: Array<
  | { label: string; href: string }
  | { label: string; id: DropdownId; links: DropdownLink[] }
> = [
  { label: "Productos", href: ALL_PRODUCTS_COLLECTION_PATH },
  { label: "Colecciones", id: "collections", links: collectionNavLinks },
  { label: "Destacados", href: "/ofertas" },
  { label: "A medida", id: "medida", links: customMadeNavLinks },
  { label: "Kit pérgola", href: KIT_PERGOLA_PATH },
  { label: "Contacto", href: "/contacto" },
];

function isDropdown(
  item: (typeof navItems)[number]
): item is { label: string; id: DropdownId; links: DropdownLink[] } {
  return "id" in item;
}

export default function DesktopNav() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<DropdownId | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeIndicator = "bg-wood-light";

  const isActive = (href: string) => pathname === href;

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openDropdown = (id: DropdownId) => {
    clearCloseTimer();
    setOpenMenu(id);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const linkClass = `relative inline-flex min-h-11 items-center whitespace-nowrap rounded-sm px-1 xl:px-2 text-[13px] xl:text-sm font-normal tracking-normal transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 text-white hover:text-wood-light`;

  return (
    <nav className="hidden lg:flex flex-1 items-center justify-center h-full min-w-0" aria-label="Principal">
      <ul className="flex items-center h-full gap-1 xl:gap-3">
        {navItems.map((item) => (
          <li key={item.label} className="relative h-full flex items-center">
            {isDropdown(item) ? (
              <div
                className="h-full flex items-center"
                onMouseEnter={() => openDropdown(item.id)}
                onMouseLeave={scheduleClose}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) scheduleClose();
                }}
              >
                <button
                  type="button"
                  className={`${linkClass} gap-1`}
                  aria-expanded={openMenu === item.id}
                  aria-controls={`desktop-nav-${item.id}`}
                  onClick={() => setOpenMenu((current) => (current === item.id ? null : item.id))}
                >
                  {item.label}
                  <FaChevronDown
                    size={10}
                    aria-hidden="true"
                    className={`transition-transform duration-200 ${openMenu === item.id ? "rotate-180" : ""}`}
                  />
                  {item.links.some((link) => isActive(link.href)) && (
                    <span className={`absolute bottom-0 left-1 right-1 xl:left-2 xl:right-2 h-0.5 ${activeIndicator} rounded-full`} />
                  )}
                </button>
                <div
                  id={`desktop-nav-${item.id}`}
                  className={`absolute top-full left-0 z-20 pt-2 transition-all duration-200 ${
                    openMenu === item.id
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2 pointer-events-none"
                  }`}
                  onMouseEnter={() => openDropdown(item.id)}
                  onMouseLeave={scheduleClose}
                >
                  <div className="bg-white rounded-xl shadow-lg shadow-ink/10 border border-line p-2 min-w-52">
                    <ul className="flex flex-col">
                      {item.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            aria-current={isActive(link.href) ? "page" : undefined}
                            className={`block px-3 py-2 text-sm text-ink-muted rounded-lg transition-colors duration-200 hover:bg-canvas hover:text-ink ${
                              isActive(link.href) ? "bg-canvas text-ink" : ""
                            }`}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={linkClass}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className={`absolute bottom-0 left-1 right-1 xl:left-2 xl:right-2 h-0.5 ${activeIndicator} rounded-full`} />
                )}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
