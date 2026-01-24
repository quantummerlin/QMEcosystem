#!/usr/bin/env python3
"""
K-POP COSMOS BRANDING TRANSFORMATION
Transforms Stranger Patterns into K-Pop Cosmos - a numerology/astrology app for K-pop stans
Target audience: 12-26 year olds in the K-pop fandom
Aesthetic: Pink, purple, cyan sparkles, hearts, stars, Y2K vibes
"""

import os
import re
from pathlib import Path

# Files to skip
SKIP_FILES = {
    'apply_kpop_branding.py',
    'kpop.jpg',
    '.gitignore',
    'sw.js',
    'robots.txt',
    'sitemap.xml',
    'ads.txt',
    '_headers',
}

SKIP_EXTENSIONS = {'.py', '.ps1', '.md', '.json'}

def rebrand_file(filepath):
    """Apply K-pop branding to a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return False
    
    original = content
    
    # ===== BRAND NAME REPLACEMENTS =====
    # Main brand names
    content = re.sub(r'Stranger Patterns', 'K-Pop Cosmos', content, flags=re.IGNORECASE)
    content = re.sub(r'StrangerPatterns', 'KPopCosmos', content)
    content = re.sub(r'stranger-patterns', 'kpop-cosmos', content)
    content = re.sub(r'stranger_patterns', 'kpop_cosmos', content)
    
    # Taglines
    content = re.sub(r'The Upside Down Oracle', 'Your Ultimate Bias Reading ✨', content, flags=re.IGNORECASE)
    content = re.sub(r'Upside Down Oracle', 'Bias Reading', content, flags=re.IGNORECASE)
    content = re.sub(r'upside down', 'starlight', content, flags=re.IGNORECASE)
    
    # Quantum Merlin references for this brand
    content = re.sub(r'Quantum Merlin', 'K-Pop Cosmos', content)
    
    # ===== URL REPLACEMENTS =====
    content = re.sub(r'/stranger/', '/kpop/', content)
    content = re.sub(r'quantummerlin\.com/stranger', 'quantummerlin.com/kpop', content)
    content = re.sub(r'href="stranger\.', 'href="kpop.', content)
    content = re.sub(r'src="stranger\.', 'src="kpop.', content)
    
    # ===== IMAGE REPLACEMENTS =====
    content = re.sub(r'stranger\.jpg', 'kpop.jpg', content)
    content = re.sub(r'stranger\.png', 'kpop.jpg', content)
    content = re.sub(r'RetroMerlin\.jpg', 'kpop.jpg', content)
    
    # ===== COLOR SCHEME - Stranger (red/orange) to K-Pop (pink/purple/cyan) =====
    
    # Primary colors
    content = re.sub(r'#FF4500', '#FF6B9D', content)  # Orange-red → Hot pink
    content = re.sub(r'#ff4500', '#ff6b9d', content)
    content = re.sub(r'#DC143C', '#A855F7', content)  # Crimson → Purple
    content = re.sub(r'#dc143c', '#a855f7', content)
    content = re.sub(r'#8B0000', '#7C3AED', content)  # Dark red → Violet
    content = re.sub(r'#8b0000', '#7c3aed', content)
    content = re.sub(r'#FF6B35', '#22D3EE', content)  # Orange → Cyan
    content = re.sub(r'#ff6b35', '#22d3ee', content)
    
    # Background colors
    content = re.sub(r'#0a0508', '#0D0015', content)  # Dark bg → Deep purple-black
    content = re.sub(r'rgba\(10,\s*5,\s*8', 'rgba(13, 0, 21', content)  # Same in rgba
    content = re.sub(r'rgba\(15,\s*5,\s*8', 'rgba(18, 5, 28', content)
    content = re.sub(r'rgba\(20,\s*8,\s*12', 'rgba(25, 10, 35', content)
    content = re.sub(r'rgba\(30,\s*20,\s*20', 'rgba(35, 15, 45', content)
    
    # Glow colors
    content = re.sub(r'rgba\(255,\s*69,\s*0', 'rgba(255, 107, 157', content)  # Orange glow → Pink
    content = re.sub(r'rgba\(220,\s*20,\s*60', 'rgba(168, 85, 247', content)  # Crimson → Purple
    content = re.sub(r'rgba\(139,\s*0,\s*0', 'rgba(124, 58, 237', content)    # Dark red → Violet
    content = re.sub(r'rgba\(255,\s*107,\s*53', 'rgba(34, 211, 238', content)  # Orange → Cyan
    
    # Card backgrounds
    content = re.sub(r'rgba\(20,\s*20,\s*30', 'rgba(30, 15, 45', content)
    content = re.sub(r'rgba\(10,\s*10,\s*15', 'rgba(20, 10, 30', content)
    
    # Text colors
    content = re.sub(r'#E8E4D9', '#F8E8FF', content)  # Parchment → Light pink-white
    content = re.sub(r'#e8e4d9', '#f8e8ff', content)
    content = re.sub(r'#C4A87C', '#E879F9', content)  # Amber → Fuchsia
    content = re.sub(r'#c4a87c', '#e879f9', content)
    content = re.sub(r'#D4C5B0', '#DDD6FE', content)  # Tan → Light purple
    content = re.sub(r'#d4c5b0', '#ddd6fe', content)
    content = re.sub(r'#8B7355', '#C084FC', content)  # Brown → Purple
    content = re.sub(r'#6B6B6B', '#A78BFA', content)  # Gray → Light violet
    
    # ===== LANGUAGE TRANSFORMATIONS - K-Pop Style =====
    
    # Mystical → K-Pop terminology
    content = re.sub(r'\bDestiny\b', 'Debut Destiny', content)
    content = re.sub(r'\bdestiny\b', 'debut destiny', content)
    content = re.sub(r'\bSoul Purpose\b', 'Stan Purpose', content)
    content = re.sub(r'\bsoul purpose\b', 'stan purpose', content)
    content = re.sub(r'\bCosmic Journey\b', 'K-Pop Journey', content)
    content = re.sub(r'\bcosmic journey\b', 'k-pop journey', content)
    content = re.sub(r'\bSpiritual Path\b', 'Stan Path', content)
    content = re.sub(r'\bspiritual path\b', 'stan path', content)
    
    # Mystical terms → K-Pop slang (careful replacements)
    content = re.sub(r'\bthe universe\b', 'the K-Pop universe', content, flags=re.IGNORECASE)
    content = re.sub(r'\bcosmic energy\b', 'idol energy', content, flags=re.IGNORECASE)
    content = re.sub(r'\bmystical\b', 'magical', content, flags=re.IGNORECASE)
    content = re.sub(r'\bsacred\b', 'iconic', content, flags=re.IGNORECASE)
    content = re.sub(r'\bcelestial\b', 'starlight', content, flags=re.IGNORECASE)
    content = re.sub(r'\bdivine\b', 'legendary', content, flags=re.IGNORECASE)
    content = re.sub(r'\bOracle\b', 'Reading', content)
    content = re.sub(r'\boracle\b', 'reading', content)
    
    # ===== DESCRIPTIONS & META =====
    
    # Meta descriptions
    content = re.sub(
        r'Discover the strange forces shaping your destiny with numerology, astrology, and mystical revelations',
        'Discover your idol destiny! ✨ K-Pop themed numerology & astrology readings for stans 💜',
        content
    )
    content = re.sub(
        r'strange forces that shape your reality',
        'cosmic vibes that shape your stan journey ✨',
        content
    )
    content = re.sub(
        r'hidden forces that shape your reality',
        'what makes you the ultimate stan 💜',
        content
    )
    
    # Footer text
    content = re.sub(
        r'For entertainment purposes only',
        'Made with 💜 for stans everywhere ✨',
        content
    )
    
    # ===== EMOJIS & FLAIR =====
    # Add K-pop style emojis where appropriate
    content = re.sub(r'✧ Reveal', '💜 Reveal', content)
    content = re.sub(r'🔮', '💫', content)  # Crystal ball → Sparkle
    content = re.sub(r'⚡', '⭐', content)   # Lightning → Star
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    """Process all HTML and CSS files in the kpop folder"""
    kpop_dir = Path(__file__).parent
    
    processed = 0
    modified = 0
    
    for filepath in kpop_dir.glob('*'):
        if filepath.is_file():
            filename = filepath.name
            
            # Skip certain files
            if filename in SKIP_FILES:
                continue
            if filepath.suffix in SKIP_EXTENSIONS:
                continue
            
            # Only process HTML and CSS files
            if filepath.suffix in {'.html', '.css'}:
                processed += 1
                if rebrand_file(filepath):
                    modified += 1
                    print(f"✅ Rebranded: {filename}")
                else:
                    print(f"⏭️  No changes: {filename}")
    
    print(f"\n🎀 K-Pop Cosmos Branding Complete!")
    print(f"📁 Files processed: {processed}")
    print(f"✨ Files modified: {modified}")

if __name__ == '__main__':
    main()
