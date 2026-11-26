import GuidePage from "@/app/components/GuidePage";
import { medidasVeladorGuideConfig } from "@/lib/velador-guide";
import { buildGuideMetadata } from "@/lib/guides";

export const metadata = buildGuideMetadata(medidasVeladorGuideConfig);

export default function MedidasVeladorPage() {
  return <GuidePage config={medidasVeladorGuideConfig} />;
}
