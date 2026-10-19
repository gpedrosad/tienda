import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/app/components/ClientLayout";
import JsonLd from "@/app/components/JsonLd";
import {
  buildOpenGraphDefaults,
  buildOrganizationSchema,
  buildTwitterDefaults,
  buildWebSiteSchema,
  HOME_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ANALYTICS_HOST_CHECK } from "@/lib/analytics-host";

const GA_MEASUREMENT_ID = "G-KBR6DKMXVM";
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: HOME_DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: buildOpenGraphDefaults(),
  twitter: buildTwitterDefaults(),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  category: "shopping",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL">
      <head>
        {/* gtag queda definido siempre (las llamadas no fallan), pero la librería solo carga en el host de producción. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;if(${ANALYTICS_HOST_CHECK}){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';document.head.appendChild(s);gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');}`,
          }}
        />
      </head>
      <body className={`${archivo.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K452JXZZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <JsonLd data={[buildOrganizationSchema(), buildWebSiteSchema()]} />
        <ClientLayout>{children}</ClientLayout>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
