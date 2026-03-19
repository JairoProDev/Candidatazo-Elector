import SecondRoundSimulatorPanel from "@/components/strategy/SecondRoundSimulatorPanel";
import PartyRiskPanel from "@/components/strategy/PartyRiskPanel";
import ElectionTimelinePanel from "@/components/strategy/ElectionTimelinePanel";
import SecondRoundMatrixPanel from "@/components/strategy/SecondRoundMatrixPanel";
import TransferCompatibilityPanel from "@/components/strategy/TransferCompatibilityPanel";

export default async function SegundaVueltaPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const normalize = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  const a = normalize(resolvedSearchParams?.a);
  const b = normalize(resolvedSearchParams?.b);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <SecondRoundSimulatorPanel initialASlug={a} initialBSlug={b} />
      <SecondRoundMatrixPanel defaultAPivotSlug={a} />
      <TransferCompatibilityPanel defaultPivotSlug={a} />
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <PartyRiskPanel />
        <ElectionTimelinePanel />
      </div>
    </div>
  );
}

