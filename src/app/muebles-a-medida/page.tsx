import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { buildLandingMetadata, mueblesAMedidaLandingConfig } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(mueblesAMedidaLandingConfig);

export default function MueblesAMedidaPage() {
  return <ServiceLandingPage config={mueblesAMedidaLandingConfig} />;
}
