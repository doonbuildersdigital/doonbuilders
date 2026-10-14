import { images } from './images';
import { archiveImages } from './archive';

/**
 * PROJECT DATA
 * ------------------------------------------------------------------
 * Every project shown anywhere on the site comes from this file.
 *
 * Record shape:
 * {
 *   id, slug, name, location,
 *   category,        // key of projectCategories below
 *   sector,          // 'infrastructure' | 'hospitality' | 'healthcare' | 'commercial' | 'public-works'
 *   ownershipType,   // 'government' | 'private'
 *   year,            // number or '' (unknown)
 *   status,          // 'ongoing' | 'completed'
 *   stage,           // 'planning' | 'execution' | 'finishing' | 'completed'
 *   progress,        // number 0–100 ONLY if a verified figure is supplied, else null
 *   client, authority,
 *   shortDescription, description,
 *   heroImage, gallery: [image], scope: [string],
 *   featured,        // shown in the homepage showcase
 *   isPlaceholder,   // TRUE = development sample. Shows a "Sample entry" badge. Remove when real.
 * }
 *
 * The first records are REAL projects documented by original work orders and tender letters
 * (see archive.js — `archiveId` links a project to its scanned record). The `sample()` records
 * after them are clearly-labelled development samples, NOT real projects; replace them with
 * verified Doon Builders projects before launch. Empty fields are hidden.
 */

export const projectCategories = {
  'roads-highways': { label: 'Roads & Highways', infrastructure: true },
  bridges: { label: 'Bridges', infrastructure: true },
  dams: { label: 'Dams', infrastructure: true },
  irrigation: { label: 'Irrigation & Canals', infrastructure: true },
  railways: { label: 'Railways', infrastructure: true },
  pwd: { label: 'PWD Works', infrastructure: true, building: true },
  hospitality: { label: 'Hotels & Resorts', building: true },
  healthcare: { label: 'Hospitals', building: true },
  commercial: { label: 'Commercial', building: true },
  other: { label: 'Other Developments', building: true },
  'project-management': { label: 'Project Management' },
};

export const ownershipLabels = { government: 'Government', private: 'Private' };

export const stageOrder = ['planning', 'execution', 'finishing', 'completed'];
export const stageLabels = {
  planning: 'Planning',
  execution: 'Execution',
  finishing: 'Finishing',
  completed: 'Completed',
};

const SAMPLE_SHORT = 'Sample entry — verified project details to be supplied.';
const SAMPLE_DESCRIPTION =
  'Project overview to be supplied. This sample entry demonstrates the project page layout and will be replaced with verified information about the project, its scope and its delivery.';
const SAMPLE_LOCATION = 'Location to be confirmed';

const sample = (fields) => ({
  location: SAMPLE_LOCATION,
  year: '',
  client: '',
  authority: '',
  progress: null,
  shortDescription: SAMPLE_SHORT,
  description: SAMPLE_DESCRIPTION,
  gallery: [],
  scope: [],
  featured: false,
  isPlaceholder: true,
  ...fields,
  stage: fields.stage || (fields.status === 'completed' ? 'completed' : 'execution'),
});

