from flask import Flask, render_template, request, redirect, url_for, flash
import string

app = Flask(__name__)
app.secret_key = 'quantum_secret_key'

# Gematria: A=1, B=2, ..., Z=26, numbers at face value
def gematria(text):
    total = 0
    for char in text.upper():
        if char in string.ascii_uppercase:
            total += ord(char) - ord('A') + 1
        elif char.isdigit():
            total += int(char)
    return total

# Set generator as landing page
@app.route('/', methods=['GET', 'POST'])
def generator():
    code = None
    intention = ''
    if request.method == 'POST':
        intention = request.form.get('intention', '')
        if intention:
            code = gematria(intention)
            flash('Your intention is confidential. Be careful what you wish for!')
    return render_template('generator.html', code=code, intention=intention)

@app.route('/frequencies')
def frequencies():
    # Frequencies and categories
    freq_data = [
        {'name': 'Quantum Manifestor', 'hz': '37Hz + 73Hz + 194Hz', 'category': 'Manifestation', 'desc': 'Direct manifestation power for quantum codes', 'link': None},
        {'name': 'Infinite Wealth/Abundance Flow', 'hz': '888Hz', 'category': 'Manifestation', 'desc': 'Powerful abundance frequency', 'link': None},
        {'name': 'Divine Guidance/Lucky Numbers', 'hz': '777Hz', 'category': 'Manifestation', 'desc': 'Luck and synchronicity activation', 'link': None},
        {'name': 'DNA Repair/Miracle Manifestation', 'hz': '528Hz', 'category': 'Healing', 'desc': 'The "Love Frequency"', 'link': None},
        {'name': 'Universal Harmony', 'hz': '432Hz', 'category': 'Foundation', 'desc': 'Natural harmonic tuning', 'link': None},
        {'name': 'Earth Grounding/Schumann Resonance', 'hz': '7.83Hz', 'category': 'Foundation', 'desc': "Earth's natural frequency", 'link': None},
        {'name': 'Cellular Regeneration/Angelic Resonance', 'hz': '111Hz', 'category': 'Foundation', 'desc': 'Master number with spiritual significance', 'link': None},
        {'name': 'Sacred Completion/Sacred Geometry', 'hz': '108Hz', 'category': 'Consciousness', 'desc': 'Spiritually significant number', 'link': None},
        {'name': 'Spiritual Elevation', 'hz': '333Hz', 'category': 'Consciousness', 'desc': 'Triple master number', 'link': None},
        {'name': 'Tesla God Frequency', 'hz': '11.76Hz', 'category': 'Consciousness', 'desc': 'Esoteric Tesla connection', 'link': None},
        {'name': 'Fear Liberation', 'hz': '396Hz', 'category': 'Healing', 'desc': 'Removes blocks to manifestation', 'link': None},
        {'name': 'Pain Relief Foundation', 'hz': '174Hz', 'category': 'Healing', 'desc': 'Physical comfort', 'link': None},
        {'name': 'Heart Connection', 'hz': '639Hz', 'category': 'Healing', 'desc': 'Love and relationship frequency', 'link': None},
        {'name': 'Angelic Protection', 'hz': '444Hz', 'category': 'Protection', 'desc': 'Shields manifestation work', 'link': None},
        {'name': 'Harmony Protection', 'hz': '222Hz', 'category': 'Protection', 'desc': 'Balances energies', 'link': None},
    ]
    return render_template('frequencies.html', freq_data=freq_data)

@app.route('/example')
def example():
    # Example intention
    example_intention = (
        "I am deeply grateful for the end of corruption and needless killing. "
        "Freedom of speech and peace now reign forever. All people strive to help others. "
        "Thank you for this reality, which uplifts all beings and brings harmony to the world."
    )
    amplification_tips = [
        "Change your phone passcode to your quantum code.",
        "Write your code on a sticky note and place it where you see it daily.",
        "Repeat your code while listening to recommended frequencies.",
        "Share your code on social media with our hashtags.",
        "Support others by amplifying their codes in our community.",
    ]
    return render_template('example.html', example_intention=example_intention, amplification_tips=amplification_tips)

if __name__ == '__main__':
    app.run(debug=True)
