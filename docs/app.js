/**
 * Lintas Presentation Design System — Skill Portal Client Application
 * Simple Department & Role Selector Edition
 */

(function() {
  'use strict';

  // State
  let manifest = window.LINTAS_SKILLS_MANIFEST || { skills: [], roles: [] };
  let currentDeptFilter = 'all';
  let currentTreatmentFilter = 'all';
  let currentSearchQuery = '';
  let selectedDepartment = '';
  let selectedRole = null;

  // DOM Elements
  const skillsGrid = document.getElementById('skillsGrid');
  const rolesGuideContainer = document.getElementById('rolesGuideContainer');
  const guideContentPanel = document.getElementById('guideContentPanel');
  const assetsGalleryGrid = document.getElementById('assetsGalleryGrid');
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  // Role Selection Elements
  const deptSelect = document.getElementById('deptSelect');
  const roleSelect = document.getElementById('roleSelect');
  const resetRoleBtn = document.getElementById('resetRoleBtn');
  const roleBanner = document.getElementById('roleBanner');
  const roleTitle = document.getElementById('roleTitle');
  const roleDeptBadge = document.getElementById('roleDeptBadge');
  const roleScopeText = document.getElementById('roleScopeText');
  const roleRecTreatment = document.getElementById('roleRecTreatment');
  const roleRecReason = document.getElementById('roleRecReason');
  const roleDownloadRecBtn = document.getElementById('roleDownloadRecBtn');

  // Modal Elements
  const downloadModal = document.getElementById('downloadModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDoneBtn = document.getElementById('modalDoneBtn');
  const modalOpenFullGuideBtn = document.getElementById('modalOpenFullGuideBtn');
  const modalBody = document.getElementById('modalBody');
  const modalTitle = document.getElementById('modalTitle');
  const toast = document.getElementById('toast');

  // Nav buttons
  const navBtns = document.querySelectorAll('.nav-btn');
  const viewSections = document.querySelectorAll('.view-section');

  // LLM Guides Database
  const LLM_GUIDES = {
    claude: {
      name: "Claude (Web & Desktop App)",
      tagline: "Best for Claude.ai Pro/Team/Enterprise accounts & Claude Desktop",
      fileToUse: "Use the .ZIP package (e.g. lintas-deck-finance-1.zip)",
      badge: "Claude Skills API",
      steps: [
        {
          title: "Open Claude Settings",
          text: "Log in to <strong>claude.ai</strong> (or launch the Claude Desktop app), click your profile icon in the bottom-left corner, and open <strong>Settings</strong>."
        },
        {
          title: "Navigate to Skills",
          text: "Under the <strong>Capabilities</strong> section in the settings sidebar, select <strong>Skills</strong>."
        },
        {
          title: "Upload the ZIP Package",
          text: "Click <strong>Add Skill</strong> or <strong>Upload Skill</strong>, and select the <code>{skill}.zip</code> file you downloaded. Claude will automatically unpack <code>SKILL.md</code> and the <code>assets/</code> folder."
        },
        {
          title: "Start a Conversation",
          text: "Open a new chat or Project. Claude will automatically recognize the <code>lintas-deck</code> skill when prompted."
        }
      ],
      promptSnippet: "Use the lintas-deck skill to create an executive PowerPoint presentation for Lintas Group.",
      verificationPrompt: "Use the lintas-deck skill to prepare a 3-slide performance overview for Lintas Group. Incorporate the official Lintas Group logo on the title slide, apply our department color palette, and provide an editable closing slide with the Menara MTH address block.",
      expectedResult: "Claude outputs a native 16:9 presentation structure using your department primary/accent colors, references the bundled logo in assets/brand/, and concludes with the official Menara MTH 16th floor contact block."
    },
    claudecode: {
      name: "Claude Code / Terminal Agent SDK",
      tagline: "For engineers running Claude Code CLI or Anthropic Agent SDK",
      fileToUse: "Use the .ZIP package or unpack directly into your skills directory",
      badge: "Terminal / CLI",
      steps: [
        {
          title: "Locate Your Skills Directory",
          text: "For personal global skills, open terminal and navigate to <code>~/.claude/skills/</code>. For repository-specific use, navigate to your project root's <code>.claude/skills/</code> directory."
        },
        {
          title: "Extract the Skill Package",
          text: "Unzip your downloaded <code>{skill}.zip</code> directly into the skills folder so that <code>SKILL.md</code> is at <code>~/.claude/skills/{skill}/SKILL.md</code>.",
          code: "# PowerShell on Windows\nExpand-Archive -Path .\\downloads\\{skill}.zip -DestinationPath ~/.claude/skills/\n\n# Bash / macOS / Linux\nunzip ./downloads/{skill}.zip -d ~/.claude/skills/"
        },
        {
          title: "Verify Skill Recognition",
          text: "Run <code>claude skills list</code> or start a session with <code>claude</code>. The skill will appear in your active capabilities."
        }
      ],
      promptSnippet: "/lintas-deck Create a 10-slide deck on monthly operational performance",
      verificationPrompt: "Check if the lintas-deck skill is active. What is my department's primary and accent palette?",
      expectedResult: "Claude Code confirms the skill identity (e.g. Clarity of Capital, Beyond the Horizon) and echoes the exact HEX color codes."
    },
    antigravity: {
      name: "Google Antigravity",
      tagline: "For Antigravity IDE and pair programming workflows",
      fileToUse: "Use the .ZIP package",
      badge: "Antigravity Agent",
      steps: [
        {
          title: "Unpack into Workspace or Global Skills",
          text: "Unzip the <code>{skill}.zip</code> into your Antigravity skills directory at <code>~/.gemini/antigravity/skills/{skill}/</code> or directly in your current workspace."
        },
        {
          title: "Verify Discovery",
          text: "Antigravity automatically discovers skills containing a valid <code>SKILL.md</code> with YAML front matter."
        },
        {
          title: "Invoke in Chat",
          text: "Simply request a presentation in chat. Antigravity will activate the skill and read the bundled assets."
        }
      ],
      promptSnippet: "Use the lintas-deck skill to compose a 6-slide executive deck with native PowerPoint shapes.",
      verificationPrompt: "Verify the lintas-deck skill. List the bundled assets available in assets/.",
      expectedResult: "Antigravity lists the 10 bundled assets (logos, closing slide, network globe texture, partner logos)."
    },
    chatgpt: {
      name: "OpenAI ChatGPT (Custom GPT / Projects)",
      tagline: "For ChatGPT Plus/Team/Enterprise Custom GPTs or Projects",
      fileToUse: "Use the standalone .MD file + the Assets ZIP",
      badge: "Custom GPT / Project",
      steps: [
        {
          title: "Create or Edit a Custom GPT",
          text: "Navigate to <strong>chatgpt.com/gpts/editor</strong> and click <strong>Create a GPT</strong> (or open your existing team workspace Project)."
        },
        {
          title: "Paste Instructions",
          text: "Open the downloaded <code>{skill}.md</code> in any text editor (Notepad, VS Code), copy its entire contents, and paste it into the <strong>Instructions</strong> box."
        },
        {
          title: "Upload Knowledge Assets",
          text: "Under <strong>Knowledge</strong>, click <strong>Upload files</strong> and attach the extracted images from <code>{skill}-assets.zip</code> (especially <code>lintas-group-logo.png</code> and <code>lintas-closing-slide.jpg</code>)."
        },
        {
          title: "Set Capabilities & Save",
          text: "Enable <strong>Code Interpreter</strong> so ChatGPT can generate native <code>.pptx</code> files via python-pptx. Save your GPT."
        }
      ],
      promptSnippet: "Create a Lintas Group executive slide deck using the loaded design system instructions.",
      verificationPrompt: "Review your instructions. What is our department visual identity name, narrative personality, and primary hex color?",
      expectedResult: "ChatGPT accurately reports your department identity (e.g., Structured Trust, Clarity of Capital) and rules of design restraint."
    },
    gemini: {
      name: "Google Gemini (Gems)",
      tagline: "For Google Workspace Gemini Advanced & Custom Gems",
      fileToUse: "Use the standalone .MD file + Assets",
      badge: "Gemini Gem",
      steps: [
        {
          title: "Open Gem Manager",
          text: "Go to <strong>gemini.google.com/gems</strong> and click <strong>New Gem</strong>."
        },
        {
          title: "Name and Describe Your Gem",
          text: "Name: <code>Lintas Presentation Designer</code>. Description: <code>Official Lintas Group departmental presentation generator.</code>"
        },
        {
          title: "Paste Instructions",
          text: "Copy the full text of your downloaded <code>{skill}.md</code> file and paste it into the <strong>Instructions</strong> text area."
        },
        {
          title: "Attach Brand Images",
          text: "Attach <code>lintas-group-logo.png</code> and <code>lintas-closing-slide.jpg</code> as reference knowledge files."
        }
      ],
      promptSnippet: "Draft a 5-slide editorial deck for our upcoming executive committee review.",
      verificationPrompt: "What are the rules regarding the use of the Lintas Group corporate logo and partner logos?",
      expectedResult: "Gemini confirms the logo placement standards (mandatory cover, clear-space) and partner logo usage rules."
    },
    copilot: {
      name: "Microsoft Copilot & Office 365",
      tagline: "For Microsoft Copilot Studio, M365 Copilot, or Prompt Books",
      fileToUse: "Use the standalone .MD file",
      badge: "Copilot Studio / M365",
      steps: [
        {
          title: "Access Copilot Studio or Custom Instructions",
          text: "In Microsoft 365 Copilot, open your team's Copilot Studio workspace or user Custom Instructions."
        },
        {
          title: "Configure Agent System Prompt",
          text: "Paste the contents of <code>{skill}.md</code> into the Agent Instructions / System Prompt field."
        },
        {
          title: "Attach Assets to Knowledge Library",
          text: "Add the <code>assets/</code> folder contents into the SharePoint knowledge library linked to your Copilot agent."
        }
      ],
      promptSnippet: "Generate a presentation outline and slide structure following the Lintas Presentation Design System.",
      verificationPrompt: "Verify our company address block for the final slide.",
      expectedResult: "Copilot outputs Menara MTH 16th Floor, Jl. MT. Haryono kav. 23 Jakarta 12820."
    },
    local: {
      name: "Cursor / VS Code / Local LLMs (Ollama)",
      tagline: "For developers using Cursor, Continue.dev, LM Studio, or Ollama",
      fileToUse: "Use the standalone .MD or .cursorrules / .prompt",
      badge: "Local / Developer",
      steps: [
        {
          title: "For Cursor or Windsurf",
          text: "Copy the downloaded <code>{skill}.md</code> into your project root as <code>.cursorrules</code> or place inside <code>.cursor/rules/lintas-deck.mdc</code>."
        },
        {
          title: "For Continue.dev",
          text: "Add the markdown file path to your <code>config.json</code> under custom system commands or rules."
        },
        {
          title: "For Ollama / Modelfile",
          text: "Create a Modelfile with <code>SYSTEM \"\"\"[paste contents of {skill}.md]\"\"\"</code>."
        }
      ],
      promptSnippet: "Write a python-pptx script to create a 4-slide Lintas Group deck following our skill guidelines.",
      verificationPrompt: "What slide dimensions and font hierarchy does the Lintas design system prescribe?",
      expectedResult: "Reports 16:9 widescreen (13.333 x 7.5 in), titles 30-42 pt, body 16-21 pt, labels 10-13 pt."
    }
  };

  // Init
  function init() {
    renderSkillsGrid();
    renderRolesGuide();
    renderGuideView('claude');
    renderAssetsGallery();
    bindEvents();
    checkUrlHash();
  }

  // Bind Events
  function bindEvents() {
    // Nav switcher
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetView = btn.getAttribute('data-view');
        switchView(targetView);
      });
    });

    // Department quick chips
    const deptChips = document.querySelectorAll('#deptFilterChips .chip');
    deptChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const dept = chip.getAttribute('data-dept');
        setDepartment(dept);
      });
    });

    // Treatment filter chips
    const treatmentChips = document.querySelectorAll('#treatmentFilterChips .chip');
    treatmentChips.forEach(chip => {
      chip.addEventListener('click', () => {
        treatmentChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentTreatmentFilter = chip.getAttribute('data-treatment');
        renderSkillsGrid();
      });
    });

    // Search input
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      clearSearchBtn.style.display = currentSearchQuery ? 'block' : 'none';
      renderSkillsGrid();
    });

    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentSearchQuery = '';
      clearSearchBtn.style.display = 'none';
      renderSkillsGrid();
    });

    // Department Dropdown change
    deptSelect.addEventListener('change', (e) => {
      const dept = e.target.value || 'all';
      setDepartment(dept);
    });

    // Role Dropdown change
    roleSelect.addEventListener('change', (e) => {
      const roleId = e.target.value;
      if (!roleId) {
        selectedRole = null;
        roleBanner.style.display = 'none';
        renderSkillsGrid();
        return;
      }
      const deptData = (manifest.roles || []).find(d => d.department === selectedDepartment);
      if (deptData) {
        selectedRole = deptData.roles.find(r => r.role_id === roleId) || null;
      }
      updateRoleBanner();
      renderSkillsGrid();
    });

    // Reset Role button
    resetRoleBtn.addEventListener('click', () => {
      resetSelection();
    });

    // Modal controls
    modalCloseBtn.addEventListener('click', closeModal);
    modalDoneBtn.addEventListener('click', closeModal);
    modalOpenFullGuideBtn.addEventListener('click', () => {
      closeModal();
      switchView('guide');
    });

    // Guide tabs
    const guideBtns = document.querySelectorAll('.guide-tab-btn');
    guideBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        guideBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGuideView(btn.getAttribute('data-guide'));
      });
    });
  }

  // Set Department and update role options
  function setDepartment(dept) {
    selectedDepartment = dept === 'all' ? '' : dept;
    currentDeptFilter = dept;

    // Sync select dropdown
    deptSelect.value = selectedDepartment;

    // Sync chips
    const chips = document.querySelectorAll('#deptFilterChips .chip');
    chips.forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-dept').toLowerCase() === dept.toLowerCase());
    });

    // Update role dropdown
    if (!selectedDepartment) {
      roleSelect.innerHTML = '<option value="">-- Select department first --</option>';
      roleSelect.disabled = true;
      resetRoleBtn.style.display = 'none';
      selectedRole = null;
      roleBanner.style.display = 'none';
    } else {
      roleSelect.disabled = false;
      resetRoleBtn.style.display = 'inline-block';
      const deptData = (manifest.roles || []).find(d => d.department.toLowerCase() === selectedDepartment.toLowerCase());
      if (deptData && deptData.roles) {
        roleSelect.innerHTML = '<option value="">-- Select Role / Focus --</option>' +
          deptData.roles.map(r => `<option value="${r.role_id}">${r.title}</option>`).join('');
      } else {
        roleSelect.innerHTML = '<option value="">-- No predefined roles --</option>';
      }
      selectedRole = null;
      roleBanner.style.display = 'none';
    }

    renderSkillsGrid();
  }

  // Update Role Banner
  function updateRoleBanner() {
    if (!selectedRole) {
      roleBanner.style.display = 'none';
      return;
    }

    roleBanner.style.display = 'flex';
    roleTitle.textContent = selectedRole.title;
    roleDeptBadge.textContent = selectedDepartment;
    roleScopeText.textContent = selectedRole.scope;
    roleRecTreatment.textContent = selectedRole.recommended_treatment;
    roleRecReason.textContent = selectedRole.recommended_treatment === 'Executive Editorial'
      ? ' — best for executive narratives, board reviews & strategic decisions'
      : ' — best for operational sprint reviews, technical queries & SLA dashboards';

    roleDownloadRecBtn.onclick = () => {
      const targetSkill = manifest.skills.find(s =>
        s.department.toLowerCase() === selectedDepartment.toLowerCase() &&
        s.treatment === selectedRole.recommended_treatment
      );
      if (targetSkill) {
        onDownloadInitiated(targetSkill, 'zip');
      }
    };
  }

  // Reset Selection
  function resetSelection() {
    selectedDepartment = '';
    selectedRole = null;
    deptSelect.value = '';
    roleSelect.innerHTML = '<option value="">-- Select department first --</option>';
    roleSelect.disabled = true;
    resetRoleBtn.style.display = 'none';
    roleBanner.style.display = 'none';
    setDepartment('all');
  }

  // Switch View
  function switchView(viewName) {
    navBtns.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-view') === viewName);
    });
    viewSections.forEach(sec => {
      sec.classList.remove('active');
    });
    const targetSec = document.getElementById('view' + viewName.charAt(0).toUpperCase() + viewName.slice(1));
    if (targetSec) {
      targetSec.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // URL Hash router
  function checkUrlHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('d/')) {
      const deptSlug = decodeURIComponent(hash.replace('d/', ''));
      setDepartment(deptSlug);
      switchView('catalog');
    } else if (['catalog', 'roles', 'guide', 'assets'].includes(hash)) {
      switchView(hash);
    }
  }

  // Render Skills Grid
  function renderSkillsGrid() {
    skillsGrid.innerHTML = '';

    const filtered = manifest.skills.filter(s => {
      const matchDept = currentDeptFilter === 'all' || s.department.toLowerCase() === currentDeptFilter.toLowerCase();
      const matchTreatment = currentTreatmentFilter === 'all' || s.treatment.toLowerCase() === currentTreatmentFilter.toLowerCase();
      const matchSearch = !currentSearchQuery ||
        s.name.toLowerCase().includes(currentSearchQuery) ||
        s.department.toLowerCase().includes(currentSearchQuery) ||
        s.identity.toLowerCase().includes(currentSearchQuery) ||
        s.personality.toLowerCase().includes(currentSearchQuery) ||
        s.treatment.toLowerCase().includes(currentSearchQuery);

      return matchDept && matchTreatment && matchSearch;
    });

    if (filtered.length === 0) {
      skillsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; background: #fff; padding: 40px; text-align: center; border-radius: 8px; border: 1px solid #ddd;">
          <h3 style="color:#17263B; margin-bottom: 8px;">No matching deck skills found</h3>
          <p style="color:#666; font-size:14px;">Try clearing your search query or selecting "All" departments.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(skill => {
      const card = document.createElement('div');
      card.className = 'skill-card';

      const isRec = selectedRole &&
        skill.department.toLowerCase() === selectedDepartment.toLowerCase() &&
        skill.treatment === selectedRole.recommended_treatment;

      if (isRec) {
        card.classList.add('is-recommended');
      }

      const primaryColor = (skill.palette && skill.palette.primary) ? skill.palette.primary.hex : '#17263B';
      const accentColor = (skill.palette && skill.palette.accent) ? skill.palette.accent.hex : '#B79A61';
      const secondaryColor = (skill.palette && skill.palette.secondary) ? skill.palette.secondary.hex : '#CBD7D8';

      card.innerHTML = `
        <div class="skill-card-accent-bar" style="background: ${primaryColor};"></div>
        <div class="skill-card-body">
          <div class="skill-badge-row">
            <span class="dept-pill" style="background: ${primaryColor};">${skill.department}</span>
            ${isRec ? '<span class="rec-badge">⭐ Recommended for your role</span>' : `<span class="identity-pill">${skill.identity}</span>`}
          </div>

          <h3 class="skill-title">${skill.department}</h3>
          <div class="treatment-sub">${skill.treatment}</div>

          <p class="skill-desc">${skill.description}</p>

          <div class="palette-preview">
            <div class="palette-label">Visual Palette</div>
            <div class="palette-swatches">
              <div class="swatch-chip" title="Primary: ${skill.palette.primary.name}">
                <span class="swatch-dot" style="background: ${primaryColor};"></span>
                <span>${primaryColor}</span>
              </div>
              <div class="swatch-chip" title="Accent: ${skill.palette.accent.name}">
                <span class="swatch-dot" style="background: ${accentColor};"></span>
                <span>${accentColor}</span>
              </div>
              <div class="swatch-chip" title="Secondary: ${skill.palette.secondary.name}">
                <span class="swatch-dot" style="background: ${secondaryColor};"></span>
                <span>${secondaryColor}</span>
              </div>
            </div>
          </div>

          <div class="signature-preview">
            <strong>Signature Visual:</strong> ${skill.signature}
          </div>

          <div class="downloads-box">
            <a href="${skill.packages.zip.url}" class="btn btn-primary download-trigger" data-type="zip" data-id="${skill.id}">
              📦 Download Skill Package (.ZIP) — ${skill.packages.zip.size_kb} KB
            </a>
            <div class="btn-group">
              <a href="${skill.packages.md.url}" class="btn btn-secondary btn-sm download-trigger" data-type="md" data-id="${skill.id}">
                📄 System Prompt (.MD)
              </a>
              <a href="${skill.packages.assets_zip.url}" class="btn btn-secondary btn-sm download-trigger" data-type="assets_zip" data-id="${skill.id}">
                🖼️ Assets Pack (${skill.asset_count})
              </a>
            </div>
            <div class="card-meta-row">
              <span>SHA-256: <code class="hash-pill" title="Click to copy full hash" data-hash="${skill.packages.zip.sha256}">${skill.packages.zip.sha256_short}…</code></span>
              <span>${skill.asset_count} Core Assets + Upload Ready</span>
            </div>
          </div>
        </div>
      `;

      // Bind download triggers for interactive guidance
      card.querySelectorAll('.download-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
          const type = trigger.getAttribute('data-type');
          onDownloadInitiated(skill, type);
        });
      });

      // Bind hash copy
      card.querySelector('.hash-pill').addEventListener('click', (e) => {
        copyToClipboard(e.target.getAttribute('data-hash'), 'Copied SHA-256 hash to clipboard!');
      });

      skillsGrid.appendChild(card);
    });
  }

  // Render Roles Guide View
  function renderRolesGuide() {
    rolesGuideContainer.innerHTML = '';
    (manifest.roles || []).forEach(d => {
      const card = document.createElement('div');
      card.className = 'dept-role-card';

      card.innerHTML = `
        <div class="dept-role-card-header">
          <h3>${d.department}</h3>
          <button class="btn btn-secondary btn-sm filter-dept-btn" data-dept="${d.department}">
            View Department Decks →
          </button>
        </div>
        <div class="dept-role-card-body">
          ${d.roles.map(r => `
            <div class="role-entry">
              <div class="role-entry-title">${r.title}</div>
              <div class="role-entry-scope">${r.scope}</div>
              <div class="role-entry-footer">
                <span>Recommended: <strong class="treatment-tag">${r.recommended_treatment}</strong></span>
                <button class="btn btn-primary btn-sm select-this-role-btn" data-dept="${d.department}" data-role="${r.role_id}">
                  Select This Role
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      card.querySelector('.filter-dept-btn').addEventListener('click', (e) => {
        const dept = e.target.getAttribute('data-dept');
        setDepartment(dept);
        switchView('catalog');
      });

      card.querySelectorAll('.select-this-role-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const dept = btn.getAttribute('data-dept');
          const roleId = btn.getAttribute('data-role');
          setDepartment(dept);
          roleSelect.value = roleId;
          const deptData = (manifest.roles || []).find(x => x.department === dept);
          if (deptData) {
            selectedRole = deptData.roles.find(r => r.role_id === roleId);
          }
          updateRoleBanner();
          renderSkillsGrid();
          switchView('catalog');
        });
      });

      rolesGuideContainer.appendChild(card);
    });
  }

  // Trigger Download & Open Guided Modal
  function onDownloadInitiated(skill, type) {
    modalTitle.textContent = `${skill.department} (${skill.treatment})`;
    const isZip = type === 'zip';
    const isMd = type === 'md';

    modalBody.innerHTML = `
      <div style="background:#F4F1E9; border:1px solid #DDD7CA; border-radius:6px; padding:16px; margin-bottom:20px;">
        <h4 style="color:#17263B; margin-bottom:6px; font-size:15px;">🎉 Download Started: <code>${skill.packages[type].filename}</code></h4>
        <p style="font-size:13px; color:#5A626A; margin-bottom:10px;">
          ${isZip ? 'This complete ZIP archive contains both <code>SKILL.md</code> and the <code>assets/</code> folder (with corporate logos and slide textures).' : ''}
          ${isMd ? 'This standalone markdown file contains the complete system prompt and design instructions.' : ''}
        </p>
        <div style="display:flex; gap:10px; font-size:12px; font-family:var(--font-mono); color:#171A1D;">
          <span>Size: ${skill.packages[type].size_kb} KB</span>
          <span>SHA-256: ${skill.packages[type].sha256_short}…</span>
        </div>
      </div>

      <h4 style="font-size:16px; color:#17263B; margin-bottom:12px;">Quick 2-Minute Installation Instructions:</h4>

      <div style="display:flex; gap:8px; margin-bottom:16px; border-bottom:1px solid #eee; padding-bottom:8px;">
        <button class="modal-tab-pill active" data-mguide="claude">Claude</button>
        <button class="modal-tab-pill" data-mguide="chatgpt">ChatGPT</button>
        <button class="modal-tab-pill" data-mguide="gemini">Gemini</button>
        <button class="modal-tab-pill" data-mguide="antigravity">Antigravity</button>
      </div>

      <div id="modalGuideContent">
        <!-- Rendered based on selected tab -->
      </div>
    `;

    // Bind modal tabs
    const modalTabs = modalBody.querySelectorAll('.modal-tab-pill');
    modalTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        modalTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderModalGuideContent(tab.getAttribute('data-mguide'), skill);
      });
    });

    renderModalGuideContent('claude', skill);
    downloadModal.style.display = 'flex';
  }

  function renderModalGuideContent(guideKey, skill) {
    const guide = LLM_GUIDES[guideKey];
    const container = document.getElementById('modalGuideContent');
    if (!guide || !container) return;

    container.innerHTML = `
      <div style="margin-bottom:14px;">
        <strong style="color:#17263B; font-size:14px;">Platform: ${guide.name}</strong>
        <p style="font-size:12.5px; color:#666;">${guide.fileToUse}</p>
      </div>
      <ol style="padding-left:20px; font-size:13px; color:#374151; display:flex; flex-direction:column; gap:8px; margin-bottom:16px;">
        ${guide.steps.map(s => `<li><strong>${s.title}</strong>: ${s.text}</li>`).join('')}
      </ol>
      <div style="background:#171A1D; color:#fff; padding:10px 14px; border-radius:4px; font-family:var(--font-mono); font-size:12px; position:relative;">
        <span style="color:#889098; font-size:10px; display:block; margin-bottom:4px;">VERIFICATION PROMPT TO TEST YOUR LLM:</span>
        "${guide.verificationPrompt}"
        <button class="copy-btn-inside" id="modalCopyPromptBtn">Copy Prompt</button>
      </div>
    `;

    document.getElementById('modalCopyPromptBtn').onclick = () => {
      copyToClipboard(guide.verificationPrompt, 'Verification prompt copied!');
    };
  }

  function closeModal() {
    downloadModal.style.display = 'none';
  }

  // Render Full Guide View
  function renderGuideView(guideKey) {
    const guide = LLM_GUIDES[guideKey];
    if (!guide) return;

    guideContentPanel.innerHTML = `
      <div class="guide-header-strip">
        <div class="guide-title-block">
          <h3>${guide.name}</h3>
          <p>${guide.tagline}</p>
        </div>
        <div class="guide-badge-box">
          <span class="guide-badge">${guide.badge}</span>
          <span class="guide-badge">Estimated Setup: ~1–2 mins</span>
        </div>
      </div>

      <div style="background:#FAF8F3; border:1px solid #E5DFD1; padding:12px 16px; border-radius:6px; margin-bottom:24px; font-size:13.5px;">
        <strong>📦 Required File:</strong> ${guide.fileToUse}
      </div>

      <div class="step-list">
        ${guide.steps.map((s, idx) => `
          <div class="step-item">
            <div class="step-num">${idx + 1}</div>
            <div class="step-text" style="flex:1;">
              <h4>${s.title}</h4>
              <p>${s.text}</p>
              ${s.code ? `
                <div class="code-box">
                  <code>${s.code}</code>
                  <button class="copy-btn-inside" onclick="navigator.clipboard.writeText('${s.code.replace(/\n/g, '\\n')}'); alert('Command copied!');">Copy</button>
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="verify-box">
        <h4>🎯 How to Verify It Worked:</h4>
        <p>After installing the skill, start a new chat session and copy/paste this verification prompt:</p>
        <div class="code-box" style="margin-top:6px; margin-bottom:10px;">
          <code>"${guide.verificationPrompt}"</code>
          <button class="copy-btn-inside" id="copyVerifyBtn">Copy Test Prompt</button>
        </div>
        <p><strong>Expected Output:</strong> ${guide.expectedResult}</p>
      </div>
    `;

    const copyBtn = document.getElementById('copyVerifyBtn');
    if (copyBtn) {
      copyBtn.onclick = () => {
        copyToClipboard(guide.verificationPrompt, 'Verification test prompt copied!');
      };
    }
  }

  // Render Assets Gallery & Init Upload Workbench
  function renderAssetsGallery() {
    const sampleSkill = manifest.skills[0];
    if (!sampleSkill || !sampleSkill.assets) return;

    assetsGalleryGrid.innerHTML = '';
    // Show only real image assets (exclude readme or partner logos)
    const validAssets = sampleSkill.assets.filter(a => a.category !== 'uploads' && !a.filename.endsWith('.md'));
    
    validAssets.forEach(asset => {
      const card = document.createElement('div');
      card.className = 'asset-card';
      const webPath = `assets/${asset.category}/${asset.filename}`;
      card.innerHTML = `
        <div class="asset-preview-frame">
          <img src="${webPath}" alt="${asset.filename}" onerror="this.src='assets/brand/lintas-group-logo.png'">
        </div>
        <div class="asset-card-info">
          <strong>${asset.filename}</strong>
          <span>Category: ${asset.category.toUpperCase()} | ${asset.size_kb} KB</span>
          <p>Pre-bundled directly in each skill's <code>assets/${asset.category}/</code> directory for native slide placement.</p>
        </div>
      `;
      assetsGalleryGrid.appendChild(card);
    });

    initUploadWorkbench();
  }

  // Init Upload Workbench
  function initUploadWorkbench() {
    const dropzone = document.getElementById('uploadDropzone');
    const fileInput = document.getElementById('clientAssetFileInput');
    const browseLink = document.getElementById('browseAssetLink');
    const stagedPreview = document.getElementById('stagedAssetPreview');

    if (!dropzone || !fileInput) return;

    browseLink.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput.click();
    });

    dropzone.addEventListener('click', () => {
      fileInput.click();
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleStagedFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleStagedFile(e.target.files[0]);
      }
    });

    function handleStagedFile(file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        const dataUrl = evt.target.result;
        const img = new Image();
        img.onload = function() {
          const w = img.width;
          const h = img.height;
          const isPng = file.type.includes('png');
          const isSvg = file.type.includes('svg');
          const isTransparent = isPng || isSvg;
          const sizeKb = (file.size / 1024).toFixed(1);

          const promptSnippet = `I have provided the client logo '${file.name}'. Place this logo on the Title slide (co-branded secondary header rail, max height 28pt) with balanced optical weight alongside the Lintas Group logo, and include it in the client SLA review slide.`;

          stagedPreview.style.display = 'flex';
          stagedPreview.innerHTML = `
            <div class="staged-preview-img-frame">
              <img src="${dataUrl}" alt="${file.name}">
            </div>
            <div class="staged-asset-meta">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong style="font-size:15px; color:#171A1D;">${file.name}</strong>
                <span class="modal-badge" style="background:${isTransparent ? '#294D45' : '#B79A61'};">
                  ${isTransparent ? '✓ Transparent Format' : '⚠ Non-transparent'}
                </span>
              </div>
              <span style="font-family:var(--font-mono); font-size:12px; color:#5A626A;">
                Resolution: ${w} × ${h} px | Size: ${sizeKb} KB | Type: ${file.type || 'image'}
              </span>
              <p style="font-size:13px; color:#374151; margin-top:2px;">
                Ready to attach in your bespoke LLM (Claude, ChatGPT, Gemini, or drop into <code>assets/uploads/</code>).
              </p>
              <div class="code-box" style="margin-top:6px;">
                <code>"${promptSnippet}"</code>
                <button class="copy-btn-inside" id="copyStagedPromptBtn">Copy Prompt for LLM</button>
              </div>
            </div>
          `;

          const copyBtn = document.getElementById('copyStagedPromptBtn');
          if (copyBtn) {
            copyBtn.onclick = () => {
              copyToClipboard(promptSnippet, 'Copied client asset prompt for LLM!');
            };
          }
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    }
  }

  // Toast & Clipboard Utility
  function copyToClipboard(text, message) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(message);
      });
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast(message);
    }
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 2800);
  }

  // Start app
  init();

})();
