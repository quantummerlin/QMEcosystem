#!/usr/bin/env python3
"""
Translate JS reading files from English to Spanish.
Uses deep-translator library (Google Translate backend).
Reads English source from parent dir, writes to esp dir.

Usage:
  python translate_v2.py                    # Translate all files
  python translate_v2.py readings           # Translate just readings.js
  python translate_v2.py deep-planet        # Translate matching files
"""

import os, sys, re, time

from deep_translator import GoogleTranslator

DELAY = 1.0  # seconds between API calls (conservative to avoid 429)
CHAR_LIMIT = 4900  # deep-translator limit is ~5000 chars
TOTAL_CALLS = [0]
START = [0]
COOLDOWN_EVERY = 40  # pause every N calls
COOLDOWN_SECS = 20   # seconds to pause

translator = GoogleTranslator(source='en', target='es')


def translate_text(text, retries=4):
    """Translate text via deep-translator, with retries."""
    if not text or len(text.strip()) < 3:
        return text
    
    # Automatic cooldown
    if TOTAL_CALLS[0] > 0 and TOTAL_CALLS[0] % COOLDOWN_EVERY == 0:
        print(f"    [cooldown {COOLDOWN_SECS}s after {TOTAL_CALLS[0]} calls]")
        time.sleep(COOLDOWN_SECS)
    
    for attempt in range(retries):
        try:
            result = translator.translate(text)
            TOTAL_CALLS[0] += 1
            return result if result else text
        except Exception as e:
            err = str(e)
            if attempt < retries - 1:
                if '429' in err or 'Too Many' in err:
                    wait = 30 * (attempt + 1)
                    print(f"    Rate limited! Waiting {wait}s (attempt {attempt+1})")
                else:
                    wait = 5 * (attempt + 1)
                    print(f"    Retry {attempt+1}: {e}, wait {wait}s")
                time.sleep(wait)
            else:
                # Fallback to MyMemory API
                try:
                    import requests as req
                    r = req.get(
                        'https://api.mymemory.translated.net/get',
                        params={'q': text[:500], 'langpair': 'en|es'},
                        timeout=15
                    )
                    data = r.json()
                    if data.get('responseData', {}).get('translatedText'):
                        TOTAL_CALLS[0] += 1
                        return data['responseData']['translatedText']
                except:
                    pass
                print(f"    FAILED: {e} => keeping original")
                return text


def protect_placeholders(text):
    """Replace ${...} with safe tokens."""
    phs = {}
    counter = [0]
    def repl(m):
        key = f"XQZX{counter[0]}XQZX"
        phs[key] = m.group(0)
        counter[0] += 1
        return key
    return re.sub(r'\$\{[^}]+\}', repl, text), phs


def restore_placeholders(text, phs):
    """Restore ${...} placeholders."""
    for key, val in phs.items():
        text = text.replace(key, val)
        text = text.replace(key.lower(), val)
        # Handle spaces added by translator
        spaced = key.replace('XQZX', ' XQZX ').strip()
        text = text.replace(spaced, val)
    return text


def translate_chunk(text):
    """Translate a chunk preserving ${} placeholders."""
    if not text or len(text.strip()) < 3:
        return text
    protected, phs = protect_placeholders(text)
    translated = translate_text(protected)
    result = restore_placeholders(translated, phs)
    time.sleep(DELAY)
    return result


def translate_long_text(text):
    """Translate text longer than CHAR_LIMIT by splitting on paragraphs."""
    if len(text) <= CHAR_LIMIT:
        return translate_chunk(text)
    
    # Split on double newlines
    paragraphs = text.split('\n\n')
    results = []
    
    for para in paragraphs:
        if para.strip() and len(para.strip()) > 3:
            if len(para) <= CHAR_LIMIT:
                results.append(translate_chunk(para))
            else:
                # Split further on sentences (period + space)
                sentences = re.split(r'(?<=\.)\s+', para)
                chunk = ''
                translated_chunks = []
                for sent in sentences:
                    if len(chunk) + len(sent) + 1 > CHAR_LIMIT:
                        if chunk:
                            translated_chunks.append(translate_chunk(chunk))
                        chunk = sent
                    else:
                        chunk = (chunk + ' ' + sent).strip() if chunk else sent
                if chunk:
                    translated_chunks.append(translate_chunk(chunk))
                results.append(' '.join(translated_chunks))
        else:
            results.append(para)
    
    return '\n\n'.join(results)


