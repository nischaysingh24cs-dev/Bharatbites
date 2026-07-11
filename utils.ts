"use client";

import Link from "next/link";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import {
  Check,
  ChevronRight,
  Droplets,
  Flame,
  Footprints,
  Sparkles,
  Trophy
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

const chart = [
  { d: "M", v: 1420 },
  { d: "T", v: 1780 },
  { d: "W", v: 1630 },
  { d: "T", v: 1860 },
  { d: "F", v: 1570 },
  { d: "S", v: 1730 },
  { d: "S", v: 1460 }
];
export function DashboardPreview() {
  return (
    <section className="bg-[#faf7f1] py-20 dark:bg-white/[0.025] sm:py-28">
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="Your progress, beautifully clear"
          title="Small wins become lasting habits"
          description="A calm dashboard turns your meals, water, movement and streaks into progress you can feel."
        />
        <div className="mx-auto mt-12 max-w-5xl rounded-[30px] border border-black/[0.07] bg-white p-3 shadow-[0_35px_90px_-40px_rgba(17,24,20,.4)] dark:border-white/10 dark:bg-[#111a15] sm:p-6">
          <div className="flex items-center justify-between px-2 pb-5">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Sunday, 12 July
              </p>
              <h3 className="mt-1 text-xl font-bold">
                Namaste, Aarav <span aria-hidden>👋</span>
              </h3>
            </div>
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Open dashboard <ChevronRight className="size-3.5" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                Flame,
                "1,460",
                "of 2,050 kcal",
                "bg-saffron-500/10 text-saffron-500"
              ],
              [
                Droplets,
                "6 / 10",
                "glasses today",
                "bg-blue-500/10 text-blue-500"
              ],
              [
                Footprints,
                "7,842",
                "steps today",
                "bg-leaf-500/10 text-leaf-500"
              ],
              [
                Trophy,
                "12 days",
                "current streak",
                "bg-purple-500/10 text-purple-500"
              ]
            ].map(([Icon, value, label, style]) => (
              <div
                key={label as string}
                className="rounded-2xl border border-black/[0.06] p-4 dark:border-white/10"
              >
                <div
                  className={`grid size-8 place-items-center rounded-xl ${style}`}
                >
                  <Icon className="size-4" />
                </div>
                <b className="mt-3 block text-xl">{value as string}</b>
                <small className="text-[10px] text-slate-400">
                  {label as string}
                </small>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-3 lg:grid-cols-[1.45fr_.55fr]">
            <div className="rounded-2xl border border-black/[0.06] p-4 dark:border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold">Weekly nutrition rhythm</p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    Calories logged
                  </p>
                </div>
                <span className="rounded-full bg-leaf-500/10 px-2.5 py-1 text-[9px] font-bold text-leaf-600">
                  ↑ 8% consistency
                </span>
              </div>
              <div className="mt-2 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chart}>
                    <defs>
                      <linearGradient
                        id="chartFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#ff6b00"
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="100%"
                          stopColor="#ff6b00"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="d"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 9, fill: "#94a3b8" }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: "none",
                        fontSize: 11
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke="#ff6b00"
                      strokeWidth={2.5}
                      fill="url(#chartFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-2xl bg-ink-950 p-4 text-white">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-saffron-400">
                <Sparkles className="size-3.5" />
                AI insight
              </div>
              <p className="mt-3 text-sm font-semibold leading-5">
                Your protein is strongest at dinner.
              </p>
              <p className="mt-2 text-[10px] leading-4 text-white/50">
                Add curd, sprouts or eggs at breakfast for steadier energy.
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/10 p-2">
                <span className="grid size-7 place-items-center rounded-lg bg-leaf-500">
                  <Check className="size-3.5" />
                </span>
                <span>
                  <b className="block text-[10px]">Healthy Week</b>
                  <small className="text-[8px] text-white/50">
                    Achievement unlocked
                  </small>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
