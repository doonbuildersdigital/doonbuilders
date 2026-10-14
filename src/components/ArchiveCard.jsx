import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, FileText, Maximize2 } from 'lucide-react';
import Media from './Media';
import DigitalCopy from './DigitalCopy';

/**
 * One original record from data/archive.js: cover scan + thumbnails on the left,
 * transcribed details on the right, and an expandable typed digital copy of the document.
 * `onOpen(scanIndex)` opens a scan in the Lightbox.
 * Pass `showProjectLink={false}` when the card already sits on that project's page.
 */
export default function ArchiveCard({ record, onOpen, showProjectLink = true, className = '', ...rest }) {
  const [cover, ...moreScans] = record.scans;
  const facts = record.facts.filter((f) => f.value);
  const [showCopy, setShowCopy] = useState(false);
  const copyId = useId();

  return (
    <article className={`card grid overflow-hidden lg:grid-cols-12 ${className}`} {...rest}>
      <div className="flex flex-col bg-mist/60 p-3 md:p-4 lg:col-span-5">
        <button
          type="button"
          onClick={() => onOpen(0)}
          aria-label={`View original: ${cover.caption}`}
          className="group relative block w-full overflow-hidden rounded-2xl text-left shadow-card ring-1 ring-ink/10 focus-visible:outline-offset-4 lg:flex-1"
        >
          <Media
            image={cover.image}
            alt={`${record.type}: ${record.title} — ${cover.caption}`}
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[320px]"
            imgClassName="card-zoom object-top"
          />
          <span
            aria-hidden="true"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface text-ink shadow-card transition-colors duration-300 group-hover:bg-brand group-hover:text-white"
          >
            <Maximize2 className="h-4 w-4" strokeWidth={2} />
          </span>
        </button>

        {moreScans.length > 0 && (
          <ul className="mt-3 grid grid-cols-3 gap-3">
            {moreScans.map((scan, i) => (
              <li key={scan.caption}>
                <button
                  type="button"
                  onClick={() => onOpen(i + 1)}
                  aria-label={`View original: ${scan.caption}`}
                  className="group block w-full overflow-hidden rounded-xl shadow-card ring-1 ring-ink/10 focus-visible:outline-offset-4"
                >
                  <Media
                    image={scan.image}
                    alt=""
                    sizes="12vw"
                    className="aspect-square"
                    imgClassName="card-zoom object-top"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col p-6 md:p-8 lg:col-span-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/[0.08] px-2.5 py-1 text-[11px] font-semibold text-brand">
            <FileText className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            {record.type}
          </span>
          <span className="text-[13px] font-semibold tabular-nums text-steel-dark">{record.date}</span>
        </div>

        <h3 className="mt-4 text-xl font-bold leading-snug tracking-[-0.02em] md:text-2xl">{record.title}</h3>
        {record.summary && <p className="mt-3 text-[15px] leading-relaxed text-steel-dark md:text-base">{record.summary}</p>}

        {facts.length > 0 && (
          <dl className="mt-6 grid gap-x-8 border-t border-line sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.label} className="border-b border-line py-3">
                <dt className="meta-label">{f.label}</dt>
                <dd className="mt-1 text-[15px] font-medium leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {(record.transcript || (showProjectLink && record.projectSlug)) && (
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            {record.transcript && (
              <button
                type="button"
                onClick={() => setShowCopy((v) => !v)}
                aria-expanded={showCopy}
                aria-controls={copyId}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-[14px] font-semibold text-ink transition-colors duration-300 hover:border-brand hover:text-brand"
              >
                {showCopy ? 'Hide digital copy' : 'Read digital copy'}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${showCopy ? 'rotate-180' : ''}`}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
            )}
            {showProjectLink && record.projectSlug && (
              <Link
                to={`/projects/${record.projectSlug}`}
                className="group inline-flex items-center gap-2 text-[15px] font-semibold text-brand"
              >
                View project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
              </Link>
            )}
          </div>
        )}
      </div>

      {record.transcript && (
        <div id={copyId} hidden={!showCopy} className="border-t border-line bg-paper p-3 md:p-6 lg:col-span-12">
          {showCopy && <DigitalCopy transcript={record.transcript} />}
        </div>
      )}
    </article>
  );
}
