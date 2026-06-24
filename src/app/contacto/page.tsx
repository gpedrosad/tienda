import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { buildLandingMetadata, contactoLandingConfig } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(contactoLandingConfig);

export default function ContactoPage() {
  return <ServiceLandingPage config={contactoLandingConfig} />;
}
