#!/usr/bin/env python3
"""
SEO Optimization Script for Quantum Merlin Ecosystem
Adds missing OG, Twitter, canonical, JSON-LD, keywords, robots, author tags
"""

import os
import re

BASE_URL = "https://quantummerlin.com"

# Define SEO data for each page
SEO_DATA = {
    # === MICRO-TOOL APPS ===
    "trust-radar.html": {
        "title": "Trust Radar — Discover Who You Really Trust | Quantum Merlin",
        "description": "Reveal hidden trust patterns in your relationships. Discover who and what you actually trust vs what you think you trust. Free interactive self-discovery tool.",
        "keywords": "trust radar, trust issues, relationship trust, self discovery, trust assessment, relationship analysis, quantum merlin, trust test",
        "canonical": f"{BASE_URL}/trust-radar",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebApplication",
        "json_ld_category": "LifestyleApplication",
    },
    "hidden-strengths-revealer.html": {
        "title": "Hidden Strengths Revealer — Uncover Your Dormant Superpowers | Quantum Merlin",
        "description": "Discover your hidden strengths and dormant superpowers. This free self-assessment reveals natural gifts and talents buried in your subconscious mind.",
        "keywords": "hidden strengths, personality test, superpowers, self assessment, natural talents, strengths finder, personal development, quantum merlin",
        "canonical": f"{BASE_URL}/hidden-strengths-revealer",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebApplication",
        "json_ld_category": "LifestyleApplication",
    },
    "identity-split-detector.html": {
        "title": "Identity Split Detector — Reveal & Integrate Your Hidden Selves | Quantum Merlin",
        "description": "Detect conflicts between your different identities and learn to integrate them. Free tool to reveal contradictions between your personas and find wholeness.",
        "keywords": "identity crisis, personality integration, shadow self, inner conflict, self awareness, identity test, personal growth, quantum merlin",
        "canonical": f"{BASE_URL}/identity-split-detector",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebApplication",
        "json_ld_category": "LifestyleApplication",
    },
    "power-avoidance-pattern.html": {
        "title": "Power Avoidance Pattern — Stop Self-Sabotage & Claim Your Power | Quantum Merlin",
        "description": "Discover why you sabotage your own success. Identify subconscious patterns preventing you from stepping into your full power with this free assessment tool.",
        "keywords": "self sabotage, power avoidance, success blocks, personal power, breakthrough, limiting beliefs, self improvement, quantum merlin",
        "canonical": f"{BASE_URL}/power-avoidance-pattern",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebApplication",
        "json_ld_category": "LifestyleApplication",
    },
    "energyleak.html": {
        "title": "Energy Leak Locator — Find & Fix Your Energy Drains | Quantum Merlin",
        "description": "Discover where your vital energy is draining and how to reclaim it. Identify energy vampires, incomplete tasks, and unconscious patterns stealing your life force.",
        "keywords": "energy leak, vitality, energy vampires, emotional drain, energy recovery, burnout, energy healing, quantum merlin",
        "canonical": f"{BASE_URL}/energyleak",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebApplication",
        "json_ld_category": "HealthApplication",
    },
    "compatibility.html": {
        "title": "Quantum Compatibility Calculator | Free Relationship Analysis for Love, Business & More",
        "description": "Discover soul connections across all relationships: romantic partners, friends, family, business partners & teams. Sacred compatibility analysis through 12 mystical systems including zodiac, numerology, tarot & quantum wisdom.",
        "keywords": "love compatibility, zodiac compatibility, numerology, tarot reading, soulmate, twin flame, relationship advice, astrology, Chinese zodiac, sacred geometry, free love calculator",
        "canonical": f"{BASE_URL}/compatibility",
        "og_image": f"{BASE_URL}/images/compatibility-share.jpg",
        "json_ld_type": "WebApplication",
        "json_ld_category": "LifestyleApplication",
    },

    # === ANGEL / SIGIL / ROSE ===
    "angel-number-calculator.html": {
        "title": "Angel Number Calculator — Discover Divine Messages & Meanings | Quantum Merlin",
        "description": "Calculate angel numbers and discover their divine meanings. Enter any number to receive instant spiritual guidance and messages from the universe. Free calculator.",
        "keywords": "angel numbers, angel number calculator, numerology, spiritual guidance, divine messages, number meanings, 111, 222, 333, 444, 555, angel number meaning",
        "canonical": f"{BASE_URL}/angel-number-calculator",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebApplication",
        "json_ld_category": "LifestyleApplication",
    },
    "birth-sigil.html": {
        "title": "Quantum Birth Sigil Generator — Create Your Cosmic Signature | Quantum Merlin",
        "description": "Generate a unique quantum birth sigil based on your exact birth date, time, and location. Discover your cosmic signature through lunar phase and stellar alignment. Download for tattoo or meditation.",
        "keywords": "birth sigil, lunar sigil, star sigil, moon phase art, celestial signature, astrology art, tattoo design, cosmic signature, quantum sigil, birth chart art",
        "canonical": f"{BASE_URL}/birth-sigil",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebApplication",
        "json_ld_category": "LifestyleApplication",
    },
    "quantum-rose.html": {
        "title": "Quantum Rose — The Empress's Legacy | Quantum Merlin",
        "description": "The sacred story of Quantum Rose — a fierce English Rose, warrior of light, and mother whose wisdom was forged in life's battles. Her spirit continues through Quantum Merlin.",
        "keywords": "quantum rose, spiritual legacy, warrior of light, sacred feminine, empress energy, quantum merlin, spiritual story, divine mother",
        "canonical": f"{BASE_URL}/quantum-rose",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "Article",
        "json_ld_category": None,
    },
    "quantum-sigil-generator.html": {
        "title": "Quantum Sigil Generator — Create Powerful Intention Sigils | Quantum Merlin",
        "description": "Generate powerful mystical sigils from your intentions using quantum frequency encoding. Create unique sigils for manifestation, meditation, and spiritual practice. Free tool.",
        "keywords": "sigil generator, intention sigil, manifestation, quantum sigil, magic sigil, spiritual symbols, sigil creation, sacred geometry, quantum merlin",
        "canonical": f"{BASE_URL}/quantum-sigil-generator",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebApplication",
        "json_ld_category": "LifestyleApplication",
    },
    "quantum-sigil-gallery.html": {
        "title": "Sigil Gallery — View Your Saved Cosmic Sigils | Quantum Merlin",
        "description": "View your saved cosmic birth sigils. Each sigil is a unique celestial signature based on lunar phase and stellar alignment. Browse, share, and download your collection.",
        "keywords": "sigil gallery, cosmic sigils, birth sigils, celestial art, saved sigils, quantum merlin, sigil collection, mystical art",
        "canonical": f"{BASE_URL}/quantum-sigil-gallery",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "CollectionPage",
        "json_ld_category": None,
    },

    # === INFO / LEGAL PAGES ===
    "about-new.html": {
        "title": "About Quantum Merlin — Bridging Ancient Wisdom with Quantum Possibilities",
        "description": "Discover the story behind Quantum Merlin. Learn how we bridge ancient wisdom with quantum possibilities through sacred frequencies, numerology, astrology, and mystical tools.",
        "keywords": "about quantum merlin, spiritual technology, sacred frequencies, mystical tools, quantum reality codes, our story, mission",
        "canonical": f"{BASE_URL}/about-new",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "AboutPage",
        "json_ld_category": None,
    },
    "contact-new.html": {
        "title": "Contact Quantum Merlin — Get in Touch",
        "description": "Get in touch with Quantum Merlin. We'd love to hear your feedback, suggestions, or questions about our spiritual technology tools and mystical services.",
        "keywords": "contact quantum merlin, support, feedback, questions, spiritual tools support",
        "canonical": f"{BASE_URL}/contact-new",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "ContactPage",
        "json_ld_category": None,
    },
    "privacy.html": {
        "title": "Privacy Policy | Quantum Merlin — Your Data Protected",
        "description": "Quantum Merlin privacy policy. Learn how we protect your personal data and spiritual readings. Your cosmic journey is sacred and private.",
        "keywords": "privacy policy, data protection, quantum merlin privacy, spiritual data security",
        "canonical": f"{BASE_URL}/privacy",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebPage",
        "json_ld_category": None,
    },
    "terms.html": {
        "title": "Terms of Service | Quantum Merlin — Sacred Agreements",
        "description": "Terms of service for Quantum Merlin. Our sacred agreements governing the use of spiritual technology tools, readings, and mystical services.",
        "keywords": "terms of service, quantum merlin terms, user agreement, spiritual tools terms",
        "canonical": f"{BASE_URL}/terms",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebPage",
        "json_ld_category": None,
    },
    "disclaimer.html": {
        "title": "Disclaimer | Quantum Merlin — Important Guidance",
        "description": "Important disclaimer for Quantum Merlin spiritual tools. Entertainment and self-discovery purposes. Not a substitute for professional medical, financial, or psychological advice.",
        "keywords": "disclaimer, quantum merlin disclaimer, spiritual tools disclaimer, entertainment purposes",
        "canonical": f"{BASE_URL}/disclaimer",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebPage",
        "json_ld_category": None,
    },

    # === OTHER APPS ===
    "soulcard.html": {
        "title": "Interactive Soul Card Reading — Choose Your Destiny | Quantum Merlin",
        "description": "Experience an interactive tarot soul card reading. Choose your cards from the full 78-card deck and receive deep mystical insights combining numerology, astrology, and quantum frequencies.",
        "keywords": "tarot reading, soul card, free tarot, interactive tarot, 78 card deck, tarot online, mystical reading, numerology tarot, quantum tarot",
        "canonical": f"{BASE_URL}/soulcard",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebApplication",
        "json_ld_category": "LifestyleApplication",
    },
    "widgets.html": {
        "title": "Cosmic Widgets — Daily Oracle, Moon Phase & Numerology | Quantum Merlin",
        "description": "Free cosmic widgets for your daily spiritual practice. Daily oracle cards, moon phase tracker, numerology insights, and celestial guidance. Add to your website or use daily.",
        "keywords": "cosmic widgets, daily oracle, moon phase widget, numerology widget, spiritual tools, daily horoscope, free oracle card, quantum merlin",
        "canonical": f"{BASE_URL}/widgets",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebApplication",
        "json_ld_category": "LifestyleApplication",
    },
    "quantum-forum.html": {
        "title": "Quantum Merlin Community Forum — Connect with Spiritual Explorers",
        "description": "Join our spiritual community! Share sigil interpretations, discuss frequency healing, explore numerology, tarot, astrology, and connect with like-minded seekers on their spiritual journey.",
        "keywords": "spiritual forum, sigil discussion, frequency healing community, numerology forum, tarot discussion, astrology community, quantum merlin, spiritual community",
        "canonical": f"{BASE_URL}/quantum-forum",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebPage",
        "json_ld_category": None,
    },
    "reading-generator.html": {
        "title": "Quantum Reading Generator — Create Personalized Spiritual Readings | Quantum Merlin",
        "description": "Generate deep personalized spiritual readings combining numerology, astrology, tarot, and quantum frequency analysis. Enter your birth data for comprehensive life insights.",
        "keywords": "reading generator, spiritual reading, personalized reading, numerology reading, astrology report, birth chart, quantum reading, free reading",
        "canonical": f"{BASE_URL}/reading-generator",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebApplication",
        "json_ld_category": "LifestyleApplication",
    },
    "library.html": {
        "title": "Quantum Library — Your Personal Mystical Collection | Quantum Merlin",
        "description": "Your personal collection of birth sigils, tarot readings, affirmations, and saved mystical items. Access your complete spiritual history and saved readings.",
        "keywords": "quantum library, saved sigils, tarot readings, mystical collection, spiritual library, saved readings, quantum merlin",
        "canonical": f"{BASE_URL}/library",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "CollectionPage",
        "json_ld_category": None,
    },

    # === FULL READING PAGES ===
    "energyleakfull.html": {
        "title": "Full Energy Leak Reading — Complete Vitality Analysis | Quantum Merlin",
        "description": "Your complete energy leak analysis and recovery plan. Detailed breakdown of all energy drains with personalized healing recommendations.",
        "keywords": "energy leak reading, full energy analysis, vitality report, energy healing, quantum merlin",
        "canonical": f"{BASE_URL}/energyleakfull",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebPage",
        "json_ld_category": None,
    },
    "trustfull.html": {
        "title": "Full Trust Radar Reading — Complete Trust Analysis | Quantum Merlin",
        "description": "Your complete trust radar analysis. Detailed trust patterns across all relationships with integration strategies and growth recommendations.",
        "keywords": "trust reading, trust analysis, relationship trust, trust patterns, quantum merlin",
        "canonical": f"{BASE_URL}/trustfull",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebPage",
        "json_ld_category": None,
    },
    "strengthsfull.html": {
        "title": "Full Hidden Strengths Reading — Complete Strengths Profile | Quantum Merlin",
        "description": "Your complete hidden strengths profile and activation guide. Detailed breakdown of dormant superpowers with development strategies.",
        "keywords": "strengths reading, hidden talents, superpowers, personal development, strengths profile, quantum merlin",
        "canonical": f"{BASE_URL}/strengthsfull",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebPage",
        "json_ld_category": None,
    },
    "identityfull.html": {
        "title": "Full Identity Integration Reading — Complete Self-Discovery | Quantum Merlin",
        "description": "Your complete identity integration analysis. Discover all your hidden personas, understand conflicts between them, and receive strategies for wholeness.",
        "keywords": "identity reading, self discovery, personality integration, shadow work, identity analysis, quantum merlin",
        "canonical": f"{BASE_URL}/identityfull",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebPage",
        "json_ld_category": None,
    },
    "powerfull.html": {
        "title": "Full Power Avoidance Reading — Break Through Self-Sabotage | Quantum Merlin",
        "description": "Your complete power avoidance analysis. Understand the root causes of self-sabotage and receive personalized breakthrough strategies.",
        "keywords": "power reading, self sabotage, breakthrough, personal power, success blocks, quantum merlin",
        "canonical": f"{BASE_URL}/powerfull",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebPage",
        "json_ld_category": None,
    },
    "contractfull.html": {
        "title": "Full Soul Contract Reading — Your Life Purpose Revealed | Quantum Merlin",
        "description": "Your complete soul contract reading. Discover your pre-birth agreements, karmic lessons, and spiritual purpose in this lifetime.",
        "keywords": "soul contract, life purpose, karmic lessons, spiritual purpose, soul mission, quantum merlin",
        "canonical": f"{BASE_URL}/contractfull",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebPage",
        "json_ld_category": None,
    },
    "manifestfull.html": {
        "title": "Full Manifestation Reading — Your Reality Creation Blueprint | Quantum Merlin",
        "description": "Your complete manifestation blueprint. Discover your unique reality creation patterns, blocks, and personalized manifesting strategies.",
        "keywords": "manifestation reading, law of attraction, reality creation, manifesting, abundance, quantum merlin",
        "canonical": f"{BASE_URL}/manifestfull",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebPage",
        "json_ld_category": None,
    },
    "qrcodesfull.html": {
        "title": "Full Reality Codes Reading — Your Quantum Frequency Profile | Quantum Merlin",
        "description": "Your complete quantum reality codes reading. Discover your unique frequency signature and how to align with your highest vibrational potential.",
        "keywords": "reality codes, quantum frequency, vibrational reading, frequency healing, energy signature, quantum merlin",
        "canonical": f"{BASE_URL}/qrcodesfull",
        "og_image": f"{BASE_URL}/assets/tarot/QMTarot.png",
        "json_ld_type": "WebPage",
        "json_ld_category": None,
    },
}


