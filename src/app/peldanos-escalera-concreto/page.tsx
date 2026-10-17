import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { peldanosConcretoLandingConfig } from "@/lib/peldanos-cluster";
import { buildLandingMetadata } from "@/lib/service-landings";

export const metadata = buildLandingMetadata(peldanosConcretoLandingConfig);

export default function PeldanosEscaleraConcretoPage() {
  return <ServiceLandingPage config={peldanosConcretoLandingConfig} />;
}
