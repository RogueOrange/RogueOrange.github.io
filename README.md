# RogueOrange Personal Website Outline

## Goal
Create a personal site that follows the Fluent 2 design language with aerospace orange as the signature accent color. The site should quickly communicate who you are, highlight past projects, and remain visually engaging and easy to navigate.

## Information Architecture
- **Global Navigation**: Logo + name, About, Projects, Experience, Writing (optional), Contact/CTA button.
- **Hero**: Name, role/mission statement, concise value proposition, primary CTA (e.g., “View Projects”) and secondary CTA (“Download Resume”), background accent using aerospace orange.
- **About**: Short bio, expertise pillars, a few personable details, headshot framed with Fluent-style card and shadow.
- **Projects**: Grid/list of projects with tags, status chips, and quick stats; each card opens a dedicated project detail view with goals, stack, outcomes, and links.
- **Experience Timeline**: Chronological view of roles/education using Fluent timeline elements, key achievements per entry, downloadable resume link.
- **Showcase/Highlights**: Rotating carousel or featured row for top work; uses large imagery and accent borders.
- **Writing/Insights (optional)**: Space for blog posts, case studies, or notes.
- **Contact/Footer**: Email/social links, small “currently available for” status pill, and location/time zone.

## Visual System
- **Primary Accent**: Aerospace orange (#ff4f00) used for CTAs, focus states, selection, chips, and key icons.
- **Neutrals**: Fluent neutrals for backgrounds and text; employ subtle depth via elevation tokens (e.g., shadows on cards/command bar).
- **Typography**: Fluent 2 recommended type scale; emphasize headings with semi-bold weight; maintain generous line-height.
- **Iconography**: Fluent 2 icon set; line icons for secondary actions, filled for primary actions.
- **Illustration/Texture**: Use geometric patterns or subtle gradients incorporating aerospace orange for visual interest without overpowering content.

## Layout & Interaction
- **Grid**: 12-column responsive grid with 16–24px gutters; cards snap to 3 or 2 columns on desktop/tablet and single column on mobile.
- **Navigation**: Sticky top bar with blur/elevation on scroll; current section highlighting; keyboard navigable.
- **Cards**: Fluent cards with hover lift, subtle border glow in aerospace orange, and quick-action icons (demo, repo, details).
- **Timeline**: Fluent vertical timeline with accent dots and connecting lines; expandable details per entry.
- **Microinteractions**: Motion at 150–200ms using Fluent easing; focus rings in aerospace orange; smooth anchor scrolling.
- **Dark/Light Modes**: Optional toggle with aerospace orange adapting for accessibility; ensure contrast compliance.

## Project Presentation Patterns
- **Project Card Content**: Title, one-line problem statement, tags (domain/tech), short metric/impact, and quick links (live/demo/GitHub).
- **Detail View**: Hero summary with metrics, role, timeframe, stack, challenges/solutions, screenshots gallery, and key lessons learned.
- **Filtering/Sorting**: Tag-based filtering (e.g., web, data, hardware) and sort by recency or impact.
- **Storytelling Hooks**: Include a “Behind the Build” sidebar with fun facts or constraints to make the page memorable.

## About & Personality Hooks
- Spotlight a concise origin story, core principles, and favorite tools (shown as Fluent chips).
- Add a “Now” section with current focus and learning goals.
- Include a small interactive element (e.g., toggling between “Day in the Life” and “Weekend Projects” snippets).

## Contact & Engagement
- Clear CTA card with aerospace orange background and high-contrast text.
- Socials with Fluent icon buttons; hover shows labels.
- Optional contact form with validation + success toast; include availability status and response time.

## Content Governance
- **Tone**: Confident, direct, and friendly; keep copy concise.
- **Assets**: Use consistent screenshot frames; compress images; provide alt text everywhere.
- **Performance**: Lazy-load project imagery; minify and bundle; prefer SVG for icons/illustrations.

## Next Steps
- Create component library tokens (colors, spacing, elevation) aligning to Fluent 2.
- Build reusable components: NavigationBar, HeroCallout, ProjectCard, Timeline, HighlightCarousel, ContactCard.
- Populate initial content (3–5 projects with metrics, resume PDF, and 1–2 writing samples) and set up analytics.
