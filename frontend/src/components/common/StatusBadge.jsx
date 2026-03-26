import { useTranslation } from "react-i18next";

const toneMap = {
  SAFE: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30",
  WARNING: "bg-amber-500/15 text-amber-300 ring-amber-400/30",
  DANGER: "bg-rose-500/15 text-rose-300 ring-rose-400/30 animate-pulseSoft",
};

export default function StatusBadge({ status }) {
  const { t } = useTranslation();
  const labels = {
    SAFE: t("safe"),
    WARNING: t("warning"),
    DANGER: t("danger"),
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] ring-1 ${toneMap[status] || toneMap.SAFE}`}
    >
      <span className="h-2.5 w-2.5 rounded-full bg-current" />
      {labels[status] || status}
    </span>
  );
}
