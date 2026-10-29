import os
import sys
import glob
import re
import json
import zipfile
import hashlib
import shutil

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKILLS_DIR = os.path.join(BASE_DIR, "Lintas_Group_16_Lintas_Deck_Skills")
PORTAL_DIR = os.path.join(BASE_DIR, "portal")
DIST_DIR = os.path.join(PORTAL_DIR, "dist")
DOWNLOADS_DIR = os.path.join(DIST_DIR, "downloads")
ASSETS_PREVIEW_DIR = os.path.join(DIST_DIR, "assets")

os.makedirs(DOWNLOADS_DIR, exist_ok=True)
os.makedirs(ASSETS_PREVIEW_DIR, exist_ok=True)

# Clean stale preview assets
if os.path.exists(ASSETS_PREVIEW_DIR):
    shutil.rmtree(ASSETS_PREVIEW_DIR)
os.makedirs(ASSETS_PREVIEW_DIR, exist_ok=True)

# 1. Load department roles
roles_file = os.path.join(PORTAL_DIR, "roles.json")
dept_roles = []
if os.path.exists(roles_file):
    with open(roles_file, "r", encoding="utf-8") as rf:
        dept_roles = json.load(rf)
    print(f"Loaded department roles for {len(dept_roles)} departments from roles.json")
else:
    print("Warning: roles.json not found")

# 2. Parse all 16 skills
skill_folders = sorted(glob.glob(os.path.join(SKILLS_DIR, "*")))
skills_data = []

def compute_sha256(filepath):
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()

print(f"Parsing skills from: {SKILLS_DIR}")

# Copy curated brand & texture assets to preview dir for live web display
sample_assets = os.path.join(skill_folders[0], "assets")
if os.path.exists(sample_assets):
    for sub in ["brand", "textures", "uploads"]:
        src_sub = os.path.join(sample_assets, sub)
        dst_sub = os.path.join(ASSETS_PREVIEW_DIR, sub)
        os.makedirs(dst_sub, exist_ok=True)
        if os.path.exists(src_sub):
            for item in os.listdir(src_sub):
                s_item = os.path.join(src_sub, item)
                d_item = os.path.join(dst_sub, item)
                if os.path.isfile(s_item):
                    shutil.copy2(s_item, d_item)
    print(f"Copied core visual assets to {ASSETS_PREVIEW_DIR} for web preview")

checksum_lines = []

