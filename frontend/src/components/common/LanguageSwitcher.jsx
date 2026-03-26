const languages = [
  { code: "en", label: "EN" },
  { code: "ta", label: "TA" },
  { code: "hi", label: "HI" },
];

export default function LanguageSwitcher({ active, onChange }) {
  return (
    <div className="inline-flex rounded-full border border-white/10 bg-white/10 p-1 backdrop-blur-md">
      {languages.map((language) => (
        <button
          key={language.code}
          type="button"
          onClick={() => onChange(language.code)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.18em] transition ${
            active === language.code
              ? "bg-cyan-400 text-slate-950"
              : "text-slate-200 hover:text-white"
          }`}
        >
          {language.label}
        </button>
      ))}
    </div>
  );
}