def process_file(source_path, target_path):
    """Read source JS, translate all English strings, write to target."""
    fname = os.path.basename(source_path)
    fsize = os.path.getsize(source_path) // 1024
    print(f"\n{'='*60}")
    print(f"TRANSLATING: {fname} ({fsize}KB)")
    print(f"{'='*60}")
    
    with open(source_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    count = [0]
    
    def tick():
        count[0] += 1
        if count[0] % 25 == 0:
            elapsed = time.time() - START[0]
            print(f"  [{count[0]} strings | {elapsed:.0f}s | {TOTAL_CALLS[0]} API calls]")
    
    # ── Phase 1: Property values ── key: "value" and key: 'value'
    print("  Phase 1: Property values...")
    
    SKIP_KEYS = {
        'icon','color','theme','id','class','type','element',
        'category','sign','house','planet','aspect','image',
        'url','path','file','src','href','key','var','const',
        'let','function','return','style','font','background',
        'border','width','height','display','position','margin',
        'padding','cursor','overflow','opacity','transform'
    }
    
    def xlate_prop(m):
        key, quote, value = m.group(1), m.group(2), m.group(3)
        if key.lower() in SKIP_KEYS:
            return m.group(0)
        if re.match(r'^[A-Z_]{2,}$', value): return m.group(0)
        if re.match(r'^[a-z]+[A-Z]', value): return m.group(0)
        if re.match(r'^#[0-9a-fA-F]+$', value): return m.group(0)
        if re.match(r'^[\d.]+(%|px|em|rem)?$', value): return m.group(0)
        if len(value.strip()) < 3: return m.group(0)
        
        translated = translate_chunk(value)
        tick()
        return f'{key}: {quote}{translated}{quote}'
    
    content = re.sub(r'(\w+):\s*(["\'])(.+?)\2', xlate_prop, content)
    p1 = count[0]
    print(f"  Phase 1 done. ({p1} strings)")
    
    # ── Phase 1b: Quoted-key values ── 'Key': 'value with spaces'
    print("  Phase 1b: Quoted-key values...")
    
    def xlate_qkey(m):
        key, value = m.group(1), m.group(2)
        if len(value.strip()) < 5 or ' ' not in value:
            return m.group(0)
        translated = translate_chunk(value)
        tick()
        return f"'{key}': '{translated}'"
    
    content = re.sub(r"'([^']+)':\s*'([^']{5,})'", xlate_qkey, content)
    print(f"  Phase 1b done. ({count[0] - p1} new)")
    
    # ── Phase 2: Array strings ── ["str1", "str2"]
    print("  Phase 2: Array strings...")
    p2 = count[0]
    
    def xlate_arr_el(m):
        value = m.group(1)
        if len(value.strip()) < 3: return m.group(0)
        if re.match(r'^[A-Z_]{2,}$', value): return m.group(0)
        if re.match(r'^[a-z]+[A-Z]', value): return m.group(0)
        translated = translate_chunk(value)
        tick()
        return f'"{translated}"'
    
    def xlate_arr(m):
        return re.sub(r'"([^"]{3,})"', xlate_arr_el, m.group(0))
    
    content = re.sub(r'\[[^\]]*"[^\]]*\]', xlate_arr, content)
    print(f"  Phase 2 done. ({count[0] - p2} new)")
    
    # ── Phase 3: Template literals ── key: `content`
    print("  Phase 3: Template literals (key: `...`)...")
    p3 = count[0]
    
    SKIP_TMPL = {'icon','color','theme','id','class','type','element','style'}
    
    def xlate_tmpl(m):
        key, value = m.group(1), m.group(2)
        if key.lower() in SKIP_TMPL: return m.group(0)
        if len(value.strip()) < 5: return m.group(0)
        translated = translate_long_text(value)
        tick()
        return key + ': `' + translated + '`'
    
    content = re.sub(
        r'(\w+):\s*`((?:[^`\\]|\\.)*)`',
        xlate_tmpl, content, flags=re.DOTALL
    )
    print(f"  Phase 3 done. ({count[0] - p3} new)")
    
    # ── Phase 3b: Assignment template literals ── var = `content`
    print("  Phase 3b: Assignment template literals...")
    p3b = count[0]
    
    def xlate_assign_tmpl(m):
        varname, value = m.group(1), m.group(2)
        if len(value.strip()) < 5: return m.group(0)
        translated = translate_long_text(value)
        tick()
        return varname + ' = `' + translated + '`'
    
    content = re.sub(
        r'(\w+)\s*=\s*`((?:[^`\\]|\\.)*)`',
        xlate_assign_tmpl, content, flags=re.DOTALL
    )
    print(f"  Phase 3b done. ({count[0] - p3b} new)")
    
    # Write output
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  ✓ SAVED ({count[0]} total strings)")
    return count[0]


def main():
    START[0] = time.time()
    
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
    
    # Filter by command line argument
    if len(sys.argv) > 1:
        fragment = sys.argv[1]
        all_files = [f for f in all_files if fragment in f]
        if not all_files:
            print(f"No file matching '{fragment}'")
            sys.exit(1)
    
    print(f"Files: {len(all_files)}")
    print(f"Source: {parent_dir}")
    print(f"Output: {esp_dir}")
    
    total = 0
    done = []
    
    for i, fname in enumerate(all_files, 1):
        src = os.path.join(parent_dir, fname)
        tgt = os.path.join(esp_dir, fname)
        
        if not os.path.exists(src):
            print(f"\nSKIP: {fname} not found")
            continue
        
        print(f"\n[{i}/{len(all_files)}]", end='')
        try:
            n = process_file(src, tgt)
            total += n
            done.append(fname)
        except Exception as e:
            print(f"\n  ERROR: {fname}: {e}")
            import traceback; traceback.print_exc()
    
    elapsed = time.time() - START[0]
    print(f"\n{'='*60}")
    print(f"COMPLETE! {len(done)}/{len(all_files)} files, {total} strings, {TOTAL_CALLS[0]} calls, {elapsed:.0f}s ({elapsed/60:.1f}min)")
    print(f"{'='*60}")


if __name__ == '__main__':
    main()
