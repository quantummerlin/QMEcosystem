"""
Kosmic K-Pop Avatar Library Generator
Generates pre-generated avatar library
"""

import os
import json
from avatar_generator_config import (
    AVATAR_CONFIG,
    generate_prompt,
    get_avatar_filename
)

# Configuration
CONFIG = {
    "archetypes": list(AVATAR_CONFIG["archetypes"].keys()),
    "life_paths": [1, 2, 3, 4, 5, 6, 7, 8, 9],
    "genders": ["male", "female"],
    "concepts": ["soft", "dark"],
    "styles": ["retro", "futuristic"],  # For Tier 2
    "variations": 3  # 3 variations per combination
}

def calculate_total_images(tier=1):
    """Calculate total images for each tier"""
    
    if tier == 1:
        # Tier 1: 12 archetypes × 9 life paths × 2 genders × 2 concepts = 432
        return len(CONFIG["archetypes"]) * len(CONFIG["life_paths"]) * len(CONFIG["genders"]) * len(CONFIG["concepts"])
    
    elif tier == 2:
        # Tier 2: Add styles
        return (len(CONFIG["archetypes"]) * len(CONFIG["life_paths"]) * 
                len(CONFIG["genders"]) * len(CONFIG["concepts"]) * 
                len(CONFIG["styles"]) * CONFIG["variations"])
    
    elif tier == 3:
        # Tier 3: More gender presentations, more styles, more variations
        return (len(CONFIG["archetypes"]) * len(CONFIG["life_paths"]) * 3 * 6 * 5)
    
    else:
        return 0

def generate_prompt_library(tier=1, output_file="prompt_library.json"):
    """Generate all prompts for the library"""
    
    prompts = []
    total_images = calculate_total_images(tier)
    
    print(f"🎨 Generating {total_images} prompts for Tier {tier}...")
    print(f"📊 Breakdown:")
    print(f"   - Archetypes: {len(CONFIG['archetypes'])}")
    print(f"   - Life Paths: {len(CONFIG['life_paths'])}")
    print(f"   - Genders: {len(CONFIG['genders'])}")
    print(f"   - Concepts: {len(CONFIG['concepts'])}")
    if tier >= 2:
        print(f"   - Styles: {len(CONFIG['styles'])}")
        print(f"   - Variations: {CONFIG['variations']}")
    print()
    
    counter = 0
    
    for archetype in CONFIG["archetypes"]:
        for life_path in CONFIG["life_paths"]:
            for gender in CONFIG["genders"]:
                for concept in CONFIG["concepts"]:
                    
                    if tier == 1:
                        # Tier 1: No styles, 1 variation per combo
                        prompt = generate_prompt(
                            archetype_key=archetype,
                            life_path=life_path,
                            gender=gender,
                            concept=concept
                        )
                        
                        filename = get_avatar_filename(
                            archetype=archetype,
                            life_path=life_path,
                            gender=gender,
                            concept=concept,
                            variation=1
                        )
                        
                        prompts.append({
                            "filename": filename,
                            "prompt": prompt,
                            "metadata": {
                                "archetype": archetype,
                                "life_path": life_path,
                                "gender": gender,
                                "concept": concept,
                                "tier": 1
                            }
                        })
                        
                        counter += 1
                        if counter % 50 == 0:
                            print(f"   Generated {counter}/{total_images} prompts...")
                    
                    elif tier >= 2:
                        # Tier 2+: Add styles and variations
                        for style in CONFIG["styles"]:
                            for variation in range(1, CONFIG["variations"] + 1):
                                prompt = generate_prompt(
                                    archetype_key=archetype,
                                    life_path=life_path,
                                    gender=gender,
                                    concept=concept,
                                    style=style
                                )
                                
                                filename = get_avatar_filename(
                                    archetype=archetype,
                                    life_path=life_path,
                                    gender=gender,
                                    concept=concept,
                                    variation=variation,
                                    style=style
                                )
                                
                                prompts.append({
                                    "filename": filename,
                                    "prompt": prompt,
                                    "metadata": {
                                        "archetype": archetype,
                                        "life_path": life_path,
                                        "gender": gender,
                                        "concept": concept,
                                        "style": style,
                                        "variation": variation,
                                        "tier": tier
                                    }
                                })
                                
                                counter += 1
                                if counter % 50 == 0:
                                    print(f"   Generated {counter}/{total_images} prompts...")
    
    print(f"✅ Generated {len(prompts)} prompts!")
    print()
    
    # Save to JSON
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(prompts, f, indent=2, ensure_ascii=False)
    
    print(f"💾 Saved prompt library to {output_file}")
    print()
    
    return prompts

