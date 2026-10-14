import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const base =
  'group/btn inline-flex items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-arch active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50';

const sizes = {
  sm: 'h-10 px-5 text-[13px]',
  md: 'h-12 px-6 text-[14px] md:h-[52px] md:px-7',
  lg: 'h-14 px-8 text-[15px] md:h-[60px] md:px-9',
};

const variants = {
  primary: 'bg-brand text-white shadow-brand hover:-translate-y-0.5 hover:bg-brand-deep',
  secondary: 'border border-ink/15 bg-surface text-ink shadow-card hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-card-hover',
  'secondary-light': 'border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:border-white hover:bg-surface hover:text-ink',
  link: 'h-auto rounded-none px-0 text-ink link-underline pb-1 hover:text-brand',
  'link-light': 'h-auto rounded-none px-0 text-white link-underline pb-1',
};

const arrows = {
  'up-right': {
    Icon: ArrowUpRight,
    motion: 'group-hover/btn:translate-x-[3px] group-hover/btn:-translate-y-[3px]',
  },
  right: { Icon: ArrowRight, motion: 'group-hover/btn:translate-x-1' },
};

/**
 * Pill button. Renders a router Link (`to`), an anchor (`href`)
 * or a native button. Arrow nudges 3–4px on hover.
 */
export default function Button({
  to,
  href,
  children,
  variant = 'primary',
  size = 'md',
  arrow = 'up-right',
  className = '',
  ...rest
}) {
  const isLink = variant.startsWith('link');
  const classes = `${base} ${isLink ? 'text-[14px] md:text-[15px]' : sizes[size]} ${variants[variant]} ${className}`;
  const arrowDef = arrow ? arrows[arrow] : null;

  const content = (
    <>
      <span>{children}</span>
      {arrowDef && (
        <arrowDef.Icon
          aria-hidden="true"
          strokeWidth={1.75}
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-arch ${arrowDef.motion}`}
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