for folder in skill_folders:
    if not os.path.isdir(folder):
        continue
    skill_id = os.path.basename(folder)
    skill_md_path = os.path.join(folder, "SKILL.md")
    if not os.path.exists(skill_md_path):
        print(f"Skipping {skill_id}: SKILL.md missing")
        continue

    with open(skill_md_path, "r", encoding="utf-8") as f:
        raw_content = f.read()

    # YAML metadata
    m_yaml = re.search(r"^---\s*\n(.*?)\n---", raw_content, re.DOTALL)
    yaml_txt = m_yaml.group(1) if m_yaml else ""
    name = re.search(r"name:\s*(.+)", yaml_txt).group(1).strip() if "name:" in yaml_txt else skill_id
    desc = re.search(r"description:\s*(.+)", yaml_txt).group(1).strip() if "description:" in yaml_txt else ""

    # H1 department & treatment
    m_h1 = re.search(r"^#\s*Lintas Deck\s*[\u2014\-]\s*(.+?)\s*/\s*(.+)", raw_content, re.MULTILINE)
    dept = m_h1.group(1).strip() if m_h1 else "Lintas Group"
    treatment = m_h1.group(2).strip() if m_h1 else "Standard"

    # Department visual identity
    m_id = re.search(r"## Department visual identity\s*[\u2014\-]\s*(.+)", raw_content)
    identity = m_id.group(1).strip() if m_id else ""

    # Personality
    m_person = re.search(r"Narrative personality:\s*(.+)", raw_content)
    personality = m_person.group(1).strip() if m_person else ""

    # Palettes
    m_pal = re.search(r"Primary:\s*(.+?)\s*#([0-9a-fA-F]{6})\.?\s*Accent:\s*(.+?)\s*#([0-9a-fA-F]{6})\.?\s*Secondary:\s*(.+?)\s*#([0-9a-fA-F]{6})", raw_content)
    palette = {}
    if m_pal:
        palette = {
            "primary": {"name": m_pal.group(1).strip(), "hex": f"#{m_pal.group(2)}"},
            "accent": {"name": m_pal.group(3).strip(), "hex": f"#{m_pal.group(4)}"},
            "secondary": {"name": m_pal.group(5).strip(), "hex": f"#{m_pal.group(6)}"}
        }

    # Department signature visualization
    m_sig = re.search(r"Departmental signature visualization:\s*(.+)", raw_content)
    signature = m_sig.group(1).strip() if m_sig else ""

    # Treatment art direction points
    m_art = re.search(r"## Treatment-specific art direction\s*\n(.*?)(?=\n##|\Z)", raw_content, re.DOTALL)
    art_direction = []
    if m_art:
        art_direction = [line.strip("- ").strip() for line in m_art.group(1).strip().split("\n") if line.strip().startswith("-")]

    # Sample invocation
    m_inv = re.search(r"## Example Claude invocation\s*\n(?:[“\"])(.+?)(?:[”\"])", raw_content, re.DOTALL)
    example_invocation = m_inv.group(1).strip() if m_inv else f"Use the {name} skill to create a professional presentation."

    # Assets inside this skill
    assets_dir = os.path.join(folder, "assets")
    asset_list = []
    if os.path.exists(assets_dir):
        for root, _, files in os.walk(assets_dir):
            for file in files:
                rel = os.path.relpath(os.path.join(root, file), folder).replace("\\", "/")
                cat = os.path.basename(root)
                fsize = os.path.getsize(os.path.join(root, file))
                asset_list.append({
                    "path": rel,
                    "filename": file,
                    "category": cat,
                    "size_bytes": fsize,
                    "size_kb": round(fsize / 1024, 1)
                })

    # 3. Create Packages in downloads/
    zip_pkg_name = f"{skill_id}.zip"
    zip_pkg_path = os.path.join(DOWNLOADS_DIR, zip_pkg_name)
    with zipfile.ZipFile(zip_pkg_path, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.write(skill_md_path, arcname=f"{skill_id}/SKILL.md")
        if os.path.exists(assets_dir):
            for root, _, files in os.walk(assets_dir):
                for file in files:
                    full_p = os.path.join(root, file)
                    rel_to_skill = os.path.relpath(full_p, folder)
                    zf.write(full_p, arcname=f"{skill_id}/{rel_to_skill}")
    sha_zip = compute_sha256(zip_pkg_path)
    size_zip = os.path.getsize(zip_pkg_path)

    md_pkg_name = f"{skill_id}.md"
    md_pkg_path = os.path.join(DOWNLOADS_DIR, md_pkg_name)
    shutil.copy2(skill_md_path, md_pkg_path)
    sha_md = compute_sha256(md_pkg_path)
    size_md = os.path.getsize(md_pkg_path)

    assets_zip_name = f"{skill_id}-assets.zip"
    assets_zip_path = os.path.join(DOWNLOADS_DIR, assets_zip_name)
    with zipfile.ZipFile(assets_zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        if os.path.exists(assets_dir):
            for root, _, files in os.walk(assets_dir):
                for file in files:
                    full_p = os.path.join(root, file)
                    rel_p = os.path.relpath(full_p, assets_dir)
                    zf.write(full_p, arcname=f"assets/{rel_p}")
    sha_assets_zip = compute_sha256(assets_zip_path)
    size_assets_zip = os.path.getsize(assets_zip_path)

    checksum_lines.append(f"{sha_zip}  downloads/{zip_pkg_name}  ({round(size_zip/1024, 1)} KB)")
    checksum_lines.append(f"{sha_md}  downloads/{md_pkg_name}  ({round(size_md/1024, 1)} KB)")
    checksum_lines.append(f"{sha_assets_zip}  downloads/{assets_zip_name}  ({round(size_assets_zip/1024, 1)} KB)")

    skills_data.append({
        "id": skill_id,
        "name": name,
        "department": dept,
        "treatment": treatment,
        "identity": identity,
        "personality": personality,
        "description": desc,
        "palette": palette,
        "signature": signature,
        "art_direction": art_direction,
        "example_invocation": example_invocation,
        "asset_count": len(asset_list),
        "assets": asset_list,
        "packages": {
            "zip": {
                "filename": zip_pkg_name,
                "url": f"downloads/{zip_pkg_name}",
                "size_kb": round(size_zip / 1024, 1),
                "sha256": sha_zip,
                "sha256_short": sha_zip[:8]
            },
            "md": {
                "filename": md_pkg_name,
                "url": f"downloads/{md_pkg_name}",
                "size_kb": round(size_md / 1024, 1),
                "sha256": sha_md,
                "sha256_short": sha_md[:8]
            },
            "assets_zip": {
                "filename": assets_zip_name,
                "url": f"downloads/{assets_zip_name}",
                "size_kb": round(size_assets_zip / 1024, 1),
                "sha256": sha_assets_zip,
                "sha256_short": sha_assets_zip[:8]
            }
        }
    })

# Write checksums.txt
checksums_file = os.path.join(DIST_DIR, "checksums.txt")
with open(checksums_file, "w", encoding="utf-8") as f:
    f.write("\n".join(checksum_lines) + "\n")

# Write skills-manifest.json
manifest_file = os.path.join(DIST_DIR, "skills-manifest.json")
with open(manifest_file, "w", encoding="utf-8") as f:
    json.dump({
        "generated_at": "2026-10-29",
        "total_skills": len(skills_data),
        "skills": skills_data,
        "roles": dept_roles
    }, f, indent=2)

# Write skills-data.js for standalone offline / file:// execution
data_js_file = os.path.join(DIST_DIR, "skills-data.js")
with open(data_js_file, "w", encoding="utf-8") as f:
    f.write("window.LINTAS_SKILLS_MANIFEST = " + json.dumps({
        "generated_at": "2026-10-29",
        "total_skills": len(skills_data),
        "skills": skills_data,
        "roles": dept_roles
    }, indent=2) + ";\n")

print(f"Build completed successfully! Total skills: {len(skills_data)}, Departments: {len(dept_roles)}")
