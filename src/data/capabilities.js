import { images } from './images';

/** "What We Build" — homepage capability cards. */
export const capabilities = [
  {
    id: 'government',
    title: ['Government', 'Infrastructure'],
    details: ['Roads', 'Bridges', 'Dams', 'Highways', 'Railways', 'PWD'],
    image: images.bridge,
    alt: 'Arched road bridge spanning a river at sunset',
    to: '/projects?filter=government',
  },
  {
    id: 'private',
    title: ['Private', 'Infrastructure'],
    details: ['Hotels', 'Resorts', 'Hospitals', 'Commercial Projects'],
    image: images.hotel,
    alt: 'Hotel building and pool lit at dusk',
    to: '/projects?filter=private',
  },
  {
    id: 'civil',
    title: ['Civil', 'Construction'],
    details: ['Large-scale civil & structural works'],
    image: images.towersConstruction,
    alt: 'Concrete towers under construction with tower cranes',
    to: '/experience',
  },
  {
    id: 'specialised',
    title: ['Specialised', 'Execution'],
    details: ['Heavy construction & infrastructure execution'],
    image: images.earthmoving,
    alt: 'Aerial view of earthmoving machinery working on a large site',
    to: '/machineries',
  },
];

/** "Why Doon Builders" differentiators. */
export const differentiators = [
  { title: '58+ Years of Experience', text: 'Three generations of construction knowledge.' },
  { title: 'Government Experience', text: '180+ government projects delivered.' },
  {
    title: 'Multi-Sector Execution',
    text: 'Infrastructure, hospitality, healthcare and private development.',
  },
  {
    title: 'In-House Capability',
    text: 'Machinery and execution capabilities supporting large-scale projects.',
  },
  { title: 'Long-Term Approach', text: 'Built around relationships, reputation and repeat trust.' },
];

/** Experience page — sectors of experience. */
export const experienceAreas = [
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    items: ['Roads', 'Highways', 'Bridges', 'Dams'],
    image: images.highway,
    alt: 'Highway running through open terrain',
  },
  {
    id: 'government',
    title: 'Government',
    items: ['PWD', 'Railways', 'National Highways', 'Government Contracts'],
    image: images.railway,
    alt: 'Freight locomotive on a railway line',
  },
  {
    id: 'private',
    title: 'Private Development',
    items: ['Hotels', 'Resorts', 'Hospitals', 'Commercial'],
    image: images.resort,
    alt: 'Resort pool surrounded by tropical landscaping',
  },
];

export const philosophy = [
  'Build with experience.',
  'Execute with discipline.',
  'Deliver with responsibility.',
];

export const contactProjectTypes = [
  'Government Infrastructure',
  'Private Development',
  'Roads & Highways',
  'Bridges',
  'Civil Construction',
  'Commercial',
  'Hospitality',
  'Healthcare',
  'Other',
];
