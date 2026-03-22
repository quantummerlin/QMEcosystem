/* ============================================
   SKILLS & MEMORY SYSTEM
   Modular prompt blocks + persistent memory
   ============================================ */

/* --- Default Skills --- */
const DEFAULT_SKILLS = [
  {
    id: 'clear_concise',
    name: 'Clear and Concise',
    desc: 'Respond in a direct, well-structured manner. Avoid unnecessary filler.',
    prompt: 'Be clear and concise in your responses. Structure your answers logically. Avoid filler words, unnecessary hedging, or overly verbose explanations unless the user explicitly asks for detail.',
    enabled: true
  },
  {
    id: 'step_by_step',
    name: 'Step-by-Step Reasoning',
    desc: 'Break complex problems into numbered steps before answering.',
    prompt: 'When faced with complex questions, break the problem into clear numbered steps. Show your reasoning process before giving the final answer.',
    enabled: false
  },
  {
    id: 'code_expert',
    name: 'Code Expert',
    desc: 'Produce clean, well-commented code with best practices.',
    prompt: 'When writing code: use best practices, include helpful comments, handle edge cases, and prefer readable code over clever one-liners. Always specify the language. If asked to fix code, explain what was wrong before providing the fix.',
    enabled: false
  },
  {
    id: 'creative_writer',
    name: 'Creative Writer',
    desc: 'Engage vivid, literary prose with strong voice.',
    prompt: 'Write with vivid imagery, varied sentence structure, and a strong narrative voice. Use literary techniques where appropriate. Prioritise showing over telling. Avoid cliches.',
    enabled: false
  },
  {
    id: 'research_analyst',
    name: 'Research Analyst',
    desc: 'Provide thorough, well-sourced analysis with evidence.',
    prompt: 'Approach topics like a research analyst. Provide thorough analysis backed by evidence and logical reasoning. Present multiple perspectives when relevant. Distinguish between established facts and speculation. Cite specific details.',
    enabled: false
  },
  {
    id: 'eli5',
    name: 'Explain Simply',
    desc: 'Explain concepts as if to someone with no background.',
    prompt: 'Explain concepts in simple, accessible language. Use analogies and everyday examples. Avoid jargon unless you immediately define it. Assume the reader has no prior knowledge of the topic.',
    enabled: false
  },
  {
    id: 'debate_mode',
    name: 'Balanced Debate',
    desc: 'Present arguments from all sides fairly before concluding.',
    prompt: 'When discussing debatable topics, present strong arguments from all major perspectives fairly and thoroughly. Identify the strongest points on each side. Only offer your assessment after presenting all views.',
    enabled: false
  },
  {
    id: 'strict_factual',
    name: 'Strict Factual',
    desc: 'Only state verified facts. Flag uncertainty clearly.',
    prompt: 'Only state information you are confident is factually accurate. If uncertain, explicitly say so. Never present speculation as fact. Distinguish clearly between established knowledge and your reasoning or inference.',
    enabled: false
  }
];

/* --- Default Memory Items --- */
const DEFAULT_MEMORY = [
  {
    id: 'user_preferences',
    label: 'Your Preferences',
    value: '',
    placeholder: 'e.g. I prefer British English. I work in data science. Keep responses under 500 words unless I ask for more.'
  },
  {
    id: 'user_context',
    label: 'About You',
    value: '',
    placeholder: 'e.g. My name is Alex. I am building a SaaS product. I use Python and TypeScript.'
  },
  {
    id: 'custom_instructions',
    label: 'Custom Instructions',
    value: '',
    placeholder: 'e.g. Always suggest alternatives. End code blocks with a brief explanation. Never use placeholder data.'
  }
];

/* --- Skills Manager --- */
const SkillsManager = {
  STORAGE_KEY: 'qm_skills',

  load() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults to pick up any new skills added
        return DEFAULT_SKILLS.map(def => {
          const saved_skill = parsed.find(s => s.id === def.id);
          if (saved_skill) {
            return { ...def, enabled: saved_skill.enabled, prompt: saved_skill.prompt || def.prompt };
          }
          return { ...def };
        });
      }
    } catch (e) {
      console.warn('Failed to load skills:', e);
    }
    return DEFAULT_SKILLS.map(s => ({ ...s }));
  },

  save(skills) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(skills));
    } catch (e) {
      console.warn('Failed to save skills:', e);
    }
  },

  restoreDefaults() {
    const defaults = DEFAULT_SKILLS.map(s => ({ ...s }));
    this.save(defaults);
    return defaults;
  },

  getActivePrompts(skills) {
    return skills
      .filter(s => s.enabled)
      .map(s => s.prompt);
  },

  buildSkillsBlock(skills) {
    const active = this.getActivePrompts(skills);
    if (active.length === 0) return '';
    return '## Active Skills\n' + active.map((p, i) => `${i + 1}. ${p}`).join('\n');
  }
};

/* --- Memory Manager --- */
const MemoryManager = {
  STORAGE_KEY: 'qm_memory',

  load() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return DEFAULT_MEMORY.map(def => {
          const saved_mem = parsed.find(m => m.id === def.id);
          if (saved_mem) {
            return { ...def, value: saved_mem.value || '' };
          }
          return { ...def };
        });
      }
    } catch (e) {
      console.warn('Failed to load memory:', e);
    }
    return DEFAULT_MEMORY.map(m => ({ ...m }));
  },

  save(memory) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(memory));
    } catch (e) {
      console.warn('Failed to save memory:', e);
    }
  },

  restoreDefaults() {
    const defaults = DEFAULT_MEMORY.map(m => ({ ...m }));
    this.save(defaults);
    return defaults;
  },

  buildMemoryBlock(memory) {
    const filled = memory.filter(m => m.value && m.value.trim());
    if (filled.length === 0) return '';
    return '## User Memory\n' + filled.map(m => `- ${m.label}: ${m.value.trim()}`).join('\n');
  }
};