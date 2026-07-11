import { NextResponse } from "next/server";
import { getRequestUserId } from "@/lib/server-auth";
import { getSupabaseAdminClient } from "@/lib/supabase";
export async function GET() {
  const userId = await getRequestUserId();
  if (!userId)
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  const supabase = getSupabaseAdminClient();
  if (!supabase)
    return NextResponse.json({
      data: { calories: 1460, waterGlasses: 6, streak: 12, weekly: [] },
      demo: true
    });
  const today = new Date().toISOString().slice(0, 10);
  const [{ data: logs }, { data: water }, { data: profile }] =
    await Promise.all([
      supabase
        .from("food_logs")
        .select("quantity, foods(calories, protein, carbs, fat)")
        .eq("user_id", userId)
        .gte("logged_at", today),
      supabase
        .from("water_logs")
        .select("amount_ml")
        .eq("user_id", userId)
        .gte("logged_at", today),
      supabase.from("profiles").select("*").eq("id", userId).single()
    ]);
  return NextResponse.json({ data: { logs, water, profile } });
}
