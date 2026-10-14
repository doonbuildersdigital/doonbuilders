/**
 * Pill filter control. Scrolls sideways on small screens rather than wrapping.
 * options: [{ key, label, count? }]
 */
export default function FilterBar({ options, active, onChange, label = 'Filter', className = '' }) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`scrollbar-none -mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] py-1 md:mx-0 md:px-0 ${className}`}
    >
      <ul className="flex min-w-max gap-2">
        {options.map((option) => {
          const selected = option.key === active;
          return (
            <li key={option.key}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onChange(option.key)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition-all duration-300 active:scale-95 ${
                  selected
                    ? 'border-ink bg-ink text-paper shadow-card-hover'
                    : 'border-line bg-surface text-steel-dark shadow-card hover:-translate-y-0.5 hover:border-ink/25 hover:text-ink'
                }`}
              >
                {option.label}
                {typeof option.count === 'number' && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10.5px] font-semibold tabular-nums ${
                      selected ? 'bg-paper/20 text-paper' : 'bg-paper text-steel-dark'
                    }`}
                  >
                    {option.count}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
