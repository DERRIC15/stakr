import { motion } from "framer-motion";
import { Radar, Route, Siren, Waypoints } from "lucide-react";
import { useTranslation } from "react-i18next";
import MetricCard from "../components/common/MetricCard";
import StatusBadge from "../components/common/StatusBadge";
import DroneFeedCard from "../components/dashboard/DroneFeedCard";
import AlertPanel from "../components/dashboard/AlertPanel";
import SystemHealthCard from "../components/dashboard/SystemHealthCard";
import GlassPanel from "../components/common/GlassPanel";

export default function DashboardPage({ context }) {
  const { t } = useTranslation();
  const { data, error } = context.realtime;

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 sm:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">{t("dashboard")}</p>
            <h1 className="mt-3 font-display text-3xl uppercase tracking-[0.12em] text-white sm:text-5xl">
              AI-guided aerial crowd protection for real-world evacuation response
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              This command center fuses drone surveillance, density analytics, GPS telemetry, and emergency routing into a
              single decisive monitoring website.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:w-[420px]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{t("status")}</p>
              <div className="mt-3">
                <StatusBadge status={data.status} />
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{t("safestExit")}</p>
              <p className="mt-3 font-display text-3xl text-cyan-200">Exit {data.exit}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {error ? (
        <div className="rounded-3xl border border-amber-400/30 bg-amber-500/10 px-5 py-4 text-sm text-amber-200">
          Backend connection issue: {error}. Showing fallback realtime values.
        </div>
      ) : null}

      <section className="grid gap-4 xl:grid-cols-4">
        <MetricCard label={t("crowdCount")} value={data.count} detail={t("responseReady")} accent="cyan" />
        <MetricCard label={t("coordinates")} value={`${data.lat.toFixed(4)}, ${data.lon.toFixed(4)}`} detail="GPS + GSM sync" accent="green" />
        <MetricCard label={t("pulse")} value={data.status} detail={`Exit ${data.exit} auto-selected`} accent={data.status === "DANGER" ? "rose" : "amber"} />
        <MetricCard label={t("route")} value={data.recommendedRoute?.join(" > ") || "Zone > Exit"} detail={t("mapSummary")} accent="green" />
      </section>

      <section className="grid gap-6 2xl:grid-cols-[1.3fr_0.7fr]">
        <DroneFeedCard />
        <div className="space-y-6">
          <AlertPanel alerts={data.alerts} status={data.status} exit={data.exit} />
          <GlassPanel className="p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <Radar className="text-cyan-300" />
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">AI Scan Confidence</p>
                <p className="mt-2 font-display text-3xl text-white">98.4%</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <Siren className="text-rose-300" />
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">Alert Propagation</p>
                <p className="mt-2 font-display text-3xl text-white">0.9s</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <Waypoints className="text-emerald-300" />
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">Exit Capacity</p>
                <p className="mt-2 font-display text-3xl text-white">74%</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <Route className="text-amber-300" />
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">Evacuation ETA</p>
                <p className="mt-2 font-display text-3xl text-white">02:10</p>
              </div>
            </div>
          </GlassPanel>
        </div>
      </section>

      <SystemHealthCard health={data.health} />
    </div>
  );
}
