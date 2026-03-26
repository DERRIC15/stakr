import { useState } from "react";
import { LockKeyhole, SlidersHorizontal, TriangleAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import GlassPanel from "../components/common/GlassPanel";
import { loginAdmin, pushAiUpdate, triggerAlert } from "../lib/api";

export default function AdminPage({ context, requireLogin = false }) {
  const { t } = useTranslation();
  const { auth, setAuth, realtime } = context;
  const [form, setForm] = useState({ username: "", password: "" });
  const [sim, setSim] = useState({
    status: "WARNING",
    count: 280,
    exit: "A",
    lat: realtime.data.lat,
    lon: realtime.data.lon,
  });
  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const result = await loginAdmin(form);
      setAuth({ loggedIn: true, username: result.username });
      setMessage("Admin access granted.");
    } catch {
      setMessage("Login failed. Check credentials.");
    }
  };

  const handleSimulation = async () => {
    try {
      await pushAiUpdate({
        ...sim,
        count: Number(sim.count),
        lat: Number(sim.lat),
        lon: Number(sim.lon),
      });
      setMessage("Simulation pushed to backend.");
    } catch {
      setMessage("Backend unavailable. Simulation not sent.");
    }
  };

  const handleAlert = async () => {
    try {
      await triggerAlert({ exit: sim.exit, status: sim.status });
      setMessage("Alert dispatched to IoT endpoint.");
    } catch {
      setMessage("Alert dispatch failed.");
    }
  };

  if (requireLogin && !auth.loggedIn) {
    return (
      <div className="mx-auto max-w-md">
        <GlassPanel className="p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
              <LockKeyhole size={20} />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">{t("admin")}</p>
              <h1 className="mt-1 font-display text-2xl text-white">{t("adminAccess")}</h1>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">{t("username")}</span>
              <input
                value={form.username}
                onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
                placeholder="admin"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">{t("password")}</span>
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
                placeholder="••••••••"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              {t("signIn")}
            </button>
          </form>
          {message ? <p className="mt-4 text-sm text-slate-300">{message}</p> : null}
        </GlassPanel>
      </div>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <GlassPanel className="p-6">
        <div className="mb-5 flex items-center gap-3">
          <SlidersHorizontal className="text-cyan-300" />
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">{t("simulation")}</p>
            <h2 className="mt-1 font-display text-2xl text-white">AI update and alert control room</h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {["status", "count", "exit", "lat", "lon"].map((key) => (
            <label key={key} className="block">
              <span className="mb-2 block text-sm capitalize text-slate-300">{key}</span>
              <input
                value={sim[key]}
                onChange={(event) => setSim((current) => ({ ...current, [key]: event.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
              />
            </label>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSimulation}
            className="rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Push AI Update
          </button>
          <button
            type="button"
            onClick={handleAlert}
            className="rounded-2xl border border-rose-300/40 bg-rose-500/10 px-4 py-3 font-semibold text-rose-200 transition hover:bg-rose-500/20"
          >
            {t("trigger")}
          </button>
          <button
            type="button"
            onClick={() => setAuth({ loggedIn: false, username: "" })}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-slate-200 transition hover:bg-white/10"
          >
            {t("logout")}
          </button>
        </div>
        {message ? <p className="mt-4 text-sm text-slate-300">{message}</p> : null}
      </GlassPanel>

      <GlassPanel className="p-6">
        <div className="mb-5 flex items-center gap-3">
          <TriangleAlert className="text-rose-300" />
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">{t("admin")}</p>
            <h2 className="mt-1 font-display text-2xl text-white">Operational controls</h2>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-white">Current operator</p>
            <p className="mt-2 text-slate-300">{auth.username}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-white">Latest crowd estimate</p>
            <p className="mt-2 text-slate-300">{realtime.data.count} people</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-white">Recommended exit</p>
            <p className="mt-2 text-slate-300">Exit {realtime.data.exit}</p>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
