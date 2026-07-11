"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Droplets,
  Flame,
  Leaf,
  Loader2,
  Sparkles,
  Target,
  Utensils
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateDietPlan } from "@/lib/diet";
import type { DietPlanInput, DietPreference, Goal } from "@/types";

const defaults: DietPlanInput = {
  age: 29,
  height: 170,
  weight: 68,
  gender: "Female",
  activity: "Moderate",
  goal: "Maintain weight",
  preference: "Vegetarian"
};
const mealLabels = {
  breakfast: ["Breakfast", "8:00 AM"],
  lunch: ["Lunch", "1:00 PM"],
  snack: ["Snack", "4:30 PM"],
  dinner: ["Dinner", "8:00 PM"]
};
export function DietPlannerClient() {
  const [form, setForm] = useState(defaults);
  const [plan, setPlan] = useState<ReturnType<typeof generateDietPlan> | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  function update<K extends keyof DietPlanInput>(
    key: K,
    value: DietPlanInput[K]
  ) {
    setForm({ ...form, [key]: value });
  }
  function generate() {
    setLoading(true);
    setTimeout(() => {
      setPlan(generateDietPlan(form));
      setLoading(false);
    }, 600);
  }
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-leaf-50 to-[#fffdf9] py-16 dark:from-leaf-500/[0.08] dark:to-ink-950 sm:py-20">
        <div className="container-page text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-leaf-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-leaf-600">
            <Brain className="size-3.5" />
            AI diet planner
          </div>
          <h1 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-extrabold tracking-[-.045em] sm:text-6xl">
            A meal plan made for{" "}
            <span className="text-leaf-500">your real life.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            Indian food. Your preferences. Your goals. One practical starting
            point—generated in seconds.
          </p>
        </div>
      </section>
      <section className="pb-20">
        <div className="container-page grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
          <div className="card h-fit p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-saffron-500/10 text-saffron-500">
                <Target className="size-5" />
              </span>
              <div>
                <h2 className="font-bold">Tell us about you</h2>
                <p className="text-[10px] text-slate-400">
                  Takes less than a minute
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <label>
                <span className="label">Age</span>
                <input
                  className="input"
                  type="number"
                  value={form.age}
                  onChange={(e) => update("age", Number(e.target.value))}
                />
              </label>
              <label>
                <span className="label">Gender</span>
                <select
                  className="input"
                  value={form.gender}
                  onChange={(e) => update("gender", e.target.value)}
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                <span className="label">Height (cm)</span>
                <input
                  className="input"
                  type="number"
                  value={form.height}
                  onChange={(e) => update("height", Number(e.target.value))}
                />
              </label>
              <label>
                <span className="label">Weight (kg)</span>
                <input
                  className="input"
                  type="number"
                  value={form.weight}
                  onChange={(e) => update("weight", Number(e.target.value))}
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="label">Activity level</span>
              <select
                className="input"
                value={form.activity}
                onChange={(e) => update("activity", e.target.value)}
              >
                <option>Low</option>
                <option>Moderate</option>
                <option>High</option>
              </select>
            </label>
            <div className="mt-4">
              <span className="label">Your goal</span>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    "Weight loss",
                    "Weight gain",
                    "Maintain weight",
                    "Muscle building"
                  ] as Goal[]
                ).map((goal) => (
                  <button
                    onClick={() => update("goal", goal)}
                    key={goal}
                    className={`rounded-xl border p-3 text-left text-[10px] font-semibold transition ${form.goal === goal ? "border-saffron-500 bg-saffron-500/10 text-saffron-600" : "border-black/10 text-slate-500 dark:border-white/10"}`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <span className="label">Food preference</span>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    "Vegetarian",
                    "Non-Vegetarian",
                    "Vegan",
                    "Jain"
                  ] as DietPreference[]
                ).map((pref) => (
                  <button
                    onClick={() => update("preference", pref)}
                    key={pref}
                    className={`rounded-full border px-3 py-2 text-[10px] font-semibold transition ${form.preference === pref ? "border-leaf-500 bg-leaf-500 text-white" : "border-black/10 text-slate-500 dark:border-white/10"}`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>
            <Button
              className="mt-6 w-full"
              size="lg"
              onClick={generate}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" />
              )}
              {loading ? "Designing your day…" : "Generate my plan"}
            </Button>
          </div>
          <div>
            {!plan ? (
              <div className="grid min-h-[650px] place-items-center rounded-[28px] border border-dashed border-black/10 bg-white/40 p-8 text-center dark:border-white/10 dark:bg-white/[0.025]">
                <div>
                  <span className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-leaf-500/15 to-saffron-500/15">
                    <Utensils className="size-8 text-leaf-500" />
                  </span>
                  <h2 className="mt-5 text-2xl font-bold">
                    Your plan will appear here
                  </h2>
                  <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500">
                    Complete your profile and we&apos;ll estimate daily energy,
                    protein, water and balanced Indian meal ideas.
                  </p>
                  <div className="mx-auto mt-6 flex max-w-sm flex-wrap justify-center gap-2">
                    {[
                      "Indian meals",
                      "Smart portions",
                      "Macro targets",
                      "Hydration"
                    ].map((x) => (
                      <span
                        key={x}
                        className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] text-slate-500 dark:bg-white/5"
                      >
                        ✓ {x}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-[28px] border border-black/[0.07] bg-white shadow-soft dark:border-white/10 dark:bg-white/[0.05]"
              >
                <div className="bg-ink-950 p-6 text-white">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-saffron-400">
                        <Sparkles className="size-3.5" />
                        Personalised day plan
                      </div>
                      <h2 className="mt-2 text-2xl font-bold">
                        {form.preference} · {form.goal}
                      </h2>
                    </div>
                    <span className="rounded-full bg-leaf-500 px-3 py-1.5 text-[10px] font-bold">
                      AI generated
                    </span>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                      {
                        Icon: Flame,
                        value: String(plan.calories),
                        label: "kcal target"
                      },
                      {
                        Icon: Leaf,
                        value: `${plan.protein}g`,
                        label: "protein"
                      },
                      {
                        Icon: Droplets,
                        value: `${(plan.water / 1000).toFixed(1)}L`,
                        label: "water"
                      }
                    ].map(({ Icon, value, label }) => (
                      <div key={label} className="rounded-2xl bg-white/10 p-3">
                        <Icon className="size-4 text-saffron-400" />
                        <b className="mt-2 block text-lg">{value}</b>
                        <small className="text-[9px] text-white/50">
                          {label}
                        </small>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5 sm:p-7">
                  <div className="space-y-3">
                    {Object.entries(plan.meals).map(([key, meal], i) => {
                      const [label, time] =
                        mealLabels[key as keyof typeof mealLabels];
                      return (
                        <div
                          key={key}
                          className="grid grid-cols-[42px_1fr_auto] items-center gap-3 rounded-2xl border border-black/[0.06] p-4 dark:border-white/10"
                        >
                          <span
                            className={`grid size-10 place-items-center rounded-xl ${i % 2 ? "bg-saffron-500/10 text-saffron-500" : "bg-leaf-500/10 text-leaf-500"}`}
                          >
                            <Utensils className="size-4" />
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <b className="text-xs">{label}</b>
                              <small className="text-[9px] text-slate-400">
                                {time}
                              </small>
                            </div>
                            <p className="mt-1 text-[10px] text-slate-500">
                              {meal}
                            </p>
                          </div>
                          <CheckCircle2 className="size-4 text-leaf-500" />
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-5 rounded-2xl bg-leaf-500/10 p-4">
                    <p className="text-[10px] leading-5 text-slate-600 dark:text-slate-300">
                      <b>Good to know:</b> {plan.note}
                    </p>
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    Save this plan <ArrowRight className="size-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
