import GuidePage from "@/app/components/GuidePage";
import { buildGuideMetadata } from "@/lib/guides";
import { elegirMaderaPeldanosGuideConfig } from "@/lib/peldanos-guides";

export const metadata = buildGuideMetadata(elegirMaderaPeldanosGuideConfig);

export default function ElegirMaderaPeldanosPage() {
  return <GuidePage config={elegirMaderaPeldanosGuideConfig} />;
}
