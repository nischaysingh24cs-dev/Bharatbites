"use client";

import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import {
  ArrowRight,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export function SignInClient() {
  const configured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  if (configured)
    return (
      <div className="grid min-h-[72vh] place-items-center bg-gradient-to-br from-saffron-50 to-leaf-50 py-12 dark:from-saffron-500/10 dark:to-leaf-500/10">
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-in"
          forceRedirectUrl="/dashboard"
        />
      </div>
    );
  return (
    <section className="grid min-h-[72vh] place-items-center bg-gradient-to-br from-saffron-50 via-white to-leaf-50 px-4 py-14 dark:from-saffron-500/10 dark:via-ink-950 dark:to-leaf-500/10">
      <div className="w-full max-w-md rounded-[28px] border border-black/[0.07] bg-white p-7 shadow-soft dark:border-white/10 dark:bg-white/[0.055]">
        <Logo />
        <div className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-saffron-500/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-saffron-600">
          <Sparkles className="size-3" />
          Demo mode
        </div>
        <h1 className="mt-4 text-3xl font-extrabold">Welcome back</h1>
        <p className="mt-2 text-xs leading-5 text-slate-500">
          Configure Clerk keys to enable secure Google, email/password and
          password-reset flows.
        </p>
        <label className="mt-6 block">
          <span className="label">Email address</span>
          <div className="relative">
            <Mail className="absolute left-4 top-4 size-4 text-slate-400" />
            <input className="input pl-11" placeholder="you@example.com" />
          </div>
        </label>
        <label className="mt-4 block">
          <span className="label">Password</span>
          <div className="relative">
            <LockKeyhole className="absolute left-4 top-4 size-4 text-slate-400" />
            <input
              type="password"
              className="input pl-11"
              placeholder="••••••••"
            />
          </div>
        </label>
        <div className="mt-3 flex items-center justify-between text-[10px]">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>
          <button className="font-semibold text-saffron-500">
            Forgot password?
          </button>
        </div>
        <Link href="/dashboard">
          <Button className="mt-5 w-full" size="lg">
            Open demo dashboard <ArrowRight className="size-4" />
          </Button>
        </Link>
        <div className="my-5 flex items-center gap-3 text-[9px] text-slate-400">
          <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
          or continue with
          <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
        </div>
        <button className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-black/10 text-xs font-bold dark:border-white/10">
          G &nbsp; Continue with Google
        </button>
        <p className="mt-5 flex items-center justify-center gap-1 text-[9px] text-slate-400">
          <ShieldCheck className="size-3" />
          Authentication is handled by Clerk when configured.
        </p>
      </div>
    </section>
  );
}
