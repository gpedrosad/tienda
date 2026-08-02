"use client";

/* eslint-disable @next/next/no-img-element */
import { usePathname } from "next/navigation";
import DeferredThirdPartyScripts from "@/app/components/DeferredThirdPartyScripts";
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
        <main>{children}</main>
      ) : (
        <>
          <Header />
          <main>{children}</main>
          <Footer />
        </>
      )}
    </>
  );
}
