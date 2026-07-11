import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-saffron-500 text-white shadow-glow hover:-translate-y-0.5 hover:bg-saffron-600",
        variant === "secondary" &&
          "bg-ink-900 text-white hover:-translate-y-0.5 hover:bg-ink-950 dark:bg-white dark:text-ink-950",
        variant === "outline" &&
          "border border-black/10 bg-white/60 text-ink-900 hover:border-saffron-500 hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
        variant === "ghost" &&
          "text-ink-900 hover:bg-black/5 dark:text-white dark:hover:bg-white/10",
        size === "sm" && "h-9 px-4 text-xs",
        size === "md" && "h-11 px-5 text-sm",
        size === "lg" && "h-14 px-7 text-[15px]",
        size === "icon" && "size-10",
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
