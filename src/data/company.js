/**
 * Company information — the single source of truth.
 * Components must read from here instead of repeating details.
 * Empty strings mean "not supplied yet"; the UI hides those fields automatically.
 */
export const company = {
  name: 'Doon Builders',
  wordmark: 'DOON BUILDERS',
  legalName: '', // Registered company name — to be supplied
  tagline: 'Since 1968',
  founded: 1968,
  country: 'India',

  phone: '89230 76963',
  phoneHref: 'tel:+918923076963',
  email: 'support@doonbuilders.com',
  emailHref: 'mailto:support@doonbuilders.com',

  // WhatsApp number in international format, digits only (country code + number).
  whatsapp: '918923076963',
  whatsappMessage: 'Hello Doon Builders, I would like to discuss a construction project.',

  stats: {
    experience: '58+',
    governmentProjects: '180+',
    generations: '3',
  },

  socials: {
    instagram: '',
    youtube: '',
    linkedin: '',
  },

  address: '', // Complete office address — to be supplied
  mapUrl: '', // Google Maps link — to be supplied
  logo: '', // e.g. '/images/brand/logo.svg' — replaces the typographic wordmark when set
  logoLight: '', // optional light version of the logo for dark backgrounds
  profilePdf: '', // e.g. '/company-profile.pdf'

  siteUrl: import.meta.env.VITE_SITE_URL || '',
};

/** Blessing line shown at the top of every page (Hindi). */
export const blessing = {
  symbol: 'ॐ',
  text: 'भगवान श्री टपकेश्वर महादेव जी की कृपा से',
};

/** Click-to-chat link (opens the WhatsApp app on mobile, WhatsApp Web on desktop). */
export const whatsappHref = (message = company.whatsappMessage) =>
  `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;

export const brandMessages = {
  primary: 'Building India Since 1968.',
  supporting: 'Three generations. Decades of experience. Projects built to last.',
  closing: "Let's build it with experience.",
};

export const currentYear = new Date().getFullYear();

/** Stats in display order, with labels. Values come from company.stats. */
export const statList = [
  { key: 'experience', value: company.stats.experience, label: 'Years of Experience' },
  {
    key: 'governmentProjects',
    value: company.stats.governmentProjects,
    label: 'Government Projects Delivered',
  },
  { key: 'generations', value: company.stats.generations, label: 'Generations of Expertise', pad: 2 },
];

export const socialLinks = [
  { key: 'instagram', label: 'Instagram', url: company.socials.instagram },
  { key: 'youtube', label: 'YouTube', url: company.socials.youtube },
  { key: 'linkedin', label: 'LinkedIn', url: company.socials.linkedin },
];
