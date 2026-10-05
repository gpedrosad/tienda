import GuidePage from "@/app/components/GuidePage";
import { buildGuideMetadata, cuidadoMueblesGuideConfig } from "@/lib/guides";

export const metadata = buildGuideMetadata(cuidadoMueblesGuideConfig);

export default function CuidadoMueblesMaderaPage() {
  return <GuidePage config={cuidadoMueblesGuideConfig} />;
}
