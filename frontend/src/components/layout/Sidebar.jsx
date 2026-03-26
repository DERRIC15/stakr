import { NavLink } from "react-router-dom";
import { Activity, Gauge, Map, ShieldCheck, Waves } from "lucide-react";
import { useTranslation } from "react-i18next";

const items = [
  { to: "/", key: "dashboard", icon: Gauge },
  { to: "/monitoring", key: "monitoring", icon: Waves },
  { to: "/map", key: "map", icon: Map },
  { to: "/analytics", key: "analytics", icon: Activity },
  { to: "/admin", key: "admin", icon: ShieldCheck },
];

export default function Sidebar() {
  const { t } = useTranslation();

  return (
    <aside className="glass-panel sticky top-6 hidden h-[calc(100vh-3rem)] w-72 shrink-0 flex-col justify-between p-6 lg:flex">
      <div>
        <div className="mb-10">
          <p className="font-display text-2xl uppercase tracking-[0.28em] text-cyan-200">{t("brand")}</p>
          <p className="mt-3 text-sm text-slate-300">{t("overview")}</p>
        </div>
        <nav className="space-y-2">
          {items.map(({ to, key, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-cyan-400/15 text-cyan-200 shadow-glow"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {t(key)}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="rounded-3xl border border-cyan-300/20 bg-cyan-400/10 p-4">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">{t("updateAI")}</p>
        <p className="mt-2 text-sm text-slate-200">{t("responseReady")}</p>
      </div>
    </aside>
  );
}
