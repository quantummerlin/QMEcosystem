#!/usr/bin/env python3
"""
K-POP TEEN LANGUAGE TRANSFORMER
Transforms all reading interpretations to authentic K-Pop teen language.
Uses pattern matching and comprehensive word/phrase replacement.
"""

import os
import re
from pathlib import Path

SKIP_FILES = {
    'life-path-calculator.html',  # Already transformed
    'zodiac-calculator.html',     # Already transformed
    'apply_kpop_branding.py',
    'apply_kpop_reading_language.py',
    'transform_to_kpop_language.py',
    'kpop.jpg',
    '.gitignore',
    'sw.js',
    'robots.txt',
    'sitemap.xml',
    'ads.txt',
    '_headers',
}

SKIP_EXTENSIONS = {'.py', '.ps1', '.md', '.json', '.js', '.css', '.xml', '.txt', '.jpg', '.png', '.svg'}

# === COMPREHENSIVE K-POP LANGUAGE REPLACEMENTS ===

# Phrases that should be transformed (order matters - longer phrases first)
PHRASE_REPLACEMENTS = [
    # Hooks and greetings
    (r"Your inner world", "Your inner vibe"),
    (r"At your core", "At your CORE bestie"),
    (r"At its highest expression", "At your PEAK power"),
    (r"When this energy is aligned", "When you're in your era"),
    (r"This energy works best when", "This energy SLAYS when"),
    (r"Under cosmic pressure", "When pressure hits"),
    (r"Under pressure", "Under pressure bestie"),
    (r"The glitch arises when", "The flop era happens when"),
    (r"The glitch:", "The flop moment:"),
    (r"In close connections", "In your close relationships"),
    (r"In everyday life", "In your daily life"),
    (r"To others", "To everyone watching"),
    (r"Others experience you as", "People see you as"),
    (r"Others may mistake", "Some people might think"),
    (r"People may see you as", "Some might think you're"),
    (r"As you mature", "As you level up"),
    (r"you come across as", "you give off"),
    
    # Mystical to casual
    (r"cosmic forces", "vibes"),
    (r"cosmic energy", "cosmic energy"),
    (r"universal love", "unconditional love"),
    (r"ancient wisdom", "legendary wisdom"),
    (r"profound", "SO deep"),
    (r"profoundly", "deeply"),
    (r"remarkable", "literally amazing"),
    (r"extraordinary", "INSANE"),
    (r"tremendous", "massive"),
    (r"immense", "huge"),
    (r"uncanny", "lowkey psychic"),
    (r"manifest", "manifest"),
    (r"manifestation", "manifestation"),
    
    # Formal to casual transitions
    (r"This is especially noticeable", "This is SO obvious"),
    (r"This shows up as", "This looks like"),
    (r"This may show up as", "This might look like"),
    (r"You may find yourself", "You might catch yourself"),
    (r"You will find", "You'll notice"),
    (r"Learn to", "Try to"),
    (r"Develop", "Work on"),
    (r"Cultivate", "Build up"),
    (r"Consider", "Think about"),
    (r"Recognize", "Notice when"),
    (r"Understand that", "Get that"),
    
    # Relationship language
    (r"partners must", "your person needs to"),
    (r"Partners must", "Your person needs to"),
    (r"Partners who", "People who"),
    (r"partners who", "people who"),
    (r"You need partners who", "You need someone who"),
    
    # Energy/spiritual rewrites
    (r"soul signal", "inner vibe"),
    (r"idol signal", "energy"),
    (r"cosmic signal", "vibe"),
    (r"frequency", "energy"),
    (r"Frequency", "Energy"),
    (r"the fabric of", "the whole vibe of"),
    (r"dimensional", "cosmic"),
    (r"Dimensional", "Cosmic"),
    (r"realm", "world"),
    (r"Realm", "World"),
    (r"timeline", "era"),
    (r"timelines", "eras"),
    (r"portal", "door"),
    (r"portals", "doors"),
]

