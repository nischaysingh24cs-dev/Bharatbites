"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Flame,
  Gauge,
  GlassWater,
  Mic,
  Minus,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2
} from "lucide-react";
import { useMemo, useState } from "react";
import { foods } from "@/data/foods";
import { getFoodAdvice } from "@/lib/advisor";
import { calculateBMI } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button } from "@/components/ui/button";

type Log = { id: string; foodId: string; count: number; at: string };
export function TrackerClient() {
  const [selectedId, setSelectedId] = useState("pani-puri");
  const [count, setCount] = useState(6);
  const [logs, setLogs] = useLocalStorage<Log[]>("bb-food-logs", []);
  const [water, setWater] = useLocalStorage("bb-water-glasses", 6);
  const [listening, setListening] = useState(false);
  const [voiceNote, setVoiceNote] = useState("");
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(68);
  const selected = foods.find((food) => food.id === selectedId) ?? foods[0];
  const portionFactor = selected.name === "Pani Puri" ? count / 6 : count;
  const advice = getFoodAdvice(selected, count);
  const summary = useMemo(
    () =>
      logs.reduce(
        (acc, log) => {
          const food = foods.find((f) => f.id === log.foodId);
          if (!food) return acc;
          const factor = food.name === "Pani Puri" ? log.count / 6 : log.count;
          acc.calories += food.calories * factor;
          acc.protein += food.protein * factor;
          acc.carbs += food.carbs * factor;
          acc.fat += food.fat * factor;
          return acc;
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
      ),
    [logs]
  );
  const bmi = calculateBMI(height, weight);
  function addLog() {
    if (count <= 0) return;
    setLogs([
      ...logs,
      {
        id: crypto.randomUUID(),
        foodId: selected.id,
        count,
        at: new Date().toISOString()
      }
    ]);
  }
  function startVoice() {
    const Recognition =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Recognition) {
      setVoiceNote(
        "Voice input is unavailable in this browser. Try Chrome or Edge."
      );
      return;
    }
    const recognition = new Recognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    setListening(true);
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setVoiceNote(`Heard: “${text}”`);
      const number = Number(text.match(/\d+/)?.[0] ?? 1);
      const match = foods.find((food) =>
        text.toLowerCase().includes(food.name.toLowerCase())
      );
      if (match) {
        setSelectedId(match.id);
        setCount(number);
      }
    };
    recognition.onerror = () =>
      setVoiceNote("Could not hear that clearly. Please try again.");
    recognition.onend = () => setListening(false);
    recognition.start();
  }
  return (
    <>
      <section className="bg-ink-950 pb-32 pt-14 text-white">
        <div className="container-page">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-saffron-500/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-saffron-400">
                <Sparkles className="size-3" />
                Mindful food tracker
              </div>
              <h1 className="mt-5 max-w-3xl text-balance text-4xl font-extrabold tracking-[-.04em] sm:text-6xl">
                Track every bite.{" "}
                <span className="text-saffron-400">No judgement.</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/60">
                Log Indian portions, see instant nutrition estimates and receive
                gentle AI guidance.
              </p>
            </div>
            <button
              onClick={startVoice}
              className={`flex h-12 items-center gap-2 rounded-full border px-5 text-xs font-bold transition ${listening ? "border-rose-400 bg-rose-500/15 text-rose-300" : "border-white/15 bg-white/5 text-white hover:bg-white/10"}`}
            >
              <Mic className={`size-4 ${listening ? "animate-pulse" : ""}`} />
              {listening ? "Listening…" : "Say “I ate 12 pani puri”"}
            </button>
          </div>
          {voiceNote && (
            <p className="mt-4 text-xs text-white/50">{voiceNote}</p>
          )}
        </div>
      </section>
      <section className="relative -mt-20 pb-20">
        <div className="container-page grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
          <div className="card p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.16em] text-saffron-500">
                  Quick log
                </p>
                <h2 className="mt-1 text-xl font-bold">What did you enjoy?</h2>
              </div>
              <label className="relative">
                <select
                  value={selectedId}
                  onChange={(e) => {
                    setSelectedId(e.target.value);
                    setCount(e.target.value === "pani-puri" ? 6 : 1);
                  }}
                  className="input appearance-none pr-10"
                >
                  <option value="" disabled>
                    Choose food
                  </option>
                  {foods.map((food) => (
                    <option key={food.id} value={food.id}>
                      {food.name} · {food.state}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-4 size-4 text-slate-400" />
              </label>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-[.9fr_1.1fr]">
              <div className="relative min-h-[300px] overflow-hidden rounded-[22px]">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  sizes="420px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-5 left-5 text-white">
                  <p className="text-saffron-300 text-[10px] font-bold uppercase tracking-wider">
                    {selected.state}
                  </p>
                  <h3 className="mt-1 text-2xl font-extrabold">
                    {selected.name}
                  </h3>
                  <p className="mt-1 text-[10px] text-white/60">
                    1 portion · {selected.portion}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center rounded-[22px] bg-slate-50 p-5 dark:bg-white/[0.05]">
                <p className="text-center text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">
                  {selected.name === "Pani Puri"
                    ? "Pieces today"
                    : "Servings today"}
                </p>
                <div className="mt-4 flex items-center justify-center gap-6">
                  <button
                    onClick={() => setCount(Math.max(0, count - 1))}
                    className="grid size-12 place-items-center rounded-full border border-black/10 bg-white transition hover:border-saffron-500 dark:border-white/10 dark:bg-white/10"
                  >
                    <Minus className="size-5" />
                  </button>
                  <AnimatePresence mode="popLayout">
                    <motion.b
                      key={count}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="min-w-16 text-center text-6xl tracking-tighter"
                    >
                      {count}
                    </motion.b>
                  </AnimatePresence>
                  <button
                    onClick={() => setCount(count + 1)}
                    className="grid size-12 place-items-center rounded-full bg-saffron-500 text-white shadow-glow transition hover:scale-105"
                  >
                    <Plus className="size-5" />
                  </button>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-white p-3 dark:bg-white/[0.06]">
                    <b className="text-lg text-saffron-500">
                      {Math.round(selected.calories * portionFactor)}
                    </b>
                    <p className="text-[9px] uppercase text-slate-400">
                      Calories
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-3 dark:bg-white/[0.06]">
                    <b className="text-lg text-leaf-500">
                      {Math.round(selected.protein * portionFactor)}g
                    </b>
                    <p className="text-[9px] uppercase text-slate-400">
                      Protein
                    </p>
                  </div>
                </div>
                <Button className="mt-4 w-full" onClick={addLog}>
                  <Check className="size-4" />
                  Add to today
                </Button>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-saffron-500/20 bg-saffron-500/[0.07] p-4">
              <div className="flex gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-saffron-500 text-white">
                  <Sparkles className="size-4" />
                </span>
                <div>
                  <p className="text-xs font-bold">{advice.title}</p>
                  <p className="mt-1 text-[11px] leading-5 text-slate-600 dark:text-slate-300">
                    {advice.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <div className="card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Today&apos;s intake
                  </p>
                  <h2 className="mt-1 text-xl font-bold">Your nutrition</h2>
                </div>
                <span className="grid size-10 place-items-center rounded-xl bg-saffron-500/10">
                  <Flame className="size-5 text-saffron-500" />
                </span>
              </div>
              <div className="mt-5 flex items-end gap-2">
                <b className="text-4xl tracking-tight">
                  {Math.round(summary.calories)}
                </b>
                <span className="mb-1 text-xs text-slate-400">
                  / 2,050 kcal
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-saffron-500 to-amber-400"
                  style={{
                    width: `${Math.min(100, (summary.calories / 2050) * 100)}%`
                  }}
                />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  [`${Math.round(summary.protein)}g`, `Protein`],
                  [`${Math.round(summary.carbs)}g`, `Carbs`],
                  [`${Math.round(summary.fat)}g`, `Fat`]
                ].map(([v, l]) => (
                  <div
                    key={l}
                    className="rounded-xl bg-slate-50 p-3 dark:bg-white/[0.05]"
                  >
                    <b className="text-sm">{v}</b>
                    <p className="text-[9px] text-slate-400">{l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {logs
                  .slice(-3)
                  .reverse()
                  .map((log) => {
                    const f = foods.find((x) => x.id === log.foodId);
                    return f ? (
                      <div
                        key={log.id}
                        className="flex items-center justify-between rounded-xl border border-black/[0.06] p-2.5 text-xs dark:border-white/10"
                      >
                        <span>
                          {f.name}{" "}
                          <small className="text-slate-400">
                            × {log.count}
                          </small>
                        </span>
                        <button
                          onClick={() =>
                            setLogs(logs.filter((x) => x.id !== log.id))
                          }
                          aria-label="Delete log"
                        >
                          <Trash2 className="size-3.5 text-slate-400 hover:text-rose-500" />
                        </button>
                      </div>
                    ) : null;
                  })}
              </div>
              {logs.length > 0 && (
                <button
                  onClick={() => setLogs([])}
                  className="mt-4 flex items-center gap-1 text-[10px] text-slate-400 hover:text-rose-500"
                >
                  <RotateCcw className="size-3" />
                  Clear today
                </button>
              )}
            </div>
            <div className="card p-5" id="water">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-500">
                    Water tracker
                  </p>
                  <h2 className="mt-1 text-lg font-bold">Stay refreshed</h2>
                </div>
                <GlassWater className="size-6 text-blue-500" />
              </div>
              <div className="mt-4 flex gap-1.5">
                {Array.from({ length: 10 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setWater(i + 1)}
                    aria-label={`Set water to ${i + 1} glasses`}
                    className={`h-12 flex-1 rounded-lg transition ${i < water ? "bg-blue-500" : "bg-blue-500/10"}`}
                  />
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500">
                <span>
                  {water} glasses · {water * 250} ml
                </span>
                <span>{Math.max(0, 10 - water)} remaining</span>
              </div>
            </div>
          </div>
        </div>
        <div className="container-page mt-5" id="bmi">
          <div className="card grid gap-6 p-5 sm:p-7 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-leaf-600">
                <Gauge className="size-4" />
                BMI calculator
              </div>
              <h2 className="mt-3 text-2xl font-bold">
                A simple health reference
              </h2>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                BMI is a screening tool—not a diagnosis. Bodies and health are
                more nuanced than one number.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_1fr_1.2fr]">
              <label>
                <span className="label">Height (cm)</span>
                <input
                  type="number"
                  className="input"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                />
              </label>
              <label>
                <span className="label">Weight (kg)</span>
                <input
                  type="number"
                  className="input"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                />
              </label>
              <div className="rounded-2xl bg-leaf-500/10 p-4">
                <p className="text-[10px] font-bold uppercase text-leaf-600">
                  Your BMI
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <b className="text-3xl text-leaf-600">{bmi?.score ?? "—"}</b>
                  <span className="text-xs font-semibold">{bmi?.category}</span>
                </div>
                <p className="mt-2 text-[9px] leading-4 text-slate-500">
                  {bmi?.suggestion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
