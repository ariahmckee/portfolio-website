# Acceptance Criteria

## Shared layout requirements

- Navbar width remains `80%` on shared desktop layout and retains original padding/alignment.
- Navbar height remains consistent with the original and baseline design and does not add a forced minimum height unless explicitly approved.
- Navbar and marquee share the same horizontal alignment boundaries.
- Homepage styling remains unchanged from the approved original landing page.
- No unintended horizontal scrolling is introduced.

## Portfolio page requirements

- Portfolio pages use the charcoal background `#303337` without changing the homepage background.
- Project cards remain narrower than the Navbar and remain centered.
- Discipline pages retain project listing layout and anchor targets.
- Project detail pages continue to render static marquee technology strips without motion.

## Interaction requirements

- Contact toggle still hides the non-first navigation items while preserving the original menu interactions.
- Marquee wheel interaction still moves the strip without scrolling the page.
- Hover pause/resume remains intact.
- Mobile menu opens/closes correctly and preserves keyboard accessibility.
- Navigation continues to work across routes.

## Video hero requirements

- Video sources remain responsive and use the current media-selection logic.
- Source videos maintain transparency, autoplay, loop behavior, reduced-motion handling, and fallback fallback behavior.
- The current video hero is considered EXPERIMENTAL until approved.

## Browser and measurement requirements

- Navbar, marquee, text, and video bounding rectangles should be measured and recorded against the original and baseline sources.
- Measurements must keep source-derived CSS values separate from browser-measured values.
- At minimum, representative desktop, tablet, mobile, and short-height viewport shapes must be recorded.

## Status rules

- Items marked APPROVED must remain stable unless a later design review updates the document.
- Items marked EXPERIMENTAL must not be treated as final or locked.
- Items marked DEPRECATED must not be reintroduced without explicit approval.

## Hard stop for this phase

The following are explicitly out of scope for Phase 7A and must not be altered during this phase:

- Navbar CSS corrections.
- Marquee width corrections.
- Hero composition repositioning.
- Video layout remediation.
- React navigation refactoring.
- Software Engineering hero implementation.

This phase is documentation and validation only.
