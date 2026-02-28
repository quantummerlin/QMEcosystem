from PIL import Image, ImageDraw, ImageFont

def create_icon(size, filename):
    # Create image with dark background
    img = Image.new('RGB', (size, size), color='#0a0a0f')
    draw = ImageDraw.Draw(img)
    
    center = size // 2
    
    # Outer ring
    ring_radius = int(size * 0.36)
    draw.ellipse(
        [(center - ring_radius, center - ring_radius),
         (center + ring_radius, center + ring_radius)],
        outline=(139, 124, 247, 50),
        width=max(1, size // 192)
    )
    
    # Inner glow
    glow_radius = int(size * 0.23)
    draw.ellipse(
        [(center - glow_radius, center - glow_radius),
         (center + glow_radius, center + glow_radius)],
        fill=(139, 124, 247, 38)
    )
    
    # Central orb
    orb_radius = int(size * 0.15)
    draw.ellipse(
        [(center - orb_radius, center - orb_radius),
         (center + orb_radius, center + orb_radius)],
        fill=(139, 124, 247)
    )
    
    # Small orbiting dot
    dot_y = int(size * 0.135)
    dot_radius = max(2, size // 48)
    draw.ellipse(
        [(center - dot_radius, dot_y - dot_radius),
         (center + dot_radius, dot_y + dot_radius)],
        fill=(139, 124, 247)
    )
    
    # Number 7
    try:
        font_size = int(size * 0.21)
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        font = ImageFont.load_default()
    
    # Draw 7 in center
    text = "7"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    text_x = center - text_width // 2
    text_y = center - text_height // 2 - int(size * 0.02)
    
    draw.text((text_x, text_y), text, fill='#0a0a0f', font=font)
    
    # Save
    img.save(filename, 'PNG')
    print(f"Created {filename}")

# Create all sizes
create_icon(192, 'icon-192.png')
create_icon(512, 'icon-512.png')
create_icon(32, 'favicon.png')

print("\nAll icons created successfully!")
