import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { getSupabaseAdminClient } from "@/lib/supabase";

type ClerkUserEvent = {
  type: "user.created" | "user.updated" | "user.deleted";
  data: {
    id: string;
    first_name?: string;
    last_name?: string;
    image_url?: string;
  };
};
export async function POST(request: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret)
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 503 }
    );
  const headerList = await headers();
  const svixId = headerList.get("svix-id");
  const svixTimestamp = headerList.get("svix-timestamp");
  const svixSignature = headerList.get("svix-signature");
  if (!svixId || !svixTimestamp || !svixSignature)
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  const body = await request.text();
  try {
    const event = new Webhook(secret).verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature
    }) as ClerkUserEvent;
    const supabase = getSupabaseAdminClient();
    if (!supabase)
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    if (event.type === "user.deleted")
      await supabase.from("profiles").delete().eq("id", event.data.id);
    else
      await supabase.from("profiles").upsert({
        id: event.data.id,
        full_name: [event.data.first_name, event.data.last_name]
          .filter(Boolean)
          .join(" "),
        avatar_url: event.data.image_url
      });
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }
}
