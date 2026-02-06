$sb = "c:\Users\WIPED\QMEcosystem\soulblueprint"
$am = "c:\Users\WIPED\QMEcosystem\amomentintime"
$esp = "c:\Users\WIPED\QMEcosystem\amomentintime\esp"

$sbFiles = (Get-ChildItem $sb -File).Name | Sort-Object
$amFiles = (Get-ChildItem $am -File).Name | Sort-Object
$espFiles = (Get-ChildItem $esp -File).Name | Sort-Object

Write-Host "`n=== FILES MISSING FROM AMOMENTINTIME ==="
$missingAM = Compare-Object $sbFiles $amFiles | Where-Object { $_.SideIndicator -eq '<=' }
if ($missingAM) { $missingAM | ForEach-Object { Write-Host "  $($_.InputObject)" } } else { Write-Host "  (none)" }

Write-Host "`n=== FILES MISSING FROM ESP ==="
$missingESP = Compare-Object $sbFiles $espFiles | Where-Object { $_.SideIndicator -eq '<=' }
if ($missingESP) { $missingESP | ForEach-Object { Write-Host "  $($_.InputObject)" } } else { Write-Host "  (none)" }

Write-Host "`n=== EXTRA FILES IN ESP (not in soulblueprint) ==="
$extraESP = Compare-Object $sbFiles $espFiles | Where-Object { $_.SideIndicator -eq '=>' }
if ($extraESP) { $extraESP | ForEach-Object { Write-Host "  $($_.InputObject)" } } else { Write-Host "  (none)" }

Write-Host "`n=== FILE-BY-FILE DIFF COUNTS (soulblueprint vs amomentintime) ==="
foreach ($f in $sbFiles) {
    $sbPath = Join-Path $sb $f
    $amPath = Join-Path $am $f
    if (Test-Path $amPath) {
        $d = (Compare-Object (Get-Content $sbPath) (Get-Content $amPath)).Count
        if ($d -gt 0) {
            Write-Host "  $f : $d diff lines"
        }
    }
}

Write-Host "`n=== FILE-BY-FILE DIFF COUNTS (soulblueprint vs esp) ==="
foreach ($f in $sbFiles) {
    $espPath = Join-Path $esp $f
    if (Test-Path $espPath) {
        $d = (Compare-Object (Get-Content (Join-Path $sb $f)) (Get-Content $espPath)).Count
        if ($d -gt 0) {
            Write-Host "  $f : $d diff lines"
        }
    }
}

Write-Host "`n=== FILE SIZE COMPARISON ==="
foreach ($f in @("index.html","calculations.js","advanced-readings.js","readings-extended.js","deep-house-readings.js")) {
    $sbSize = if (Test-Path (Join-Path $sb $f)) { (Get-Item (Join-Path $sb $f)).Length } else { "MISSING" }
    $amSize = if (Test-Path (Join-Path $am $f)) { (Get-Item (Join-Path $am $f)).Length } else { "MISSING" }
    $espSize = if (Test-Path (Join-Path $esp $f)) { (Get-Item (Join-Path $esp $f)).Length } else { "MISSING" }
    Write-Host "  $f : SB=$sbSize | AM=$amSize | ESP=$espSize"
}

Write-Host "`n=== SOULBLUEPRINT index.html LINE COUNT ==="
(Get-Content (Join-Path $sb "index.html")).Count

Write-Host "`n=== AMOMENTINTIME index.html LINE COUNT ==="
(Get-Content (Join-Path $am "index.html")).Count

Write-Host "`n=== DONE ==="
