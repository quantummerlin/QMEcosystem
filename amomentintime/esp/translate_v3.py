#!/usr/bin/env python3
"""
Translate JS reading files from English to Spanish.
Uses MyMemory API (primary) with Google fallback.
Handles rate limiting gracefully.

Usage:
  python translate_v3.py                    # All files
  python translate_v3.py readings           # Matching files
"""

import os, sys, re, time, json
import requests

DELAY = 0.5
MAX_CHARS = 500  # MyMemory per-request limit
TOTAL_CALLS = [0]
START = [0]
GOOGLE_OK = [True]  # Track if Google is available


def translate_mymemory(text):
    """Translate via MyMemory API (reliable, no IP blocking)."""
    try:
        r = requests.get(
            'https://api.mymemory.translated.net/get',
            params={
                'q': text[:500],
                'langpair': 'en|es',
                'de': 'translate@quantummerlin.com'  # Higher limit with email
            },
            timeout=15
        )
        data = r.json()
        result = data.get('responseData', {}).get('translatedText', '')
        if result and data.get('responseStatus') == 200:
            return result
        # Check if quota exceeded
        if data.get('quotaFinished'):
            print("    MyMemory quota exceeded!")
            return None
        return result if result else None
    except Exception as e:
        print(f"    MyMemory error: {e}")
        return None


