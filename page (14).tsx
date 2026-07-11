import { NextResponse } from "next/server";
import { z } from "zod";
import { getRequestUserId } from "@/lib/server-auth";
import { getSupabaseAdminClient } from "@/lib/supabase";
const schema = z.object({
  appointmentId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  body: z.string().min(10).max(1000)
});
export async function GET() {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ data: [], demo: true });
  const { data, error } = await supabase
    .from("reviews")
    .select("id,rating,body,created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false });
  if (error)
    return NextResponse.json(
      { error: "Could not load reviews" },
      { status: 500 }
    );
  return NextResponse.json({ data });
}
export async function POST(request: Request) {
  const userId = await getRequestUserId();
  if (!userId)
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  try {
    const input = schema.parse(await request.json());
    const supabase = getSupabaseAdminClient();
    if (!supabase)
      return NextResponse.json(
        { data: { id: crypto.randomUUID(), ...input }, demo: true },
        { status: 201 }
      );
    const { data, error } = await supabase
      .from("reviews")
      .insert({
        user_id: userId,
        appointment_id: input.appointmentId,
        rating: input.rating,
        body: input.body
      })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "A completed appointment is required" },
      { status: 400 }
    );
  }
}
