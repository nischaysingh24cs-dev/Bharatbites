import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { requireAdmin } from "@/lib/server-auth";

const schema = z.object({
  title: z.string().min(5).max(180),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  excerpt: z.string().max(400),
  content: z.string().min(50),
  category: z.string().min(2),
  published: z.boolean().default(false)
});
export async function GET(request: NextRequest) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ data: [], demo: true });
  const includeDrafts =
    request.nextUrl.searchParams.get("all") === "true" &&
    (await requireAdmin());
  let query = supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });
  if (!includeDrafts) query = query.eq("published", true);
  const { data, error } = await query;
  if (error)
    return NextResponse.json(
      { error: "Could not load articles" },
      { status: 500 }
    );
  return NextResponse.json({ data });
}
export async function POST(request: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const input = schema.parse(await request.json());
    const supabase = getSupabaseAdminClient();
    if (!supabase)
      return NextResponse.json(
        { data: { id: crypto.randomUUID(), ...input }, demo: true },
        { status: 201 }
      );
    const { data, error } = await supabase
      .from("blog_posts")
      .insert(input)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof z.ZodError
            ? "Invalid article"
            : "Could not save article"
      },
      { status: 400 }
    );
  }
}
