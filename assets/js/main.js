const datasets = [
  {
    name: 'Design system refresh',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tags: ['lorem', 'ipsum'],
    geography: 'Lorem ipsum',
    size: 'Dolor sit',
    taxa: 'Amet, Elit'
  },
  {
    name: 'Analytics workspace',
    description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames.',
    tags: ['dolor', 'ipsum'],
    geography: 'Consectetur',
    size: 'Adipiscing',
    taxa: 'Elit, Sed'
  },
  {
    name: 'Service playbook',
    description: 'Curabitur convallis lacus in nisl molestie, et viverra dui tempor.',
    tags: ['amet', 'elit'],
    geography: 'Lorem ipsum',
    size: 'Dolor sit',
    taxa: 'Amet'
  },
  {
    name: 'Mobile companion app',
    description: 'Etiam fringilla lacus id libero dictum mattis a nec magna.',
    tags: ['ipsum', 'lorem'],
    geography: 'Consectetur',
    size: 'Adipiscing',
    taxa: 'Elit, Sed'
  },
  {
    name: 'Research insights hub',
    description: 'Donec eu sem vulputate, lobortis ipsum in, viverra elit.',
    tags: ['elit', 'dolor'],
    geography: 'Lorem ipsum',
    size: 'Dolor sit',
    taxa: 'Amet'
  },
  {
    name: 'Automation toolkit',
    description: 'Praesent porta libero ut interdum pulvinar. Proin lobortis lorem non sapien mattis.',
    tags: ['amet', 'ipsum'],
    geography: 'Consectetur',
    size: 'Adipiscing',
    taxa: 'Elit'
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
