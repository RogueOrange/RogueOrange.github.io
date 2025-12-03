const words = ['engineering', 'running', 'designing', 'building', 'exploring', 'mentoring', 'learning'];
let currentWord = 0;

function rotateWords() {
  const el = document.getElementById('rotating-word');
  if (!el) return;
  currentWord = (currentWord + 1) % words.length;
  el.classList.remove('fade');
  void el.offsetWidth;
  el.textContent = words[currentWord];
  el.classList.add('fade');
}

setInterval(rotateWords, 1800);

const projects = [
  {
    title: 'Signal Atlas',
    subtitle: 'Adaptive dashboards',
    tags: ['design', 'frontend', 'data'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae ligula vitae purus facilisis feugiat.',
    status: 'Live',
  },
  {
    title: 'Stride',
    subtitle: 'Performance toolkit',
    tags: ['frontend', 'ops'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris egestas nunc in facilisis scelerisque.',
    status: 'Pilot',
  },
  {
    title: 'Canvas',
    subtitle: 'Design system refresh',
    tags: ['design'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel elit ac lorem tempor vehicula.',
    status: 'Live',
  },
  {
    title: 'Helix',
    subtitle: 'Data orchestration',
    tags: ['data', 'ops'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed justo id sapien tempor placerat.',
    status: 'Beta',
  },
  {
    title: 'Lumen',
    subtitle: 'Research explorer',
    tags: ['research', 'design'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at consequat enim, ut luctus nunc.',
    status: 'Archive',
  },
  {
    title: 'Northwind',
    subtitle: 'Ops command center',
    tags: ['ops', 'frontend'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id porttitor justo, vitae euismod enim.',
    status: 'Live',
  },
];

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

  return card;
}

function renderProjects(filterTag = 'all', query = '') {
  const grid = document.getElementById('project-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const normalizedQuery = query.trim().toLowerCase();

  projects
    .filter((project) => {
      const matchesTag = filterTag === 'all' || project.tags.includes(filterTag);
      const matchesQuery =
        !normalizedQuery ||
        project.title.toLowerCase().includes(normalizedQuery) ||
        project.subtitle.toLowerCase().includes(normalizedQuery);
      return matchesTag && matchesQuery;
    })
    .forEach((project) => grid.appendChild(createProjectCard(project)));
}

function setupFilters() {
  const filterContainer = document.getElementById('project-filters');
  const searchInput = document.getElementById('project-search');
  if (!filterContainer || !searchInput) return;

  let activeTag = 'all';
  let query = '';

  filterContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.dataset.tag) return;

    activeTag = target.dataset.tag;
    filterContainer.querySelectorAll('.chip').forEach((chip) => chip.classList.remove('active'));
    target.classList.add('active');
    renderProjects(activeTag, query);
  });

  searchInput.addEventListener('input', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    query = target.value;
    renderProjects(activeTag, query);
  });

  renderProjects(activeTag, query);
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

document.addEventListener('DOMContentLoaded', () => {
  setupFilters();
  setupSmoothScroll();
});
