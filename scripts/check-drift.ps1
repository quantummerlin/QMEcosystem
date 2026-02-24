<#
.SYNOPSIS
    Drift Detection Script - Checks all copies of canonical files remain in sync.

.DESCRIPTION
    Compares duplicated JS files across brand folders against their canonical source.
    Reports any drift (differences) that could lead to bugs like the Chinese Zodiac LNY issue.

    Canonical sources:
      - calculations.js  -> soulblueprint/calculations.js
      - engine.js        -> amomentintime/forecasts/engine.js
      - readings.js      -> soulblueprint/readings.js

    Run this before every commit or via GitHub Actions CI.

.EXAMPLE
    .\scripts\check-drift.ps1
    .\scripts\check-drift.ps1 -Verbose
#>

param(
    [switch]$Verbose,
    [switch]$FailOnDrift
)

$ErrorActionPreference = "Continue"
$root = Split-Path -Parent $PSScriptRoot

# --- CANONICAL SOURCES AND THEIR COPIES ---

$fileGroups = @(
    @{
        Name = "calculations.js"
        Canonical = "soulblueprint/calculations.js"
        Copies = @(
            "ultimate/calculations.js"
            "stranger/calculations.js"
            "kpop/readings/calculations.js"
            "classic/readings/calculations.js"
            "amomentintime/calculations.js"
            "amomentintime/pt/calculations.js"
            "amomentintime/esp/calculations.js"
        )
    },
    @{
        Name = "forecasts/engine.js"
        Canonical = "amomentintime/forecasts/engine.js"
        Copies = @(
            "stranger/forecasts/engine.js"
            "kpop/readings/forecasts/engine.js"
            "classic/readings/forecasts/engine.js"
        )
    },
    @{
        Name = "readings.js"
        Canonical = "soulblueprint/readings.js"
        Copies = @(
            "ultimate/readings.js"
            "stranger/readings.js"
            "kpop/readings/readings.js"
            "classic/readings/readings.js"
            "amomentintime/readings.js"
            "amomentintime/pt/readings.js"
            "amomentintime/esp/readings.js"
        )
    }
)

# --- RUN DRIFT CHECKS ---

$totalChecks = 0
$driftCount = 0
$missingCount = 0
$passCount = 0

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  QMEcosystem Drift Detection Report" -ForegroundColor Cyan
Write-Host "  $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

foreach ($group in $fileGroups) {
    $canonicalPath = Join-Path $root $group.Canonical

    Write-Host "--- $($group.Name) ---" -ForegroundColor Yellow
    Write-Host "  Canonical: $($group.Canonical)" -ForegroundColor DarkGray

    if (-not (Test-Path $canonicalPath)) {
        Write-Host "  [X] MISSING canonical file!" -ForegroundColor Red
        $missingCount++
        continue
    }

    $canonicalHash = (Get-FileHash $canonicalPath -Algorithm SHA256).Hash

    foreach ($copyRelPath in $group.Copies) {
        $totalChecks++
        $copyPath = Join-Path $root $copyRelPath

        if (-not (Test-Path $copyPath)) {
            Write-Host "  [!] MISSING: $copyRelPath" -ForegroundColor DarkYellow
            $missingCount++
            continue
        }

        $copyHash = (Get-FileHash $copyPath -Algorithm SHA256).Hash

        if ($canonicalHash -eq $copyHash) {
            $passCount++
            if ($Verbose) {
                Write-Host "  [OK] $copyRelPath" -ForegroundColor Green
            }
        }
        else {
            $driftCount++
            Write-Host "  [DRIFT] $copyRelPath" -ForegroundColor Red

            # Show line count difference
            $canonicalLines = (Get-Content $canonicalPath).Count
            $copyLines = (Get-Content $copyPath).Count
            if ($canonicalLines -ne $copyLines) {
                Write-Host "    Lines: canonical=$canonicalLines copy=$copyLines (diff=$($copyLines - $canonicalLines))" -ForegroundColor DarkYellow
            }

            # Show first 5 differing lines
            if ($Verbose) {
                $diff = Compare-Object (Get-Content $canonicalPath) (Get-Content $copyPath)
                $diffItems = $diff | Select-Object -First 5
                foreach ($item in $diffItems) {
                    if ($item.SideIndicator -eq "<=") {
                        $indicator = "canonical"
                    }
                    else {
                        $indicator = "copy"
                    }
                    $line = $item.InputObject.Trim()
                    if ($line.Length -gt 80) { $line = $line.Substring(0, 80) }
                    Write-Host "    [$indicator] $line" -ForegroundColor DarkGray
                }
            }
        }
    }
    Write-Host ""
}

# --- SUMMARY ---

Write-Host "--- Summary ---" -ForegroundColor Yellow
Write-Host "  Total checks: $totalChecks"

$passColor = "Green"
Write-Host "  Passed:       $passCount" -ForegroundColor $passColor

if ($driftCount -gt 0) { $driftColor = "Red" } else { $driftColor = "Green" }
Write-Host "  Drifted:      $driftCount" -ForegroundColor $driftColor

if ($missingCount -gt 0) { $missColor = "Yellow" } else { $missColor = "Green" }
Write-Host "  Missing:      $missingCount" -ForegroundColor $missColor
Write-Host ""

if ($driftCount -gt 0) {
    Write-Host "[!] DRIFT DETECTED - Run with -Verbose for details." -ForegroundColor Red
    Write-Host "  Fix: Update copies from canonical, or update canonical first then propagate." -ForegroundColor DarkYellow
    Write-Host "  See: agents/CHINESE-ZODIAC-FIX-REFERENCE.md for the propagation pattern." -ForegroundColor DarkYellow
    if ($FailOnDrift) { exit 1 }
}
elseif ($missingCount -gt 0) {
    Write-Host "[!] Some files missing - verify intent." -ForegroundColor Yellow
    if ($FailOnDrift) { exit 1 }
}
else {
    Write-Host "[OK] All copies in sync. No drift detected." -ForegroundColor Green
}
