import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';

/** Splits "180+" into { number: 180, prefix: '', suffix: '+' }. */
function parseValue(value) {
  const match = String(value).match(/^(\D*)(\d+)(.*)$/);
  if (!match) return { prefix: '', number: null, suffix: String(value) };
  return { prefix: match[1], number: Number(match[2]), suffix: match[3] };
}

/**
 * Number that counts up once when it enters the viewport.
 * Renders the final value by default (no-JS, reduced motion, crawlers).
 */
export default function StatCounter({
  value,
  label,
  pad = 0,
  className = '',
  numberClassName = '',
  labelClassName = '',
  duration = 2.2,
}) {
  const ref = useRef(null);
  const { prefix, number, suffix } = parseValue(value);
  const format = (n) => String(Math.round(n)).padStart(pad, '0');

  useGSAP(
    () => {
      if (number === null) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const node = ref.current.querySelector('[data-count]').firstChild;
        const state = { n: 0 };
        node.nodeValue = format(0);
        gsap.to(state, {
          n: number,
          duration,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
          onUpdate: () => {
            node.nodeValue = format(state.n);
          },
        });
        return () => {
          node.nodeValue = format(number);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      <p className={numberClassName}>
        <span className="sr-only">
          {value} {label}
        </span>
        <span aria-hidden="true">
          {prefix}
          <span data-count>{number === null ? '' : format(number)}</span>
          {suffix}
        </span>
      </p>
      {label && (
        <p className={labelClassName} aria-hidden="true">
          {label}
        </p>
      )}
    </div>
  );
}
