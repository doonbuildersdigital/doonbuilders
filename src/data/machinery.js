import { images, libraryImages } from './images';

/**
 * MACHINERY DATA
 * ------------------------------------------------------------------
 * Record shape:
 * { id, name, category, model, capacity, year, application, image, isPlaceholder }
 *
 * Only `name` and `category` are required. Model, capacity, year and application are
 * displayed only when filled in — never invent them.
 *
 * The entries below are equipment TYPES used as development samples. Replace with the
 * actual fleet list (name, model, capacity, year, application, photo) when supplied.
 */

export const machineryCategories = {
  earthmoving: { label: 'Earthmoving' },
  road: { label: 'Road Equipment' },
  lifting: { label: 'Lifting' },
  concrete: { label: 'Concrete' },
  transport: { label: 'Transport' },
};

export const machineryFilterKeys = ['all', 'earthmoving', 'road', 'lifting', 'concrete', 'transport'];

const sample = (fields) => ({
  model: '',
  capacity: '',
  year: '',
  application: '',
  image: null,
  isPlaceholder: true,
  ...fields,
});

export const machinery = [
  sample({ id: 'm01', name: 'Excavator', category: 'earthmoving', image: images.excavator }),
  sample({ id: 'm02', name: 'Road Roller', category: 'road', image: libraryImages.roadRoller }),
  sample({ id: 'm03', name: 'Wheel Loader', category: 'earthmoving', image: libraryImages.backhoeLoader }),
  sample({ id: 'm04', name: 'Crane', category: 'lifting', image: libraryImages.mobileCrane }),
  sample({ id: 'm05', name: 'Concrete Mixer', category: 'concrete', image: libraryImages.concretePump }),
  sample({ id: 'm06', name: 'Earthmoving Equipment', category: 'earthmoving', image: images.earthmoving }),
  sample({ id: 'm07', name: 'Tipper Truck', category: 'transport', image: libraryImages.dumpTruck }),
];

/** Fleet groups shown in the homepage machinery section. */
export const fleetGroups = [
  { label: 'Excavators', category: 'earthmoving', image: images.excavator },
  { label: 'Rollers', category: 'road', image: libraryImages.roadRoller },
  { label: 'Loaders', category: 'earthmoving', image: libraryImages.backhoeLoader },
  { label: 'Cranes', category: 'lifting', image: libraryImages.mobileCrane },
  { label: 'Concrete Equipment', category: 'concrete', image: libraryImages.concretePump },
  { label: 'Earthmoving Equipment', category: 'earthmoving', image: libraryImages.bulldozer },
  { label: 'Transportation Equipment', category: 'transport', image: libraryImages.dumpTruck },
];

export const specFields = [
  { key: 'model', label: 'Model' },
  { key: 'capacity', label: 'Capacity' },
  { key: 'year', label: 'Year' },
  { key: 'application', label: 'Application' },
];

export const machineSpecs = (machine) =>
  specFields.filter((f) => machine[f.key]).map((f) => ({ ...f, value: machine[f.key] }));
