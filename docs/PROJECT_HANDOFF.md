# Lunalogs Website Handoff

Last updated: 2026-03-31
Owner: Codex
Primary coding agent: Kimi Code CLI (`kimi`)
Project branch: `codex/lunalogs-rebuild`

## 1. Project Summary

This repository has been rebuilt from an older resume-style personal site into a new public-facing personal brand site for `lunalogs.com`.

The new site feels:
- editorial
- calm
- premium
- slightly futuristic
- suitable for an `AI x crypto` personal brand

The first public MVP is complete and ready to share.

## 2. Brand Direction

Core positioning:
- Engineer with business context
- AI x crypto builder in progress
- Research-driven and product-minded
- Personal brand with room for projects, writing, and experiments

Working message:
- Build with engineering discipline, think with market context, write with research depth.

Design references:
- Home mood and restraint: `https://josemeza.info/?ref=godly`
- Projects interaction direction: `https://www.bpowell.co/?ref=godly`

Important notes:
- Do not copy either reference directly.
- Do not add sound effects.
- The site should not feel like a generic SaaS template.
- Avoid card-heavy layouts unless there is a strong reason.

## 3. MVP Scope (COMPLETED)

The first shareable version includes:
- ✅ a redesigned home page
- ✅ a project index with hover-driven preview behavior
- ✅ a lighter About section integrated into the main experience
- ✅ a Writing / Blog section that introduces the future knowledge map concept
- ✅ a cleaner visual identity for `lunalogs.com`

The MVP does not need:
- a complete production knowledge graph
- CMS integration
- a full article system
- complete multilingual support (present but minimal)
- a backend email form

## 4. Required UX / UI Decisions

### Home
- Use a restrained, index-like layout rather than a standard marketing landing page.
- Keep titles like name, About, Projects, Writing relatively small and calm.
- De-emphasize non-focused text by lowering opacity or contrast.
- Establish one clear visual thesis in the first viewport.

### Projects
- Project names should be the main interaction.
- Hovering a project should reveal a related image, screenshot, or visual treatment.
- When one project is active, other project titles should shrink slightly and fade.
- Clicking a project should either:
  - open an internal project detail page, or
  - link to an external site / landing page

### Writing
- MVP should hint at a future knowledge-map experience.
- It is acceptable to ship a hybrid presentation:
  - visual constellation / nebula-inspired preview
  - list-mode teaser or structured article index
- It should look intentional, not like a generic blog archive.

### About
- Resume should not dominate the site.
- About should be concise and brand-supporting.
- Keep a resume download path, but treat it as a secondary action.

## 5. Content Strategy For MVP

Use realistic placeholder structure where content is missing, but keep it tasteful.

Needed content buckets:
- short intro / positioning
- selected projects
- writing themes
- current focus / now
- contact / social links

If content is missing:
- prefer concise placeholders framed as active directions
- do not invent fake accomplishments
- do not write fake metrics

## 6. Collaboration Protocol

All contributors must read this file before making changes.

Rules:
- Update the `Update Log` section after each meaningful code pass.
- Update the `Task Board` section when items change status.
- Check `Current Codebase Snapshot` before creating new files.
- Reuse existing files when practical instead of duplicating parallel implementations.
- If unsure whether a component already exists, inspect the repo first and record the finding.

Token-efficiency / collaboration strategy:
- Let `kimi` handle broad repo scans, large file reads, long command output, and first-pass state summaries when the task is likely to consume a lot of context.
- Let Codex handle high-value convergence work: implementation, judgment calls, integration, review, final QA, and final write-up.
- For larger changes, do not scan the whole repository by default; read only the files needed for the current task unless broader inspection is truly necessary.
- Keep this handoff document as the single source of truth so contributors do not repeatedly reconstruct context from scratch.
- Before major implementation passes, prefer updating this document with the latest state rather than re-reading large areas of the codebase unnecessarily.

## 7. Current Codebase Snapshot

