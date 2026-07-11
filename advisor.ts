"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Flame,
  Leaf,
  Search,
  SlidersHorizontal,
  Sparkles,
  X
} from "lucide-react";
import { useMemo, useState } from "react";
import { FoodCard } from "@/components/food-card";
import { Button } from "@/components/ui/button";
import { foods, states } from "@/data/foods";
import type { Food } from "@/types";

export function ExploreClient({
  initialState = "All India"
}: {
  initialState?: string;
}) {
  const [query, setQuery] = useState("");
  const [state, setState] = useState(initialState);
  const [type, setType] = useState("All");
  const [limit, setLimit] = useState(12);
  const [selected, setSelected] = useState<Food | null>(null);
  const filtered = useMemo(
    () =>
      foods.filter((food) => {
        const q = query.toLowerCase();
        return (
          (!q ||
            food.name.toLowerCase().includes(q) ||
            food.state.toLowerCase().includes(q) ||
            food.ingredients.some((i) => i.toLowerCase().includes(q))) &&
          (state === "All India" || food.state === state) &&
          (type === "All" || food.type === type)
        );
      }),
    [query, state, type]
  );
  return (
    <>
      <section className="border-b border-black/[0.06] bg-gradient-to-b from-saffron-50/80 to-[#fffdf9] pb-12 pt-14 dark:border-white/10 dark:from-saffron-500/[0.07] dark:to-ink-950">
        <div className="container-page text-center">
          <div className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-saffron-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-saffron-600">
            <Sparkles className="size-3" />
            India&apos;s food atlas
          </div>
          <h1 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-extrabold tracking-[-.04em] sm:text-6xl">
            Every state has a story.{" "}
            <span className="text-saffron-500">Taste all of them.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            Explore {foods.length}+ curated regional dishes with portions,
            macros, history and a practical health score.
          </p>
          <div className="mx-auto mt-8 flex max-w-2xl items-center rounded-2xl border border-black/10 bg-white p-1.5 shadow-soft dark:border-white/10 dark:bg-white/[0.07]">
            <Search className="ml-3 size-5 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dosa, dal, biryani or an ingredient…"
              className="h-12 min-w-0 flex-1 bg-transparent px-3 text-sm text-ink-950 placeholder:text-slate-400 dark:text-white"
            />
            <Button className="hidden sm:inline-flex">Search foods</Button>
          </div>
        </div>
      </section>
      <section className="py-10">
        <div className="container-page">
          <div className="flex flex-col gap-3 rounded-[22px] border border-black/[0.07] bg-white p-3 dark:border-white/10 dark:bg-white/[0.055] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs font-bold">
              <SlidersHorizontal className="size-4 text-saffron-500" />
              Filter the atlas
            </div>
            <div className="hide-scrollbar flex gap-2 overflow-x-auto">
              <label className="relative">
                <select
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setLimit(12);
                  }}
                  className="h-10 appearance-none rounded-full border border-black/10 bg-white pl-4 pr-8 text-xs font-semibold dark:border-white/10 dark:bg-ink-900"
                >
                  <option>All India</option>
                  {states.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-3 size-3.5 text-slate-400" />
              </label>
              {["All", "Veg", "Vegan", "Non-Veg"].map((item) => (
                <button
                  key={item}
                  onClick={() => setType(item)}
                  className={`h-10 rounded-full px-4 text-xs font-semibold transition ${type === item ? "bg-ink-950 text-white dark:bg-white dark:text-ink-950" : "border border-black/10 text-slate-500 dark:border-white/10"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-7 flex items-center justify-between">
            <p className="text-sm font-semibold">
              <span className="text-saffron-500">{filtered.length}</span> dishes
              found
            </p>
            <p className="text-[10px] text-slate-400">
              Nutrition values are estimates per suggested portion
            </p>
          </div>
          {filtered.length ? (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.slice(0, limit).map((food) => (
                <div
                  key={food.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${food.name}`}
                  onClick={() => setSelected(food)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ")
                      setSelected(food);
                  }}
                  className="cursor-pointer text-left focus-visible:rounded-[24px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500"
                >
                  <FoodCard food={food} compact />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-black/10 py-20 text-center dark:border-white/10">
              <Search className="mx-auto size-8 text-slate-300" />
              <h2 className="mt-4 font-bold">No dishes on this plate</h2>
              <p className="mt-1 text-xs text-slate-500">
                Try another name, state or food preference.
              </p>
            </div>
          )}
          {limit < filtered.length && (
            <div className="mt-10 text-center">
              <Button variant="outline" onClick={() => setLimit(limit + 12)}>
                Load more flavours <ChevronDown className="size-4" />
              </Button>
            </div>
          )}
        </div>
      </section>
      <AnimatePresence>
        {selected && (
          <div
            className="fixed inset-0 z-[100] grid place-items-end bg-black/50 p-0 backdrop-blur-sm sm:place-items-center sm:p-5"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              className="max-h-[92vh] w-full max-w-3xl overflow-auto rounded-t-[28px] bg-white p-4 shadow-2xl dark:bg-[#111a15] sm:rounded-[28px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 overflow-hidden rounded-[20px] sm:h-72">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/30 text-white backdrop-blur"
                >
                  <X className="size-4" />
                </button>
                <div className="absolute bottom-5 left-5 text-white">
                  <p className="text-saffron-300 text-xs font-bold uppercase tracking-wider">
                    {selected.state}
                  </p>
                  <h2 className="mt-1 text-3xl font-extrabold">
                    {selected.name}
                  </h2>
                </div>
              </div>
              <div className="p-2 pt-6">
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {[
                    [selected.calories, "Calories"],
                    [`${selected.protein}g`, "Protein"],
                    [`${selected.carbs}g`, "Carbs"],
                    [`${selected.fat}g`, "Fat"],
                    [`${selected.fiber}g`, "Fiber"],
                    [`${selected.healthRating}%`, "Health"]
                  ].map(([v, l]) => (
                    <div
                      key={l}
                      className="rounded-xl bg-slate-50 p-3 text-center dark:bg-white/[0.06]"
                    >
                      <b className="text-sm">{v}</b>
                      <p className="mt-1 text-[9px] uppercase text-slate-400">
                        {l}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-bold">Its story</h3>
                    <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-300">
                      {selected.history}
                    </p>
                    <p className="mt-4 flex items-center gap-1 text-xs font-semibold text-saffron-600">
                      <Flame className="size-3.5" />
                      Spice level {selected.spice} / 5
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">What goes in</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selected.ingredients.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-leaf-500/10 px-2.5 py-1 text-[10px] font-semibold text-leaf-600"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-saffron-500/10 p-3">
                      <Leaf className="size-4 text-leaf-500" />
                      <span>
                        <b className="block text-[10px]">Suggested portion</b>
                        <small className="text-[10px] text-slate-500">
                          {selected.portion}
                        </small>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
