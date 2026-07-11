"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import {
  AlertTriangle,
  Award,
  CalendarDays,
  CheckCircle2,
  Clock3,
  HeartPulse,
  Languages,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Stethoscope
} from "lucide-react";
import { Button } from "@/components/ui/button";

const slots = [
  "10:00 AM",
  "11:00 AM",
  "12:30 PM",
  "4:30 PM",
  "5:30 PM",
  "6:30 PM"
];
export function DoctorClient() {
  const [slot, setSlot] = useState("5:30 PM");
  const [type, setType] = useState("in-person");
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...payload,
          timeSlot: slot,
          consultationType: type,
          age: Number(payload.age)
        })
      });
      const data = (await res.json()) as { bookingId?: string; error?: string };
      if (!res.ok) throw new Error(data.error);
      setConfirmation(data.bookingId ?? "BB-DEMO");
    } catch {
      setConfirmation("BB-DEMO-2026");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <section className="bg-gradient-to-b from-leaf-50 to-[#fffdf9] py-14 dark:from-leaf-500/[0.08] dark:to-ink-950">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative h-[500px] overflow-hidden rounded-[28px]">
              <Image
                src="/images/doctor-placeholder.png"
                alt="Homeopathy doctor profile placeholder"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <div className="flex items-center gap-1 text-[10px] text-amber-300">
                  <Star className="size-3 fill-current" />
                  4.9 · 128 patient reviews
                </div>
                <p className="mt-2 text-xs text-white/60">
                  Profile photo is replaceable in Admin
                </p>
              </div>
            </div>
            <span className="absolute -right-4 top-6 rounded-2xl bg-white p-3 shadow-soft dark:bg-ink-900">
              <CheckCircle2 className="size-5 text-leaf-500" />
              <b className="ml-2 text-xs">Verified profile</b>
            </span>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-leaf-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-leaf-600">
              <Stethoscope className="size-3.5" />
              Consult a homeopathy doctor
            </div>
            <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-[-.04em] sm:text-6xl">
              Thoughtful care,{" "}
              <span className="text-leaf-500">close to home.</span>
            </h1>
            <p className="mt-4 text-xl font-bold">
              Dr. Your Father&apos;s Name
            </p>
            <p className="mt-1 text-sm text-slate-500">
              BHMS, MD (Hom.) · 25+ years of experience
            </p>
            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Personalised homeopathy consultations for general wellness,
              allergies, skin concerns, respiratory care and lifestyle support.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                [Award, "25+ years", "Clinical experience"],
                [Languages, "3 languages", "English · हिंदी · ಕನ್ನಡ"],
                [Clock3, "Mon–Sat", "10 AM–1 PM · 4–7 PM"],
                [MapPin, "Bengaluru", "Clinic & video consultations"]
              ].map(([Icon, v, l]) => (
                <div
                  key={v as string}
                  className="flex items-center gap-3 rounded-2xl border border-black/[0.07] bg-white/60 p-3 dark:border-white/10 dark:bg-white/5"
                >
                  <Icon className="size-5 text-leaf-500" />
                  <span>
                    <b className="block text-xs">{v as string}</b>
                    <small className="text-[9px] text-slate-500">
                      {l as string}
                    </small>
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#book">
                <Button size="lg">
                  <CalendarDays className="size-4" />
                  Book appointment
                </Button>
              </a>
              <a href="tel:+910000000000">
                <Button variant="outline" size="lg">
                  <Phone className="size-4" />
                  Call clinic
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16" id="book">
        <div className="container-page grid gap-8 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-saffron-500">
              Book a consultation
            </p>
            <h2 className="mt-3 text-3xl font-extrabold">
              Choose a time that works for you
            </h2>
            <p className="mt-4 text-xs leading-6 text-slate-500">
              Appointments are requests until confirmed by the clinic. Email or
              SMS confirmation can be enabled with Resend and Twilio.
            </p>
            <div className="mt-6 rounded-2xl bg-leaf-500/10 p-4">
              <ShieldCheck className="size-5 text-leaf-500" />
              <h3 className="mt-3 text-xs font-bold">
                Your information stays private
              </h3>
              <p className="mt-1 text-[10px] leading-5 text-slate-500">
                Details are stored securely and are only accessible to
                authorised clinic staff.
              </p>
            </div>
            <div className="mt-4 rounded-2xl border border-black/[0.07] p-4 dark:border-white/10">
              <p className="flex items-center gap-2 text-xs font-bold">
                <MapPin className="size-4 text-saffron-500" />
                Clinic address
              </p>
              <p className="mt-2 text-[10px] leading-5 text-slate-500">
                Add your clinic address, Bengaluru, Karnataka 560000
              </p>
              <div className="mt-3 grid h-32 place-items-center rounded-xl bg-slate-100 text-[10px] text-slate-400 dark:bg-white/5">
                Google Maps embed · configure URL in Admin
              </div>
            </div>
          </div>
          <div className="card p-5 sm:p-7">
            {confirmation ? (
              <div className="grid min-h-[560px] place-items-center text-center">
                <div>
                  <span className="mx-auto grid size-20 place-items-center rounded-full bg-leaf-500/10">
                    <CheckCircle2 className="size-9 text-leaf-500" />
                  </span>
                  <h2 className="mt-5 text-2xl font-bold">
                    Appointment request received
                  </h2>
                  <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-500">
                    The clinic will confirm your slot shortly. Please save your
                    booking reference.
                  </p>
                  <div className="mx-auto mt-5 max-w-xs rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
                    <small className="text-[9px] uppercase text-slate-400">
                      Booking reference
                    </small>
                    <b className="mt-1 block text-lg text-leaf-600">
                      {confirmation}
                    </b>
                  </div>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setConfirmation(null)}
                  >
                    Book another appointment
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="label">Full name</span>
                    <input
                      required
                      name="name"
                      className="input"
                      placeholder="Your name"
                    />
                  </label>
                  <label>
                    <span className="label">Age</span>
                    <input
                      required
                      name="age"
                      type="number"
                      min="1"
                      max="120"
                      className="input"
                      placeholder="Age"
                    />
                  </label>
                  <label>
                    <span className="label">Gender</span>
                    <select name="gender" className="input">
                      <option>Female</option>
                      <option>Male</option>
                      <option>Non-binary</option>
                      <option>Prefer not to say</option>
                    </select>
                  </label>
                  <label>
                    <span className="label">Phone</span>
                    <input
                      required
                      name="phone"
                      type="tel"
                      className="input"
                      placeholder="+91 98765 43210"
                    />
                  </label>
                  <label>
                    <span className="label">Email</span>
                    <input
                      required
                      name="email"
                      type="email"
                      className="input"
                      placeholder="you@example.com"
                    />
                  </label>
                  <label>
                    <span className="label">Preferred date</span>
                    <input
                      required
                      name="appointmentDate"
                      type="date"
                      className="input"
                      min="2026-07-11"
                    />
                  </label>
                </div>
                <div className="mt-4">
                  <span className="label">Consultation type</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      ["in-person", "In person"],
                      ["video", "Video"],
                      ["phone", "Phone"]
                    ].map(([v, l]) => (
                      <button
                        type="button"
                        onClick={() => setType(v)}
                        key={v}
                        className={`rounded-xl border p-3 text-[10px] font-semibold transition ${type === v ? "border-leaf-500 bg-leaf-500/10 text-leaf-600" : "border-black/10 text-slate-500 dark:border-white/10"}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <span className="label">Available time</span>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {slots.map((x) => (
                      <button
                        type="button"
                        key={x}
                        onClick={() => setSlot(x)}
                        className={`rounded-xl border px-2 py-2.5 text-[9px] font-semibold transition ${slot === x ? "border-saffron-500 bg-saffron-500 text-white" : "border-black/10 text-slate-500 dark:border-white/10"}`}
                      >
                        {x}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="mt-4 block">
                  <span className="label">What would you like help with?</span>
                  <textarea
                    required
                    name="concern"
                    className="input min-h-28 py-3"
                    placeholder="Share your concern and how long you have experienced it…"
                  />
                </label>
                <Button disabled={loading} className="mt-5 w-full" size="lg">
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <CalendarDays className="size-4" />
                  )}
                  {loading ? "Requesting appointment…" : "Request appointment"}
                </Button>
                <p className="mt-3 text-center text-[9px] text-slate-400">
                  By booking, you agree to be contacted by the clinic about this
                  appointment.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
      <section className="bg-[#faf7f1] py-16 dark:bg-white/[0.025]" id="blog">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-leaf-600">
                Doctor&apos;s journal
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">
                Wellness, explained simply
              </h2>
            </div>
            <Button variant="outline" className="hidden sm:flex">
              View all articles
            </Button>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {[
              [
                "Seasonal wellness",
                "Staying comfortable through the monsoon",
                "5 min read"
              ],
              [
                "Healthy eating",
                "Building a balanced Indian thali",
                "7 min read"
              ],
              [
                "Lifestyle",
                "Small sleep habits with a big impact",
                "4 min read"
              ]
            ].map(([cat, title, time], i) => (
              <article key={title} className="card overflow-hidden">
                <div
                  className={`h-28 ${i === 0 ? "bg-gradient-to-br from-blue-300 to-emerald-500" : i === 1 ? "from-saffron-300 bg-gradient-to-br to-rose-500" : "bg-gradient-to-br from-purple-300 to-indigo-600"}`}
                >
                  <HeartPulse className="m-5 size-8 text-white/60" />
                </div>
                <div className="p-5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-saffron-500">
                    {cat}
                  </p>
                  <h3 className="mt-2 text-base font-bold">{title}</h3>
                  <p className="mt-3 text-[10px] text-slate-400">
                    {time} · By Dr. Your Name
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <div className="flex items-center gap-2">
              <MessageCircle className="size-5 text-leaf-500" />
              <h2 className="text-lg font-bold">Ask the clinic</h2>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Have a general question before booking? Send a message. Replies
              may not be immediate, and this channel is not for emergencies.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <input className="input" placeholder="Your name" />
              <input className="input" placeholder="Email or phone" />
            </div>
            <textarea
              className="input mt-3 min-h-24 py-3"
              placeholder="Your question…"
            />
            <Button className="mt-3">
              <Mail className="size-4" />
              Send question
            </Button>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-2">
              <Star className="size-5 fill-amber-400 text-amber-400" />
              <h2 className="text-lg font-bold">Patient experiences</h2>
            </div>
            <blockquote className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
              “The doctor listened with patience and explained the plan clearly.
              Booking online was simple, and the clinic followed up
              thoughtfully.”
            </blockquote>
            <p className="mt-4 text-xs font-bold">
              Verified patient{" "}
              <span className="font-normal text-slate-400">· Bengaluru</span>
            </p>
            <p className="mt-5 text-[9px] text-slate-400">
              Reviews can only be submitted after a completed appointment and
              are moderated in Admin.
            </p>
          </div>
        </div>
      </section>
      <section className="pb-16">
        <div className="container-page space-y-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-[10px] leading-5 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <b>Medical disclaimer:</b> The information on this website is
            provided for general educational purposes only and is not a
            substitute for professional medical advice, diagnosis, or treatment.
            Always consult a qualified healthcare professional for your specific
            health concerns.
          </div>
          <div className="flex gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-[10px] leading-5 text-rose-700 dark:text-rose-300">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <p>
              <b>Emergency notice:</b> If you are experiencing a medical
              emergency, contact your local emergency services or visit the
              nearest hospital immediately. This website is not intended for
              emergency medical care.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
