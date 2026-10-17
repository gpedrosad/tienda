import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { puertasExterioresLandingConfig } from "@/lib/door-landings";
import { buildLandingMetadata } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(puertasExterioresLandingConfig);

export default function PuertasExterioresPage() {
  return <ServiceLandingPage config={puertasExterioresLandingConfig} />;
}
