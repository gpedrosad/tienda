import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { buildLandingMetadata, mueblesCocinaChillanLandingConfig } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(mueblesCocinaChillanLandingConfig);

export default function MueblesDeCocinaChillanPage() {
  return <ServiceLandingPage config={mueblesCocinaChillanLandingConfig} />;
}