def has_tag(content, pattern):
    """Check if a tag/pattern exists in the head section."""
    return bool(re.search(pattern, content[:5000], re.IGNORECASE))


def build_seo_block(data, filename):
    """Build the SEO meta tags block to inject."""
    lines = []
    
    # Author
    lines.append(f'    <meta name="author" content="Quantum Merlin">')
    lines.append(f'    <meta name="robots" content="index, follow">')
    
    # Canonical
    if data.get("canonical"):
        lines.append(f'    <link rel="canonical" href="{data["canonical"]}">')
    
    # Open Graph
    og_title = data.get("title", "")
    og_desc = data.get("description", "")
    og_url = data.get("canonical", "")
    og_image = data.get("og_image", f"{BASE_URL}/assets/tarot/QMTarot.png")
    
    lines.append(f'')
    lines.append(f'    <!-- Open Graph / Facebook -->')
    lines.append(f'    <meta property="og:type" content="website">')
    lines.append(f'    <meta property="og:url" content="{og_url}">')
    lines.append(f'    <meta property="og:title" content="{og_title}">')
    lines.append(f'    <meta property="og:description" content="{og_desc}">')
    lines.append(f'    <meta property="og:image" content="{og_image}">')
    lines.append(f'    <meta property="og:site_name" content="Quantum Merlin">')
    lines.append(f'    <meta property="og:locale" content="en_US">')
    
    # Twitter Card
    lines.append(f'')
    lines.append(f'    <!-- Twitter Card -->')
    lines.append(f'    <meta name="twitter:card" content="summary_large_image">')
    lines.append(f'    <meta name="twitter:title" content="{og_title}">')
    lines.append(f'    <meta name="twitter:description" content="{og_desc}">')
    lines.append(f'    <meta name="twitter:image" content="{og_image}">')
    
    # JSON-LD
    ld_type = data.get("json_ld_type", "WebPage")
    ld_cat = data.get("json_ld_category")
    
    lines.append(f'')
    lines.append(f'    <!-- Structured Data -->')
    lines.append(f'    <script type="application/ld+json">')
    lines.append(f'    {{')
    lines.append(f'      "@context": "https://schema.org",')
    lines.append(f'      "@type": "{ld_type}",')
    lines.append(f'      "name": "{og_title}",')
    lines.append(f'      "description": "{og_desc}",')
    lines.append(f'      "url": "{og_url}"' + (',' if ld_cat or ld_type == "WebApplication" else ''))
    
    if ld_type == "WebApplication":
        lines.append(f'      "applicationCategory": "{ld_cat or "LifestyleApplication"}",')
        lines.append(f'      "operatingSystem": "Any",')
        lines.append(f'      "offers": {{ "@type": "Offer", "price": "0", "priceCurrency": "USD" }},')
    
    lines.append(f'      "author": {{ "@type": "Person", "name": "Quantum Merlin" }}')
    lines.append(f'    }}')
    lines.append(f'    </script>')
    
    return '\n'.join(lines)


