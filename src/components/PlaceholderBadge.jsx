/** Marks development sample records so they are never mistaken for real projects. */
export default function PlaceholderBadge({ label = 'Sample entry', className = '' }) {
  return (
    <span
      className={`z-[2] inline-flex items-center gap-2 rounded-full bg-surface/90 px-3 shadow-card backdrop-blur-sm py-1.5 text-[9px] font-semibold uppercase leading-none tracking-label text-ink ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
      {label}
    </span>
  );
}
