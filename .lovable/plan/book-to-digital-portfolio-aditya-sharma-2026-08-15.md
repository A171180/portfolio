# Book-to-Digital Portfolio — Aditya Sharma

Rebuild the site around a two-phase story: a cinematic book intro that becomes the entrance to a futuristic developer workspace. The diary aesthetic stays only in the intro; everything after is modern, spatial, and product-like. The existing sage/beige palette is kept as the base, sharpened with cooler glass, grid and light tones for the digital phase.

## Phase 1 — Book intro (kept, upgraded)

- Minimal cinematic stage: soft light pool, subtle particles, grounded shadow, depth blur.
- Premium linen cover with only "Aditya Sharma" and "Full Stack Developer" — decorative diary copy removed.
- Click opens the cover with layered page bending, page thickness, moving light and a camera push-in (~2s).
- Chapter 1 stays a scene: the open book remains, and floating panels rise above it — "HELLO, I'M ADITYA", role, `C++ • Python • JavaScript`, one line of intent.
- "Next Chapter →" turns a page: content leaves, page flips, camera follows, new content emerges (1–2s).

## Signature transition

Page edges light up, ruled lines morph into a grid, paper panels harden into glass UI, camera moves through the page, and the environment opens into the workspace. No plain fade.

## Phase 2 — Developer workspace

Sections: Home, About, Skills/Stack, Projects, Contact — one continuous environment with a floating glass nav (never a diary margin).

- **Home**: name, "Full Stack Developer", "I build, experiment, and turn ideas into working digital experiences.", buttons *Explore My Work* / *Contact Me*, and an interactive tech constellation (C++, Python, JavaScript, React, Node.js, Next.js, SQL, AI, n8n). Your uploaded photo floats on the right in a tall oval frame — soft sage rim light, subtle parallax drift, glow behind it. A small round crop of the same photo becomes the nav mark next to your name.
- **About**: short composition of the Chandigarh University + build-fast-with-AI message across floating cards, no long bio.
- **Skills/Stack**: grouped interactive nodes/tiles (Programming, Frontend, Backend, Database, AI/Automation, Tools). Hover reveals what it is used for; click highlights related projects.
- **Projects**: premium case-study cards with 3D tilt, parallax preview, tech tags, GitHub / Live buttons, and Problem → Solution → Tech → Result detail view. Buttons that have no real link are omitted, not faked.
- **Contact**: "Let's Build Something", name/email/message form with real server-side handling, GitHub / LinkedIn / Email links, and a short paper-plane-to-signal send animation.

## Cross-cutting

- Custom minimal cursor with magnetic/expanding states, disabled on touch.
- Optional audio with a visible mute control; nothing autoplays.
- `prefers-reduced-motion` swaps cinematic motion for quick fades; keyboard focus, semantic headings, alt text.
- Mobile: book intro and page-turn concept kept, particles and camera motion reduced, nav simplified.
- SEO: title "Aditya Sharma — Full Stack Developer", matching description, OG/Twitter tags, favicon from the monogram/photo mark.

## Technical notes

- Stays on TanStack Start + React + TypeScript + Tailwind v4 (Next.js is not available here; same architecture, same output).
- Depth and 3D are done with layered CSS 3D transforms, gradients and Motion springs — high-fidelity and 60 FPS on mobile — rather than adding Three.js/R3F, which would multiply bundle size for this composition. Can be revisited for a single hero object later.
- New structure: `src/components/intro/` (book scene, page-turn controller), `src/components/workspace/` (nav, Home, About, Skills, Projects, Contact), shared `src/components/ui-3d/` primitives, project/skill data in `src/data/`. Current diary chapter file is replaced.
- Photo is uploaded to CDN assets and imported via a pointer file; palette tokens extended in `src/styles.css` (glass, grid, glow) without breaking existing sage/beige tokens.
- Contact form posts to a real server function with validation; an n8n webhook URL can be wired in as a secret if you want email notifications.
