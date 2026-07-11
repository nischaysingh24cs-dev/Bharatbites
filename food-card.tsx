@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light;
  --saffron: 255 107 0;
  --leaf: 0 168 107;
}
.dark {
  color-scheme: dark;
}
* {
  border-color: rgba(15, 23, 42, 0.09);
}
html {
  scroll-behavior: smooth;
}
body {
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}
::selection {
  background: rgba(255, 107, 0, 0.2);
  color: #ad4600;
}

@layer base {
  h1,
  h2,
  h3,
  h4 {
    @apply font-display;
  }
  input,
  select,
  textarea {
    @apply outline-none;
  }
}

@layer components {
  .container-page {
    @apply mx-auto w-full max-w-[1240px] px-4 sm:px-6;
  }
  .glass {
    @apply border border-white/50 bg-white/70 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06];
  }
  .card {
    @apply rounded-[24px] border border-black/[0.07] bg-white shadow-soft dark:border-white/[0.09] dark:bg-white/[0.055];
  }
  .input {
    @apply h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-ink-950 placeholder:text-slate-400 focus:border-saffron-500 focus:ring-4 focus:ring-saffron-500/10 dark:border-white/10 dark:bg-white/[0.06] dark:text-white;
  }
  .label {
    @apply mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400;
  }
  .noise {
    position: relative;
    isolation: isolate;
  }
  .noise::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    opacity: 0.03;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
}

.skip-link {
  position: fixed;
  left: 1rem;
  top: -4rem;
  z-index: 100;
  border-radius: 999px;
  background: #111814;
  color: white;
  padding: 0.75rem 1rem;
  transition: top 0.2s;
}
.skip-link:focus {
  top: 1rem;
}
.text-balance {
  text-wrap: balance;
}
.text-pretty {
  text-wrap: pretty;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.india-pattern {
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(255, 107, 0, 0.14) 1px,
    transparent 0
  );
  background-size: 22px 22px;
}

.range-saffron {
  accent-color: #ff6b00;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
