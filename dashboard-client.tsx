import type { Metadata } from "next";
import { DoctorClient } from "@/components/doctor-client";
export const metadata: Metadata = {
  title: "Consult a Homeopathy Doctor",
  description:
    "View the clinic profile, book an appointment and read practical health education."
};
export default function DoctorPage() {
  return <DoctorClient />;
}
