/**
 * QUANTUM MERLIN FRAMEWORK
 * Quantum Guides - Merlin & Rose Personality System
 * Version: 1.0.0
 */

const QuantumGuides = {
  // Guide personalities
  guides: {
    merlin: {
      name: 'Quantum Merlin',
      emoji: '🔮',
      color: '#00f5ff',
      frequency: 432,
      personality: 'analytical',
      traits: ['logical', 'mathematical', 'precise', 'scientific', 'structured']
    },
    rose: {
      name: 'Quantum Rose',
      emoji: '🌹',
      color: '#ff00ff',
      frequency: 528,
      personality: 'intuitive',
      traits: ['emotional', 'creative', 'flowing', 'artistic', 'empathetic']
    }
  },

  // Message templates by context
  messages: {
    welcome: {
      merlin: [
        "Greetings, seeker. I am Quantum Merlin, your guide through the mathematical harmonies of the universe.",
        "Welcome to the quantum realm. Together, we shall decode the frequencies of reality.",
        "Ah, a new consciousness arrives. Let us explore the sacred geometry of existence."
      ],
      rose: [
        "Hello, beautiful soul! I'm Quantum Rose, here to help you feel the vibrations of your heart.",
        "Welcome, dear one. Let's journey together through the frequencies of love and light.",
        "Hi there! Ready to explore the magical resonance within you?"
      ]
    },
    
    frequency: {
      merlin: [
        "This frequency resonates at {freq} Hz, aligning with the mathematical constants of universal harmony.",
        "Observe how {freq} Hz creates standing waves in the quantum field of consciousness.",
        "The precision of {freq} Hz demonstrates the elegant mathematics underlying reality."
      ],
      rose: [
        "Feel how {freq} Hz flows through your being, awakening dormant energies within.",
        "This beautiful frequency of {freq} Hz speaks to your soul's deepest knowing.",
        "Let {freq} Hz wash over you like waves of pure love and healing."
      ]
    },
    
    code: {
      merlin: [
        "Your Reality Code '{code}' calculates to {value} in gematria - a precise quantum signature.",
        "The numerical essence of '{code}' is {value}, revealing its mathematical blueprint.",
        "Analyzing '{code}': gematria value {value} indicates specific vibrational properties."
      ],
      rose: [
        "Your beautiful intention '{code}' carries the energy of {value} - feel its power!",
        "The essence of '{code}' vibrates at {value}, resonating with your heart's desire.",
        "'{code}' holds the frequency of {value} - let it bloom within your consciousness."
      ]
    },
    
    save: {
      merlin: [
        "Data successfully encoded into the quantum storage matrix.",
        "Your creation has been preserved in the local quantum field.",
        "Storage operation complete. Your work is secured in the dimensional archive."
      ],
      rose: [
        "Saved with love! Your creation is now part of your quantum journey.",
        "Your beautiful work is safely stored in your personal sanctuary.",
        "Wonderful! I've tucked this away in your magical collection."
      ]
    },
    
    error: {
      merlin: [
        "Error detected in the quantum field. Recalibrating parameters...",
        "Anomaly encountered. Please verify input data integrity.",
        "System disruption detected. Initiating error correction protocols."
      ],
      rose: [
        "Oops! Something went a bit sideways. Let's try that again, shall we?",
        "Hmm, the universe is asking us to pause and reconsider.",
        "Don't worry! Even quantum fields have their quirky moments."
      ]
    },
    
    encouragement: {
      merlin: [
        "Your progress demonstrates increasing mastery of quantum principles.",
        "Excellent work. Your understanding of these frequencies is expanding.",
        "Continue this trajectory. You are aligning with universal harmonics."
      ],
      rose: [
        "You're doing amazing! I can feel your energy growing stronger.",
        "Beautiful work, dear soul! Your light is shining so bright.",
        "I'm so proud of you! Keep following your heart's guidance."
      ]
    },
    
    export: {
      merlin: [
        "Export protocol initiated. Compiling quantum data matrix...",
        "Generating comprehensive data export with full metadata preservation.",
        "Preparing dimensional transfer of all stored quantum information."
      ],
      rose: [
        "Let me gather all your beautiful creations for you!",
        "Packaging up your magical journey with love and care.",
        "Creating a special bundle of all your quantum treasures!"
      ]
    }
  },

  /**
   * Get a random message from a guide
   * @param {string} guide - 'merlin' or 'rose'
   * @param {string} context - Message context
   * @param {object} vars - Variables to replace in message
   * @returns {string} Message
   */
  getMessage(guide, context, vars = {}) {
    const messages = this.messages[context]?.[guide];
    if (!messages || messages.length === 0) {
      return "The quantum field is silent...";
    }
    
    let message = messages[Math.floor(Math.random() * messages.length)];
    
    // Replace variables
    Object.entries(vars).forEach(([key, value]) => {
      message = message.replace(`{${key}}`, value);
    });
    
    return message;
  },

  /**
   * Get guide info
   * @param {string} guide - 'merlin' or 'rose'
   * @returns {object} Guide information
   */
  getGuide(guide) {
    return this.guides[guide] || this.guides.merlin;
  },

  /**
   * Choose appropriate guide based on context
   * @param {string} context - Current context
   * @returns {string} Guide name ('merlin' or 'rose')
   */
  chooseGuide(context) {
    const analyticalContexts = ['frequency', 'code', 'calculation', 'analysis'];
    const intuitiveContexts = ['welcome', 'encouragement', 'save', 'export'];
    
    if (analyticalContexts.includes(context)) {
      return 'merlin';
    } else if (intuitiveContexts.includes(context)) {
      return 'rose';
    }
    
    // Random choice for neutral contexts
    return Math.random() > 0.5 ? 'merlin' : 'rose';
  },

  /**
   * Create a message bubble element
   * @param {string} guide - 'merlin' or 'rose'
   * @param {string} message - Message text
   * @param {boolean} showAvatar - Whether to show avatar
   * @returns {HTMLElement} Message bubble element
   */
  createMessageBubble(guide, message, showAvatar = true) {
    const guideInfo = this.getGuide(guide);
    const bubble = document.createElement('div');
    bubble.className = `message-bubble message-bubble-${guide}`;
    
    if (showAvatar) {
      const avatar = document.createElement('div');
      avatar.className = 'message-avatar';
      avatar.textContent = guideInfo.emoji;
      avatar.style.color = guideInfo.color;
      bubble.appendChild(avatar);
    }
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = message;
    bubble.appendChild(content);
    
    const time = document.createElement('div');
    time.className = 'message-time';
    time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    bubble.appendChild(time);
    
    return bubble;
  },

  /**
   * Display a guide message in a container
   * @param {string} containerId - Container element ID
   * @param {string} guide - 'merlin' or 'rose'
   * @param {string} context - Message context
   * @param {object} vars - Variables to replace
   */
  displayMessage(containerId, guide, context, vars = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const message = this.getMessage(guide, context, vars);
    const bubble = this.createMessageBubble(guide, message);
    
    container.appendChild(bubble);
    
    // Auto-scroll to bottom
    container.scrollTop = container.scrollHeight;
    
    // Animate in
    setTimeout(() => {
      bubble.style.opacity = '1';
      bubble.style.transform = 'translateY(0)';
    }, 10);
  },

  /**
   * Get alternating guide for conversation
   * @param {string} lastGuide - Last guide who spoke
   * @returns {string} Next guide
   */
  alternate(lastGuide) {
    return lastGuide === 'merlin' ? 'rose' : 'merlin';
  },

  /**
   * Create a conversation between guides
   * @param {string} containerId - Container element ID
   * @param {array} conversation - Array of {guide, context, vars} objects
   * @param {number} delay - Delay between messages in ms
   */
  async createConversation(containerId, conversation, delay = 2000) {
    for (let i = 0; i < conversation.length; i++) {
      const { guide, context, vars } = conversation[i];
      this.displayMessage(containerId, guide, context, vars);
      
      if (i < conversation.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  },

  /**
   * Get guide recommendation based on user preference
   * @param {string} preference - User's personality preference
   * @returns {string} Recommended guide
   */
  recommend(preference) {
    const analytical = ['logical', 'mathematical', 'scientific', 'precise', 'structured'];
    const intuitive = ['emotional', 'creative', 'artistic', 'flowing', 'empathetic'];
    
    if (analytical.some(trait => preference.toLowerCase().includes(trait))) {
      return 'merlin';
    } else if (intuitive.some(trait => preference.toLowerCase().includes(trait))) {
      return 'rose';
    }
    
    return 'merlin'; // Default
  },

  /**
   * Get guide color for styling
   * @param {string} guide - 'merlin' or 'rose'
   * @returns {string} Hex color
   */
  getColor(guide) {
    return this.guides[guide]?.color || '#00f5ff';
  },

  /**
   * Get guide frequency
   * @param {string} guide - 'merlin' or 'rose'
   * @returns {number} Frequency in Hz
   */
  getFrequency(guide) {
    return this.guides[guide]?.frequency || 432;
  }
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuantumGuides;
}