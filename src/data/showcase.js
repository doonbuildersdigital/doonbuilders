import { images, libraryImages, sitePhotos } from './images';

/**
 * "Our Work in Pictures" — five categories, five photographs each.
 * Stock photographs are representative (see public/images/stock/CREDITS.md);
 * `real: true` marks Doon Builders' own site photography.
 */
export const showcase = [
  {
    key: 'infrastructure',
    label: 'Infrastructure',
    blurb: 'Highways, bridges, railways and road works for government authorities.',
    to: '/projects?filter=government',
    items: [
      { image: images.highwayInterchange, title: 'Highway interchanges', alt: 'Aerial view of a multi-level highway interchange' },
      { image: images.bridge, title: 'Bridges', alt: 'Steel arch bridge across a river at sunset' },
      { image: images.highway, title: 'National highways', alt: 'Straight highway through open terrain' },
      { image: images.railway, title: 'Railways', alt: 'Freight locomotive on railway tracks' },
      { image: images.roadWorks, title: 'Road works', alt: 'Excavator working beside a newly surfaced road' },
    ],
  },
  {
    key: 'construction',
    label: 'Construction',
    blurb: 'Reinforcement, formwork and concreting carried out by experienced site teams.',
    to: '/ongoing-projects',
    items: [
      { image: sitePhotos.columnReinforcement, title: 'Column & beam reinforcement', alt: 'Column reinforcement cages on a Doon Builders site', real: true },
      { image: images.siteAerial, title: 'Large slab works', alt: 'Engineers on a large construction slab' },
      { image: libraryImages.rebarWorkers, title: 'Rebar fixing', alt: 'Workers fixing tall reinforcement cages' },
      { image: libraryImages.siteEngineers, title: 'Site supervision', alt: 'Site engineers in hard hats reviewing the works' },
      { image: sitePhotos.raftConcreting, title: 'Raft concreting', alt: 'Concrete being placed into raft foundation reinforcement', real: true },
    ],
  },
  {
    key: 'buildings',
    label: 'Buildings',
    blurb: 'Hotels, resorts, hospitals and commercial developments for private clients.',
    to: '/projects?filter=private',
    items: [
      { image: images.commercial, title: 'Commercial buildings', alt: 'Modern commercial building with glass facade' },
      { image: images.hotel, title: 'Hotels', alt: 'Hotel building and pool lit at dusk' },
      { image: images.hospital, title: 'Hospitals', alt: 'Hospital reception interior' },
      { image: images.resortLodge, title: 'Resorts', alt: 'Resort lodge beside a swimming pool' },
      { image: libraryImages.skyscrapers, title: 'High-rise structures', alt: 'Glass high-rise towers seen from below' },
    ],
  },
  {
    key: 'machinery',
    label: 'Machinery',
    blurb: 'Heavy earthmoving and road-building machinery that keeps execution in-house.',
    to: '/machineries',
    items: [
      { image: images.excavator, title: 'Excavators', alt: 'Tracked excavator on a rocky site' },
      { image: libraryImages.bulldozer, title: 'Bulldozers', alt: 'Yellow crawler bulldozer' },
      { image: libraryImages.backhoeLoader, title: 'Backhoe loaders', alt: 'Backhoe loader parked on a street' },
      { image: libraryImages.motorGrader, title: 'Motor graders', alt: 'Motor grader on grass' },
      { image: libraryImages.roadRoller, title: 'Road rollers', alt: 'Tandem vibratory road roller' },
    ],
  },
  {
    key: 'equipment',
    label: 'Equipment',
    blurb: 'Lifting, concreting, paving and transport equipment for every stage of work.',
    to: '/machineries',
    items: [
      { image: libraryImages.mobileCrane, title: 'Mobile cranes', alt: 'Mobile crane set up on a construction site' },
      { image: libraryImages.concretePump, title: 'Concrete pumps', alt: 'Truck-mounted concrete pump with folded boom' },
      { image: libraryImages.asphaltPaver, title: 'Asphalt pavers', alt: 'Asphalt paver laying a new road surface' },
      { image: libraryImages.dumpTruck, title: 'Tipper trucks', alt: 'Four-axle tipper truck' },
      { image: images.cranesSkyline, title: 'Tower cranes', alt: 'Tower cranes beside a building under construction' },
    ],
  },
];
