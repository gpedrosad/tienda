import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { puertasLocalesLandingConfig } from "@/lib/ronda2-landings";
import { buildLandingMetadata } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(puertasLocalesLandingConfig);

export default function PuertasParaLocalesPage() {
  return <ServiceLandingPage config={puertasLocalesLandingConfig} />;
}
