import { NextResponse } from "next/server";
import { z } from "zod";
import { getFoodById } from "@/data/foods";
import { getFoodAdvice } from "@/lib/advisor";

const schema = z.object({
  foodId: z.string().min(1),
  count: z.number().int().min(0).max(500)
});
export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    const food = getFoodById(input.foodId);
    if (!food)
      return NextResponse.json({ error: "Food not found" }, { status: 404 });
    return NextResponse.json({ data: getFoodAdvice(food, input.count) });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(
        { error: "Invalid advisor input", details: error.flatten() },
        { status: 400 }
      );
    return NextResponse.json(
      { error: "Unable to generate advice" },
      { status: 500 }
    );
  }
}
