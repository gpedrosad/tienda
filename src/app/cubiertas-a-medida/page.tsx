import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { buildLandingMetadata, cubiertasLandingConfig } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(cubiertasLandingConfig);

export default function CubiertasAMedidaPage() {
  return <ServiceLandingPage config={cubiertasLandingConfig} />;
}
