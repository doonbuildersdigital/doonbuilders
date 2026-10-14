import { responsive, sitePhotos } from './images';
import { timeline, personName } from './timeline';

/**
 * ARCHIVE — original records from the family's files.
 *
 * Each photograph was digitised like a document scan: the sheet is isolated from the file
 * folder, lighting is evened out so the paper reads white, and the type is sharpened.
 * Every field and every digital copy below is transcribed from the document itself; nothing
 * is inferred beyond what the paper says, and names are kept exactly as written.
 *
 * Images live in /public/images/archive:
 *   full pages  `<name>-480|960.(avif|webp)`   (portrait)
 *   close-ups   `<name>-640|1280.(avif|webp)`  (landscape)
 */
const page = (name) => responsive(`/images/archive/${name}`, { widths: [480, 960] });
const crop = (name) => responsive(`/images/archive/${name}`, { widths: [640, 1280] });

export const archiveImages = {
  dewas1976: page('dewas-1976-page'),
  dewas1976Alt: page('dewas-1976-page-alt'),
  dewas1976Heading: crop('dewas-1976-heading'),
  dewas1976Addressee: crop('dewas-1976-addressee'),
  tarana1980: page('tarana-1980-page'),
  tarana1980Detail: crop('tarana-1980-detail'),
  kolar1990: page('kolar-1990-page'),
  kolar1990Detail: crop('kolar-1990-detail'),
  dubai2023: crop('dubai-2023-licence'),
  dubai2023Details: crop('dubai-2023-details'),
  dubai2023Issue: crop('dubai-2023-issue'),
};

/**
 * Record shape:
 * {
 *   id, generation (1 | 2 | 3), year, date, type, title,
 *   facts: [{ label, value }],   // shown as a definition list; empty values are hidden
 *   summary,                     // one or two plain sentences
 *   scans: [{ image, caption }], // first scan is the cover
 *   transcript,                  // optional typed "digital copy" (see DigitalCopy.jsx)
 *   projectSlug,                 // optional link to the matching record in projects.js
 * }
 *
 * transcript: {
 *   letterhead: [line], ref: { left, right }, to: [line], fields: [[label, value]],
 *   salutation, body: [string | { n, text }], signature: [line],
 *   endorsement: { ref, body, signature }, footer,
 *   sections: [{ title, rows: [[label, value]] }],   // form-style documents
 *   notes: [string],                                  // editorial notes on the original
 * }
 * In transcripts, [ ] marks text that is missing or unreadable on the original.
 */
