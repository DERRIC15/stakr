import { MoonStar, SunMedium } from "lucide-react";

export default function ThemeToggle({ theme, onToggle, darkLabel, lightLabel }) {
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => onToggle(dark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-100 backdrop-blur-md transition hover:border-cyan-300/40 hover:bg-white/15 dark:text-slate-100"
    >
      {dark ? <SunMedium size={16} /> : <MoonStar size={16} />}
      {dark ? lightLabel : darkLabel}
    </button>
  );
}
