import { Cpu, Satellite, ShieldAlert, TimerReset } from "lucide-react";
import { useTranslation } from "react-i18next";
import GlassPanel from "../common/GlassPanel";

export default function SystemHealthCard({ health }) {
  const { t } = useTranslation();

  const items = [
    { label: t("healthUptime"), value: health.uptime, icon: TimerReset },
    { label: t("healthModel"), value: health.aiModel, icon: Cpu },
    { label: t("healthGps"), value: health.gps, icon: Satellite },
    { label: t("healthEsp"), value: health.esp32, icon: ShieldAlert },
  ];

  return (
    <GlassPanel className="p-6">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">{t("systemHealth")}</p>
        <h3 className="mt-1 font-display text-xl text-white">{t("systemNominal")}</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
                <Icon size={18} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
                <p className="mt-1 text-sm font-semibold text-white">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
