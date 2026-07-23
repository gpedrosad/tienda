import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { buildLandingMetadata, mueblesChillanLandingConfig } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(mueblesChillanLandingConfig);

export default function MueblesChillanPage() {
  return <ServiceLandingPage config={mueblesChillanLandingConfig} />;
}
