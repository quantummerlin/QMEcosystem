"""
Phase 11: Inject /guides/ link into brand footers across the ecosystem.
Handles 4 footer patterns: legal-footer, results-footer, inline-footer, grid-footer.
"""
import os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ── Pattern 1: Legal-footer with | separators ──
# classic/index.html, classic/tools_index.html, kpop/index.html, kpop/tools_index.html
LEGAL_FOOTER_FILES = [
    "classic/index.html",
    "classic/tools_index.html",
    "kpop/index.html",
    "kpop/tools_index.html",
]

# ── Pattern 2: Results-footer with • separators (stranger only — soulblueprint already has Guides) ──
RESULTS_FOOTER_FILES = [
    "stranger/index.html",
]

# ── Pattern 3: Inline-styled footers (genesis, 40hz) ──
INLINE_FOOTER_FILES = [
    "genesis/index.html",
    "40hz/index.html",
]

# ── Pattern 4: Grid footers (contact-new already done via manual edit) ──
GRID_FOOTER_FILES = [
    "contact-new.html",
]

# ── Pattern 5: Kosmickpop nav-style footer ──
KOSMICK_FILES = [
    "kosmickpop/index.html",
]

stats = {"modified": 0, "skipped": 0, "errors": 0}

def inject_legal_footer(filepath):
    """Add Guides link before Terms in legal-footer pattern."""
    full = os.path.join(ROOT, filepath)
    if not os.path.exists(full):
        print(f"  SKIP (not found): {filepath}")
        stats["skipped"] += 1
        return
    with open(full, "r", encoding="utf-8") as f:
        content = f.read()
    if "/guides/" in content:
        print(f"  SKIP (already has guides): {filepath}")
        stats["skipped"] += 1
        return
    # Insert guides link before first link in legal-links
    pattern = r'(<div class="legal-links">\s*\n)'
    replacement = r'\1            <a href="/guides/">Guides</a>\n            <span class="separator">|</span>\n'
    new_content, count = re.subn(pattern, replacement, content)
    if count > 0:
        with open(full, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"  FIXED: {filepath} ({count} footer(s))")
        stats["modified"] += 1
    else:
        print(f"  SKIP (no match): {filepath}")
        stats["skipped"] += 1

def inject_results_footer(filepath):
    """Add Guides link in results-footer with • separator."""
    full = os.path.join(ROOT, filepath)
    if not os.path.exists(full):
        print(f"  SKIP (not found): {filepath}")
        stats["skipped"] += 1
        return
    with open(full, "r", encoding="utf-8") as f:
        content = f.read()
    if "/guides/" in content:
        print(f"  SKIP (already has guides): {filepath}")
        stats["skipped"] += 1
        return
    # Add before About link or before Privacy link in footer-links
    pattern = r'(<div class="footer-links">.*?)(</div>)'
    def add_guides(m):
        inner = m.group(1)
        close = m.group(2)
        # Add guides link at the beginning after the div tag
        return inner.rstrip() + '\n                    <a href="/guides/">Guides</a> •\n                ' + close
    new_content, count = re.subn(pattern, add_guides, content, flags=re.DOTALL)
    if count > 0:
        with open(full, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"  FIXED: {filepath}")
        stats["modified"] += 1
    else:
        print(f"  SKIP (no match): {filepath}")
        stats["skipped"] += 1

def inject_inline_footer(filepath):
    """Add Guides link in inline-styled footers (genesis, 40hz pattern)."""
    full = os.path.join(ROOT, filepath)
    if not os.path.exists(full):
        print(f"  SKIP (not found): {filepath}")
        stats["skipped"] += 1
        return
    with open(full, "r", encoding="utf-8") as f:
        content = f.read()
    if "/guides/" in content:
        print(f"  SKIP (already has guides): {filepath}")
        stats["skipped"] += 1
        return
    # Find the Terms of Service link in the footer and prepend Guides
    pattern = r'(<a\s+href="/classic/terms\.html")'
    replacement = '<a href="/guides/" style="color:inherit;text-decoration:none;margin:0 8px;">Guides</a> <span style="opacity:0.4;">|</span> \\1'
    new_content, count = re.subn(pattern, replacement, content, count=1)
    if count > 0:
        with open(full, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"  FIXED: {filepath}")
        stats["modified"] += 1
    else:
        print(f"  SKIP (no match): {filepath}")
        stats["skipped"] += 1

def inject_grid_footer(filepath):
    """Add Guides link to grid-style footer Explore section."""
    full = os.path.join(ROOT, filepath)
    if not os.path.exists(full):
        print(f"  SKIP (not found): {filepath}")
        stats["skipped"] += 1
        return
    with open(full, "r", encoding="utf-8") as f:
        content = f.read()
    if "/guides/" in content:
        print(f"  SKIP (already has guides): {filepath}")
        stats["skipped"] += 1
        return
    # Add Founder Guides as first item in Explore section
    pattern = r'(<h4>Explore</h4>\s*<ul>\s*\n)'
    replacement = r'\1                        <li><a href="/guides/">Founder Guides</a></li>\n'
    new_content, count = re.subn(pattern, replacement, content)
    if count > 0:
        with open(full, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"  FIXED: {filepath}")
        stats["modified"] += 1
    else:
        print(f"  SKIP (no match): {filepath}")
        stats["skipped"] += 1

def inject_kosmick_footer(filepath):
    """Add Guides link to kosmickpop nav-style footer."""
    full = os.path.join(ROOT, filepath)
    if not os.path.exists(full):
        print(f"  SKIP (not found): {filepath}")
        stats["skipped"] += 1
        return
    with open(full, "r", encoding="utf-8") as f:
        content = f.read()
    if "/guides/" in content:
        print(f"  SKIP (already has guides): {filepath}")
        stats["skipped"] += 1
        return
    # Add before the back-home link
    pattern = r'(<a href="/" class="back-home")'
    replacement = '<a href="/guides/" class="back-home" style="margin-bottom:8px;">📖 Founder Guides</a>\n        \\1'
    new_content, count = re.subn(pattern, replacement, content, count=1)
    if count > 0:
        with open(full, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"  FIXED: {filepath}")
        stats["modified"] += 1
    else:
        print(f"  SKIP (no match): {filepath}")
        stats["skipped"] += 1

if __name__ == "__main__":
    print("=== Injecting /guides/ links into brand footers ===\n")
    
    print("Pattern 1: Legal footers")
    for f in LEGAL_FOOTER_FILES:
        inject_legal_footer(f)
    
    print("\nPattern 2: Results footers")
    for f in RESULTS_FOOTER_FILES:
        inject_results_footer(f)
    
    print("\nPattern 3: Inline footers")
    for f in INLINE_FOOTER_FILES:
        inject_inline_footer(f)
    
    print("\nPattern 4: Grid footers")
    for f in GRID_FOOTER_FILES:
        inject_grid_footer(f)
    
    print("\nPattern 5: Kosmickpop footer")
    for f in KOSMICK_FILES:
        inject_kosmick_footer(f)
    
    print(f"\n=== Done: {stats['modified']} modified, {stats['skipped']} skipped, {stats['errors']} errors ===")
