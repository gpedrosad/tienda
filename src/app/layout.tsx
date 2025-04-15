// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "@/app/components/ClientLayout"; // Componente que maneja la estructura de cliente
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Cargar fuentes locales
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
  return (
    <html lang="es">
      <head>
        {/* Google Tag Manager - Script principal */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K452JXZZ');
          `}
        </Script>
        {/* Mover la etiqueta <link> al interior del <head> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K452JXZZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* Se elimina cualquier lógica o clase que habilite modo oscuro */}
        <ClientLayout>{children}</ClientLayout>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}