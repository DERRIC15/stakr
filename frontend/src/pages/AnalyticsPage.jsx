import { BarChart3, ShieldAlert } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import { useTranslation } from "react-i18next";
import GlassPanel from "../components/common/GlassPanel";

export default function AnalyticsPage({ context }) {
  const { t } = useTranslation();
  const history = context.realtime.history;
  const alerts = history.filter((item) => item.status !== "SAFE");

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <GlassPanel className="p-6">
        <div className="mb-5 flex items-center gap-3">
          <BarChart3 className="text-cyan-300" />
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">{t("crowdTrend")}</p>
            <h3 className="mt-1 font-display text-2xl text-white">Density curve and surge timeline</h3>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id="crowdGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3cf2ff" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#3cf2ff" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#3cf2ff" fill="url(#crowdGradient)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassPanel>

      <GlassPanel className="p-6">
        <div className="mb-5 flex items-center gap-3">
          <ShieldAlert className="text-rose-300" />
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">{t("alertHistory")}</p>
            <h3 className="mt-1 font-display text-2xl text-white">Incident severity distribution</h3>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={alerts.length ? alerts : history}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="count" fill="#ff5c7a" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassPanel>
    </div>
  );
}
