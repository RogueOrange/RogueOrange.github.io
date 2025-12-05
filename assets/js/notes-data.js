const notes = [
  {
    title: 'Cataloging the Alfa GTV wiring loom',
    slug: 'alfa-gtv-wiring-notes',
    subtitle: 'What to capture before re-wrapping a classic harness',
    tags: ['automotive', 'electrical', 'documentation'],
    summary:
      'Pin counts, connector maps, and service loops captured while stripping the original loom so the rebuilt version stays serviceable.',
    published: '2024-11-02',
    readTime: '4 min read',
  },
  {
    title: 'Shop note: keeping CAD aligned with the bench',
    slug: 'cad-to-bench',
    subtitle: 'Quick rituals that keep printed brackets matching the chassis',
    tags: ['cad', 'fabrication'],
    summary:
      'A lightweight checklist for exporting models, labeling hardware, and logging shims so 3D prints and machined parts slot in without fuss.',
    published: '2024-10-12',
    readTime: '3 min read',
  },
  {
    title: 'Brake refresh diary',
    slug: 'brake-refresh-diary',
    subtitle: 'Notes from the GTV front brake overhaul',
    tags: ['mechanical', 'automotive'],
    summary:
      'Pad compounds, torque calls, and bedding-in sequence captured during the Alfa front end rebuild for a sharper pedal feel.',
    published: '2024-09-04',
    readTime: '5 min read',
  },
  {
    title: 'Field notebook: first shakedown loop',
    slug: 'first-shakedown',
    subtitle: 'What I watch on a maiden post-rebuild drive',
    tags: ['ops', 'driving'],
    summary:
      'A route plan, bring-along kit, and telemetry checklist to surface early gremlins without cooking fluids or fighting traffic.',
    published: '2024-08-18',
    readTime: '6 min read',
  },
];

function getUniqueNoteTags() {
  const tagSet = new Set();
  notes.forEach((note) => note.tags.forEach((tag) => tagSet.add(tag)));
  return ['all', ...Array.from(tagSet)];
}

function findNoteBySlug(slug) {
  return notes.find((note) => note.slug === slug);
}

window.notesStore = {
  notes,
  getUniqueNoteTags,
  findNoteBySlug,
};
