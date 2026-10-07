import GuidePage from "@/app/components/GuidePage";
import { buildGuideMetadata, elegirSillasGuideConfig } from "@/lib/guides";

export const metadata = buildGuideMetadata(elegirSillasGuideConfig);

export default function ElegirSillasGuide() {
  return <GuidePage config={elegirSillasGuideConfig} />;
}
