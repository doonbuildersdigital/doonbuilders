import Media from './Media';
import PlaceholderBadge from './PlaceholderBadge';
import { machineryCategories, machineSpecs } from '@/data/machinery';

/** Equipment catalogue card. Only specifications that exist are shown. */
export default function MachineryCard({ machine, index }) {
  const specs = machineSpecs(machine);
  const category = machineryCategories[machine.category]?.label;

  return (
    <article>
      <div className="card card-interactive group flex h-full flex-col">
        <Media
          image={machine.image}
          alt={machine.imageAlt || machine.name}
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="aspect-[4/3]"
          imgClassName="card-zoom"
          placeholderLabel="Machine photograph to be supplied"
        >
          <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
            <div>{machine.isPlaceholder && <PlaceholderBadge />}</div>
            {index && (
              <span className="rounded-full bg-surface/90 px-2.5 py-1 text-[11px] font-semibold tabular-nums text-ink shadow-card backdrop-blur-sm">
                {index}
              </span>
            )}
          </div>
        </Media>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          {category && (
            <span className="self-start rounded-full bg-brand/[0.08] px-2.5 py-1 text-[11px] font-semibold text-brand">
              {category}
            </span>
          )}
          <h3 className="mt-3.5 text-lg font-semibold tracking-[-0.01em] transition-colors duration-300 group-hover:text-brand md:text-xl">
            {machine.name}
          </h3>

          {specs.length > 0 ? (
            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-5 text-sm">
              {specs.map((s) => (
                <div key={s.key} className="rounded-xl bg-paper px-3 py-2.5">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-steel">{s.label}</dt>
                  <dd className="mt-1 font-medium text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-5 border-t border-line pt-5 text-sm text-steel-dark">Specifications to be supplied.</p>
          )}
        </div>
      </div>
    </article>
  );
}