Current stack:
- Next.js Pages Router
- TypeScript
- CSS modules + global CSS (refreshed, no Bootstrap)
- `next-i18next`
- No Bootstrap dependency (removed)

Current important files:
- `pages/index.tsx`: dark, minimal poster-style home with large type and integrated navigation links
- `pages/projects.tsx`: project list with hover-driven preview
- `pages/writing.tsx`: knowledge constellation + article teasers
- `pages/about.tsx`: concise about with secondary resume link
- `components/Layout.tsx`: clean layout wrapper
- `components/Navigation.tsx`: top navigation bar
- `components/Footer.tsx`: social links footer
- `styles/globals.css`: new design system (CSS variables, clean aesthetic)
- `public/files/Rujie Yang (Luna).pdf`: downloadable resume
- `CNAME`: points to `lunalogs.com`

Deleted files:
- `components/Sidebar.tsx` (replaced by Navigation)
- `styles/index.module.css` (old timeline styles)
- `pages/blog.tsx`, `pages/blog/*` (replaced by Writing)
- `pages/friends.tsx` (removed from MVP)
- Bootstrap CSS import (removed)

## 8. Preferred Technical Approach

For the MVP:
- favor a mostly static site
- keep implementation simple
- do not add unnecessary backend complexity
- prioritize visual polish and clean interaction
- use lightweight React state for hover interactions if needed

If a complex system is not needed yet:
- choose the simpler implementation

## 9. Task Board

Status legend:
- `todo`
- `doing`
- `done`
- `blocked`

Current tasks:

| Status | Task | Notes |
| --- | --- | --- |
| done | Audit old repo and references | Old site confirmed as resume-first and due for rebuild |
| done | Define brand and interaction direction | Based on user brief and reference sites |
| done | Create shared handoff document | This file is the coordination source |
| done | Redesign the home page MVP | Editorial, restrained visual system with index grid |
| done | Redesign projects experience | Hover preview + de-emphasized inactive titles |
| done | Add writing / knowledge-map teaser section | MVP constellation visualization + article teasers |
| done | Refresh metadata, links, and domain references | CNAME updated to lunalogs.com, old identity removed |
| done | Run local build and verify | Build passes, all pages static |
| done | Deploy public preview | Preview ready on Vercel for user review |
| done | Refine home page into a stronger personal-brand cover | Luna-led hero, editorial spacing, integrated About / Projects / Writing entry points |
| done | Simplify the home page into a more minimal poster layout | Dark single-screen composition, reduced copy, no sound control |
| todo | Add richer real project imagery and detail pages | Current project system works, but imagery is still sparse |
| todo | Turn Writing teaser into first real published essays | Visual direction exists, but content is still mostly placeholder |

## 10. Implementation Brief For Kimi

Kimi treated this as a first-pass public MVP.

Goals achieved:
- created a visually strong redesign
- preserved only useful content from the old site
- removed the old resume-site feel
- created an elegant first version other people can view now

Constraints followed:
- no sound effects
- no cloning the reference sites
- no fake testimonials, fake clients, or fake metrics
- no generic dashboard cards
- no cluttered rainbow gradients
- code is understandable for handoff

Deliverables completed:
- refined landing / home experience
- project list with hover state previews
- writing section with knowledge-map-inspired art direction
- updated About / resume access
- responsive behavior for desktop and mobile

Style implemented:
- restrained composition
- one accent color system (deep green on warm neutrals)
- strong typography (`Instrument Serif` + `Manrope`)
- low-noise motion
- image-led project interaction

## 11. Update Log

### 2026-03-31 - Kimi Code CLI (Primary Coding Agent)
- **Major MVP Redesign Complete**
- Replaced old resume-timeline home with editorial index layout
- Created new Navigation component (top bar, responsive mobile menu)
- Created new Footer component with social links
- Built Projects page with hover-driven preview behavior:
  - Project names are primary interaction
  - Hover reveals preview image floating near cursor
  - Non-hovered items dim and shrink slightly
  - Status badges (live/wip/concept) for transparency
