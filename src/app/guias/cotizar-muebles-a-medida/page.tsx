import GuidePage from "@/app/components/GuidePage";
import { buildGuideMetadata, cotizarMueblesGuideConfig } from "@/lib/guides";

export const metadata = buildGuideMetadata(cotizarMueblesGuideConfig);

export default function CotizarMueblesAMedidaPage() {
  return <GuidePage config={cotizarMueblesGuideConfig} />;
}
