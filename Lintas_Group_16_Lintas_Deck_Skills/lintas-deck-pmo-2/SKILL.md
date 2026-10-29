---
name: lintas-deck-pmo-2
description: Create human-crafted, editable Lintas Group PMO PowerPoint presentations using the Precision in Motion departmental identity and an operational decision-intelligence composition system.
---

# Lintas Deck — PMO / Operational Decision Intelligence

## Skill identity and activation
This is a **standalone Claude Skill** named exactly `lintas-deck`. It is specific to the **PMO** department and the **operational** presentation treatment. Do not call it a numbered variant. The name in YAML is intentionally identical across the 16 files, so install only **one** `lintas-deck` at a time in a single Claude skill namespace, or use separate Claude projects/profiles to keep multiple installed. Do not silently rename the skill. The folder/filename distinguishes the downloadable artifact, not the skill name.

## Mission
Create genuinely human-crafted 16:9 executive PowerPoint decks for Lintas Group PMO. Prioritize visual design craftsmanship over generic template population. Adapt the story to the actual brief; the topics below are examples, not assumed company data or required slide content. Reproduce the original reference's design *discipline* (restrained technical-editorial typography, warm ivory/charcoal contrast, subtle dot grids, precise alignment, intentional whitespace, distinctive slide navigation, native editable shapes), but never copy its Management Cockpit content.

## Department visual identity — Precision in Motion
- Department: **PMO**. Narrative personality: delivery predictability, dependencies, escalation, accountable decisions.
- Primary: Midnight Navy #182C42. Accent: Cobalt #4777B8. Secondary: Warm Gray #D8D5CD.
- Shared Lintas foundation: warm ivory `#F4F1E9`, charcoal `#171A1D`, low-contrast dot grid, subtle separators and micro-navigation.
- Treat palette as a **proposed presentation design system**, not verified corporate branding. Supplied official brand guidelines override these colors.
- Typography: Aptos/Calibri/Arial for readable content; Consolas/Courier New for small metadata, slide indices and compact technical labels. For Finance, use tabular numerals. For HR/GA, soften technical ornamentation. Never use monospaced body paragraphs by default.
- Departmental signature visualization: milestone roadmaps, critical path, dependency maps, gate reviews.
- Subject matter vocabulary when appropriate: project milestones, delivery health, risks, blockers, dependencies, change control.
- Do not use department accent as a large background fill on every slide; keep it purposeful and restrained.

## Treatment-specific art direction
- Compose like an executive operations field atlas: slightly denser but still spacious, more dark technical sections, systematic labels, connected evidence-to-decision pathways, clean native diagrams.
- Favor workflow swimlanes, decision gates, dependency maps, evidence panels, status chronology and annotated operational charts.
- Every flow connector must mean a real dependency, transition or ownership handoff; never decorate with arbitrary arrows.
- Separate observed evidence, assumptions, risks, decisions, owners, due dates and verification. Do not claim automation or causal insight without support.
- This is a presentation, not a dashboard screenshot or a terminal mockup.

## Content-to-visual routing for PMO
Choose the visual form based on the information's logic, not a fixed slide template:
- Performance over time → one annotated trend chart with period, units, source and takeaway.
- Distribution or ranking → readable bar/Pareto chart with explicit denominator.
- Work in progress → aging table, segmented flow or cohort view; avoid fabricated values.
- Dependencies → directional dependency map with accurate interfaces/owners.
- Alternatives → comparison matrix with explicit decision criteria and trade-offs.
- Risks and exceptions → severity × likelihood only when definitions exist; otherwise a transparent prioritized register.
- Decisions → compact evidence → options → recommendation → owner → due date → success check.
- Department-relevant examples: milestone roadmaps, critical path, dependency maps, gate reviews.

## Slide architecture (adapt; do not force)
1. Cover with audience, purpose, period, and short thesis.
2. Executive signal: the central question and why it matters.
3. Evidence snapshot: verified observations with data lineage.
4. Department-specific performance or process view.
5. Variance, bottleneck, opportunity or exposure diagnosis.
6. One concrete scenario, clearly marked actual or illustrative.
7. Options and implications; show what remains uncertain.
8. Prioritized actions with accountable owners.
9. Measurement approach, baseline and decision gates.
10. Clear close: decision requested and immediate next step.
Use only the number of slides requested; recompose, combine or omit sections as needed. Do not present hypothetical metrics as actual Lintas Group results.

## Cross-functional presentations
Keep Lintas Group corporate foundations stable. When another unit appears, use that unit's accent only as a small ownership indicator. Clearly label handoffs and dependencies; do not imply the source system contains data from all eight departments. Protect confidential contract, employee, customer, supplier and finance data.

## Native PowerPoint production standards
- 16:9 widescreen (13.333 × 7.5 in); margins approximately 0.55–0.75 in; consistent baseline and optical alignment.
- Titles typically 30–42 pt; body 16–21 pt; labels 10–13 pt. Avoid text below 12 pt for important projected information.
- Create editable text, vector shapes, tables, diagrams and charts; avoid flattening slides into full-page images.
- Use genuine quantitative charts only with provided/validated data. State data source, period, unit and limitations.
- Use no more than one primary claim per slide. Provide visual variety; never repeat the same card-grid composition across three consecutive slides.
- Apply dot grid only in low-contrast negative space. Use dark/light slides for narrative pacing, not mechanical alternation.
- Keep page numbering and breadcrumb navigation consistent and unobtrusive.
- Avoid stock-photo filler, blue-purple gradients, glow, generic AI imagery, decorative 3D icons, tiny text, fake system terminals and invented statistics.

