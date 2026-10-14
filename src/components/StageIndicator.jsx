import { stageOrder, stageLabels } from '@/data/projects';

/**
 * Architectural progress indicator: PLANNING — EXECUTION — FINISHING — COMPLETED.
 * A percentage is shown only when a verified `progress` figure is supplied.
 */
export default function StageIndicator({ stage, progress = null, className = '' }) {
  const current = stageOrder.indexOf(stage);

  return (
    <div className={className}>
      <p className="sr-only">Current status: {stageLabels[stage]}</p>
      <ol className="grid grid-cols-4 gap-1.5" aria-hidden="true">
        {stageOrder.map((s, i) => {
          const state = i < current ? 'done' : i === current ? 'current' : 'todo';
          return (
            <li key={s} className="flex flex-col gap-3">
              <span
                className={`block h-[3px] ${
                  state === 'current' ? 'bg-brand' : state === 'done' ? 'bg-ink' : 'bg-mist'
                }`}
              />
              <span
                className={`text-[9px] uppercase leading-none tracking-[0.14em] sm:text-[10px] ${
                  state === 'current'
                    ? 'font-semibold text-brand'
                    : state === 'done'
                      ? 'text-ink'
                      : 'text-steel'
                }`}
              >
                {stageLabels[s]}
              </span>
            </li>
          );
        })}
      </ol>
      {typeof progress === 'number' && (
        <p className="mt-4 text-sm text-steel-dark">
          Progress: <span className="font-semibold text-ink">{progress}%</span>
        </p>
      )}
    </div>
  );
}
