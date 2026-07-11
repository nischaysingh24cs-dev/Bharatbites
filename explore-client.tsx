import type { Metadata } from "next";
import { ExploreClient } from "@/components/explore-client";

export const metadata: Metadata = {
  title: "Explore Indian Foods",
  description:
    "Discover regional Indian dishes with calories, macros, ingredients, history and practical portion guidance."
};
export default async function ExplorePage({
  searchParams
}: {
  searchParams: Promise<{ state?: string }>;
}) {
  const params = await searchParams;
  return <ExploreClient initialState={params.state ?? "All India"} />;
}
