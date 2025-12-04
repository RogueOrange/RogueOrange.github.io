const projects = [
  {
    title: 'Alfa GTV 2000 Restoration',
    slug: 'alfa-gtv-2000-restoration',
    subtitle: 'Reviving a 1972 heritage coupé',
    tags: ['cad', 'electrical', 'mechanical', 'automotive'],
    description:
      'A ground-up refresh of a classic Alfa Romeo GTV 2000 with modern drivability, bespoke CAD components, and refined electrics.',
    status: 'In progress',
    hasPage: true,
    spotlight: ['Full chassis teardown and CAD-based reassembly', 'Electrical loom redesign with modern protection', 'Mechanical upgrades tuned for road feel'],
    overview:
      'Breathing new life into a vintage Alfa GTV 2000 by blending original character with reliable modern systems. From CAD-modeled brackets to a refreshed wiring harness, every touchpoint is mapped for longevity and feel.',
    outcomes: [
      'Digitally captured key mounts and body tolerances to fabricate unobtainable parts.',
      'Rebuilt the electrical architecture with labeled harnesses, fused sub-panels, and modern relays.',
      'Balanced ride and steering feel with suspension and brake updates that honor the car’s original dynamics.',
    ],
    timeline: [
      {
        phase: 'Strip & Assess',
        detail: 'Documented the shell, drivetrain, and trim; mapped corrosion and heritage parts to salvage.',
      },
      {
        phase: 'CAD & Fabrication',
        detail: 'Modeled custom brackets, ducts, and mounting hardware; produced small-batch components.',
      },
      {
        phase: 'Electrical',
        detail: 'Rebuilt the loom with modern connectors, routing, and serviceable junctions.',
      },
      {
        phase: 'Mechanical Tune',
        detail: 'Refreshed steering, brakes, and suspension with period-respectful upgrades and alignment.',
      },
    ],
  },
  {
    title: 'Signal Atlas',
    slug: 'signal-atlas',
    subtitle: 'Adaptive dashboards',
    tags: ['design', 'frontend', 'data'],
    description: 'A responsive analytics surface with contextual exploration and lightweight governance.',
    status: 'Live',
    hasPage: false,
  },
  {
    title: 'Stride',
    slug: 'stride',
    subtitle: 'Performance toolkit',
    tags: ['frontend', 'ops'],
    description: 'Developer tools for monitoring, tracing, and on-call clarity in fast delivery teams.',
    status: 'Pilot',
    hasPage: false,
  },
  {
    title: 'Canvas',
    slug: 'canvas',
    subtitle: 'Design system refresh',
    tags: ['design'],
    description: 'A component refresh with motion tokens, accessibility upgrades, and semantic spacing.',
    status: 'Live',
    hasPage: false,
  },
  {
    title: 'Helix',
    slug: 'helix',
    subtitle: 'Data orchestration',
    tags: ['data', 'ops'],
    description: 'Low-friction pipelines for research data with quality gates and lineage.',
    status: 'Beta',
    hasPage: false,
  },
  {
    title: 'Lumen',
    slug: 'lumen',
    subtitle: 'Research explorer',
    tags: ['research', 'design'],
    description: 'A discovery interface for experiments with saved perspectives and sharing.',
    status: 'Archive',
    hasPage: false,
  },
  {
    title: 'Northwind',
    slug: 'northwind',
    subtitle: 'Ops command center',
    tags: ['ops', 'frontend'],
    description: 'Operational visibility for distributed systems with adaptive alert routes.',
    status: 'Live',
    hasPage: false,
  },
];

function getUniqueTags() {
  const tagSet = new Set();
  projects.forEach((project) => project.tags.forEach((tag) => tagSet.add(tag)));
  return ['all', ...Array.from(tagSet)];
}

function findProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

window.projectStore = {
  projects,
  getUniqueTags,
  findProjectBySlug,
};
