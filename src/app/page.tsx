import type { Metadata } from "next";
import HomePage from "@/app/components/HomePage";
import JsonLd from "@/app/components/JsonLd";
import {
  buildFaqPageSchema,
  buildOpenGraphDefaults,
  buildTwitterDefaults,
  HOME_DESCRIPTION,
  HOME_TITLE,
  homeFaqItems,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: HOME_TITLE,
  },
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    ...buildOpenGraphDefaults(),
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
  },
  twitter: {
    ...buildTwitterDefaults(),
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={buildFaqPageSchema(homeFaqItems)} />
      <HomePage />
    </>
  );
}
