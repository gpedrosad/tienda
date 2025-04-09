// app/layout.tsx o src/app/layout.tsx
"use client";

import { useEffect } from "react";
import Script from "next/script";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/app/context/CartContext";
import Header from "@/app/components/Header";
import CartSideBar from "@/app/components/CartSideBar";
import Footer from "@/app/components/Footer";
import { initFacebookPixel } from "@/lib/pixel";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Idea Madera",
  description:
    "Idea Madera es una empresa chilena dedicada a la fabricación de muebles de madera con un enfoque en la calidad y el diseño.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initFacebookPixel();
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Pixel Script para navegadores sin JS */}
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
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
      </body>
    </html>
  );
}