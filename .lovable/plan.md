# #SaRang date-aware site restructure

## Build
- Reorder the homepage into a single scroll: names/date/countdown, Camera, full Celebrations cards, RSVP, concise Our Story, and the shared footer; remove welcome/quick-link and at-a-glance content.
- Replace navigation with four labelled icon links: Home, Celebrations, Camera, Help. Show a top navigation on desktop and fixed bottom navigation on mobile; keep the shared contact footer on every route.
- Add Asia/Kolkata date modes: pre-event countdown/RSVP and closed Camera notice; 8–9 December Next up details, directions, camera access when the album link exists, hidden RSVP, and floating Need help actions; from 10 December show thanks and family blessings.
- Hide guest-facing empty-content placeholders, preserve the existing palette, typography, card treatment, and illustrations, and meet the requested text, contrast, and 48px control minimums.

## Technical details
- Centralize phase and next-event selection in browser-safe wedding utilities, driven by the current instant and Asia/Kolkata calendar date; cover phase boundaries and next-event selection in existing tests.
- Reuse existing event, calendar, map, contact, and design-system components; keep RSVP and capture pages consistent with homepage mode rules.
- Update the roadmap, record the shared date-mode/navigation decision in `AGENTS.md`, run relevant tests, inspect the live page on desktop and mobile, and commit the finished changes.

## Limitation
- The configured RoloCam album link is empty; on event days, do not invent a destination or present a false camera action. The real album link is needed to enable it.
