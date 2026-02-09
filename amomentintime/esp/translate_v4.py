#!/usr/bin/env python3
"""
Translate JS reading files from English to Spanish.
Uses deep-translator library (GoogleTranslator) which avoids IP-based rate limiting.

Usage:
  python translate_v4.py                    # All untranslated files
  python translate_v4.py readings           # Files matching fragment
  python translate_v4.py --skip-done        # Skip files that already have Spanish
"""

import os, sys, re, time, json

try:
    from deep_translator import GoogleTranslator
except ImportError:
    print("Install: pip install deep-translator")
    sys.exit(1)

# Force unbuffered output
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(line_buffering=True)

DELAY = 0.3  # seconds between API calls
MAX_CHARS = 4900  # deep-translator limit per call
TOTAL_CALLS = [0]
START = [0]
TRANSLATOR = None


def get_translator():
    global TRANSLATOR
    if TRANSLATOR is None:
        TRANSLATOR = GoogleTranslator(source='en', target='es')
    return TRANSLATOR


def translate_text(text, retries=4):
    """Translate text using deep-translator GoogleTranslator."""
    if not text or len(text.strip()) < 3:
        return text

    for attempt in range(retries):
        try:
            t = get_translator()
            result = t.translate(text[:MAX_CHARS])
            TOTAL_CALLS[0] += 1
            return result if result else text
        except Exception as e:
            err = str(e)
            if '429' in err or 'Too Many' in err:
                wait = 10 * (attempt + 1)
                print(f"    Rate limited, waiting {wait}s...")
                time.sleep(wait)
                # Create a fresh translator instance
                global TRANSLATOR
                TRANSLATOR = None
            else:
                wait = 3 * (attempt + 1)
                print(f"    Error ({e}), retry in {wait}s...")
                time.sleep(wait)

    print(f"    FAILED after {retries} retries")
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
    """Restore ${...} placeholders, handling translator mangling."""
    for key, val in phs.items():
        text = text.replace(key, val)
        text = text.replace(key.lower(), val)
        # Handle spaces the translator may insert
        spaced = key.replace('XQZX', 'XQZX ')
        text = text.replace(spaced, val)
        spaced2 = key.replace('XQZX', ' XQZX')
        text = text.replace(spaced2, val)
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
    """Translate long text by splitting into paragraphs."""
    if not text or len(text.strip()) < 5:
        return text

    # If under limit, translate as one block
    if len(text) <= MAX_CHARS:
        return translate_chunk(text)

    # Split on double newlines (paragraphs)
    paragraphs = text.split('\n\n')
    results = []

    for para in paragraphs:
        if para.strip() and len(para.strip()) > 3:
            if len(para) <= MAX_CHARS:
                results.append(translate_chunk(para))
            else:
                # Split further on sentences
                sentences = re.split(r'(?<=[.!?])\s+', para)
                chunk = ''
                translated_parts = []
                for sent in sentences:
                    if len(chunk) + len(sent) + 1 <= MAX_CHARS:
                        chunk = (chunk + ' ' + sent).strip() if chunk else sent
                    else:
                        if chunk:
                            translated_parts.append(translate_chunk(chunk))
                        chunk = sent
                if chunk:
                    translated_parts.append(translate_chunk(chunk))
                results.append(' '.join(translated_parts))
        else:
            results.append(para)

    return '\n\n'.join(results)


