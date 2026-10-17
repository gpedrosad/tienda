import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { mesasComedorAMedidaLandingConfig } from "@/lib/ronda2-landings";
import { buildLandingMetadata } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(mesasComedorAMedidaLandingConfig);

export default function MesasDeComedorAMedidaPage() {
  return <ServiceLandingPage config={mesasComedorAMedidaLandingConfig} />;
}
