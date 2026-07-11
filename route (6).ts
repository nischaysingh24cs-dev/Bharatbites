import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { requireAdmin } from "@/lib/server-auth";

const schema = z.object({
  appointmentDate: z.string().min(8),
  timeSlot: z.string().min(3),
  name: z.string().min(2).max(100),
  age: z.number().int().min(1).max(120),
  gender: z.string().max(40),
  phone: z.string().min(7).max(20),
  email: z.string().email(),
  concern: z.string().min(5).max(2000),
  consultationType: z.enum(["in-person", "video", "phone"])
});
export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    const supabase = getSupabaseAdminClient();
    const bookingId = `BB-${Date.now().toString(36).toUpperCase()}`;
    if (!supabase)
      return NextResponse.json({ bookingId, demo: true }, { status: 201 });
    const { error } = await supabase.from("appointments").insert({
      booking_reference: bookingId,
      appointment_date: input.appointmentDate,
      time_slot: input.timeSlot,
      patient_name: input.name,
      age: input.age,
      gender: input.gender,
      phone: input.phone,
      email: input.email,
      concern: input.concern,
      consultation_type: input.consultationType
    });
    if (error) throw error;
    // Add Resend/Twilio notification adapters here. Booking succeeds even if notifications are unavailable.
    return NextResponse.json({ bookingId }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(
        {
          error: "Please check your appointment details",
          details: error.flatten()
        },
        { status: 400 }
      );
    return NextResponse.json(
      { error: "Could not request this appointment" },
      { status: 500 }
    );
  }
}
export async function GET() {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const supabase = getSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ data: [], demo: true });
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false });
  if (error)
    return NextResponse.json(
      { error: "Could not load appointments" },
      { status: 500 }
    );
  return NextResponse.json({ data });
}
