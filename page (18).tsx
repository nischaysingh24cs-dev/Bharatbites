import type { Metadata } from "next";
import { DashboardClient } from "@/components/dashboard-client";
export const metadata: Metadata = { title: "Your Health Dashboard" };
export default function DashboardPage() {
  return <DashboardClient />;
}
