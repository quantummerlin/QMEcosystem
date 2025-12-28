/**
 * QUANTUM REALITY CODES
 * Gematria Calculator & Manifestation Engine
 */

class RealityCodesGenerator {
    constructor() {
        // Current state
        this.currentCode = '';
        this.currentCipher = 'english';
        this.currentResults = null;
        
        // Gematria cipher tables
        this.ciphers = {
            english: {
                name: 'English Simple',
                values: this.generateEnglishSimple()
            },
            pythagorean: {
                name: 'Pythagorean',
                values: this.generatePythagorean()
            },
            chaldean: {
                name: 'Chaldean',
                values: this.generateChaldean()
            },
            hebrew: {
                name: 'Hebrew',
                values: this.generateHebrew()
            }
        };
        
        // Sacred frequencies
        this.sacredFrequencies = [
            { freq: 174, name: 'Foundation', desc: 'Pain relief & security' },
            { freq: 285, name: 'Quantum Cognition', desc: 'Cellular healing' },
            { freq: 396, name: 'Liberation', desc: 'Release guilt & fear' },
            { freq: 417, name: 'Transformation', desc: 'Facilitate change' },
            { freq: 432, name: 'Universal Harmony', desc: 'Natural tuning' },
            { freq: 528, name: 'Love & Miracles', desc: 'DNA repair' },
            { freq: 639, name: 'Connection', desc: 'Relationships' },
            { freq: 741, name: 'Awakening', desc: 'Intuition' },
            { freq: 852, name: 'Spiritual Order', desc: 'Return to source' },
            { freq: 963, name: 'Divine Unity', desc: 'Oneness' }
        ];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadSavedCodes();
        
        // Initialize backgrounds with magenta theme
        QuantumBackgrounds.init({
            particles: {
                count: 50,
                colors: ['#ff00ff', '#ff1493']
            },
            stars: { count: 100 },
            grid: { color: 'magenta' },
            sun: { color: 'magenta' }
        });
    }
    
