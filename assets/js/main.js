const words = ['engineering', 'CAD','CAM','constuction', 'designing', 'building', 'exploring','learning'];
let currentWord = 0;

function rotateWords() {
  const el = document.getElementById('rotating-word');
  if (!el) return;
  currentWord = (currentWord + 1) % words.length;
  el.classList.remove('swap');
  void el.offsetWidth;
  el.textContent = words[currentWord];
  el.classList.add('swap');
}

setInterval(rotateWords, 2000);

function createProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'card soft';

  const badge = document.createElement('p');
  badge.className = 'pill muted';
  badge.textContent = project.status;
  card.appendChild(badge);

  const title = document.createElement('h3');
  title.textContent = project.title;
  card.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.className = 'muted';
  subtitle.textContent = project.subtitle;
  card.appendChild(subtitle);

  const desc = document.createElement('p');
  desc.textContent = project.description;
  card.appendChild(desc);

  if (project.image) {
    const image = document.createElement('img');
    image.src = project.image;
    image.alt = project.imageAlt || `${project.title} preview image`;
    image.className = 'card-image';
    card.appendChild(image);
  }

  const tagRow = document.createElement('div');
  tagRow.className = 'tags';
  if (project.slug === 'alfa-gtv-2000-restoration') {
    tagRow.classList.add('tag-bg-alfa');
  }
  project.tags.forEach((tag) => {
    const t = document.createElement('span');
    t.className = 'chip';
    t.textContent = tag;
    tagRow.appendChild(t);
  });

  const cardFoot = document.createElement('div');
  cardFoot.className = 'card-foot';
  cardFoot.appendChild(tagRow);

  if (project.hasPage) {
    const linkRow = document.createElement('div');
    linkRow.className = 'card-links';
    const link = document.createElement('a');
    link.href = `project.html?slug=${project.slug}`;
    link.className = 'text-link';
    link.textContent = 'Open project';
    linkRow.appendChild(link);
    cardFoot.appendChild(linkRow);
  }

  card.appendChild(cardFoot);
  return card;
}

function filterProjects(filterTag = 'all', query = '', limit) {
  const normalizedQuery = query.trim().toLowerCase();
  const source = window.projectStore ? window.projectStore.projects : [];
  const filtered = source.filter((project) => {
    const matchesTag = filterTag === 'all' || project.tags.includes(filterTag);
    const matchesQuery =
      !normalizedQuery ||
      project.title.toLowerCase().includes(normalizedQuery) ||
      project.subtitle.toLowerCase().includes(normalizedQuery);
    return matchesTag && matchesQuery;
  });

  return typeof limit === 'number' ? filtered.slice(0, limit) : filtered;
}

function renderProjects({ grid, filterTag = 'all', query = '', limit } = {}) {
  if (!grid) return;
  grid.innerHTML = '';
  filterProjects(filterTag, query, limit).forEach((project) => grid.appendChild(createProjectCard(project)));
}

function buildChips(container) {
  if (!container || !window.projectStore) return;
  container.innerHTML = '';
  window.projectStore.getUniqueTags().forEach((tag, index) => {
    const chip = document.createElement('button');
    chip.className = `chip${index === 0 ? ' active' : ''}`;
    chip.dataset.tag = tag;
    chip.textContent = tag === 'all' ? 'All' : tag.charAt(0).toUpperCase() + tag.slice(1);
    container.appendChild(chip);
  });
}

function setupProjectExplorer({ filterContainer, searchInput, grid, limit }) {
  if (!filterContainer || !searchInput || !grid) return;

  buildChips(filterContainer);

  let activeTag = 'all';
  let query = '';

  const rerender = () => renderProjects({ grid, filterTag: activeTag, query, limit });

  filterContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.dataset.tag) return;
    activeTag = target.dataset.tag;
    filterContainer.querySelectorAll('.chip').forEach((chip) => chip.classList.remove('active'));
    target.classList.add('active');
    rerender();
  });

  searchInput.addEventListener('input', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    query = target.value;
    rerender();
  });

  rerender();
}

function createNoteCard(note) {
  const card = document.createElement('article');
  card.className = 'card soft note-card';

  const meta = document.createElement('p');
  meta.className = 'pill muted note-meta';
  meta.textContent = `${note.published} · ${note.readTime}`;
  card.appendChild(meta);

  const title = document.createElement('h3');
  title.textContent = note.title;
  card.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.className = 'muted';
  subtitle.textContent = note.subtitle;
  card.appendChild(subtitle);

  const desc = document.createElement('p');
  desc.textContent = note.summary;
  card.appendChild(desc);

  const tagRow = document.createElement('div');
  tagRow.className = 'tags';
  note.tags.forEach((tag) => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = tag;
    tagRow.appendChild(chip);
  });
  card.appendChild(tagRow);

  return card;
}

function buildNoteChips(container) {
  if (!container || !window.notesStore) return;
  container.innerHTML = '';
  window.notesStore.getUniqueNoteTags().forEach((tag, index) => {
    const chip = document.createElement('button');
    chip.className = `chip${index === 0 ? ' active' : ''}`;
    chip.dataset.tag = tag;
    chip.textContent = tag === 'all' ? 'All' : tag.charAt(0).toUpperCase() + tag.slice(1);
    container.appendChild(chip);
  });
}

