import { motion } from "framer-motion";
import GlassPanel from "./GlassPanel";

export default function MetricCard({ label, value, detail, accent = "cyan" }) {
  const accents = {
    cyan: "from-cyan-400/30 to-sky-500/5",
    green: "from-emerald-400/30 to-lime-500/5",
    amber: "from-amber-400/30 to-orange-500/5",
    rose: "from-rose-400/30 to-pink-500/5",
  };

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <GlassPanel className="relative overflow-hidden p-5">
        <div className={`absolute inset-0 bg-gradient-to-br ${accents[accent] || accents.cyan}`} />
        <div className="relative flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</span>
          <span className="font-display text-3xl font-bold text-white dark:text-white">{value}</span>
          <span className="text-sm text-slate-300 dark:text-slate-300">{detail}</span>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