- Built Writing page with knowledge constellation concept:
  - SVG constellation visualization with connected nodes
  - Article teasers in list format
  - Placeholder content framed as active directions
- Built About page with concise presentation:
  - Short narrative intro
  - Key facts in grid layout
  - Resume download as secondary action
- Completely replaced global CSS with new design system:
  - CSS custom properties for colors, spacing, typography
  - Clean, editorial aesthetic
  - Responsive breakpoints
  - Animation utilities
- Removed Bootstrap dependency and all Bootstrap components
- Removed old files: Sidebar, index.module.css, blog pages, friends page
- Updated translations (EN/ZH/JA) with new keys
- Updated CNAME to lunalogs.com
- Verified successful build

### 2026-03-31 - Codex
- Cloned `lunalogs/luna25y` into the local workspace.
- Audited the old codebase and identified the current structure.
- Confirmed the local Kimi CLI command is `kimi`.
- Created a new working branch: `codex/lunalogs-rebuild`.
- Wrote this handoff document to reduce hallucination, duplicate work, and drift between contributors.
- Reviewed Kimi's MVP output before deployment.
- Fixed the `_app.tsx` i18n hook import to remove the build-time warning source.
- Replaced non-existent writing detail links with presentational teaser titles to avoid 404s.
- Added a lightweight internal landing page for `TapTune` at `pages/projects/taptune.tsx`.
- Improved the Projects experience so every item has a hover preview state, even when no image asset exists yet.
- Upgraded `next` from `15.1.6` to `16.2.1` after Vercel blocked deployment on the old vulnerable release.
- Verified local build on Next.js `16.2.1` and confirmed the main public routes returned HTTP `200`.
- Deployed a public Vercel preview: `https://lunalogs-79b1esxnf-luna25ys-projects.vercel.app`

### 2026-03-31 - Codex (Home Refinement Pass)
- Re-read this handoff file before implementation and audited the current file structure to avoid duplicating existing components or parallel home-page implementations.
- Reworked `pages/index.tsx` from a card-ish landing layout into a more restrained editorial front page centered on `Luna`.
- Made the first viewport name-led and poster-like:
  - `Luna` is now the dominant visual anchor
  - supporting copy frames the site as a personal brand index rather than a resume
  - resume remains accessible, but only as a tertiary action
- Replaced the old home card grid with directory-style entry rows so `Projects`, `Writing`, and `About` feel naturally embedded in the homepage flow.
- Added a positioning / signal section to reinforce the `lunalogs` direction for future `AI x crypto` work without turning the page into a SaaS-style feature list.
- Updated the home typography and visual system to feel more editorial and premium:
  - switched to `Instrument Serif` + `Manrope`
  - introduced a warmer neutral palette with restrained green accenting
  - added subtle grid / poster texture instead of heavy gradients or card UI
- Fixed an existing mobile spacing issue where fixed-header offset and page padding stacked together, creating excess top whitespace on smaller screens.
- Updated `public/locales/en/common.json`, `public/locales/zh/common.json`, and `public/locales/ja/common.json` for the new home-page copy.
- Ran `npm run build` successfully after the changes.
- Deployed a fresh Vercel preview for the refined home page: `https://lunalogs-13yi90249-luna25ys-projects.vercel.app`

### 2026-03-31 - Codex (Home Simplification Pass)
- Simplified the home page further to match the latest art direction request: fewer words, darker mood, stronger poster-like hierarchy.
- Replaced the multi-section editorial home structure with a single-screen composition:
  - `Luna,`
  - `AI x Crypto`
  - `Projects`
  - `Writing`
  - `About`
- Kept the home page aligned with the Jose Meza reference in rhythm and restraint, but did not copy the structure verbatim and did not include any sound-control UI.
- Added a home-specific layout treatment:
  - dark full-screen background
  - home-only nav styling
  - footer hidden on the home route to keep the composition clean
