$file = "c:\Users\WIPED\Genesis.QuantumMerlin\index.html"
$content = Get-Content $file -Raw
$content = $content -replace 'achWavExporter: ".+ WAV Creator"', 'achWavExporter: "⬇ Export Master"'
Set-Content $file $content -NoNewline
Write-Host "Done!"