export const projects = [
  /* ---------------- Documented projects (original records in archive.js) ---------------- */
  {
    id: 'r01',
    slug: 'kolar-earth-dam-parapet-wall',
    name: 'Kolar Earth Dam — Parapet Wall',
    location: 'Kolar Dam, Sehore District, Madhya Pradesh',
    category: 'dams',
    sector: 'infrastructure',
    ownershipType: 'government',
    year: 1990,
    status: 'completed',
    stage: 'completed',
    progress: null,
    client: '',
    authority: 'Kolar Project Division No. I, Birpur',
    shortDescription: 'Parapet wall along 983.5 m of the Kolar earth dam, awarded at ₹10,34,048.',
    description:
      'Construction of the parapet wall of the Kolar Earth Dam from RD 0 to 983.5 m. The tender, quoted on 31 March 1990, was accepted by the Chief Engineer at the quoted rates for ₹10,34,048, under the Kolar Project Division No. I, Birpur, and the Kolar Project Circle, Bhopal.',
    heroImage: archiveImages.kolar1990Detail,
    imageAlt: 'Original 1990 tender acceptance letter for the Kolar Earth Dam parapet wall',
    gallery: [],
    scope: [
      'Parapet wall along the dam, RD 0 to 983.5 m',
      'Tender value ₹10,34,048 at quoted rates',
      'Accepted by the Chief Engineer, 1 June 1990',
    ],
    featured: false,
    isPlaceholder: false,
    archiveId: 'kolar-1990',
  },
  {
    id: 'r02',
    slug: 'tarana-irrigation-colony-water-tanks',
    name: 'Irrigation Colony, Tarana — Overhead Water Tanks & Fencing',
    location: 'Tarana, Ujjain District, Madhya Pradesh',
    category: 'irrigation',
    sector: 'public-works',
    ownershipType: 'government',
    year: 1980,
    status: 'completed',
    stage: 'completed',
    progress: null,
    client: '',
    authority: 'Irrigation S&P Division, Ujjain',
    shortDescription: 'Overhead water tanks for the irrigation quarters and barbed-wire fencing of the colony.',
    description:
      'Construction of overhead water tanks in the irrigation quarters and barbed-wire fencing around the Irrigation Colony at Tarana, awarded by the Executive Engineer, Irrigation S&P Division, Ujjain, at the rates sanctioned by the Superintending Engineer, Upper Chambal Circle, Indore.',
    heroImage: archiveImages.tarana1980Detail,
    imageAlt: 'Original 1980 work order for overhead water tanks at the Irrigation Colony, Tarana',
    gallery: [],
    scope: [
      'Overhead water tanks in the irrigation quarters',
      'Barbed-wire fencing of the Irrigation Colony',
      'Three-month completion period under the work order',
    ],
    featured: false,
    isPlaceholder: false,
    archiveId: 'tarana-1980',
  },
  {
    id: 'r03',
    slug: 'pk-tank-minor-canal-fall',
    name: 'P.K. Tank Project — Canal Fall, Minor Canal No. 2',
    location: 'P.K. Canal Sub-Division, Agar, Madhya Pradesh',
    category: 'irrigation',
    sector: 'infrastructure',
    ownershipType: 'government',
    year: 1976,
    status: 'completed',
    stage: 'completed',
    progress: null,
    client: '',
    authority: 'Irrigation Division, Dewas',
    shortDescription: 'A 6 ft canal fall at chainage 11.00 on Minor Canal No. 2 of the P.K. Tank project.',
    description:
      'Construction of a 6 ft fall at chainage 11.00 of Minor Canal No. 2 of the P.K. Tank project, awarded by the Executive Engineer, Irrigation Division, Dewas, on the piece-work system at the Current Schedule of Rates of the Upper Chambal Circle, Indore — one of the earliest surviving records of the family’s government work.',
    heroImage: archiveImages.dewas1976Heading,
    imageAlt: 'Original 1976 work order for a canal fall on the P.K. Tank project',
    gallery: [],
    scope: [
      '6 ft drop structure (fall) on Minor Canal No. 2',
      'At chainage 11.00 of the P.K. Tank canal system',
      'Piece-work agreement in Form "D"',
    ],
    featured: false,
    isPlaceholder: false,
    archiveId: 'dewas-1976',
  },
  {
    id: 'r04',
    slug: 'kabeer-world-dubai',
    name: 'Kabeer World Project Management Services — Dubai',
    location: 'Dubai, United Arab Emirates',
    category: 'project-management',
    sector: 'commercial',
    ownershipType: 'private',
    year: 2023,
    status: 'completed',
    stage: 'completed',
    progress: null,
    client: '',
    authority: 'Government of Dubai',
    shortDescription: 'Professional licence for project management services in Dubai — licence no. 1174457.',
    description:
      'Kabeer World Project Management Services Est. was licensed by the Government of Dubai on 10 April 2023 as a wholly owned sole establishment providing project management services, under professional licence no. 1174457 — taking the family’s construction experience to an international market.',
    heroImage: archiveImages.dubai2023,
    imageAlt: 'Government of Dubai professional licence for Kabeer World Project Management Services Est.',
    gallery: [],
    scope: [
      'Project management services, Dubai',
      'Sole establishment, 100% owned',
      'Licence valid 10 April 2023 – 9 April 2024',
    ],
    featured: false,
    isPlaceholder: false,
    archiveId: 'dubai-2023',
  },

  /* ---------------- Development samples — replace before launch ---------------- */
  sample({
    id: 'p01',
    slug: 'sample-highway-project',
    name: 'Highway Project',
    category: 'roads-highways',
    sector: 'infrastructure',
    ownershipType: 'government',
    status: 'completed',
    heroImage: images.highwayInterchange,
    gallery: [images.highway, images.roadWorks, images.earthmoving],
    scope: ['Scope of work — to be supplied', 'Scope of work — to be supplied'],
    featured: true,
  }),
  sample({
    id: 'p02',
    slug: 'sample-bridge-project',
    name: 'Bridge Project',
    category: 'bridges',
    sector: 'infrastructure',
    ownershipType: 'government',
    status: 'completed',
    heroImage: images.bridge,
    featured: true,
  }),
  sample({
    id: 'p03',
    slug: 'sample-hotel-development',
    name: 'Hotel Development',
    category: 'hospitality',
    sector: 'hospitality',
    ownershipType: 'private',
    status: 'completed',
    heroImage: images.hotel,
    featured: true,
  }),
  sample({
    id: 'p04',
    slug: 'sample-railway-works',
    name: 'Railway Works',
    category: 'railways',
    sector: 'infrastructure',
    ownershipType: 'government',
    status: 'completed',
    heroImage: images.railway,
    featured: true,
  }),
  sample({
    id: 'p05',
    slug: 'sample-hospital-project',
    name: 'Hospital Project',
    category: 'healthcare',
    sector: 'healthcare',
    ownershipType: 'private',
    status: 'completed',
    heroImage: images.hospital,
    featured: true,
  }),
  sample({
    id: 'p06',
    slug: 'sample-road-infrastructure',
    name: 'Road Infrastructure Works',
    category: 'roads-highways',
    sector: 'infrastructure',
    ownershipType: 'government',
    status: 'ongoing',
    stage: 'execution',
    heroImage: images.roadWorks,
  }),
  sample({
    id: 'p07',
    slug: 'sample-resort-development',
    name: 'Resort Development',
    category: 'hospitality',
    sector: 'hospitality',
    ownershipType: 'private',
    status: 'completed',
    heroImage: images.resort,
  }),
  sample({
    id: 'p08',
    slug: 'sample-dam-project',
    name: 'Dam Project',
    category: 'dams',
    sector: 'infrastructure',
    ownershipType: 'government',
    status: 'completed',
    heroImage: images.dam,
    imageAlt: 'Concrete gravity dam with spillway piers above its reservoir',
  }),
  sample({
    id: 'p09',
    slug: 'sample-commercial-development',
    name: 'Commercial Development',
    category: 'commercial',
    sector: 'commercial',
    ownershipType: 'private',
    status: 'ongoing',
    stage: 'finishing',
    heroImage: images.commercial,
  }),
  sample({
    id: 'p10',
    slug: 'sample-pwd-works',
    name: 'PWD Building Works',
    category: 'pwd',
    sector: 'public-works',
    ownershipType: 'government',
    status: 'completed',
    heroImage: images.buildingFrame,
  }),
  sample({
    id: 'p11',
    slug: 'sample-earthwork-package',
    name: 'Earthwork Package',
    category: 'roads-highways',
    sector: 'infrastructure',
    ownershipType: 'government',
    status: 'ongoing',
    stage: 'planning',
    heroImage: images.earthmoving,
  }),
  sample({
    id: 'p12',
    slug: 'sample-resort-lodge',
    name: 'Resort Lodge',
    category: 'hospitality',
    sector: 'hospitality',
    ownershipType: 'private',
    status: 'completed',
    heroImage: images.resortLodge,
  }),
];

