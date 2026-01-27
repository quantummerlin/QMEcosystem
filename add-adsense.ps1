$adsense = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3480541530392777" crossorigin="anonymous"></script>'
$count = 0

Get-ChildItem -Path "C:\Users\WIPED\QMEcosystem" -Recurse -Filter "*.html" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
    if ($content -and $content -notmatch 'ca-pub-3480541530392777' -and $content -match '<head>') {
        $newContent = $content -replace '<head>', "<head>`n    $adsense"
        Set-Content $_.FullName $newContent -NoNewline
        $count++
        Write-Host "Added to: $($_.Name)"
    }
}

Write-Host "`nTotal files updated: $count"
