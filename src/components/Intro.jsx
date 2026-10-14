import { useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { introIsActive, completeIntro } from '@/lib/intro';
import { setScrollLocked } from '@/hooks/useLenis';
import { company } from '@/data/company';

/*
 * Architectural elevation of a building under construction (viewBox 520 × 340).
 * Strokes use pathLength="1" so each one is "drawn" by animating stroke-dashoffset 1 → 0.
 */
const G = 300; // ground line
const COLS = [150, 205, 260, 315, 370]; // column centre lines, four bays of 55
const SLABS = [252, 212, 172, 132]; // finished floor slabs, bottom to top
const TOP = 92; // roof slab, still being cast
const CAST_TO = 262; // the roof slab is cast up to here; formwork beyond
const BAYS = COLS.slice(0, -1);

const rect = (x, y, w, h) => `M${x} ${y} H${x + w} V${y + h} H${x} Z`;

// Upper-floor windows (floors 1–3), framed with a mullion and sill; listed bottom to top.
const WINDOWS = SLABS.slice(0, 3).flatMap((slab, f) => {
  const y = slab - 30;
  return BAYS.map((col, b) => ({ key: `w${f}-${b}`, x: col + 9, y, w: 37, h: 22 }));
});

// Ground floor: shopfront glazing in three bays, entrance doors in the second bay.
const SHOPFRONTS = BAYS.filter((_, b) => b !== 1).map((col) => ({ key: `g${col}`, x: col + 6, y: 262, w: 43, h: 34 }));
const DOOR = { x: 218, y: 266, w: 29, h: 34 };

// Crane mast and jib lattices.
const zigzag = (fromY, toY, left, right, step) => {
  let d = `M${left} ${fromY}`;
  for (let y = fromY - step, l = false; y >= toY; y -= step, l = !l) d += ` L${l ? left : right} ${y}`;
  return d;
};
const MAST_LATTICE = zigzag(G, 52, 432, 444, 16);
const JIB_TRUSS = (() => {
  let d = 'M432 44';
  for (let x = 418, top = true; x >= 238; x -= 14, top = !top) d += ` L${x} ${top ? 36 : 44}`;
  return d;
})();

// Scaffold on the right face: ledgers at each floor, alternating braces.
const LEDGERS = [292, 252, 212, 172, 132, 92];

// Neighbouring finished building, drawn faintly for depth.
const NEIGHBOUR_WINDOWS = [196, 232, 268].flatMap((y) => [58, 82, 106].map((x) => rect(x, y, 14, 16))).join(' ');

function Draw({ d, tone = 'ink', width = 1.2, group }) {
  return <path d={d} pathLength="1" data-draw={group} className={`intro-${tone}`} strokeWidth={width} />;
}

/** Branded entry, shown once per session: a building is drawn, then the wordmark settles in. */
export default function Intro() {
  const [visible, setVisible] = useState(introIsActive);
  const root = useRef(null);
  const tl = useRef(null);

  useGSAP(
    () => {
      if (!visible) return undefined;
      setScrollLocked(true);
      const finish = () => {
        completeIntro();
        setScrollLocked(false);
        setVisible(false);
      };

      const draw = (group, vars) => [`[data-draw="${group}"]`, { strokeDashoffset: 0, ease: 'power2.inOut', ...vars }];

      tl.current = gsap
        .timeline({ onComplete: finish, defaults: { ease: 'power3.out' } })
        .from('[data-intro-grid]', { autoAlpha: 0, duration: 0.6 }, 0)
        .to(...draw('ground', { duration: 0.55 }), 0.05)
        .to(...draw('earth', { duration: 0.5 }), 0.25)
        .from('[data-intro-fade="below"]', { autoAlpha: 0, duration: 0.5 }, 0.35)
        .to(...draw('neighbour', { duration: 0.9, stagger: 0.08 }), 0.25)
        .to(...draw('col', { duration: 0.8, stagger: 0.06, ease: 'power2.out' }), 0.4)
        .to(...draw('slab', { duration: 0.32, stagger: 0.14 }), 0.62)
        .to(...draw('mast', { duration: 0.6, stagger: 0.05, ease: 'power2.out' }), 0.75)
        .to(...draw('scaffold', { duration: 0.45, stagger: 0.025 }), 1.0)
        .from('[data-intro-glass]', { autoAlpha: 0, scale: 0.7, transformOrigin: '50% 100%', duration: 0.35, stagger: 0.03 }, 1.15)
        .to(...draw('jib', { duration: 0.55, stagger: 0.05 }), 1.2)
        .to(...draw('works', { duration: 0.3, stagger: 0.025 }), 1.4)
        .from('[data-intro-fade="weights"]', { autoAlpha: 0, y: -6, duration: 0.35, stagger: 0.06 }, 1.5)
        .to(...draw('glare', { duration: 0.3, stagger: 0.01 }), 1.75)
        .from('[data-intro-trolley]', { autoAlpha: 0, x: 120, duration: 0.55, ease: 'power2.out' }, 1.6)
        .to(...draw('hook', { duration: 0.35 }), 1.95)
        .from('[data-intro-load]', { autoAlpha: 0, y: -22, duration: 0.5 }, 2.0)
        .from('[data-intro-letter]', { autoAlpha: 0, yPercent: 40, duration: 0.55, stagger: 0.035 }, 2.15)
        .from('[data-intro-rule]', { scaleX: 0, duration: 0.6, ease: 'power3.inOut' }, 2.55)
        .from('[data-intro-tagline]', { autoAlpha: 0, y: 8, duration: 0.6 }, 2.7)
        .to(root.current, { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, 3.75);

      // Any click or key fast-forwards the rest of the intro.
      const skip = () => tl.current?.timeScale(5);
      const el = root.current;
      window.addEventListener('keydown', skip, { once: true });
      el.addEventListener('pointerdown', skip, { once: true });
      return () => {
        window.removeEventListener('keydown', skip);
        el.removeEventListener('pointerdown', skip);
      };
    },
    { scope: root, dependencies: [visible] },
  );

  if (!visible) return null;

  return (
    <div
      ref={root}
      className="intro fixed inset-0 z-[100] flex cursor-default items-center justify-center overflow-hidden bg-surface text-ink"
      aria-hidden="true"
    >
      <div data-intro-grid className="bg-blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_78%)]" />

      <div className="relative flex w-full flex-col items-center px-6 text-center">
        <svg viewBox="0 0 520 340" className="w-[min(680px,92vw)]" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Ground, earth hatching and the foundation below grade */}
          <Draw group="ground" d={`M24 ${G} H500`} width={1.8} />
          <Draw
            group="earth"
            tone="faint"
            width={0.7}
            d={Array.from({ length: 48 }, (_, i) => `M${30 + i * 10} ${G + 7} L${36 + i * 10} ${G + 1}`).join(' ')}
          />
          <path data-intro-fade="below" d={rect(140, G + 2, 240, 16)} className="intro-dash" />
          <path data-intro-fade="below" d={rect(426, G + 2, 24, 12)} className="intro-dash" />

          {/* Neighbouring building */}
          <Draw group="neighbour" tone="faint" width={0.9} d={`M48 ${G} V184 H132 V${G} M44 184 H136`} />
          <Draw group="neighbour" tone="faint" width={0.6} d={NEIGHBOUR_WINDOWS} />

          {/* Glazing — fills in floor by floor once the frame is up */}
          {SHOPFRONTS.map((g) => (
            <rect key={g.key} data-intro-glass x={g.x} y={g.y} width={g.w} height={g.h} className="intro-glass" />
          ))}
          <rect data-intro-glass x={DOOR.x} y={DOOR.y} width={DOOR.w} height={DOOR.h} className="intro-glass" />
          {WINDOWS.map((w) => (
            <rect key={w.key} data-intro-glass x={w.x} y={w.y} width={w.w} height={w.h} className="intro-glass" />
          ))}

          {/* Frames: transoms, mullions, sills, door leaves and canopy */}
          <Draw
            group="works"
            tone="ink"
            width={0.7}
            d={[
              ...SHOPFRONTS.map((g) => `M${g.x} ${g.y + 10} H${g.x + g.w} M${g.x + g.w / 2} ${g.y + 10} V${g.y + g.h}`),
              ...WINDOWS.map((w) => `M${w.x + w.w / 2} ${w.y} V${w.y + w.h} M${w.x - 2} ${w.y + w.h + 2} H${w.x + w.w + 2}`),
              `M${DOOR.x + DOOR.w / 2} ${DOOR.y} V${G} M212 ${DOOR.y - 4} H253`,
            ].join(' ')}
          />
          {/* Reflections on the glass */}
          <Draw
            group="glare"
            tone="faint"
            width={0.6}
            d={[...WINDOWS, ...SHOPFRONTS]
              .map((w) => `M${w.x + 5} ${w.y + w.h - 5} L${w.x + 12} ${w.y + 5} M${w.x + 10} ${w.y + w.h - 5} L${w.x + 17} ${w.y + 5}`)
              .join(' ')}
          />

          {/* Structure: columns rise, slabs stack floor by floor */}
          {COLS.map((x) => (
            <Draw key={x} group="col" d={`M${x} ${G} V${TOP}`} width={2.4} />
          ))}
          {SLABS.map((y) => (
            <Draw key={y} group="slab" d={rect(146, y, 228, 4)} width={1.4} />
          ))}

          {/* Roof slab under construction: cast part, formwork, props and rebar starters */}
          <Draw group="works" d={rect(146, TOP, CAST_TO - 146, 4)} width={1.4} />
          <Draw group="works" tone="brand" width={1} d={`M${CAST_TO} ${TOP + 4} H374`} />
          <Draw
            group="works"
            tone="faint"
            width={0.7}
            d={[275, 290, 305, 320, 335, 350, 362].map((x) => `M${x} ${TOP + 4} V${SLABS[3]}`).join(' ')}
          />
          <Draw
            group="works"
            tone="brand"
            width={0.9}
            d={[150, 205, 260].map((x) => `M${x - 2.5} ${TOP} V${TOP - 14} M${x + 2.5} ${TOP} V${TOP - 14}`).join(' ')}
          />

          {/* Scaffold */}
          <Draw group="scaffold" tone="faint" width={0.9} d={`M378 ${G} V84 M394 ${G} V84`} />
          {LEDGERS.map((y, i) => {
            const above = LEDGERS[i + 1];
            const brace = above ? (i % 2 ? ` M378 ${y} L394 ${above}` : ` M394 ${y} L378 ${above}`) : '';
            return <Draw key={y} group="scaffold" tone="faint" width={0.8} d={`M378 ${y} H394 M378 ${y - 8} H394${brace}`} />;
          })}

          {/* Tower crane */}
          <Draw group="mast" d={`M432 ${G} V36 M444 ${G} V36`} width={1.6} />
          <Draw group="mast" tone="faint" width={0.8} d={MAST_LATTICE} />
          <Draw group="mast" d={`M424 ${G} H452`} width={2.6} />
          <Draw group="jib" tone="brand" width={1.8} d="M438 36 H230 M432 44 H238 L230 36" />
          <Draw group="jib" tone="brand" width={0.7} d={JIB_TRUSS} />
          <Draw group="jib" tone="brand" width={1.8} d="M444 36 H502 M444 44 H502 V36" />
          <Draw group="jib" tone="faint" width={0.8} d="M438 36 V10 L292 36 M438 10 L500 36" />
          <rect data-intro-fade="weights" x="444" y="46" width="13" height="11" rx="1" className="intro-solid" />
          <rect data-intro-fade="weights" x="486" y="45" width="13" height="8" className="intro-solid" />
          <rect data-intro-fade="weights" x="486" y="54" width="13" height="8" className="intro-solid" />
          <g data-intro-trolley>
            <rect x="296" y="44" width="12" height="5" rx="1" className="intro-solid" />
          </g>
          <Draw group="hook" tone="ink" width={0.9} d="M302 49 V70" />
          <g data-intro-load>
            <rect x="298" y="70" width="8" height="6" rx="1" className="intro-solid" />
            <path d="M302 76 L276 82 M302 76 L328 82" className="intro-ink" strokeWidth="0.8" />
            <rect x="270" y="82" width="64" height="5" rx="1" className="intro-solid" />
          </g>
        </svg>

        <p className="mt-7 flex whitespace-nowrap pl-[0.12em] text-[clamp(1.6rem,6.2vw,3.6rem)] font-extrabold leading-[1.15] tracking-[0.12em] text-brand md:mt-9">
          {[...company.wordmark].map((ch, i) => (
            <span key={i} data-intro-letter className="inline-block" style={ch === ' ' ? { width: '0.4em' } : undefined}>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </p>
        <span data-intro-rule className="mt-4 block h-[3px] w-20 origin-center rounded-full bg-brand md:mt-5" />
        <p data-intro-tagline className="mt-4 text-[11px] font-semibold uppercase tracking-[0.42em] text-steel-dark md:mt-5 md:text-[12px]">
          Infrastructure · Construction
        </p>
      </div>
    </div>
  );
}
