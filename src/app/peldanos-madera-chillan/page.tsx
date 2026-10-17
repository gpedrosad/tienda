import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { peldanosChillanLandingConfig } from "@/lib/peldanos-cluster";
import { buildLandingMetadata } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(peldanosChillanLandingConfig);

export default function PeldanosMaderaChillanPage() {
  return <ServiceLandingPage config={peldanosChillanLandingConfig} />;
}
