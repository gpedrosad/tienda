import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { puertasVidrioLandingConfig } from "@/lib/ronda2-landings";
import { buildLandingMetadata } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(puertasVidrioLandingConfig);

export default function PuertasDeMaderaConVidrioPage() {
  return <ServiceLandingPage config={puertasVidrioLandingConfig} />;
}
