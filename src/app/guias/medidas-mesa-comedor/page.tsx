import GuidePage from "@/app/components/GuidePage";
import { buildGuideMetadata, medidasMesaGuideConfig } from "@/lib/guides";

export const metadata = buildGuideMetadata(medidasMesaGuideConfig);

export default function MedidasMesaComedorPage() {
  return <GuidePage config={medidasMesaGuideConfig} />;
}
