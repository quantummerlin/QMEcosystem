import os, re, json, time
from urllib import request, parse

API_URL = "https://translate.googleapis.com/translate_a/single"

files = [
    "readings.js", "readings-extended.js", "advanced-readings.js", "aspect-readings.js",
    "deep-readings.js", "deep-planet-readings.js", "deep-planet-readings-outer.js",
    "deep-numerology-readings.js", "deep-chinese-zodiac-readings.js", "deep-chiron-readings.js",
    "deep-lilith-readings.js", "deep-node-readings.js", "deep-transformative-planet-readings.js",
    "house-readings.js", "love-blueprint.js", "tone-variations.js", "save-share.js"
]

cache = {}

def translate_chunk(text):
    url = API_URL + "?" + parse.urlencode({
        "client": "gtx",
        "sl": "en",
        "tl": "es",
        "dt": "t",
        "q": text
    })
    with request.urlopen(url, timeout=30) as resp:
        out = json.loads(resp.read().decode("utf-8"))
        return "".join(seg[0] for seg in out[0]) if out and out[0] else text

def split_text(text, max_len=800):
    if len(text) <= max_len:
        return [text]
    parts = []
    for block in text.split("\n\n"):
        if len(block) <= max_len:
            parts.append(block)
        else:
            sentences = re.split(r"(?<=[.!?])\s+", block)
            buf = ""
            for s in sentences:
                if len(buf) + len(s) + 1 > max_len and buf:
                    parts.append(buf.strip())
                    buf = s
                else:
                    buf = (buf + " " + s).strip()
            if buf:
                parts.append(buf.strip())
    return parts

def translate_text(text):
    t = text.strip()
    if not t:
        return text
    if t in cache:
        return cache[t]
    if re.search(r"https?://|www\\.|@\\w+|\\bconsole\\.|\\bfunction\\b|\\bconst\\b|\\bvar\\b|\\breturn\\b", t):
        cache[t] = text
        return text
    placeholders = {}
    def ph_repl(m):
        key = f"__PH{len(placeholders)}__"
        placeholders[key] = m.group(0)
        return key
    temp = re.sub(r"\\$\\{[^}]+\\}", ph_repl, t)
    try:
        chunks = split_text(temp)
        translated_parts = [translate_chunk(c) for c in chunks]
        translated = "\n\n".join(translated_parts)
    except Exception:
        translated = temp
    for k, v in placeholders.items():
        translated = translated.replace(k, v)
    cache[t] = translated
    return translated

pattern = re.compile(r"(`(?:[^`\\\\]|\\\\.)*`|\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*')")

for fname in files:
    if not os.path.exists(fname):
        continue
    with open(fname, "r", encoding="utf-8") as f:
        content = f.read()

    def repl(m):
        literal = m.group(1)
        quote = literal[0]
        inner = literal[1:-1]
        if not re.search(r"[A-Za-z]", inner):
            return m.group(0)
        translated = translate_text(inner)
        return quote + translated + quote

    new_content = pattern.sub(repl, content)
    if new_content != content:
        with open(fname, "w", encoding="utf-8") as f:
            f.write(new_content)
    time.sleep(0.2)

print("Translation pass complete.")
