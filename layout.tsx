import { NextRequest, NextResponse } from "next/server";
import { foods } from "@/data/foods";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.toLowerCase() ?? "";
  const state = request.nextUrl.searchParams.get("state") ?? "";
  const result = foods.filter(
    (food) =>
      (!query ||
        food.name.toLowerCase().includes(query) ||
        food.ingredients.some((i) => i.toLowerCase().includes(query))) &&
      (!state || food.state === state)
  );
  return NextResponse.json({ data: result, count: result.length });
}
