import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { buildLandingMetadata, quienesSomosLandingConfig } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(quienesSomosLandingConfig);

export default function QuienesSomosPage() {
  return <ServiceLandingPage config={quienesSomosLandingConfig} />;
}
