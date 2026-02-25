## Update author-intro and author-signoff across all 70 articles
## Creates unique, fun variations instead of repetitive text

$introStyle = 'style="background: linear-gradient(135deg, rgba(139,92,246,0.08), rgba(216,181,255,0.12)); border-left: 3px solid #8b5cf6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px; font-style: italic; color: inherit;"'
$signoffStyle = 'style="background: linear-gradient(135deg, rgba(139,92,246,0.06), rgba(216,181,255,0.10)); border-radius: 12px; padding: 20px 24px; margin-top: 32px; margin-bottom: 24px; text-align: center;"'

$intros = @(
    '<strong>Quick backstory:</strong> I spent 72 hours straight coding a numerology engine while my mum''s tarot cards were spread out next to my laptop. That''s basically my whole origin story. Anyway — here''s what I built from it.'
    '<strong>Quantum Merlin here —</strong> my mum read tarot cards. I write code. Somehow the universe decided those two things should collide, and now here I am writing guides about it at 2am.'
    '<strong>A confession:</strong> I built the Soul Blueprint generator because I couldn''t stop finding impossible patterns in birth charts. My daughter''s reading started all of this. Zero regrets.'
    '<strong>Fun fact:</strong> I''ve generated over 10,000 test readings while building A Moment in Time. Each one taught me something new. This guide packs the best of those discoveries.'
    '<strong>Behind this guide:</strong> The first time AI turned someone''s birth chart data into something genuinely beautiful, I got emotional about it. That moment is exactly why these guides exist.'
    '<strong>The real story:</strong> I paid $350 for my daughter''s birth reading, whispered "I could build this" — and somehow actually did. This guide exists because I believe everyone deserves access to this stuff.'
    '<strong>From QM:</strong> My mum would love that I''m writing this. She spent decades with her tarot cards and crystals. I''m just using different tools to chase the same truth she was always after.'
    '<strong>Honest moment:</strong> I didn''t believe in any of this when I started building it. Then I found patterns in the charts and numbers that shouldn''t exist — connections tracing back to ancient texts. That changed my mind completely.'
    '<strong>How I know this works:</strong> I test every technique in these guides on my own readings first. If it doesn''t genuinely surprise me, it doesn''t make the cut. This one passed.'
    '<strong>A note from the builder:</strong> Between running A Moment in Time and being a dad, I''ve learned the best tools are the ones that feel personal. Everything here is designed to feel like it''s yours.'
    '<strong>Why I can''t shut up about this:</strong> When I found connections between numerology, astrology, and ancient texts that have no business being connected — I couldn''t keep it to myself. So here we are.'
    '<strong>Full circle moment:</strong> My mum reads runes. I read data. We''re both searching for the same thing — hidden patterns that reveal who we really are. This guide is part of that search.'
    '<strong>The spark:</strong> A $350 birth reading changed how I see my daughter — and I wanted everyone to have that kind of moment without the price tag. That''s why all of this exists.'
    '<strong>Fair warning:</strong> Once you start creating things from your reading, you might not be able to stop. I definitely couldn''t. Consider yourself warned — in the best way.'
    '<strong>Late night origin story:</strong> Every guide on this site started with me muttering "wait, what if you could..." at 2am. Think of these as gifts from my sleepless nights to your creative afternoons.'
    '<strong>Kitchen table magic:</strong> I grew up watching my mum lay out tarot spreads on the kitchen table. Now I build AI tools at the same table. The universe definitely has a sense of humour.'
    '<strong>No filter:</strong> No fancy credentials here — just years of obsession with birth chart patterns and a mum who started me on this path before I could spell ''astrology.'' This guide is pure experience.'
    '<strong>Shortcut alert:</strong> I''ve tested every AI tool out there so you don''t have to waste your time on the bad ones. This guide is the shortcut I wish someone had handed me.'
    '<strong>Cosmic inheritance:</strong> My mum got the intuition. I got the urge to build things. Combine those two and you get A Moment in Time — and every guide on this page.'
    '<strong>Real talk:</strong> I wrote these guides because people kept messaging me saying "I got my reading... now what?" This is the "now what." You''re going to love it.'
)