/* ------------------------------------------------------------------ */
/* Filters                                                             */
/* ------------------------------------------------------------------ */

const isInfrastructure = (p) => Boolean(projectCategories[p.category]?.infrastructure);
const isBuilding = (p) => Boolean(projectCategories[p.category]?.building);

export const filters = {
  all: { label: 'All', test: () => true },
  government: { label: 'Government', test: (p) => p.ownershipType === 'government' },
  private: { label: 'Private', test: (p) => p.ownershipType === 'private' },
  infrastructure: { label: 'Infrastructure', test: isInfrastructure },
  'roads-highways': { label: 'Roads & Highways', test: (p) => p.category === 'roads-highways' },
  bridges: { label: 'Bridges', test: (p) => p.category === 'bridges' },
  dams: { label: 'Dams', test: (p) => p.category === 'dams' },
  irrigation: { label: 'Irrigation', test: (p) => p.category === 'irrigation' },
  railways: { label: 'Railways', test: (p) => p.category === 'railways' },
  pwd: { label: 'PWD', test: (p) => p.category === 'pwd' },
  buildings: { label: 'Buildings', test: isBuilding },
  hospitality: { label: 'Hospitality', test: (p) => p.category === 'hospitality' },
  healthcare: { label: 'Healthcare', test: (p) => p.category === 'healthcare' },
  commercial: { label: 'Commercial', test: (p) => p.category === 'commercial' },
};

export const homeFilterKeys = ['all', 'government', 'private', 'infrastructure'];
export const projectsPageFilterKeys = [
  'all',
  'government',
  'private',
  'roads-highways',
  'bridges',
  'dams',
  'irrigation',
  'buildings',
];

export function applyFilter(list, key) {
  const filter = filters[key] || filters.all;
  return list.filter(filter.test);
}

/* ------------------------------------------------------------------ */
/* Selectors                                                           */
/* ------------------------------------------------------------------ */

export const categoryLabel = (p) => projectCategories[p.category]?.label || '';
export const ownershipLabel = (p) => ownershipLabels[p.ownershipType] || '';

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);
export const featuredProjects = () => projects.filter((p) => p.featured);
export const ongoingProjects = () => projects.filter((p) => p.status === 'ongoing');
export const completedProjects = () =>
  projects
    .filter((p) => p.status === 'completed')
    .sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0));
export const projectsByOwnership = (type) => projects.filter((p) => p.ownershipType === type);

export function getRelatedProjects(project, limit = 3) {
  const others = projects.filter((p) => p.slug !== project.slug);
  const score = (p) =>
    (p.category === project.category ? 2 : 0) + (p.ownershipType === project.ownershipType ? 1 : 0);
  return [...others].sort((a, b) => score(b) - score(a)).slice(0, limit);
}

export function getNextProject(project) {
  const index = projects.findIndex((p) => p.slug === project.slug);
  return projects[(index + 1) % projects.length];
}

/** Experience categories shown on the Projects Delivered page. */
export const deliveredCategories = {
  government: ['Roads', 'Bridges', 'Dams', 'Irrigation & Canals', 'National Highways', 'Railways', 'PWD'],
  private: ['Hotels', 'Resorts', 'Hospitals', 'Commercial', 'Other Developments'],
};
