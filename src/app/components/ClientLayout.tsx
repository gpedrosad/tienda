"use client";

import { useEffect } from "react";
import Script from "next/script";
import { CartProvider } from "@/app/context/CartContext";
import Header from "@/app/components/Header";
import CartSideBar from "@/app/components/CartSideBar";
import Footer from "@/app/components/Footer";
import { initFacebookPixel } from "@/lib/pixel";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initFacebookPixel(); // Solo el Pixel por navegador
  }, []);

  return (
    <>
      {/* Script para Pixel de Facebook */}
      <Script
        id="fb-pixel-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1591255851691449');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1591255851691449&ev=PageView&noscript=1"
        />
      </noscript>

      <CartProvider>
        <Header />
        <CartSideBar />
        <main>{children}</main>
        <Footer />
      </CartProvider>
    </>
  );
}