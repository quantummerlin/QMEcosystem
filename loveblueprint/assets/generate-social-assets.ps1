# ============================================================
# SOUL SPARK — social/share asset generator
# ------------------------------------------------------------
# Produces the two raster assets the page's <meta> tags need but
# SVG cannot provide (Facebook/X/Instagram/iMessage all reject
# SVG previews):
#
#   assets/og-card.png  1200x630  - link preview image
#   assets/qr.png       512x512   - real QR for the bio card
#                                   (replaces the previous
#                                    "scan to decode yours"
#                                    copy which had no QR)
#
# Requires: npm install qrcode --no-save   (local only)
# Note: this .ps1 is gitignored by the repo (*.ps1) so it stays a
#       local build tool and never ships to production. The PNGs
#       it outputs ARE committed and deployed.
#
# Run:  powershell -ExecutionPolicy Bypass -File assets/generate-social-assets.ps1
# ============================================================

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$assetsDir = Split-Path -Parent $MyInvocation.MyCommand.Path

$TARGET_URL = 'https://quantummerlin.com/loveblueprint/'

Write-Host "`n=== SOUL SPARK OG CARD ===" -ForegroundColor Magenta
Write-Host "Target URL : $TARGET_URL"
Write-Host "Assets dir : $assetsDir`n"

# QR code (qr.png) is generated separately by make-qr.cjs so we keep
# zero extra PowerShell/npm CLI coupling here:
#   node assets/make-qr.cjs

# ------------------------------------------------------------
# OG CARD (1200x630 link preview)
# ------------------------------------------------------------
Write-Host "Rendering OG card..." -ForegroundColor Cyan

$W = 1200; $H = 630
$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g   = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

function New-Color([int]$r,[int]$gr,[int]$b,[int]$a=255) {
    return [System.Drawing.Color]::FromArgb($a,$r,$gr,$b)
}

# -- Plum/rose gradient background (matches Soul Spark dark theme) --
$bgRect = New-Object System.Drawing.Rectangle(0,0,$W,$H)
$bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $bgRect,
    (New-Color 30 14 34),      # deep plum #1e0e22
    (New-Color 62 18 40),      # midnight rose #3e1228
    60.0                       # diagonal-ish
)
$g.FillRectangle($bg, $bgRect)

# -- Subtle radial glow behind the heart --
$glowRect = New-Object System.Drawing.Rectangle(($W/2 - 330), 60, 660, 460)
$pathGlow = New-Object System.Drawing.Drawing2D.GraphicsPath
$pathGlow.AddEllipse($glowRect)
$pgb = New-Object System.Drawing.Drawing2D.PathGradientBrush($pathGlow)
$pgb.CenterColor = New-Color 255 77 109 55     # rose glow
$surround = New-Object 'System.Drawing.Color[]' 1
$surround[0] = New-Color 255 77 109 0
$pgb.SurroundColors = $surround
$g.FillPath($pgb, $pathGlow)

# -- Deterministic star scatter (tiny gold sparkles) --
$rng = New-Object System.Random(20261015)
$starBrush = New-Object System.Drawing.SolidBrush((New-Color 232 185 106 150))
$glyphs = @([char]0x2726, [char]0x2605, [char]0x00B7, [char]0x2727)
for ($i = 0; $i -lt 34; $i++) {
    $x = $rng.Next(20, $W - 20)
    $y = $rng.Next(20, $H - 20)
    # keep clear of the centre content column
    if ($x -gt 250 -and $x -lt 950 -and $y -gt 110 -and $y -lt 500) { continue }
    $sz = [float](6 + $rng.Next(0, 14))
    $f  = New-Object System.Drawing.Font('Segoe UI Symbol', $sz)
    $g.DrawString([string]$glyphs[$rng.Next(0, $glyphs.Length)], $f, $starBrush, $x, $y)
    $f.Dispose()
}

# -- Heart, drawn from the classic parametric heart curve --
#    x = 16 sin^3(t)
#    y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
#    Sampled as a polygon so it needs no external SVG rasteriser.
$heartPts = New-Object System.Collections.Generic.List[System.Drawing.PointF]
$N = 480
for ($i = 0; $i -le $N; $i++) {
    $t = ($i / $N) * [Math]::PI * 2
    $x = 16 * [Math]::Pow([Math]::Sin($t), 3)
    $y = 13 * [Math]::Cos($t) - 5 * [Math]::Cos(2*$t) - 2 * [Math]::Cos(3*$t) - [Math]::Cos(4*$t)
    # GDI+ y grows downward, so negate
    $heartPts.Add((New-Object System.Drawing.PointF([float]$x, [float](-$y))))
}

