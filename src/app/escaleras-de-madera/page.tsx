import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { escalerasMaderaLandingConfig } from "@/lib/peldanos-cluster";
import { buildLandingMetadata } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(escalerasMaderaLandingConfig);

export default function EscalerasDeMaderaPage() {
  return <ServiceLandingPage config={escalerasMaderaLandingConfig} />;
}
