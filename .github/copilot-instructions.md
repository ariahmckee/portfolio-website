# Copilot instructions for this repository

## Scope

This repository contains an original landing-page design, a React baseline migration, and a current portfolio application in `portfolio-app`.

## Primary design authority

1. Original landing page in `../Personal Landing Page` is the authoritative visual baseline.
2. Baseline React migration at commit `75b9f4075e3a698f30560066d508244c0af4233f` is the initial migration reference.
3. Current app code is the working branch for approved additions and experimental work.

## Required behavior for future changes

- Preserve the approved Navbar geometry from the original and baseline designs unless a design review explicitly approves a change.
- Preserve homepage styling, original landing-page color palette, and shared horizontal boundaries.
- Preserve the marquee’s original width/alignment model and motion behavior unless explicitly approved.
- Treat all BIM/VDC opening-screen hero changes as experimental until approved.
- Do not make layout fixes by using large transform offsets or undocumented hard-coded heights.
- Do not claim visual correctness based on build success alone.
- When working in the app, document whether a change is APPROVED, EXPERIMENTAL, or DEPRECATED.

## File ownership

- Shared design rules live in `portfolio-app/src/App.css` and should remain consistent with the original design unless intentionally updated.
- Navbar and marquee behaviors are shared layout features and should not be altered casually.
- Page-specific experiments should be isolated from shared design rules when possible.

## Testing expectations

- Run lint and build checks before concluding work.
- Add Playwright coverage for representative viewports and route transitions when changing layout or routing.
- Record screenshots in `portfolio-app/tests/artifacts` only.
- For known regressions, use explicit expected-failure tests and document the expectation rather than allowing silent failures.
- Require browser-measured layout verification before calling a layout acceptable; CSS source values are not a substitute for rendered measurements.
- Save screenshots for representative viewport sizes and route loads, and keep them distinct from any approved visual reference assets.
- Keep tests clearly separated into passed, failed, skipped, and blocked outcomes; do not silently suppress failures.
- Do not claim visual correctness without rendered verification.
- Preserve the approved design references from the original landing page and baseline React commit.
- Treat viewport-bottom marquee placement as a required design target even while the current implementation remains experimental.

## Design decision statuses

Use these statuses consistently:

- APPROVED: locked or intentionally accepted design behavior.
- EXPERIMENTAL: an intentional prototype or iterative design experiment only.
- DEPRECATED: previously used but not acceptable unless explicitly re-approved.

## Stop condition

Do not begin layout correction work without a documented design decision and a measured browser validation plan. This repository does not treat CSS-only build success as a valid visual verification method.
