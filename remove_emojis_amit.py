"""
Remove all emojis from amomentintime files.
Handles: index.html, all root .js files
Preserves file encoding (UTF-8).
"""
import re
import os
import glob

AMIT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'amomentintime')

# Comprehensive emoji regex pattern
EMOJI_PATTERN = re.compile(
    '['
    '\U0001F300-\U0001F9FF'   # Misc Symbols, Emoticons, Supplemental
    '\U0001FA00-\U0001FA6F'   # Chess symbols
    '\U0001FA70-\U0001FAFF'   # Symbols Extended-A
    '\U00002600-\U000027BF'   # Misc symbols, Dingbats
    '\U0000FE00-\U0000FE0F'   # Variation Selectors
    '\U0000200D'              # Zero Width Joiner
    '\U00002702-\U000027B0'   # Dingbats
    '\U0001F1E0-\U0001F1FF'   # Flags
    '\U00002B50'              # Star
    '\U00002764'              # Heart
    '\U00002728'              # Sparkles
    '\U000026A0'              # Warning
    '\U00002705'              # Check mark
    '\U0000274C'              # Cross mark
    '\U0000274E'              # Cross mark
    '\U00002B06'              # Up arrow
    '\U00002B07'              # Down arrow
    '\U00002B05'              # Left arrow
    '\U000027A1'              # Right arrow
    '\U00002934'              # Arrow
    '\U00002935'              # Arrow
    '\U000025AA-\U000025AB'   # Squares
    '\U000025B6'              # Play
    '\U000025C0'              # Reverse
    '\U0000231A-\U0000231B'   # Watch, Hourglass
    '\U000023E9-\U000023F3'   # Various
    '\U000023F8-\U000023FA'   # Various
    '\U000025FB-\U000025FE'   # Squares
    '\U00002614-\U00002615'   # Umbrella, Hot beverage
    '\U00002648-\U00002653'   # Zodiac signs
    '\U0000267F'              # Wheelchair
    '\U00002693'              # Anchor
    '\U000026A1'              # High voltage
    '\U000026AA-\U000026AB'   # Circles
    '\U000026BD-\U000026BE'   # Sports
    '\U000026C4-\U000026C5'   # Weather
    '\U000026CE'              # Ophiuchus
    '\U000026D4'              # No entry
    '\U000026EA'              # Church
    '\U000026F2-\U000026F3'   # Fountain, Golf
    '\U000026F5'              # Sailboat
    '\U000026FA'              # Tent
    '\U000026FD'              # Fuel pump
    '\U00002702'              # Scissors
    '\U00002708'              # Airplane
    '\U0000270A-\U0000270D'   # Fists, Writing hand
    '\U0000270F'              # Pencil
    '\U00002712'              # Black nib
    '\U00002714'              # Check mark
    '\U00002716'              # X mark
    '\U0000271D'              # Latin cross
    '\U00002721'              # Star of David
    '\U00002733-\U00002734'   # Sparkle
    '\U00002744'              # Snowflake
    '\U00002747'              # Sparkle
    '\U00002753-\U00002755'   # Question marks
    '\U00002757'              # Exclamation
    '\U00002763'              # Heart exclamation
    '\U0000203C'              # Double exclamation
    '\U00002049'              # Exclamation question
    '\U000000A9'              # Copyright (skip this one actually)
    '\U000000AE'              # Registered (skip this one)
    '\U00002122'              # TM
    ']+', re.UNICODE
)

# Don't strip copyright/registered/TM - those are legitimate
# Refined pattern that skips those
EMOJI_PATTERN = re.compile(
    '['
    '\U0001F300-\U0001F9FF'
    '\U0001FA00-\U0001FA6F'
    '\U0001FA70-\U0001FAFF'
    '\U00002600-\U000027BF'
    '\U0000FE00-\U0000FE0F'
    '\U0000200D'
    '\U0001F1E0-\U0001F1FF'
    '\U00002B50'
    '\U00002764'
    '\U00002728'
    '\U000026A0'
    '\U00002705'
    '\U0000274C'
    '\U0000274E'
    '\U00002B06'
    '\U00002B07'
    '\U00002B05'
    '\U000027A1'
    '\U00002934'
    '\U00002935'
    '\U000025AA-\U000025AB'
    '\U000025B6'
    '\U000025C0'
    '\U0000231A-\U0000231B'
    '\U000023E9-\U000023F3'
    '\U000023F8-\U000023FA'
    '\U000025FB-\U000025FE'
    '\U00002614-\U00002615'
    '\U00002648-\U00002653'
    '\U0000267F'
    '\U00002693'
    '\U000026A1'
    '\U000026AA-\U000026AB'
    '\U000026BD-\U000026BE'
    '\U000026C4-\U000026C5'
    '\U000026CE'
    '\U000026D4'
    '\U000026EA'
    '\U000026F2-\U000026F3'
    '\U000026F5'
    '\U000026FA'
    '\U000026FD'
    '\U00002702'
    '\U00002708'
    '\U0000270A-\U0000270D'
    '\U0000270F'
    '\U00002712'
    '\U00002714'
    '\U00002716'
    '\U0000271D'
    '\U00002721'
    '\U00002733-\U00002734'
    '\U00002744'
    '\U00002747'
    '\U00002753-\U00002755'
    '\U00002757'
    '\U00002763'
    '\U0000203C'
    '\U00002049'
    ']+', re.UNICODE
)

def clean_emojis(text):
    """Remove emojis and clean up resulting double spaces."""
    cleaned = EMOJI_PATTERN.sub('', text)
    # Clean up double/triple spaces left behind
    cleaned = re.sub(r'  +', ' ', cleaned)
    # Clean up space before punctuation
    cleaned = re.sub(r' ([,.:;!?])', r'\1', cleaned)
    # Clean up empty quotes left behind like "" or ''
    # Don't clean these - they might be intentional empty strings in code
    return cleaned

def process_file(filepath):
    """Process a single file, return (original_emoji_count, new_emoji_count)."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except (UnicodeDecodeError, FileNotFoundError):
        return 0, 0
    
    original_matches = EMOJI_PATTERN.findall(content)
    original_count = sum(len(m) for m in original_matches)
    
    if original_count == 0:
        return 0, 0
    
    cleaned = clean_emojis(content)
    
    # Verify
    remaining = EMOJI_PATTERN.findall(cleaned)
    remaining_count = sum(len(m) for m in remaining)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(cleaned)
    
    return original_count, remaining_count

def main():
    # Process root JS files
    js_files = glob.glob(os.path.join(AMIT_DIR, '*.js'))
    html_files = glob.glob(os.path.join(AMIT_DIR, '*.html'))
    
    # Also process pt/ subfolder JS files
    pt_files = glob.glob(os.path.join(AMIT_DIR, 'pt', '*.js'))
    
    # Also process forecasts/
    forecast_files = glob.glob(os.path.join(AMIT_DIR, 'forecasts', '*.js'))
    
    all_files = js_files + html_files + pt_files + forecast_files
    
    total_removed = 0
    total_remaining = 0
    
    for filepath in sorted(all_files):
        fname = os.path.relpath(filepath, AMIT_DIR)
        original, remaining = process_file(filepath)
        if original > 0:
            removed = original - remaining
            total_removed += removed
            total_remaining += remaining
            print(f"  {fname}: {original} emojis found, {removed} removed, {remaining} remaining")
    
    print(f"\nTotal: {total_removed} emojis removed, {total_remaining} remaining")

if __name__ == '__main__':
    main()
