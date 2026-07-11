import { Hero } from "@/components/home/hero";
import { DailyInsight } from "@/components/home/daily-insight";
import { Trending } from "@/components/home/trending";
import { SmartCounter } from "@/components/home/smart-counter";
import { StateExplorer } from "@/components/home/state-explorer";
import { Features } from "@/components/home/features";
import { PlannerPreview } from "@/components/home/planner-preview";
import { DashboardPreview } from "@/components/home/dashboard-preview";
import { DoctorPreview } from "@/components/home/doctor-preview";
import { FinalCta } from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DailyInsight />
      <Trending />
      <SmartCounter />
      <StateExplorer />
      <Features />
      <PlannerPreview />
      <DashboardPreview />
      <DoctorPreview />
      <FinalCta />
    </>
  );
}
