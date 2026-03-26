export default function GlassPanel({ className = "", children }) {
  return <section className={`glass-panel ${className}`}>{children}</section>;
}
