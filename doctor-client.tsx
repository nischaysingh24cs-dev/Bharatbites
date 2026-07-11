import type { Metadata } from "next";
import { ExerciseClient } from "@/components/exercise-client";
export const metadata: Metadata = { title: "Exercise & Fitness Plans" };
export default function ExercisePage() {
  return <ExerciseClient />;
}