SKIP_KEYS = {
    'icon', 'color', 'theme', 'id', 'class', 'type', 'element',
    'category', 'sign', 'house', 'planet', 'aspect', 'image',
    'url', 'path', 'file', 'src', 'href', 'key', 'var', 'const',
    'let', 'function', 'return', 'style', 'font', 'background',
    'border', 'width', 'height', 'display', 'position', 'margin',
    'padding', 'cursor', 'overflow', 'opacity', 'transform',
    'name', 'component', 'method', 'param', 'dataKey'
}


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
            print(f"  [{count[0]} strings | {elapsed:.0f}s | {TOTAL_CALLS[0]} API calls]")

    # ── Phase 1: key: "value" and key: 'value' ──
    print("  Phase 1: Property values...")

    def xlate_prop(m):
        key, quote, value = m.group(1), m.group(2), m.group(3)
        if key.lower() in SKIP_KEYS:
            return m.group(0)
        if re.match(r'^[A-Z_]{2,}$', value):
            return m.group(0)
        if re.match(r'^[a-z]+[A-Z]', value):
            return m.group(0)
        if re.match(r'^#[0-9a-fA-F]+$', value):
            return m.group(0)
        if re.match(r'^[\d.]+(%|px|em|rem)?$', value):
            return m.group(0)
        if len(value.strip()) < 3:
            return m.group(0)
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
    p1b = count[0]
    print(f"  Phase 1b done. ({p1b - p1} new)")

    # ── Phase 2: Array strings ["str1", "str2"] ──
    print("  Phase 2: Array strings...")
    p2 = count[0]

    def xlate_arr_el(m):
        value = m.group(1)
        if len(value.strip()) < 3:
            return m.group(0)
        if re.match(r'^[A-Z_]{2,}$', value):
            return m.group(0)
        if re.match(r'^[a-z]+[A-Z]', value):
            return m.group(0)
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
    SKIP_TMPL = {'icon', 'color', 'theme', 'id', 'class', 'type', 'element', 'style'}

    def xlate_tmpl(m):
        key, value = m.group(1), m.group(2)
        if key.lower() in SKIP_TMPL:
            return m.group(0)
        if len(value.strip()) < 5:
            return m.group(0)
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
        if len(value.strip()) < 5:
            return m.group(0)
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


def file_is_spanish(filepath):
    """Check if file already contains significant Spanish content."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            head = f.read(2000)
        # Count Spanish-specific characters
        spanish_chars = len(re.findall(r'[áéíóúñ¿¡ü]', head))
        return spanish_chars > 5
    except:
        return False


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
        'calculations.js',
    ]

    skip_done = '--skip-done' in sys.argv
    args = [a for a in sys.argv[1:] if not a.startswith('--')]

    if args:
        fragment = args[0]
        all_files = [f for f in all_files if fragment in f]
        if not all_files:
            print(f"No file matching '{fragment}'")
            sys.exit(1)

    # Filter out already-translated files if requested
    if skip_done:
        filtered = []
        for f in all_files:
            target = os.path.join(esp_dir, f)
            if os.path.exists(target) and file_is_spanish(target):
                print(f"  SKIP (already Spanish): {f}")
            else:
                filtered.append(f)
        all_files = filtered

    print(f"\nFiles to translate: {len(all_files)}")
    print(f"Source: {parent_dir}")
    print(f"Output: {esp_dir}")

    # Quick API test
    print("\nTesting API...")
    try:
        test = get_translator().translate("Hello world")
        print(f"  ✓ API working: '{test}'")
    except Exception as e:
        print(f"  ✗ API error: {e}")
        sys.exit(1)

    total = 0
    done = []

    for i, fname in enumerate(all_files, 1):
        src = os.path.join(parent_dir, fname)
        tgt = os.path.join(esp_dir, fname)

        if not os.path.exists(src):
            print(f"\nSKIP: {fname} not in source dir")
            continue

        print(f"\n[{i}/{len(all_files)}]", end='')
        try:
            n = process_file(src, tgt)
            total += n
            done.append(fname)
        except KeyboardInterrupt:
            print(f"\n\nINTERRUPTED during {fname}!")
            break
        except Exception as e:
            print(f"\n  ERROR: {fname}: {e}")
            import traceback
            traceback.print_exc()

    elapsed = time.time() - START[0]
    print(f"\n{'='*60}")
    print(f"COMPLETE! {len(done)}/{len(all_files)} files")
    print(f"Strings: {total} | API calls: {TOTAL_CALLS[0]} | Time: {elapsed:.0f}s ({elapsed/60:.1f}min)")
    print(f"{'='*60}")


if __name__ == '__main__':
    main()
