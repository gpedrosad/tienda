import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { buildLandingMetadata, cambiosDevolucionesLandingConfig } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(cambiosDevolucionesLandingConfig);

export default function CambiosYDevolucionesPage() {
  return <ServiceLandingPage config={cambiosDevolucionesLandingConfig} />;
}
