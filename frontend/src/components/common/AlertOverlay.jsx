import { AnimatePresence, motion } from "framer-motion";
import { Siren } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function AlertOverlay({ status, exit }) {
  const show = status === "WARNING" || status === "DANGER";

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="pointer-events-none fixed left-1/2 top-5 z-50 w-[min(92vw,540px)] -translate-x-1/2"
        >
          <div
            className={`rounded-3xl border px-5 py-4 shadow-2xl backdrop-blur-xl ${
              status === "DANGER"
                ? "border-rose-400/40 bg-rose-500/20"
                : "border-amber-400/40 bg-amber-500/20"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="rounded-2xl bg-slate-950/40 p-3 text-white">
                <Siren className={status === "DANGER" ? "text-rose-200" : "text-amber-100"} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-100">Emergency advisory</p>
                <p className="mt-1 text-sm text-white">Stampede detected. Move to Exit {exit}.</p>
              </div>
              <StatusBadge status={status} />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
