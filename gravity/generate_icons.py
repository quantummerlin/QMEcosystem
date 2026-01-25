from PIL import Image
import os

# Open the gravity.jpg source image
source = Image.open('gravity.jpg')

# Convert to RGB if needed (in case it's RGBA or palette)
if source.mode != 'RGB':
    source = source.convert('RGB')

# Get dimensions and crop to square (center crop)
width, height = source.size
min_dim = min(width, height)
left = (width - min_dim) // 2
top = (height - min_dim) // 2
right = left + min_dim
bottom = top + min_dim
source_square = source.crop((left, top, right, bottom))

# Create icons at different sizes
icons_to_create = [
    ('icon-512.png', 512),
    ('icon-192.png', 192),
    ('favicon.png', 32),
    ('apple-touch-icon.png', 180),
]

for filename, size in icons_to_create:
    resized = source_square.resize((size, size), Image.Resampling.LANCZOS)
    resized.save(filename)
    print(f"✓ Created {filename} ({size}x{size})")

# Create OG image (1200x630 for social sharing)
# Resize maintaining aspect ratio, then crop to 1.91:1
og_width, og_height = 1200, 630
og_aspect = og_width / og_height

source_aspect = source.size[0] / source.size[1]

if source_aspect > og_aspect:
    # Image is wider, scale by height
    new_height = og_height
    new_width = int(source.size[0] * (og_height / source.size[1]))
else:
    # Image is taller, scale by width  
    new_width = og_width
    new_height = int(source.size[1] * (og_width / source.size[0]))

og_resized = source.resize((new_width, new_height), Image.Resampling.LANCZOS)

# Center crop
left = (new_width - og_width) // 2
top = (new_height - og_height) // 2
og_cropped = og_resized.crop((left, top, left + og_width, top + og_height))
og_cropped.save('og-image.png', quality=95)
print(f"✓ Created og-image.png ({og_width}x{og_height})")

# Create favicon.ico
favicon = source_square.resize((32, 32), Image.Resampling.LANCZOS)
favicon.save('favicon.ico', format='ICO', sizes=[(32, 32)])
print("✓ Created favicon.ico")

print("\n✨ All icons generated from gravity.jpg!")