export const archiveRecords = [
  {
    id: 'dewas-1976',
    generation: 1,
    year: 1976,
    date: '18 March 1976',
    type: 'Work Order',
    title: 'Construction of a 6 ft fall — Minor Canal No. 2, P.K. Tank Project',
    facts: [
      { label: 'Issued by', value: 'Executive Engineer, Irrigation Division, Dewas' },
      { label: 'Signed by', value: 'S. K. Varma, Executive Engineer' },
      { label: 'Reference', value: 'No. 1397/SAC' },
      { label: 'Awarded to', value: 'Shri Dilip Singh S/o Pritam Singh, Contractor, Radha Ganj, Dewas' },
      { label: 'Location', value: 'Chainage 11.00, P.K. Canal Sub-Division, Agar (M.P.)' },
      { label: 'Cost of works', value: '₹4,925' },
      { label: 'Completion', value: 'Within one month' },
      { label: 'Agreement', value: 'Form "D", piece-work system' },
    ],
    summary:
      'Awarded on the piece-work system under a Form "D" agreement, at the rates of the Current Schedule of Rates of Irrigation, Upper Chambal Circle, Indore. Executed under the supervision of the Sub-Divisional Officer, P.K. Canal Sub-Division, Agar.',
    scans: [
      { image: archiveImages.dewas1976, caption: 'Work order — full page' },
      { image: archiveImages.dewas1976Heading, caption: 'Heading, addressee and cost of works' },
      { image: archiveImages.dewas1976Addressee, caption: 'Close-up — date, addressee and subject' },
      { image: archiveImages.dewas1976Alt, caption: 'Work order — second photograph of the full page' },
    ],
    transcript: {
      letterhead: ['Office of the Executive Engineer', 'Irrigation Division, Dewas'],
      ref: { left: 'No. 1397/SAC/', right: 'Dewas, dated the 18/3/1976' },
      to: ['M/s Shri Dilip Singh S/o Pritam Singh, Contr.', 'Radha Ganj, Dewas'],
      fields: [
        ['Sub', 'Const. of 6′ fall at Ch. 11.00 of Minor Canal No. 2 of P.K. Tank project.'],
        ['Ref', 'Your application dated ———— / cost of works Rs. 4925/-'],
      ],
      body: [
        { n: '1', text: 'Having executed the agreement in form "D" on piece work system by you, the above work is hereby awarded to you as per rates entered in the above Agreement.' },
        { n: '2', text: 'The above rates are subject to the relevant notes of relevant chapter of the "Current Schedule of Rates" of Irrigation Upper Chambal Circle, Indore read with the General Instructions of the "Current Schedule of Rates" referred to above.' },
        { n: '3', text: 'If any item contingent to the execution of the work as per agreement is got executed for which there is no rates in the above schedule of rates, payment for the same will be made at the rate mentioned in the current schedule of rates of Upper Chambal Circle, Indore.' },
        { n: '4', text: 'You are requested to start the above work and complete by one month.' },
        { n: '5', text: 'For details of work to be executed the Sub-Divisional Officer, P.K. Canal Sub-Dn. Agar may please be contacted. The work is to be executed as per instructions of the above officer under his supervision.' },
        { n: '6', text: 'The rates for lead provided in the agreement are for maximum lead but payment will be made to the extent of actual lead in value at the proportionate rate.' },
      ],
      signature: ['(S. K. Varma)', 'Executive Engineer', 'Irrigation Division, Dewas'],
      endorsement: {
        ref: { left: 'Endt. No. ——/SAC/', right: 'Dewas, dated the —/—/1976' },
        body: [
          { n: '1', text: 'Copy is forwarded to the Sub-Divisional Officer, P.K. Canal Sub-Dn. Agar.' },
          { n: '2', text: 'He should please note specially the provision para 6 of the work order while making payment.' },
          { n: '3', text: 'The Auditor, P.K. Canal, for information and necessary action and guidance. A copy of the agreement No. 178/[ ]-76 pertaining to the work is enclosed for information and [ ]' },
        ],
      },
      notes: [
        'Typed form with the addressee, subject, cost and completion period filled in by hand.',
        'The lower edge of the original is torn; the last line of the endorsement is incomplete.',
      ],
    },
    projectSlug: 'pk-tank-minor-canal-fall',
  },
  {
    id: 'tarana-1980',
    generation: 1,
    year: 1980,
    date: '23 October 1980',
    type: 'Work Order',
    title: 'Overhead water tanks and barbed-wire fencing — Irrigation Colony, Tarana',
    facts: [
      { label: 'Issued by', value: 'Executive Engineer, Irrigation S&P Division, Ujjain' },
      { label: 'Reference', value: 'No. 975/Ar-T' },
      { label: 'Awarded to', value: 'Shri Dilipsingh S/o Shri Pritamsingh, Contractor, 49 Station Road, Dewas' },
      { label: 'Location', value: 'Irrigation Colony, Tarana, Ujjain (M.P.)' },
      { label: 'Contract value', value: '₹7,500' },
      { label: 'Completion', value: 'Within three months' },
      { label: 'Rates sanctioned by', value: 'Superintending Engineer, Upper Chambal Circle, Indore' },
    ],
    summary:
      'Work order agreement accepted at the rates sanctioned by the Superintending Engineer, Upper Chambal Circle, Indore, for overhead water tanks in the irrigation quarters and barbed-wire fencing of the colony. Executed under the Sub-Divisional Officer, Irrigation Sub-Division, Tarana.',
    scans: [
      { image: archiveImages.tarana1980, caption: 'Work order — full page' },
      { image: archiveImages.tarana1980Detail, caption: 'Close-up — addressee, subject and acceptance' },
    ],
    transcript: {
      ref: { left: 'No. 975/Ar-T.', right: 'Ujjain, dtd. 23-10-1980' },
      to: ['Shri Dilipsingh S/o Shri Pritamsingh,', 'Contractor,', 'H.No. 49-Station Road, Dewas.'],
      fields: [
        ['Sub', 'Construction of overhead water tanks in the irrigation quarters and barbed wire fencing in Irrigation Colony at Tarana.'],
        ['Ref', 'Your application dtd. Nil.'],
      ],
      body: [
        'Your work order agreement for the above work for Rs. 7500/- has been accepted at the rate of sanctioned by the Superintending Engineer Upper Chambal Circle Indore.',
        'Please start the work and complete it within the period of three months from the date of issue of this work order under the instructions of the Sub Divisional Officer Tarana.',
      ],
      signature: ['Executive Engineer', 'Irrigation S&P Division Ujjain'],
      endorsement: {
        ref: { left: 'Endt. No. ——/Ar-T.', right: 'Ujjain, dtd. 23-10-1980' },
        body: [
          'Copy forwarded to the Sub Divisional Officer Irrigation Sub Division Tarana for information with ref. to his No. Q-1 dtd. 22-10-1980.',
        ],
        signature: ['Executive Engineer', 'Irrigation S & P Division Ujjain'],
      },
      notes: [
        'The completion period was typed as "two" months and corrected by hand to "Three".',
        'Signed and dated 23/X by the Executive Engineer.',
      ],
    },
    projectSlug: 'tarana-irrigation-colony-water-tanks',
  },
  {
    id: 'kolar-1990',
    generation: 1,
    year: 1990,
    date: '1 June 1990',
    type: 'Tender Acceptance',
    title: 'Parapet wall — Kolar Earth Dam, RD 0 to 983.5 m',
    facts: [
      { label: 'Issued by', value: 'Executive Engineer, Kolar Project Division No. I, Birpur, Distt. Sehore' },
      { label: 'Reference', value: 'Memo No. 1056/SAC' },
      { label: 'Awarded to', value: 'Shri Dilip Bali, Contractor, B-153, Shahpura, Bhopal' },
      { label: 'Location', value: 'Kolar Dam, Sehore District (M.P.)' },
      { label: 'Tender value', value: '₹10,34,048' },
      { label: 'Initial deposit', value: '₹25,851' },
      { label: 'Accepted by', value: 'Chief Engineer, on the quoted rates' },
    ],
    summary:
      'Tender quoted on 31 March 1990 for the parapet wall along 983.5 metres of the Kolar earth dam, accepted at the quoted rates with an initial deposit of ₹25,851 for executing the agreement. Copy endorsed to the Superintending Engineer, Kolar Project Circle, Bhopal.',
    scans: [
      { image: archiveImages.kolar1990, caption: 'Tender acceptance — full page' },
      { image: archiveImages.kolar1990Detail, caption: 'Close-up — subject and tender value' },
    ],
    transcript: {
      letterhead: ['Office of the Executive Engineer', 'Kolar Project Division No. I, Birpur', 'Distt. : Sehore'],
      ref: { left: 'Memo No. 1056/SAC/', right: 'Birpur. Dated 1-6-90' },
      to: ['Shri Dilip Bali, Contractor,', 'B-153, Shahpura, Bhopal.'],
      fields: [
        ['Sub', 'Tender for the work construction of parapet wall of Kolar Earth Dam R.D. 0 to 983.5 m.'],
        ['Ref', 'Your quoted tender on 31-3-90.'],
      ],
      salutation: 'Dear Sir,',
      body: [
        'With the above subject, cited under reference it is to intimate that your above cited Tender amounting to Rs. 10,34,048.00 (Ten Lakhs Thirty Four Thousand Forty Eight) only at your quoted Rates has been accepted by the Chief Engineer. Please therefore, attend this Office alongwith wanting documents and Initial Deposit of Rs. 25,851.00 (Rs. Twenty Five Thousand Eight Hundred Fifty One) only for executing the agreement.',
        'This is for information and requested for early agreement, so that work may be executed timely.',
      ],
      signature: ['Sd-', 'Executive Engineer', 'Kolar Project Dn. No. I, Birpur'],
      endorsement: {
        ref: { left: 'Endt. No. 1057/SAC/', right: 'Birpur. Dtd. 1-6-90' },
        body: [
          'Copy is submitted to :- The Superintending Engineer, Kolar Project Circle, Bhopal for information please, with reference to his Memo No. 1982/G.2.22 of 89 dtd. 30-5-90.',
        ],
        signature: ['Sd-', 'Executive Engineer', 'Kolar Project Dn. No. I, Birpur'],
      },
      footer: '// True Copy //',
      notes: ['The tender amount is circled in ink on the original. Attested as a true copy by the Executive Engineer.'],
    },
    projectSlug: 'kolar-earth-dam-parapet-wall',
  },
  {
    id: 'dubai-2023',
    generation: 2,
    year: 2023,
    date: '10 April 2023',
    type: 'Professional Licence',
    title: 'Kabeer World Project Management Services Est. — Dubai, UAE',
    facts: [
      { label: 'Issued by', value: 'Government of Dubai' },
      { label: 'Licence no.', value: '1174457' },
      { label: 'Legal type', value: 'Sole Establishment' },
      { label: 'Ownership', value: '100% · Indian national, establishment owner' },
      { label: 'Validity', value: '10 April 2023 – 9 April 2024' },
    ],
    summary:
      'Professional licence for project management services in Dubai, held as a wholly owned sole establishment — taking the family’s construction experience to an international market.',
    scans: [
      { image: archiveImages.dubai2023, caption: 'Professional licence — full page' },
      { image: archiveImages.dubai2023Details, caption: 'Close-up — licence no., trade name, expiry and ownership' },
      { image: archiveImages.dubai2023Issue, caption: 'Close-up — issue date and main licence no.' },
    ],
    transcript: {
      letterhead: ['Government of Dubai', 'Professional License · رخصة مهنية'],
      sections: [
        {
          title: 'License Details',
          rows: [
            ['License No.', '1174457'],
            ['Trade Name', 'Kabeer World Project Management Services Est.'],
            ['Trade Name (Arabic)', 'مؤسسة كبير وورلد لخدمات إدارة المشاريع'],
            ['Legal Type', 'Sole Establishment · مؤسسة فردية'],
            ['Issue Date', '10/04/2023'],
            ['Expiry Date', '09/04/2024'],
            ['Main License No.', '1174457'],
            ['D&B D-U-N-S®', '0'],
          ],
        },
        {
          title: 'License Members',
          rows: [
            ['Share', '100.00%'],
            ['Role', 'Est. Owner'],
            ['Nationality', 'India'],
          ],
        },
      ],
      notes: ['The member’s name is printed in Arabic only on the original and is not reproduced here.'],
    },
    projectSlug: 'kabeer-world-dubai',
  },
  {
    id: 'footing-current',
    generation: 3,
    year: '',
    date: 'Present',
    type: 'Site Record',
    title: 'Isolated footing concreting with column starters',
    facts: [{ label: 'Status', value: 'Under execution' }],
    summary:
      'Footings cast and finished around tied column cages, with the next bays already reinforced and shuttered — present-day work carried out by our own teams.',
    scans: [
      { image: sitePhotos.footingConcreting, caption: 'Footing concrete being finished' },
      { image: sitePhotos.footingColumnStarter, caption: 'Column cage set in the finished footing' },
    ],
  },
];

/** Records grouped under each generation from timeline.js, oldest first. Empty groups are dropped. */
export const archiveByGeneration = timeline
  .map((era, i) => ({
    era,
    person: personName(era),
    records: archiveRecords.filter((r) => r.generation === i + 1),
  }))
  .filter((group) => group.records.length > 0);

export const archiveForGeneration = (index) => archiveRecords.filter((r) => r.generation === index + 1);
export const getArchiveRecord = (id) => archiveRecords.find((r) => r.id === id);

/** Flattens records into Lightbox items: [{ image, alt, title, text, tag }]. */
export const scansToLightbox = (records) =>
  records.flatMap((r) =>
    r.scans.map((scan) => ({
      image: scan.image,
      alt: `${r.type}: ${r.title} — ${scan.caption}`,
      title: r.title,
      text: [r.date, scan.caption].filter(Boolean).join(' · '),
      tag: r.type,
      recordId: r.id,
    })),
  );
