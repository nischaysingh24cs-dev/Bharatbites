import type { Metadata } from "next";
import { DietPlannerClient } from "@/components/diet-planner-client";
export const metadata: Metadata = { title: "AI Indian Diet Planner" };
export default function PlanPage() {
  return <DietPlannerClient />;
}
