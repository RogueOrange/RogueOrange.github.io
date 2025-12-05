# Gareth Coward Portfolio

A dark themed portfolio for Gareth Coward with a full-screen landing intro, rotating focus words, and a project catalog powered by client-side filtering.

## Structure
- `index.html` — landing page with intro, hero, about, projects preview, process, notes, and contact sections.
- `projects.html` — dedicated projects index with the same filtering/search experience.
- `project.html` — dynamic project detail template powered by URL `slug` parameters.
- `assets/css/style.css` — theme, layout, and animation styles.
- `assets/js/projects-data.js` — centralized project dataset and helpers.
- `assets/js/main.js` — rotating headline words plus interactive project filtering/search.

## Usage
Open any of the HTML files in a modern browser. No build steps or external tooling are required.

## Customization
- Update copy and section titles directly in the HTML files.
- Adjust colors, spacing, or animation timing in `assets/css/style.css`.
- Add or edit project entries in `assets/js/projects-data.js` once; the changes will flow to the home page, projects index, and any project detail pages.
- Create new detail pages by linking to `project.html?slug=your-slug` for any project that has `hasPage: true` in the dataset.
- Project imagery lives in `assets/img/`; reference the Alfa GTV hero art at `assets/img/alfa-gtv-2000.svg` or swap in your own assets.
