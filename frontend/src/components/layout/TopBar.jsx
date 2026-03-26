import { BellRing, Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../common/ThemeToggle";
import LanguageSwitcher from "../common/LanguageSwitcher";
import StatusBadge from "../common/StatusBadge";

export default function TopBar({ context }) {
  const { t, i18n } = useTranslation();
  const { theme, setTheme, language, setLanguage, realtime } = context;

  const handleLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    i18n.changeLanguage(nextLanguage);
  };

  return (
    <header className="glass-panel sticky top-4 z-20 mb-6 flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="rounded-2xl border border-white/10 bg-white/10 p-3 lg:hidden">
          <Menu size={18} />
        </span>
        <div>
          <p className="font-display text-xl uppercase tracking-[0.28em] text-slate-100 dark:text-slate-100">{t("brand")}</p>
          <p className="mt-1 text-sm text-slate-400">{t("overview")}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-200 md:flex">
          <BellRing size={16} className="text-cyan-300" />
          <span>{t("status")}</span>
          <StatusBadge status={realtime.data.status} />
        </div>
        <LanguageSwitcher active={language} onChange={handleLanguage} />
        <ThemeToggle
          theme={theme}
          onToggle={setTheme}
          darkLabel={t("darkMode")}
          lightLabel={t("lightMode")}
        />
      </div>
    </header>
  );
}
