import type { Metadata } from "next";
import { TrackerClient } from "@/components/tracker-client";
export const metadata: Metadata = { title: "Food, Water & BMI Tracker" };
export default function TrackerPage() {
  return <TrackerClient />;
}