$signoffs = @(
    '<p style="margin: 0 0 8px 0; font-weight: 600;">— Quantum Merlin</p><p style="margin: 0; font-size: 0.92rem; opacity: 0.8;">Still finding patterns. Still building. Still amazed by what''s hidden in the numbers. <a href="/soulblueprint/">Explore A Moment in Time</a>.</p>'
    '<p style="margin: 0 0 8px 0; font-weight: 600;">Made with love by QM</p><p style="margin: 0; font-size: 0.92rem; opacity: 0.8;">Father. Builder. Son of a witch (literally). Making cosmic knowledge accessible one guide at a time.</p>'
    '<p style="margin: 0 0 8px 0; font-weight: 600;">— Quantum Merlin</p><p style="margin: 0; font-size: 0.92rem; opacity: 0.8;">Pattern finder. Night owl. Every guide here was tested on my own readings first. <a href="/soulblueprint/">Try A Moment in Time</a>.</p>'
    '<p style="margin: 0 0 8px 0; font-weight: 600;">Crafted by Quantum Merlin</p><p style="margin: 0; font-size: 0.92rem; opacity: 0.8;">If this guide sparked something, there''s plenty more. <a href="/soulblueprint/">A Moment in Time</a> is where it all starts.</p>'
    '<p style="margin: 0 0 8px 0; font-weight: 600;">— Quantum Merlin</p><p style="margin: 0; font-size: 0.92rem; opacity: 0.8;">Son of a tarot reader who learned to code. Still not sure which side of the family is more responsible for all this.</p>'
    '<p style="margin: 0 0 8px 0; font-weight: 600;">Built by Quantum Merlin</p><p style="margin: 0; font-size: 0.92rem; opacity: 0.8;">What started as a $350 reading for my daughter became <a href="/soulblueprint/">a tool I can''t stop building</a>. Hope you find something meaningful here.</p>'
    '<p style="margin: 0 0 8px 0; font-weight: 600;">— Quantum Merlin</p><p style="margin: 0; font-size: 0.92rem; opacity: 0.8;">My mum had tarot cards. I have code. Same mission, different tools. <a href="/soulblueprint/">Explore A Moment in Time</a>.</p>'
)

# Get all article directories (exclude css, js, images, and the index itself)
$excludeDirs = @('css', 'js', 'images')
$articleDirs = Get-ChildItem -Path 'C:\Users\WIPED\QMEcosystem\soulblueprint\articles' -Directory |
    Where-Object { $excludeDirs -notcontains $_.Name } |
    Sort-Object Name

$count = 0
$errors = @()

foreach ($dir in $articleDirs) {
    $file = Join-Path $dir.FullName 'index.html'
    if (-not (Test-Path $file)) {
        $errors += "$($dir.Name): file not found"
        continue
    }

    $content = Get-Content $file -Raw -Encoding UTF8

    # Pick intro and signoff based on index
    $introText = $intros[$count % $intros.Count]
    $signoffText = $signoffs[$count % $signoffs.Count]

    # Build replacement HTML
    $newIntro = '<div class="author-intro" ' + $introStyle + '>' + $introText + '</div>'
    $newSignoff = '<div class="author-signoff" ' + $signoffStyle + '>' + $signoffText + '</div>'

    # Replace intro (match the whole div)
    $introPattern = '<div class="author-intro"[^>]*>.*?</div>'
    $newContent = [regex]::Replace($content, $introPattern, $newIntro, [System.Text.RegularExpressions.RegexOptions]::Singleline)

    # Replace signoff (match the whole div)
    $signoffPattern = '<div class="author-signoff"[^>]*>.*?</div>'
    $newContent = [regex]::Replace($newContent, $signoffPattern, $newSignoff, [System.Text.RegularExpressions.RegexOptions]::Singleline)

    if ($newContent -ne $content) {
        # Write without BOM
        [System.IO.File]::WriteAllText($file, $newContent, [System.Text.UTF8Encoding]::new($false))
        $count++
        Write-Host "[$count] $($dir.Name) — intro #$($count % $intros.Count), signoff #$($count % $signoffs.Count)" -ForegroundColor Green
    } else {
        $errors += "$($dir.Name): no match found"
    }
}

Write-Host "`n=== Done! Updated $count articles ===" -ForegroundColor Cyan
if ($errors.Count -gt 0) {
    Write-Host "Errors:" -ForegroundColor Red
    $errors | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
}