# Single word casual replacements (applied after phrase replacements)
WORD_REPLACEMENTS = [
    (r"\bprofound\b", "deep"),
    (r"\bProfound\b", "Deep"),
    (r"\bgenuinely\b", "actually"),
    (r"\bGenuinely\b", "Actually"),
    (r"\bparticularly\b", "especially"),
    (r"\bParticularly\b", "Especially"),
    (r"\bsignificant\b", "major"),
    (r"\bSignificant\b", "Major"),
    (r"\bfundamental\b", "core"),
    (r"\bFundamental\b", "Core"),
    (r"\binstinctively\b", "naturally"),
    (r"\bInstinctively\b", "Naturally"),
    (r"\bintuitively\b", "naturally"),
    (r"\bIntuitively\b", "Naturally"),
    (r"\bcompletely\b", "totally"),
    (r"\bCompletely\b", "Totally"),
    (r"\babsolutely\b", "literally"),
    (r"\bAbsolutely\b", "Literally"),
    (r"\bincredibly\b", "SO"),
    (r"\bIncredibly\b", "SO"),
    (r"\bextremely\b", "super"),
    (r"\bExtremely\b", "Super"),
    (r"\bremarkably\b", "crazy"),
    (r"\bRemarkably\b", "Crazy"),
    (r"\bunusually\b", "weirdly"),
    (r"\bUnusually\b", "Weirdly"),
    (r"\bindeed\b", "for real"),
    (r"\bIndeed\b", "For real"),
    (r"\bperhaps\b", "maybe"),
    (r"\bPerhaps\b", "Maybe"),
    (r"\bhowever\b", "but like"),
    (r"\bHowever\b", "But like"),
    (r"\btherefore\b", "so"),
    (r"\bTherefore\b", "So"),
    (r"\bnevertheless\b", "still tho"),
    (r"\bNevertheless\b", "Still tho"),
    (r"\bfurthermore\b", "plus"),
    (r"\bFurthermore\b", "Plus"),
    (r"\bmoreover\b", "also"),
    (r"\bMoreover\b", "Also"),
    (r"\bconsequently\b", "so"),
    (r"\bConsequently\b", "So"),
]

# Emoji additions for section headers
HEADER_EMOJI_ADDITIONS = [
    (r"Your Core Signal", "🎤 Your Core Concept"),
    (r"Core Signal", "Core Concept 🎤"),
    (r"How Others Perceive You", "👀 What People See"),
    (r"External Perception", "What People See 👀"),
    (r"Behavioral Pattern", "Your Daily Vibe 🌀"),
    (r"Your Aligned Power", "When You're SLAYING 🔥"),
    (r"Strength Expression", "Your Slay Mode 🔥"),
    (r"The Idol Glitch", "😬 Flop Era Warning"),
    (r"Shadow Expression", "Flop Era Warning 😬"),
    (r"Integration Key", "The Secret Sauce 🔑"),
    (r"Stress Pattern", "Under Pressure Mode 😤"),
    (r"Common Misread", "When People Get You Wrong 🎭"),
    (r"Misinterpretation", "What They Get Wrong 🎭"),
    (r"In Close Connections", "💕 Your Ship Dynamics"),
    (r"Relationship Pattern", "Ship Dynamics 💕"),
    (r"Your Evolution Arc", "📈 Character Development Arc"),
    (r"Growth Arc", "Your Glow Up 📈"),
    (r"Highest Expression", "Peak Performance Mode 👑"),
    (r"Power Move", "Peak Mode 👑"),
    (r"Felt Sense", "Body Knows Best ✨"),
    (r"Somatic Cue", "Body Vibes ✨"),
    (r"Idol Reflection", "🪞 Real Talk Moment"),
    (r"Ask yourself:", "Real talk bestie:"),
    (r"Signal Enhancement", "🎵 Next Track Rec"),
    (r"Deep Idol Analysis", "🔓 Deep Dive Analysis 💜"),
]

