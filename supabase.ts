"use client";

import { Lightbulb, Quote, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function DailyInsight() {
  return (
    <section className="border-y border-black/[0.06] bg-white py-8 dark:border-white/10 dark:bg-white/[0.025]">
      <div className="container-page grid gap-3 md:grid-cols-3">
        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-[20px] bg-gradient-to-br from-saffron-500 to-amber-400 p-5 text-white shadow-glow"
        >
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-white/70">
            <Sparkles className="size-3.5" />
            AI health tip of the day
          </div>
          <p className="mt-3 text-sm font-semibold leading-6">
            Add a bowl of colourful sabzi before seconds—it helps fullness
            arrive naturally.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-[20px] border border-black/[0.07] bg-[#faf7f1] p-5 dark:border-white/10 dark:bg-white/[0.05]"
        >
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-leaf-600">
            <Lightbulb className="size-3.5" />
            Nutrition note
          </div>
          <p className="mt-3 text-sm font-semibold leading-6 text-ink-950 dark:text-white">
            Pair vitamin-C rich lemon with dal to help your body absorb more
            plant iron.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-[20px] border border-black/[0.07] bg-ink-950 p-5 text-white dark:border-white/10"
        >
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-saffron-400">
            <Quote className="size-3.5" />
            Today&apos;s mindset
          </div>
          <p className="mt-3 text-sm font-semibold leading-6">
            “Small choices, repeated with kindness, become a healthy life.”
          </p>
        </motion.div>
      </div>
    </section>
  );
}
