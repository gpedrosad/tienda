import GuidePage from "@/app/components/GuidePage";
import { buildGuideMetadata } from "@/lib/guides";
import { medidasPeldanosGuideConfig } from "@/lib/peldanos-guides";

export const metadata = buildGuideMetadata(medidasPeldanosGuideConfig);

export default function MedidasPeldanosEscaleraPage() {
  return <GuidePage config={medidasPeldanosGuideConfig} />;
}