def add_kpop_flavor_to_content(content):
    """Add K-Pop teen language flavor to reading content"""
    
    # Apply phrase replacements first
    for old, new in PHRASE_REPLACEMENTS:
        content = re.sub(old, new, content, flags=re.IGNORECASE if old[0].islower() else 0)
    
    # Apply word replacements
    for old, new in WORD_REPLACEMENTS:
        content = re.sub(old, new, content)
    
    # Apply header emoji additions
    for old, new in HEADER_EMOJI_ADDITIONS:
        content = content.replace(old, new)
    
    # Add emojis to common phrases
    content = add_strategic_emojis(content)
    
    return content

def add_strategic_emojis(content):
    """Add emojis strategically to key phrases"""
    
    emoji_additions = [
        # Add emojis after certain phrases in interpretations
        (r'(emotionally?\s+strong)', r'\1 💪'),
        (r'(genuine love)', r'\1 💜'),
        (r'(deeply care)', r'\1 💜'),
        (r'(loyalty)', r'loyalty 💜'),
        (r'(intuition)', r'intuition ✨'),
        (r'(creative)', r'creative 🎨'),
        (r'(powerful)', r'powerful 🔥'),
        (r'(healing)', r'healing 💫'),
        (r'(transform)', r'transform ✨'),
        (r'(wisdom)', r'wisdom 🧠'),
        (r'(courage)', r'courage 🔥'),
        (r'(confidence)', r'confidence 💪'),
    ]
    
    for pattern, replacement in emoji_additions:
        # Only add emoji if not already present nearby
        content = re.sub(pattern, replacement, content, count=2)  # Limit to prevent over-emoji-fication
    
    return content

def transform_hook_line(hook_text):
    """Transform a hook line to be more K-Pop teen style"""
    # Add "bestie" if not present
    if 'bestie' not in hook_text.lower():
        # Add after name variable or at start
        if '${preferredName}' in hook_text or '${name}' in hook_text:
            hook_text = hook_text.replace('${preferredName},', '${preferredName}!! 💜 Bestie,')
            hook_text = hook_text.replace('${name},', '${name}!! 💜 Bestie,')
        else:
            hook_text = 'Bestie!! ' + hook_text
    
    # Add excitement
    hook_text = hook_text.replace(' — ', ' — like ')
    
    return hook_text

def process_interpretation_block(match):
    """Process an interpretation object block"""
    content = match.group(0)
    
    # Apply transformations
    content = add_kpop_flavor_to_content(content)
    
    return content

def update_file(filepath):
    """Update a single HTML file with K-Pop language"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"❌ Error reading {filepath}: {e}")
        return False
    
    original = content
    
    # Check if this file has interpretations
    if 'interpretations' not in content and 'interpretation' not in content:
        # Still apply basic replacements to descriptions and UI text
        content = add_kpop_flavor_to_content(content)
    else:
        # Apply K-Pop transformations
        content = add_kpop_flavor_to_content(content)
    
    if content != original:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        except Exception as e:
            print(f"❌ Error writing {filepath}: {e}")
            return False
    
    return False

def main():
    """Process all HTML files in kpop directory"""
    kpop_dir = Path(__file__).parent
    
    processed = 0
    modified = 0
    skipped = 0
    
    print("💜 K-Pop Teen Language Transformer 💜")
    print("=" * 50)
    
    html_files = sorted(kpop_dir.glob('*.html'))
    
    for filepath in html_files:
        filename = filepath.name
        
        # Skip already processed files
        if filename in SKIP_FILES:
            skipped += 1
            print(f"⏭️  Skipped (already done): {filename}")
            continue
        
        # Skip non-HTML files
        if filepath.suffix.lower() in SKIP_EXTENSIONS:
            continue
        
        processed += 1
        
        if update_file(filepath):
            modified += 1
            print(f"✅ Transformed: {filename}")
        else:
            print(f"➖ No changes needed: {filename}")
    
    print("\n" + "=" * 50)
    print(f"💜 K-Pop Language Transformation Complete!")
    print(f"📁 Files processed: {processed}")
    print(f"✨ Files modified: {modified}")
    print(f"⏭️  Files skipped: {skipped}")
    print("\nNote: Life Path Calculator and Zodiac Calculator were")
    print("manually transformed with deeper K-Pop language.")
    print("Run this script again after any new tools are added!")

if __name__ == '__main__':
    main()
