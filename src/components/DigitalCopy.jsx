/**
 * Typed "digital copy" of an archive document (see `transcript` in data/archive.js),
 * laid out like the original: letterhead, reference line, addressee, subject,
 * numbered paragraphs, signature, endorsement. Form-style documents use `sections`.
 */
function RefLine({ value }) {
  if (!value) return null;
  return (
    <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 tabular-nums">
      <span>{value.left}</span>
      <span>{value.right}</span>
    </div>
  );
}

function Paragraphs({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) =>
        typeof item === 'string' ? (
          <p key={i} className="indent-8">
            {item}
          </p>
        ) : (
          <p key={i} className="grid grid-cols-[2rem_1fr]">
            <span className="tabular-nums text-steel-dark">{item.n}/</span>
            <span>{item.text}</span>
          </p>
        ),
      )}
    </div>
  );
}

function Signature({ lines }) {
  if (!lines?.length) return null;
  return (
    <div className="ml-auto w-fit text-right">
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}

export default function DigitalCopy({ transcript, className = '' }) {
  const t = transcript;

  return (
    <div className={`rounded-2xl border border-line bg-surface shadow-card ${className}`}>
      <div className="mx-auto max-w-[68ch] space-y-6 px-6 py-8 text-[14.5px] leading-relaxed text-ink md:px-10 md:py-12 md:text-[15px]">
        {t.letterhead && (
          <header className="border-b border-line pb-5 text-center">
            {t.letterhead.map((line, i) => (
              <p key={line} className={i === 0 ? 'text-[13px] font-bold uppercase tracking-[0.14em]' : 'mt-1 font-semibold uppercase tracking-[0.08em]'}>
                {line}
              </p>
            ))}
          </header>
        )}

        <RefLine value={t.ref} />

        {t.to && (
          <div>
            <p className="text-steel-dark">To,</p>
            <div className="mt-1 pl-8">
              {t.to.map((line) => (
                <p key={line} className="font-medium">
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}

        {t.fields?.length > 0 && (
          <dl className="space-y-2">
            {t.fields.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[3.5rem_1fr] gap-2">
                <dt className="font-semibold">{label}:–</dt>
                <dd className={label === 'Sub' ? 'font-semibold' : ''}>{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {t.salutation && <p>{t.salutation}</p>}
        {t.body?.length > 0 && <Paragraphs items={t.body} />}
        <Signature lines={t.signature} />

        {t.sections?.map((section) => (
          <section key={section.title}>
            <h4 className="meta-label border-b border-line pb-2">{section.title}</h4>
            <dl>
              {section.rows.map(([label, value]) => (
                <div key={label} className="grid gap-1 border-b border-line py-2.5 sm:grid-cols-[11rem_1fr] sm:gap-4">
                  <dt className="text-steel-dark">{label}</dt>
                  <dd className="font-medium" dir="auto">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}

        {t.endorsement && (
          <div className="space-y-4 border-t border-dashed border-line pt-6">
            <RefLine value={t.endorsement.ref} />
            <Paragraphs items={t.endorsement.body} />
            <Signature lines={t.endorsement.signature} />
          </div>
        )}

        {t.footer && <p className="text-center font-semibold uppercase tracking-[0.12em]">{t.footer}</p>}
      </div>

      <footer className="border-t border-line bg-paper/60 px-6 py-4 text-[12.5px] leading-relaxed text-steel-dark md:px-10">
        <p className="font-semibold text-ink/80">Digital copy, transcribed from the original.</p>
        <p className="mt-1">Spelling is normalised; [ ] marks text missing or unreadable on the original.</p>
        {t.notes?.map((note) => (
          <p key={note} className="mt-1">
            {note}
          </p>
        ))}
      </footer>
    </div>
  );
}