def optimize_file(filepath, data):
    """Add missing SEO tags to a file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    changes = []
    
    # --- 1. Update title if it's weak ---
    # (We keep existing titles unless the data specifically overrides)
    
    # --- 2. Add/update description ---
    if not has_tag(content, r'<meta\s+name=["\']description'):
        # No description at all - add after title
        title_match = re.search(r'(<title>.*?</title>)', content)
        if title_match:
            insert_after = title_match.group(0)
            content = content.replace(
                insert_after,
                insert_after + f'\n    <meta name="description" content="{data["description"]}">',
                1
            )
            changes.append("Added description")
    
    # --- 3. Add keywords if missing ---
    if not has_tag(content, r'<meta\s+name=["\']keywords'):
        desc_match = re.search(r'(<meta\s+name=["\']description["\'][^>]*>)', content)
        if desc_match:
            insert_after = desc_match.group(0)
            content = content.replace(
                insert_after,
                insert_after + f'\n    <meta name="keywords" content="{data["keywords"]}">',
                1
            )
            changes.append("Added keywords")
    
    # --- 4. Add author if missing ---
    if not has_tag(content, r'<meta\s+name=["\']author'):
        kw_match = re.search(r'(<meta\s+name=["\']keywords["\'][^>]*>)', content)
        if kw_match:
            insert_after = kw_match.group(0)
            content = content.replace(
                insert_after,
                insert_after + '\n    <meta name="author" content="Quantum Merlin">',
                1
            )
            changes.append("Added author")
    
    # --- 5. Add robots if missing ---
    if not has_tag(content, r'<meta\s+name=["\']robots'):
        author_match = re.search(r'(<meta\s+name=["\']author["\'][^>]*>)', content)
        if author_match:
            insert_after = author_match.group(0)
            content = content.replace(
                insert_after,
                insert_after + '\n    <meta name="robots" content="index, follow">',
                1
            )
            changes.append("Added robots")
    
    # --- 6. Add canonical if missing ---
    if not has_tag(content, r'<link\s+rel=["\']canonical'):
        if data.get("canonical"):
            robots_match = re.search(r'(<meta\s+name=["\']robots["\'][^>]*>)', content)
            if robots_match:
                insert_after = robots_match.group(0)
                content = content.replace(
                    insert_after,
                    insert_after + f'\n    <link rel="canonical" href="{data["canonical"]}">',
                    1
                )
                changes.append("Added canonical")
    
    # --- 7. Add OG tags if missing ---
    if not has_tag(content, r'<meta\s+property=["\']og:title'):
        og_block = f'''
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{data.get('canonical', '')}">
    <meta property="og:title" content="{data['title']}">
    <meta property="og:description" content="{data['description']}">
    <meta property="og:image" content="{data.get('og_image', BASE_URL + '/assets/tarot/QMTarot.png')}">
    <meta property="og:site_name" content="Quantum Merlin">
    <meta property="og:locale" content="en_US">'''
        
        # Find insertion point - before </head> or before first <style> or <link rel="stylesheet">
        head_end = re.search(r'(</head>)', content)
        first_style = re.search(r'(\n\s*<style>|\n\s*<link\s+rel=["\']stylesheet|\n\s*<link\s+href=["\']https://fonts)', content)
        
        insert_before = first_style or head_end
        if insert_before:
            pos = insert_before.start()
            content = content[:pos] + og_block + '\n' + content[pos:]
            changes.append("Added OG tags")
    else:
        # OG exists but might be incomplete - add missing og:url, og:image, og:site_name, og:locale
        if not has_tag(content, r'<meta\s+property=["\']og:url'):
            og_title_match = re.search(r'(<meta\s+property=["\']og:title["\'][^>]*>)', content)
            if og_title_match:
                content = content.replace(
                    og_title_match.group(0),
                    f'<meta property="og:url" content="{data.get("canonical", "")}">\n    ' + og_title_match.group(0),
                    1
                )
                changes.append("Added og:url")
        if not has_tag(content, r'<meta\s+property=["\']og:image'):
            og_desc_match = re.search(r'(<meta\s+property=["\']og:description["\'][^>]*>)', content)
            if og_desc_match:
                content = content.replace(
                    og_desc_match.group(0),
                    og_desc_match.group(0) + f'\n    <meta property="og:image" content="{data.get("og_image", BASE_URL + "/assets/tarot/QMTarot.png")}">',
                    1
                )
                changes.append("Added og:image")
        if not has_tag(content, r'<meta\s+property=["\']og:site_name'):
            # Find last og tag and add after it
            last_og = list(re.finditer(r'(<meta\s+property=["\']og:[^"\']*["\'][^>]*>)', content))
            if last_og:
                last = last_og[-1]
                content = content[:last.end()] + '\n    <meta property="og:site_name" content="Quantum Merlin">' + content[last.end():]
                changes.append("Added og:site_name")
        if not has_tag(content, r'<meta\s+property=["\']og:locale'):
            site_name_match = re.search(r'(<meta\s+property=["\']og:site_name["\'][^>]*>)', content)
            if site_name_match:
                content = content.replace(
                    site_name_match.group(0),
                    site_name_match.group(0) + '\n    <meta property="og:locale" content="en_US">',
                    1
                )
                changes.append("Added og:locale")
    
    # --- 8. Add Twitter Card if missing ---
    if not has_tag(content, r'<meta\s+name=["\']twitter:card'):
        twitter_block = f'''
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{data['title']}">
    <meta name="twitter:description" content="{data['description']}">
    <meta name="twitter:image" content="{data.get('og_image', BASE_URL + '/assets/tarot/QMTarot.png')}">'''
        
        # Insert after OG block or before </head>
        last_og = list(re.finditer(r'(<meta\s+property=["\']og:[^"\']*["\'][^>]*>)', content))
        if last_og:
            pos = last_og[-1].end()
            content = content[:pos] + twitter_block + content[pos:]
        else:
            head_end = re.search(r'(</head>)', content)
            if head_end:
                content = content[:head_end.start()] + twitter_block + '\n' + content[head_end.start():]
        changes.append("Added Twitter Card")
    
    # --- 9. Add JSON-LD if missing ---
    if not has_tag(content, r'application/ld\+json'):
        ld_type = data.get("json_ld_type", "WebPage")
        ld_cat = data.get("json_ld_category")
        
        ld_block = f'''
    <!-- Structured Data -->
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "{ld_type}",
      "name": "{data['title']}",
      "description": "{data['description']}",
      "url": "{data.get('canonical', '')}",'''
        
        if ld_type == "WebApplication" and ld_cat:
            ld_block += f'''
      "applicationCategory": "{ld_cat}",
      "operatingSystem": "Any",
      "offers": {{ "@type": "Offer", "price": "0", "priceCurrency": "USD" }},'''
        
        ld_block += f'''
      "author": {{ "@type": "Person", "name": "Quantum Merlin" }}
    }}
    </script>'''
        
        # Insert before </head>
        head_end = re.search(r'(</head>)', content)
        if head_end:
            content = content[:head_end.start()] + ld_block + '\n' + content[head_end.start():]
            changes.append("Added JSON-LD")
    
    # Write if changed
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return changes
    return []


def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    total_changes = 0
    
    print("=" * 60)
    print("  Quantum Merlin SEO Optimization")
    print("=" * 60)
    
    for filename, data in SEO_DATA.items():
        filepath = os.path.join(base_dir, filename)
        if not os.path.exists(filepath):
            print(f"  ⚠  {filename} — NOT FOUND, skipping")
            continue
        
        changes = optimize_file(filepath, data)
        if changes:
            total_changes += len(changes)
            print(f"  ✅ {filename} — {', '.join(changes)}")
        else:
            print(f"  ✔  {filename} — already optimized")
    
    print("=" * 60)
    print(f"  Total: {total_changes} SEO tags added across {len(SEO_DATA)} files")
    print("=" * 60)


if __name__ == "__main__":
    main()
