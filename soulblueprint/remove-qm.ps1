# Remove Quantum Merlin references from all 70 article pages + articles/index.html
# Keeps quantummerlin.com domain URLs intact (canonical, og:url, og:image, etc.)

$basePath = 'C:\Users\WIPED\QMEcosystem\soulblueprint\articles'
$articleDirs = Get-ChildItem $basePath -Directory | Where-Object { $_.Name -ne 'css' -and $_.Name -ne 'images' }
$updated = 0
$failed = @()

foreach ($dir in $articleDirs) {
    $file = Join-Path $dir.FullName 'index.html'
    if (-not (Test-Path $file)) { continue }
    
    try {
        $bytes = [System.IO.File]::ReadAllBytes($file)
        $content = [System.Text.Encoding]::UTF8.GetString($bytes)
        $original = $content
        
        # 1. JSON-LD author: "Quantum Merlin" -> "Soul Blueprint"
        $content = $content -replace '"name":\s*"Quantum Merlin"', '"name": "Soul Blueprint"'
        
        # 2. Author intro: <strong>Quantum Merlin here ...</strong> -> <strong>From Soul Blueprint ...</strong>
        # Handle various patterns with em-dash (regular or encoded)
        $content = $content -replace '<strong>Quantum Merlin here[^<]*</strong>', '<strong>From the Soul Blueprint team</strong>'
        
        # 3. Author signoff visible name patterns (in the p tag with font-weight: 600)
        # Pattern: "— Quantum Merlin" or "Built by Quantum Merlin" etc.
        $content = $content -replace '(font-weight: 600;">)[^<]*Quantum Merlin[^<]*(</p>)', '${1}— Soul Blueprint${2}'
        $content = $content -replace '(font-weight: 600;">)[^<]*QM[^<]*(</p>)', '${1}— Soul Blueprint${2}'
        
        # 4. Footer copyright: remove "by Quantum Merlin"
        $content = $content -replace 'by Quantum Merlin\.', '.'
        
        # 5. Remove quantum-explore.js script tag (whole line)
        $content = $content -replace '[\r\n]*<script src="/shared/js/quantum-explore\.js" defer></script>', ''
        
        # 6. Remove quantum-email-capture.js script tag (whole line)
        $content = $content -replace '[\r\n]*<script src="/shared/js/quantum-email-capture\.js" defer></script>', ''
        
        # 7. Any remaining visible "Quantum Merlin" that's NOT in a URL (quantummerlin.com)
        # Use negative lookbehind approach: replace only if not preceded by / or .
        $content = $content -replace '(?<!quantummerlin\.com[^"]*?)(?<![/\.])Quantum Merlin(?!\.com)', 'Soul Blueprint'
        
        if ($content -ne $original) {
            $utf8NoBom = New-Object System.Text.UTF8Encoding $false
            [System.IO.File]::WriteAllText($file, $content, $utf8NoBom)
            $updated++
            Write-Host "Updated: $($dir.Name)" -ForegroundColor Green
        } else {
            Write-Host "No changes: $($dir.Name)" -ForegroundColor Yellow
        }
    } catch {
        $failed += $dir.Name
        Write-Host "FAILED: $($dir.Name) - $_" -ForegroundColor Red
    }
}

Write-Host "`n=== RESULTS ==="
Write-Host "Updated: $updated articles"
Write-Host "Failed: $($failed.Count)"
if ($failed.Count -gt 0) { Write-Host "Failed dirs: $($failed -join ', ')" }
