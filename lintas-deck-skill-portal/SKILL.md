---
name: lintas-deck-skill-portal
description: Build the Lintas Group Deck Skill Portal, an internal website where each team member finds, previews and downloads their assigned lintas-deck skill package (SKILL.md plus graphical assets) and gets install steps for their own LLM (Claude, ChatGPT, Gemini, Antigravity, Copilot and others). Use when asked to create, extend, rebuild or maintain the download site for the 16 Lintas deck skills. Hosting is deliberately left open.
---

# Lintas Deck Skill Portal: Website Build Skill

## Mission
Build a calm, editorial, internal website where every Lintas Group team member can:
1. find **their** department deck skill (8 departments × 2 treatments = 16 packages),
2. preview its design identity (palette, treatment, signature visuals, graphical assets),
3. download a ready-to-install package for **their own LLM**, and
4. follow LLM-specific install steps without asking for help.

The portal must look like it belongs to the Lintas Presentation Design System. It is a design-system artifact, so it should not look like a generic SaaS dashboard.

## Source of truth
- Skill root: `Lintas_Group_16_Lintas_Deck_Skills/` (one folder per skill, each with a `SKILL.md` and an optional `assets/` folder).
- Design reference: `Lintas Presentation Design System.pptx`.
- **Never hard-code skill content into the site.** At build time, generate a `skills.json` manifest by parsing every `*/SKILL.md`:
  - YAML front matter → `name`, `description`
  - H1 → department + treatment (`# Lintas Deck — {Department} / {Treatment}`)
  - `## Department visual identity — {Identity}` → identity name
  - Hex codes on the `Primary / Accent / Secondary` line → palette
  - `Departmental signature visualization` line → signature visuals
  - `assets/` folder listing → asset count, preview thumbnails
  - File hash (SHA-256) and last-modified date → version stamp
- If a parse fails, stop the build and report which file and field broke. Do not ship partial cards.

### Current catalogue (verify against the manifest; never trust this table over the files)
| Department | Identity | `-1` treatment | `-2` treatment |
|---|---|---|---|
| Business Development | Beyond the Horizon | Executive Editorial | Operational Decision Intelligence |
| Contract | Structured Trust | Executive Editorial | Operational Decision Intelligence |
| CTS | Mission Control | Executive Editorial | Operational Decision Intelligence |
| Finance | Clarity of Capital | Executive Editorial | Operational Decision Intelligence |
| HR/GA | Human Capital | Executive Editorial | Operational Decision Intelligence |
| PMO | Precision in Motion | Executive Editorial | Operational Decision Intelligence |
| Procurement | Connected Value | Executive Editorial | Operational Decision Intelligence |
| Sales & Marketing | Growth in Focus | Executive Editorial | Operational Decision Intelligence |

## Team member assignment
- Keep assignments in a separate `team.json` (or CSV): `member_id, display_name, department, default_treatment, email (optional)`. **Do not invent team members.** If the file is missing, build the site in "browse by department" mode and show an empty-state message explaining how to add the roster.
- A member's page shows their department's two treatments, with their `default_treatment` marked "Recommended". They can still download the other treatment.
- Personal URLs: `/m/{member_id}`. Department URLs: `/d/{department-slug}`.
- Treat the roster as personal data: include no phone numbers or HR attributes, and don't let search engines index it (`noindex`, no public sitemap).

## Packaging (build step)
For each skill, produce downloadable artifacts in `dist/downloads/`:
| Artifact | Contents | For |
|---|---|---|
| `{skill}.zip` | `{skill}/SKILL.md` + `{skill}/assets/**` | Claude Skills, Antigravity, agent frameworks that read skill folders |
| `{skill}.md` | Single Markdown file with asset references made relative/explained | ChatGPT Custom GPT / Project instructions, Gemini Gem, Copilot instructions |
| `{skill}-assets.zip` | Assets only | Uploading as knowledge files when a platform limits instruction length |

