import { MapPinned, Navigation, Radar } from "lucide-react";
import { useTranslation } from "react-i18next";
import EvacuationMap from "../components/map/EvacuationMap";
import GlassPanel from "../components/common/GlassPanel";

function buildRoutePoints(lat, lon, exit) {
  const danger = [lat, lon];
  const midpoint = [lat + 0.00055, lon + 0.00048];
  const exitA = [lat + 0.001, lon + 0.0012];
  const exitB = [lat - 0.0009, lon + 0.0011];

  return {
    exits: [
      { name: "A", position: exitA },
      { name: "B", position: exitB },
    ],
    routePoints: exit === "A" ? [danger, midpoint, exitA] : [danger, [lat - 0.00035, lon + 0.0004], exitB],
  };
}

export default function MapEvacuationPage({ context }) {
  const { t } = useTranslation();
  const { data } = context.realtime;
  const { exits, routePoints } = buildRoutePoints(data.lat, data.lon, data.exit);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <EvacuationMap lat={data.lat} lon={data.lon} exit={data.exit} routePoints={routePoints} exits={exits} />
        <div className="space-y-6">
          <GlassPanel className="p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">{t("evacuationGuidance")}</p>
            <h2 className="mt-2 font-display text-3xl text-white">Exit {data.exit} selected as primary safe corridor</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              The map engine compares congestion, route distance, and local risk radius to dynamically guide the crowd toward
              the safest exit.
            </p>
          </GlassPanel>

          <GlassPanel className="grid gap-4 p-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <MapPinned className="text-cyan-300" />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{t("coordinates")}</p>
                  <p className="mt-1 font-semibold text-white">
                    {data.lat.toFixed(5)}, {data.lon.toFixed(5)}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <Navigation className="text-emerald-300" />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{t("route")}</p>
                  <p className="mt-1 font-semibold text-white">{routePoints.map((_, index) => `Node ${index + 1}`).join(" -> ")}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <Radar className="text-rose-300" />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Danger radius</p>
                  <p className="mt-1 font-semibold text-white">60 meters from active crowd anomaly center</p>
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
