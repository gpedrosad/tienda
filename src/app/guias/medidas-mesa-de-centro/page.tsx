import GuidePage from "@/app/components/GuidePage";
import { medidasMesaCentroGuideConfig } from "@/lib/centro-guide";
import { buildGuideMetadata } from "@/lib/guides";

export const metadata = buildGuideMetadata(medidasMesaCentroGuideConfig);

export default function MedidasMesaDeCentroPage() {
  return <GuidePage config={medidasMesaCentroGuideConfig} />;
}