## Approved graphical assets and legacy brand artifacts
The following official corporate and partner assets (extracted from verified legacy Lintas Group presentation decks) are bundled directly in this skill's `assets/` directory. When generating presentations, reference and place these local assets according to these rules:

### Corporate brand assets (`assets/brand/`)
- `lintas-group-logo.png` (460×127 px, transparent PNG): Official Lintas Group corporate logo with red accent arc and bold navy wordmark.
  - **Usage**: Mandatory on the Cover/Title slide (prominently placed in header or bottom branding rail) and optional micro-scale watermark in content slide footers. Maintain generous clear space around the logo (minimum 0.2 in / 15 pt margin). Never distort aspect ratio, stretch, or alter the corporate colors.
- `lintas-closing-slide.jpg` (1280×720 px, 16:9): Canonical Lintas Group corporate closing lockup on deep corporate navy `#17263B`.
  - **Usage**: Use for standardized presentation conclusions and back-cover contact slides. Contains the official verified headquarters address block:
    * **Office**: Menara MTH 16th Floor, Jl. MT. Haryono kav. 23, Jakarta 12820
    * **Communications**: Tel: +62-21-8378 0000 | Fax: +62-21-8378 0001 | Email: `sales@LT-indonesia.com` | Web: `www.LT-indonesia.com`
- `lintas-slide-master-light.jpg` & `lintas-slide-master-cover.jpg` (1280×720 px): Reference layouts illustrating the legacy visual anchor system with corporate tagline *"Architecting Communications, Creating Opportunities"*.

### Atmospheric textures and technical backdrops (`assets/textures/`)
- `network-globe.jpg` (1280×720 px): Subtle telecommunication network globe wireframe with dotted coordinate nodes.
  - **Usage**: Subdued visual texture for macro strategy, connectivity footprint, or high-level organizational scope. Keep at high transparency / low contrast behind negative space; never compete with text readability.
- `night-city-mesh.jpg` (1280×720 px): Aerial nocturnal city grid with illuminated data corridors.
  - **Usage**: Premium dark-background chapter dividers, operational command slides, or strategic shift milestones.
- `corporate-architecture.jpg` (1040×720 px): Upward perspective of contemporary glass skyscraper in cool corporate slate-blue.
  - **Usage**: 40% vertical rail accents in editorial splits, executive summary sidebars, or capability highlights.

### Client & partner assets protocol (Upload / User-Supplied Assets)
External client, vendor, or partner logos (such as telecom operators, technology OEMs, subcontractors, or enterprise accounts) are **intentionally not bundled** in the core repository to maintain brand neutrality and prevent cross-tenant exposure:
- **Dynamic Asset Ingestion**: When a presentation brief requires client co-branding, vendor SLA reviews, or partner badges, the user supplies or uploads the partner assets directly in the conversation workspace (e.g. attached via chat or placed under `assets/uploads/`).
- **Aspect Ratio & Integrity**: Never distort, tint, or redraw supplied partner logos. Preserve transparent backgrounds (`.png` / `.svg`) and original brand proportions.
- **Optical Balance**: When displaying partner logos alongside the Lintas Group corporate logo, size them to equal optical visual weight (typical max height 24–32 pt equivalent).
- **Clear Governance**: Restrict partner logos to a dedicated "Client Ecosystem" strip, co-branded cover secondary rail, or SLA table header. Never present partner logos as internal Lintas Group divisions.

## Production workflow
1. Read the user brief and supplied files. Determine audience, meeting purpose, period, decisions, evidence and confidentiality.
2. Build an evidence ledger: **verified / inferred / proposed / illustrative / unavailable**. Never silently convert assumptions to facts.
3. Write a one-sentence assertion headline for each slide, then assign the most suitable diagram/chart/layout.
4. Apply this department's palette and visual grammar with the chosen treatment.
5. Build native editable PowerPoint objects; place deeper explanation and caveats in speaker notes.
6. Render slides and inspect at full-screen and thumbnail scale; fix clipping, awkward wrapping, connector collisions, weak contrast and inconsistent spacing.
7. Check narrative progression, density, layout repetition, numbers, units, privacy and ownership.
8. Deliver the editable `.pptx` and briefly report any data gaps or visual QA not completed.

## Acceptance criteria
- Department identity is recognizable beyond color alone.
- Deck belongs to the Lintas Group design family without copying any prior deck's content.
- Slides are visually composed, not mechanically filled.
- Audience can identify each slide's message in about three seconds.
- All charts and diagrams are truthful, legible and editable.
- Every proposed action has a rationale and, when supplied, an owner and verification criterion.
- No unsupported claims, overflow, missing labels or decorative clutter.

## Example Claude invocation
“Use the `lintas-deck` skill to prepare a PMO operational decision review for Lintas Group. Use the supplied evidence, distinguish assumptions from facts, and deliver a 12-slide fully editable PowerPoint.”
