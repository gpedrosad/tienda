import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { puertasCorrederasLandingConfig } from "@/lib/door-landings";
import { buildLandingMetadata } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(puertasCorrederasLandingConfig);

export default function PuertasCorrederasPage() {
  return <ServiceLandingPage config={puertasCorrederasLandingConfig} />;
}
