"""
Fix Stranger tool pages: Generate unique og:title and og:description from <title> tags.

Replaces the generic "Discover your strange destiny with numerology, astrology,
and mystical calculators" description with tool-specific text derived from each
page's <title> tag.

Usage: python scripts/fix-stranger-meta.py
       python scripts/fix-stranger-meta.py --dry-run
"""

import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
STRANGER_DIR = ROOT / "stranger"

# The generic description we're replacing
GENERIC_DESC = "Discover your strange destiny with numerology, astrology, and mystical calculators"
GENERIC_OG_TITLE = "Stranger Patterns | The Upside Down Oracle"

# Tool-specific descriptions based on URL/title patterns
TOOL_DESCRIPTIONS = {
    "age-calculator": "Calculate your exact age in years, months, days, hours, and minutes. Discover cosmic age milestones and numerological insights.",
    "aura-color-test": "Discover your aura color through this mystical personality assessment. Reveal the energy field that surrounds you and what it means.",
    "birthday-countdown": "Count down to your next birthday with cosmic energy insights. See what numerological forces await your next personal year.",
    "birthday-number-reading": "Uncover the mystical meaning of your birthday number. Your birth day reveals hidden talents and personality traits.",
    "brain-type-test": "Discover your cosmic brain type through this mystical assessment. Are you an Architect, Mystic, Alchemist, or Oracle?",
    "challenge-numbers-reading": "Reveal your numerological challenge numbers and the life lessons they bring. Understand the obstacles meant to strengthen you.",
    "chinese-zodiac-calculator": "Calculate your Chinese zodiac animal, element, and yin/yang polarity. Includes lunar new year date verification.",
    "chinese-zodiac-reading": "Get a deep reading of your Chinese zodiac sign. Discover your animal archetype, elemental energy, and cosmic destiny.",
    "chiron-reading": "Explore your Chiron placement — the Wounded Healer in your birth chart. Understand your deepest wound and your greatest gift.",
    "color-personality-test": "Discover what your color preferences reveal about your personality. This mystical color assessment uncovers hidden traits.",
    "composite-chart-reading": "Analyze the composite chart between two people. Discover the unique energy and purpose of your relationship.",
    "cosmic-daily-forecast": "Get your personalized daily cosmic forecast combining numerology, astrology, and tarot for today's guidance.",
    "cosmic-monthly-forecast": "Your monthly cosmic forecast with numerology and astrology insights. Plan your month with celestial guidance.",
    "cosmic-weekly-forecast": "Your weekly cosmic forecast combining numerology, planetary transits, and tarot for the week ahead.",
    "cosmic-yearly-forecast": "Your yearly cosmic forecast with major themes, opportunities, and challenges for the year ahead.",
    "crystal-ball": "Ask the mystical crystal ball a question and receive cosmic guidance. An ancient divination tool reimagined.",
    "daily-forecast": "Your personalized daily forecast combining numerology personal day, moon phase, and cosmic energies.",
    "daily-fortune": "Receive your daily fortune from the cosmic oracle. A quick dose of mystical guidance for your day.",
    "decade-forecast": "See the major cosmic themes and numerological cycles spanning your entire decade ahead.",
    "descendant-reading": "Discover your Descendant sign — the zodiac energy that describes your ideal partnerships and relationships.",
    "destiny-number-calculator": "Calculate your Destiny Number from your full birth name. Reveals your life purpose and spiritual mission.",
    "dharma-number-reading": "Uncover your Dharma Number — the spiritual duty and higher purpose encoded in your numerology chart.",
    "expression-number-reading": "Calculate and interpret your Expression Number. Discover the natural talents and abilities you were born to develop.",
    "fortune-cookie": "Crack open a virtual fortune cookie for a mystical message. Quick cosmic wisdom for your moment.",
    "hidden-passion-number": "Reveal your Hidden Passion Number — the most frequently appearing digit in your name reveals your deepest drive.",
    "jupiter-sign-reading": "Explore your Jupiter sign placement. Discover where luck, expansion, and abundance flow in your life.",
    "karmic-debt-reading": "Discover if you carry Karmic Debt numbers (13, 14, 16, or 19) and what past-life lessons they bring.",
    "life-mission-reading": "Uncover your cosmic life mission through numerology. Discover the greater purpose your soul chose for this lifetime.",
    "life-path-calculator": "Calculate your Life Path Number — the most important number in numerology. Reveals your core purpose and destiny.",
    "life-path-simple": "Quick Life Path Number calculator. Enter your birthday for an instant numerology reading.",
    "life-progress": "See how far you've progressed through your current numerological cycles. Track your cosmic life timeline.",
    "lilith-reading": "Explore your Black Moon Lilith placement. Discover your shadow feminine energy and untamed primal power.",
    "love-compatibility-reading": "Test your love compatibility through numerology and astrology. See how your cosmic blueprints align.",
    "lucky-numbers": "Generate your personalized lucky numbers based on numerology. Use for lottery, decisions, or daily guidance.",
    "mars-sign-reading": "Discover your Mars sign — the planet of drive, ambition, and passionate energy in your birth chart.",
    "master-number-reading": "Explore the power of Master Numbers 11, 22, and 33. Discover if you carry these amplified spiritual vibrations.",
    "maturity-number-reading": "Calculate your Maturity Number — the energy that emerges in your life after age 45, revealing your true self.",
    "mercury-retrograde-checker": "Check if Mercury is currently retrograde and how it affects your communications, travel, and decisions.",
    "mercury-sign-reading": "Discover your Mercury sign — how you think, communicate, and process information according to your birth chart.",
    "midheaven-reading": "Explore your Midheaven (MC) — the zodiac sign at the top of your chart revealing your career path and public image.",
    "modality-reading": "Discover your astrological modality balance — Cardinal, Fixed, and Mutable energies in your birth chart.",
    "monthly-forecast": "Your personalized monthly cosmic forecast with numerology and planetary insights for the month ahead.",
    "moon-phase-calculator": "Calculate the moon phase for any date. See lunar illumination, zodiac position, and energetic influence.",
    "moon-sign-reading": "Discover your Moon sign — the zodiac sign governing your emotions, instincts, and inner world.",
    "name-number-calculator": "Calculate the numerological value of any name. Discover the vibrational energy encoded in names.",
    "neptune-sign-reading": "Explore your Neptune sign — the planet of dreams, intuition, and spiritual transcendence in your chart.",
    "north-node-reading": "Discover your North Node — the cosmic compass pointing toward your soul's evolutionary direction.",
    "part-of-fortune-reading": "Calculate your Part of Fortune — an ancient astrological point revealing where joy and prosperity flow.",
    "party-builder": "Build your cosmic party crew. Enter birth dates to see group dynamics, compatibility, and combined energy.",
    "personal-day-number": "Calculate your Personal Day Number for today. See the numerological energy influencing your daily decisions.",
    "personality-number-calculator": "Calculate your Personality Number — how others perceive you based on the consonants in your name.",
    "personal-month-reading": "Discover your Personal Month Number and what themes, challenges, and opportunities it brings this month.",
    "personal-year-reading": "Calculate your Personal Year Number for this year. Understand the major theme driving your life right now.",
    "pinnacle-numbers-reading": "Reveal your four Pinnacle Numbers — the major life phases and their spiritual themes across your lifetime.",
    "pluto-sign-reading": "Explore your Pluto sign — the planet of transformation, power, and rebirth in your generational chart.",
    "reading-result": "View your complete Stranger Patterns cosmic reading with full numerological and astrological analysis.",
    "relationship-karma-reading": "Uncover the karmic patterns in your relationship. Discover past-life connections and spiritual lessons together.",
    "relationship-life-path": "Compare Life Path Numbers to assess relationship compatibility. See how your numerological blueprints interact.",
    "rising-sign-reading": "Discover your Rising Sign (Ascendant) — the zodiac mask you wear and the first impression you make.",
    "saturn-sign-reading": "Explore your Saturn sign — the planet of discipline, karma, and life lessons in your birth chart.",
    "soul-contract-reading": "Decode your Soul Contract through numerology. Discover the agreements your soul made before this incarnation.",
    "soul-mate-analysis": "Analyze soul mate compatibility using numerology and astrology. Discover the cosmic bond between two souls.",
    "soul-urge-calculator": "Calculate your Soul Urge (Heart's Desire) Number. Uncover your deepest motivations and spiritual longings.",
    "south-node-reading": "Discover your South Node — past-life gifts, comfort zones, and karmic patterns you're evolving beyond.",
    "stellium-reading": "Explore stellium placements in your chart — three or more planets in one sign creating concentrated cosmic energy.",
    "synastry-reading": "Get a synastry reading comparing two birth charts. Discover the cosmic dynamics between any two people.",
    "uranus-sign-reading": "Explore your Uranus sign — the planet of innovation, rebellion, and sudden change in your chart.",
    "venus-mars-compatibility": "Compare Venus and Mars signs for romantic and sexual compatibility. Discover how you love and desire.",
    "venus-sign-reading": "Discover your Venus sign — the planet of love, beauty, and values in your birth chart.",
    "vocation-reading": "Discover your cosmic vocation through numerology and astrology. Find the career path aligned with your soul.",
    "void-of-course-moon": "Check if the Moon is void-of-course right now. Learn when to act and when to wait based on lunar energy.",
    "weekly-forecast": "Your personalized weekly cosmic forecast with numerology and planetary insights for the days ahead.",
    "yearly-forecast": "Your yearly cosmic forecast with major numerological themes and astrological transits for the year.",
    "yes-no-oracle": "Ask the cosmic oracle a yes-or-no question and receive mystical guidance powered by numerological energy.",
    "zodiac-calculator": "Calculate your complete zodiac profile — Sun, Moon, and Rising signs plus planetary positions.",
}

