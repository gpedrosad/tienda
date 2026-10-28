"use client";

/* eslint-disable @next/next/no-img-element */
import { usePathname } from "next/navigation";
import ContactClickTracker from "@/app/components/ContactClickTracker";
import DeferredThirdPartyScripts from "@/app/components/DeferredThirdPartyScripts";
import GaPageTracker from "@/app/components/GaPageTracker";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const STANDALONE_PATHS = ["/kit-pergola"];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = STANDALONE_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  return (
    <>
      <GaPageTracker />
      <ContactClickTracker />
      <DeferredThirdPartyScripts />
      <noscript>
        <img
          alt=""
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1591255851691449&ev=PageView&noscript=1"
        />
      </noscript>

      {isStandalone ? (
        <>
          {children}
          {/* La página trae su propio header. El ancla del sticky ya está en el cuerpo. */}
          <Footer creditsAnchor={false} />
        </>
      ) : (
        <>
          <Header />
          {children}
          <Footer />
        </>
      )}
    </>
  );
}
