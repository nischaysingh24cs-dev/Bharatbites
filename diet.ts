"use client";

import Image from "next/image";
import { Flame, Heart, Leaf, MapPin } from "lucide-react";
import { useState } from "react";
import type { Food } from "@/types";
import { cn } from "@/lib/utils";

export function FoodCard({
  food,
  compact = false
}: {
  food: Food;
  compact?: boolean;
}) {
  const [liked, setLiked] = useState(false);
  return (
    <article className="group overflow-hidden rounded-[24px] border border-black/[0.07] bg-white shadow-soft transition duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.055]">
      <div
        className={cn("relative overflow-hidden", compact ? "h-44" : "h-52")}
      >
        <Image
          src={food.image}
          alt={`${food.name} from ${food.state}`}
          fill
          sizes="(max-width: 640px) 80vw, 320px"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full border border-white/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md",
            food.type === "Non-Veg" ? "bg-rose-500/80" : "bg-leaf-500/85"
          )}
        >
          <span className="mr-1">●</span>
          {food.type}
        </span>
        <button
          onClick={(event) => {
            event.stopPropagation();
            setLiked(!liked);
          }}
          aria-label={liked ? "Remove from favorites" : "Save to favorites"}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full border border-white/30 bg-black/15 text-white backdrop-blur-md transition hover:scale-105"
        >
          <Heart
            className={cn("size-4", liked && "fill-rose-500 text-rose-500")}
          />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/25 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
          <MapPin className="size-3" />
          {food.state}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-bold tracking-tight text-ink-950 dark:text-white">
              {food.name}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Suggested: {food.portion}
            </p>
          </div>
          <div className="rounded-xl bg-saffron-500/10 px-2.5 py-1.5 text-right">
            <p className="text-sm font-extrabold text-saffron-600 dark:text-saffron-400">
              {food.calories}
            </p>
            <p className="text-[9px] uppercase tracking-wide text-slate-500">
              kcal
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-1 border-t border-black/[0.06] pt-3 dark:border-white/10">
          {[
            ["Protein", `${food.protein}g`],
            ["Carbs", `${food.carbs}g`],
            ["Fat", `${food.fat}g`],
            ["Fiber", `${food.fiber}g`]
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[11px] font-bold text-ink-950 dark:text-white">
                {value}
              </p>
              <p className="text-[9px] text-slate-400">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500">
            <Flame className="size-3 text-saffron-500" />
            Spice {food.spice}/5
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-leaf-600 dark:text-leaf-400">
            <Leaf className="size-3" />
            {food.healthRating}% healthy
          </span>
        </div>
      </div>
    </article>
  );
}
