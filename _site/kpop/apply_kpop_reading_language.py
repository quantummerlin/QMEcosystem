#!/usr/bin/env python3
"""
K-POP COSMOS READING LANGUAGE TRANSFORMATION
Updates reading language to be more K-Pop themed for 12-26 year olds
"""

import os
import re
from pathlib import Path

SKIP_FILES = {
    'apply_kpop_branding.py',
    'apply_kpop_reading_language.py',
    'kpop.jpg',
    '.gitignore',
    'sw.js',
    'robots.txt',
    'sitemap.xml',
    'ads.txt',
    '_headers',
}

SKIP_EXTENSIONS = {'.py', '.ps1', '.md', '.json', '.js', '.css'}

def update_reading_language(filepath):
    """Update reading language to K-Pop style"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return False
    
    original = content
    
    # ===== READING TITLE REPLACEMENTS =====
    
    # Life Path → Debut Destiny Path
    content = re.sub(r'Life Path Number', 'Debut Destiny Number', content)
    content = re.sub(r'Life Path Reading', 'Debut Destiny Reading', content)
    content = re.sub(r'Your Life Path', 'Your Debut Destiny', content)
    content = re.sub(r'life path number', 'debut destiny number', content)
    content = re.sub(r'Reveal My Life Path', '✨ Reveal My Debut Destiny', content)
    
    # Soul Urge → Inner Stan Energy
    content = re.sub(r'Soul Urge', 'Inner Stan Energy', content)
    content = re.sub(r'soul urge', 'inner stan energy', content)
    
    # Expression Number → Stage Name Energy
    content = re.sub(r'Expression Number', 'Stage Name Energy', content)
    content = re.sub(r'expression number', 'stage name energy', content)
    
    # Personality Number → Visual Energy
    content = re.sub(r'Personality Number', 'Visual Energy', content)
    content = re.sub(r'personality number', 'visual energy', content)
    
    # Destiny Number → Idol Destiny
    content = re.sub(r'Destiny Number', 'Idol Destiny Number', content)
    content = re.sub(r'destiny number', 'idol destiny number', content)
    
    # Master Number → Main Dancer/Main Vocal Energy
    content = re.sub(r'Master Number', 'Main Energy Number', content)
    content = re.sub(r'master number', 'main energy number', content)
    
    # Hidden Passion → Secret Bias Energy  
    content = re.sub(r'Hidden Passion', 'Secret Bias Energy', content)
    content = re.sub(r'hidden passion', 'secret bias energy', content)
    
    # Fortune Cookie → Daily Bias Message
    content = re.sub(r'Fortune Cookie', 'Daily Bias Message', content)
    content = re.sub(r'fortune cookie', 'daily bias message', content)
    
    # Crystal Ball → Magic Mirror Reading
    content = re.sub(r'Crystal Ball', 'Magic Mirror', content)
    content = re.sub(r'crystal ball', 'magic mirror', content)
    
    # ===== READING LANGUAGE STYLE =====
    
    # Formal mystical → Casual K-Pop style
    content = re.sub(r'Discover your soul\'s purpose', 'Discover your stan purpose bestie ✨', content)
    content = re.sub(r'spiritual journey', 'K-Pop journey', content)
    content = re.sub(r'Spiritual Journey', 'K-Pop Journey', content)
    content = re.sub(r'cosmic forces', 'cosmic vibes', content)
    content = re.sub(r'ancient wisdom', 'legendary wisdom', content)
    
    # ===== BUTTON TEXT =====
    content = re.sub(r'>Calculate<', '>✨ Calculate<', content)
    content = re.sub(r'>Reveal<', '>💜 Reveal<', content)
    content = re.sub(r'>Get Reading<', '>✨ Get My Reading<', content)
    content = re.sub(r'>Generate<', '>💫 Generate<', content)
    
    # ===== DIMENSIONAL/STRANGER LANGUAGE → K-POP =====
    content = re.sub(r'Dimensional Pioneer', 'Main Character Energy', content)
    content = re.sub(r'Dimensional Diplomat', 'Group Harmony Leader', content)
    content = re.sub(r'Dimensional Broadcaster', 'Center Stage Energy', content)
    content = re.sub(r'Dimensional Architect', 'Choreography Master', content)
    content = re.sub(r'Dimensional Frequency', 'Idol Frequency', content)
    content = re.sub(r'dimensional frequency', 'idol frequency', content)
    content = re.sub(r'Dimensional', 'Idol', content)
    content = re.sub(r'dimensional', 'idol', content)
    
    # Replace "the upside down" references
    content = re.sub(r'the starlight', 'the K-Pop universe', content, flags=re.IGNORECASE)
    content = re.sub(r'starlight', 'K-Pop universe', content)
    
    # ===== ENCOURAGING LANGUAGE FOR YOUNG AUDIENCE =====
    content = re.sub(r'Enter your birth date', 'Enter your birthday bestie 🎂', content)
    content = re.sub(r'Enter your name', 'What\'s your name? ✨', content)
    content = re.sub(r'Your Name', 'Your Name 💜', content)
    content = re.sub(r'Birth Date', 'Your Birthday 🎂', content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    """Process all HTML files"""
    kpop_dir = Path(__file__).parent
    
    processed = 0
    modified = 0
    
    for filepath in kpop_dir.glob('*.html'):
        filename = filepath.name
        
        if filename in SKIP_FILES:
            continue
        
        processed += 1
        if update_reading_language(filepath):
            modified += 1
            print(f"✅ Updated: {filename}")
        else:
            print(f"⏭️  No changes: {filename}")
    
    print(f"\n💜 K-Pop Reading Language Update Complete!")
    print(f"📁 Files processed: {processed}")
    print(f"✨ Files modified: {modified}")

if __name__ == '__main__':
    main()
