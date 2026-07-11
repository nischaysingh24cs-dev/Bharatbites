"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeContextValue = { theme: "light" | "dark"; toggleTheme: () => void };
const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => undefined
});

export function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const stored = localStorage.getItem("bb-theme") as "light" | "dark" | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setTheme(stored ?? preferred);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("bb-theme", theme);
  }, [theme]);
  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme((current) => (current === "light" ? "dark" : "light"))
    }),
    [theme]
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const content = (
    <ThemeProvider>
      <ServiceWorkerRegister />
      {children}
    </ThemeProvider>
  );
  return clerkKey ? (
    <ClerkProvider publishableKey={clerkKey}>{content}</ClerkProvider>
  ) : (
    content
  );
}
