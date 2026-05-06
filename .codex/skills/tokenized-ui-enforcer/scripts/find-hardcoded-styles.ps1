param(
  [string]$Root = "src"
)

$patterns = @(
  @{ Name = "HexColor"; Regex = "#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b" },
  @{ Name = "RgbColor"; Regex = "\brgba?\([^)]*\)" },
  @{ Name = "HslColor"; Regex = "\bhsla?\([^)]*\)" },
  @{ Name = "FontSizeLiteral"; Regex = "\bfont-size\s*:\s*(?!var\()[^;]+" },
  @{ Name = "FontWeightLiteral"; Regex = "\bfont-weight\s*:\s*(?!var\()[^;]+" },
  @{ Name = "LineHeightLiteral"; Regex = "\bline-height\s*:\s*(?!var\()[^;]+" },
  @{ Name = "LetterSpacingLiteral"; Regex = "\bletter-spacing\s*:\s*(?!var\()[^;]+" },
  @{ Name = "RadiusLiteral"; Regex = "\bborder-radius\s*:\s*(?!var\()[^;]+" },
  @{ Name = "ShadowLiteral"; Regex = "\bbox-shadow\s*:\s*(?!var\()[^;]+" }
)

$allowedFiles = @(
  "src/styles/tokens.css"
)

$files = Get-ChildItem -Path $Root -Recurse -File -Include *.css,*.scss,*.tsx,*.ts |
  Where-Object {
    $_.FullName -notmatch "\\node_modules\\" -and
    $_.Name -notlike "*.stories.tsx"
  }

$hits = @()

foreach ($file in $files) {
  $normalized = $file.FullName.Replace("\", "/")
  $isAllowedFile = $false

  foreach ($allowed in $allowedFiles) {
    if ($normalized.EndsWith($allowed)) {
      $isAllowedFile = $true
      break
    }
  }

  if ($isAllowedFile) { continue }

  foreach ($p in $patterns) {
    $matches = Select-String -Path $file.FullName -Pattern $p.Regex -AllMatches
    foreach ($m in $matches) {
      foreach ($sub in $m.Matches) {
        $value = $sub.Value.Trim()

        # Skip declarations already tokenized through CSS vars.
        if ($p.Name -in @("FontSizeLiteral", "FontWeightLiteral", "LineHeightLiteral", "LetterSpacingLiteral", "RadiusLiteral", "ShadowLiteral")) {
          if ($value -match ":\s*var\(") { continue }
        }

        # Skip safe non-literal control values.
        if ($p.Name -eq "RadiusLiteral" -and $value -match ":\s*(inherit|initial|unset|revert)\s*$") { continue }
        if ($p.Name -eq "ShadowLiteral" -and $value -match ":\s*none\s*$") { continue }

        $hits += [PSCustomObject]@{
          Type  = $p.Name
          File  = $normalized
          Line  = $m.LineNumber
          Value = $value
        }
      }
    }
  }
}

if ($hits.Count -eq 0) {
  Write-Output "No hardcoded style literals found in scanned files."
  exit 0
}

$hits |
  Sort-Object File, Line, Type |
  Format-Table -AutoSize

Write-Output ""
Write-Output ("Total findings: {0}" -f $hits.Count)
