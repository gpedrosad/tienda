import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { puertasInterioresLandingConfig } from "@/lib/door-landings";
import { buildLandingMetadata } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(puertasInterioresLandingConfig);

export default function PuertasInterioresPage() {
  return <ServiceLandingPage config={puertasInterioresLandingConfig} />;
}
