import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { peldanosFlotantesLandingConfig } from "@/lib/ronda2-landings";
import { buildLandingMetadata } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(peldanosFlotantesLandingConfig);

export default function PeldanosFlotantesPage() {
  return <ServiceLandingPage config={peldanosFlotantesLandingConfig} />;
}