def translate_google(text):
    """Translate via Google Translate free API."""
    if not GOOGLE_OK[0]:
        return None
    try:
        import urllib.request, urllib.parse
        data = urllib.parse.urlencode({
            'client': 'gtx', 'sl': 'en', 'tl': 'es', 'dt': 't',
            'q': text
        }).encode('utf-8')
        req = urllib.request.Request(
            'https://translate.googleapis.com/translate_a/single',
            data=data,
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            result = json.loads(resp.read().decode('utf-8'))
        translated = ''
        if result and result[0]:
            for item in result[0]:
                if item and item[0]:
                    translated += item[0]
        return translated if translated else None
    except Exception as e:
        if '429' in str(e):
            print("    Google rate limited - switching to MyMemory only")
            GOOGLE_OK[0] = False
        return None


def translate_text(text, retries=3):
    """Translate text using available API. Tries Google first, falls back to MyMemory."""
    if not text or len(text.strip()) < 3:
        return text
    
    # Try Google first (faster, no char limit)
    if GOOGLE_OK[0]:
        result = translate_google(text)
        if result:
            TOTAL_CALLS[0] += 1
            return result
    
    # Fall back to MyMemory
    # MyMemory has 500 char limit per request, so chunk if needed
    if len(text) <= 500:
        result = translate_mymemory(text)
        if result:
            TOTAL_CALLS[0] += 1
            return result
    else:
        # Chunk the text at sentence boundaries
        chunks = chunk_text(text, 490)
        translated_chunks = []
        for chunk in chunks:
            for attempt in range(retries):
                result = translate_mymemory(chunk)
                if result:
                    translated_chunks.append(result)
                    TOTAL_CALLS[0] += 1
                    time.sleep(DELAY)
                    break
                else:
                    time.sleep(3 * (attempt + 1))
            else:
                translated_chunks.append(chunk)  # Keep original if all retries fail
        return ' '.join(translated_chunks)
    
    return text  # Return original if everything fails


def chunk_text(text, max_len):
    """Split text into chunks at sentence boundaries."""
    if len(text) <= max_len:
        return [text]
    
    chunks = []
    current = ''
    
    # Try to split on sentences
    sentences = re.split(r'(?<=[.!?])\s+', text)
    
    for sent in sentences:
        if len(current) + len(sent) + 1 <= max_len:
            current = (current + ' ' + sent).strip() if current else sent
        else:
            if current:
                chunks.append(current)
            # If single sentence > max_len, split at word boundary
            if len(sent) > max_len:
                words = sent.split()
                current = ''
                for word in words:
                    if len(current) + len(word) + 1 <= max_len:
                        current = (current + ' ' + word).strip() if current else word
                    else:
                        if current:
                            chunks.append(current)
                        current = word
            else:
                current = sent
    
    if current:
        chunks.append(current)
    
    return chunks


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
    """Translate long text, handling paragraph splitting."""
    if not text or len(text.strip()) < 5:
        return text
    
    # Split on double newlines (paragraphs)
    paragraphs = text.split('\n\n')
    results = []
    
    for para in paragraphs:
        if para.strip() and len(para.strip()) > 3:
            results.append(translate_chunk(para))
        else:
            results.append(para)
    
    return '\n\n'.join(results)


def process_file(source_path, target_path):
    """Translate a JS file from English to Spanish."""
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
            src = "Google" if GOOGLE_OK[0] else "MyMemory"
            print(f"  [{count[0]} strings | {elapsed:.0f}s | {TOTAL_CALLS[0]} calls | {src}]")
    
    SKIP_KEYS = {
        'icon','color','theme','id','class','type','element',
        'category','sign','house','planet','aspect','image',
        'url','path','file','src','href','key','var','const',
        'let','function','return','style','font','background',
        'border','width','height','display','position','margin',
        'padding','cursor','overflow','opacity','transform'
    }
    
    # ── Phase 1: key: "value" and key: 'value' ──
    print("  Phase 1: Property values...")
    
    def xlate_prop(m):
        key, quote, value = m.group(1), m.group(2), m.group(3)
        if key.lower() in SKIP_KEYS: return m.group(0)
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
    
    # ── Phase 1b: 'QuotedKey': 'value with spaces' ──
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
    
    # ── Phase 2: ["str1", "str2"] ──
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
    
    # ── Phase 3: key: `template literal` ──
    print("  Phase 3: Template literals...")
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
    
    # ── Phase 3b: var = `template literal` ──
    print("  Phase 3b: Assignment templates...")
    p3b = count[0]
    
    def xlate_assign(m):
        varname, value = m.group(1), m.group(2)
        if len(value.strip()) < 5: return m.group(0)
        translated = translate_long_text(value)
        tick()
        return varname + ' = `' + translated + '`'
    
    content = re.sub(
        r'(\w+)\s*=\s*`((?:[^`\\]|\\.)*)`',
        xlate_assign, content, flags=re.DOTALL
    )
    print(f"  Phase 3b done. ({count[0] - p3b} new)")
    
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  ✓ SAVED ({count[0]} total strings)")
    return count[0]


def main():
    START[0] = time.time()
    
    esp_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(esp_dir)
    
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
    
    if len(sys.argv) > 1:
        fragment = sys.argv[1]
        all_files = [f for f in all_files if fragment in f]
        if not all_files:
            print(f"No file matching '{fragment}'")
            sys.exit(1)
    
    print(f"Files: {len(all_files)}")
    print(f"Source: {parent_dir}")
    print(f"Output: {esp_dir}\n")
    
    # Quick check which API works
    print("Testing APIs...")
    test = translate_google("test")
    if test:
        print(f"  Google: OK ({test})")
    else:
        print("  Google: BLOCKED - using MyMemory")
        GOOGLE_OK[0] = False
    
    test2 = translate_mymemory("test")
    if test2:
        print(f"  MyMemory: OK ({test2})")
    else:
        print("  MyMemory: FAILED")
    
    total = 0
    done = []
    
    for i, fname in enumerate(all_files, 1):
        src = os.path.join(parent_dir, fname)
        tgt = os.path.join(esp_dir, fname)
        
        if not os.path.exists(src):
            print(f"\nSKIP: {fname}")
            continue
        
        print(f"\n[{i}/{len(all_files)}]", end='')
        try:
            n = process_file(src, tgt)
            total += n
            done.append(fname)
        except KeyboardInterrupt:
            print(f"\n  INTERRUPTED during {fname}!")
            break
        except Exception as e:
            print(f"\n  ERROR: {fname}: {e}")
            import traceback; traceback.print_exc()
    
    elapsed = time.time() - START[0]
    print(f"\n{'='*60}")
    print(f"COMPLETE! {len(done)}/{len(all_files)} files")
    print(f"Strings: {total} | Calls: {TOTAL_CALLS[0]} | Time: {elapsed:.0f}s ({elapsed/60:.1f}min)")
    print(f"{'='*60}")


if __name__ == '__main__':
    main()
