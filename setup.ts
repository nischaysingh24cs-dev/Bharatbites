import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
  className
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <div className="mb-3 inline-flex rounded-full border border-saffron-500/20 bg-saffron-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-saffron-600 dark:text-saffron-400">
        {eyebrow}
      </div>
      <h2
        className={cn(
          "text-balance font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.035em] text-ink-950 dark:text-white sm:text-4xl lg:text-[48px]",
          inverse && "text-white"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-pretty text-[15px] leading-7 text-slate-600 dark:text-slate-300 sm:text-base",
            inverse && "text-white/65"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
