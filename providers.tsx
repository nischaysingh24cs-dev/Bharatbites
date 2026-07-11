import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { getRequestUserId } from "@/lib/server-auth";

const schema = z.object({
  foodId: z.string().min(1),
  quantity: z.number().positive().max(500),
  mealType: z.enum(["breakfast", "lunch", "dinner", "snack"]).optional()
});
export async function POST(request: Request) {
  try {
    const userId = await getRequestUserId();
    if (!userId)
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    const input = schema.parse(await request.json());
    const supabase = getSupabaseAdminClient();
    if (!supabase)
      return NextResponse.json(
        { data: { id: crypto.randomUUID(), ...input, userId, demo: true } },
        { status: 201 }
      );
    const { data, error } = await supabase
      .from("food_logs")
      .insert({
        user_id: userId,
        food_id: input.foodId,
        quantity: input.quantity,
        meal_type: input.mealType
      })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(
        { error: "Invalid meal log", details: error.flatten() },
        { status: 400 }
      );
    return NextResponse.json({ error: "Could not save meal" }, { status: 500 });
  }
}
export async function GET() {
  const userId = await getRequestUserId();
  if (!userId)
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  const supabase = getSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ data: [], demo: true });
  const { data, error } = await supabase
    .from("food_logs")
    .select("*, foods(*)")
    .eq("user_id", userId)
    .order("logged_at", { ascending: false })
    .limit(100);
  if (error)
    return NextResponse.json(
      { error: "Could not load meal history" },
      { status: 500 }
    );
  return NextResponse.json({ data });
}
