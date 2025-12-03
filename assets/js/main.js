const datasets = [
  {
    name: 'Urban gut microbiome atlas',
    description: '1,800 human stool samples across 12 cities with dietary metadata.',
    tags: ['human', 'clinical'],
    geography: 'Global',
    size: '480 GB',
    taxa: '420 taxa'
  },
  {
    name: 'Soil carbon cycling panel',
    description: 'Seasonal metagenomes from regenerative agriculture plots.',
    tags: ['soil'],
    geography: 'Iowa, USA',
    size: '260 GB',
    taxa: '310 taxa'
  },
  {
    name: 'Coastal water quality survey',
    description: 'Weekly metatranscriptomes for Vibrio tracking in harbors.',
    tags: ['marine'],
    geography: 'Bay of Biscay',
    size: '120 GB',
    taxa: '188 taxa'
  },
  {
    name: 'Gnotobiotic mouse reference',
    description: 'Defined consortia runs for benchmarking host-microbe interactions.',
    tags: ['model', 'human'],
    geography: 'Controlled vivarium',
    size: '95 GB',
    taxa: '42 taxa'
  },
  {
    name: 'ICU resistome watchlist',
    description: 'Hospital surveillance with weekly AMR updates and phenotype links.',
    tags: ['clinical', 'human'],
    geography: '11 hospitals',
    size: '320 GB',
    taxa: '150 markers'
  },
  {
    name: 'High-altitude peat bogs',
    description: 'Archaea-rich profiles from oxygen-poor wetland cores.',
    tags: ['soil', 'marine'],
    geography: 'Patagonia',
    size: '210 GB',
    taxa: '260 taxa'
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