- Kept secondary information minimal:
  - small location / brand cue at the top
  - concise one-line supporting note at the bottom
  - social links and resume kept present but visually secondary
- Updated `components/Layout.tsx`, `components/Navigation.tsx`, and the home-related locale strings to support the new minimal homepage.
- Ran `npm run build` successfully after the simplification pass.

### 2026-03-31 - Vercel Preview Deployment
- Deployed current codebase to Vercel preview (no code changes).
- Preview URL: https://lunalogs-lb7ec7xb4-luna25ys-projects.vercel.app
- Inspector URL: https://vercel.com/luna25ys-projects/lunalogs/6zZE3xgVWCmEt8qNuSpMFjkgtoUF
- Build completed successfully with Next.js 16.2.1 (Turbopack).
- All pages prerendered as static HTML:
  - / (home)
  - /about
  - /projects
  - /projects/taptune
  - /writing

### 2026-03-31 - Remove Header from Home
- Removed `home-poster-header` section from `pages/index.tsx`.
- Deleted the eyebrow "lunalogs" and location "Toronto" text.
- Home now starts directly with "Luna," and "AI x Crypto".
- Deployed updated preview.
- Preview URL: https://lunalogs-qriwdqc52-luna25ys-projects.vercel.app
- Inspector URL: https://vercel.com/luna25ys-projects/lunalogs/G4Sr19qs24sBKMjxWZFJLBNKUh

### 2026-03-31 - Home Page Polish & Navigation Hide
- Hidden navigation bar on home page only (`components/Layout.tsx`).
- Home page now displays without "lunalogs" brand or nav tabs.
- Increased spacing between "Luna," and "AI x Crypto" titles (`gap: 0.15em` → `0.35em`).
- Changed Resume button icon from arrow to download icon (`FiDownload`).
- Converted GitHub/X/LinkedIn text links to icons in footer area.
- Updated icon imports: `FaGithub`, `FaXTwitter`, `FaLinkedin` from `react-icons/fa6`.

### 2026-03-31 - About Expandable Section
- Replaced About link with expandable toggle button (`pages/index.tsx`).
- Added circle plus icon next to "About" (switches to X when expanded).
- Clicking About now expands content inline instead of navigating.
- Integrated About page content: intro, location, focus, background, connect.
- Added social icons row within expanded About section.
- Added compact resume download button in expanded section.
- Implemented visual feedback: when expanded, other titles shrink, dim, move up and reduce spacing (`transform: scale(0.75) translateY(-30px)`, `opacity: 0.3`, `margin-bottom: -0.6em`).
- Preserved spacing between About toggle and the title above it using `.home-poster-line-about` margin.
- Reduced padding in `.about-expanded-content` to bring content closer to About toggle (top padding reduced to `var(--space-sm)`, added negative `margin-top: -1em`).
- Footer also dims when About is expanded.
- Added responsive styles for mobile layout.
- Updated CSS with `.about-toggle`, `.about-expanded-content`, `.about-details-compact` classes.
- Improved text visibility: increased color opacity for intro (0.88→0.95), headings (0.55→0.7), and body text (0.82→0.9).
- Made about content non-selectable with `user-select: none`.
- Fixed layout: removed grid-row positioning causing large gap, content now immediately follows About button.
- Adjusted spacing: reduced padding and margins to bring content closer to About toggle.
- Changed grid layout when expanded to use `align-self: start` for proper content flow.

### 2026-03-31 - Cosmos Memory Universe Background
- Completely redesigned background as **3D Cosmos Universe** (`components/CosmosMemory.tsx`).
- **Visual Features:**
  - 4 elliptical orbital rings with memory nodes orbiting around center
  - 3 planets composed of 60-100 particles each, with rings and rotation
  - 4 nebula clouds (purple/blue/orange/green) with breathing animation
  - Flowing light particles along orbital paths
  - Mouse parallax camera movement for depth sensation
  - Zoom effect on hover for focus
