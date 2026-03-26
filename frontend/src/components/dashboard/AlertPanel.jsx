import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import GlassPanel from "../common/GlassPanel";

export default function AlertPanel({ alerts = [], status, exit }) {
  const { t } = useTranslation();

  const visibleAlerts =
    alerts.length > 0
      ? alerts
      : [
          {
            title: `${status} zone intelligence`,
            detail: `Recommended evacuation corridor active toward Exit ${exit}.`,
            time: "Just now",
          },
        ];

  return (
    <GlassPanel className="p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">{t("alertPanel")}</p>
          <h3 className="mt-1 font-display text-xl text-white">{t("activeIncident")}</h3>
        </div>
        <AlertTriangle className={status === "DANGER" ? "text-rose-300" : "text-amber-300"} />
      </div>

      <div className="space-y-3">
        {visibleAlerts.map((alert, index) => (
          <motion.div
            key={`${alert.title}-${index}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`rounded-2xl border p-4 ${
              status === "DANGER"
                ? "border-rose-400/20 bg-rose-500/10"
                : "border-amber-400/20 bg-amber-500/10"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-white">{alert.title}</p>
              <span className="text-xs uppercase tracking-[0.18em] text-slate-300">{alert.time}</span>
            </div>
            <p className="mt-2 text-sm text-slate-200">{alert.detail}</p>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  );
}
