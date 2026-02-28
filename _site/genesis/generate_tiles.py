# Generate all Etsy tiles at 2000x2000px
import os

output_dir = r"c:\Users\WIPED\Genesis.QuantumMerlin\etsy-tiles"

# Tile 3: What You Get
tile3 = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Genesis Frequencies - What You Get</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            width: 2000px;
            height: 2000px;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #0f0f23 100%);
            font-family: 'Segoe UI', system-ui, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            overflow: hidden;
            position: relative;
        }
        body::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 30% 40%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 70% 70%, rgba(251, 191, 36, 0.15) 0%, transparent 50%);
            animation: pulse 4s ease-in-out infinite;
        }
        @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        .container {
            width: 1800px;
            height: 1800px;
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(251, 191, 36, 0.15));
            border: 8px solid rgba(16, 185, 129, 0.4);
            border-radius: 120px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 120px;
            text-align: center;
            position: relative;
            backdrop-filter: blur(10px);
            box-shadow: 0 30px 100px rgba(0, 0, 0, 0.5), inset 0 0 150px rgba(16, 185, 129, 0.1);
        }
        .header {
            font-size: 160px;
            font-weight: 900;
            background: linear-gradient(135deg, #10b981, #059669);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 80px;
            letter-spacing: -3px;
        }
        .price-tag {
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            color: #1a0a2e;
            padding: 40px 100px;
            border-radius: 60px;
            font-size: 110px;
            font-weight: 900;
            margin-bottom: 100px;
            box-shadow: 0 20px 60px rgba(251, 191, 36, 0.5);
            letter-spacing: 2px;
        }
        .features-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            width: 100%;
            margin: 60px 0;
        }
        .feature-item {
            background: rgba(26, 0, 51, 0.9);
            border-radius: 50px;
            padding: 60px;
            border: 4px solid rgba(16, 185, 129, 0.3);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }
        .feature-icon {
            font-size: 100px;
            margin-bottom: 30px;
        }
        .feature-title {
            font-size: 60px;
            font-weight: 700;
            color: #10b981;
            margin-bottom: 20px;
        }
        .feature-desc {
            font-size: 45px;
            color: rgba(255, 255, 255, 0.9);
            line-height: 1.4;
        }
        .lifetime-badge {
            background: linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(16, 185, 129, 0.3));
            border: 5px solid #fbbf24;
            border-radius: 80px;
            padding: 50px 100px;
            margin-top: 80px;
        }
        .lifetime-badge h3 {
            font-size: 90px;
            color: #fbbf24;
            font-weight: 900;
            margin-bottom: 20px;
            text-shadow: 0 0 40px rgba(251, 191, 36, 0.8);
        }
        .lifetime-badge p {
            font-size: 55px;
            color: white;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">✨ WHAT YOU GET ✨</div>
        <div class="price-tag">JUST $4.99</div>
        <div class="features-grid">
            <div class="feature-item">
                <div class="feature-icon">🎵</div>
                <div class="feature-title">49 Tracks</div>
                <div class="feature-desc">Complete frequency library</div>
            </div>
            <div class="feature-item">
                <div class="feature-icon">📱</div>
                <div class="feature-title">Full App</div>
                <div class="feature-desc">Professional interface</div>
            </div>
            <div class="feature-item">
                <div class="feature-icon">🔄</div>
                <div class="feature-title">Trinity Tech</div>
                <div class="feature-desc">3-layer frequency mixing</div>
            </div>
            <div class="feature-item">
                <div class="feature-icon">🎯</div>
                <div class="feature-title">7 Categories</div>
                <div class="feature-desc">Every goal covered</div>
            </div>
            <div class="feature-item">
                <div class="feature-icon">⏰</div>
                <div class="feature-title">Loop Timer</div>
                <div class="feature-desc">Automatic session control</div>
            </div>
            <div class="feature-item">
                <div class="feature-icon">🌙</div>
                <div class="feature-title">Sleep Mode</div>
                <div class="feature-desc">Gentle fade-out feature</div>
            </div>
        </div>
        <div class="lifetime-badge">
            <h3>LIFETIME ACCESS</h3>
            <p>Pay once • Own forever<br>No subscriptions • No hidden fees</p>
        </div>
    </div>
</body>
</html>'''

with open(os.path.join(output_dir, 'tile-3-what-you-get.html'), 'w', encoding='utf-8') as f:
    f.write(tile3)

print("Tile 3 created successfully!")
