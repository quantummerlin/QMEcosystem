"""
Translate all remaining English files in ESP folder to Spanish
Uses Google Translate API for translation
Preserves JavaScript structure, variables, and template literals
"""

import os
import re
import time
import urllib.request
import urllib.parse
import json

def translate_text(text, src='en', dest='es'):
    """Translate text using Google Translate API"""
    if not text or not text.strip():
        return text
    
    # Skip if already mostly Spanish or too short
    if len(text.strip()) < 3:
        return text
    
    try:
        encoded = urllib.parse.quote(text)
        url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl={src}&tl={dest}&dt=t&q={encoded}"
        
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode('utf-8'))
            
        # Extract translated text from response
        translated = ''
        if result and result[0]:
            for item in result[0]:
                if item[0]:
                    translated += item[0]
        
        return translated if translated else text
    except Exception as e:
        print(f"  Translation error: {e}")
        return text

def translate_js_string(content, placeholder='${'):
    """
    Translate JavaScript string content while preserving:
    - Template literal placeholders ${...}
    - Escape sequences
    - Variable names
    """
    # Protect template literal placeholders
    placeholders = {}
    counter = [0]
    
    def protect_placeholder(match):
        key = f"__PH{counter[0]}__"
        placeholders[key] = match.group(0)
        counter[0] += 1
        return key
    
    # Protect ${...} placeholders
    protected = re.sub(r'\$\{[^}]+\}', protect_placeholder, content)
    
    # Translate the protected text
    translated = translate_text(protected)
    
    # Restore placeholders
    for key, value in placeholders.items():
        translated = translated.replace(key, value)
    
    return translated

def process_js_file(input_path, output_path):
    """Process a JavaScript file and translate string content"""
    print(f"\nProcessing: {os.path.basename(input_path)}")
    
    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Track translation progress
    translated_count = 0
    
    # Pattern to match string properties in objects
    # Matches: key: "value" or key: 'value' or key: `value`
    def translate_property(match):
        nonlocal translated_count
        key = match.group(1)
        quote = match.group(2)
        value = match.group(3)
        
        # Skip certain keys that shouldn't be translated
        skip_keys = ['icon', 'color', 'theme', 'id', 'class', 'type', 'element', 
                     'category', 'sign', 'house', 'planet', 'aspect', 'image',
                     'url', 'path', 'file', 'src', 'href']
        if key.lower() in skip_keys:
            return match.group(0)
        
        # Translate the value
        translated = translate_js_string(value)
        if translated != value:
            translated_count += 1
            if translated_count % 20 == 0:
                print(f"  Translated {translated_count} strings...")
        
        # Small delay to avoid rate limiting
        time.sleep(0.1)
        
        return f'{key}: {quote}{translated}{quote}'
    
    # Translate quoted strings (single and double quotes)
    pattern_simple = r'(\w+):\s*(["\'])([^"\']+)\2'
    content = re.sub(pattern_simple, translate_property, content)
    
    # For template literals, we need a different approach
    # Match: key: `content`
    def translate_template_literal(match):
        nonlocal translated_count
        key = match.group(1)
        value = match.group(2)
        
        # Skip certain keys
        skip_keys = ['icon', 'color', 'theme', 'id', 'class', 'type']
        if key.lower() in skip_keys:
            return match.group(0)
        
        # Translate paragraph by paragraph to maintain structure
        lines = value.split('\n')
        translated_lines = []
        
        for line in lines:
            stripped = line.strip()
            if stripped and not stripped.startswith('//') and not stripped.startswith('/*'):
                # Translate the line content while preserving leading whitespace
                leading_space = len(line) - len(line.lstrip())
                translated_line = translate_js_string(stripped)
                translated_lines.append(' ' * leading_space + translated_line)
                translated_count += 1
                if translated_count % 20 == 0:
                    print(f"  Translated {translated_count} strings...")
                time.sleep(0.1)
            else:
                translated_lines.append(line)
        
        return f'{key}: `' + '\n'.join(translated_lines) + '`'
    
    # Match template literals more carefully
    pattern_template = r'(\w+):\s*`([^`]+)`'
    content = re.sub(pattern_template, translate_template_literal, content)
    
    # Write the translated content
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  Completed! Translated {translated_count} strings.")
    return translated_count

def main():
    """Main function to translate all files"""
    esp_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(esp_dir)
    
    # Files that need translation (still in English)
    files_to_translate = [
        'deep-readings.js',
        'deep-planet-readings.js', 
        'deep-planet-readings-outer.js',
        'deep-transformative-planet-readings.js',
        'deep-chinese-zodiac-readings.js',
        'deep-chiron-readings.js',
        'deep-lilith-readings.js',
        'deep-node-readings.js',
        'deep-numerology-readings.js',
        'house-readings.js',
        'love-blueprint.js',
        'advanced-readings.js',
        'readings-extended.js',
        'aspect-readings.js'
    ]
    
    total_translated = 0
    
    for filename in files_to_translate:
        source_file = os.path.join(parent_dir, filename)
        target_file = os.path.join(esp_dir, filename)
        
        if os.path.exists(source_file):
            count = process_js_file(source_file, target_file)
            total_translated += count
        else:
            print(f"Warning: Source file not found: {filename}")
    
    print(f"\n{'='*50}")
    print(f"TRANSLATION COMPLETE!")
    print(f"Total strings translated: {total_translated}")
    print(f"{'='*50}")

if __name__ == '__main__':
    main()