# normalise the curve into a pixel box
$xs = $heartPts | ForEach-Object { $_.X }
$ys = $heartPts | ForEach-Object { $_.Y }
$minX = ($xs | Measure-Object -Minimum).Minimum
$maxX = ($xs | Measure-Object -Maximum).Maximum
$minY = ($ys | Measure-Object -Minimum).Minimum
$maxY = ($ys | Measure-Object -Maximum).Maximum

$boxW = 205.0; $boxH = 190.0
$cx = ($W / 2) - ($boxW / 2)
$cy = 178.0 - ($boxH / 2)
$scaleX = $boxW / ($maxX - $minX)
$scaleY = $boxH / ($maxY - $minY)

$drawPts = New-Object 'System.Drawing.PointF[]' $heartPts.Count
for ($i = 0; $i -lt $heartPts.Count; $i++) {
    $px = $cx + (($heartPts[$i].X - $minX) * $scaleX)
    $py = $cy + (($heartPts[$i].Y - $minY) * $scaleY)
    $drawPts[$i] = New-Object System.Drawing.PointF([float]$px, [float]$py)
}

$heartPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$heartPath.AddPolygon($drawPts)

$hRect = New-Object System.Drawing.RectangleF([float]$cx, [float]$cy, [float]$boxW, [float]$boxH)
$hBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $hRect, (New-Color 255 143 163), (New-Color 200 20 60), 90.0)
$g.FillPath($hBrush, $heartPath)

$goldPen = New-Object System.Drawing.Pen((New-Color 232 185 106 210), 1.6)
$g.DrawPath($goldPen, $heartPath)

# -- Sparkle inside the heart --
$sparkFont = New-Object System.Drawing.Font('Segoe UI Symbol', 30, [System.Drawing.FontStyle]::Bold)
$sparkBrush = New-Object System.Drawing.SolidBrush(New-Color 255 255 255 200)
$sfmt = New-Object System.Drawing.StringFormat
$sfmt.Alignment = [System.Drawing.StringAlignment]::Center
$sfmt.LineAlignment = [System.Drawing.StringAlignment]::Center
$g.DrawString([string][char]0x2726, $sparkFont, $sparkBrush, [float]($W/2), 195.0, $sfmt)

# -- Gold hairline frame --
$framePen = New-Object System.Drawing.Pen((New-Color 232 185 106 55), 2)
$g.DrawRectangle($framePen, 22, 22, ($W - 44), ($H - 44))

# -- Typography --
$serif = 'Georgia'   # reliable on Windows; no webfont dependency
$sans  = 'Segoe UI'

$titleFont = New-Object System.Drawing.Font($serif, 62, [System.Drawing.FontStyle]::Bold)
$titleBrush = New-Object System.Drawing.SolidBrush(New-Color 243 227 233)
$g.DrawString('Soul Spark', $titleFont, $titleBrush, [float]($W/2), 322.0, $sfmt)

$tagFont = New-Object System.Drawing.Font($sans, 25, [System.Drawing.FontStyle]::Regular)
$tagBrush = New-Object System.Drawing.SolidBrush(New-Color 255 143 163)
$g.DrawString('Your cosmic dating decoder', $tagFont, $tagBrush, [float]($W/2), 398.0, $sfmt)

$subFont = New-Object System.Drawing.Font($sans, 19)
$subBrush = New-Object System.Drawing.SolidBrush(New-Color 233 203 214 200)
$g.DrawString('Exact birth-chart readings  ' + [char]0x2726 + '  degree compatibility  ' + [char]0x2726 + '  profile bios', `
    $subFont, $subBrush, [float]($W/2), 444.0, $sfmt)

# -- Footer URL divider + domain --
$sepPen = New-Object System.Drawing.Pen((New-Color 232 185 106 70), 2)
$g.DrawLine($sepPen, [float](($W/2) - 210), 492.0, [float](($W/2) + 210), 492.0)

$urlFont = New-Object System.Drawing.Font($sans, 24, [System.Drawing.FontStyle]::Bold)
$urlBrush = New-Object System.Drawing.SolidBrush(New-Color 232 185 106)
$g.DrawString('quantummerlin.com/loveblueprint', $urlFont, $urlBrush, [float]($W/2), 508.0, $sfmt)

$freeFont = New-Object System.Drawing.Font($sans, 16)
$freeBrush = New-Object System.Drawing.SolidBrush(New-Color 233 203 214 150)
$g.DrawString('Free ' + [char]0x2726 + ' private ' + [char]0x2726 + ' nothing uploaded', $freeFont, $freeBrush, [float]($W/2), 552.0, $sfmt)

# -- Save --
$ogOut = Join-Path $assetsDir 'og-card.png'
$bmp.Save($ogOut, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()

if (Test-Path $ogOut) {
    $kb = [math]::Round((Get-Item $ogOut).Length / 1KB, 1)
    Write-Host "  OK  og-card.png ($kb KB, 1200x630)" -ForegroundColor Green
}

Write-Host "`nDone.`n" -ForegroundColor Magenta