Rules:
- The ZIP root must be the skill folder itself (Claude requires `skill-name/SKILL.md` at the top level).
- Preserve UTF-8 (the current files contain em dashes; check that they don't get mangled into `â€”` or `�`).
- Write a `checksums.txt` (SHA-256) and show the short hash on every download button.
- Builds are deterministic: the same inputs give byte-identical ZIPs (fixed timestamps, sorted entries).

### Known naming conflict (must be surfaced, not hidden)
The body of every SKILL.md says the skill is "named exactly `lintas-deck`" and that only one should be installed per namespace, but each YAML `name` is unique (for example `lintas-deck-finance-1`). Before packaging:
- Report the inconsistency to the maintainer and ask which convention wins.
- Until it's resolved, keep the YAML name as is and add a portal notice: *"Install one Lintas deck skill per LLM profile/project unless your platform supports multiple skills."*

## LLM install guides (one tab per platform)
Each skill page has install tabs. Keep the steps short and numbered, and check them against current vendor docs at build time, because these UIs change often. Flag any step you couldn't verify as "verify in your app".
- **Claude (claude.ai / Desktop):** Settings → Capabilities → Skills → upload `{skill}.zip`.
- **Claude Code / Agent SDK:** unzip into `~/.claude/skills/` (personal) or `.claude/skills/` (project).
- **Google Antigravity:** unzip into the workspace or global skills directory so the folder contains `SKILL.md`.
- **ChatGPT (Custom GPT / Project):** paste `{skill}.md` into Instructions; upload `{skill}-assets.zip` contents as Knowledge.
- **Gemini (Gems):** paste `{skill}.md` into Gem instructions; attach assets as files.
- **Microsoft Copilot / other:** use `{skill}.md` as system/custom instructions.
- **Generic / self-hosted LLM:** use `{skill}.md` as the system prompt and keep the assets in the retrieval store.

Include an "It worked if…" check per platform, for example: *ask "Create a 3-slide Finance cover test" and expect Deep Navy #17263B with Muted Gold accents.*

## Information architecture
1. **Home:** short purpose statement, a "Find my skill" search (name or department), and a grid of 8 department tiles.
2. **Department page:** identity name, palette swatches, signature visuals, and the two treatment cards side by side with "best for" guidance (Editorial = board/executive narrative; Operational = working sessions, dashboards, decision logs).
3. **Skill page:** description, palette, asset gallery, download buttons (ZIP / MD / assets), install tabs, version + checksum, changelog.
4. **Member page:** greeting, recommended skill, alternative treatment, install tabs pre-selected by the member's preferred LLM (stored in `localStorage` only).
5. **About / Governance:** owner, update cadence, how to request changes, palette disclaimer ("proposed presentation design system, not verified corporate branding").

## Visual design (inherit from the deck system)
- Base: warm ivory `#F4F1E9`, charcoal `#171A1D`, low-contrast dot grid in negative space, hairline separators, monospaced micro-labels (indices, version, hash).
- Department accent appears **only** as an ownership indicator on that department's tiles and pages: a small bar, swatch or index chip. Never use it as a full-bleed fill.
- Typography: system sans stack (Aptos → Segoe UI → Calibri → Arial) for content; `Consolas, "Courier New", monospace` for metadata only.
- Avoid: gradients, glow, stock photos, generic AI imagery, emoji icons, carousels for core content.
- Accessibility: WCAG 2.2 AA contrast, keyboard navigable, visible focus, `prefers-reduced-motion` respected, buttons labelled with skill name (e.g., "Download Finance Editorial ZIP").
- Responsive: department grid 4 → 2 → 1 columns; download buttons stay full-width on mobile.

## Technical constraints (hosting-agnostic)
- Output must be **static** (`dist/` of HTML/CSS/JS + downloads) so it can be dropped onto an intranet server, SharePoint, GitHub Pages, S3/Cloud Storage or behind any SSO proxy later.
- No runtime backend and no third-party analytics or CDNs by default, so it works offline/air-gapped. If download metrics are requested later, add them behind an explicit opt-in.
- Access control is the host's job. Document this clearly in `README.md` and never claim the static site itself provides authentication.
- Single build command (e.g., `npm run build` or `python build.py`) that: parses skills → validates → packages → renders pages → writes checksums.

## Validation checklist (run before delivering)
- [ ] Manifest lists exactly 16 skills; every department has both treatments.
- [ ] Every ZIP opens with `{skill}/SKILL.md` at the root, and the YAML front matter parses.
- [ ] No mojibake in any generated `.md` or HTML.
- [ ] Every palette hex shown on the site matches its SKILL.md.
- [ ] All download links resolve (no 404) and checksums match.
- [ ] Lighthouse/axe accessibility pass with no critical issues; keyboard-only walk-through done.
- [ ] Member pages render with a real roster and with a missing roster (empty state).
- [ ] Naming-conflict notice is present until the maintainer resolves it.

## Maintenance
- Adding/updating a skill = edit its folder, then rebuild. The site, packages and checksums regenerate automatically.
- Each package carries a `VERSION` (date + short hash) and the skill page shows a changelog derived from git history or a `CHANGELOG.md`.
- When graphical assets are added to a skill's `assets/` folder, the gallery and the assets ZIP update without code changes.

## Deliverables
1. Source project with a build script and `README.md` (build, deploy anywhere, add members, add skills).
2. `dist/` static site with 16 skill pages, 8 department pages, member pages (if a roster exists), and downloads.
3. A short report: skills found, validation results, unresolved issues (naming conflict, unverified install steps, missing roster).
