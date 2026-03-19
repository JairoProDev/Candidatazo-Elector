import SecondRoundSimulatorPanel from "@/components/strategy/SecondRoundSimulatorPanel";
import PartyRiskPanel from "@/components/strategy/PartyRiskPanel";
import ElectionTimelinePanel from "@/components/strategy/ElectionTimelinePanel";

export default function SegundaVueltaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <SecondRoundSimulatorPanel />
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <PartyRiskPanel />
        <ElectionTimelinePanel />
      </div>
    </div>
  );
}

