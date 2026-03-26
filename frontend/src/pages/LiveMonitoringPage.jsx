import { motion } from "framer-motion";
import { Activity, AudioWaveform, Bot, Radio } from "lucide-react";
import { useTranslation } from "react-i18next";
import DroneFeedCard from "../components/dashboard/DroneFeedCard";
import AlertPanel from "../components/dashboard/AlertPanel";
import GlassPanel from "../components/common/GlassPanel";
import StatusBadge from "../components/common/StatusBadge";

export default function LiveMonitoringPage({ context }) {
  const { t } = useTranslation();
  const { data } = context.realtime;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <DroneFeedCard />
        <GlassPanel className="p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">{t("monitoring")}</p>
          <h2 className="mt-2 font-display text-3xl text-white">Live AI observation stack</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="text-cyan-300" />
                  <span className="text-sm text-slate-200">Risk classifier</span>
                </div>
                <StatusBadge status={data.status} />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <Bot className="text-emerald-300" />
                <div>
                  <p className="text-sm font-semibold text-white">YOLO + OpenCV inference</p>
                  <p className="text-sm text-slate-400">Crowd flow, density, and anomaly vectors processed live</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <AudioWaveform className="text-amber-300" />
                <div>
                  <p className="text-sm font-semibold text-white">Voice assistant</p>
                  <p className="text-sm text-slate-400">Speech synthesis pushes multilingual evacuation guidance</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <Radio className="text-rose-300" />
                <div>
                  <p className="text-sm font-semibold text-white">ESP32 relay</p>
                  <p className="text-sm text-slate-400">Buzzer, LED, and speaker commands dispatched by backend</p>
                </div>
              </div>
            </div>
          </div>
        </GlassPanel>
      </motion.div>
      <AlertPanel alerts={data.alerts} status={data.status} exit={data.exit} />
    </div>
  );
}
