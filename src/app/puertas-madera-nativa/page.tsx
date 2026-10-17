import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { puertasMaderaNativaLandingConfig } from "@/lib/door-landings";
import { buildLandingMetadata } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(puertasMaderaNativaLandingConfig);

export default function PuertasMaderaNativaPage() {
  return <ServiceLandingPage config={puertasMaderaNativaLandingConfig} />;
}
