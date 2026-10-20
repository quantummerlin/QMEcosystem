// ============================================================
// LOVE BLUEPRINT . DATING CONTENT LIBRARY v1.0.0
// ============================================================
// Interpretive copy for every placement the product shows:
//   Sun, Moon, Mercury, Venus, Mars, Rising, Descendant (7th) —
//   7 points x 12 signs = 84 entries, plus the 16 Venus x Mars
//   spark dynamics (names kept identical to love-blueprint.js).
//
// ACCURACY CONTRACT: the astronomically computed SIGN comes from
// spark-engine.js (exact ephemeris). This file only supplies what
// that sign MEANS for dating. Every sign key MUST exist: the
// runtime refuses to render a card whose copy is missing rather
// than fall back to another sign's text.
//
// Voice: warm, specific, second person, zero fatalism. No "you
// will marry", no doom. Describes tendencies and gives agency.
// ============================================================

(function (global) {
    'use strict';

    var CONTENT = {};

    // ---------- VENUS: how you love ----------
    CONTENT.venus = {
        Aries:     { body: 'You love like it\'s a sport you intend to win: direct, enthusiastic, zero mind games. Boredom is your real enemy, not conflict.', why: 'Venus is how you give and receive affection. In fire-sign Aries it wants the thrill of pursuit and honest, immediate expressions of wanting someone.' },
        Taurus:    { body: 'You love in slow motion and in full colour: good food, real touch, plans kept. You are the most loyal sign once someone has earned it.', why: 'Venus rules Taurus, so this is your home placement: love is meant to be tangible and steady for you, not performed.' },
        Gemini:    { body: 'You flirt with words. Banter is your foreplay and curiosity is your aphrodisiac: a boring conversation kills attraction faster than a bad date.', why: 'Venus in air-sign Gemini bonds through ideas and play; you need a partner who can keep up mentally.' },
        Cancer:    { body: 'You love by nurturing: remembering their order, checking they got home, building a soft place to land. You need to feel needed, but watch you don\'t over-give.', why: 'Venus in water-sign Cancer expresses love as care and emotional safety; home and family feelings enter romance early for you.' },
        Leo:       { body: 'You love loudly and generously. Grand gestures, full attention, public pride in your person. You give warmth and you need to be adored back.', why: 'Venus in fire-sign Leo loves as performance and celebration; being genuinely admired is a core need, not vanity.' },
        Virgo:     { body: 'You love in practical details: fixing their CV, noticing when they\'re off, showing up exactly when you said. Your acts of service ARE your love letters.', why: 'Venus in earth-sign Virgo shows devotion through usefulness and thoughtfulness rather than declarations.' },
        Libra:     { body: 'You were built for partnership: charming, fair, allergic to crudeness. You flirt with real grace, but your challenge is choosing instead of keeping options open.', why: 'Venus rules Libra too; romance, beauty and balance are native language to you. Harmony matters almost as much as the person.' },
        Scorpio:   { body: 'You love in the deep end: all-in, magnetic and allergic to anything shallow. Once you trust, you are ferociously loyal and you want the same back.', why: 'Venus in water-sign Scorpio craves fusion and truth, not surface flirting. This is why casual dating drains you.' },
        Sagittarius:{ body: 'You love with freedom as the ground rule: laughter, adventure, big honest talk. Commitment works for you when it never feels like a cage.', why: 'Venus in fire-sign Sagittarius bonds through shared meaning and exploration; you fall for people who expand your world.' },
        Capricorn: { body: 'You love like you\'re building something: patient, selective and quietly devoted. You court with ambition and reliability, and you respect someone with their own plans.', why: 'Venus in earth-sign Capricorn treats love as a long-term investment; you show commitment by investing real time and resources.' },
        Aquarius:  { body: 'You love with your mind first: friendship, freedom and mutual weirdness. You need space to breathe and a partner who never makes you feel owned.', why: 'Venus in air-sign Aquarius bonds through ideals and individuality; you fall for interesting people before attractive ones.' },
        Pisces:    { body: 'You love with no armour on: romantic, intuitive and ready to see the best in someone. Gorgeous gift, but boundaries are the skill to pair with it.', why: 'Venus in water-sign Pisces merges and idealises; you genuinely experience love as something bigger than the two of you.' }
    };

    // ---------- MOON: what makes you feel safe ----------
    CONTENT.moon = {
        Aries:     { body: 'You feel safe when things MOVE. Stagnation reads as danger to your nervous system. You need a partner who can handle your fires without dousing them.', why: 'The Moon rules emotional security. In Aries it self-soothes through action: you process feelings by doing, and calm comes after movement, not before.' },
        Taurus:    { body: 'You need consistency, warmth and physical comfort to feel safe. Slow, steady affection beats grand gestures; trust is built over months, not one hot night.', why: 'Your Moon settles only when love feels reliable and tangible: food, touch, showing up on time, again and again.' },
        Gemini:    { body: 'You process feelings by talking them into shape. Silence stresses you more than arguing does. You need a partner who thinks out loud with you.', why: 'The Moon in air-sign Gemini metabolises emotion through language; being heard IS being comforted for you.' },
        Cancer:    { body: 'You feel everything deeply and remember how it felt. Home, ritual and emotional reciprocity are non-negotiable. You give that safety and need it returned.', why: 'The Moon rules Cancer, its home sign: your emotional memory is vivid and your need for safety in love is strong and legitimate.' },
        Leo:       { body: 'You feel safe when you\'re celebrated, not tolerated. Warmth, affection in public, genuine pride in who you are: indifference is the one thing you can\'t survive.', why: 'The Moon in fire-sign Leo needs emotional expression to be visible. Being adored by your person calms your nervous system.' },
        Virgo:     { body: 'You soothe yourself by making things orderly, and you show care by noticing details. The trap: worrying as a love language. Say the feeling, not just the fix.', why: 'The Moon in earth-sign Virgo processes emotion through analysis and service; uncertainty feels worse than bad news.' },
        Libra:     { body: 'You feel safe in harmony: conflict physically unsettles you. You need a partner who fights fair, because you will over-accommodate to keep the peace.', why: 'The Moon in air-sign Libra regulates through relationship; being in good standing with your person is emotional oxygen.' },
        Scorpio:   { body: 'You feel in extremes and detect every unspoken thing. Trust is all-or-nothing territory. You need radical honesty, and you go silent instead of asking.', why: 'The Moon in water-sign Scorpio needs emotional truth at depth. Surface comfort doesn\'t register; loyalty does.' },
        Sagittarius:{ body: 'You self-soothe with space, humour and meaning. Heavy emotional processing feels confining. You need a partner who can ride your need for freedom without reading it as rejection.', why: 'The Moon in fire-sign Sagittarius metabolises feeling through movement and philosophy; you brighten by looking forward.' },
        Capricorn: { body: 'You feel safe when love is reliable and earned. You don\'t need constant reassurance. You need someone who shows up, keeps their word and doesn\'t fall apart when you do.', why: 'The Moon in earth-sign Capricorn trusts proof over promises: consistency, follow-through, competence. You withdraw when hurt rather than cry out: the one habit to watch.' },
        Aquarius:  { body: 'You need emotional space the way others need touch. You care deeply but process privately: a partner who demands constant emotional merging will lose you.', why: 'The Moon in air-sign Aquarius regulates through detachment and friendship; feelings are processed in the mind before they ever reach the surface.' },
        Pisces:    { body: 'You absorb the emotional weather of every room. You need a partner with their own boundaries to hold, or you will drown for two and call it love.', why: 'The Moon in water-sign Pisces is porous by design. Your empathy is a gift that requires protection to stay a gift.' }
    };

    // ---------- MERCURY: how you communicate & flirt ----------
    CONTENT.mercury = {
        Aries:     { body: 'Direct, fast, zero subtext. You say what you want and expect the same: hesitation reads as disinterest to you (it usually isn\'t).', why: 'Mercury is your communication style. In Aries it is a spark: honest, impatient, refreshingly unfiltered.' },
        Taurus:    { body: 'Slow, warm and deliberate. You choose words like you\'re buying something worth keeping, and your steadiness makes people say true things to you.', why: 'Mercury in earth-sign Taurus thinks things through before speaking; your calm tone is quietly disarming.' },
        Gemini:    { body: 'Fast, funny, endlessly curious. You flirt by making conversation electric, and you need banter the way others need touch.', why: 'Mercury rules Gemini: words are your native instrument. Mental chemistry isn\'t optional for you, it IS attraction.' },
        Cancer:    { body: 'You speak from the heart and remember every word said to yours. Meaning lives in your tone more than your words: text-only dating loses half of you.', why: 'Mercury in water-sign Cancer communicates emotionally and protectively; what people feel from you matters more than what they hear.' },
        Leo:       { body: 'Bold, theatrical, generous with praise. You flirt by making someone feel like the only person in the room, and you want that energy returned.', why: 'Mercury in fire-sign Leo speaks in colour and confidence; your enthusiasm is contagious when it\'s honest.' },
        Virgo:     { body: 'Precise, witty, observant. You notice everything and say the useful thing, but your inner critic narrates too loudly. Say the kind thought out loud too.', why: 'Mercury rules Virgo: your mind sorts, edits and perfects. In dating your clarity is a gift; your self-editing, a tax.' },
        Libra:     { body: 'Charming, fair and conversational. You flirt by making the other person feel interesting, and you dislike discord enough to smooth things over fast.', why: 'Mercury in air-sign Libra is diplomatic and relational: you think out loud WITH someone rather than AT them.' },
        Scorpio:   { body: 'You speak in undertones and hear everything unsaid. Questions feel like probes and silence like pressure. You need someone whose words are as real as your instincts.', why: 'Mercury in water-sign Scorpio communicates at depth; small talk costs you energy and honesty earns you instantly.' },
        Sagittarius:{ body: 'Blunt in the best way: big ideas, honest takes, jokes that land sideways. You flirt with candour and bore fast with anyone who plays games.', why: 'Mercury in fire-sign Sagittarius speaks freely and needs a partner who can handle straight talk and laugh at it too.' },
        Capricorn: { body: 'Measured, dry-funny, allergic to nonsense. You mean what you say, which makes your compliments land harder than anyone\'s.', why: 'Mercury in earth-sign Capricorn communicates with economy and authority; you treat words as commitments.' },
        Aquarius:  { body: 'Quirky, cerebral, a beat ahead. You flirt with ideas and unexpected questions: being understood mentally is your favourite aphrodisiac.', why: 'Mercury in air-sign Aquarius thinks laterally; your odd angles on things are exactly why the right people adore you.' },
        Pisces:    { body: 'Poetic, intuitive, occasionally vague. You communicate vibes more than bullet points: the right person hears whole paragraphs in your pauses.', why: 'Mercury in water-sign Pisces processes through imagery and feeling; your language is impressionistic and often startlingly accurate.' }
    };

    // ---------- MARS: chemistry, desire, pursuit ----------
    CONTENT.mars = {
        Aries:     { body: 'You spark fast and pursue directly. The chase excites you. You need someone who can keep up without turning it into a competition.', why: 'Mars rules Aries, its home sign: desire is immediate, bold and honest about wanting you.' },
        Taurus:    { body: 'Slow burn, high heat. You take your time deciding and forever once decided. Your desire is sensual, patient and remarkably hard to distract.', why: 'Mars in earth-sign Taurus builds like a bank vault: unhurried, substantial and stubborn once locked on.' },
        Gemini:    { body: 'Your chemistry is mental and mischievous. Words do what hands do for others, and inconsistency thrills you until it doesn\'t.', why: 'Mars in air-sign Gemini pursues through curiosity and conversation; you want a mind that keeps you chasing.' },
        Cancer:    { body: 'You want fiercely but move carefully: protecting your heart while longing for depth. Your desire is emotional before it is physical, always.', why: 'Mars in water-sign Cancer acts through feeling; you pursue indirectly until safety is proven, then with total devotion.' },
        Leo:       { body: 'Warm, generous and a little theatrical. You pursue with wholehearted charm and want to be admired, not merely liked. Boredom kills attraction faster than conflict.', why: 'Mars in fire-sign Leo is expressive and proud: you flirt boldly, love loudly and need a partner who enjoys watching you shine.' },
        Virgo:     { body: 'Practical, attentive, exact. You show desire by making someone\'s life better, and your standards are as high for yourself as anyone. Let some of it be fun.', why: 'Mars in earth-sign Virgo channels drive into service and improvement; competence genuinely arouses you.' },
        Libra:     { body: 'You pursue by creating momentum two: dates, aesthetics, mutual effort. Open conflict drains you; you need passion that still feels like partnership.', why: 'Mars in air-sign Libra acts through relationship; you want desire that stays graceful and reciprocal.' },
        Scorpio:   { body: 'All-consuming and unmistakable. Your desire is depth-seeking, possessive in the old sense and transformative. You either merge or you don\'t bother.', why: 'Mars rules Scorpio: raw drive meets emotional intensity. This is the strongest desire placement in the zodiac, and it knows it.' },
        Sagittarius:{ body: 'Adventurous, honest, allergic to clinginess. You fall for shared horizons, a trip, a cause, a laugh that goes somewhere, not just a face.', why: 'Mars in fire-sign Sagittarius wants the quest; you pursue with optimism and retreat from anything that feels penned in.' },
        Capricorn: { body: 'Disciplined and quietly hungry. You pursue with strategy and staying power: the long game is foreplay to you, and competence is irresistible.', why: 'Mars in earth-sign Capricorn is ambition in the bedroom too: deliberate, enduring and intensely loyal once invested.' },
        Aquarius:  { body: 'Unconventional, cerebral, freedom-first. Desire sparks from originality, and anything scripted kills it instantly.', why: 'Mars in air-sign Aquarius acts on ideas first; you want chemistry that surprises you and never tries to own you.' },
        Pisces:    { body: 'Soft, romantic, chameleon-like. You merge with what you love: beautiful, as long as you remember where they end and you begin.', why: 'Mars in water-sign Pisces desires through imagination and surrender; your tenderness is a strength when it has edges.' }
    };

    // ---------- RISING (Ascendant): first-date vibe ----------
    CONTENT.rising = {
        Aries:     { body: 'You walk in like something is about to happen. Direct eye contact, quick laugh, zero hesitation. People know where they stand with you in sixty seconds.', why: 'Your Rising sign is the mask everyone meets first: the vibe before you speak. Aries rising reads as confident and immediate.' },
        Taurus:    { body: 'Calm, grounded, quietly magnetic. You have a steadiness people relax into, and a voice or smile that lingers in memory longer than any pickup line.', why: 'Your Rising sign is the first impression. Taurus rising reads as settled and sensual; you attract by not rushing.' },
        Gemini:    { body: 'Bright-eyed, quick-tongued, impossible to bore with. You make first dates feel like the third one, and small talk with you is somehow never small.', why: 'Gemini rising makes your mind your most visible feature; people meet your curiosity before anything else.' },
        Cancer:    { body: 'Warm, watchful, gently protective. People tell you secrets early, there is something about your face that says "safe", and your defences are quieter than they look.', why: 'Cancer rising presents the shell first: soft, receptive, cautiously kind. Trust is visible once earned.' },
        Leo:       { body: 'You arrive slightly announced: warmth, presence, a laugh that carries. People feel lit up around you, and being seen never bothers you much.', why: 'Leo rising is solar first-impression energy: generous, visible, magnetic without apparent effort.' },
        Virgo:    { body: 'Composed, observant, quietly witty. People read you as capable and slightly reserved, which makes the warmth underneath land harder once it shows.', why: 'Virgo rising presents precision and modesty first; the depth surprises people who took the neat first impression as the whole file.' },
        Libra:     { body: 'Charming in the literal old sense. You put people at ease the moment they sit down. Beautiful manners, real interest and no one leaves a first date with you unstroked.', why: 'Libra rising is the zodiac\'s native diplomat; grace is your first-impression superpower.' },
        Scorpio:   { body: 'Magnetic and unreadable in the best way. You hold eye contact a beat longer than normal, and people leave first dates wondering what else you didn\'t say.', why: 'Scorpio rising projects contained intensity: curiosity about you is instant and often obsessive.' },
        Sagittarius:{ body: 'You laugh like you mean it and ask the questions nobody else would dare on date one. Being around you feels like the start of an adventure.', why: 'Sagittarius rising is optimistic and blunt in a way people find refreshing rather than rude.' },
        Capricorn: { body: 'Poised, dry, faintly intimidating: until the deadpan joke lands. You read as someone with their life together, which is attractive and also a wall people must be invited over.', why: 'Capricorn rising presents maturity and self-containment; the dry humour underneath is the reward for patience.' },
        Aquarius:  { body: 'Interesting is the word people use. You dress, talk and think slightly outside the lines. You\'re not trying to be different, which is exactly why you are.', why: 'Aquarius rising projects originality; the right people are intrigued instantly, the conventional ones are briefly confused.' },
        Pisces:    { body: 'Soft-eyed and dreamy, you seem to listen with your whole face. People feel unusually SEEN by you on a first date: a rare and addictive quality.', why: 'Pisces rising is receptive and gentle; your presence invites people to be more honest than they planned.' }
    };

    // ---------- DESCENDANT / 7th HOUSE: the partner you attract & grow with ----------
    CONTENT.descendant = {
        Aries:     { body: 'Bold, direct, self-contained people pull you in. You grow alongside someone who takes initiative you sometimes can\'t, and who never makes you fight to be chosen.', why: 'The 7th house describes the partner you attract and grow toward. With Aries here, you need someone courageously independent, and you supply the steadiness they lack.' },
        Taurus:    { body: 'Grounded, patient, physical presences feel like home. You need someone who builds security with you in real time: steady, warm and unmoved by drama.', why: 'With Taurus on your 7th, you attract the builders. Their pace feels slow at first and essential later.' },
        Gemini:    { body: 'Witty, curious, talkative people light you up. You need a partner who is a conversation that never ends. Someone whose mind keeps surprising yours.', why: 'With Gemini on your 7th, mental motion is the glue; boredom is the real threat to your relationships.' },
        Cancer:    { body: 'Nurturing, emotionally literate, home-making people draw you in. You need someone who treats "how was your day?" as a sacred question.', why: 'With Cancer on your 7th, you grow through mutual caretaking and the lesson is receiving as gracefully as you give.' },
        Leo:       { body: 'Warm, generous, slightly theatrical people make your heart sit up. You need a partner who worships in the open, and who wants to be adored back out loud.', why: 'With Leo on your 7th, your relationships grow through mutual celebration; dimness of any kind withers them.' },
        Virgo:     { body: 'Thoughtful, practical, self-improving people earn your trust. You need a partner who shows love by paying attention, and by actually remembering.', why: 'With Virgo on your 7th, devotion arrives as competence; you grow by letting someone serve you without fixing you.' },
        Libra:     { body: 'Charming, fair, socially graceful people are your native draw. You need true partnership. Someone who treats your relationship as a two-person art project.', why: 'With Libra on your 7th (its natural home), balance IS the love language; unfairness is unforgivable to you.' },
        Scorpio:   { body: 'Intense, perceptive, all-or-nothing people find you. You need transformative depth: a partner unafraid of your shadows because they\'ve met their own.', why: 'With Scorpio on your 7th, your relationships are crucibles: surface-level partnerships simply don\'t survive contact with this axis.' },
        Sagittarius:{ body: 'Adventurous, philosophical, freedom-loving people expand you. You need a co-explorer. Someone who treats your relationship as a journey, not an arrival.', why: 'With Sagittarius on your 7th, shared meaning keeps love alive; confinement kills it faster than conflict.' },
        Capricorn: { body: 'Ambitious, reliable, quietly devoted people ground you. You need a partner with bones. Someone building a life, not just a vibe.', why: 'With Capricorn on your 7th, you attract the architects. Respect arrives as follow-through, and your love compounds over years.' },
        Aquarius:  { body: 'Original, independent, mind-first people fascinate you. You need a partner who is also your best friend and never your property.', why: 'With Aquarius on your 7th, friendship is the foundation; possessiveness suffocates this axis within months.' },
        Pisces:    { body: 'Soft, imaginative, emotionally available partners draw you out: the near-opposite of your first-date mask. Someone who leads with feeling gives your intensity somewhere safe to land.', why: 'With Pisces on your 7th, devotion is unconditional in flavour; your growth edge is holding boundaries inside that beautiful dissolve.' }
    };

    // ---------- SUN: core identity, dating superpower flavor ----------
    CONTENT.sun = {
        Aries:     { body: 'You know what you want fast and you\'re not afraid to move first. Your superpower: initiative. While others craft the perfect opening line, you\'ve already lived three conversations.', why: 'Your Sun is your core identity. Aries brings courageous directness: a genuine rarity on apps full of hesitation.' },
        Taurus:    { body: 'You assess slowly and choose well. Your superpower: you can\'t be rushed, flattered or worn down into wanting someone you don\'t. Patience is your filter.', why: 'Your Sun is your core identity. Taurus brings a grounded value-system that protects you from flash-in-the-pan romance.' },
        Gemini:    { body: 'You read people through conversation like others read faces. Your superpower: within ten minutes you know if a mind is interesting, and you never waste months on a bore.', why: 'Your Sun is your core identity. Gemini\'s curiosity is a detector for substance disguised as charm.' },
        Cancer:    { body: 'You feel whether someone is safe before they\'ve finished their first story. Your superpower: emotional radar that flags wrong-note people while they still sound right.', why: 'Your Sun is your core identity. Cancer\'s instinct for genuineness rarely misreads a first date.' },
        Leo:       { body: 'You know your worth out loud, which quietly disqualifies everyone who hoped you wouldn\'t. Your superpower: standards delivered with warmth.', why: 'Your Sun is your core identity. Leo\'s self-regard is a filter: only people who can celebrate you survive it.' },
        Virgo:     { body: 'You notice the small incongruities: the story that almost matches, the compliment slightly too rehearsed. Your superpower: discernment that no charm bypasses.', why: 'Your Sun is your core identity. Virgo\'s analytic eye catches what infatuation hides.' },
        Libra:     { body: 'You see both sides of everyone, including dates who can\'t fool you because you already understand them. Your superpower: fairness. You judge behaviour, not personas.', why: 'Your Sun is your core identity. Libra\'s balance sees through performance to pattern.' },
        Scorpio:   { body: 'You see people clearly. Nobody can perform their way past you, which makes you an exceptional judge of who is actually worth your time.', why: 'Your Sun is your core identity. Scorpio\'s penetrating insight is your greatest asset in a world of curated profiles.' },
        Sagittarius:{ body: 'You can tell within one evening whether someone will make your world bigger or smaller. Your superpower: you leave shrinkers early and without guilt.', why: 'Your Sun is your core identity. Sagittarius\'s truth-seeking spots cages disguised as chemistry.' },
        Capricorn: { body: 'You evaluate dating like strategy: who has substance, who is wasting your time, who is worth months. Your superpower: you don\'t confuse intensity with potential.', why: 'Your Sun is your core identity. Capricorn\'s long view sees past first-date fireworks to year-three reality.' },
        Aquarius:  { body: 'You spot conventionality pretending to be uniqueness from orbit. Your superpower: you need no one\'s approval, so you can\'t be love-bombed: flattery bounces off.', why: 'Your Sun is your core identity. Aquarius\'s independence is natural immunity to manipulation.' },
        Pisces:    { body: 'You sense what someone isn\'t saying: mood, motive, the feeling under the words. Your superpower: empathy. Guard it, because it\'s real and it\'s why the wrong people target you.', why: 'Your Sun is your core identity. Pisces\'s perception is profound; the discipline is trusting it when it whispers.' }
    };

    // ---------- Spark dynamics: Venus element x Mars element ----------
    // Names & keywords kept identical to love-blueprint.js for brand consistency.
    CONTENT.dynamics = {
        'Fire-Fire':  { dyn: 'Passionate Pioneer', keywords: ['Bold','Spontaneous','Adventure-seeking','Direct'] },
        'Fire-Earth': { dyn: 'Steady Flame',       keywords: ['Passionate yet grounded','Romantic action','Stable desire'] },
        'Fire-Air':   { dyn: 'Bright Spark',       keywords: ['Playful','Expressive','Social romance','Intellectual passion'] },
        'Fire-Water': { dyn: 'Steam & Heat',       keywords: ['Intense','Emotional action','Protective passion'] },
        'Earth-Fire': { dyn: 'Grounded Passion',   keywords: ['Loyal yet exciting','Sensual adventure','Stable spark'] },
        'Earth-Earth':{ dyn: 'Mountain Solid',     keywords: ['Steadfast','Sensual','Traditional','Patient building'] },
        'Earth-Air':  { dyn: 'Practical Dreamer',  keywords: ['Thoughtful affection','Mental attraction','Grounded communication'] },
        'Earth-Water':{ dyn: 'Fertile Garden',     keywords: ['Nurturing','Emotionally stable','Sensual depth'] },
        'Air-Fire':   { dyn: 'Wind-Fed Flame',     keywords: ['Exciting','Social','Adventurous communication'] },
        'Air-Earth':  { dyn: 'Thinking Heart',     keywords: ['Logical affection','Stable ideas','Communicative commitment'] },
        'Air-Air':    { dyn: 'Double Breeze',      keywords: ['Intellectual','Social butterfly','Freedom-loving'] },
        'Air-Water':  { dyn: 'Mist & Fog',         keywords: ['Emotional intelligence','Intuitive communication','Flowing thought'] },
        'Water-Fire': { dyn: 'Boiling Ocean',      keywords: ['Intense','Emotional action','Deep passion'] },
        'Water-Earth':{ dyn: 'Deep Roots',         keywords: ['Nurturing stability','Emotionally grounded','Patient depth'] },
        'Water-Air':  { dyn: 'Cloud Formation',    keywords: ['Intuitive communication','Emotional ideas','Flowing expression'] },
        'Water-Water':{ dyn: 'Ocean Deep',         keywords: ['Psychic','Empathic','Deeply intuitive','Merging souls'] }
    };

    // ---------- Moon shadow: dating traps (honest, agency-preserving) ----------
    CONTENT.moonShadow = {
        Aries:      ['Mistaking a fast spark for real compatibility: heat is not the same as match', 'Picking fights to feel something, then wondering where the warmth went', 'Walking away the moment love stops being exciting'],
        Taurus:     ['Staying too long because leaving feels like losing your investment', 'Reading stubbornness as loyalty: in them or in you', 'Waiting to be asked instead of saying what you need'],
        Gemini:     ['Flirting with possibility while a real person waits for a real answer', 'Talking about feelings instead of feeling them', 'Leaving when the conversation gets heavy: boredom is often fear in disguise'],
        Cancer:     ['Caretaking your way into being needed, then resenting the need', 'Mood-reading instead of mind-reading people, not every silence is about you', 'Holding onto how it started long after it stopped working'],
        Leo:        ['Dating an audience instead of a partner', 'Letting pride turn small hurts into big silences', 'Staying where you are admired rather than where you are known'],
        Virgo:      ['Editing a partner instead of accepting one', 'Anxiety disguised as helpfulness  "I just want what\'s best for us"', 'Keeping score of every flaw while calling it honesty'],
        Libra:      ['Agreeing with two different people at once to keep the peace', 'Confusing "they are nice to me" with "we belong together"', 'Letting indecision make the choice for you: by default, not design'],
        Scorpio:    ['Testing loyalty with games instead of trusting with words', 'Mistaking intensity for intimacy: heat is not the same as safety', 'Staying too long because you "see their potential"'],
        Sagittarius:['Leaving when it gets deep, calling freedom what was actually fear', 'Philosophising your feelings away: the reason is not the feeling', 'Keeping one foot out the door so the door never fully opens'],
        Capricorn:  ['Treating love like a performance review: theirs and yours', 'Withdrawing when hurt instead of speaking; silence is self-protection that reads as rejection', 'Staying "until the investment pays off" long after the relationship went bankrupt'],
        Aquarius:   ['Analysing the relationship instead of being in it', 'Detaching the moment someone needs you to be human', 'Choosing interesting over kind, repeatedly'],
        Pisces:     ['Falling for potential and skipping the person', 'Absorbing their problems until yours drown', 'Disappearing instead of setting a boundary: the vanishing act hurts you both']
    };

    // ---------- Element traits: flags derived from the DOMINANT love element
    // (Venus/Moon/Mars/7th weighting from SparkRuntime.loveElements). These are
    // the only personalised flags shown: the red list is universal wisdom
    // about OTHER people's behaviour, labelled as such. ----------
    CONTENT.elementTraits = {
        Water: { green: ['You feel deeply and you say so', 'Fiercely loyal once trust is earned', 'You make people feel genuinely seen'],
                 yellow: ['You can absorb their moods as your own', 'Silence instead of a hard conversation'] },
        Earth: { green: ['Your word means something. You follow through', 'Steady when others wobble', 'You build real security into love'],
                 yellow: ['You can stay too long out of sunk cost', 'Patience that is really avoidance of a decision'] },
        Fire:  { green: ['You make dating feel alive: no dead conversations', 'Honest about wanting what you want', 'Generous with warmth and praise'],
                 yellow: ['Boredom reads to you as incompatibility, fast', 'The spark can outrun the substance'] },
        Air:   { green: ['Conversation with you never stalls', 'Curious about people instead of judgmental', 'You give partners real room to breathe'],
                 yellow: ['Flirting with ideas to dodge feelings', 'Going quiet-detached when things get heavy'] }
    };
    CONTENT.universalRed = [
        'Love-bombing followed by withdrawal',
        'Disrespect for your stated boundaries: small ones first',
        'Refuses to name the relationship or discuss feelings, months in'
    ];

    // ---------- BIO WRITER KIT ----------
    // Raw material for composing dating-app bios from the LIVE chart.
    // Everything is first-person and copy-ready. Bios are built only from
    // placements that were actually computed: a withheld Rising/7th simply
    // leaves that slot out; nothing invented. No name, no birth data.
    CONTENT.bioKit = {
        // Openers keyed by dominant love element, then by tone.
        openers: {
            Water: {
                punchy:  ['Deep end or nothing.', 'All in, or not interested.', 'Feelings: full volume.'],
                playful: ['Fluent in 2am conversations and questionable playlists.', 'I will absolutely remember the small thing you said.', 'Here for the kind of talk that makes you lose track of time.'],
                sincere: ['I care deeply and I am not shy about it.', 'I want to really know someone, not just date them.', 'Loyalty is my whole personality, apparently.'],
                bold:    ['I do not do surface level.', 'If we are doing this, we are doing it properly.', 'Looking for chemistry that is also safe.']
            },
            Earth: {
                punchy:  ['I show up. That is the flex.', 'Reliability, but make it romantic.', 'Plans kept > grand gestures.'],
                playful: ['My love language is feeding you and remembering your order.', 'I am the "I already checked the reviews" friend.', 'Looking for someone to be boring with, delightfully.'],
                sincere: ['I am building something real, slowly and on purpose.', 'I value people who mean what they say.', 'Consistency is how I tell someone I care.'],
                bold:    ['I want steady, not situationship.', 'Bring me someone who follows through.', 'Not here to play: here to build.']
            },
            Fire: {
                punchy:  ['Life is short. Let us make it fun.', 'Come with energy or come correct.', 'Boredom is my only dealbreaker.'],
                playful: ['I will plan the adventure, you just say yes.', 'Probably already thinking about our second date.', 'Let us be a little bit reckless together.'],
                sincere: ['I love out loud and I want the same back.', 'I am looking for a spark that turns into something.', 'Honest, warm and bad at playing it cool.'],
                bold:    ['I know what I want and I go get it.', 'Here for real chemistry, not small talk.', 'Tell me something true and I am yours.']
            },
            Air: {
                punchy:  ['Banter or bye.', 'Make me think.', 'Conversation is my love language.'],
                playful: ['Looking for my partner in ridiculous debates.', 'I have 47 tabs open in my brain, pull up a chair.', 'Send me your most unpopular opinion.'],
                sincere: ['I connect through curiosity and conversation.', 'I want a best friend I am also attracted to.', 'Freedom and closeness . I need both.'],
                bold:    ['Impress me with your mind.', 'I want a meeting of minds, not a pen pal.', 'Talk to me like we have all night.']
            }
        },
        // Short first-person vibe tags by element (used as a middle line).
        vibe: {
            Water: 'loyal to a fault, emotionally brave',
            Earth: 'steady, warm, dependable',
            Fire:  'enthusiastic, direct, a little bit of a spark',
            Air:   'curious, quick, easy to talk to'
        },
        // Venus-sign hooks: a specific, charming line about how you love.
        byVenus: {
            Aries:     'I fall fast and I am not sneaky about it.',
            Taurus:    'Romance with me is food, comfort and taking our time.',
            Gemini:    'I flirt by making you laugh and asking a hundred questions.',
            Cancer:    'I show love by making sure you are okay.',
            Leo:       'I love generously and I want to be adored back: out loud.',
            Virgo:     'I noticed the thing you mentioned once. That is my flirting.',
            Libra:     'Partnership is kind of my whole thing. Let us build something lovely.',
            Scorpio:   'When I am in, I am all the way in. Nothing shallow, please.',
            Sagittarius:'Love with me should feel like an adventure, not an obligation.',
            Capricorn: 'I date with intention. I am here to build, not to drift.',
            Aquarius:  'Be my best friend first and we will figure the rest out.',
            Pisces:    'I love with my whole heart. Someone please hand me some boundaries.'
        },
        // Intention phrased naturally, first person, for the closing line.
        hereFor: {
            'A long-term partner':        'Looking for something real and lasting.',
            'Something serious, slowly':  'Open to serious. I just like to take it slow.',
            'Dating, open to anything':  'Dating right now, open to wherever it goes.',
            'Short-term & fun':           'Here for fun and good company, honestly.',
            'New friends first':          'Making friends first and seeing what clicks.',
            'Still figuring it out':      'Still figuring out what I am looking for, so be patient with me.'
        },
        // Tone-flavoured prompts/closers to end on (invites a first message).
        closers: {
            punchy:  ['Swipe right and find out.', 'Your move.', 'Bet you cannot guess my green flag.'],
            playful: ['Tell me your most irrational belief . I will go first.', 'What is the worst date you have been on? Go.', 'Two truths and a lie: I always win.'],
            sincere: ['Tell me what actually matters to you.', 'What does a good Sunday look like for you?', 'I would rather skip small talk : what is something you care about?'],
            bold:    ['Message me something real.', 'If you get me, you get me. Say hi.', 'Tell me why you are actually here.']
        }
    };

    // Card titles per point (shared with the prototype UI copy).
    CONTENT.titles = {
        venus: 'How You Love',
        moon: 'Emotional Needs',
        mercury: 'How You Text',
        mars: 'Your Chemistry',
        rising: 'First-Date Vibe',
        descendant: 'Who You Need',
        sun: 'Your Dating Superpower'
    };
    CONTENT.icons = {
        venus: '\u2640', moon: '\u263E', mercury: '\u263F', mars: '\u2642',
        rising: '\u2191', descendant: '\u2302', sun: '\u2600'
    };
    // Production loads icons.js first, so card faces use the hand-drawn SVG
    // set. In bare-Node tests (or if icons.js failed to load) the real set
    // is absent and the text glyphs above stay. Test for the REAL set
    // (global.LBIcons), never just the LBIcon function: a safety shim may
    // define LBIcon as a no-op and must not blank the card faces.
    if (typeof global.LBIcon === 'function' && global.LBIcons && global.LBIcons.venus) {
        var ICON_NAME = { venus: 'venus', moon: 'moon', mercury: 'mercury', mars: 'mars',
                          rising: 'ascArrow', descendant: 'house', sun: 'sun' };
        Object.keys(ICON_NAME).forEach(function (k) {
            CONTENT.icons[k] = global.LBIcon(ICON_NAME[k]);
        });
    }

    global.SparkContent = CONTENT;
    if (typeof module !== 'undefined' && module.exports) module.exports = CONTENT;
})(typeof window !== 'undefined' ? window : globalThis);
