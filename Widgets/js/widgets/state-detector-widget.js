/**
 * Quantum Merlin State Detector Widget
 * 6-question psychological state assessment using indirect questioning
 * Non-diagnostic, educational, and highly engaging
 */

(function() {
    'use strict';
    
    class StateDetectorWidget extends window.QuantumMerlin.Widget {
        constructor(config) {
            super({
                ...config,
                widgetType: 'state-detector',
                interactive: true,
                showData: false // Hide until assessment is complete
            });
            
            this.currentQuestion = 0;
            this.answers = [];
            this.results = null;
            this.isComplete = false;
            
            this.questions = [
                {
                    id: 'decision',
                    text: "When facing two options, you're more likely to:",
                    options: [
                        { text: "Go with what feels right", value: 'intuitive' },
                        { text: "Make a pros and cons list", value: 'analytical' },
                        { text: "Ask someone you trust", value: 'social' },
                        { text: "Flip a coin", value: 'random' }
                    ]
                },
                {
                    id: 'energy',
                    text: "Your energy feels most like:",
                    options: [
                        { text: "A steady, flowing river", value: 'flow' },
                        { text: "Ocean waves (sometimes high, sometimes low)", value: 'variable' },
                        { text: "A deep, calm lake", value: 'deep' },
                        { text: "Sparkling champagne bubbles", value: 'effervescent' }
                    ]
                },
                {
                    id: 'focus',
                    text: "Right now, your attention is primarily on:",
                    options: [
                        { text: "What needs to be done today", value: 'immediate' },
                        { text: "Where you're headed this month", value: 'near_future' },
                        { text: "Big picture life vision", value: 'far_future' },
                        { text: "The present moment only", value: 'present' }
                    ]
                },
                {
                    id: 'stress_response',
                    text: "When pressure builds, you naturally:",
                    options: [
                        { text: "Get very focused and efficient", value: 'focus_mode' },
                        { text: "Need to talk it through", value: 'verbal' },
                        { text: "Find a quiet space to think", value: 'withdrawal' },
                        { text: "Get physical (walk, clean, exercise)", value: 'physical' }
                    ]
                },
                {
                    id: 'social_energy',
                    text: "Social interactions typically leave you feeling:",
                    options: [
                        { text: "Energized and inspired", value: 'energized' },
                        { text: "Thoughtful and reflective", value: 'reflective' },
                        { text: "Ready for quiet time", value: 'drained' },
                        { text: "Depends on the people", value: 'selective' }
                    ]
                },
                {
                    id: 'change_response',
                    text: "Unexpected changes usually feel:",
                    options: [
                        { text: "Like exciting opportunities", value: 'opportunity' },
                        { text: "Like welcome disruptions", value: 'disruption' },
                        { text: "Like manageable challenges", value: 'challenge' },
                        { text: "Like temporary storms", value: 'storm' }
                    ]
                }
            ];
            
            this.states = {
                analytical: { 
                    name: 'Analytical Mind', 
                    emoji: '🧮', 
                    color: '#00f5ff',
                    description: 'Your system is operating in analytical precision mode'
                },
                intuitive: { 
                    name: 'Intuitive Flow', 
                    emoji: '🌊', 
                    color: '#8a2be2',
                    description: 'Your system is prioritizing intuitive understanding'
                },
                social: { 
                    name: 'Social Connection', 
                    emoji: '🤝', 
                    color: '#00f5ff',
                    description: 'Your system is seeking connection and shared experience'
                },
                creative: { 
                    name: 'Creative Spark', 
                    emoji: '✨', 
                    color: '#ffd700',
                    description: 'Your system is ready for creative expression'
                },
                reflective: { 
                    name: 'Reflective Depth', 
                    emoji: '🔮', 
                    color: '#8a2be2',
                    description: 'Your system is processing at deeper levels'
                },
                adaptive: { 
                    name: 'Adaptive Flow', 
                    emoji: '🌿', 
                    color: '#ff6b9d',
                    description: 'Your system is flexible and responsive to change'
                }
            };
        }
        
        async fetchData() {
            // No external data needed for this widget
            this.data = { ready: true };
        }
        
        render() {
            if (!this.isComplete) {
                this.renderQuestion();
            } else {
                this.renderResults();
            }
        }
        
        renderQuestion() {
            const question = this.questions[this.currentQuestion];
            const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
            const isCompact = this.config.size === 'small';
            
            let html = `
                <div class="qm-state-detector ${isCompact ? 'qm-compact' : ''}">
                    <div class="qm-header">
                        <div class="qm-icon">🧠</div>
                        <div class="qm-title">State Detector</div>
                        <div class="qm-subtitle">Question ${this.currentQuestion + 1} of ${this.questions.length}</div>
                    </div>
                    
                    <div class="qm-progress-container">
                        <div class="qm-progress-bar">
                            <div class="qm-progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <div class="qm-progress-text">${Math.round(progress)}% Complete</div>
                    </div>
                    
                    <div class="qm-question-container">
                        <div class="qm-question">${question.text}</div>
                        <div class="qm-options">
                            ${question.options.map((option, index) => `
                                <button class="qm-option-button" onclick="window.qmSelectOption('${this.config.containerId}', ${index})">
                                    <span class="qm-option-text">${option.text}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    
                    ${!isCompact ? `
                        <div class="qm-footer">
                            <div class="qm-note">Choose the option that feels most accurate right now</div>
                        </div>
                    ` : ''}
                </div>
            `;
            
            this.widget.innerHTML = html;
        }
        
        renderResults() {
            const state = this.states[this.results.primaryState];
            const isCompact = this.config.size === 'small';
            
            let html = `
                <div class="qm-state-detector ${isCompact ? 'qm-compact' : ''}">
                    <div class="qm-header">
                        <div class="qm-icon">${state.emoji}</div>
                        <div class="qm-title">Your State</div>
                        <div class="qm-subtitle">Based on your responses</div>
                    </div>
                    
                    <div class="qm-result-container">
                        <div class="qm-state-name" style="color: ${state.color}">${state.name}</div>
                        <div class="qm-state-description">${state.description}</div>
                        
                        ${!isCompact ? `
                            <div class="qm-state-insights">
                                <div class="qm-insight-item">
                                    <span class="qm-insight-label">Cognitive Load:</span>
                                    <span class="qm-insight-value">${this.results.cognitiveLoad}</span>
                                </div>
                                <div class="qm-insight-item">
                                    <span class="qm-insight-label">Energy Mode:</span>
                                    <span class="qm-insight-value">${this.results.energyMode}</span>
                                </div>
                                <div class="qm-insight-item">
                                    <span class="qm-insight-label">Focus Pattern:</span>
                                    <span class="qm-insight-value">${this.results.focusPattern}</span>
                                </div>
                            </div>
                            
                            <div class="qm-guidance">
                                <div class="qm-guidance-title">Today's Guidance</div>
                                <div class="qm-guidance-text">${this.results.guidance}</div>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="qm-actions">
                        <button class="qm-button" onclick="window.qmShowDetailedState('${this.config.containerId}')">
                            ${isCompact ? 'Learn More' : 'Full Analysis'}
                        </button>
                        ${this.config.shareable ? `
                            <button class="qm-button" onclick="window.qmShareState('${this.config.containerId}')">
                                Share
                            </button>
                        ` : ''}
                        <button class="qm-button qm-secondary" onclick="window.qmRetakeState('${this.config.containerId}')">
                            Retake
                        </button>
                    </div>
                </div>
            `;
            
            this.widget.innerHTML = html;
        }
        
        analyzeResults() {
            const answerPatterns = this.answers.map(answer => {
                const question = this.questions.find(q => q.id === answer.questionId);
                const option = question.options.find(opt => opt.value === answer.optionValue);
                return {
                    questionId: answer.questionId,
                    value: answer.optionValue,
                    category: this.getOptionCategory(answer.optionValue)
                };
            });
            
            // Determine primary state based on patterns
            const stateScores = {
                analytical: 0,
                intuitive: 0,
                social: 0,
                creative: 0,
                reflective: 0,
                adaptive: 0
            };
            
            answerPatterns.forEach(pattern => {
                switch (pattern.value) {
                    case 'analytical': stateScores.analytical += 2; break;
                    case 'intuitive': stateScores.intuitive += 2; break;
                    case 'social': stateScores.social += 2; break;
                    case 'flow': stateScores.adaptive += 1; break;
                    case 'deep': stateScores.reflective += 2; break;
                    case 'effervescent': stateScores.creative += 2; break;
                    case 'focus_mode': stateScores.analytical += 1; break;
                    case 'verbal': stateScores.social += 1; break;
                    case 'withdrawal': stateScores.reflective += 1; break;
                    case 'physical': stateScores.creative += 1; break;
                    case 'energized': stateScores.social += 1; break;
                    case 'reflective': stateScores.reflective += 1; break;
                    case 'opportunity': stateScores.adaptive += 2; break;
                    case 'disruption': stateScores.creative += 1; break;
                    case 'challenge': stateScores.analytical += 1; break;
                    case 'storm': stateScores.adaptive += 1; break;
                }
            });
            
            // Find primary state
            const primaryState = Object.keys(stateScores).reduce((a, b) => 
                stateScores[a] > stateScores[b] ? a : b
            );
            
            // Generate insights
            this.results = {
                primaryState,
                stateScores,
                cognitiveLoad: this.getCognitiveLoad(answerPatterns),
                energyMode: this.getEnergyMode(answerPatterns),
                focusPattern: this.getFocusPattern(answerPatterns),
                guidance: this.getGuidance(primaryState, answerPatterns)
            };
            
            this.isComplete = true;
        }
        
        getOptionCategory(value) {
            const categories = {
                analytical: 'thinking',
                intuitive: 'intuitive',
                social: 'social',
                flow: 'energy',
                deep: 'reflective',
                effervescent: 'creative',
                // ... more mappings
            };
            return categories[value] || 'neutral';
        }
        
        getCognitiveLoad(patterns) {
            const focusPatterns = patterns.filter(p => 
                ['immediate', 'present'].includes(p.value)
            ).length;
            
            if (focusPatterns >= 2) return 'High (Immediate Focus)';
            if (focusPatterns === 1) return 'Moderate (Balanced)';
            return 'Low (Big Picture)';
        }
        
        getEnergyMode(patterns) {
            const energyPatterns = patterns.filter(p => 
                ['flow', 'energized', 'effervescent'].includes(p.value)
            ).length;
            
            if (energyPatterns >= 2) return 'Active & Engaged';
            if (energyPatterns === 1) return 'Balanced';
            return 'Conserving Energy';
        }
        
        getFocusPattern(patterns) {
            const timeFocus = patterns.find(p => 
                ['immediate', 'near_future', 'far_future', 'present'].includes(p.value)
            );
            
            const focusMap = {
                immediate: 'Tactical (Today)',
                near_future: 'Strategic (This Month)',
                far_future: 'Visionary (Long-term)',
                present: 'Mindful (Right Now)'
            };
            
            return focusMap[timeFocus?.value] || 'Adaptive';
        }
        
        getGuidance(primaryState, patterns) {
            const guidance = {
                analytical: "Your analytical mind is sharp today. Use this clarity for planning, organizing, and problem-solving. Consider breaking down complex projects into manageable steps.",
                intuitive: "Your intuition is heightened. Trust your gut feelings, especially in personal decisions. Consider journaling or creative activities to capture insights.",
                social: "Your system is primed for connection. Engage in meaningful conversations, collaborative work, or community activities. Your social intelligence is at its peak.",
                creative: "Creative energy is flowing freely. This is ideal for brainstorming, artistic expression, or innovative thinking. Don't censor your ideas - capture them all.",
                reflective: "Your system is processing deeply. Honor this by allowing quiet time, reflection, or journaling. Deep insights are emerging beneath the surface.",
                adaptive: "You're flexible and responsive to change. Use this adaptability to handle unexpected opportunities or challenges with grace and resourcefulness."
            };
            
            return guidance[primaryState] || "Your system is uniquely balanced today. Trust your inner guidance and proceed with confidence.";
        }
        
        selectAnswer(optionIndex) {
            const question = this.questions[this.currentQuestion];
            const selectedOption = question.options[optionIndex];
            
            this.answers.push({
                questionId: question.id,
                optionValue: selectedOption.value,
                optionText: selectedOption.text
            });
            
            this.trackAnalytics('answer_selected', {
                question: question.id,
                answer: selectedOption.value
            });
            
            if (this.currentQuestion < this.questions.length - 1) {
                this.currentQuestion++;
                this.render();
            } else {
                this.analyzeResults();
                this.render();
                this.trackAnalytics('assessment_complete', {
                    state: this.results.primaryState
                });
            }
        }
        
        getCustomStyles() {
            const isCompact = this.config.size === 'small';
            
            return `
                .qm-state-detector {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                
                .qm-header {
                    text-align: center;
                    margin-bottom: ${isCompact ? '15px' : '20px'};
                }
                
                .qm-progress-container {
                    margin-bottom: ${isCompact ? '15px' : '25px'};
                }
                
                .qm-progress-bar {
                    width: 100%;
                    height: ${isCompact ? '4px' : '6px'};
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: ${isCompact ? '2px' : '3px'};
                    overflow: hidden;
                    margin-bottom: 8px;
                }
                
                .qm-progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #ffd700, #ff6b9d, #8a2be2);
                    transition: width 0.5s ease;
                }
                
                .qm-progress-text {
                    text-align: center;
                    font-size: ${isCompact ? '0.75em' : '0.85em'};
                    opacity: 0.8;
                }
                
                .qm-question-container {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                
                .qm-question {
                    text-align: center;
                    font-size: ${isCompact ? '1em' : '1.2em'};
                    margin-bottom: ${isCompact ? '15px' : '25px'};
                    font-weight: 500;
                    line-height: 1.4;
                }
                
                .qm-options {
                    display: flex;
                    flex-direction: column;
                    gap: ${isCompact ? '8px' : '12px'};
                }
                
                .qm-option-button {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 215, 0, 0.2);
                    color: #f0e6ff;
                    padding: ${isCompact ? '10px 15px' : '15px 20px'};
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: left;
                    font-size: ${isCompact ? '0.9em' : '1em'};
                }
                
                .qm-option-button:hover {
                    background: rgba(255, 215, 0, 0.1);
                    border-color: rgba(255, 215, 0, 0.4);
                    transform: translateY(-2px);
                }
                
                .qm-option-button:active {
                    transform: translateY(0);
                }
                
                .qm-result-container {
                    text-align: center;
                    margin-bottom: ${isCompact ? '15px' : '20px'};
                }
                
                .qm-state-name {
                    font-size: ${isCompact ? '1.5em' : '1.8em'};
                    font-weight: 600;
                    margin-bottom: 10px;
                }
                
                .qm-state-description {
                    font-size: ${isCompact ? '0.9em' : '1em'};
                    opacity: 0.9;
                    margin-bottom: ${isCompact ? '15px' : '20px'};
                    line-height: 1.5;
                }
                
                .qm-state-insights {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                    padding: 15px;
                    margin-bottom: 15px;
                    text-align: left;
                }
                
                .qm-insight-item {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 8px;
                    font-size: 0.9em;
                }
                
                .qm-insight-label {
                    opacity: 0.7;
                }
                
                .qm-insight-value {
                    color: #ffd700;
                    font-weight: 500;
                }
                
                .qm-guidance {
                    background: rgba(255, 215, 0, 0.1);
                    border: 1px solid rgba(255, 215, 0, 0.2);
                    border-radius: 8px;
                    padding: 15px;
                    margin-bottom: 15px;
                }
                
                .qm-guidance-title {
                    font-weight: 600;
                    margin-bottom: 8px;
                    color: #ffd700;
                }
                
                .qm-guidance-text {
                    font-size: 0.9em;
                    line-height: 1.5;
                }
                
                .qm-actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    justify-content: center;
                    margin-top: auto;
                }
                
                .qm-secondary {
                    background: rgba(255, 255, 255, 0.1);
                    color: #e2e8f0;
                }
                
                .qm-secondary:hover {
                    background: rgba(255, 255, 255, 0.15);
                }
                
                .qm-footer {
                    text-align: center;
                    margin-top: auto;
                    padding-top: 15px;
                }
                
                .qm-note {
                    font-size: ${isCompact ? '0.75em' : '0.85em'};
                    opacity: 0.6;
                    font-style: italic;
                }
                
                @media (max-width: 400px) {
                    .qm-actions {
                        flex-direction: column;
                    }
                    .qm-button {
                        font-size: 0.85em;
                    }
                }
            `;
        }
        
        attachEventListeners() {
            // Event listeners are handled via onclick attributes for simplicity
        }
    }
    
    // Register the widget
    window.QuantumMerlin.registerWidget('state-detector', StateDetectorWidget);
    
    // Global helper functions
    window.qmSelectOption = function(containerId, optionIndex) {
        const container = document.getElementById(containerId);
        const widget = container.shadowRoot.querySelector('.qm-state-detector');
        const widgetInstance = container._widgetInstance;
        
        if (widgetInstance) {
            widgetInstance.selectAnswer(optionIndex);
        }
    };
    
    window.qmShowDetailedState = function(containerId) {
        window.open('https://quantummerlin.com/tools/latent-state-detector', '_blank');
    };
    
    window.qmShareState = function(containerId) {
        const container = document.getElementById(containerId);
        const widgetInstance = container._widgetInstance;
        
        if (widgetInstance && widgetInstance.results) {
            const state = widgetInstance.states[widgetInstance.results.primaryState];
            const text = `My current state: ${state.emoji} ${state.name}. Discover yours with Quantum Merlin!`;
            const url = window.location.href;
            
            if (navigator.share) {
                navigator.share({ title: 'My State', text, url });
            } else {
                navigator.clipboard.writeText(`${text} ${url}`);
                alert('State result copied to clipboard!');
            }
        }
    };
    
    window.qmRetakeState = function(containerId) {
        const container = document.getElementById(containerId);
        const widgetInstance = container._widgetInstance;
        
        if (widgetInstance) {
            widgetInstance.currentQuestion = 0;
            widgetInstance.answers = [];
            widgetInstance.results = null;
            widgetInstance.isComplete = false;
            widgetInstance.render();
        }
    };
    
})();