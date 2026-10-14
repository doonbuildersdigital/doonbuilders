/**
 * Image registry.
 *
 * Responsive images live in /public/images as `<name>-<width>.<format>`,
 * e.g. /images/projects/bridge-640.webp, -1280.webp, -1920.webp (+ optional .avif).
 * Describe them with `responsive()`. A plain string ('/images/x.jpg') also works
 * anywhere an image is accepted.
 *
 * Everything under /images/placeholder is TEMPORARY representative stock photography
 * (Unsplash licence) used during development. It is flagged `placeholder: true` and must
 * be replaced with real Doon Builders photography before launch.
 */
const DEFAULT_WIDTHS = [640, 1280, 1920];
const PORTRAIT_WIDTHS = [640, 1280];

export function responsive(
  base,
  { widths = DEFAULT_WIDTHS, formats = ['avif', 'webp'], placeholder = false } = {},
) {
  return { base, widths, formats, placeholder };
}

const stock = (name, widths) => responsive(`/images/placeholder/${name}`, { widths, placeholder: true });

/** Representative stock library (Unsplash / Wikimedia Commons CC0) — see public/images/stock/CREDITS.md. */
const library = (name, widths = DEFAULT_WIDTHS) =>
  responsive(`/images/stock/${name}`, { widths, placeholder: true });

export const libraryImages = {
  rebarWorkers: library('rebar-workers'),
  siteEngineers: library('site-engineers'),
  skyscrapers: library('skyscrapers'),
  bulldozer: library('bulldozer'),
  roadRoller: library('road-roller'),
  backhoeLoader: library('backhoe-loader'),
  motorGrader: library('motor-grader'),
  asphaltPaver: library('asphalt-paver', PORTRAIT_WIDTHS), // original is only 1280px wide
  concretePump: library('concrete-pump'),
  mobileCrane: library('mobile-crane'),
  dumpTruck: library('dump-truck'),
};

/** Real Doon Builders site photography (portrait, 3:4 / 9:16). */
const SITE_WIDTHS = [480, 960];
const site = (name) => responsive(`/images/site/${name}`, { widths: SITE_WIDTHS });

export const sitePhotos = {
  rebarInspection: site('rebar-inspection'),
  columnReinforcement: site('column-reinforcement'),
  basementShuttering: site('basement-shuttering'),
  raftConcreting: site('raft-concreting'),
  footingConcreting: site('footing-concreting'),
  footingColumnStarter: site('footing-column-starter'),
};

/**
 * Home hero background video — representative stock footage (Pexels #38588308, Pexels Licence),
 * see public/images/stock/CREDITS.md. Replace with real Doon Builders site footage when
 * available: keep the same file names, or update the paths here.
 * The browser picks the first matching source: 720p on phones, 4K (2160p) on large or
 * high-density desktop screens, 1080p everywhere else.
 */
export const heroVideo = {
  poster: '/videos/hero-construction-poster.webp',
  sources: [
    { src: '/videos/hero-construction-720.mp4', type: 'video/mp4', media: '(max-width: 767px)' },
    {
      src: '/videos/hero-construction-2160.mp4',
      type: 'video/mp4',
      media: '(min-width: 2200px), (min-width: 1280px) and (min-resolution: 1.5dppx)',
    },
    { src: '/videos/hero-construction-1080.mp4', type: 'video/mp4' },
  ],
  placeholder: true,
};

export const images = {
  highwayInterchange: stock('highway-interchange'),
  highway: stock('highway'),
  bridge: stock('bridge'),
  dam: stock('dam'), // Gandhi Sagar Dam, M.P. — Wikimedia Commons, CC BY-SA 3.0 (see stock/CREDITS.md)
  railway: stock('railway'),
  roadWorks: stock('road-works'),
  earthmoving: stock('earthmoving'),
  excavator: stock('excavator'),
  transport: stock('transport'),
  crane: stock('crane', PORTRAIT_WIDTHS),
  constructionCranes: stock('construction-cranes'),
  cranesSkyline: stock('cranes-skyline'),
  buildingFrame: stock('building-frame', PORTRAIT_WIDTHS),
  towersConstruction: stock('towers-construction'),
  siteAerial: stock('site-aerial'),
  hotel: stock('hotel'),
  resort: stock('resort'),
  resortLodge: stock('resort-lodge'),
  hospital: stock('hospital'),
  commercial: stock('commercial'),
};

/**
 * Portraits — real photographs only. Leave null until supplied; an architectural
 * placeholder frame is shown instead.
 * Example: dilipKumar: responsive('/images/people/dilip-kumar', { widths: [640, 1280] })
 */
export const portraits = {
  dilipKumar: null,
  kuldeepKumar: null,
  thirdGeneration: null,
};