    setupEventListeners() {
        // Cipher selection
        document.querySelectorAll('.cipher-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentCipher = btn.dataset.cipher;
                this.updateCipherButtons(btn);
            });
        });
        
        // Calculate button
        document.getElementById('calculateBtn').addEventListener('click', () => {
            this.calculate();
        });
        
        // Enter key in textarea
        document.getElementById('codeInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.calculate();
            }
        });
        
        // Action buttons
        document.getElementById('saveCodeBtn').addEventListener('click', () => this.saveCode());
        document.getElementById('createSigilBtn').addEventListener('click', () => this.createSigil());
        document.getElementById('shareCodeBtn').addEventListener('click', () => this.shareCode());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('openFrequencyBtn').addEventListener('click', () => this.openInFrequencyGenerator());
        document.getElementById('clearAllCodesBtn').addEventListener('click', () => this.clearAllCodes());
    }
    
    generateEnglishSimple() {
        const values = {};
        for (let i = 0; i < 26; i++) {
            const letter = String.fromCharCode(65 + i);
            values[letter] = i + 1;
            values[letter.toLowerCase()] = i + 1;
        }
        return values;
    }
    
    generatePythagorean() {
        const values = {};
        const mapping = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < 26; i++) {
            const letter = String.fromCharCode(65 + i);
            values[letter] = mapping[i % 9];
            values[letter.toLowerCase()] = mapping[i % 9];
        }
        return values;
    }
    
    generateChaldean() {
        const values = {};
        const mapping = {
            'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 8, 'G': 3, 'H': 5,
            'I': 1, 'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 7, 'P': 8,
            'Q': 1, 'R': 2, 'S': 3, 'T': 4, 'U': 6, 'V': 6, 'W': 6, 'X': 5,
            'Y': 1, 'Z': 7
        };
        
        for (const [letter, value] of Object.entries(mapping)) {
            values[letter] = value;
            values[letter.toLowerCase()] = value;
        }
        return values;
    }
    
    generateHebrew() {
        const values = {};
        const mapping = {
            'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8,
            'I': 9, 'J': 10, 'K': 20, 'L': 30, 'M': 40, 'N': 50, 'O': 70, 'P': 80,
            'Q': 100, 'R': 200, 'S': 300, 'T': 400, 'U': 6, 'V': 6, 'W': 6, 'X': 60,
            'Y': 10, 'Z': 7
        };
        
        for (const [letter, value] of Object.entries(mapping)) {
            values[letter] = value;
            values[letter.toLowerCase()] = value;
        }
        return values;
    }
    
    calculateGematria(text, cipher) {
        const values = this.ciphers[cipher].values;
        let sum = 0;
        
        for (const char of text) {
            if (values[char]) {
                sum += values[char];
            }
        }
        
        return sum;
    }
    
    reduceToSingleDigit(num) {
        while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
            num = num.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        }
        return num;
    }
    
    calculate() {
        const input = document.getElementById('codeInput').value.trim();
        
        if (!input) {
            alert('Please enter your intention or affirmation.');
            return;
        }
        
        this.currentCode = input;
        
        // Calculate gematria value
        const gematriaValue = this.calculateGematria(input, this.currentCipher);
        const reducedValue = this.reduceToSingleDigit(gematriaValue);
        const wordCount = input.split(/\s+/).filter(w => w.length > 0).length;
        
        // Store results
        this.currentResults = {
            text: input,
            cipher: this.currentCipher,
            gematriaValue,
            reducedValue,
            wordCount
        };
        
        // Display results
        this.displayResults();
        
        // Suggest frequencies
        this.suggestFrequencies(gematriaValue);
        
        // Show results section
        document.getElementById('resultsSection').style.display = 'block';
        
        // Scroll to results
        document.getElementById('resultsSection').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
    
    displayResults() {
        document.getElementById('gematriaValue').textContent = this.currentResults.gematriaValue;
        document.getElementById('reducedValue').textContent = this.currentResults.reducedValue;
        document.getElementById('wordCount').textContent = this.currentResults.wordCount;
    }
    
    suggestFrequencies(gematriaValue) {
        const container = document.getElementById('frequencySuggestions');
        
        // Find closest sacred frequencies
        const suggestions = [];
        
        // Direct match or close match
        for (const freq of this.sacredFrequencies) {
            const diff = Math.abs(freq.freq - gematriaValue);
            suggestions.push({ ...freq, diff });
        }
        
        // Sort by difference and take top 3
        suggestions.sort((a, b) => a.diff - b.diff);
        const topSuggestions = suggestions.slice(0, 3);
        
        // Display suggestions
        container.innerHTML = topSuggestions.map(s => `
            <div class="suggestion-item">
                <div class="suggestion-freq">${s.freq} Hz</div>
                <div class="suggestion-name">${s.name}</div>
            </div>
        `).join('');
        
        // Store for later use
        this.currentResults.suggestedFrequencies = topSuggestions;
    }
    
    saveCode() {
        if (!this.currentResults) {
            alert('Please calculate a code first.');
            return;
        }
        
        const code = {
            text: this.currentResults.text,
            cipher: this.currentResults.cipher,
            gematriaValue: this.currentResults.gematriaValue,
            reducedValue: this.currentResults.reducedValue,
            wordCount: this.currentResults.wordCount,
            suggestedFrequencies: this.currentResults.suggestedFrequencies,
            type: 'reality_code'
        };
        
        const saved = QuantumStorage.save(QuantumStorage.KEYS.CODES, code);
        
        alert('✨ Reality Code saved successfully!');
        
        this.loadSavedCodes();
    }
    
    loadSavedCodes() {
        const codes = QuantumStorage.getAll(QuantumStorage.KEYS.CODES);
        const container = document.getElementById('savedCodesList');
        
        if (codes.length === 0) {
            container.innerHTML = `
                <p style="text-align: center; color: var(--quantum-gray); padding: var(--space-xl);">
                    No saved codes yet. Create your first reality code!
                </p>
            `;
            return;
        }
        
        container.innerHTML = codes.map(code => `
            <div class="saved-code-card">
                <div class="saved-code-header">
                    <div>
                        <div class="saved-code-text">${code.text}</div>
                        <div class="saved-code-meta">
                            <span>Gematria: ${code.gematriaValue}</span>
                            <span>Reduced: ${code.reducedValue}</span>
                            <span>Cipher: ${this.ciphers[code.cipher].name}</span>
                            <span>${new Date(code.timestamp).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div class="saved-code-actions">
                        <button class="btn btn-ghost btn-sm" onclick="codesGenerator.loadCode('${code.id}')">
                            Load
                        </button>
                        <button class="btn btn-ghost btn-sm" onclick="codesGenerator.deleteCode('${code.id}')">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    loadCode(id) {
        const code = QuantumStorage.getById(QuantumStorage.KEYS.CODES, id);
        if (!code) return;
        
        // Load into input
        document.getElementById('codeInput').value = code.text;
        
        // Set cipher
        this.currentCipher = code.cipher;
        document.querySelectorAll('.cipher-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.cipher === code.cipher) {
                btn.classList.add('active');
            }
        });
        
        // Recalculate
        this.calculate();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    deleteCode(id) {
        if (confirm('Are you sure you want to delete this code?')) {
            QuantumStorage.delete(QuantumStorage.KEYS.CODES, id);
            this.loadSavedCodes();
        }
    }
    
    clearAllCodes() {
        if (confirm('Are you sure you want to delete all saved codes?')) {
            QuantumStorage.clear(QuantumStorage.KEYS.CODES);
            this.loadSavedCodes();
        }
    }
    
    createSigil() {
        if (!this.currentResults) {
            alert('Please calculate a code first.');
            return;
        }
        
        // Navigate to sigil creator (when built)
        alert('🔯 Sigil Creator coming soon! This will automatically create a sigil from your Reality Code.');
    }
    
    shareCode() {
        if (!this.currentResults) {
            alert('Please calculate a code first.');
            return;
        }
        
        const shareText = `My Quantum Reality Code:\n"${this.currentResults.text}"\nGematria Value: ${this.currentResults.gematriaValue}\nReduced: ${this.currentResults.reducedValue}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'My Quantum Reality Code',
                text: shareText
            }).catch(err => console.log('Share failed:', err));
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert('✨ Code copied to clipboard!');
            });
        }
    }
    
    openInFrequencyGenerator() {
        if (!this.currentResults || !this.currentResults.suggestedFrequencies) {
            alert('Please calculate a code first.');
            return;
        }
        
        // Get the top suggested frequency
        const topFreq = this.currentResults.suggestedFrequencies[0].freq;
        
        // Navigate to frequency generator with data
        QuantumNavigation.navigateTo('genesis', {
            frequency: topFreq,
            source: 'reality_code',
            code: this.currentResults.text
        });
    }
    
    reset() {
        document.getElementById('codeInput').value = '';
        document.getElementById('resultsSection').style.display = 'none';
        this.currentCode = '';
        this.currentResults = null;
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    updateCipherButtons(activeBtn) {
        document.querySelectorAll('.cipher-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }
}

// Initialize generator
const codesGenerator = new RealityCodesGenerator();

// Check for transferred data from other tools
window.addEventListener('DOMContentLoaded', () => {
    const transferredData = QuantumNavigation.getTransferredData();
    if (transferredData && transferredData.data) {
        // If coming from another tool with data, populate the input
        if (transferredData.data.text) {
            document.getElementById('codeInput').value = transferredData.data.text;
        }
    }
});