def create_directory_structure(output_dir="avatars"):
    """Create directory structure for avatar library"""
    
    print(f"📁 Creating directory structure...")
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    for archetype in CONFIG["archetypes"]:
        archetype_dir = os.path.join(output_dir, archetype)
        if not os.path.exists(archetype_dir):
            os.makedirs(archetype_dir)
        
        for life_path in CONFIG["life_paths"]:
            lp_dir = os.path.join(archetype_dir, f"lp{life_path}")
            if not os.path.exists(lp_dir):
                os.makedirs(lp_dir)
            
            for gender in CONFIG["genders"]:
                gender_dir = os.path.join(lp_dir, gender)
                if not os.path.exists(gender_dir):
                    os.makedirs(gender_dir)
                
                for concept in CONFIG["concepts"]:
                    concept_dir = os.path.join(gender_dir, concept)
                    if not os.path.exists(concept_dir):
                        os.makedirs(concept_dir)
    
    print(f"✅ Directory structure created in {output_dir}/")
    print()

def generate_cost_estimate(tier, cost_per_image):
    """Generate cost estimate for avatar generation"""
    
    total_images = calculate_total_images(tier)
    total_cost = total_images * cost_per_image
    
    print(f"💰 Cost Estimate for Tier {tier}:")
    print(f"   - Total Images: {total_images}")
    print(f"   - Cost Per Image: ${cost_per_image:.4f}")
    print(f"   - Total Cost: ${total_cost:.2f}")
    print()
    
    return total_cost

def print_summary(tier):
    """Print summary of avatar library"""
    
    total_images = calculate_total_images(tier)
    
    print("=" * 80)
    print("🌟 KOSMIC K-POP AVATAR LIBRARY GENERATOR 🌟")
    print("=" * 80)
    print()
    print(f"Tier {tier} Configuration:")
    print(f"   - Archetypes: {len(CONFIG['archetypes'])}")
    print(f"   - Life Paths: {len(CONFIG['life_paths'])}")
    print(f"   - Genders: {len(CONFIG['genders'])}")
    print(f"   - Concepts: {len(CONFIG['concepts'])}")
    if tier >= 2:
        print(f"   - Styles: {len(CONFIG['styles'])}")
        print(f"   - Variations: {CONFIG['variations']}")
    print()
    print(f"Total Images: {total_images}")
    print()
    
    print("Cost Estimates:")
    print(f"   - SDXL (@ $0.02/image): ${total_images * 0.02:.2f}")
    print(f"   - DALL-E 3 (@ $0.04/image): ${total_images * 0.04:.2f}")
    print(f"   - DALL-E 3 HD (@ $0.08/image): ${total_images * 0.08:.2f}")
    print()
    
    print("Recommended:")
    if tier == 1:
        print(f"   ✅ Start with SDXL (${total_images * 0.02:.2f}) - Good quality, affordable")
        print(f"   ⭐ Upgrade to DALL-E 3 (${total_images * 0.04:.2f}) - Better quality")
    elif tier == 2:
        print(f"   ✅ SDXL (${total_images * 0.02:.2f}) - Recommended for Tier 2")
        print(f"   ⭐ DALL-E 3 (${total_images * 0.04:.2f}) - Premium quality")
    elif tier == 3:
        print(f"   ⭐ SDXL (${total_images * 0.02:.2f}) - Recommended for Tier 3")
    print()
    print("=" * 80)
    print()

if __name__ == "__main__":
    import sys
    
    # Parse arguments
    tier = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    
    # Print summary
    print_summary(tier)
    
    # Generate prompts
    prompts = generate_prompt_library(tier)
    
    # Create directory structure
    create_directory_structure()
    
    print("✅ Avatar library setup complete!")
    print()
    print("Next Steps:")
    print("1. Review the generated prompts in 'prompt_library.json'")
    print("2. Choose your AI image provider (SDXL recommended)")
    print("3. Generate images using the prompts")
    print("4. Organize images in the 'avatars/' directory structure")
    print("5. Build the matching algorithm for users")
    print()
    print("💡 Tip: You can use the prompt_library.json with:")
    print("   - Stability AI API (SDXL)")
    print("   - OpenAI DALL-E 3 API")
    print("   - Replicate (various models)")
    print("   - Any AI image generation service")