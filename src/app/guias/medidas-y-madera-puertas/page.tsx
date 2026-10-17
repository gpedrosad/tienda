import GuidePage from "@/app/components/GuidePage";
import { medidasMaderaPuertasGuideConfig } from "@/lib/door-guide";
import { buildGuideMetadata } from "@/lib/guides";

export const metadata = buildGuideMetadata(medidasMaderaPuertasGuideConfig);

export default function MedidasMaderaPuertasPage() {
  return <GuidePage config={medidasMaderaPuertasGuideConfig} />;
}
