import { Camera, WifiOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import GlassPanel from "../common/GlassPanel";

const fallbackImage =
  import.meta.env.VITE_DRONE_STREAM_URL ||
  "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80";

export default function DroneFeedCard() {
  const { t } = useTranslation();

  return (
    <GlassPanel className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">{t("feedLabel")}</p>
          <h3 className="mt-1 font-display text-xl text-white">{t("liveFeed")}</h3>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-300">
          <Camera size={14} />
          {t("dronesOnline")}
        </span>
      </div>

      <div className="relative aspect-[16/9]">
        <img src={fallbackImage} alt="Drone surveillance feed" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 rounded-2xl border border-white/10 bg-surface-950/70 px-4 py-3 backdrop-blur-lg">
          <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-rose-300">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-rose-400" />
            Live overlay analytics
          </div>
          <p className="text-sm text-slate-200">{t("feedOffline")}</p>
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-surface-950/70 p-3 backdrop-blur-lg">
          <WifiOff size={16} className="text-amber-300" />
        </div>
      </div>
    </GlassPanel>
  );
}
