# Lintas Presentation Design System — Deck Skill Portal

The **Deck Skill Portal** is an internal web application designed for Lintas Group team members to discover, preview, and download their assigned departmental PowerPoint skills and graphical brand assets, complete with step-by-step installation guides for their bespoke LLMs (Claude, ChatGPT, Gemini, Antigravity, Copilot, Cursor/Ollama).

---

## 🚀 Quick Start (Running Locally)

### Option 1: Double-Click Launcher (Windows)
Double-click `start_portal.bat` in this folder. It launches the local server and opens `http://localhost:8080` in your default browser.

### Option 2: Python Command Line
```powershell
python start_portal.py
```

### Option 3: Direct File Open
You can also directly open `dist/index.html` in Chrome, Edge, or Firefox. The portal includes offline standalone data fallbacks (`skills-data.js`).

---

## 📦 What the Portal Delivers

1. **Department Catalog (8 Departments × 2 Treatments = 16 Skills)**:
   - **Business Development** (*Beyond the Horizon*)
   - **Contract** (*Structured Trust*)
   - **CTS** (*Mission Control*)
   - **Finance** (*Clarity of Capital*)
   - **HR/GA** (*Human Capital*)
   - **PMO** (*Precision in Motion*)
   - **Procurement** (*Connected Value*)
   - **Sales & Marketing** (*Growth in Focus*)
   - Each available in **Treatment 1: Executive Editorial** (board & leadership narratives) and **Treatment 2: Operational Decision Intelligence** (sprints, SLA metrics, technical query tracking).

2. **Simple Department & Role Selector (`roles.json`)**:
   - Clean, privacy-friendly selection: team members simply select their **Department** and **Role / Focus** (e.g. Executive / Strategic vs. Operations / Specialist) to immediately receive the recommended presentation treatment with a `⭐ Recommended for your role` badge.

3. **Curated Graphical Assets (10 Pre-bundled Files)**:
   - **`assets/brand/`**: Official transparent `lintas-group-logo.png`, canonical Menara MTH 16th fl. closing slide `lintas-closing-slide.jpg`, reference slide canvases.
   - **`assets/textures/`**: `network-globe.jpg` (global coordinate mesh), `night-city-mesh.jpg` (aerial night data grid), `corporate-architecture.jpg` (glass tower rail).
   - **`assets/partners/`**: `telkomsel-logo.png`, `nokia-logo.jpeg`, and `zte-logo.png` for multi-vendor and client reviews.

4. **1-Click Download Formats**:
   - 📦 **Download Complete Skill Package (.ZIP)**: Ready for Claude Skills, Antigravity, and Claude Code (contains `SKILL.md` + full `assets/` subfolder).
   - 📄 **Download System Prompt (.MD)**: Standalone markdown for ChatGPT Custom GPT Instructions, Gemini Gems, or Copilot.
   - 🖼️ **Download Assets Pack (.ZIP)**: Isolated images for knowledge bases or manual insertion.
   - Full SHA-256 integrity checksums for every artifact.

5. **Guided Bespoke LLM Walkthrough**:
   - As soon as a user clicks any download button, an interactive setup wizard opens with step-by-step instructions and **copy-paste verification prompts** to test that the skill is working.
   - Dedicated guides for:
     - **Claude Desktop & Claude.ai (Web)**
     - **Claude Code / Agent SDK**
     - **Google Antigravity**
     - **OpenAI ChatGPT (Custom GPTs / Projects)**
     - **Google Gemini (Gems)**
     - **Microsoft Copilot & Office 365**
     - **Cursor / VS Code / Local LLMs (Ollama / Continue)**

---

## 🛠️ Rebuilding & Maintenance

If you edit any `SKILL.md` file in `Lintas_Group_16_Lintas_Deck_Skills/`, add new assets, or update `roles.json`, re-run the build script:

```powershell
python build_portal.py
```

The script will:
1. Re-parse all 16 `SKILL.md` files dynamically.
2. Re-generate all `.zip`, `.md`, and `-assets.zip` packages in `dist/downloads/`.
3. Compute updated SHA-256 hashes and update `dist/checksums.txt`.
4. Refresh `dist/skills-manifest.json` and `dist/skills-data.js`.

---

## 🌐 Deploying to Intranet / Hosting

The entire portal in `portal/dist/` is completely **static, zero-dependency, and offline-ready**:
- **Corporate Intranet / IIS / Nginx**: Drop the contents of `portal/dist/` into any static web server document root.
- **Microsoft SharePoint**: Upload `portal/dist/` to a SharePoint Site Assets or Document Library.
- **GitHub Pages / GitLab Pages**: Set the publish directory to `portal/dist/`.
- **AWS S3 / Google Cloud Storage / Azure Blob**: Sync `portal/dist/` to a static website bucket.
