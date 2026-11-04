# Design and Implementation Decisions

## Decision log

### 2026-11-04 — Establish source hierarchy and locked visual baseline

Status: APPROVED

- The original HTML/CSS landing page is the authoritative resource for the shared visual design.
- The baseline React commit (`75b9f4075e3a698f30560066d508244c0af4233f`) is the reference point for the first successful migration.
- The current React app is treated as a superset containing approved additions and experimental design work.

### 2026-11-04 — Preserve original navbar geometry

Status: APPROVED

- Original and baseline Navbar: `width: 80%`, `padding: 10px`, fixed top, no forced minimum height.
- Current `min-height: var(--header-height)` and `--header-height: 68px` are treated as deviations from the original state and require explicit validation or re-approval.

### 2026-11-04 — Keep marquee alignment as a shared design boundary

Status: APPROVED

- Original and baseline marquee used the same width and desktop margin pattern as the Navbar.
- Current nested 80% width constraints on the BIM/VDC marquee contradict the original alignment model and are treated as a layout regression unless formally approved.

### 2026-11-04 — Treat transform-based content offsets as risky

Status: APPROVED

- Text transforms are allowed for small decorative adjustments only when layout flow remains correct.
- Large transform offsets that move text visually above or below the normal flow are treated as risky and likely to overlap other sections.
- These patterns should be revalidated against real browser measurements before approval.

### 2026-11-04 — Separate approved additions from experiments

Status: APPROVED

- Approved additions include discipline-specific routing, scrollable portfolio pages, charcoal background, narrower project cards, static technology strips, and responsive video support.
- Experimental work includes the BIM/VDC oversized video composition and opening-screen treatment.

### 2026-11-04 — Establish browser-measured validation as a required gate

Status: APPROVED

- Lint and build are necessary but insufficient.
- Visual correctness must be based on browser measurements and screenshots from representative viewport sizes.
- If a browser inspection tool is unavailable, the conclusion must be reported as unverified rather than asserted as correct.

### 2026-11-04 — Preserve the original homepage behavior as a protected design surface

Status: APPROVED

- The homepage is not a sandbox; it remains the canonical approved landing-page composition.
- Any current site-level CSS that changes its appearance must be considered a regression unless specifically approved by the design review.
