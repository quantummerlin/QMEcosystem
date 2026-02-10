/* ============================================
   MOMENT IN TIME - COSMIC CALCULATION ENGINE
   All calculations from Wayne Michael's book
   ============================================ */

const CosmicEngine = {

  // ==========================================
  // NUMEROLOGY ENGINE
  // ==========================================

  numerology: {
    letterValues: {A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8},
    vowels: new Set(['A','E','I','O','U']),

    reduceNumber(n) {
      while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
        n = String(n).split('').reduce((a, b) => a + parseInt(b), 0);
      }
      return n;
    },

    reduceToSingle(n) {
      while (n > 9) {
        n = String(n).split('').reduce((a, b) => a + parseInt(b), 0);
      }
      return n;
    },

    lifePathNumber(month, day, year) {
      const m = this.reduceNumber(month);
      const d = this.reduceNumber(day);
      const y = this.reduceNumber(String(year).split('').reduce((a, b) => a + parseInt(b), 0));
      const total = m + d + y;
      return this.reduceNumber(total);
    },

    destinyNumber(fullName) {
      const letters = fullName.toUpperCase().replace(/[^A-Z]/g, '');
      const sum = letters.split('').reduce((a, l) => a + (this.letterValues[l] || 0), 0);
      return this.reduceNumber(sum);
    },

    soulUrgeNumber(fullName) {
      const letters = fullName.toUpperCase().replace(/[^A-Z]/g, '');
      const sum = letters.split('').filter(l => this.vowels.has(l)).reduce((a, l) => a + (this.letterValues[l] || 0), 0);
      return this.reduceNumber(sum);
    },

    personalityNumber(fullName) {
      const letters = fullName.toUpperCase().replace(/[^A-Z]/g, '');
      const sum = letters.split('').filter(l => !this.vowels.has(l)).reduce((a, l) => a + (this.letterValues[l] || 0), 0);
      return this.reduceNumber(sum);
    },

    birthdayNumber(day) {
      return this.reduceNumber(day);
    },

    personalYear(birthMonth, birthDay, currentYear) {
      const m = this.reduceNumber(birthMonth);
      const d = this.reduceNumber(birthDay);
      const y = this.reduceNumber(String(currentYear).split('').reduce((a, b) => a + parseInt(b), 0));
      return this.reduceNumber(m + d + y);
    },

    personalMonth(personalYear, currentMonth) {
      return this.reduceNumber(personalYear + currentMonth);
    },

    personalDay(personalMonth, currentDay) {
      return this.reduceNumber(personalMonth + currentDay);
    },

    universalDay(month, day, year) {
      const sum = String(month).split('').reduce((a,b)=>a+parseInt(b),0)
        + String(day).split('').reduce((a,b)=>a+parseInt(b),0)
        + String(year).split('').reduce((a,b)=>a+parseInt(b),0);
      return this.reduceNumber(sum);
    },

    maturityNumber(lifePath, destiny) {
      return this.reduceNumber(lifePath + destiny);
    },

    // Pinnacles
    pinnacles(month, day, year) {
      const m = this.reduceNumber(month);
      const d = this.reduceNumber(day);
      const y = this.reduceNumber(String(year).split('').reduce((a, b) => a + parseInt(b), 0));
      const lp = this.lifePathNumber(month, day, year);
      const firstEnd = 36 - this.reduceToSingle(lp);
      return [
        { num: this.reduceNumber(m + d), ages: `Birth to ${firstEnd}` },
        { num: this.reduceNumber(d + y), ages: `${firstEnd + 1} to ${firstEnd + 9}` },
        { num: this.reduceNumber(this.reduceNumber(m + d) + this.reduceNumber(d + y)), ages: `${firstEnd + 10} to ${firstEnd + 18}` },
        { num: this.reduceNumber(m + y), ages: `${firstEnd + 19} onwards` }
      ];
    },

    // Challenges
    challenges(month, day, year) {
      const m = this.reduceNumber(month);
      const d = this.reduceNumber(day);
      const y = this.reduceNumber(String(year).split('').reduce((a, b) => a + parseInt(b), 0));
      const first = Math.abs(m - d);
      const second = Math.abs(d - y);
      const main = Math.abs(first - second);
      const fourth = Math.abs(m - y);
      return [
        this.reduceToSingle(first),
        this.reduceToSingle(second),
        this.reduceToSingle(main),
        this.reduceToSingle(fourth)
      ];
    },

    // Karmic debt check
    hasKarmicDebt(num) {
      return [13, 14, 16, 19].includes(num);
    }
  },

  // ==========================================
  // WESTERN ASTROLOGY ENGINE
  // ==========================================

  astrology: {
    signs: ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'],
    symbols: ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'],
    elements: ['Fire','Earth','Air','Water','Fire','Earth','Air','Water','Fire','Earth','Air','Water'],
    modalities: ['Cardinal','Fixed','Mutable','Cardinal','Fixed','Mutable','Cardinal','Fixed','Mutable','Cardinal','Fixed','Mutable'],
    rulers: ['Mars','Venus','Mercury','Moon','Sun','Mercury','Venus','Pluto','Jupiter','Saturn','Uranus','Neptune'],
    elementColors: { Fire: '#ef4444', Earth: '#4ade80', Air: '#60a5fa', Water: '#8b5cf6' },

    getSunSign(month, day) {
      // Accurate zodiac date ranges (signs array: 0=Aries..11=Pisces)
      // Aries: Mar 21 - Apr 19, Taurus: Apr 20 - May 20, Gemini: May 21 - Jun 20
      // Cancer: Jun 21 - Jul 22, Leo: Jul 23 - Aug 22, Virgo: Aug 23 - Sep 22
      // Libra: Sep 23 - Oct 22, Scorpio: Oct 23 - Nov 21, Sagittarius: Nov 22 - Dec 21
      // Capricorn: Dec 22 - Jan 19, Aquarius: Jan 20 - Feb 18, Pisces: Feb 19 - Mar 20
      const ranges = [
        { sign: 9,  startM: 1,  startD: 1,  endM: 1,  endD: 19 },  // Capricorn
        { sign: 10, startM: 1,  startD: 20, endM: 2,  endD: 18 },  // Aquarius
        { sign: 11, startM: 2,  startD: 19, endM: 3,  endD: 20 },  // Pisces
        { sign: 0,  startM: 3,  startD: 21, endM: 4,  endD: 19 },  // Aries
        { sign: 1,  startM: 4,  startD: 20, endM: 5,  endD: 20 },  // Taurus
        { sign: 2,  startM: 5,  startD: 21, endM: 6,  endD: 20 },  // Gemini
        { sign: 3,  startM: 6,  startD: 21, endM: 7,  endD: 22 },  // Cancer
        { sign: 4,  startM: 7,  startD: 23, endM: 8,  endD: 22 },  // Leo
        { sign: 5,  startM: 8,  startD: 23, endM: 9,  endD: 22 },  // Virgo
        { sign: 6,  startM: 9,  startD: 23, endM: 10, endD: 22 },  // Libra
        { sign: 7,  startM: 10, startD: 23, endM: 11, endD: 21 },  // Scorpio
        { sign: 8,  startM: 11, startD: 22, endM: 12, endD: 21 },  // Sagittarius
        { sign: 9,  startM: 12, startD: 22, endM: 12, endD: 31 }   // Capricorn
      ];
      for (const r of ranges) {
        if (r.startM === r.endM) {
          if (month === r.startM && day >= r.startD && day <= r.endD) return r.sign;
        } else {
          if ((month === r.startM && day >= r.startD) || (month === r.endM && day <= r.endD)) return r.sign;
        }
      }
      return 9; // Capricorn fallback
    },

    getSignIndex(signName) {
      return this.signs.indexOf(signName);
    },

    getElement(signIndex) { return this.elements[signIndex]; },
    getModality(signIndex) { return this.modalities[signIndex]; },
    getRuler(signIndex) { return this.rulers[signIndex]; },

    // Current planetary transits (simplified - based on known orbital periods)
    getCurrentTransits(date) {
      const jd = this._julianDay(date);
      // Simplified planetary positions using mean orbital elements
      const sunLong = this._normalize((jd - 2451545.0) * 0.9856474 + 280.46646);
      const moonLong = this._normalize((jd - 2451545.0) * 13.17639648 + 218.3165);
      const mercLong = this._normalize((jd - 2451545.0) * 4.09233445 + 252.251);
      const venusLong = this._normalize((jd - 2451545.0) * 1.60213034 + 181.9797);
      const marsLong = this._normalize((jd - 2451545.0) * 0.52402068 + 355.433);
      const jupLong = this._normalize((jd - 2451545.0) * 0.08308529 + 34.3515);
      const satLong = this._normalize((jd - 2451545.0) * 0.03344414 + 50.0774);

      return {
        sun: this._longToSign(sunLong),
        moon: this._longToSign(moonLong),
        mercury: this._longToSign(mercLong),
        venus: this._longToSign(venusLong),
        mars: this._longToSign(marsLong),
        jupiter: this._longToSign(jupLong),
        saturn: this._longToSign(satLong),
        sunDeg: sunLong,
        moonDeg: moonLong
      };
    },

    _julianDay(date) {
      let y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate();
      if (m <= 2) { y--; m += 12; }
      const A = Math.floor(y / 100);
      const B = 2 - A + Math.floor(A / 4);
      return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
    },

    _normalize(deg) { return ((deg % 360) + 360) % 360; },

    _longToSign(longitude) {
      const idx = Math.floor(longitude / 30) % 12;
      return { index: idx, sign: this.signs[idx], degree: longitude % 30 };
    },

    // Aspect calculation between two sign indices
    getAspect(sign1Idx, sign2Idx) {
      const diff = Math.abs(sign1Idx - sign2Idx);
      const d = Math.min(diff, 12 - diff);
      if (d === 0) return { type: 'Conjunction', nature: 'powerful', symbol: '☌' };
      if (d === 2) return { type: 'Sextile', nature: 'harmonious', symbol: '⚹' };
      if (d === 3) return { type: 'Square', nature: 'challenging', symbol: '□' };
      if (d === 4) return { type: 'Trine', nature: 'flowing', symbol: '△' };
      if (d === 6) return { type: 'Opposition', nature: 'tension', symbol: '☍' };
      return { type: 'None', nature: 'neutral', symbol: '·' };
    },

    // Daily transit aspects to natal chart
    getDailyAspects(natalSignIdx, transits) {
      const aspects = [];
      const planets = ['sun','moon','mercury','venus','mars','jupiter','saturn'];
      const names = ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'];
      planets.forEach((p, i) => {
        const asp = this.getAspect(natalSignIdx, transits[p].index);
        if (asp.type !== 'None') {
          aspects.push({ planet: names[i], ...asp, transitSign: transits[p].sign });
        }
      });
      return aspects;
    }
  },

  // ==========================================
  // MOON PHASE ENGINE
  // ==========================================

  moonPhase: {
    phases: [
      { name: 'New Moon', emoji: '🌑', energy: 'New beginnings, setting intentions, planting seeds' },
      { name: 'Waxing Crescent', emoji: '🌒', energy: 'Building momentum, taking first steps, courage' },
      { name: 'First Quarter', emoji: '🌓', energy: 'Action, decisions, overcoming obstacles' },
      { name: 'Waxing Gibbous', emoji: '🌔', energy: 'Refining, adjusting, patience and trust' },
      { name: 'Full Moon', emoji: '🌕', energy: 'Culmination, illumination, release and celebration' },
      { name: 'Waning Gibbous', emoji: '🌖', energy: 'Gratitude, sharing wisdom, teaching' },
      { name: 'Last Quarter', emoji: '🌗', energy: 'Letting go, forgiveness, clearing space' },
      { name: 'Waning Crescent', emoji: '🌘', energy: 'Rest, surrender, spiritual preparation, intuition' }
    ],

    calculate(date) {
      // Highly accurate moon phase using Jean Meeus "Astronomical Algorithms"
      // Uses lunation-based new moon finder with perturbation corrections
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      
      // Calculate Julian Day Number (at noon UTC for best accuracy)
      let y = year, m = month;
      if (m <= 2) { y--; m += 12; }
      const A = Math.floor(y / 100);
      const B = 2 - A + Math.floor(A / 4);
      const JD = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5 + 0.5;
      
      // Meeus new moon calculator
      const NM_OFFSET = 0.61; // Empirical correction for phase boundary accuracy
      const decimalYear = year + (month - 1) / 12.0 + (day - 1) / 365.25;
      let k = Math.floor((decimalYear - 2000.0) * 12.3685);
      
      const newMoonJDE = (kVal) => {
        const T = kVal / 1236.85;
        let JDE = 2451550.09766 + 29.530588861 * kVal
          + 0.00015437 * T * T
          - 0.000000150 * T * T * T
          + 0.00000000073 * T * T * T * T;
        
        const E = 1 - 0.002516 * T - 0.0000074 * T * T;
        const toRad = (deg) => deg * Math.PI / 180;
        
        const M  = toRad((2.5534 + 29.10535670 * kVal - 0.0000014 * T * T - 0.00000011 * T * T * T) % 360);
        const Mp = toRad((201.5643 + 385.81693528 * kVal + 0.0107582 * T * T + 0.00001238 * T * T * T - 0.000000058 * T * T * T * T) % 360);
        const F  = toRad((160.7108 + 390.67050284 * kVal - 0.0016118 * T * T - 0.00000227 * T * T * T + 0.000000011 * T * T * T * T) % 360);
        const Om = toRad((124.7746 - 1.56375588 * kVal + 0.0020672 * T * T + 0.00000215 * T * T * T) % 360);
        
        const corr = -0.40720 * Math.sin(Mp)
          + 0.17241 * E * Math.sin(M)
          + 0.01608 * Math.sin(2*Mp)
          + 0.01039 * Math.sin(2*F)
          + 0.00739 * E * Math.sin(Mp - M)
          - 0.00514 * E * Math.sin(Mp + M)
          + 0.00208 * E * E * Math.sin(2*M)
          - 0.00111 * Math.sin(Mp - 2*F)
          - 0.00057 * Math.sin(Mp + 2*F)
          + 0.00056 * E * Math.sin(2*Mp + M)
          - 0.00042 * Math.sin(3*Mp)
          + 0.00042 * E * Math.sin(M + 2*F)
          + 0.00038 * E * Math.sin(M - 2*F)
          - 0.00024 * E * Math.sin(2*Mp - M)
          - 0.00017 * Math.sin(Om);
        
        const A1 = toRad((299.77 + 132.8475848 * kVal - 0.009173 * T * T) % 360);
        const addCorr = 0.000325 * Math.sin(A1);
        
        return JDE + corr + addCorr - NM_OFFSET;
      };
      
      // Find the new moon just before our date
      let nmJde = newMoonJDE(k);
      while (nmJde > JD) { k--; nmJde = newMoonJDE(k); }
      let nmNext = newMoonJDE(k + 1);
      while (nmNext <= JD) { k++; nmJde = newMoonJDE(k); nmNext = newMoonJDE(k + 1); }
      
      // Calculate phase metrics
      const age = JD - nmJde;
      const cycleLength = nmNext - nmJde;
      const phase = age / cycleLength;
      const illumination = Math.round((1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100);
      const waxing = phase < 0.5;
      
      // Determine phase index with boundary snap for accuracy
      const raw = phase * 8;
      let phaseIndex = Math.floor(raw) % 8;
      const frac = raw - Math.floor(raw);
      
      // Snap to next phase if very close to boundary AND illumination confirms
      if (frac > 0.85) {
        const nextIdx = (phaseIndex + 1) % 8;
        if (nextIdx === 4 && illumination > 95) phaseIndex = 4;       // Snap to Full Moon
        else if (nextIdx === 0 && illumination < 5 && phase < 0.5) phaseIndex = 0; // Snap to New Moon (only waxing side)
        else if (nextIdx === 2 && illumination >= 40 && illumination <= 60 && waxing) phaseIndex = 2;  // Snap to First Quarter
        else if (nextIdx === 6 && illumination >= 40 && illumination <= 65 && !waxing) phaseIndex = 6; // Snap to Last Quarter
      }
      
      return {
        ...this.phases[phaseIndex],
        index: phaseIndex,
        illumination: illumination,
        age: Math.round(age * 10) / 10
      };
    }
  },

  // ==========================================
  // CHINESE ZODIAC ENGINE
  // ==========================================

  chineseZodiac: {
    animals: ['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig'],
    animalEmojis: ['🐀','🐂','🐅','🐇','🐉','🐍','🐴','🐐','🵊','🐓','🐕','🐷'],
    elements: ['Metal','Metal','Water','Water','Wood','Wood','Fire','Fire','Earth','Earth'],
    elementNames: ['Metal','Water','Wood','Fire','Earth'],
    elementEmojis: ['⚔️','💧','🌿','🔥','🌍'],
    elementEmojiMap: { Metal: '⚔️', Water: '💧', Wood: '🌿', Fire: '🔥', Earth: '🌍' },
    
    traits: {
      Rat: { strengths: 'Quick-witted, resourceful, versatile', shadow: 'Cunning, selfish, manipulative' },
      Ox: { strengths: 'Diligent, dependable, strong', shadow: 'Stubborn, narrow-minded, rigid' },
      Tiger: { strengths: 'Brave, confident, competitive', shadow: 'Arrogant, reckless, impatient' },
      Rabbit: { strengths: 'Quiet, elegant, kind', shadow: 'Timid, conservative, superficial' },
      Dragon: { strengths: 'Confident, intelligent, enthusiastic', shadow: 'Aggressive, demanding, impulsive' },
      Snake: { strengths: 'Enigmatic, intelligent, wise', shadow: 'Jealous, suspicious, cold' },
      Horse: { strengths: 'Animated, active, energetic', shadow: 'Impatient, hot-headed, wasteful' },
      Goat: { strengths: 'Calm, gentle, sympathetic', shadow: 'Indecisive, timid, pessimistic' },
      Monkey: { strengths: 'Sharp, smart, curious', shadow: 'Erratic, dishonest, restless' },
      Rooster: { strengths: 'Observant, hardworking, confident', shadow: 'Critical, perfectionist, boastful' },
      Dog: { strengths: 'Loyal, honest, amiable', shadow: 'Anxious, pessimistic, stubborn' },
      Pig: { strengths: 'Compassionate, generous, diligent', shadow: 'Naive, gullible, materialistic' }
    },

    compatibility: {
      Rat: { best: ['Dragon','Monkey','Ox'], worst: ['Horse','Rabbit'] },
      Ox: { best: ['Rat','Snake','Rooster'], worst: ['Tiger','Dragon','Horse','Goat'] },
      Tiger: { best: ['Dragon','Horse','Pig'], worst: ['Ox','Tiger','Snake','Monkey'] },
      Rabbit: { best: ['Goat','Monkey','Dog','Pig'], worst: ['Snake','Rooster'] },
      Dragon: { best: ['Rooster','Rat','Monkey'], worst: ['Ox','Goat','Dog'] },
      Snake: { best: ['Dragon','Rooster'], worst: ['Tiger','Rabbit','Snake','Pig'] },
      Horse: { best: ['Tiger','Goat','Rabbit'], worst: ['Rat','Ox','Rooster'] },
      Goat: { best: ['Rabbit','Horse','Pig'], worst: ['Ox','Tiger','Dog'] },
      Monkey: { best: ['Ox','Rabbit'], worst: ['Tiger','Pig'] },
      Rooster: { best: ['Ox','Snake'], worst: ['Rat','Rabbit','Horse','Rooster','Dog'] },
      Dog: { best: ['Rabbit','Tiger','Horse'], worst: ['Dragon','Goat','Rooster'] },
      Pig: { best: ['Tiger','Rabbit','Goat'], worst: ['Snake','Monkey'] }
    },

    calculate(year) {
      const animalIdx = (year - 4) % 12;
      // Heavenly stem element: last digit of year determines element
      // 0,1=Metal  2,3=Water  4,5=Wood  6,7=Fire  8,9=Earth
      const lastDigit = year % 10;
      const elementMap = { 0:'Metal', 1:'Metal', 2:'Water', 3:'Water', 4:'Wood', 5:'Wood', 6:'Fire', 7:'Fire', 8:'Earth', 9:'Earth' };
      const element = elementMap[lastDigit];
      const animal = this.animals[animalIdx];
      return {
        animal,
        emoji: this.animalEmojis[animalIdx],
        element: element,
        elementEmoji: this.elementEmojiMap[element],
        yinYang: year % 2 === 0 ? 'Yang' : 'Yin',
        traits: this.traits[animal],
        compatibility: this.compatibility[animal]
      };
    },

    // Current year energy
    currentYearEnergy(currentYear, birthAnimal) {
      const currentAnimal = this.animals[(currentYear - 4) % 12];
      const compat = this.compatibility[birthAnimal];
      if (compat.best.includes(currentAnimal)) return { level: 'Excellent', desc: `${currentAnimal} year harmonizes beautifully with your ${birthAnimal} energy` };
      if (compat.worst.includes(currentAnimal)) return { level: 'Challenging', desc: `${currentAnimal} year creates growth tension with your ${birthAnimal} nature` };
      return { level: 'Moderate', desc: `${currentAnimal} year brings steady, neutral energy for your ${birthAnimal} spirit` };
    }
  },

  // ==========================================
  // BIORHYTHM ENGINE
  // ==========================================

  biorhythm: {
    calculate(birthDate, targetDate) {
      const diff = Math.floor((targetDate - birthDate) / (1000 * 60 * 60 * 24));
      const physical = Math.sin(2 * Math.PI * diff / 23);
      const emotional = Math.sin(2 * Math.PI * diff / 28);
      const intellectual = Math.sin(2 * Math.PI * diff / 33);
      const intuitive = Math.sin(2 * Math.PI * diff / 38);
      const spiritual = Math.sin(2 * Math.PI * diff / 53);
      
      return {
        physical: { value: physical, percent: Math.round((physical + 1) * 50), label: 'Physical', color: '#ef4444' },
        emotional: { value: emotional, percent: Math.round((emotional + 1) * 50), label: 'Emotional', color: '#8b5cf6' },
        intellectual: { value: intellectual, percent: Math.round((intellectual + 1) * 50), label: 'Intellectual', color: '#60a5fa' },
        intuitive: { value: intuitive, percent: Math.round((intuitive + 1) * 50), label: 'Intuitive', color: '#22d3ee' },
        spiritual: { value: spiritual, percent: Math.round((spiritual + 1) * 50), label: 'Spiritual', color: '#f0c674' },
        overall: Math.round(((physical + emotional + intellectual + intuitive + spiritual) / 5 + 1) * 50)
      };
    },

    isCriticalDay(birthDate, targetDate) {
      const diff = Math.floor((targetDate - birthDate) / (1000 * 60 * 60 * 24));
      return {
        physical: diff % 23 === 0,
        emotional: diff % 28 === 0,
        intellectual: diff % 33 === 0
      };
    }
  },

  // ==========================================
  // NUMEROLOGY MEANINGS DATABASE
  // ==========================================

  meanings: {
    lifePath: {
      1: { title: 'The Pioneer', theme: 'Leadership, independence, innovation', lesson: 'Learning to lead without dominating' },
      2: { title: 'The Diplomat', theme: 'Partnership, sensitivity, cooperation', lesson: 'Learning to cooperate without losing self' },
      3: { title: 'The Communicator', theme: 'Creativity, expression, joy', lesson: 'Learning to focus creative energy' },
      4: { title: 'The Builder', theme: 'Structure, discipline, foundation', lesson: 'Learning to build without rigidity' },
      5: { title: 'The Freedom Seeker', theme: 'Change, adventure, versatility', lesson: 'Learning freedom with responsibility' },
      6: { title: 'The Nurturer', theme: 'Love, responsibility, harmony', lesson: 'Learning to care without controlling' },
      7: { title: 'The Seeker', theme: 'Wisdom, analysis, spirituality', lesson: 'Learning to trust intuition alongside logic' },
      8: { title: 'The Powerhouse', theme: 'Achievement, abundance, authority', lesson: 'Learning to use power wisely' },
      9: { title: 'The Universal Humanitarian', theme: 'Compassion, completion, service', lesson: 'Learning to release and serve with wisdom' },
      11: { title: 'The Illuminator', theme: 'Inspiration, intuition, spiritual vision', lesson: 'Learning to ground visions practically' },
      22: { title: 'The Master Builder', theme: 'Manifesting dreams, large-scale creation', lesson: 'Learning to build for humanity' },
      33: { title: 'The Master Teacher', theme: 'Healing, compassion, selfless service', lesson: 'Learning to teach through being' }
    },

    personalDay: {
      1: { theme: 'New Beginnings & Leadership', energy: 'Start projects, take initiative, be bold', color: '#ef4444', icon: '🔥' },
      2: { theme: 'Partnership & Patience', energy: 'Cooperate, listen, nurture relationships', color: '#8b5cf6', icon: '🤝' },
      3: { theme: 'Creativity & Expression', energy: 'Create, communicate, socialize, have fun', color: '#fb923c', icon: '🎨' },
      4: { theme: 'Building & Organization', energy: 'Plan, organize, build foundations, work hard', color: '#4ade80', icon: '🏗️' },
      5: { theme: 'Change & Adventure', energy: 'Embrace change, try new things, be flexible', color: '#22d3ee', icon: '✈️' },
      6: { theme: 'Love & Responsibility', energy: 'Focus on home, family, beauty, service', color: '#f472b6', icon: '💕' },
      7: { theme: 'Reflection & Wisdom', energy: 'Study, meditate, seek solitude, trust intuition', color: '#60a5fa', icon: '🔮' },
      8: { theme: 'Power & Abundance', energy: 'Business decisions, financial moves, step into authority', color: '#f0c674', icon: '👑' },
      9: { theme: 'Completion & Compassion', energy: 'Let go, forgive, serve others, complete projects', color: '#fb7185', icon: '🌟' },
      11: { theme: 'Spiritual Insight', energy: 'Trust intuition, inspire others, channel higher wisdom', color: '#c4b5fd', icon: '⚡' },
      22: { theme: 'Master Building', energy: 'Think big, plan large-scale projects, manifest dreams', color: '#2dd4bf', icon: '🌍' }
    },

    personalYear: {
      1: 'Year of new beginnings, fresh starts, and planting seeds for the future.',
      2: 'Year of patience, partnerships, and allowing things to develop naturally.',
      3: 'Year of creativity, self-expression, and social expansion.',
      4: 'Year of hard work, building foundations, and creating structure.',
      5: 'Year of change, freedom, adventure, and unexpected opportunities.',
      6: 'Year of love, family, responsibility, and creating harmony.',
      7: 'Year of inner growth, spiritual development, and seeking truth.',
      8: 'Year of power, abundance, achievement, and material success.',
      9: 'Year of completion, release, endings that make way for new beginnings.'
    }
  },

  // ==========================================
  // FORECAST GENERATOR
  // ==========================================

  generateForecast(birthData, forecastDate) {
    const { name, month, day, year, birthTime } = birthData;
    const bd = new Date(year, month - 1, day);
    const fd = forecastDate;
    const fMonth = fd.getMonth() + 1;
    const fDay = fd.getDate();
    const fYear = fd.getFullYear();

    // === NUMEROLOGY ===
    const lifePath = this.numerology.lifePathNumber(month, day, year);
    const destiny = this.numerology.destinyNumber(name);
    const soulUrge = this.numerology.soulUrgeNumber(name);
    const personality = this.numerology.personalityNumber(name);
    const birthday = this.numerology.birthdayNumber(day);
    const maturity = this.numerology.maturityNumber(lifePath, destiny);
    const personalYear = this.numerology.personalYear(month, day, fYear);
    const personalMonth = this.numerology.personalMonth(personalYear, fMonth);
    const personalDay = this.numerology.personalDay(personalMonth, fDay);
    const universalDay = this.numerology.universalDay(fMonth, fDay, fYear);
    const pinnacles = this.numerology.pinnacles(month, day, year);
    const challenges = this.numerology.challenges(month, day, year);

    // Current pinnacle
    const age = fYear - year - (fd < new Date(fYear, month - 1, day) ? 1 : 0);
    let currentPinnacle = pinnacles[3];
    for (let i = 0; i < pinnacles.length; i++) {
      const ageMatch = pinnacles[i].ages.match(/\d+/g);
      if (ageMatch) {
        const start = parseInt(ageMatch[0]) || 0;
        const end = ageMatch[1] ? parseInt(ageMatch[1]) : 999;
        if (age >= start && age <= end) { currentPinnacle = pinnacles[i]; break; }
      }
    }

    // === ASTROLOGY ===
    const sunSignIdx = this.astrology.getSunSign(month, day);
    const sunSign = this.astrology.signs[sunSignIdx];
    const sunSymbol = this.astrology.symbols[sunSignIdx];
    const sunElement = this.astrology.getElement(sunSignIdx);
    const transits = this.astrology.getCurrentTransits(fd);
    const transitAspects = this.astrology.getDailyAspects(sunSignIdx, transits);

    // Transit sun sign for the forecast day
    const transitSunSign = transits.sun.sign;
    const transitMoonSign = transits.moon.sign;

    // === MOON PHASE ===
    const moonPhase = this.moonPhase.calculate(fd);

    // === CHINESE ZODIAC ===
    const chineseZodiac = this.chineseZodiac.calculate(year);
    const currentChinese = this.chineseZodiac.calculate(fYear);
    const chineseYearEnergy = this.chineseZodiac.currentYearEnergy(fYear, chineseZodiac.animal);

    // === BIORHYTHM ===
    const biorhythm = this.biorhythm.calculate(bd, fd);
    const criticalDays = this.biorhythm.isCriticalDay(bd, fd);

    // === ENERGY SCORES ===
    const dayEnergy = this._calculateDayEnergy(personalDay, biorhythm, moonPhase, transitAspects, sunSignIdx, transits);

    // === TAROT ===
    const tarotCard = this.tarot.getCardOfDay(personalDay, universalDay, bd, fd);

    // === CRYSTAL THERAPY ===
    const crystalRec = this.crystalTherapy.getRecommendation(sunSign, personalDay);

    // === DAILY GUIDANCE ===
    const guidance = this._generateGuidance(personalDay, personalMonth, personalYear, lifePath, sunSign, moonPhase, biorhythm, transitAspects, chineseZodiac, transits, age, dayEnergy);

    return {
      name,
      age,
      forecastDate: fd,
      // Numerology
      lifePath, destiny, soulUrge, personality, birthday, maturity,
      personalYear, personalMonth, personalDay, universalDay,
      pinnacles, challenges, currentPinnacle,
      // Astrology
      sunSign, sunSignIdx, sunSymbol, sunElement,
      transits, transitSunSign, transitMoonSign, transitAspects,
      // Moon
      moonPhase,
      // Chinese
      chineseZodiac, currentChinese, chineseYearEnergy,
      // Biorhythm
      biorhythm, criticalDays,
      // Energy
      dayEnergy,
      // Tarot
      tarotCard,
      // Crystal Therapy
      crystalRec,
      // Guidance
      guidance,
      // Meanings
      lifePathMeaning: this.meanings.lifePath[lifePath] || this.meanings.lifePath[9],
      personalDayMeaning: this.meanings.personalDay[personalDay > 9 ? personalDay : personalDay] || this.meanings.personalDay[personalDay > 9 ? 11 : personalDay],
      personalYearMeaning: this.meanings.personalYear[personalYear > 9 ? this.numerology.reduceToSingle(personalYear) : personalYear]
    };
  },

  // ==========================================
  // TAROT CARD OF THE DAY
  // ==========================================

  tarot: {
    majorArcana: [
      { name: 'The Fool', number: 0, meaning: 'New beginnings, innocence, spontaneity, free spirit', reversed: 'Recklessness, taken advantage of, inconsideration', element: 'Air', emoji: '🃏' },
      { name: 'The Magician', number: 1, meaning: 'Manifestation, resourcefulness, power, inspired action', reversed: 'Manipulation, poor planning, untapped talents', element: 'Air', emoji: '🎩' },
      { name: 'The High Priestess', number: 2, meaning: 'Intuition, sacred knowledge, divine feminine, the subconscious', reversed: 'Secrets, disconnected from intuition, withdrawal', element: 'Water', emoji: '🌙' },
      { name: 'The Empress', number: 3, meaning: 'Femininity, beauty, nature, nurturing, abundance', reversed: 'Creative block, dependence on others', element: 'Earth', emoji: '👑' },
      { name: 'The Emperor', number: 4, meaning: 'Authority, establishment, structure, father figure', reversed: 'Domination, excessive control, lack of discipline', element: 'Fire', emoji: '🏛️' },
      { name: 'The Hierophant', number: 5, meaning: 'Spiritual wisdom, religious beliefs, tradition, conformity', reversed: 'Personal beliefs, freedom, challenging the status quo', element: 'Earth', emoji: '📿' },
      { name: 'The Lovers', number: 6, meaning: 'Love, harmony, relationships, values alignment, choices', reversed: 'Self-love, disharmony, imbalance, misalignment', element: 'Air', emoji: '💕' },
      { name: 'The Chariot', number: 7, meaning: 'Control, willpower, success, action, determination', reversed: 'Self-discipline, opposition, lack of direction', element: 'Water', emoji: '🏆' },
      { name: 'Strength', number: 8, meaning: 'Strength, courage, persuasion, influence, compassion', reversed: 'Inner strength, self-doubt, low energy, raw emotion', element: 'Fire', emoji: '🦁' },
      { name: 'The Hermit', number: 9, meaning: 'Soul-searching, introspection, being alone, inner guidance', reversed: 'Isolation, loneliness, withdrawal', element: 'Earth', emoji: '🏔️' },
      { name: 'Wheel of Fortune', number: 10, meaning: 'Good luck, karma, life cycles, destiny, a turning point', reversed: 'Bad luck, resistance to change, breaking cycles', element: 'Fire', emoji: '🎡' },
      { name: 'Justice', number: 11, meaning: 'Justice, fairness, truth, cause and effect, law', reversed: 'Unfairness, lack of accountability, dishonesty', element: 'Air', emoji: '⚖️' },
      { name: 'The Hanged Man', number: 12, meaning: 'Pause, surrender, letting go, new perspectives', reversed: 'Delays, resistance, stalling, indecision', element: 'Water', emoji: '🙃' },
      { name: 'Death', number: 13, meaning: 'Endings, change, transformation, transition', reversed: 'Resistance to change, personal transformation, inner purging', element: 'Water', emoji: '🦋' },
      { name: 'Temperance', number: 14, meaning: 'Balance, moderation, patience, purpose', reversed: 'Imbalance, excess, self-healing, re-alignment', element: 'Fire', emoji: '⚗️' },
      { name: 'The Devil', number: 15, meaning: 'Shadow self, attachment, addiction, restriction, sexuality', reversed: 'Releasing limiting beliefs, exploring dark thoughts, detachment', element: 'Earth', emoji: '⛓️' },
      { name: 'The Tower', number: 16, meaning: 'Sudden change, upheaval, chaos, revelation, awakening', reversed: 'Personal transformation, fear of change, averting disaster', element: 'Fire', emoji: '⚡' },
      { name: 'The Star', number: 17, meaning: 'Hope, faith, purpose, renewal, spirituality', reversed: 'Lack of faith, despair, self-trust, disconnection', element: 'Air', emoji: '⭐' },
      { name: 'The Moon', number: 18, meaning: 'Illusion, fear, anxiety, subconscious, intuition', reversed: 'Release of fear, repressed emotion, inner confusion', element: 'Water', emoji: '🌕' },
      { name: 'The Sun', number: 19, meaning: 'Positivity, fun, warmth, success, vitality', reversed: 'Inner child, feeling down, overly optimistic', element: 'Fire', emoji: '☀️' },
      { name: 'Judgement', number: 20, meaning: 'Judgement, rebirth, inner calling, absolution', reversed: 'Self-doubt, inner critic, ignoring the call', element: 'Fire', emoji: '📯' },
      { name: 'The World', number: 21, meaning: 'Completion, integration, accomplishment, travel', reversed: 'Seeking personal closure, short-cuts, delays', element: 'Earth', emoji: '🌍' }
    ],

    getCardOfDay(personalDay, universalDay, birthDate, forecastDate) {
      // Combine personal day, universal day, and day-of-year for a unique daily card
      const dayOfYear = Math.floor((forecastDate - new Date(forecastDate.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
      const seed = (personalDay * 7 + universalDay * 3 + dayOfYear) % 22;
      const card = this.majorArcana[seed];
      // Determine if upright or reversed based on biorhythm-like cycle
      const diff = Math.floor((forecastDate - birthDate) / (1000 * 60 * 60 * 24));
      const isReversed = (diff % 13) > 9;
      return { ...card, isReversed, orientation: isReversed ? 'Reversed' : 'Upright' };
    }
  },

  // ==========================================
  // CRYSTAL & COLOR THERAPY
  // ==========================================

  crystalTherapy: {
    bySunSign: {
      'Aries': { crystal: 'Red Jasper', color: 'Red', essential: 'Frankincense', emoji: '🔴' },
      'Taurus': { crystal: 'Rose Quartz', color: 'Pink/Green', essential: 'Ylang Ylang', emoji: '🩷' },
      'Gemini': { crystal: 'Citrine', color: 'Yellow', essential: 'Lavender', emoji: '💛' },
      'Cancer': { crystal: 'Moonstone', color: 'Silver/White', essential: 'Chamomile', emoji: '🤍' },
      'Leo': { crystal: 'Tiger\'s Eye', color: 'Gold/Orange', essential: 'Rosemary', emoji: '🧡' },
      'Virgo': { crystal: 'Amazonite', color: 'Green', essential: 'Peppermint', emoji: '💚' },
      'Libra': { crystal: 'Lapis Lazuli', color: 'Blue/Pink', essential: 'Geranium', emoji: '💙' },
      'Scorpio': { crystal: 'Obsidian', color: 'Black/Deep Red', essential: 'Patchouli', emoji: '🖤' },
      'Sagittarius': { crystal: 'Turquoise', color: 'Turquoise/Purple', essential: 'Cedarwood', emoji: '💎' },
      'Capricorn': { crystal: 'Garnet', color: 'Dark Red/Brown', essential: 'Vetiver', emoji: '🤎' },
      'Aquarius': { crystal: 'Amethyst', color: 'Violet/Electric Blue', essential: 'Eucalyptus', emoji: '💜' },
      'Pisces': { crystal: 'Aquamarine', color: 'Sea Green/Lavender', essential: 'Sandalwood', emoji: '🩵' }
    },
    byPersonalDay: {
      1: { crystal: 'Carnelian', purpose: 'Courage and new beginnings' },
      2: { crystal: 'Moonstone', purpose: 'Emotional balance and partnership' },
      3: { crystal: 'Citrine', purpose: 'Creative expression and joy' },
      4: { crystal: 'Smoky Quartz', purpose: 'Grounding and stability' },
      5: { crystal: 'Labradorite', purpose: 'Transformation and adventure' },
      6: { crystal: 'Rose Quartz', purpose: 'Love and harmony' },
      7: { crystal: 'Amethyst', purpose: 'Intuition and spiritual insight' },
      8: { crystal: 'Pyrite', purpose: 'Abundance and manifestation' },
      9: { crystal: 'Clear Quartz', purpose: 'Clarity and universal healing' }
    },
    getRecommendation(sunSign, personalDay) {
      const signCrystal = this.bySunSign[sunSign] || this.bySunSign['Aries'];
      const pd = personalDay > 9 ? ((personalDay % 9) || 9) : personalDay;
      const dayCrystal = this.byPersonalDay[pd] || this.byPersonalDay[1];
      return { signCrystal, dayCrystal };
    }
  },

  _calculateDayEnergy(personalDay, biorhythm, moonPhase, aspects, sunIdx, transits) {
    // Composite energy score from all systems
    let love = 50, career = 50, health = 50, spirit = 50, luck = 50;

    // Personal day influence
    if ([2, 6].includes(personalDay)) love += 20;
    if ([1, 8].includes(personalDay)) career += 20;
    if ([4, 6].includes(personalDay)) health += 15;
    if ([7, 9, 11].includes(personalDay)) spirit += 20;
    if ([3, 5].includes(personalDay)) luck += 15;

    // Biorhythm influence
    love += Math.round(biorhythm.emotional.value * 15);
    career += Math.round(biorhythm.intellectual.value * 15);
    health += Math.round(biorhythm.physical.value * 20);
    spirit += Math.round(biorhythm.spiritual.value * 15);
    luck += Math.round((biorhythm.physical.value + biorhythm.emotional.value + biorhythm.intellectual.value) / 3 * 10);

    // Moon phase influence
    if ([0, 1].includes(moonPhase.index)) { career += 10; spirit += 5; }
    if ([4, 5].includes(moonPhase.index)) { love += 10; luck += 10; }
    if ([6, 7].includes(moonPhase.index)) { spirit += 15; health += 5; }

    // Transit aspects
    aspects.forEach(a => {
      const bonus = a.nature === 'flowing' ? 8 : a.nature === 'harmonious' ? 6 : a.nature === 'powerful' ? 5 : -5;
      if (['Venus', 'Moon'].includes(a.planet)) love += bonus;
      if (['Sun', 'Mars', 'Saturn'].includes(a.planet)) career += bonus;
      if (['Jupiter'].includes(a.planet)) luck += bonus * 2;
      spirit += Math.round(bonus / 2);
    });

    // Clamp all values
    const clamp = v => Math.max(10, Math.min(95, v));
    love = clamp(love); career = clamp(career); health = clamp(health); spirit = clamp(spirit); luck = clamp(luck);
    const overall = Math.round((love + career + health + spirit + luck) / 5);

    return { love, career, health, spirit, luck, overall };
  },

  _generateGuidance(pDay, pMonth, pYear, lifePath, sunSign, moonPhase, bio, aspects, chinese, transits, age, energy) {
    const pdm = this.meanings.personalDay[pDay > 9 ? 11 : pDay] || this.meanings.personalDay[1];

    // Best time of day based on personal day
    const bestTimes = {
      1: 'Morning (6-10am)', 2: 'Afternoon (2-5pm)', 3: 'Late morning (10am-1pm)',
      4: 'Early morning (5-8am)', 5: 'Anytime — stay flexible', 6: 'Evening (5-8pm)',
      7: 'Dawn or dusk', 8: 'Morning (8am-12pm)', 9: 'Sunset hours',
      11: 'Midnight or noon', 22: 'Morning (8-11am)'
    };

    // Lucky colors based on personal day + sun sign element
    const elementColors = {
      Fire: ['Red', 'Orange', 'Gold'], Earth: ['Green', 'Brown', 'Cream'],
      Air: ['Blue', 'White', 'Silver'], Water: ['Purple', 'Teal', 'Black']
    };
    const dayColors = {
      1: 'Red', 2: 'Orange', 3: 'Yellow', 4: 'Green', 5: 'Turquoise',
      6: 'Blue', 7: 'Violet', 8: 'Rose Gold', 9: 'Gold', 11: 'Silver', 22: 'Platinum'
    };

    const sunElement = this.astrology.getElement(this.astrology.getSignIndex(sunSign));
    const luckyColors = [...new Set([dayColors[pDay > 9 ? 11 : pDay], ...(elementColors[sunElement] || ['White'])])].slice(0, 3);

    // Lucky numbers
    const luckyNums = [...new Set([pDay > 9 ? this.numerology.reduceToSingle(pDay) : pDay, lifePath, (pDay + lifePath) % 9 + 1])];

    // Affirmation based on personal day
    const affirmations = {
      1: "I am the creator of my reality. Today I lead with courage.",
      2: "I attract harmony and partnership. My patience is my power.",
      3: "My creative voice matters. I express joy freely today.",
      4: "I build with purpose. Every brick I lay creates lasting value.",
      5: "I embrace change as my greatest teacher. Freedom flows through me.",
      6: "Love is my compass. I nurture myself and others with grace.",
      7: "I trust my inner wisdom. Silence reveals what noise conceals.",
      8: "I step into my power. Abundance flows to me naturally.",
      9: "I release what no longer serves me. My compassion heals the world.",
      11: "I am a channel for divine light. My intuition guides me perfectly.",
      22: "I manifest dreams into reality. My vision serves humanity."
    };

    // Overall day rating
    let rating = 'moderate';
    if (energy.overall >= 75) rating = 'excellent';
    else if (energy.overall >= 60) rating = 'good';
    else if (energy.overall < 35) rating = 'rest';
    else if (energy.overall < 45) rating = 'challenging';

    // Chakra of the day
    const chakras = ['Root','Sacral','Solar Plexus','Heart','Throat','Third Eye','Crown'];
    const chakraEmojis = ['🔴','🟠','🟡','💚','🔵','💜','⚪'];
    const chakraIdx = (pDay - 1) % 7;

    // === ENHANCED NARRATIVE GENERATION ===
    const pdKey = pDay > 9 ? 11 : pDay;

    // Detailed daily narrative paragraph
    const dayNarratives = {
      1: `Today pulses with the raw energy of new beginnings. The vibration of 1 courses through your day like a fresh wind, urging you to step forward with confidence and claim your independence. This is not a day for following — it is a day for leading. Whether you are starting a new project, making a bold decision, or simply choosing to see yourself in a new light, the universe supports your initiative. Your ${sunSign} nature amplifies this pioneering spirit, and the ${chinese.element} ${chinese.animal} within you adds its own unique flavor of courage. Trust the impulse to act. The seeds you plant today carry the potential of an entire cycle of growth.`,
      2: `A gentle, receptive energy wraps around your day like a soft embrace. The vibration of 2 asks you to slow down, listen deeply, and honor the connections that sustain you. Partnerships of all kinds — romantic, professional, creative — are highlighted, and your ability to cooperate and compromise is your greatest asset. As a ${sunSign}, you bring your own distinctive warmth to every interaction, while your ${chinese.element} ${chinese.animal} nature adds a layer of intuitive understanding. Pay attention to the subtle currents flowing between you and others today. The most meaningful progress happens not through force, but through patience and genuine presence.`,
      3: `Creative fire dances through your day with the vibration of 3. Words flow more easily, ideas spark with unusual brilliance, and your natural charisma is turned up to full volume. This is a day to express yourself without reservation — write, speak, create, perform, or simply let your personality shine in every conversation. Your ${sunSign} energy gives your creativity a distinctive signature, and the ${chinese.element} ${chinese.animal} influence adds depth and texture to everything you produce. Joy is not just permitted today; it is practically required. The universe is listening for your unique voice, and what you express now has the power to inspire others in ways you may never fully realize.`,
      4: `The steady, grounding vibration of 4 anchors your day in practical reality. This is a day for building, organizing, and doing the detailed work that transforms dreams into tangible results. There is a quiet dignity in today's energy — it rewards discipline, persistence, and honest effort. Your ${sunSign} nature provides the motivation, while your ${chinese.element} ${chinese.animal} spirit contributes the endurance needed to see things through. Do not be discouraged if progress feels slow; every foundation stone you lay today supports the magnificent structure you are building. The universe respects those who show up and do the work, and today, that is exactly what is being asked of you.`,
      5: `Electricity crackles through your day with the vibration of 5. Change is not just possible — it is inevitable, and the more you embrace it, the more exhilarating this day becomes. Routine feels suffocating under this influence; your spirit craves adventure, variety, and the thrill of the unexpected. As a ${sunSign}, you navigate change with your own distinctive style, and your ${chinese.element} ${chinese.animal} energy adds either boldness or adaptability to your approach. Be open to spontaneous opportunities, chance encounters, and sudden shifts in direction. The universe is rearranging things in your favor, even when the process feels chaotic. Freedom is your birthright today — claim it fully.`,
      6: `Love permeates every corner of your day with the nurturing vibration of 6. Home, family, beauty, and responsibility are all highlighted, and your heart is both your compass and your greatest strength. This is a day to care for others and to allow yourself to be cared for in return. Your ${sunSign} nature colors your expression of love with its own unique warmth, while your ${chinese.element} ${chinese.animal} spirit adds depth to your capacity for devotion. Whether you are tending to a relationship, beautifying your space, or simply offering a kind word to someone who needs it, every act of genuine care ripples outward in ways you cannot see. The universe rewards love with more love.`,
      7: `A contemplative, mystical energy settles over your day with the vibration of 7. The outer world fades in importance as your inner world comes alive with insight, intuition, and quiet revelation. This is not a day for crowds or superficial socializing — it is a day for solitude, reflection, and the kind of deep thinking that produces genuine wisdom. Your ${sunSign} nature provides the lens through which you examine life's mysteries, while your ${chinese.element} ${chinese.animal} spirit adds its own layer of perceptive depth. Trust the thoughts that arise in silence. The answers you seek are not out there somewhere — they are already within you, waiting to be recognized. Meditation, journaling, or simply sitting quietly in nature can unlock profound understanding today.`,
      8: `Power and abundance surge through your day with the commanding vibration of 8. This is a day to step into your authority, make bold financial decisions, and claim the success that your efforts have earned. The energy of 8 is not gentle — it is forceful, ambitious, and results-oriented. Your ${sunSign} nature determines how you wield this power, while your ${chinese.element} ${chinese.animal} spirit adds either strategic cunning or magnetic charisma to your approach. Negotiations, business dealings, and any situation requiring leadership are all favored. The universe is testing whether you can handle abundance with integrity. Rise to the occasion, and the rewards will be substantial and lasting.`,
      9: `A profound, expansive energy flows through your day with the vibration of 9. This is the number of completion, compassion, and universal love — a day to release what no longer serves you and to embrace a wider perspective on life. Old grudges, outdated habits, and limiting beliefs are ready to be dissolved. Your ${sunSign} nature gives your compassion a distinctive expression, while your ${chinese.element} ${chinese.animal} spirit adds wisdom to your acts of letting go. Generosity — of spirit, time, and resources — is powerfully rewarded today. The universe is clearing space in your life for something new and beautiful, but first you must be willing to open your hands and release what you have been clutching too tightly.`,
      11: `A rare, electrically charged energy illuminates your day with the master vibration of 11. Intuition is not just heightened — it is practically screaming, sending you messages through dreams, synchronicities, sudden knowing, and the words of strangers. This is a day when the veil between the ordinary and the extraordinary is tissue-thin. Your ${sunSign} nature channels this spiritual electricity in its own unique way, while your ${chinese.element} ${chinese.animal} spirit grounds these higher frequencies into something you can actually use. Pay attention to everything today — the song that plays on the radio, the number on the clock, the chance encounter that feels oddly significant. The universe is communicating directly with you, and the messages it sends today could alter the course of your entire year.`
    };

    // Morning/afternoon/evening micro-guidance
    const timeGuidance = {
      1: { morning: 'Set your most important intention before 10am — the energy of initiation is strongest at dawn.', afternoon: 'Take decisive action on your morning intention. Momentum builds through the midday hours.', evening: 'Reflect on what you initiated today. Journal about the new direction you are choosing.' },
      2: { morning: 'Begin with a gentle, receptive mindset. Listen before you speak in every interaction.', afternoon: 'Partnership energy peaks — schedule important conversations or collaborative work now.', evening: 'Nurture your closest relationship with undivided attention tonight.' },
      3: { morning: 'Let creativity flow freely — write, sketch, or brainstorm without censoring yourself.', afternoon: 'Social energy peaks. Network, present ideas, or simply enjoy stimulating conversation.', evening: 'Express gratitude for the creative gifts that flowed through you today.' },
      4: { morning: 'Tackle your most demanding task first. Your discipline is strongest in the early hours.', afternoon: 'Continue building steadily. Organize, plan, and handle practical details.', evening: 'Rest your body. A warm bath or gentle stretching honors the hard work you did today.' },
      5: { morning: 'Stay open to the unexpected. Your plans may change — and that is a good thing.', afternoon: 'Adventure energy peaks. Try something new, explore, or take a calculated risk.', evening: 'Process the day\'s changes. What did you learn about your capacity for freedom?' },
      6: { morning: 'Begin with an act of love — for yourself or someone you care about.', afternoon: 'Home and family matters benefit from your attention now.', evening: 'Create beauty in your environment. Cook a nourishing meal, light candles, play music.' },
      7: { morning: 'Meditate or journal before engaging with the world. Your inner voice is clearest at dawn.', afternoon: 'Research, study, or dive deep into a subject that fascinates you.', evening: 'Solitude is healing tonight. Read, contemplate, or simply sit in peaceful silence.' },
      8: { morning: 'Review your finances and set a powerful intention for abundance.', afternoon: 'Business energy peaks. Make calls, negotiate, or take authoritative action.', evening: 'Visualize your success. The subconscious mind is especially receptive tonight.' },
      9: { morning: 'Practice forgiveness — release one grudge or regret before noon.', afternoon: 'Serve others. Volunteer, mentor, or simply offer genuine help to someone in need.', evening: 'Let go of the day completely. Tomorrow begins a new chapter.' },
      11: { morning: 'Record your dreams immediately upon waking — they contain important messages.', afternoon: 'Trust your intuition in every decision. Your inner knowing is remarkably accurate today.', evening: 'Meditate on the signs and synchronicities you noticed. What is the universe telling you?' }
    };

    // Cosmic weather narrative
    const sunEl = this.astrology.getElement(this.astrology.getSignIndex(sunSign));
    const moonEl = this.astrology.getElement(this.astrology.getSignIndex(transits.moon.sign));
    const sunMoonDynamic = sunEl === moonEl ? 'harmonious alignment' : 
      ((sunEl === 'Fire' && moonEl === 'Air') || (sunEl === 'Air' && moonEl === 'Fire')) ? 'stimulating synergy' :
      ((sunEl === 'Earth' && moonEl === 'Water') || (sunEl === 'Water' && moonEl === 'Earth')) ? 'nurturing flow' :
      ((sunEl === 'Fire' && moonEl === 'Water') || (sunEl === 'Water' && moonEl === 'Fire')) ? 'emotional intensity' :
      'creative tension';

    const cosmicNarrative = `The celestial stage is set with the Sun illuminating ${transits.sun.sign} and the Moon moving through ${transits.moon.sign}, creating a ${sunMoonDynamic} that colors the emotional and energetic landscape of your day. Mercury in ${transits.mercury.sign} shapes how you think and communicate, Venus in ${transits.venus.sign} influences your relationships and aesthetic sensibilities, and Mars in ${transits.mars.sign} directs your drive and physical energy. For your ${sunSign} nature specifically, this planetary arrangement ${energy.overall >= 65 ? 'opens doors of opportunity and creative flow' : energy.overall >= 45 ? 'provides a balanced backdrop for steady progress' : 'asks for patience and conscious navigation'}.`;

    // Aspect narrative
    const harmAspects = aspects.filter(a => ['Trine','Sextile','Conjunction'].includes(a.aspect));
    const tensAspects = aspects.filter(a => ['Square','Opposition'].includes(a.aspect));
    let aspectNarrative = '';
    if (harmAspects.length > 0 && tensAspects.length === 0) {
      aspectNarrative = `The planets are singing in harmony today, with ${harmAspects.length} supportive aspect${harmAspects.length > 1 ? 's' : ''} flowing to your natal Sun. This is a day when things click into place with relative ease — doors open, conversations flow, and your natural talents find their audience. Lean into this cosmic support and take action on what matters most.`;
    } else if (tensAspects.length > 0 && harmAspects.length === 0) {
      aspectNarrative = `Today's planetary geometry brings ${tensAspects.length} challenging aspect${tensAspects.length > 1 ? 's' : ''} to your chart. This is not a punishment — it is a growth catalyst. The friction you feel is the universe polishing your rough edges and strengthening your resolve. Meet challenges with awareness rather than resistance, and you will emerge stronger by day's end.`;
    } else if (harmAspects.length > 0 && tensAspects.length > 0) {
      aspectNarrative = `Today's sky holds both support and challenge — ${harmAspects.length} harmonious and ${tensAspects.length} tense aspect${tensAspects.length > 1 ? 's' : ''} to your chart. This dynamic mix creates a day of productive complexity. Use the flowing aspects as fuel and the challenging ones as focus. The tension drives growth while the harmony provides the grace to handle it.`;
    } else {
      aspectNarrative = `No major planetary aspects touch your natal Sun today, creating a quiet cosmic backdrop. This is actually a gift — a day when you are free from external planetary pressure and can direct your own energy with unusual autonomy. Use this space wisely.`;
    }

    // Biorhythm narrative
    const bioNarrative = bio.physical >= 70 && bio.emotional >= 70 && bio.intellectual >= 70 ?
      'All three of your primary biorhythm cycles are running high — a rare convergence that creates a window of exceptional capability. You have the physical stamina, emotional resilience, and mental clarity to tackle virtually anything today.' :
      bio.physical >= 70 ? `Your physical biorhythm is surging at ${bio.physical}%, giving you exceptional stamina and resilience. ${bio.emotional < 40 ? 'However, your emotional cycle is in a rest phase — channel your physical energy into action rather than deep conversations.' : 'Channel this vitality into exercise, physical projects, or any task requiring endurance.'}` :
      bio.emotional >= 70 ? `Your emotional biorhythm peaks at ${bio.emotional}%, heightening your empathy, creativity, and capacity for deep connection. ${bio.physical < 40 ? 'Your physical energy is lower, so honor your body while letting your heart lead.' : 'This is an excellent day for artistic expression, relationship building, and any work that requires emotional intelligence.'}` :
      bio.intellectual >= 70 ? `Your intellectual biorhythm is at its peak (${bio.intellectual}%), sharpening your analytical abilities and strategic thinking. ${bio.emotional < 40 ? 'Emotions may feel muted — use this clarity for objective decision-making.' : 'Complex problems, research, and learning are all strongly favored.'}` :
      bio.physical < 35 && bio.emotional < 35 ? 'Both your physical and emotional biorhythms are in a rest phase. This is your body and heart asking for gentleness. Honor this need — rest is not weakness, it is wisdom.' :
      'Your biorhythm cycles are in a balanced middle range, creating a day suited for steady, consistent effort across all areas of life.';

    return {
      theme: pdm.theme,
      energy: pdm.energy,
      icon: pdm.icon,
      color: pdm.color,
      bestTime: bestTimes[pDay > 9 ? 11 : pDay] || 'Morning',
      luckyColors,
      luckyNumbers: luckyNums,
      affirmation: affirmations[pDay > 9 ? pDay : pDay] || affirmations[1],
      rating,
      chakra: chakras[chakraIdx],
      chakraEmoji: chakraEmojis[chakraIdx],
      moonAdvice: moonPhase.energy,
      transitSunSign: transits.sun.sign,
      transitMoonSign: transits.moon.sign,
      // Enhanced narrative content
      dayNarrative: dayNarratives[pdKey] || dayNarratives[1],
      timeGuidance: timeGuidance[pdKey] || timeGuidance[1],
      cosmicNarrative,
      aspectNarrative,
      bioNarrative
    };
  },

  // ==========================================
  // WEEKLY FORECAST ENGINE
  // ==========================================
  generateWeeklyForecast(birthData, startDate) {
    const { name, month, day, year, birthTime } = birthData;
    const days = [];
    const start = new Date(startDate);
    // Get Monday of the current week
    const dayOfWeek = start.getDay();
    const monday = new Date(start);
    monday.setDate(start.getDate() - ((dayOfWeek + 6) % 7));

    let peakDay = null, challengeDay = null;
    let peakScore = 0, challengeScore = 100;

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const forecast = this.generateForecast(birthData, d);
      const dayData = {
        date: d,
        dayName: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][i],
        personalDay: forecast.personalDay,
        dayTheme: forecast.guidance.theme,
        energy: forecast.guidance.energy,
        overallEnergy: forecast.dayEnergy.overall,
        loveEnergy: forecast.dayEnergy.love,
        careerEnergy: forecast.dayEnergy.career,
        moonPhase: forecast.moonPhase,
        rating: forecast.guidance.rating,
        tarot: forecast.tarotCard,
        luckyNumbers: forecast.guidance.luckyNumbers,
        luckyColors: forecast.guidance.luckyColors,
        affirmation: forecast.guidance.affirmation,
        biorhythm: forecast.biorhythm,
        transitAspects: forecast.transitAspects
      };
      days.push(dayData);
      if (dayData.overallEnergy > peakScore) { peakScore = dayData.overallEnergy; peakDay = dayData; }
      if (dayData.overallEnergy < challengeScore) { challengeScore = dayData.overallEnergy; challengeDay = dayData; }
    }

    // Weekly theme from dominant personal day energies
    const avgEnergy = Math.round(days.reduce((s, d) => s + d.overallEnergy, 0) / 7);
    const avgLove = Math.round(days.reduce((s, d) => s + d.loveEnergy, 0) / 7);
    const avgCareer = Math.round(days.reduce((s, d) => s + d.careerEnergy, 0) / 7);

    // Count aspects for the week
    let harmonious = 0, tense = 0;
    days.forEach(d => {
      d.transitAspects.forEach(a => {
        if (['Trine','Sextile','Conjunction'].includes(a.aspect)) harmonious++;
        else tense++;
      });
    });

    const weekTheme = this._getWeekTheme(days, avgEnergy);

    return {
      weekOf: monday,
      weekEnd: new Date(monday.getTime() + 6 * 86400000),
      days,
      peakDay,
      challengeDay,
      avgEnergy,
      avgLove,
      avgCareer,
      harmoniousAspects: harmonious,
      tenseAspects: tense,
      weekTheme,
      advice: this._getWeekAdvice(weekTheme, avgEnergy, peakDay, challengeDay)
    };
  },

  _getWeekTheme(days, avgEnergy) {
    const themes = days.map(d => d.personalDay);
    const has1 = themes.includes(1);
    const has5 = themes.includes(5);
    const has8 = themes.includes(8);
    const has9 = themes.includes(9);
    const has11 = themes.includes(11);

    if (avgEnergy > 70) return { name: 'Power Week', icon: '⚡', desc: 'High energy flows through every day this week, creating a rare window of sustained momentum. This is the kind of week where breakthroughs happen — not by accident, but because the cosmic currents are aligned in your favor. Push forward on major goals, take calculated risks, and trust that the universe is amplifying your efforts. The key is to channel this intensity with focus rather than scattering it across too many fronts.' };
    if (avgEnergy < 35) return { name: 'Restoration Week', icon: '🌿', desc: 'The cosmos is whispering rather than shouting this week, and the message is clear: rest, reflect, and recharge. This is not a week of stagnation — it is a week of deep inner work that will fuel your next surge of activity. Think of it as the pause between breaths, the silence between notes that gives music its meaning. Honor your body\'s need for gentleness, your mind\'s need for quiet, and your spirit\'s need for contemplation.' };
    if (has1 && has8) return { name: 'Achievement Week', icon: '🏆', desc: 'Leadership energy and material success converge this week in a powerful combination. The pioneering spirit of 1 meets the commanding authority of 8, creating days where bold action meets tangible reward. This is a week to step into your power, make decisive moves in your career or finances, and trust that your efforts will be recognized. The universe is handing you the keys — it is up to you to turn them.' };
    if (has5 && has9) return { name: 'Transformation Week', icon: '🦋', desc: 'Change and completion dance together this week, creating a profound opportunity for personal transformation. The adventurous energy of 5 shakes loose what has become stale, while the compassionate release of 9 helps you let go with grace. By week\'s end, you may find yourself standing in a very different inner landscape — lighter, freer, and more aligned with your authentic path.' };
    if (has11) return { name: 'Illumination Week', icon: '✨', desc: 'A master number graces this week, thinning the veil between the ordinary and the extraordinary. Spiritual insights, intuitive breakthroughs, and meaningful synchronicities are all heightened. Pay close attention to your dreams, the patterns in your daily life, and the quiet voice of inner knowing. This is a week when the universe speaks directly to those who are willing to listen — and you are being called to listen deeply.' };
    return { name: 'Balanced Week', icon: '⚖️', desc: 'A well-rounded week with mixed energies creates a versatile canvas for your intentions. Some days will surge with momentum while others ask for patience and reflection. The art of this week lies in reading each day\'s unique energy and adapting your approach accordingly. Flexibility is your superpower — use it to navigate the shifting currents with grace and purpose.' };
  },

  _getWeekAdvice(theme, avgEnergy, peakDay, challengeDay) {
    const advice = [];
    if (peakDay) advice.push(`Your peak day is ${peakDay.dayName} (Personal Day ${peakDay.personalDay}) — this is when your cosmic energy reaches its weekly zenith. Schedule your most important meetings, creative sessions, launches, or difficult conversations for this day. The universe is literally amplifying your signal, making it the ideal time for anything that requires maximum impact.`);
    if (challengeDay) advice.push(`${challengeDay.dayName} (Personal Day ${challengeDay.personalDay}) carries the week's lowest energy. Rather than fighting this current, work with it — plan lighter activities, administrative tasks, or dedicated self-care. Sometimes the most productive thing you can do is rest strategically, saving your reserves for the days when cosmic support is stronger.`);
    if (avgEnergy > 60) advice.push('The overall energy arc of this week strongly supports bold, decisive action. The cosmic winds are at your back — don\'t hold back on initiatives you\'ve been contemplating. This is a week for doing, not just planning.');
    else if (avgEnergy < 40) advice.push('This week\'s energy profile favors conservation and strategic patience. Focus on essentials, delegate where possible, and invest in activities that recharge rather than deplete you. The seeds you nurture quietly this week will bloom when the energy shifts upward.');
    else advice.push('Moderate energy this week creates a balanced playing field. The key is rhythm — alternate between periods of focused action and intentional rest. Neither pushing too hard nor coasting will serve you. Find the middle path and walk it with awareness.');

    // Add activity-specific advice
    const bestLoveDay = peakDay && peakDay.personalDay && [2,6,9].includes(peakDay.personalDay % 10) ? peakDay.dayName : null;
    const bestWorkDay = peakDay && peakDay.personalDay && [1,4,8].includes(peakDay.personalDay % 10) ? peakDay.dayName : null;
    if (bestLoveDay) advice.push(`💕 Best day for romance and relationships: ${bestLoveDay}. The personal day vibration is especially receptive to matters of the heart.`);
    if (bestWorkDay) advice.push(`💼 Best day for career moves and business: ${bestWorkDay}. Professional energy peaks with this personal day vibration.`);

    return advice;
  },

  // ==========================================
  // MONTHLY FORECAST ENGINE
  // ==========================================
  generateMonthlyForecast(birthData, forecastDate) {
    const { name, month, day, year, birthTime } = birthData;
    const fd = new Date(forecastDate);
    const fMonth = fd.getMonth() + 1;
    const fYear = fd.getFullYear();
    const daysInMonth = new Date(fYear, fMonth, 0).getDate();
    const bd = new Date(year, month - 1, day);

    // Personal Month & Year
    const personalYear = this.numerology.personalYear(month, day, fYear);
    const personalMonth = this.numerology.personalMonth(month, day, fYear, fMonth);

    // Key days analysis
    const keyDays = [];
    const weeklyEnergies = [0, 0, 0, 0, 0];
    let peakDay = null, peakScore = 0;
    let challengeDay = null, challengeScore = 100;

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(fYear, fMonth - 1, d);
      const pDay = this.numerology.personalDay(month, day, fYear, fMonth, d);
      const bio = this.biorhythm.calculate(bd, date);
      const moon = this.moonPhase.calculate(date);
      const overall = Math.round((bio.physical + bio.emotional + bio.intellectual) / 3);
      const weekIdx = Math.min(Math.floor((d - 1) / 7), 4);
      weeklyEnergies[weekIdx] += overall;

      // Mark special days
      const isCritical = this.biorhythm.isCriticalDay(bd, date).length > 0;
      const isNewMoon = moon.index === 0;
      const isFullMoon = moon.index === 4;
      const isMasterDay = [11, 22, 33].includes(pDay);
      const isPowerDay = pDay === 1 || pDay === 8;

      if (isNewMoon || isFullMoon || isMasterDay || isPowerDay || isCritical) {
        keyDays.push({
          day: d,
          date,
          personalDay: pDay,
          moonPhase: moon,
          bioOverall: overall,
          isCritical,
          isNewMoon,
          isFullMoon,
          isMasterDay,
          isPowerDay,
          label: isFullMoon ? '🌕 Full Moon' : isNewMoon ? '🌑 New Moon' : isMasterDay ? '✨ Master Day ' + pDay : isPowerDay ? '⚡ Power Day' : '⚠️ Critical Day'
        });
      }

      if (overall > peakScore) { peakScore = overall; peakDay = { day: d, energy: overall, personalDay: pDay }; }
      if (overall < challengeScore) { challengeScore = overall; challengeDay = { day: d, energy: overall, personalDay: pDay }; }
    }

    // Moon phases this month
    const moonEvents = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(fYear, fMonth - 1, d);
      const moon = this.moonPhase.calculate(date);
      const prevDate = new Date(fYear, fMonth - 1, d - 1);
      const prevMoon = d > 1 ? this.moonPhase.calculate(prevDate) : { index: -1 };
      if (moon.index !== prevMoon.index && (moon.index === 0 || moon.index === 2 || moon.index === 4 || moon.index === 6)) {
        moonEvents.push({ day: d, phase: moon.name, emoji: moon.emoji });
      }
    }

    // Monthly theme
    const monthThemes = {
      1: { name: 'New Beginnings', icon: '🌱', desc: 'This month vibrates with the pioneering energy of fresh starts and independent action. The universe is handing you a blank page and a pen — what you write upon it is entirely up to you. New projects, new relationships, new perspectives on old problems — all are favored. The courage to begin is the only requirement. Plant your seeds with intention, knowing that what you initiate this month carries the momentum to sustain growth for months to come.', affirmation: 'I boldly step into the new. Every beginning carries infinite potential.', bestFor: 'Starting projects, making decisions, asserting independence', avoidThis: 'Waiting for permission, clinging to the past, self-doubt' },
      2: { name: 'Partnership', icon: '🤝', desc: 'Patience becomes your superpower this month as the gentle vibration of 2 asks you to cooperate, listen, and nurture the relationships that matter most. This is not a month for solo heroics — it is a month for building bridges, finding common ground, and allowing things to develop at their own organic pace. The details you attend to now, the compromises you make with grace, and the quiet acts of support you offer will compound into something far greater than any individual achievement.', affirmation: 'I attract harmony through patience. My relationships are my greatest wealth.', bestFor: 'Collaboration, diplomacy, relationship building, detailed work', avoidThis: 'Impatience, forcing outcomes, neglecting partnerships' },
      3: { name: 'Creative Expression', icon: '🎨', desc: 'Your creative channels are wide open this month, and the universe is practically begging you to express yourself. Words, images, music, movement — whatever medium calls to you, answer with enthusiasm. Social connections flourish under this vibration, and your natural charisma is amplified to magnetic levels. This is also a month of joy and optimism, when the simple act of being alive feels like a celebration. Share your gifts generously, network with abandon, and let your personality shine without apology.', affirmation: 'My creative voice is a gift to the world. I express joy freely and abundantly.', bestFor: 'Creative projects, socializing, public speaking, artistic expression', avoidThis: 'Self-censorship, isolation, scattered energy, gossip' },
      4: { name: 'Foundation Building', icon: '🏗️', desc: 'The universe rolls up its sleeves alongside you this month, honoring hard work, discipline, and practical achievement. This is a month for building the structures — physical, financial, professional, or personal — that will support your dreams for years to come. Organization, planning, and attention to detail are not just recommended; they are the very currency of success under this vibration. The work may feel demanding, but every brick you lay now creates lasting value. Trust the process and show up consistently.', affirmation: 'I build with purpose and patience. My foundations are unshakeable.', bestFor: 'Organization, planning, health routines, financial management', avoidThis: 'Shortcuts, laziness, rigidity, neglecting your body' },
      5: { name: 'Freedom & Change', icon: '🦋', desc: 'Hold on loosely this month — the vibration of 5 brings change, adventure, and the exhilarating unpredictability of life lived at full volume. Travel, new experiences, unexpected opportunities, and sudden shifts in direction are all part of the cosmic menu. Your comfort zone is not where growth happens this month; it happens at the edges, in the unfamiliar territory that both thrills and terrifies you. Embrace flexibility, say yes to the unexpected, and trust that the universe knows exactly what it is doing, even when the path ahead is unclear.', affirmation: 'I embrace change as my greatest teacher. Freedom is my natural state.', bestFor: 'Travel, adventure, trying new things, breaking routines', avoidThis: 'Excess, recklessness, fear of change, overindulgence' },
      6: { name: 'Love & Responsibility', icon: '💕', desc: 'Love in all its forms — romantic, familial, platonic, self-directed — takes center stage this month. Home and family matters demand your attention, and the rewards for showing up with an open heart are immeasurable. This is also a month of responsibility, when the universe asks you to care for others without losing yourself in the process. Beauty, harmony, and domestic comfort are all highlighted. Create a sanctuary in your home, nurture your closest bonds, and remember that the most powerful force in the universe is not gravity — it is love.', affirmation: 'Love is my compass and my destination. I nurture with grace and receive with gratitude.', bestFor: 'Relationships, home improvement, family gatherings, self-care', avoidThis: 'Martyrdom, perfectionism, meddling, neglecting yourself' },
      7: { name: 'Inner Wisdom', icon: '🔮', desc: 'The outer world quiets this month as the contemplative vibration of 7 draws you inward. This is a month for introspection, spiritual growth, and the kind of deep thinking that produces genuine wisdom rather than mere information. Your intuition is remarkably sharp, and the answers you seek are more likely to come from meditation than from Google. Solitude is not loneliness under this influence — it is a sacred space where your soul can speak without interruption. Study, research, and any pursuit of deeper truth are powerfully favored.', affirmation: 'I trust my inner wisdom. In silence, I find everything I need.', bestFor: 'Meditation, study, research, spiritual practice, solitary reflection', avoidThis: 'Excessive socializing, surface-level activity, ignoring intuition' },
      8: { name: 'Power & Abundance', icon: '👑', desc: 'The commanding vibration of 8 surges through this month, bringing opportunities for material success, financial growth, and the exercise of personal authority. This is the most powerful month in the numerological cycle for career advancement, business deals, and any situation requiring leadership and decisive action. The universe is testing your relationship with power — can you wield it with integrity? Can you receive abundance without guilt? Step into your authority with confidence, make bold moves, and trust that you have earned what is coming to you.', affirmation: 'I step into my power with integrity. Abundance flows to me naturally and generously.', bestFor: 'Business deals, financial planning, career moves, leadership', avoidThis: 'Greed, power trips, workaholism, ignoring ethics' },
      9: { name: 'Completion & Release', icon: '🌊', desc: 'A wave of completion energy washes through this month, carrying away what has served its purpose and creating space for what comes next. This is a month for finishing projects, resolving old conflicts, forgiving past hurts, and releasing attachments that have become chains rather than anchors. The vibration of 9 is both an ending and a preparation — every act of letting go this month is simultaneously an act of making room for the new cycle that begins when this one closes. Generosity, compassion, and humanitarian impulses are all amplified.', affirmation: 'I release with grace and gratitude. Every ending is a doorway to something greater.', bestFor: 'Completing projects, forgiveness, charitable giving, closure', avoidThis: 'Clinging, selfishness, bitterness, starting new ventures' },
      11: { name: 'Spiritual Awakening', icon: '⚡', desc: 'A master vibration electrifies this month, thinning the veil between the mundane and the mystical. Intuitive downloads, prophetic dreams, meaningful synchronicities, and moments of sudden, crystal-clear knowing are all heightened under this influence. You may feel called to inspire others, to share spiritual insights, or to step into a leadership role that serves a higher purpose. The intensity of 11 can also bring nervous energy — ground yourself through meditation, nature, and conscious breathing. What you perceive this month has the power to reshape your understanding of yourself and your place in the cosmos.', affirmation: 'I am a channel for divine wisdom. My intuition is my most trusted guide.', bestFor: 'Spiritual practice, intuitive development, inspired leadership', avoidThis: 'Nervous tension, self-doubt, ignoring spiritual messages' },
      22: { name: 'Master Builder', icon: '🏛️', desc: 'The most powerful manifestation energy in the numerological system flows through this month. The master vibration of 22 combines the spiritual vision of 11 with the practical building power of 4, creating a rare opportunity to manifest grand visions into tangible reality. Think big — bigger than you normally allow yourself to think — and then take concrete, disciplined action toward that vision. This is a month when the impossible becomes merely improbable, and the improbable becomes achievable through focused effort and unwavering belief.', affirmation: 'I manifest my grandest visions into reality. My work serves something greater than myself.', bestFor: 'Large-scale projects, legacy building, practical idealism', avoidThis: 'Overwhelm, control issues, thinking too small' },
      33: { name: 'Master Teacher', icon: '🌟', desc: 'The highest master vibration illuminates this month with the energy of compassionate wisdom and healing service. Your experiences, insights, and hard-won wisdom are needed by others, and the universe is creating opportunities for you to share your gifts in ways that genuinely transform lives. This is not about ego or recognition — it is about the pure joy of helping others find their own light. Teaching, mentoring, healing, and any form of selfless service are profoundly rewarded under this sacred vibration.', affirmation: 'My wisdom heals and uplifts. I share my gifts with unconditional love.', bestFor: 'Teaching, mentoring, healing work, compassionate service', avoidThis: 'Ego-driven teaching, martyrdom, neglecting your own needs' }
    };

    const pmReduced = personalMonth > 9 && ![11,22,33].includes(personalMonth) ?
      this.numerology._reduce(personalMonth) : personalMonth;
    const theme = monthThemes[pmReduced] || monthThemes[1];

    return {
      month: fMonth,
      year: fYear,
      monthName: ['January','February','March','April','May','June','July','August','September','October','November','December'][fMonth - 1],
      personalMonth,
      personalYear,
      theme,
      keyDays,
      moonEvents,
      peakDay,
      challengeDay,
      weeklyEnergies: weeklyEnergies.map((e, i) => Math.round(e / 7)),
      daysInMonth
    };
  },

  // ==========================================
  // YEARLY FORECAST ENGINE
  // ==========================================
  generateYearlyForecast(birthData, forecastYear) {
    const { name, month, day, year, birthTime } = birthData;
    const bd = new Date(year, month - 1, day);
    const personalYear = this.numerology.personalYear(month, day, forecastYear);
    const prevYear = this.numerology.personalYear(month, day, forecastYear - 1);
    const nextYear = this.numerology.personalYear(month, day, forecastYear + 1);

    // Chinese zodiac for the year
    const chineseYear = this.chineseZodiac.calculate(forecastYear);
    const birthChinese = this.chineseZodiac.calculate(year);
    const yearEnergy = this.chineseZodiac.currentYearEnergy(forecastYear, birthChinese.animal);

    // Quarterly breakdown
    const quarters = [];
    for (let q = 0; q < 4; q++) {
      const qMonth = q * 3 + 1;
      const pm1 = this.numerology.personalMonth(month, day, forecastYear, qMonth);
      const pm2 = this.numerology.personalMonth(month, day, forecastYear, qMonth + 1);
      const pm3 = this.numerology.personalMonth(month, day, forecastYear, qMonth + 2);
      const avgPM = Math.round((pm1 + pm2 + pm3) / 3);

      quarters.push({
        quarter: q + 1,
        months: [qMonth, qMonth + 1, qMonth + 2],
        monthNames: [
          ['January','February','March'],
          ['April','May','June'],
          ['July','August','September'],
          ['October','November','December']
        ][q],
        personalMonths: [pm1, pm2, pm3],
        theme: this._getQuarterTheme(q, pm1, pm2, pm3, personalYear),
        energy: this._getQuarterEnergy(pm1, pm2, pm3)
      });
    }

    // Monthly energy overview
    const monthlyEnergies = [];
    for (let m = 1; m <= 12; m++) {
      const pm = this.numerology.personalMonth(month, day, forecastYear, m);
      monthlyEnergies.push({
        month: m,
        monthName: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m-1],
        personalMonth: pm,
        energy: this._monthEnergy(pm)
      });
    }

    // Pinnacles and challenges active this year
    const age = forecastYear - year;
    const pinnacles = this.numerology.pinnacles(month, day, year);
    const challenges = this.numerology.challenges(month, day, year);
    const lifePath = this.numerology.lifePathNumber(month, day, year);
    const pinnacleStart = 36 - lifePath;
    let currentPinnacle = pinnacles[3];
    const pinnacleRanges = [
      { start: 0, end: pinnacleStart },
      { start: pinnacleStart + 1, end: pinnacleStart + 9 },
      { start: pinnacleStart + 10, end: pinnacleStart + 18 },
      { start: pinnacleStart + 19, end: 99 }
    ];
    for (let i = 0; i < 4; i++) {
      if (age >= pinnacleRanges[i].start && age <= pinnacleRanges[i].end) { currentPinnacle = pinnacles[i]; break; }
    }

    // Year themes
    const yearThemes = {
      1: { name: 'The Pioneer Year', icon: '🚀', desc: 'You stand at the threshold of a brand new 9-year cycle — a cosmic reset that happens only once a decade. This is the year to plant seeds with bold intention, assert your independence, and step into the version of yourself you have been quietly becoming. Everything you initiate this year carries the potential to define the next nine years of your life. New projects, new relationships, new identities — all are powerfully favored. The universe is handing you a blank canvas and saying: paint something magnificent.', focus: 'Self-discovery, new ventures, independence, courage', avoid: 'Dependency, hesitation, clinging to the past, playing small', lifeLesson: 'The lesson of a 1 Year is that you are the author of your own story. No one else can write it for you, and no one else should. This year teaches you to trust your own vision, even when others cannot see what you see.', spiritualGrowth: 'Your spiritual growth this year comes through action, not contemplation. The divine speaks to you through the courage of your choices and the boldness of your first steps into unknown territory.' },
      2: { name: 'The Partnership Year', icon: '🤝', desc: 'After the bold independence of last year, the cosmos now asks you to slow down, listen deeply, and honor the relationships that sustain you. This is a year of patience, cooperation, and the subtle art of allowing things to develop at their own organic pace. Partnerships of all kinds — romantic, professional, creative — are highlighted, and your ability to compromise without losing yourself is your greatest asset. Progress this year is real but often invisible, like roots growing beneath the soil.', focus: 'Relationships, patience, diplomacy, details', avoid: 'Impatience, forcing outcomes, going it alone, aggression', lifeLesson: 'The lesson of a 2 Year is that strength and gentleness are not opposites — they are partners. True power often looks like patience, and the most profound progress happens in the spaces between dramatic action.', spiritualGrowth: 'Your spiritual growth this year comes through receptivity and surrender. Learn to listen — to others, to your intuition, to the quiet voice of the universe that speaks in whispers rather than shouts.' },
      3: { name: 'The Expression Year', icon: '🎭', desc: 'Joy returns in full force this year as the vibrant energy of 3 invites you to express yourself without reservation. Your creativity peaks, your social life expands, and your natural charisma becomes almost irresistible. This is a year to write, speak, perform, create, network, and let your personality shine in every room you enter. Optimism is not just an attitude — it is a creative force that attracts opportunities, people, and experiences that match your elevated frequency.', focus: 'Creativity, communication, joy, social expansion', avoid: 'Scattered energy, gossip, superficiality, self-doubt', lifeLesson: 'The lesson of a 3 Year is that your creative voice is not a luxury — it is a necessity. When you suppress your authentic expression, you diminish not only yourself but everyone who would have been touched by your gifts.', spiritualGrowth: 'Your spiritual growth this year comes through creative expression and joy. The divine is not found only in solemn meditation — it dances in your laughter, sings in your words, and paints itself across the canvas of your daily life.' },
      4: { name: 'The Foundation Year', icon: '🏗️', desc: 'The universe rolls up its sleeves alongside you this year, honoring hard work, discipline, and the unglamorous but essential task of building lasting foundations. This is the year to get serious about your health, your finances, your career structure, and any system that supports your long-term vision. The work may feel demanding and the progress slow, but every foundation stone you lay this year supports the magnificent structure you are building across this entire 9-year cycle.', focus: 'Work, health, organization, systems, stability', avoid: 'Shortcuts, laziness, rigidity, neglecting your body', lifeLesson: 'The lesson of a 4 Year is that dreams without discipline are just fantasies. The gap between where you are and where you want to be is bridged not by wishing, but by showing up every single day and doing the work.', spiritualGrowth: 'Your spiritual growth this year comes through embodiment and discipline. Spirit lives not just in the ethereal realms but in the physical world — in your body, your daily routines, and the structures you build with your own hands.' },
      5: { name: 'The Freedom Year', icon: '🌍', desc: 'Life accelerates dramatically this year as the dynamic energy of 5 brings change, adventure, and the exhilarating unpredictability of a universe in motion. Travel, new experiences, unexpected opportunities, romantic adventures, and sudden shifts in direction are all part of the cosmic menu. Your comfort zone is not where growth happens this year — it happens at the edges, in the unfamiliar territory that both thrills and terrifies you. Say yes to the unexpected and trust the journey.', focus: 'Change, travel, adventure, sensuality, risk-taking', avoid: 'Excess, recklessness, fear of change, overindulgence', lifeLesson: 'The lesson of a 5 Year is that security is an illusion and freedom is your birthright. The only constant is change, and the sooner you learn to dance with uncertainty rather than fight it, the more alive you will feel.', spiritualGrowth: 'Your spiritual growth this year comes through direct experience. You cannot learn to swim by reading about water. Dive in, make mistakes, get your heart broken, taste everything life offers — and find the sacred in the sensory.' },
      6: { name: 'The Love Year', icon: '💖', desc: 'Love in all its forms — romantic, familial, platonic, self-directed — takes center stage this year. Home and family matters demand your attention, and the rewards for showing up with an open heart are immeasurable. Marriages, engagements, pregnancies, and deepening commitments are all favored. This is also a year of responsibility, when the universe asks you to care for others while remembering that self-love is not selfish — it is the foundation upon which all other love is built.', focus: 'Home, family, love, service, beauty, commitment', avoid: 'Martyrdom, perfectionism, meddling, neglecting yourself', lifeLesson: 'The lesson of a 6 Year is that love is not a feeling — it is a practice. It requires showing up, being present, making sacrifices, and choosing someone (including yourself) again and again, even when it is difficult.', spiritualGrowth: 'Your spiritual growth this year comes through the heart. Every act of genuine love — cooking a meal, holding a hand, forgiving a hurt, beautifying a space — is a spiritual practice as powerful as any meditation.' },
      7: { name: 'The Wisdom Year', icon: '🔮', desc: 'The outer world quiets this year as the contemplative energy of 7 draws you inward toward the vast landscape of your own soul. This is a year for introspection, spiritual development, and the kind of deep thinking that produces genuine wisdom rather than mere information. Your intuition is remarkably sharp, and the answers you seek are more likely to come from meditation than from meetings. Quality over quantity is the mantra — fewer friends but deeper connections, fewer projects but more meaningful ones.', focus: 'Spirituality, study, solitude, analysis, inner development', avoid: 'Excessive socializing, surface-level activity, suspicion, escapism', lifeLesson: 'The lesson of a 7 Year is that the most important journey you will ever take is the one that leads inward. All the wisdom, peace, and purpose you seek in the external world already exists within you, waiting to be discovered.', spiritualGrowth: 'This is the most spiritually significant year in the 9-year cycle. Your connection to the divine deepens profoundly. Meditation, prayer, study of sacred texts, time in nature, and solitary reflection are not optional — they are essential.' },
      8: { name: 'The Power Year', icon: '👑', desc: 'The most materially powerful year in the 9-year cycle has arrived, bringing opportunities for financial growth, career advancement, and the exercise of personal authority on a grand scale. This is the year when the seeds you planted in Year 1 and the foundations you built in Year 4 produce their most tangible harvest. Business deals, promotions, investments, and any situation requiring leadership and decisive action are all powerfully favored. The universe is testing your relationship with power — wield it with integrity and the rewards will be extraordinary.', focus: 'Career, finances, authority, manifestation, leadership', avoid: 'Greed, power trips, workaholism, ethical shortcuts', lifeLesson: 'The lesson of an 8 Year is that true abundance is not just about accumulation — it is about circulation. The more generously you share your power, wealth, and influence, the more the universe replenishes your reserves.', spiritualGrowth: 'Your spiritual growth this year comes through your relationship with the material world. Money, power, and success are not inherently unspiritual — they become spiritual tools when wielded with consciousness, generosity, and integrity.' },
      9: { name: 'The Completion Year', icon: '🌊', desc: 'A profound wave of completion energy washes through this entire year, carrying away what has served its purpose and creating space for the magnificent new cycle that begins next year. This is a year for finishing projects, resolving old conflicts, forgiving past hurts, and releasing attachments that have become chains rather than anchors. Every act of letting go this year is simultaneously an act of making room. Generosity, compassion, and humanitarian impulses are all amplified — give freely and the universe will give back tenfold.', focus: 'Completion, release, forgiveness, compassion, humanitarian service', avoid: 'Clinging, selfishness, bitterness, starting major new ventures', lifeLesson: 'The lesson of a 9 Year is that endings are not failures — they are graduations. Everything that falls away this year does so because you have outgrown it, and the space it leaves behind is sacred ground for new growth.', spiritualGrowth: 'Your spiritual growth this year comes through the practice of surrender and unconditional love. Release your grip on outcomes, forgive everyone (including yourself), and trust that the universe is clearing your path for something extraordinary.' },
      11: { name: 'The Illumination Year', icon: '⚡', desc: 'A master vibration electrifies this entire year, thinning the veil between the mundane and the mystical in ways that can be both exhilarating and overwhelming. Spiritual awakening, intuitive breakthroughs, prophetic dreams, and moments of sudden, crystal-clear knowing are all heightened. You may feel called to inspire others, to share spiritual insights, or to step into a leadership role that serves a higher purpose. The intensity of 11 demands that you ground yourself through daily practice while remaining open to the extraordinary.', focus: 'Intuition, inspiration, spiritual leadership, visionary thinking', avoid: 'Nervous tension, self-doubt, manipulation, ignoring spiritual calls', lifeLesson: 'The lesson of an 11 Year is that you are both human and divine, and your task is to bridge these two realities. The insights you receive this year are not just for you — they are meant to be shared in service to others.', spiritualGrowth: 'This is a year of profound spiritual acceleration. You may experience kundalini awakenings, psychic openings, or a complete restructuring of your belief system. Trust the process, even when it feels disorienting.' },
      22: { name: 'The Master Builder Year', icon: '🏛️', desc: 'The most powerful manifestation energy in the entire numerological system flows through this rare master year. The vibration of 22 combines the spiritual vision of 11 with the practical building power of 4, creating an extraordinary opportunity to manifest grand visions into tangible reality. Think bigger than you have ever allowed yourself to think — and then take concrete, disciplined action toward that vision. This is a year when the impossible becomes merely improbable, and the improbable becomes achievable through focused effort and unwavering belief.', focus: 'Large-scale projects, legacy building, practical idealism, service', avoid: 'Overwhelm, control issues, thinking too small, neglecting details', lifeLesson: 'The lesson of a 22 Year is that the greatest achievements are those that serve something larger than yourself. Your personal ambition, when aligned with a vision that benefits others, becomes an unstoppable force for positive change.', spiritualGrowth: 'Your spiritual growth this year comes through the sacred act of building. Every structure you create — whether physical, organizational, or conceptual — is a prayer made manifest. Build with love, and your creations will endure.' }
    };

    const pyReduced = personalYear > 9 && ![11,22].includes(personalYear) ?
      this.numerology._reduce(personalYear) : personalYear;
    const theme = yearThemes[pyReduced] || yearThemes[1];

    return {
      year: forecastYear,
      personalYear,
      prevYear,
      nextYear,
      theme,
      chineseYear,
      birthChinese,
      yearEnergy,
      quarters,
      monthlyEnergies,
      currentPinnacle,
      pinnacles,
      challenges,
      age,
      cyclePosition: ((forecastYear - year) % 9) || 9,
      isNewCycle: personalYear === 1,
      isMasterYear: [11, 22, 33].includes(personalYear)
    };
  },

  _getQuarterTheme(q, pm1, pm2, pm3, py) {
    const labels = ['Q1: Foundation', 'Q2: Growth', 'Q3: Harvest', 'Q4: Integration'];
    const icons = ['🌱', '☀️', '🍂', '❄️'];
    const themes = [
      `The opening quarter sets the tone for your entire year. Personal Months ${pm1}, ${pm2}, and ${pm3} create a foundation-laying energy that asks you to clarify your intentions, organize your resources, and build the momentum that will carry you through the months ahead. Think of this quarter as planting season — every seed of effort you place in the ground now determines what you will harvest later. Be deliberate, be patient, and trust that the invisible work happening beneath the surface is just as important as what is visible above it.`,
      `The second quarter brings your year into full bloom. Personal Months ${pm1}, ${pm2}, and ${pm3} combine to create an expansive, growth-oriented energy that pushes you toward your goals with increasing momentum. This is the time to take the intentions you set in Q1 and give them legs — launch projects, deepen relationships, expand your reach, and push beyond the boundaries of what felt comfortable three months ago. The sun is at its highest, and so is your potential for visible, tangible progress.`,
      `The harvest quarter arrives, and the fruits of your earlier efforts are ready to be gathered. Personal Months ${pm1}, ${pm2}, and ${pm3} create a reaping energy that rewards the seeds you planted and the foundations you built. This is a time of recognition, completion, and the satisfying feeling of seeing your work produce real results. Not everything will have turned out exactly as planned — and that is part of the wisdom this quarter offers. Celebrate what worked, learn from what didn't, and gather your harvest with gratitude.`,
      `The closing quarter draws the year toward its natural conclusion with an energy of reflection, integration, and preparation. Personal Months ${pm1}, ${pm2}, and ${pm3} ask you to look back at the journey of the past nine months, extract the lessons, release what no longer serves you, and begin the quiet inner work of preparing for the year ahead. This is not a time for major new launches — it is a time for completion, gratitude, and the kind of deep rest that makes new beginnings possible.`
    ];
    return { name: labels[q], icon: icons[q], desc: themes[q] };
  },

  _getQuarterEnergy(pm1, pm2, pm3) {
    const energyMap = { 1: 80, 2: 50, 3: 75, 4: 60, 5: 85, 6: 65, 7: 45, 8: 90, 9: 55, 11: 70, 22: 80 };
    const e1 = energyMap[pm1 > 9 && ![11,22].includes(pm1) ? this.numerology._reduce(pm1) : pm1] || 60;
    const e2 = energyMap[pm2 > 9 && ![11,22].includes(pm2) ? this.numerology._reduce(pm2) : pm2] || 60;
    const e3 = energyMap[pm3 > 9 && ![11,22].includes(pm3) ? this.numerology._reduce(pm3) : pm3] || 60;
    return Math.round((e1 + e2 + e3) / 3);
  },

  _monthEnergy(pm) {
    const energyMap = { 1: 80, 2: 50, 3: 75, 4: 60, 5: 85, 6: 65, 7: 45, 8: 90, 9: 55, 11: 70, 22: 80 };
    const reduced = pm > 9 && ![11,22].includes(pm) ? this.numerology._reduce(pm) : pm;
    return energyMap[reduced] || 60;
  },

  // ==========================================
  // CROSS-REFERENCE SYNTHESIS ENGINE
  // ("Who You Really Are")
  // ==========================================
  generateSynthesis(birthData, forecastDate) {
    const { name, month, day, year, birthTime } = birthData;
    const fd = new Date(forecastDate);
    const bd = new Date(year, month - 1, day);
    const forecast = this.generateForecast(birthData, fd);

    // Core numbers & signs
    const lp = forecast.lifePath;
    const dest = forecast.destiny;
    const soul = forecast.soulUrge;
    const pers = forecast.personality;
    const bday = forecast.birthday;
    const mat = forecast.maturity;
    const sun = forecast.sunSign;
    const sunEl = forecast.sunElement;
    const chinese = forecast.chineseZodiac;
    const birthMoon = this.moonPhase.calculate(bd);

    // ---- CORE IDENTITY ----
    const coreIdentity = this._synthCoreIdentity(lp, sun, sunEl, chinese, birthMoon);

    // ---- PERSONALITY MATRIX ----
    const personalityMatrix = this._synthPersonality(lp, dest, soul, pers, bday, mat, sun, chinese);

    // ---- LIFE PURPOSE ----
    const lifePurpose = this._synthLifePurpose(lp, dest, sun, chinese, mat);

    // ---- RELATIONSHIP DNA ----
    const relationshipDNA = this._synthRelationships(soul, pers, sun, chinese, birthMoon);

    // ---- CAREER BLUEPRINT ----
    const careerBlueprint = this._synthCareer(dest, pers, lp, sun, chinese);

    // ---- CURRENT COSMIC WEATHER ----
    const cosmicWeather = this._synthCosmicWeather(forecast);

    // ---- HIDDEN PATTERNS ----
    const hiddenPatterns = this._synthHiddenPatterns(lp, dest, soul, pers, bday, mat, sun, chinese, birthMoon);

    return {
      coreIdentity,
      personalityMatrix,
      lifePurpose,
      relationshipDNA,
      careerBlueprint,
      cosmicWeather,
      hiddenPatterns,
      // Raw data for display
      lifePath: lp,
      destiny: dest,
      soulUrge: soul,
      personality: pers,
      birthday: bday,
      maturity: mat,
      sunSign: sun,
      sunElement: sunEl,
      chineseAnimal: chinese.animal,
      chineseElement: chinese.element,
      birthMoonPhase: birthMoon.name
    };
  },

  _synthCoreIdentity(lp, sun, sunEl, chinese, birthMoon) {
    const lpTraits = {
      1: 'independent leader', 2: 'sensitive diplomat', 3: 'creative communicator',
      4: 'practical builder', 5: 'freedom-seeking adventurer', 6: 'nurturing protector',
      7: 'mystical seeker', 8: 'powerful manifester', 9: 'compassionate humanitarian',
      11: 'visionary illuminator', 22: 'master architect', 33: 'divine healer'
    };
    const elementTraits = {
      Fire: 'passionate and action-oriented', Earth: 'grounded and sensual',
      Air: 'intellectual and communicative', Water: 'intuitive and emotional'
    };
    const chineseTraits = {
      Rat: 'resourceful strategist', Ox: 'steadfast worker', Tiger: 'courageous warrior',
      Rabbit: 'gentle diplomat', Dragon: 'charismatic visionary', Snake: 'wise mystic',
      Horse: 'free-spirited adventurer', Goat: 'artistic dreamer', Monkey: 'clever innovator',
      Rooster: 'precise perfectionist', Dog: 'loyal guardian', Pig: 'generous soul'
    };
    const moonTraits = {
      'New Moon': 'a soul born to initiate and pioneer',
      'Waxing Crescent': 'a soul driven to build momentum and overcome',
      'First Quarter': 'a soul of decisive action and courage',
      'Waxing Gibbous': 'a soul that refines and perfects',
      'Full Moon': 'a soul of illumination and full expression',
      'Waning Gibbous': 'a soul meant to teach and share wisdom',
      'Last Quarter': 'a soul learning to release and transform',
      'Waning Crescent': 'an old soul of deep intuition and surrender'
    };

    const lpTrait = lpTraits[lp] || lpTraits[1];
    const elTrait = elementTraits[sunEl] || 'balanced';
    const cnTrait = chineseTraits[chinese.animal] || 'unique spirit';
    const mnTrait = moonTraits[birthMoon.name] || 'a soul on a unique journey';

    // Cross-system elemental analysis
    const westernEl = sunEl;
    const chineseEl = chinese.element;
    const elementSynergy = westernEl === 'Fire' && ['Fire','Wood'].includes(chineseEl) ? 'Your double fire/wood influence creates an intensely passionate and growth-oriented nature — you burn bright and grow fast.' :
      westernEl === 'Earth' && ['Earth','Metal'].includes(chineseEl) ? 'Your double earth/metal influence creates remarkable stability and determination — you are the mountain that does not move.' :
      westernEl === 'Air' && ['Metal','Water'].includes(chineseEl) ? 'Your air and metal/water combination creates a brilliantly analytical and fluid mind — you think with both logic and intuition.' :
      westernEl === 'Water' && ['Water','Wood'].includes(chineseEl) ? 'Your double water/wood influence creates profound emotional depth and natural growth — you flow around obstacles and grow through everything.' :
      `Your ${westernEl} (Western) and ${chineseEl} (Chinese) elements create a fascinating interplay — the ${elTrait} quality of your sun sign is tempered and enriched by the ${chineseEl.toLowerCase()} energy of your Chinese zodiac, producing a multidimensional personality that defies simple categorization.`;

    return {
      title: `The ${sun} ${lpTrait.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}`,
      summary: `At your core, you are a ${lpTrait} (Life Path ${lp}) expressed through the ${elTrait} lens of ${sun} (${sunEl} sign). The Chinese zodiac adds the energy of the ${cnTrait} (${chinese.element} ${chinese.animal}), while your birth under a ${birthMoon.name} makes you ${mnTrait}. This is not a random collection of traits — it is a precisely calibrated soul blueprint, each system illuminating a different facet of who you truly are.`,
      elements: {
        western: `${sun} (${sunEl})`,
        numerology: `Life Path ${lp}`,
        chinese: `${chinese.element} ${chinese.animal}`,
        lunar: birthMoon.name
      },
      essence: `Your essence blends ${sunEl} energy with the vibration of ${lp}, creating a unique soul signature that is both ${elTrait} and driven by the path of the ${lpTrait}. ${elementSynergy} The ${birthMoon.name} under which you were born adds a final, crucial layer: it shapes your emotional instincts, your relationship with cycles of growth and release, and the deepest rhythms of your inner life. Together, these systems paint a portrait of a soul that is far more complex, capable, and purposeful than any single system could reveal alone.`
    };
  },

  _synthPersonality(lp, dest, soul, pers, bday, mat, sun, chinese) {
    // How the world sees you vs who you really are
    const publicSelf = `Your Personality Number ${pers} is the mask you wear — the first impression you make on the world, the energy people feel when you walk into a room. Combined with your ${sun} sun sign, people see you as ${this._persDescription(pers, sun)}. This is not a false self — it is a genuine facet of who you are, but it is only the surface layer of a much deeper story.`;
    const privateSelf = `Your Soul Urge ${soul} reveals the secret engine that drives everything you do — the desires so deep that even you may not always be conscious of them. Beneath every decision, every relationship, every career move, you are secretly seeking ${this._soulDescription(soul)}. When your outer life aligns with this inner hunger, you feel a profound sense of rightness. When it doesn't, no amount of external success can fill the void.`;
    const destinyCall = `Your Destiny Number ${dest} is the cosmic assignment you accepted before you were born — the mission your life is designed to fulfill. Your path leads toward ${this._destDescription(dest)}. This is not something you need to force or manufacture; it is something you grow into naturally as you honor your authentic nature and follow the breadcrumbs the universe leaves for you.`;
    const matureSelf = `Your Maturity Number ${mat} is perhaps the most beautiful number in your chart — it reveals the person you are becoming, the wisdom that crystallizes in your later years as all your life experiences distill into their purest essence. You are evolving toward ${this._matDescription(mat)}. This is the gift that awaits you on the other side of all your struggles and triumphs.`;

    // Harmony/tension between numbers
    const tensions = [];
    const harmonies = [];
    if (Math.abs(soul - pers) > 4) tensions.push(`⚡ Inner-Outer Tension: Your inner desires (Soul Urge ${soul}) and outer persona (Personality ${pers}) pull in different directions, creating a creative tension that can feel like being misunderstood. The world sees one version of you while your heart yearns for something quite different. The resolution lies not in choosing one over the other, but in finding ways to honor both.`);
    else harmonies.push(`✨ Inner-Outer Harmony: Your inner desires (Soul Urge ${soul}) and outer persona (Personality ${pers}) are beautifully aligned — what you show the world is genuinely who you are inside. This congruence gives you an authenticity that others can feel, even if they can't name it.`);
    if (lp === dest || Math.abs(lp - dest) <= 2) harmonies.push(`✨ Path-Purpose Alignment: Your Life Path (${lp}) and Destiny (${dest}) work in natural harmony — your innate talents and natural way of moving through the world directly serve your life's mission. You don't have to become someone else to fulfill your purpose; you just have to become more fully yourself.`);
    else tensions.push(`⚡ Path-Purpose Growth: Your Life Path (${lp}) and Destiny (${dest}) create a productive tension — your natural tendencies and your life's mission don't always point in the same direction. This is not a flaw; it is a feature. The stretch between these two numbers is where your greatest growth and most meaningful achievements occur.`);

    return { publicSelf, privateSelf, destinyCall, matureSelf, tensions, harmonies };
  },

  _persDescription(num, sun) {
    const descs = {
      1: 'confident, independent, and self-assured', 2: 'gentle, approachable, and diplomatic',
      3: 'charming, expressive, and socially magnetic', 4: 'reliable, organized, and trustworthy',
      5: 'dynamic, adventurous, and magnetically attractive', 6: 'warm, responsible, and nurturing',
      7: 'mysterious, intellectual, and reserved', 8: 'powerful, authoritative, and successful',
      9: 'worldly, compassionate, and sophisticated',
      11: 'inspiring, intuitive, and spiritually radiant', 22: 'visionary, capable, and masterful'
    };
    return descs[num] || descs[1];
  },

  _soulDescription(num) {
    const descs = {
      1: 'independence, leadership, and being first', 2: 'love, harmony, and deep connection',
      3: 'creative expression, joy, and recognition', 4: 'stability, order, and tangible results',
      5: 'freedom, variety, and sensory experience', 6: 'love, beauty, and family harmony',
      7: 'knowledge, truth, and spiritual understanding', 8: 'power, success, and material abundance',
      9: 'universal love, wisdom, and making a difference',
      11: 'spiritual illumination and inspiring others', 22: 'building something monumental for humanity'
    };
    return descs[num] || descs[1];
  },

  _destDescription(num) {
    const descs = {
      1: 'pioneering leadership and original creation', 2: 'masterful diplomacy and healing partnerships',
      3: 'inspiring communication and creative mastery', 4: 'building lasting structures and systems',
      5: 'teaching freedom through lived experience', 6: 'creating beauty, love, and community',
      7: 'uncovering deep truths and spiritual wisdom', 8: 'manifesting abundance and empowering others',
      9: 'humanitarian service and universal compassion',
      11: 'channeling divine inspiration to uplift humanity', 22: 'manifesting visionary projects that transform the world'
    };
    return descs[num] || descs[1];
  },

  _matDescription(num) {
    const descs = {
      1: 'confident self-reliance and leadership', 2: 'peaceful wisdom and deep empathy',
      3: 'joyful expression and creative fulfillment', 4: 'grounded stability and practical mastery',
      5: 'adventurous wisdom and adaptability', 6: 'loving service and family devotion',
      7: 'profound spiritual insight and inner peace', 8: 'material mastery and generous authority',
      9: 'universal compassion and selfless wisdom',
      11: 'spiritual mastery and intuitive leadership', 22: 'legacy building and practical idealism'
    };
    return descs[num] || descs[1];
  },

  _synthLifePurpose(lp, dest, sun, chinese, mat) {
    const sunStyle = sun === 'Aries' ? 'bold courage and pioneering spirit' : sun === 'Taurus' ? 'patient determination and sensual appreciation' : sun === 'Gemini' ? 'intellectual versatility and communicative brilliance' : sun === 'Cancer' ? 'emotional depth and nurturing wisdom' : sun === 'Leo' ? 'radiant confidence and generous leadership' : sun === 'Virgo' ? 'precise dedication and healing service' : sun === 'Libra' ? 'graceful balance and aesthetic harmony' : sun === 'Scorpio' ? 'transformative intensity and psychological depth' : sun === 'Sagittarius' ? 'expansive optimism and philosophical vision' : sun === 'Capricorn' ? 'disciplined ambition and structural mastery' : sun === 'Aquarius' ? 'innovative vision and humanitarian idealism' : 'compassionate intuition and spiritual sensitivity';

    const purposeBlend = `Your life purpose is written in a language that requires multiple cosmic systems to fully decode. Your Life Path ${lp} provides the journey — the terrain you must cross, the lessons you must learn, the challenges that forge your character. Your Destiny ${dest} provides the destination — the ultimate expression of your potential, the person you are becoming through every experience. And your ${sun} sun sign provides the style — the unique, unmistakable way you walk your path and fulfill your mission. As a ${chinese.element} ${chinese.animal}, you bring the additional dimension of ${chinese.element.toLowerCase()} energy to everything you do, coloring your purpose with qualities that neither Western astrology nor numerology alone could predict.`;
    const missionStatement = `You are here to walk the path of ${this._destDescription(lp)}, ultimately becoming a master of ${this._destDescription(dest)}. Your ${sun} nature ensures you do this with ${sunStyle}. This is not a purpose you need to search for — it is a purpose that has been searching for you since the moment you were born. Every experience you have ever had, every challenge you have ever faced, every joy you have ever known has been preparing you for the full expression of this mission.`;
    const maturityPromise = `As you mature, your Maturity Number ${mat} promises a deepening into ${this._matDescription(mat)}. Think of this as the final movement of a symphony — all the themes, melodies, and harmonies of your earlier years resolve into something profoundly beautiful. The struggles of youth become the wisdom of age, and the questions that once tormented you become the answers you offer to others. This is the gift that awaits you on the far side of all your becoming.`;

    return { purposeBlend, missionStatement, maturityPromise };
  },

  _synthRelationships(soul, pers, sun, chinese, birthMoon) {
    const sunLoveStyle = sun === 'Aries' ? 'passionate, direct, and refreshingly honest' : sun === 'Taurus' ? 'sensual, devoted, and deeply loyal' : sun === 'Gemini' ? 'playful, intellectually stimulating, and endlessly curious' : sun === 'Cancer' ? 'nurturing, protective, and emotionally profound' : sun === 'Leo' ? 'generous, dramatic, and fiercely loyal' : sun === 'Virgo' ? 'devoted, attentive, and quietly selfless' : sun === 'Libra' ? 'romantic, harmonious, and aesthetically attuned' : sun === 'Scorpio' ? 'intense, transformative, and psychologically penetrating' : sun === 'Sagittarius' ? 'adventurous, honest, and freedom-respecting' : sun === 'Capricorn' ? 'committed, traditional, and steadfastly reliable' : sun === 'Aquarius' ? 'unconventional, intellectually bonding, and freedom-loving' : 'dreamy, spiritually connected, and boundlessly compassionate';

    const loveStyle = `Your Soul Urge ${soul} is the hidden engine of your love life — it reveals what you truly seek beneath the surface of every romantic connection. At the deepest level, you crave ${this._soulDescription(soul)} in relationships, and no amount of surface-level compatibility can substitute for this core need being met. Your ${sun} nature adds a ${sunLoveStyle} approach to love, creating a distinctive romantic signature that is uniquely yours. When someone resonates with both your Soul Urge and your sun sign energy, the connection feels electric and inevitable — as if you have known each other across lifetimes.`;
    const attractionPattern = `Your Personality Number ${pers} creates your romantic first impression — the energy that draws people toward you before they know anything about your deeper nature. People are initially attracted to your ${this._persDescription(pers, sun)} exterior, and this is genuinely part of who you are. But lasting love requires a partner who can see past this surface layer and resonate with your Soul Urge ${soul} — your profound need for ${this._soulDescription(soul)}. The relationships that endure are those where someone falls in love with your Personality and then discovers they are equally captivated by your Soul.`;
    const chineseCompat = `In Chinese astrology, your ${chinese.element} ${chinese.animal} carries its own relationship wisdom. Your ${chinese.animal} is most harmoniously matched with ${chinese.animal === 'Rat' ? 'Dragon, Monkey, and Ox — signs that complement your resourcefulness with their own brands of power, cleverness, and steadfastness' : chinese.animal === 'Ox' ? 'Rat, Snake, and Rooster — signs that honor your dedication with their own loyalty, wisdom, and precision' : chinese.animal === 'Tiger' ? 'Horse, Dog, and Pig — signs that match your courage with their own freedom, loyalty, and generosity' : chinese.animal === 'Rabbit' ? 'Goat, Dog, and Pig — signs that appreciate your gentleness with their own creativity, loyalty, and warmth' : chinese.animal === 'Dragon' ? 'Rat, Monkey, and Rooster — signs that match your charisma with their own intelligence, wit, and confidence' : chinese.animal === 'Snake' ? 'Ox, Rooster, and Monkey — signs that complement your wisdom with their own reliability, precision, and cleverness' : chinese.animal === 'Horse' ? 'Tiger, Goat, and Rabbit — signs that share your love of freedom with their own courage, creativity, and diplomacy' : chinese.animal === 'Goat' ? 'Rabbit, Horse, and Pig — signs that nurture your artistic soul with their own gentleness, adventure, and generosity' : chinese.animal === 'Monkey' ? 'Rat, Dragon, and Snake — signs that appreciate your cleverness with their own resourcefulness, power, and depth' : chinese.animal === 'Rooster' ? 'Ox, Snake, and Dragon — signs that respect your precision with their own dedication, wisdom, and charisma' : chinese.animal === 'Dog' ? 'Tiger, Rabbit, and Horse — signs that honor your loyalty with their own courage, gentleness, and freedom' : 'Rabbit, Goat, and Tiger — signs that embrace your generosity with their own diplomacy, creativity, and bravery'}. The ${chinese.element} element adds another dimension: ${chinese.element === 'Metal' ? 'you love with fierce determination and expect loyalty in return' : chinese.element === 'Water' ? 'you love with fluid adaptability and deep emotional intuition' : chinese.element === 'Wood' ? 'you love with generous growth-orientation and natural warmth' : chinese.element === 'Fire' ? 'you love with passionate intensity and magnetic charisma' : 'you love with patient devotion and grounding stability'}.`;
    const moonInfluence = `Born under a ${birthMoon.name}, your emotional nature in relationships carries a distinctive lunar signature. The energy of ${birthMoon.energy.toLowerCase()} colors how you bond with partners, how you navigate conflict, and how you heal after heartbreak. ${birthMoon.name === 'New Moon' ? 'You bring fresh, initiating energy to relationships — you are the one who makes the first move, who proposes new adventures, who refuses to let love become stale.' : birthMoon.name === 'Full Moon' ? 'You bring illuminating, fully expressed emotional energy to relationships — your feelings are vivid, your love is generous, and your presence in a partnership is impossible to ignore.' : birthMoon.name === 'Waning Crescent' ? 'You bring old-soul wisdom to relationships — you understand intuitively that love requires both holding on and letting go, and your partners often feel that you see them more deeply than anyone else ever has.' : 'Your birth moon phase creates a unique emotional rhythm in relationships — understanding this rhythm is key to understanding why you love the way you do.'}`;

    return { loveStyle, attractionPattern, chineseCompat, moonInfluence };
  },

  _synthCareer(dest, pers, lp, sun, chinese) {
    const lpRole = lp === 1 ? 'pioneer and leader who thrives when given autonomy and the freedom to innovate' : lp === 2 ? 'collaborator and mediator who excels in partnership roles and diplomatic positions' : lp === 3 ? 'creative communicator who shines in roles requiring self-expression, presentation, and social connection' : lp === 4 ? 'builder and organizer who creates lasting value through discipline, systems, and meticulous attention to detail' : lp === 5 ? 'innovator and change agent who brings fresh perspectives and thrives in dynamic, evolving environments' : lp === 6 ? 'healer and caretaker who finds deepest fulfillment in roles that nurture, beautify, and serve others' : lp === 7 ? 'analyst and researcher who produces their best work in focused, intellectually stimulating environments' : lp === 8 ? 'executive and strategist who naturally gravitates toward positions of authority and financial responsibility' : lp === 9 ? 'visionary humanitarian who is most fulfilled when their work serves a purpose larger than personal gain' : lp === 11 ? 'inspired leader who channels higher wisdom into practical guidance for others' : 'master builder who manifests grand visions into tangible, world-changing structures';

    const workEnv = sun === 'Aries' ? 'fast-paced, competitive, and action-oriented — you wilt in bureaucratic environments but thrive where initiative is rewarded' : sun === 'Taurus' ? 'stable, aesthetically pleasing, and financially rewarding — you need beauty in your workspace and tangible results from your efforts' : sun === 'Gemini' ? 'varied, intellectually stimulating, and socially connected — routine is your kryptonite, but mental challenge is your fuel' : sun === 'Cancer' ? 'emotionally supportive, family-like, and purposeful — you need to feel that your work matters to real people' : sun === 'Leo' ? 'creative, recognition-rich, and leadership-oriented — you need a stage, an audience, and the freedom to express your vision' : sun === 'Virgo' ? 'organized, detail-oriented, and service-focused — you thrive when your analytical gifts are valued and your precision makes a difference' : sun === 'Libra' ? 'harmonious, collaborative, and aesthetically refined — you work best in beautiful spaces with people who value fairness and teamwork' : sun === 'Scorpio' ? 'intense, research-oriented, and psychologically deep — you excel in roles that require investigation, transformation, and unflinching honesty' : sun === 'Sagittarius' ? 'expansive, freedom-allowing, and philosophically stimulating — you need room to explore, teach, and pursue your vision of truth' : sun === 'Capricorn' ? 'structured, achievement-oriented, and hierarchically clear — you respect tradition and climb steadily toward positions of authority' : sun === 'Aquarius' ? 'innovative, socially conscious, and intellectually free — you are drawn to work that challenges conventions and serves the collective good' : 'creative, spiritually meaningful, and compassionately driven — you need work that feeds your soul as much as your bank account';

    const careerPath = `Your Destiny Number ${dest} points toward careers involving ${this._destDescription(dest)}. This is not just a job description — it is a calling, a professional expression of your soul's deepest purpose. Your Life Path ${lp} ensures you approach work as a ${lpRole}. When your career aligns with both these numbers, work stops feeling like obligation and starts feeling like destiny.`;
    const workStyle = `As a ${sun}, you work best in environments that are ${workEnv}. Understanding your ideal work environment is just as important as choosing the right career — even the perfect role becomes draining in the wrong setting.`;
    const chineseWork = `Your ${chinese.element} ${chinese.animal} energy brings a distinctive professional signature that complements your Western chart: ${chinese.element === 'Metal' ? 'precision, determination, and an almost surgical ability to cut through complexity and focus on what matters. You are the colleague who sees the essential truth in any situation and acts on it with unwavering resolve' : chinese.element === 'Water' ? 'adaptability, intuition, and a fluid intelligence that allows you to navigate office politics, market shifts, and unexpected challenges with remarkable grace. You sense opportunities before they become obvious to others' : chinese.element === 'Wood' ? 'growth-oriented creativity, natural leadership, and an expansive vision that inspires teams and organizations to reach beyond their perceived limitations. You are the one who sees potential where others see problems' : chinese.element === 'Fire' ? 'passionate charisma, dynamic energy, and an infectious enthusiasm that motivates everyone around you. You light up rooms, ignite projects, and bring warmth and excitement to even the most mundane professional tasks' : 'grounding stability, patient wisdom, and a practical intelligence that turns abstract ideas into concrete results. You are the foundation upon which successful teams and projects are built'}.`;

    return { careerPath, workStyle, chineseWork };
  },

  _synthCosmicWeather(forecast) {
    const { personalDay, personalMonth, personalYear, moonPhase, biorhythm, dayEnergy, transitAspects, sunSign, transits } = forecast;

    // How today's energy specifically affects this person's unique profile
    const dayAlignment = dayEnergy.overall > 70 ? 'strongly aligned' : dayEnergy.overall > 50 ? 'moderately aligned' : dayEnergy.overall > 30 ? 'somewhat challenging' : 'calling for rest';
    const bioState = biorhythm.physical > 70 && biorhythm.emotional > 70 ? 'Your body and heart are both running high — a rare power window that opens perhaps only a few times each month. When physical vitality and emotional openness converge like this, you have access to a level of capability that most people never experience. Use it wisely.' :
      biorhythm.physical > 70 ? 'Physical energy surges while emotions run quieter — your body is ready for action, challenge, and endurance. This is an excellent configuration for exercise, physical projects, and any task requiring stamina. Save deep emotional conversations for another day.' :
      biorhythm.emotional > 70 ? 'Emotional sensitivity is beautifully heightened today — your empathy, creativity, and capacity for deep connection are all amplified. This is perfect for artistic expression, heart-to-heart conversations, and any work that requires emotional intelligence.' :
      biorhythm.intellectual > 70 ? 'Mental clarity reaches its peak today — your analytical abilities, strategic thinking, and capacity for complex problem-solving are all sharpened to a fine edge. This is the day for important decisions, research, study, and any task requiring sustained concentration.' :
      'Your biorhythm cycles are in a conservation phase — and this is not a weakness, it is wisdom. Your body, heart, and mind are asking for gentleness, and honoring this request is one of the most powerful things you can do. Rest strategically today, knowing that your energy will return stronger for having been respected.';

    const harmoniousAspects = transitAspects.filter(a => ['Trine','Sextile'].includes(a.aspect));
    const tenseAspects = transitAspects.filter(a => ['Square','Opposition'].includes(a.aspect));
    const aspectSummary = harmoniousAspects.length > tenseAspects.length ?
      `The planetary geometry today is distinctly favorable, with ${harmoniousAspects.length} harmonious aspect${harmoniousAspects.length > 1 ? 's' : ''} flowing supportive energy to your ${sunSign} Sun. Doors open more easily, conversations flow more naturally, and your efforts meet less resistance than usual. This is cosmic wind at your back — lean into it.` :
      tenseAspects.length > harmoniousAspects.length ?
      `Today's planetary geometry brings ${tenseAspects.length} challenging aspect${tenseAspects.length > 1 ? 's' : ''} to your chart, creating productive friction that drives growth. This is not punishment — it is the universe's way of polishing your rough edges and strengthening your resolve. Your ${sunSign} resilience is being called upon, and you have more of it than you think.` :
      `The cosmic weather today holds a balanced mix of support and challenge, creating a nuanced energetic landscape that rewards awareness and adaptability. Neither purely easy nor purely difficult, this is a day that responds to your attitude — approach it with consciousness and it will yield its gifts.`;

    // Planetary weather narrative
    const planetaryWeather = `The Sun illuminates ${transits.sun.sign}, setting the collective tone for vitality and self-expression. The Moon moves through ${transits.moon.sign}, coloring the emotional atmosphere with ${this.astrology.getElement(this.astrology.getSignIndex(transits.moon.sign)).toLowerCase()} energy. Mercury in ${transits.mercury.sign} shapes the day's communication style, Venus in ${transits.venus.sign} influences matters of love and beauty, and Mars in ${transits.mars.sign} directs the collective drive and ambition.`;

    return {
      dayAlignment,
      bioState,
      aspectSummary,
      planetaryWeather,
      moonGuidance: `The ${moonPhase.name} hangs in the sky at ${moonPhase.illumination}% illumination, carrying the energy of ${moonPhase.energy.toLowerCase()}. This lunar phase is not just a celestial event — it is a rhythm that your body, emotions, and spirit are attuned to at the deepest level. Align your actions with this rhythm: ${moonPhase.index <= 3 ? 'the waxing moon supports building, growing, and moving forward with increasing momentum' : 'the waning moon supports releasing, reflecting, and clearing space for what comes next'}. When you work with the moon rather than against it, everything flows more naturally.`,
      synthesis: `Today you stand at the intersection of Personal Day ${personalDay}, Personal Month ${personalMonth}, and Personal Year ${personalYear} — a unique numerological coordinate that occurs only once in your entire life. The cosmos is ${dayAlignment} with your unique blueprint today. ${bioState} ${aspectSummary} ${planetaryWeather} All of these influences converge upon your specific chart in a way that is entirely unique to you — no one else on Earth experiences this exact combination of energies in quite the same way.`
    };
  },

  _synthHiddenPatterns(lp, dest, soul, pers, bday, mat, sun, chinese, birthMoon) {
    const patterns = [];

    // Number repetitions
    const allNums = [lp, dest, soul, pers, bday, mat];
    const numCounts = {};
    allNums.forEach(n => { numCounts[n] = (numCounts[n] || 0) + 1; });
    Object.entries(numCounts).forEach(([num, count]) => {
      if (count >= 2) {
        patterns.push({
          type: 'Repeated Number',
          icon: '🔢',
          detail: `The number ${num} appears ${count} times in your chart, amplifying its energy of ${this._numMeaning(parseInt(num))}.`
        });
      }
    });

    // Element harmony between Western and Chinese
    const elementMap = { Fire: 'Fire', Earth: 'Earth', Air: 'Metal', Water: 'Water' };
    const westernEl = elementMap[this._getElement(sun)] || 'Earth';
    if (westernEl === chinese.element) {
      patterns.push({
        type: 'Elemental Harmony',
        icon: '🌀',
        detail: `Both your Western (${this._getElement(sun)}) and Chinese (${chinese.element}) elements align — creating a powerful, unified elemental signature.`
      });
    } else {
      const interaction = this._elementInteraction(westernEl, chinese.element);
      patterns.push({
        type: 'Elemental Tension',
        icon: '⚡',
        detail: `Your Western ${this._getElement(sun)} and Chinese ${chinese.element} elements ${interaction} — creating dynamic complexity in your nature.`
      });
    }

    // Master numbers
    if ([11, 22, 33].includes(lp)) {
      patterns.push({
        type: 'Master Number Life Path',
        icon: '👑',
        detail: `Life Path ${lp} is a Master Number — you carry extra spiritual responsibility and potential. This amplifies everything in your chart.`
      });
    }

    // Birth moon + sun sign interaction
    const moonPhaseNum = ['New Moon','Waxing Crescent','First Quarter','Waxing Gibbous','Full Moon','Waning Gibbous','Last Quarter','Waning Crescent'].indexOf(birthMoon.name);
    if (moonPhaseNum >= 4) {
      patterns.push({
        type: 'Waning Birth Moon',
        icon: '🌙',
        detail: `Born under a ${birthMoon.name}, you carry old soul wisdom. You naturally understand endings, release, and the deeper cycles of life.`
      });
    } else if (moonPhaseNum === 0) {
      patterns.push({
        type: 'New Moon Birth',
        icon: '🌑',
        detail: `Born under a New Moon, you are a natural initiator. Each lifetime feels fresh, and you have an innate ability to start from nothing.`
      });
    }

    return patterns;
  },

  _numMeaning(num) {
    const meanings = {
      1: 'leadership and independence', 2: 'partnership and sensitivity', 3: 'creativity and expression',
      4: 'stability and hard work', 5: 'freedom and change', 6: 'love and responsibility',
      7: 'wisdom and spirituality', 8: 'power and abundance', 9: 'compassion and completion',
      11: 'spiritual illumination', 22: 'master building', 33: 'divine teaching'
    };
    return meanings[num] || 'unique vibration';
  },

  _getElement(sign) {
    const elements = { Aries: 'Fire', Taurus: 'Earth', Gemini: 'Air', Cancer: 'Water', Leo: 'Fire', Virgo: 'Earth', Libra: 'Air', Scorpio: 'Water', Sagittarius: 'Fire', Capricorn: 'Earth', Aquarius: 'Air', Pisces: 'Water' };
    return elements[sign] || 'Earth';
  },

  _elementInteraction(el1, el2) {
    if (el1 === el2) return 'harmonize perfectly';
    const creative = { Wood: 'Fire', Fire: 'Earth', Earth: 'Metal', Metal: 'Water', Water: 'Wood' };
    if (creative[el1] === el2 || creative[el2] === el1) return 'feed and support each other';
    return 'challenge and strengthen each other';
  }
};