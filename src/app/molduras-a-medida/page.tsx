import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { buildLandingMetadata, moldurasLandingConfig } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(moldurasLandingConfig);

export default function MoldurasAMedidaPage() {
  return <ServiceLandingPage config={moldurasLandingConfig} />;
}
