"""
Fix all corrupted emojis in index.html - Complete version
"""
import re

# Read the file
with open(r'c:\Users\WIPED\QMEcosystem\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Tool-emoji replacement based on tool name in same block
tool_emoji_map = {
    'Quantum Forecaster': '🔮',
    'Compatibility Calculator': '💞',
    'Unconscious Contract': '📜',
    'Birth Sigil Generator': '✨',
    'My Library': '📚',
    'Tarot Readings': '🃏',
    'Soul Card Calculator': '🎴',
    'Full Astrology': '⭐',
    'Chinese Zodiac': '🐉',
    'Gematria Calculator': '🔢',
    'Angel Numbers': '👼',
    'Reality Codes System': '⚡',
    'Sigil Creator': '✴️',
    'Genesis Frequencies': '🎵',
    '40Hz Gamma Waves': '🧠',
    'Water Charging': '💧',
    'Crystal Guide': '💎',
    'Manifestation Readiness': '🎯',
    'Energy Leak Locator': '🔋',
    'Identity Split Detector': '🪞',
    'Hidden Strengths': '💪',
    'Trust Radar': '🎯',
    'Power Avoidance Pattern': '⚡',
}

# Generic tool-emoji replacements  
content = content.replace('<span class="tool-emoji">??</span>', '<span class="tool-emoji">🔮</span>')
content = content.replace('<span class="tool-emoji">?</span>', '<span class="tool-emoji">⚡</span>')

# Tool arrow replacements
content = content.replace('<span class="tool-arrow">?</span>', '<span class="tool-arrow">→</span>')

# Category title replacements
content = content.replace('<h3 class="category-title">?? Mystical Systems</h3>', '<h3 class="category-title">🔮 Mystical Systems</h3>')
content = content.replace('<h3 class="category-title">? Creation & Manifestation</h3>', '<h3 class="category-title">✨ Creation & Manifestation</h3>')
content = content.replace('<h3 class="category-title">?? Micro-Tools (Self-Discovery)</h3>', '<h3 class="category-title">🔍 Micro-Tools (Self-Discovery)</h3>')
content = content.replace('<h3 class="category-title">?? Realms</h3>', '<h3 class="category-title">🌐 Realms</h3>')
content = content.replace('<h3 class="category-title">?? Generators</h3>', '<h3 class="category-title">⚡ Generators</h3>')

# Tool name star icons
content = content.replace('Quantum Forecaster ?', 'Quantum Forecaster ⭐')

# Count remaining
remaining = content.count('??')
print(f'Remaining ?? patterns: {remaining}')

remaining_single = len(re.findall(r'>\?<', content))
print(f'Remaining single ? patterns: {remaining_single}')

# Write back
with open(r'c:\Users\WIPED\QMEcosystem\index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Emoji cleanup complete!')
