import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5"
      aria-label="BharatBites home"
    >
      <span className="relative grid size-10 place-items-center rounded-[14px] bg-gradient-to-br from-saffron-500 to-amber-400 text-white shadow-glow transition-transform group-hover:rotate-3">
        <span className="font-display text-xl font-extrabold">B</span>
        <Sparkles className="absolute -right-1 -top-1 size-3.5 rounded-full bg-leaf-500 p-0.5" />
      </span>
      {!compact && (
        <span className="font-display text-xl font-extrabold tracking-tight text-ink-950 dark:text-white">
          Bharat<span className="text-saffron-500">Bites</span>
        </span>
      )}
    </Link>
  );
}
