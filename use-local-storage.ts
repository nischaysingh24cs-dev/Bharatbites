"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Activity,
  Clock3,
  Dumbbell,
  Flame,
  Play,
  Sparkles,
  Timer,
  Trophy
} from "lucide-react";

const exercises = [
  {
    name: "Sun Salutation Flow",
    audience: "Women",
    category: "Home Workout",
    goal: "Weight Loss",
    level: "Beginner",
    duration: "12 min",
    calories: 85,
    instruction:
      "Move through 6 slow rounds. Match each reach and fold to your breath."
  },
  {
    name: "Bodyweight Strength Circuit",
    audience: "Men",
    category: "Home Workout",
    goal: "Muscle Gain",
    level: "Beginner",
    duration: "20 min",
    calories: 145,
    instruction:
      "Complete squats, incline push-ups, glute bridges and a supported plank."
  },
  {
    name: "Low-Impact Cardio",
    audience: "Women",
    category: "Home Workout",
    goal: "Weight Loss",
    level: "Beginner",
    duration: "18 min",
    calories: 130,
    instruction:
      "Alternate marching, step touches and controlled knee drives for 3 rounds."
  },
  {
    name: "Dumbbell Full Body",
    audience: "Men",
    category: "Gym Workout",
    goal: "Muscle Gain",
    level: "Intermediate",
    duration: "35 min",
    calories: 260,
    instruction:
      "Perform goblet squats, rows, chest press and Romanian deadlifts with control."
  },
  {
    name: "Core & Mobility Reset",
    audience: "Women",
    category: "Home Workout",
    goal: "Weight Loss",
    level: "Intermediate",
    duration: "15 min",
    calories: 95,
    instruction:
      "Flow through dead bugs, bird dogs, side planks and hip mobility drills."
  },
  {
    name: "Upper Body Builder",
    audience: "Men",
    category: "Gym Workout",
    goal: "Muscle Gain",
    level: "Advanced",
    duration: "45 min",
    calories: 310,
    instruction:
      "Use progressive sets of presses, pulldowns, rows and arm accessories."
  },
  {
    name: "Lower Body Strength",
    audience: "Women",
    category: "Gym Workout",
    goal: "Muscle Gain",
    level: "Advanced",
    duration: "42 min",
    calories: 290,
    instruction:
      "Train squats, hip thrusts, split squats and hamstring curls with safe form."
  },
  {
    name: "HIIT Express",
    audience: "Men",
    category: "Home Workout",
    goal: "Weight Loss",
    level: "Advanced",
    duration: "16 min",
    calories: 210,
    instruction:
      "Work for 30 seconds and recover for 30 across four low-equipment movements."
  }
];
const filters = [
  "All",
  "Weight Loss",
  "Muscle Gain",
  "Home Workout",
  "Gym Workout",
  "Beginner",
  "Intermediate",
  "Advanced"
];
export function ExerciseClient() {
  const [audience, setAudience] = useState("Women");
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<string | null>(null);
  const shown = useMemo(
    () =>
      exercises.filter(
        (e) =>
          e.audience === audience &&
          (filter === "All" ||
            e.category === filter ||
            e.goal === filter ||
            e.level === filter)
      ),
    [audience, filter]
  );
  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 py-16 text-white sm:py-20">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-leaf-500/10 to-transparent" />
        <div className="container-page relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-saffron-500/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-saffron-400">
              <Activity className="size-3.5" />
              Movement library
            </div>
            <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-[-.045em] sm:text-6xl">
              Move your body.{" "}
              <span className="text-leaf-400">Build your rhythm.</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/60">
              Thoughtful home and gym sessions for every level—clear, inclusive
              and easy to follow.
            </p>
            <div className="mt-7 flex gap-2">
              {["Women", "Men"].map((x) => (
                <button
                  onClick={() => setAudience(x)}
                  key={x}
                  className={`rounded-full px-5 py-2.5 text-xs font-bold transition ${audience === x ? "bg-white text-ink-950" : "border border-white/15 text-white"}`}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-2">
            <div className="relative h-80 overflow-hidden rounded-[21px]">
              <Image
                src="/images/exercise-yoga.png"
                alt="Guided home workout"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="rounded-full bg-leaf-500 px-2.5 py-1 text-[9px] font-bold uppercase">
                  Today&apos;s pick
                </span>
                <h2 className="mt-2 text-2xl font-bold">Gentle power flow</h2>
                <p className="mt-1 text-xs text-white/60">
                  18 min · Beginner · 120 kcal
                </p>
              </div>
              <button className="absolute right-5 top-5 grid size-12 place-items-center rounded-full bg-white text-ink-950 shadow-xl">
                <Play className="size-4 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-saffron-500">
                Plans for {audience}
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">
                Choose how you move today
              </h2>
            </div>
            <p className="max-w-sm text-xs leading-5 text-slate-500">
              Estimated calories vary by body and intensity. Stop if you feel
              pain, dizziness or unusual discomfort.
            </p>
          </div>
          <div className="hide-scrollbar mt-6 flex gap-2 overflow-x-auto pb-2">
            {filters.map((x) => (
              <button
                key={x}
                onClick={() => setFilter(x)}
                className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-[10px] font-semibold transition ${filter === x ? "border-saffron-500 bg-saffron-500 text-white" : "border-black/10 text-slate-500 dark:border-white/10"}`}
              >
                {x}
              </button>
            ))}
          </div>
          <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((ex, i) => (
              <article
                key={ex.name}
                className="group overflow-hidden rounded-[24px] border border-black/[0.07] bg-white shadow-soft dark:border-white/10 dark:bg-white/[0.05]"
              >
                <div
                  className={`relative h-44 overflow-hidden ${i % 2 ? "bg-gradient-to-br from-saffron-400 to-rose-500" : "bg-gradient-to-br from-leaf-400 to-emerald-700"}`}
                >
                  {i === 0 ? (
                    <Image
                      src="/images/exercise-yoga.png"
                      alt={ex.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center">
                      <Dumbbell className="size-20 text-white/25" />
                      <div className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-[9px] font-bold uppercase text-white backdrop-blur">
                        {ex.category}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() =>
                      setActive(active === ex.name ? null : ex.name)
                    }
                    className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-white text-ink-950 shadow-xl"
                  >
                    <Play className="size-3.5 fill-current" />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-leaf-600">
                        {ex.goal}
                      </p>
                      <h3 className="mt-1 text-lg font-bold">{ex.name}</h3>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-semibold text-slate-500 dark:bg-white/10">
                      {ex.level}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-4 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock3 className="size-3.5" />
                      {ex.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="size-3.5 text-saffron-500" />~
                      {ex.calories} kcal
                    </span>
                  </div>
                  {active === ex.name && (
                    <div className="mt-4 rounded-xl bg-leaf-500/10 p-3 text-[10px] leading-5 text-slate-600 dark:text-slate-300">
                      <b className="block text-leaf-600">How to begin</b>
                      {ex.instruction}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
          {shown.length === 0 && (
            <div className="mt-8 rounded-2xl border border-dashed p-16 text-center text-sm text-slate-500">
              No sessions match this filter yet.
            </div>
          )}
        </div>
      </section>
      <section className="bg-[#faf7f1] py-16 dark:bg-white/[0.025]">
        <div className="container-page grid gap-4 sm:grid-cols-3">
          {[
            [
              Timer,
              "Start where you are",
              "Short sessions count. Consistency beats intensity."
            ],
            [
              Trophy,
              "Celebrate the streak",
              "Unlock achievements as movement becomes routine."
            ],
            [
              Sparkles,
              "Smart recommendations",
              "Plans adapt to your goal, level and available equipment."
            ]
          ].map(([Icon, title, text]) => (
            <div key={title as string} className="card p-5">
              <Icon className="size-5 text-saffron-500" />
              <h3 className="mt-4 text-sm font-bold">{title as string}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                {text as string}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
