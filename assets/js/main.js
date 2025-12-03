const datasets = [
  {
    name: 'Design system refresh',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tags: ['design', 'frontend'],
    geography: 'Product',
    size: 'Design ops',
    taxa: 'Figma, React'
  },
  {
    name: 'Analytics workspace',
    description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames.',
    tags: ['data', 'frontend'],
    geography: 'Platform',
    size: 'Dashboards',
    taxa: 'Next.js, D3'
  },
  {
    name: 'Service playbook',
    description: 'Curabitur convallis lacus in nisl molestie, et viverra dui tempor.',
    tags: ['ops', 'research'],
    geography: 'Delivery',
    size: 'Guides',
    taxa: 'Templates'
  },
  {
    name: 'Mobile companion app',
    description: 'Etiam fringilla lacus id libero dictum mattis a nec magna.',
    tags: ['frontend', 'design'],
    geography: 'iOS & Android',
    size: 'Interfaces',
    taxa: 'SwiftUI, React Native'
  },
  {
    name: 'Research insights hub',
    description: 'Donec eu sem vulputate, lobortis ipsum in, viverra elit.',
    tags: ['research', 'data'],
    geography: 'Knowledge',
    size: 'Repository',
    taxa: 'Playbooks'
  },
  {
    name: 'Automation toolkit',
    description: 'Praesent porta libero ut interdum pulvinar. Proin lobortis lorem non sapien mattis.',
    tags: ['ops', 'frontend'],
    geography: 'Internal',
    size: 'Automation',
    taxa: 'CI/CD'
  }
];

const grid = document.getElementById('dataset-grid');
const searchInput = document.getElementById('dataset-search');
const chips = Array.from(document.querySelectorAll('#filter-chips .chip'));

function renderCards(items) {
  grid.innerHTML = '';
  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'dataset-card';
    card.innerHTML = `
      <div class="pill pill-neutral">${item.geography}</div>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="tags">${item.tags.map((tag) => `<span class="chip mini">${tag}</span>`).join('')}</div>
      <div class="dataset-footer">
        <span>${item.size}</span>
        <span>${item.taxa}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterDatasets() {
  const term = searchInput.value.toLowerCase();
  const activeTags = chips.filter((c) => c.classList.contains('selected')).map((c) => c.dataset.tag);
  const filtered = datasets.filter((item) => {
    const matchesTerm = item.name.toLowerCase().includes(term) || item.description.toLowerCase().includes(term);
    const matchesTags = activeTags.length === 0 || activeTags.every((tag) => item.tags.includes(tag));
    return matchesTerm && matchesTags;
  });
  renderCards(filtered);
}

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chip.classList.toggle('selected');
    filterDatasets();
  });
});

searchInput.addEventListener('input', filterDatasets);

renderCards(datasets);
