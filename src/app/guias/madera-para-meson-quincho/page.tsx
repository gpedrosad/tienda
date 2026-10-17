import GuidePage from "@/app/components/GuidePage";
import { buildGuideMetadata } from "@/lib/guides";
import { maderaMesonQuinchoGuideConfig } from "@/lib/quincho-guide";

export const metadata = buildGuideMetadata(maderaMesonQuinchoGuideConfig);

export default function MaderaParaMesonQuinchoPage() {
  return <GuidePage config={maderaMesonQuinchoGuideConfig} />;
}
