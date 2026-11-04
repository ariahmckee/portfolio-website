# Design System Baseline

## Source hierarchy

This repository has three design sources, each with a different authority:

1. Original static HTML/CSS landing page in `../Personal Landing Page` — authoritative for approved shared visual design.
2. Baseline React migration at commit `75b9f4075e3a698f30560066d508244c0af4233f` — authoritative for how the original visual language was first ported into React.
3. Current `portfolio-app` — authoritative for approved additions and experimental work that must be tracked separately.

## Approved shared design characteristics

| Area | Value | Status | Source |
|---|---|---|---|
| Navbar width | `80%` | APPROVED | Original HTML / baseline React |
| Navbar padding | `10px` | APPROVED | Original HTML / baseline React |
| Navbar border radius | `0 0 8px 8px` | APPROVED | Original HTML |
| Navbar alignment | centered, fixed top | APPROVED | Original HTML / baseline React |
| Navbar typography | `1.2rem`, `font-weight: 400`, letter spacing `1%` | APPROVED | Original HTML / baseline React |
| Navbar interaction | contact toggle hides nav items except first item | APPROVED | Original HTML / baseline React |
| Marquee width | `80%` | APPROVED | Original HTML / baseline React |
| Marquee bottom spacing | desktop `30px` baseline | APPROVED | Original HTML / baseline React |
| Marquee background | `var(--color-grey)` | APPROVED | Original HTML / baseline React |
| Shared horizontal boundaries | `80%` of viewport width | APPROVED | Original HTML / baseline React |
| Homepage appearance | pink background, original landing-page hero composition | APPROVED | Original HTML |
| Homepage overflow behavior | fixed desktop scroll lock; body overflow auto on smaller screens | APPROVED | Original HTML |
| TechMarquee motion | seamless horizontal loop, pause on hover, wheel scroll support | APPROVED | Original HTML / React baseline |

## Approved additions in the current app

| Area | Status | Notes |
|---|---|---|
| Discipline-specific routing | APPROVED | Home, software engineering, BIM/VDC, project detail routes are part of the portfolio architecture. |
| Scrollable portfolio pages | APPROVED | Route pages are intended to scroll normally after the landing page became a site. |
| Charcoal background | APPROVED | Centralized as `--portfolio-background: #303337`. |
| Narrower project cards | APPROVED | Current centered, narrower card width is intentionally preserved. |
| Static marquee on project detail pages | APPROVED | Used for technologies and not a layout regression. |
| Discipline-specific animated marquees | APPROVED | The homepage and discipline pages may share the same motion treatment. |
| Responsive video source support | APPROVED | The `VideoHero` component is reusable and uses source selection by viewport. |

## Experimental or unapproved areas

| Area | Status | Notes |
|---|---|---|
| BIM/VDC video positioning and scale | EXPERIMENTAL | Large, oversized hero composition is still being evaluated. |
| Video extending beneath Navbar | EXPERIMENTAL | Approved only as a local composition experiment, not a locked design rule. |
| BIM/VDC opening-screen composition | EXPERIMENTAL | Initial viewport composition is intentionally provisional. |
| Responsive hero sizing and text positioning | EXPERIMENTAL | Needs measured validation before design approval. |
| Viewport-bottom marquee alignment on discipline pages | EXPERIMENTAL | Still under design validation and not approved as final behavior. |

## Deprecated or rejected patterns

| Pattern | Status | Notes |
|---|---|---|
| Forced minimum header height | DEPRECATED | Original and baseline Navbar had no forced minimum height. |
| Large transform-based vertical offsets on text | DEPRECATED | These can overlap other content without changing layout flow. |
| Nested percentage width constraints on marquee | DEPRECATED | This caused the marquee to become narrower than the Navbar. |
| Full-height hero forcing the page to fit a one-screen composition at all breakpoints | DEPRECATED | Not a safe default for mobile and short-height viewports. |

## Verification notes

- The original landing page and baseline React CSS remain the authoritative shared design source for navbar and marquee geometry.
- Any current CSS that diverges from those values must be treated as a regression unless it is explicitly documented as an approved addition or an experimental treatment.
- Lint/build success is necessary but not sufficient to confirm visual correctness; browser and screenshot measurements are still required for final approval.
