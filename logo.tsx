"use client";

import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Clock3,
  ImageUp,
  LayoutDashboard,
  MessageSquare,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Stethoscope,
  Trash2,
  Users,
  Utensils
} from "lucide-react";
import { foods } from "@/data/foods";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const nav = [
  [LayoutDashboard, "Overview"],
  [Utensils, "Foods"],
  [Users, "Users"],
  [CalendarDays, "Appointments"],
  [Stethoscope, "Doctor profile"],
  [BookOpen, "Blog posts"],
  [Star, "Reviews"],
  [ImageUp, "Clinic gallery"],
  [Settings, "Settings"]
] as const;
const trend = [
  { d: "Mon", v: 120 },
  { d: "Tue", v: 190 },
  { d: "Wed", v: 170 },
  { d: "Thu", v: 230 },
  { d: "Fri", v: 210 },
  { d: "Sat", v: 280 },
  { d: "Sun", v: 320 }
];
export function AdminClient() {
  const [active, setActive] = useState("Overview");
  const [foodRows, setFoodRows] = useState(foods.slice(0, 8));
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050a07]">
      <div className="container-page flex gap-5 py-6">
        <aside className="sticky top-24 hidden h-[calc(100vh-120px)] w-56 shrink-0 flex-col rounded-[24px] border border-black/[0.07] bg-white p-4 shadow-soft dark:border-white/10 dark:bg-white/[0.055] lg:flex">
          <Logo />
          <div className="mt-7 flex-1 space-y-1">
            {nav.map(([Icon, label]) => (
              <button
                key={label}
                onClick={() => setActive(label)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition ${active === label ? "bg-saffron-500 text-white" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5"}`}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
          <div className="rounded-xl bg-leaf-500/10 p-3">
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-leaf-600">
              <ShieldCheck className="size-3.5" />
              Admin protected
            </div>
            <p className="mt-1 text-[8px] leading-4 text-slate-500">
              Clerk role checks activate when keys are configured.
            </p>
          </div>
        </aside>
        <main className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                BharatBites Admin
              </p>
              <h1 className="mt-1 text-3xl font-extrabold">{active}</h1>
            </div>
            <div className="flex gap-2">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-3 size-4 text-slate-400" />
                <input
                  className="input h-10 pl-9"
                  placeholder="Search admin…"
                />
              </div>
              <Button>
                <Plus className="size-4" />
                Create new
              </Button>
            </div>
          </div>
          {active === "Overview" && (
            <div className="mt-6">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  [Users, "4,862", "Total users", "+12.4%"],
                  [Utensils, "18,490", "Meals this month", "+8.2%"],
                  [CalendarDays, "42", "Appointments", "+5.1%"],
                  [BookOpen, "18", "Published posts", "+2 new"]
                ].map(([Icon, v, l, c]) => (
                  <div key={l as string} className="card p-5">
                    <div className="flex justify-between">
                      <span className="grid size-9 place-items-center rounded-xl bg-saffron-500/10 text-saffron-500">
                        <Icon className="size-4" />
                      </span>
                      <span className="text-[9px] font-bold text-leaf-600">
                        {c as string}
                      </span>
                    </div>
                    <b className="mt-4 block text-2xl">{v as string}</b>
                    <p className="text-[9px] text-slate-400">{l as string}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-4 xl:grid-cols-[1.3fr_.7fr]">
                <div className="card p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold">Platform activity</h2>
                      <p className="mt-1 text-[9px] text-slate-400">
                        Meals logged this week
                      </p>
                    </div>
                    <BarChart3 className="size-4 text-saffron-500" />
                  </div>
                  <div className="mt-4 h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trend}>
                        <defs>
                          <linearGradient
                            id="admin"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0"
                              stopColor="#ff6b00"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="1"
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
                            border: "none",
                            borderRadius: 12,
                            fontSize: 10
                          }}
                        />
                        <Area
                          dataKey="v"
                          stroke="#ff6b00"
                          strokeWidth={2.5}
                          fill="url(#admin)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="card p-5">
                  <h2 className="text-sm font-bold">Today&apos;s schedule</h2>
                  <div className="mt-4 space-y-2">
                    {[
                      ["10:00 AM", "Priya S.", "Video"],
                      ["11:30 AM", "Rahul K.", "In person"],
                      ["4:30 PM", "Anita M.", "Phone"],
                      ["6:00 PM", "Vikram R.", "In person"]
                    ].map((x) => (
                      <div
                        key={x[0]}
                        className="flex items-center justify-between rounded-xl border border-black/[0.06] p-2.5 dark:border-white/10"
                      >
                        <span className="flex items-center gap-2">
                          <Clock3 className="size-3.5 text-leaf-500" />
                          <span>
                            <b className="block text-[10px]">{x[1]}</b>
                            <small className="text-[8px] text-slate-400">
                              {x[0]} · {x[2]}
                            </small>
                          </span>
                        </span>
                        <ChevronRight className="size-3.5 text-slate-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {active === "Foods" && (
            <div className="card mt-6 overflow-hidden">
              <div className="flex items-center justify-between border-b border-black/[0.06] p-5 dark:border-white/10">
                <div>
                  <h2 className="text-sm font-bold">Food library</h2>
                  <p className="mt-1 text-[9px] text-slate-400">
                    {foods.length} records · Supabase ready
                  </p>
                </div>
                <Button size="sm">
                  <Plus className="size-3.5" />
                  Add food
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left">
                  <thead>
                    <tr className="border-b border-black/[0.06] text-[9px] uppercase tracking-wider text-slate-400 dark:border-white/10">
                      {[
                        "Dish",
                        "State",
                        "Type",
                        "Calories",
                        "Health",
                        "Actions"
                      ].map((x) => (
                        <th key={x} className="px-5 py-3">
                          {x}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {foodRows.map((food) => (
                      <tr
                        key={food.id}
                        className="border-b border-black/[0.05] text-xs dark:border-white/10"
                      >
                        <td className="px-5 py-3 font-semibold">{food.name}</td>
                        <td className="px-5 py-3 text-slate-500">
                          {food.state}
                        </td>
                        <td className="px-5 py-3">
                          <span className="rounded-full bg-leaf-500/10 px-2 py-1 text-[9px] text-leaf-600">
                            {food.type}
                          </span>
                        </td>
                        <td className="px-5 py-3">{food.calories}</td>
                        <td className="px-5 py-3">{food.healthRating}%</td>
                        <td className="px-5 py-3">
                          <div className="flex gap-2">
                            <button className="text-[10px] font-semibold text-saffron-500">
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                setFoodRows(
                                  foodRows.filter((x) => x.id !== food.id)
                                )
                              }
                            >
                              <Trash2 className="size-3.5 text-slate-400 hover:text-rose-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {!["Overview", "Foods"].includes(active) && (
            <div className="mt-6 grid min-h-[520px] place-items-center rounded-[24px] border border-dashed border-black/10 bg-white/50 text-center dark:border-white/10 dark:bg-white/[0.025]">
              <div>
                <MessageSquare className="mx-auto size-10 text-slate-300" />
                <h2 className="mt-4 text-lg font-bold">{active} management</h2>
                <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500">
                  This workspace is connected to the schema and API layer.
                  Configure Supabase and Clerk to manage live records securely.
                </p>
                <Button variant="outline" className="mt-5">
                  Configure {active.toLowerCase()}
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
