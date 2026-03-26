export default function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-950 px-6 text-center">
      <div className="glass-panel max-w-xl p-10">
        <div className="mx-auto mb-6 h-16 w-16 animate-spin rounded-full border-4 border-cyan-400/20 border-t-cyan-300" />
        <p className="font-display text-2xl uppercase tracking-[0.35em] text-cyan-200">Synchronizing Grid</p>
        <p className="mt-3 text-slate-300">Connecting drones, AI engine, route intelligence, and emergency systems.</p>
      </div>
    </div>
  );
}