function filterNotes(filterTag = 'all', query = '', limit) {
  const normalizedQuery = query.trim().toLowerCase();
  const source = window.notesStore ? window.notesStore.notes : [];
  const filtered = source.filter((note) => {
    const matchesTag = filterTag === 'all' || note.tags.includes(filterTag);
    const matchesQuery =
      !normalizedQuery ||
      note.title.toLowerCase().includes(normalizedQuery) ||
      note.subtitle.toLowerCase().includes(normalizedQuery) ||
      note.summary.toLowerCase().includes(normalizedQuery);
    return matchesTag && matchesQuery;
  });

  return typeof limit === 'number' ? filtered.slice(0, limit) : filtered;
}

function renderNotes({ grid, filterTag = 'all', query = '', limit } = {}) {
  if (!grid) return;
  grid.innerHTML = '';
  filterNotes(filterTag, query, limit).forEach((note) => grid.appendChild(createNoteCard(note)));
}

function setupNotesExplorer({ filterContainer, searchInput, grid, limit }) {
  if (!filterContainer || !searchInput || !grid) return;

  buildNoteChips(filterContainer);

  let activeTag = 'all';
  let query = '';

  const rerender = () => renderNotes({ grid, filterTag: activeTag, query, limit });

  filterContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.dataset.tag) return;
    activeTag = target.dataset.tag;
    filterContainer.querySelectorAll('.chip').forEach((chip) => chip.classList.remove('active'));
    target.classList.add('active');
    rerender();
  });

  searchInput.addEventListener('input', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    query = target.value;
    rerender();
  });

  rerender();
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initIndexProjects() {
  const grid = document.getElementById('project-grid');
  const filters = document.getElementById('project-filters');
  const search = document.getElementById('project-search');
  if (!grid || !filters || !search) return;
  setupProjectExplorer({ filterContainer: filters, searchInput: search, grid, limit: 6 });
}

function initProjectsPage() {
  const page = document.body.dataset.page;
  if (page !== 'projects') return;
  const grid = document.getElementById('projects-page-grid');
  const filters = document.getElementById('projects-page-filters');
  const search = document.getElementById('projects-page-search');
  setupProjectExplorer({ filterContainer: filters, searchInput: search, grid });
}

function initIndexNotes() {
  const grid = document.getElementById('notes-grid');
  if (!grid) return;
  renderNotes({ grid, limit: 3 });
}

function initNotesPage() {
  const page = document.body.dataset.page;
  if (page !== 'notes') return;
  const grid = document.getElementById('notes-page-grid');
  const filters = document.getElementById('notes-page-filters');
  const search = document.getElementById('notes-page-search');
  setupNotesExplorer({ filterContainer: filters, searchInput: search, grid });
}

function createFloatingNav() {
  if (!document.body) return;

  const navLinks = [
    { label: 'Home', href: 'index.html#home' },
    { label: 'About', href: 'about.html' },
    { label: 'Projects', href: 'projects.html' },
    { label: 'Notes', href: 'notes.html' },
    { label: 'Contact', href: 'index.html#contact' },
    { label: 'Examples', href: 'examples-formatting.html' },
  ];

  const nav = document.createElement('nav');
  nav.className = 'floating-nav';
  nav.setAttribute('aria-label', 'Primary navigation');

  const menuMarkup = navLinks
    .map(
      (link, index) => `
        <a class="mobile-menu-links-wrap" href="${link.href}" role="menuitem">
          <span class="mobile-menu-text">${link.label}</span>
          <span class="mobile-menu-nr">${String(index + 1).padStart(2, '0')}</span>
        </a>`
    )
    .join('');

  nav.innerHTML = `
    <button class="navbar_trigger" type="button" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar_trigger-line is-1"></span>
      <span class="navbar_trigger-line is-2"></span>
      <span class="navbar_trigger-line is-3"></span>
    </button>
    <div class="floating-nav-menu" role="menu" aria-hidden="true">
      <div class="floating-nav-label">Navigate</div>
      <div class="grid-nav-menu-wrap">${menuMarkup}</div>
      <div class="mobile-menu-divider-line"></div>
      <div class="accordion_component">
        <div class="accordion_top">
          <span class="accordion-headline muted">Quick jump</span>
          <span class="accordion_icon" aria-hidden="true">↘</span>
        </div>
        <div class="accordion_bottom language-wrap">
          <span class="accordion-headline">Smooth scroll enabled</span>
          <span class="accordion-headline muted">Links glide to their section when available.</span>
        </div>
      </div>
    </div>
  `;

  const backdrop = document.createElement('div');
  backdrop.className = 'floating-nav-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');

  document.body.appendChild(nav);
  document.body.appendChild(backdrop);

  const trigger = nav.querySelector('.navbar_trigger');
  const menuLinks = nav.querySelectorAll('.mobile-menu-links-wrap');
  const navMenu = nav.querySelector('.floating-nav-menu');

  const toggleOpen = (force) => {
    const shouldOpen = typeof force === 'boolean' ? force : !nav.classList.contains('open');
    nav.classList.toggle('open', shouldOpen);
    backdrop.classList.toggle('visible', shouldOpen);
    document.body.classList.toggle('nav-open', shouldOpen);
    if (trigger) trigger.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    navMenu?.setAttribute('aria-hidden', shouldOpen ? 'false' : 'true');
  };

  trigger?.addEventListener('click', () => toggleOpen());

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => toggleOpen(false));
  });

  backdrop.addEventListener('click', () => toggleOpen(false));

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target)) toggleOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') toggleOpen(false);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  createFloatingNav();
  initIndexProjects();
  initProjectsPage();
  initIndexNotes();
  initNotesPage();
  setupSmoothScroll();
});
