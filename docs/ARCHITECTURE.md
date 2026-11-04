# Architecture Baseline

## Source hierarchy

- Original static HTML/CSS landing page: `../Personal Landing Page`
- Baseline React migration: commit `75b9f4075e3a698f30560066d508244c0af4233f`
- Current app: `portfolio-app`

## Application structure

The current portfolio app intentionally keeps the homepage as a landing-page analog and adds discipline routes, project pages, and reusable sections.

### Core app shell

- `portfolio-app/src/App.jsx`
  - owns route configuration and global app shell behavior.
  - sets body classes for homepage vs portfolio pages.
  - retains the shared Navbar and Footer.

- `portfolio-app/src/App.css`
  - holds the shared design CSS, responsive layout rules, marquee treatment, home/portfolio page separation, and the current experimental BIM/VDC layout rules.
  - includes global variables such as `--page-content-width`, `--portfolio-background`, and the current header-height tuning values.

### Shared components

- `portfolio-app/src/components/Navbar.jsx`
  - route-aware navigation that varies by current path.
  - uses ordinary anchors for the current implementation; not React Router `NavLink` objects.
  - preserves existing contact behavior and menu toggling.

- `portfolio-app/src/components/TechMarquee.jsx`
  - shared marquee component.
  - preserves the approved homepage behavior, including dual-set seamless looping and wheel scrolling in animated mode.

- `portfolio-app/src/components/VideoHero.jsx`
  - reusable video hero component.
  - supports responsive source selection and reduced-motion handling.
  - retains source fallback behavior and video transparency handling.

### Portfolio pages

- `portfolio-app/src/pages/Home.jsx`
  - original homepage landing-page layout preserved as the default entry page.

- `portfolio-app/src/pages/SoftwareEngineering.jsx`
  - discipline landing page with animated marquee and project listing.

- `portfolio-app/src/pages/BIMVDC.jsx`
  - discipline landing page with the current experimental hero composition and animated marquee.

- `portfolio-app/src/pages/ProjectDetail.jsx`
  - shared project detail page with static technology strip.

### Data ownership

- `portfolio-app/src/data/projects.js`
  - project metadata and curated technology icons.
  - separate discipline-specific icon sets are intentionally independent and editable without touching component logic.

## CSS ownership and conflict notes

The current CSS has multiple responsibilities mixed together in one file:

- global resets and root variables
- homepage styling
- shared content width decisions
- navbar styling
- marquee styling
- portfolio page background styling
- BIM/VDC experimental hero layout and responsive overrides

This creates overlap and ambiguity. The following categories are known ownership conflicts:

- Shared selectors reused by the homepage and portfolio pages.
- Responsive overrides that intentionally affect markup outside the intended discipline page.
- Layout decisions for the experimental hero embedded within the same stylesheet as shared design rules.
- Width and min-height rules that are not clearly separated into reusable page-layout utilities.

## Approved vs experimental separation

The repo should treat the following as separate layers:

1. Shared baseline CSS
2. Approved portfolio additions
3. Experimental BIM/VDC page composition
4. Browser-measured validation layer

The experimental layer should not be allowed to silently rewrite the baseline design system without explicit approval.

## Known design boundaries

- Navbar and marquee remain a shared horizontal alignment system.
- Project cards remain narrower than the Navbar.
- Homepage appearance remains the original landing-page baseline.
- Charcoal background `#303337` is for portfolio pages only.
- Project detail technology strips are static and intentionally separate from the animated discipline marquees.
- The animation and interaction behavior of the marquee remain a protected shared mechanism unless intentionally changed under design review.
