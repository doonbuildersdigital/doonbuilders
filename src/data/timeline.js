import { images, portraits } from './images';

/**
 * The three generations — used on Home (Legacy + Three Generations),
 * Experience and About. Edit here only.
 */
export const timeline = [
  {
    year: 1968,
    generation: 'First Generation',
    person: 'Dilip Kumar Ji',
    title: 'The Beginning',
    focus: ['Roads', 'Bridges', 'Dams', 'Irrigation', 'Government Projects'],
    chapter: 'The Beginning',
    story:
      'Dilip Kumar Ji established the business and undertook road work, bridge work, dams and government projects including National Highways, Railways and PWD works. Original work orders from 1976, 1980 and 1990 record canal, irrigation-colony and dam works for the Irrigation Department of Madhya Pradesh — from the P.K. Tank project to the Kolar Dam.',
    portrait: portraits.dilipKumar,
    image: images.highway,
    imageAlt: 'Open highway stretching towards distant mountains',
  },
  {
    year: 1998,
    generation: 'Second Generation',
    person: '',
    personFallback: 'Taking It Forward',
    title: 'Second Generation',
    focus: ['Hotels', 'Resorts', 'Hospitals', 'Private Projects'],
    chapter: 'The Second Generation',
    story:
      'The second generation took the business forward and expanded into private construction, including hotels, resorts, hospitals and other developments.',
    portrait: portraits.kuldeepKumar,
    image: images.resortLodge,
    imageAlt: 'Resort building with timber terrace and pool',
  },
  {
    year: 2020,
    generation: 'Third Generation',
    person: '',
    personFallback: 'Young Generation',
    title: 'The Legacy Continues',
    focus: ['Modern execution.', 'Continuing legacy.'],
    chapter: 'The Young Generation',
    story:
      'The young generation took over the business, carrying forward decades of experience while continuing to evolve with modern construction practices.',
    portrait: portraits.thirdGeneration,
    image: images.cranesSkyline,
    imageAlt: 'Tower cranes above a building under construction',
  },
];

export const personName = (era) => era.person || era.personFallback || era.generation;

export const legacySummary =
  'From roads, bridges, dams and government infrastructure to hotels, resorts, hospitals and private developments, Doon Builders has evolved across three generations while staying rooted in the fundamentals of quality construction and execution.';
