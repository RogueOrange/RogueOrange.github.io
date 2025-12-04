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

  const tagRow = document.createElement('div');
  tagRow.className = 'tags';
  project.tags.forEach((tag) => {
    const t = document.createElement('span');
    t.className = 'chip';
    t.textContent = tag;
    tagRow.appendChild(t);
  });
  card.appendChild(tagRow);

  if (project.hasPage) {
    const linkRow = document.createElement('div');
    linkRow.className = 'card-links';
    const link = document.createElement('a');
    link.href = `project.html?slug=${project.slug}`;
    link.className = 'text-link';
    link.textContent = 'Open project';
    linkRow.appendChild(link);
    card.appendChild(linkRow);
  }

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

document.addEventListener('DOMContentLoaded', () => {
  initIndexProjects();
  initProjectsPage();
  setupSmoothScroll();
});