- **Memory System:**
  - 5 types: 💡 insight, 📷 photo, 📖 quote, 🔗 recommend, 💭 thought
  - 5 categories with distinct colors: life(orange), career(teal), tech(blue), philosophy(gold), creative(purple)
  - 12 sample memories grouped by category in different screen areas
  - Each category clustered (life:左上, career:右上, tech:右下, philosophy:左下, creative:中心)
  - Same-category nodes connected with subtle lines
  - More scattered, organic distribution without rigid orbits
  - Legend overlay moved to top-right corner
  - Hover to reveal glassmorphism cards with details
- **Technical:**
  - Canvas-based rendering with requestAnimationFrame
  - Camera system with smooth interpolation
  - Gentle floating animation for organic feel
  - Performance optimized particle rendering
- Integrated into home page.
- Deployed to Vercel preview: https://lunalogs-bj8fe2827-luna25ys-projects.vercel.app

### 2026-03-31 - Memory Constellation Background (Replaced)
- Previous MemoryConstellation replaced by CosmosMemory.
- More immersive universe feel with planets, nebulas, and orbital mechanics.

### 2026-04-01 - Increase Home Title Spacing
- Tripled the gap between homepage titles in `.home-poster-stack`.
- Changed `gap: 0.35em` to `gap: 1.05em` (3x spacing).
- Further increased gap to `1.4em`, then to `2em` for more breathing room.
- Added `padding-top: 8vh` to push content lower on the page.
- Added `margin-bottom: 0.8em` to luna line to separate from Projects/Writing/About links.
- Projects, Writing, About now have uniform spacing of 2em between each.

### 2026-04-01 - Update Home Page Title Structure
- Removed second line "AI x Crypto" from homepage.
- Changed "Luna," to lowercase "luna" (removed comma).
- Moved tagline "building in tech, crypto & AI" to same line as "luna".
- Created CSS class `.home-poster-tagline-inline` for inline tagline styling:
  - Smaller font size (`clamp(0.9rem, 2vw, 1.3rem)`)
  - Muted color (`rgba(255, 255, 255, 0.5)`)
  - Left margin for spacing from name
  - Vertical align baseline for bottom alignment with "luna"
  - Line height 1 for consistent baseline
- Updated `pages/index.tsx` with new inline layout structure.

### 2026-04-01 - Cursor: FoxConstellation Rewrite (Cosmograph-style Knowledge Map)
- Completely rewrote `components/FoxConstellation.tsx` from scratch.
- **New architecture**: Cosmograph-inspired knowledge graph with fox-shape aggregation.
- **Knowledge map mode** (default, 12s): 40 memory nodes clustered by category (life/career/tech/philosophy/creative) across the screen, connected by ~36 semantic edges. Each node is a real personal memory — photos, insights, quotes, recommendations, or thoughts.
- **Fox aggregation mode** (5s): Nodes smoothly animate to form 4 fox silhouettes (sitting, running, curled, looking up), cycling through shapes.
- **Visual system**: 280 background stars with twinkling, node glow halos with category colors, connection lines that fade during fox mode, cosmic trail effect.
- **Physics**: Spring-damper system with mouse repulsion (140px radius), gentle floating animation per node.
- **Interaction**: Hover near a node to see glassmorphism memory card (content, type icon, category, source/link). Mouse proximity pushes nodes away.
- **Data**: 40 memories across 5 categories, 36 connection pairs (within-category + cross-category), 4 fox shapes with 40 coordinate points each.
- Removed legend overlay and Chinese-only hint text for cleaner presentation.
- Build verified: `npm run build` passes, all pages static.

## 12. Open Questions

These do not block the MVP, but should be revisited:
- Which projects should be featured first by name? (TapTune featured, others as "coming soon")
- Which external links should each project point to? (Currently placeholders)
- Should the first public version be English-only? (i18n framework present, minimal translations)
- Should the blog ship with real posts now or with a designed teaser state? (Teaser state implemented)
- Which deployment target should become the long-term home for `lunalogs.com`? (Pending decision)
