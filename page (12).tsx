import { NextResponse } from "next/server";
import { z } from "zod";
import { generateDietPlan } from "@/lib/diet";

const schema = z.object({
  age: z.number().int().min(13).max(100),
  height: z.number().min(100).max(250),
  weight: z.number().min(25).max(350),
  gender: z.string().min(1),
  activity: z.enum(["Low", "Moderate", "High"]),
  goal: z.enum([
    "Weight loss",
    "Weight gain",
    "Maintain weight",
    "Muscle building"
  ]),
  preference: z.enum(["Vegetarian", "Non-Vegetarian", "Vegan", "Jain"])
});
export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    return NextResponse.json({ data: generateDietPlan(input) });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof z.ZodError
            ? "Please check your profile details"
            : "Could not create a plan"
      },
      { status: 400 }
    );
  }
}
