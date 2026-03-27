"use client";

import type { FeedPreviewKey, FeedCardType } from "@/lib/feed/feedTypes";
import dynamic from "next/dynamic";

const LandingPriorityGame = dynamic(
  () => import("@/components/landing/LandingPriorityGame").then((m) => m.LandingPriorityGame),
  { ssr: false },
);
const CedulaPreviewMini = dynamic(
  () => import("@/components/landing/CedulaPreviewMini").then((m) => m.CedulaPreviewMini),
  { ssr: false },
);
const ComparadorPreviewMini = dynamic(
  () => import("@/components/landing/ComparadorPreviewMini").then((m) => m.ComparadorPreviewMini),
  { ssr: false },
);
const VerificadorPreviewMini = dynamic(
  () => import("@/components/landing/VerificadorPreviewMini").then((m) => m.VerificadorPreviewMini),
  { ssr: false },
);
const PlanesPreviewMini = dynamic(
  () => import("@/components/landing/PlanesPreviewMini").then((m) => m.PlanesPreviewMini),
  { ssr: false },
);
const EncuestasPreviewMini = dynamic(
  () => import("@/components/landing/EncuestasPreviewMini").then((m) => m.EncuestasPreviewMini),
  { ssr: false },
);
const DesafioPreviewMini = dynamic(
  () => import("@/components/landing/DesafioPreviewMini").then((m) => m.DesafioPreviewMini),
  { ssr: false },
);
const AcademiaPreviewMini = dynamic(
  () => import("@/components/landing/AcademiaPreviewMini").then((m) => m.AcademiaPreviewMini),
  { ssr: false },
);

const DigitalOpportunityRadar = dynamic(
  () => import("@/components/strategy/DigitalOpportunityRadar").then((m) => m.default),
  { ssr: false },
);
const WatchlistPanel = dynamic(
  () => import("@/components/strategy/WatchlistPanel").then((m) => m.default),
  { ssr: false },
);

const SecondRoundSimulatorPanel = dynamic(
  () => import("@/components/strategy/SecondRoundSimulatorPanel").then((m) => m.default),
  { ssr: false },
);

const StrategicComparatorPanel = dynamic(
  () => import("@/components/strategy/StrategicComparatorPanel").then((m) => m.default),
  { ssr: false },
);

const AnalisisPreviewMini = dynamic(
  () => import("@/components/landing/AnalisisPreviewMini").then((m) => m.AnalisisPreviewMini),
  { ssr: false },
);

export type PreviewSize = "micro" | "focus";

export function FeedPreviewRenderer({
  previewKey,
  previewType,
  size,
}: {
  previewKey: FeedPreviewKey;
  previewType: FeedCardType;
  size: PreviewSize;
}) {
  const wrapperClass =
    size === "micro"
      ? "max-h-[44vh] overflow-hidden"
      : "max-h-[78vh] overflow-auto";

  switch (previewKey) {
    case "LandingPriorityGame":
      return <div className={wrapperClass}> <LandingPriorityGame /> </div>;
    case "CedulaPreviewMini":
      return <div className={wrapperClass}> <CedulaPreviewMini /> </div>;
    case "ComparadorPreviewMini":
      return <div className={wrapperClass}> <ComparadorPreviewMini /> </div>;
    case "VerificadorPreviewMini":
      return <div className={wrapperClass}> <VerificadorPreviewMini /> </div>;
    case "PlanesPreviewMini":
      return <div className={wrapperClass}> <PlanesPreviewMini /> </div>;
    case "EncuestasPreviewMini":
      return <div className={wrapperClass}> <EncuestasPreviewMini /> </div>;
    case "DesafioPreviewMini":
      return <div className={wrapperClass}> <DesafioPreviewMini /> </div>;
    case "AcademiaPreviewMini":
      return <div className={wrapperClass}> <AcademiaPreviewMini /> </div>;
    case "DigitalOpportunityRadar":
      return <div className={wrapperClass}> <DigitalOpportunityRadar /> </div>;
    case "WatchlistPanel":
      return <div className={wrapperClass}> <WatchlistPanel /> </div>;
    case "SecondRoundSimulatorPanel":
      return <div className={wrapperClass}> <SecondRoundSimulatorPanel /> </div>;
    case "StrategicComparatorPanel":
      return <div className={wrapperClass}> <StrategicComparatorPanel /> </div>;
    case "AnalisisPreviewMini":
      return <div className={wrapperClass}> <AnalisisPreviewMini /> </div>;
    default: {
      const _exhaustive: never = previewKey;
      return (
        <div className={wrapperClass}>
          Preview no disponible ({String(_exhaustive)})
        </div>
      );
    }
  }
}

