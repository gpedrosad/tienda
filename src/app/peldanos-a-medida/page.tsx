import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { buildLandingMetadata, peldanosLandingConfig } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(peldanosLandingConfig);

export default function PeldanosAMedidaPage() {
  return <ServiceLandingPage config={peldanosLandingConfig} />;
}