def extract_title(html_content: str) -> str:
    """Extract the <title> tag content."""
    match = re.search(r'<title[^>]*>(.*?)</title>', html_content, re.DOTALL)
    return match.group(1).strip() if match else ""

def get_tool_key(filename: str) -> str:
    """Convert filename to tool key."""
    return filename.replace('.html', '').replace('-new', '')

def generate_description(title: str, filename: str) -> str:
    """Generate a unique description from the title or lookup table."""
    key = get_tool_key(filename)
    if key in TOOL_DESCRIPTIONS:
        return TOOL_DESCRIPTIONS[key]
    # Fallback: derive from title
    clean_title = re.sub(r'\s*[\|–—]\s*Stranger Patterns.*$', '', title)
    clean_title = re.sub(r'\s*[\|–—]\s*The Upside Down Oracle.*$', '', clean_title)
    return f"{clean_title}. Free mystical reading powered by numerology and astrology at Stranger Patterns."

def fix_file(filepath: Path, dry_run: bool = False) -> dict:
    """Fix meta descriptions in a single file. Returns a status dict."""
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    original = content
    filename = filepath.name
    title = extract_title(content)
    description = generate_description(title, filename)
    
    changes = []
    
    # Fix og:description if generic
    if GENERIC_DESC in content:
        content = content.replace(
            f'content="{GENERIC_DESC}"',
            f'content="{description}"'
        )
        changes.append("og:description")
    
    # Fix meta description if generic
    if f'<meta name="description" content="{GENERIC_DESC}"' in content:
        content = content.replace(
            f'<meta name="description" content="{GENERIC_DESC}"',
            f'<meta name="description" content="{description}"'
        )
        changes.append("meta description")
    
    # Fix og:title if generic (use page title)
    if GENERIC_OG_TITLE in content:
        # Use the actual page title for og:title
        og_title = title if title else filename.replace('.html', '').replace('-', ' ').title()
        content = content.replace(
            f'content="{GENERIC_OG_TITLE}"',
            f'content="{og_title}"'
        )
        changes.append("og:title")
    
    if content != original and not dry_run:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
    
    return {
        'file': filename,
        'changes': changes,
        'description': description[:80] + '...' if len(description) > 80 else description,
    }

def main():
    dry_run = '--dry-run' in sys.argv
    
    if dry_run:
        print("=== DRY RUN — no files will be modified ===\n")
    
    html_files = sorted(STRANGER_DIR.glob('*.html'))
    
    # Skip non-tool pages
    skip = {'index.html', 'view.html', 'welcome-flow.html', 'reading-loading.html',
            'party-builder-members.html', 'party-builder-mission.html', 
            'party-builder-results.html', 'modality-result.html', 'stellium-result.html',
            'moon-sign-reading-new.html'}
    
    total = 0
    fixed = 0
    
    for filepath in html_files:
        if filepath.name in skip:
            continue
        if 'backup' in filepath.name or 'test-' in filepath.name:
            continue
        
        total += 1
        result = fix_file(filepath, dry_run)
        
        if result['changes']:
            fixed += 1
            print(f"  [FIXED] {result['file']}: {', '.join(result['changes'])}")
            if dry_run:
                print(f"          -> {result['description']}")
        elif '--verbose' in sys.argv:
            print(f"  [OK]    {result['file']}: already unique")
    
    print(f"\nScanned: {total} | Fixed: {fixed} | Already OK: {total - fixed}")

if __name__ == '__main__':
    main()
