import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { buildLandingMetadata, puertasLandingConfig } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(puertasLandingConfig);

export default function PuertasAMedidaPage() {
  return <ServiceLandingPage config={puertasLandingConfig} />;
}
