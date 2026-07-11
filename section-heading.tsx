"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  Award,
  Bell,
  CheckCircle2,
  ChevronRight,
  Droplets,
  Flame,
  Footprints,
  Heart,
  Medal,
  MoreHorizontal,
  Plus,
  Sparkles,
  Trophy,
  Utensils
} from "lucide-react";
import { Button } from "@/components/ui/button";

const weekly = [
  { day: "Mon", cal: 1680, protein: 72 },
  { day: "Tue", cal: 1940, protein: 86 },
  { day: "Wed", cal: 1780, protein: 80 },
  { day: "Thu", cal: 2020, protein: 91 },
  { day: "Fri", cal: 1840, protein: 84 },
  { day: "Sat", cal: 2100, protein: 96 },
  { day: "Sun", cal: 1460, protein: 68 }
];
const achievements = [
  [Utensils, "First Meal Logged", "Completed"],
  [Droplets, "Water Champion", "8/10 days"],
  [Trophy, "Healthy Week", "Completed"],
  [Footprints, "Fitness Beginner", "4/5 workouts"],
  [Flame, "30-Day Streak", "12/30 days"],
  [Medal, "India Food Explorer", "18/36 regions"]
];
export function DashboardClient() {
  const [period, setPeriod] = useState("Week");
  const [leaderboard, setLeaderboard] = useState(false);
  return (
    <>
      <section className="bg-[#faf7f1] py-10 dark:bg-white/[0.025]">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-slate-500">Sunday, 12 July 2026</p>
              <h1 className="mt-1 text-3xl font-extrabold tracking-tight">
                Namaste, Aarav <span aria-hidden>👋</span>
              </h1>
              <p className="mt-2 text-xs text-slate-500">
                You&apos;re 72% towards today&apos;s goals. Keep going gently.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Bell className="size-4" />
              </Button>
              <Button>
                <Plus className="size-4" />
                Log a meal
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-20 pt-6">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                Flame,
                "1,460",
                "/ 2,050 kcal",
                "71%",
                "from-saffron-500 to-amber-400"
              ],
              [
                Droplets,
                "6 glasses",
                "/ 10 glasses",
                "60%",
                "from-blue-500 to-cyan-400"
              ],
              [
                Footprints,
                "7,842",
                "/ 10,000 steps",
                "78%",
                "from-leaf-500 to-emerald-400"
              ],
              [
                Trophy,
                "12 days",
                "best: 24 days",
                "50%",
                "from-purple-500 to-fuchsia-400"
              ]
            ].map(([Icon, v, l, p, grad]) => (
              <div key={v as string} className="card p-5">
                <div className="flex items-center justify-between">
                  <span
                    className={`grid size-10 place-items-center rounded-xl bg-gradient-to-br ${grad} text-white`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <MoreHorizontal className="size-4 text-slate-300" />
                </div>
                <b className="mt-4 block text-2xl">{v as string}</b>
                <p className="mt-0.5 text-[10px] text-slate-400">
                  {l as string}
                </p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                  <div
                    className={`h-full bg-gradient-to-r ${grad}`}
                    style={{ width: p as string }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.45fr_.55fr]">
            <div className="card p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold">Nutrition overview</h2>
                  <p className="mt-1 text-[10px] text-slate-400">
                    Calories and protein logged
                  </p>
                </div>
                <div className="flex rounded-full bg-slate-100 p-1 dark:bg-white/5">
                  {["Week", "Month"].map((x) => (
                    <button
                      key={x}
                      onClick={() => setPeriod(x)}
                      className={`rounded-full px-3 py-1.5 text-[9px] font-semibold ${period === x ? "bg-white text-ink-950 shadow-sm dark:bg-white dark:text-ink-950" : "text-slate-400"}`}
                    >
                      {x}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-5 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weekly}>
                    <defs>
                      <linearGradient id="dashArea" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0"
                          stopColor="#ff6b00"
                          stopOpacity={0.28}
                        />
                        <stop offset="1" stopColor="#ff6b00" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(148,163,184,.16)"
                    />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#94a3b8" }}
                    />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 14,
                        border: "none",
                        boxShadow: "0 10px 30px rgba(0,0,0,.1)",
                        fontSize: 11
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="cal"
                      stroke="#ff6b00"
                      strokeWidth={2.5}
                      fill="url(#dashArea)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-[24px] bg-ink-950 p-5 text-white shadow-soft">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-saffron-400">
                  <Sparkles className="size-3.5" />
                  AI coach
                </span>
                <span className="rounded-full bg-white/10 px-2 py-1 text-[8px]">
                  Today
                </span>
              </div>
              <h2 className="mt-5 text-xl font-bold">
                A little protein, a lot more balance.
              </h2>
              <p className="mt-3 text-[11px] leading-5 text-white/55">
                Your breakfast averaged 11g protein this week. Add a bowl of
                curd, sprouts, paneer or two eggs for steadier energy.
              </p>
              <button className="mt-5 flex items-center gap-1 text-[10px] font-bold text-saffron-400">
                See meal ideas <ChevronRight className="size-3" />
              </button>
              <div className="mt-6 rounded-2xl bg-white/[0.07] p-3">
                <div className="flex items-center justify-between text-[9px]">
                  <span>Weekly consistency</span>
                  <b className="text-leaf-400">+8%</b>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-white/10">
                  <div className="h-full w-[82%] rounded-full bg-leaf-500" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="card p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold">Your favourites</h2>
                  <p className="mt-1 text-[10px] text-slate-400">
                    Most eaten this month
                  </p>
                </div>
                <Heart className="size-4 text-rose-500" />
              </div>
              <div className="mt-5 space-y-3">
                {[
                  ["Masala Dosa", "Karnataka", "8 times", 82],
                  ["Poha", "Madhya Pradesh", "6 times", 64],
                  ["Rajma Chawal", "Jammu & Kashmir", "5 times", 51],
                  ["Idli Sambar", "Tamil Nadu", "5 times", 48]
                ].map(([name, state, count, width], i) => (
                  <div
                    key={name as string}
                    className="grid grid-cols-[30px_1fr_auto] items-center gap-3"
                  >
                    <span
                      className={`grid size-8 place-items-center rounded-lg text-xs font-bold ${i === 0 ? "bg-saffron-500 text-white" : "bg-slate-100 text-slate-400 dark:bg-white/5"}`}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <b className="block text-xs">{name as string}</b>
                      <small className="text-[9px] text-slate-400">
                        {state as string}
                      </small>
                      <div className="mt-1 h-1 w-full rounded-full bg-slate-100 dark:bg-white/10">
                        <div
                          className="h-full rounded-full bg-saffron-500"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-400">
                      {count as string}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold">Movement this week</h2>
                  <p className="mt-1 text-[10px] text-slate-400">
                    Estimated active minutes
                  </p>
                </div>
                <ActivityIcon />
              </div>
              <div className="mt-4 h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weekly}>
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 9, fill: "#94a3b8" }}
                    />
                    <YAxis hide />
                    <Tooltip
                      cursor={{ fill: "rgba(148,163,184,.06)" }}
                      contentStyle={{
                        borderRadius: 12,
                        border: "none",
                        fontSize: 10
                      }}
                    />
                    <Bar
                      dataKey="protein"
                      fill="#00a86b"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="card mt-4 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold">Achievements</h2>
                <p className="mt-1 text-[10px] text-slate-400">
                  Celebrate every kind of progress
                </p>
              </div>
              <Award className="size-5 text-amber-500" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {achievements.map(([Icon, title, status]) => (
                <div
                  key={title as string}
                  className={`flex items-center gap-3 rounded-2xl border p-3 ${status === "Completed" ? "border-amber-500/20 bg-amber-500/[0.07]" : "border-black/[0.06] dark:border-white/10"}`}
                >
                  <span
                    className={`grid size-10 place-items-center rounded-xl ${status === "Completed" ? "bg-amber-400 text-white" : "bg-slate-100 text-slate-400 dark:bg-white/5"}`}
                  >
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <b className="block truncate text-xs">{title as string}</b>
                    <small className="text-[9px] text-slate-400">
                      {status as string}
                    </small>
                  </span>
                  {status === "Completed" && (
                    <CheckCircle2 className="size-4 text-leaf-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 rounded-[24px] border border-black/[0.07] bg-gradient-to-r from-leaf-500/[0.08] to-saffron-500/[0.08] p-5 dark:border-white/10 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-white shadow-sm dark:bg-white/10">
                <Medal className="size-5 text-saffron-500" />
              </span>
              <div>
                <h2 className="text-sm font-bold">
                  Optional community leaderboard
                </h2>
                <p className="mt-1 text-[10px] text-slate-500">
                  Share only your display name, streak and achievements. Your
                  health data stays private.
                </p>
              </div>
            </div>
            <Button
              onClick={() => setLeaderboard(!leaderboard)}
              variant={leaderboard ? "secondary" : "outline"}
              className="mt-4 sm:mt-0"
            >
              {leaderboard ? "Joined ✓" : "Join leaderboard"}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
function ActivityIcon() {
  return (
    <span className="grid size-8 place-items-center rounded-xl bg-leaf-500/10">
      <Footprints className="size-4 text-leaf-500" />
    </span>
  );
}
