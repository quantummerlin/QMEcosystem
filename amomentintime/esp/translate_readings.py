#!/usr/bin/env python3
"""
Robust Spanish translator for JS reading files.
Reads English source from parent dir, writes Spanish to esp dir.
Uses Google Translate API (POST) with placeholder protection.
Run: python translate_readings.py [optional_filename_fragment]
"""

import os, sys, re, time, json, urllib.request, urllib.parse

DELAY = 0.5  # seconds between API calls
MAX_CHUNK = 4500  # max chars per API call
TOTAL_API_CALLS = [0]
START_TIME = [0]

def translate_api(text, retries=5):
    """Call Google Translate free API using POST for longer text support."""
    if not text or len(text.strip()) < 2:
        return text
    
    for attempt in range(retries):
        try:
            data = urllib.parse.urlencode({
                'client': 'gtx', 'sl': 'en', 'tl': 'es', 'dt': 't',
                'q': text
            }).encode('utf-8')
            
            req = urllib.request.Request(
                'https://translate.googleapis.com/translate_a/single',
                data=data,
                headers={
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            )
            
            with urllib.request.urlopen(req, timeout=30) as resp:
                result = json.loads(resp.read().decode('utf-8'))
            
            translated = ''
            if result and result[0]:
                for item in result[0]:
                    if item and item[0]:
                        translated += item[0]
            
            TOTAL_API_CALLS[0] += 1
            return translated if translated else text
            
        except Exception as e:
            if attempt < retries - 1:
                if '429' in str(e):
                    wait = 15 * (attempt + 1)  # 15s, 30s for rate limits
                else:
                    wait = 3 * (attempt + 1)
                print(f"    Retry {attempt+1} ({e}), waiting {wait}s...")
                time.sleep(wait)
            else:
                print(f"    FAILED after {retries} attempts: {e}")
                return text


def protect_placeholders(text):
    """Replace ${...} with safe tokens that won't be translated."""
    phs = {}
    counter = [0]
    def replacer(m):
        key = f"XQZX{counter[0]}XQZX"
        phs[key] = m.group(0)
        counter[0] += 1
        return key
    protected = re.sub(r'\$\{[^}]+\}', replacer, text)
    return protected, phs


def restore_placeholders(text, phs):
    """Restore ${...} placeholders, handling translator mangling."""
    for key, val in phs.items():
        # Direct replacement
        text = text.replace(key, val)
        # Handle if translator added spaces around it
        text = text.replace(key.replace('X', ' X').strip(), val)
        # Handle lowercase mangling
        text = text.replace(key.lower(), val)
    return text


def translate_chunk(text):
    """Translate a chunk of text, preserving ${} placeholders."""
    protected, phs = protect_placeholders(text)
    translated = translate_api(protected)
    restored = restore_placeholders(translated, phs)
    time.sleep(DELAY)
    return restored


def translate_long_text(text):
    """Translate text that may be longer than MAX_CHUNK by splitting on paragraphs."""
    if len(text) <= MAX_CHUNK:
        return translate_chunk(text)
    
    # Split on double newlines (paragraphs)
    paragraphs = text.split('\n\n')
    translated_parts = []
    
    for para in paragraphs:
        if para.strip() and len(para.strip()) > 3:
            if len(para) <= MAX_CHUNK:
                translated_parts.append(translate_chunk(para))
            else:
                # Split further on single newlines
                lines = para.split('\n')
                chunk = ''
                translated_lines = []
                for line in lines:
                    if len(chunk) + len(line) + 1 > MAX_CHUNK:
                        if chunk:
                            translated_lines.append(translate_chunk(chunk))
                        chunk = line
                    else:
                        chunk = chunk + '\n' + line if chunk else line
                if chunk:
                    translated_lines.append(translate_chunk(chunk))
                translated_parts.append('\n'.join(translated_lines))
        else:
            translated_parts.append(para)
    
    return '\n\n'.join(translated_parts)


def process_file(source_path, target_path):
    """Read source JS file, translate all English content, write to target."""
    filename = os.path.basename(source_path)
    print(f"\n{'='*60}")
    print(f"TRANSLATING: {filename} ({os.path.getsize(source_path)//1024}KB)")
    print(f"{'='*60}")
    
    with open(source_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    count = [0]
    
    def progress():
        count[0] += 1
        if count[0] % 25 == 0:
            elapsed = time.time() - START_TIME[0]
            print(f"  [{count[0]} strings | {elapsed:.0f}s elapsed | {TOTAL_API_CALLS[0]} API calls]")
    
    # ── PHASE 1: Translate property value strings ──
    # Matches: key: "value" and key: 'value'
    print("  Phase 1: Property value strings...")
    
    def translate_prop_value(match):
        key = match.group(1)
        quote = match.group(2)
        value = match.group(3)
        
        # Skip technical keys that shouldn't be translated
        skip_keys = {
            'icon', 'color', 'theme', 'id', 'class', 'type', 'element',
            'category', 'sign', 'house', 'planet', 'aspect', 'image',
            'url', 'path', 'file', 'src', 'href', 'key', 'var',
            'const', 'let', 'function', 'return', 'style', 'font',
            'background', 'border', 'width', 'height', 'display',
            'position', 'margin', 'padding'
        }
        if key.lower() in skip_keys:
            return match.group(0)
        
        # Skip code-like values
        if re.match(r'^[A-Z_]{2,}$', value):  # ALL_CAPS
            return match.group(0)
        if re.match(r'^[a-z]+[A-Z]', value):  # camelCase
            return match.group(0)
        if re.match(r'^#[0-9a-fA-F]+$', value):  # hex colors
            return match.group(0)
        if re.match(r'^[\d.]+(%|px|em|rem|vh|vw)?$', value):  # numbers/units
            return match.group(0)
        if len(value.strip()) < 3:
            return match.group(0)
        
        translated = translate_chunk(value)
        progress()
        return f'{key}: {quote}{translated}{quote}'
    
    content = re.sub(r'(\w+):\s*(["\'])(.+?)\2', translate_prop_value, content)
    
    # ── PHASE 1b: Translate values in 'quoted_key': 'value' patterns ──
    # For zodiac lookup objects like: 'Aries': 'bold initiators...'
    print("  Phase 1b: Quoted-key object values...")
    phase1b_start = count[0]
    
    def translate_quoted_key_value(match):
        key = match.group(1)
        value = match.group(2)
        
        # Skip short values or code-like values
        if len(value.strip()) < 5:
            return match.group(0)
        if not ' ' in value:  # No spaces = likely code identifier
            return match.group(0)
        
        translated = translate_chunk(value)
        progress()
        return f"'{key}': '{translated}'"
    
    content = re.sub(r"'([^']+)':\s*'([^']{5,})'", translate_quoted_key_value, content)
    print(f"  Phase 1b done. ({count[0] - phase1b_start} new strings)")
    print(f"  Phase 1 total: ({count[0]} strings so far)")
    
    # ── PHASE 2: Translate strings inside arrays ──
    # Matches arrays containing quoted strings: ["str1", "str2", ...]
    print("  Phase 2: Array element strings...")
    phase2_start = count[0]
    
    def translate_array_element(match):
        value = match.group(1)
        if len(value.strip()) < 3:
            return match.group(0)
        if re.match(r'^[A-Z_]{2,}$', value):
            return match.group(0)
        if re.match(r'^[a-z]+[A-Z]', value):
            return match.group(0)
        translated = translate_chunk(value)
        progress()
        return f'"{translated}"'
    
    def translate_array_block(match):
        arr = match.group(0)
        return re.sub(r'"([^"]{3,})"', translate_array_element, arr)
    
    content = re.sub(r'\[[^\]]*"[^\]]*\]', translate_array_block, content)
    print(f"  Phase 2 done. ({count[0] - phase2_start} new strings)")
    
    # ── PHASE 3: Translate template literals ──
    # Matches: key: `content with possible ${placeholders}`
    print("  Phase 3: Template literals...")
    phase3_start = count[0]
    
    def translate_template_literal(match):
        key = match.group(1)
        value = match.group(2)
        
        skip = {'icon', 'color', 'theme', 'id', 'class', 'type', 'element', 'style'}
        if key.lower() in skip:
            return match.group(0)
        
        if len(value.strip()) < 5:
            return match.group(0)
        
        translated = translate_long_text(value)
        progress()
        return key + ': `' + translated + '`'
    
    content = re.sub(
        r'(\w+):\s*`((?:[^`\\]|\\.)*)`',
        translate_template_literal,
        content,
        flags=re.DOTALL
    )
    print(f"  Phase 3 done. ({count[0] - phase3_start} new strings)")
    
    # ── PHASE 3b: Translate template literals assigned with = ──
    # Matches: variable = `template content`
    print("  Phase 3b: Assignment template literals...")
    phase3b_start = count[0]
    
    def translate_assign_template(match):
        varname = match.group(1)
        value = match.group(2)
        
        if len(value.strip()) < 5:
            return match.group(0)
        
        translated = translate_long_text(value)
        progress()
        return varname + ' = `' + translated + '`'
    
    content = re.sub(
        r'(\w+)\s*=\s*`((?:[^`\\]|\\.)*)`',
        translate_assign_template,
        content,
        flags=re.DOTALL
    )
    print(f"  Phase 3b done. ({count[0] - phase3b_start} new strings)")
    
    # Write output
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  ✓ SAVED: {target_path}")
    print(f"  Total strings translated: {count[0]}")
    return count[0]


def main():
    START_TIME[0] = time.time()
    
    esp_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(esp_dir)
    
    # All reading content files, smallest to largest
    all_files = [
        'love-blueprint.js',
        'aspect-readings.js',
        'deep-house-readings.js',
        'deep-planet-readings-outer.js',
        'deep-lilith-readings.js',
        'deep-chiron-readings.js',
        'deep-chinese-zodiac-readings.js',
        'deep-planet-readings.js',
        'deep-readings.js',
        'deep-node-readings.js',
        'advanced-readings.js',
        'deep-numerology-readings.js',
        'house-readings.js',
        'deep-transformative-planet-readings.js',
        'readings.js',
        'readings-extended.js',
    ]
    
    # Filter by command line argument if provided
    if len(sys.argv) > 1:
        fragment = sys.argv[1]
        all_files = [f for f in all_files if fragment in f]
        if not all_files:
            print(f"No file matching '{fragment}' found in list.")
            sys.exit(1)
    
    print(f"Files to translate: {len(all_files)}")
    print(f"Reading source from: {parent_dir}")
    print(f"Writing output to:   {esp_dir}")
    
    total_strings = 0
    completed = []
    
    for i, filename in enumerate(all_files, 1):
        source = os.path.join(parent_dir, filename)
        target = os.path.join(esp_dir, filename)
        
        if not os.path.exists(source):
            print(f"\nSKIP: {filename} not found in parent dir")
            continue
        
        print(f"\n[{i}/{len(all_files)}]", end='')
        
        try:
            n = process_file(source, target)
            total_strings += n
            completed.append(filename)
        except Exception as e:
            print(f"\n  ERROR processing {filename}: {e}")
            import traceback
            traceback.print_exc()
    
    elapsed = time.time() - START_TIME[0]
    print(f"\n{'='*60}")
    print(f"ALL DONE!")
    print(f"Files completed: {len(completed)}/{len(all_files)}")
    print(f"Total strings: {total_strings}")
    print(f"Total API calls: {TOTAL_API_CALLS[0]}")
    print(f"Total time: {elapsed:.0f}s ({elapsed/60:.1f} min)")
    print(f"{'='*60}")


if __name__ == '__main__':
    main()
